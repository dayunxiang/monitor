import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin} from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

// import FormWaterLevel from '../../../SubPages/basic-data/WaterLevel/FormWaterLevel.js'
import AddResource from '../Resource/AddResource.js'
// import {FunctionList, FunctionAdd, FunctionDelete, FunctionEdit} from '../../../../../data/dataStore.js';
import {powerList,powerAdd,powerEdit,powerDelete} from '../../../../../data/dataStore.js' //引入url地址


import Modal from '../../../../../components/Modal/Modal.js';

import './style.css'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class WaterLevel extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            treeData: [], //table的数据
            activeBtn: 1, //默认选中btn
            showModal: false,
            confirmLoading: false,
        }

    }
    render() {
        const columns = [{
            title: '权限组ID',
            dataIndex: 'groupId',
            key: 'name',
          }, {
            title: '权限组命名',
            dataIndex: 'groupName',
            key: 'age',
          },
           {
            title: '设施类型',
            dataIndex: 'resourceType',render:resourceType=>{ 
              if(resourceType==1){
                return '水利设施'
              } else if(resourceType==2){
                return '人员'
              }
             },
            key: 'address',
          },  
          {
              title: '权限名称',
              dataIndex: 'resourceName',
              key: '',
            },  
            {title: '修改', dataIndex: "", width: "5%", render: (text, record, index) => {
              return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
          },
          key:'33'
        },
          {title: '删除', dataIndex: "", width: "5%", render: (text, record, index) => {
              return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                  <a href="#">删除</a>
              </Popconfirm>;
          },key:'4'}
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
        //  this.handlerTableFns();
        // this.loadData();
        this.postList()

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

// 资源权限资料
async postList() {
    let data = await powerList({}).then((res) =>{ return res.json();}).catch(ex => {});
    if (data && data.data ) {
        data.data.forEach((item,index) => {
             item.key = index
        })
        var list= data.data
        var table=[];
        console.log(data.data,'datade??????? ')
        for (var i=0;i<list.length;i++){
           var item= list[i]
        //    item.key=item.id
           var groupid=item.id;
           var groupname=item.groupName;
           var sitem=item.resourcesList;
        //    console.log(item,'item的值')
        //    console.log(sitem,'????????????')
         for(var j=0;j<sitem.length;j++){
             var lt= sitem[j];
             lt.key=item.id+'_'+lt.id
             lt.groupName=groupname;
             lt.groupId=groupid;
              table.push(lt)
                // console.log(lt,'lt')
                }
        //    console.log(item,'测试tb的值是多少')
        }
       
        // console.log(list,'list')
        console.log(table,'table')
        this.setState({
            loading: false,
            tableData:table
        })
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

            <AddResource ref={(node) => { this.f = node ;}} disabled={false}/>
            
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
    newBtnClick(e) {
        this.mode = 1;
        this.setState({
            showModal: true
        },() => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
        }
    );

    }
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
                // wlCode : record.groupId, //
                 wlName: record.groupName,
                 wID:record.groupId
            });
            
        });
    }
    removeClick(text, record, index) {
        this.remove(record);
    }
    // 添加
    add() {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let item = form.getFieldsValue();
                let data =  {
                    resourcesIds:item.wlRange,
                    groupName:item.wlName,
                    remark:item.describe, //组描述 自己填
                    groupLevelCode:item.only, //唯一标识码
                    parentLevelCode:item.parentOnly, //父唯一标识码
                    // id:0,
                    // resourcesList:[],
                };
                powerAdd(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                     if (data.code === 200) {
                    //     console.log(data,'data的值是多少？？？？')
                    //     //  data.data.key = data.data.id;
                    //     this.state.tableData.push(data.data);
                        this. postList()
                         this.setState({
                            confirmLoading: false,
                            showModal: false
                         });
                     }
                      else {
                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                    //     message.error(data.msg || "服务器异常!", 5);
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
                // let  tbl=this.state.tableData.groupId
                let data =  {
                    id:item.wID,
                    resourcesIds:item.wlRange, //权限名称
                    groupName:item.wlName,  //权限组命名
                    remark:item.describe, //组描述 自己填
                    groupLevelCode:item.only, //唯一标识码
                    parentLevelCode:item.parentOnly, //父唯一标识码
                  
                };
                powerEdit(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                     if (data.code === 200) {
                    //     var d = data.data;
                    //     d.key = d.id;
                    //     for (let i = 0; i < this.state.tableData.length; i++) {
                    //         let item = this.state.tableData[i];
                    //         if (item.id === d.id) {
                    //             this.state.tableData[i] = d;
                    //             break;
                    //         }
                    //     }
                    this. postList()

                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                     } else {
                        this.setState({
                            confirmLoading: false,
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
        let data = {groupId: record.groupId};
        powerDelete(data).then((res) => {
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
            this. postList()

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

export default WaterLevel;