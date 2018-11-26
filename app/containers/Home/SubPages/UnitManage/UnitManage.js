import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin} from '../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'

// import FormWaterLevel from '../../../SubPages/basic-data/WaterLevel/FormWaterLevel.js'
import AddUnitManage from '../../SubPages/UnitManage/AddUnitManage.js'
 import {companyAdd, companyDelet, companyEdit, relevanUnit} from '../../../../data/dataStore.js'; //引入Url

import Modal from '../../../../components/Modal/Modal.js';

// import './style.css'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class UnitManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            treeData: null, //table的数据
            activeBtn: 1, //默认选中btn
            showModal: false,
            confirmLoading: false,
        }

    }
    render() {
        const columns = [{
            title: '公司名称',
            dataIndex: 'companyName',
            key: 'name',
          }, 
          {
            title: '公司类型',
            dataIndex: 'companyType',
            key: '0',
          },
          {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'age',
          },
       
          {
              title: '联系地址',
              dataIndex: 'address',
              key: '1',
            }, 
            {
                title: '联系人',
                dataIndex: 'connector',
                key: '11',
              }, 
             
            {
                title: '邮箱',
                dataIndex: 'email',
                key: '2',
              },  
              {
                title: '中文简写',
                dataIndex: 'chineseShort',
                key: '3',
              },  
              {
                title: '拼音首字母',
                dataIndex: 'pinyinInitial',
                key: '4',
              },  
            {title: '修改', dataIndex: "", width: "5%", render: (text, record, index) => {
              return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
          }},
          {title: '删除', dataIndex: "", width: "5%", render: (text, record, index) => {
              return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                  <a href="#">删除</a>
              </Popconfirm>;
          }}
          ];
        return (
            // this.state.loading ? 
            // <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <div className="ps-irrigation-flex">
                   
                    <div className="ps-flex-item ps-right-item">
                       
                         <Row>
                            <Col xs={24} >
                                <div className="zf-title">
                                  <Button type="primary" size="small" className="add" onClick={this.newBtnClick.bind(this)}>新增</Button>
                                  <Button type="primary" size="small" className="search" onClick={this.search.bind(this)}>搜索</Button>
                                  <Input placeholder="default size" size="small" className='ipt' style={{width: "6%"}}/>
                                </div>
                            </Col>
                            <Col xs={24} className="ps-ir-table">
                            <Table ref="table" size={'small'} bordered={true} scroll={{x:true}}
                                    columns={columns}
                                    dataSource={this.state.tableData}
                                    rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>
                            </Col>
                        </Row>
                    </div>

                </div>
                
                {this.createModal()}
            </div>
            
        )
    }
    componentDidMount() {
       
         this.loadUnit()

    }
    // componentWillUnmount() {
    //     super.componentWillUnmount();
    //     window.removeEventListener("resize", this.onresize);
    // }
    
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.key} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.key} entity={n}>{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
  
    // 搜索
     search(){

         }
      
    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
        console.log("onChange",selectedRowKeys, selectedRows );
        this.setState({
            checkedRowData:selectedRows
        });

    }
    rowClassName(record, index ) {
        var selData = this.state.tableSelData;
        if (selData && selData.key === record.key) {
            return "row-highlight";
            
        }else{
            return "";
        }
    }
    async loadUnit() {
        let data = await relevanUnit({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).catch(ex => {return ex;});
        if (data.code==200 ) {
            data.data.forEach((item) => {
                item.key = item.id
            })
            console.log(data.data,'公司展示')
            this.setState({
                loading: false,
                tableData:data.data 
            })
        }else{
            this.setState({
                loading: false
            });
            message.error((data && data.msg) || data ||  "服务器异常!",5);
        }

    }
    onbtnClick(key, e) {
        this.setState({
            activeBtn: key
        })
    }
    createModal() {
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"} 
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}
            >

            <AddUnitManage ref={(node) => { this.f = node ;}} disabled={false}/>
            
        </Modal>
        return modal;
    }
    modalOkClick() {
        if (this.mode === 1) { //新增状态
            this.add();
        } else if (this.mode === 2) {
            this.modify(this.modifyId);
        }
    }
    // 增
    newBtnClick(e) {
        this.mode = 1;
        this.setState({
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
        });

    }
    // 改
    modifyClick(text, record, index) {
        this.mode = 2;
        this.modifyId = record.id;
        this.setState({
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            form.setFieldsValue({
                unit:record.id,
                Lname:record.companyName,
                LcompanyType:record.companyType,
                Lconnector:record.connector,
                Lphone:record.phone,
                Laddress:record.address,
                email: record.email,
                LpinyinInitial:record.pinyinInitial,
                LchineseShort:record.chineseShort          
            });
            
        });

    }
    removeClick(text, record, index) {
        this.remove(record);
    }
    
    add() {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let item = form.getFieldsValue();
                let data =  {
                    companyName:item.Lname,  //公司名称
                    companyType:item.LcompanyType,       //公司类型
                    connector:item.Lconnector, //联系人
                    phone:item.Lphone,   
                    address:item.Laddress,
                    email:item.email,
                    pinyinInitial:item.LpinyinInitial,
                    chineseShort:item.LchineseShort
                    
                };
                companyAdd(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        // data.data.key = data.data.id;
                        // this.state.tableData.push(data.data);
                        this.loadUnit()
                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                    } else {
                        this.setState({
                            confirmLoading: false,
                            showModal: false

                        });
                        message.error(data.msg || "服务器异常!", 5);
                    }
                    
                }).catch((ex) => {
                    this.setState({
                        confirmLoading: false
                    });
                    message.error(ex || "服务器异常!",5);
                });
            }
        })
        
    }
    modify(id) {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let item = form.getFieldsValue();
                let data =  {
                    id:item.unit,
                    companyName:item.Lname,  //公司名称
                    companyType:item.LcompanyType,       //公司类型
                    connector:item.Lconnector, //联系人
                    phone:item.Lphone,   
                    address:item.Laddress,
                    email:item.email,
                    pinyinInitial:item.LpinyinInitial,
                    chineseShort:item.LchineseShort

                   
                };
                companyEdit(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        // var d = data.data;
                        // d.key = d.id;
                        // for (let i = 0; i < this.state.tableData.length; i++) {
                        //     let item = this.state.tableData[i];
                        //     if (item.id === d.id) {
                        //         this.state.tableData[i] = d;
                        //         break;
                        //     }
                        // }
                        this.loadUnit()

                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                    } else {
                        this.setState({
                            confirmLoading: false
                        });
                        message.error(data.msg || "服务器异常!", 5);
                    }
                }).catch((ex) => {
                    this.setState({
                        confirmLoading: false
                    });
                    message.error(ex || "服务器异常!",5);
                });
            }
        });
        
    }
    remove(record) {
        let data = {companyId: record.id};
        companyDelet(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
             if (data.code === 200) {
          
                 this.loadUnit()

                 this.setState({
                     tableData: treeData
                 });
            }else{
                // message.error(data.msg || "服务器异常!", 5);
             }
            
        }).catch((ex) => {
          
            // message.error(ex || "服务器异常!",5);
        });
    }
    
}

export default UnitManage;