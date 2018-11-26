import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin} from '../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'

// import FormWaterLevel from '../../../SubPages/basic-data/WaterLevel/FormWaterLevel.js'
import AddPersonnelManage from '../../SubPages/PersonnelManage/AddPersonnelManage.js'
 import {personShow, personAdd, personDelete,personEdit} from '../../../../data/dataStore.js'; //引入Url

import Modal from '../../../../components/Modal/Modal.js';

// import './style.css'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class PersonnelManage extends React.Component {
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
        const columns = [
            {
            title: '唯一标识码',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
          }, 
          {
            title: '人员姓名',
            dataIndex: 'name',
            key: 'name',
          },
       
        //   {
        //       title: '照片',
        //       dataIndex: 'fuctionName',
        //       key: '1',
        //     },  
            {
                title: '联系电话',
                dataIndex: 'phone',
                key: 'phone',
              },  
              {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address',
              },  
              {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
              },  
              {
                title: '所属单位',
                dataIndex: 'companyName',
                key: 'companyName',
              },  
              {
                title: '简称',
                dataIndex: 'pinyinInitial',
                key: 'pinyinInitial',
              },  
            //   {
            //     title: '设施类型',
            //     dataIndex: 'enabled',render:enabled =>{ 
            //       if(enabled==1){
            //         return '启用'
            //       } else if(enabled==0){
            //         return '未启用'
            //       }
            //      },
            //     key: '5',
            //   },  
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
    //  super.componentDidMount();
        // this.handlerTableFns();
        // this.loadData();
        this.loadperson()

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
    async loadperson() {
        let data = await personShow({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).catch(ex => {return ex;});
        if (data.code==200) {
            data.data.forEach((item) => {
                item.key = item.id
            })
             console.log(data.data,'人员管理')
          
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

            <AddPersonnelManage ref={(node) => { this.f = node ;}} disabled={false}/>
            
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
                name:record.wlName,
                phone:record.phone,
                address:record.add,
                email:record.email,
                pinyinInitial:record.jianc,
                serialNumber:record.FID,   //唯一标识码              
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
                     name:item.wlName,
                     phone: item.phone,
                     address: item.add,
                     email: item.email,
                     pinyinInitial:item.jianc,
                     serialNumber:item.FID,   //暂时传为空
                     companyInfoId:item.wlFunction   
                };
                personAdd(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        // data.data.key = data.data.id;
                        // this.state.tableData.push(data.data);
                        this.loadperson()
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
                    id:item.unit, //id
                    name:item.wlName,
                    phone: item.phone,
                    address: item.add,
                    email: item.email,
                    pinyinInitial:item.jianc,
                    serialNumber:item.FID,   //暂时传为空
                    companyInfoId:item.wlFunction   
                };
                personEdit(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                       
                        this.loadperson()
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
                        let data = {personnelId: record.id};
                        personDelete(data).then((res) => {
                            if (res.ok) {
                                return res.json();
                            }
                            return Promise.reject("接口出错");
                        }).then((data) => {
                            if (data.code === 200) { 
                                this.loadperson()
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
export default PersonnelManage;