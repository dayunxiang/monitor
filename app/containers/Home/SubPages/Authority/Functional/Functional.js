import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin} from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

// import FormWaterLevel from '../../../SubPages/basic-data/WaterLevel/FormWaterLevel.js'
import AddFunction from '../Functional/AddFunction.js'
 import {FunctionList, FunctionAdd, FunctionDelete, FunctionEdit} from '../../../../../data/dataStore.js'; //引入Url

import Modal from '../../../../../components/Modal/Modal.js';

import './style.css'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class WaterLevel1 extends BaseSubPage {
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
            title: '权限组ID',
            dataIndex: 'roleId',
            key: 'name',
          }, {
            title: '权限组命名',
            dataIndex: 'roleName',
            key: 'age',
          },
       
          {
              title: '功能名称',
              dataIndex: 'fuctionName',
              key: '1',
            },  
            {
                title: '功能代码',
                dataIndex: 'functionCode',
                key: '2',
              },  
              {
                title: '父节点',
                dataIndex: 'parentCode',
                key: '3',
              },  
              {
                title: '系统名称',
                dataIndex: 'systemName',
                key: '4',
              },  
              {
                title: '设施类型',
                dataIndex: 'enabled',render:enabled =>{ 
                  if(enabled==1){
                    return '启用'
                  } else if(enabled==0){
                    return '未启用'
                  }
                 },
                key: '5',
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
            this.state.loading ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <div className="ps-irrigation-flex">
                   
                    <div className="ps-flex-item ps-right-item">
                       
                         <Row>
                            <Col xs={24} >
                                <div className="zf-title">
                                  <Button type="primary" size="small" className="export"  onClick={this.export.bind(this)} >导出</Button>
                                  <Button type="primary" size="small" className="leading" onClick={this.leading.bind(this)}>导入</Button>
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
        super.componentDidMount();
        // this.handlerTableFns();
        // this.loadData();
        this.loadFunction()

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
    
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
    // 导入事件
    export(){

    }
    // 搜索
     search(){

         }
        //  导出
        leading(){

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
    async loadFunction() {
        let data = await FunctionList({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).catch(ex => {return ex;});
        if (data && data.data ) {
            data.data.forEach((item) => {
                item.key = item.id
            })
            console.log(data.data,'00000000000000000')
            var list= data.data
            var table=[];
            console.log(data.data,'datade??????? ')
            for (var i=0;i<list.length;i++){
               var item= list[i]
            //    item.key=item.id
               var roleid=item.id;
               var rolename=item.roleName;
               var sitem=item.resourcesList;
            //    console.log(item,'item的值')
            //    console.log(sitem,'????????????')
             for(var j=0;j<sitem.length;j++){
                 var lt= sitem[j];
                 lt.key=item.id+'_'+lt.id
                 lt.roleName=rolename;
                 lt.roleId=roleid;
                  table.push(lt)
                    // console.log(lt,'lt')
                    }
            //    console.log(item,'测试tb的值是多少')
            }
            this.setState({
                loading: false,
                tableData:table 
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

            <AddFunction ref={(node) => { this.f = node ;}} disabled={false}/>
            
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
                //  wlFunction : record.id,
                //  wlFunction:record.fuctionName,
                wlName: record.roleName,
                FID:record.roleId
              
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
                     roleName:item.wlName,  //角色名称
                     remark:item.describe,       //描述
                     resourcesIds:item.wlFunction, //选择
                    
                };
                FunctionAdd(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        // data.data.key = data.data.id;
                        // this.state.tableData.push(data.data);
                        this.loadFunction()
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
                    id:item.FID, //id
                    roleName:item.wlName,
                    remark:item.describe,
                    resourcesIds:item.wlFunction,
                    // resourcesIds:[1]

                   
                };
                FunctionEdit(data).then((res) => {
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
                        this.loadFunction()

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
        let data = {roleId: record.roleId};
        FunctionDelete(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
             if (data.code === 200) {
            //     var treeData = this.state.tableData.filter(({id}) => {
            //         if (record.id === id) {
            //             return false;
            //         }
            //         return true;
            //     });
            this.loadFunction()

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

export default WaterLevel1;