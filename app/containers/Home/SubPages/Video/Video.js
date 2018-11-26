import React from 'react';
import ReactDOM from 'react-dom'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, message, Divider , Popconfirm, Spin } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js'

import FormVideo from "./FormVideo.js";
import { postCamera, addCamera, modifyCamera, removeCamera } from '../../../../data/dataStore.js';

// import Vktable from '../../../../../components/Vktable/Vktable.js';
// import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
// import Cover from '../../../../../components/Cover/Cover.js';
import Modal from '../../../../components/Modal/Modal.js';
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class Video extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            tableData:null, //table的数据
            tableSelData:null, //当前选中的行数据
            formDisable:true, //表单可编辑性
            cover:false, //遮盖
            checkedRowData:null, //勾选的行数据,用户删除
            tableSrcollY:0,
            showModal: false, 
            confirmLoading: false,
            dictData:{} //
        }

    }
    render() {
        const columns = [
            {title: '名称',dataIndex: 'name' ,width: "10%"},
            {title: '唯一识别码',dataIndex: 'serialNumber',width: "15%"},
            {title: 'ip地址',dataIndex: 'ip',width: "15%"},
            {title: '端口',dataIndex: 'port',width: "10%"},
            {title: '型号',dataIndex: 'model',width: "15%"},
            {title: '分辨率',dataIndex: 'resolution',width: "10%"},
            {title: '生产厂商', dataIndex: 'manufacturerName', width: "10%"},
            {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            {title: '拼音或首字母', dataIndex: 'pinyininitial', width: "10%"},
            {title: '创建日期', dataIndex: 'gmtCreate', width: "15%"},
            {title: '修改日期', dataIndex: 'gmtModified', width: "15%"},
            {title: '修改', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">删除</a>
                </Popconfirm>;
            }}
        ];
       
        return (
            this.state.loading ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <Row>
                    <Col xs={24} >
                        <div className="ps-ir-title">
                            <Icon type="book"></Icon>
                            视频基础资料
                            <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                        </div>
                        
                        <Divider className="ps-ir-divider"/>
                    </Col>
                    <Col  md={24} >
                        <Table ref="table" size={'small'} bordered={true} scroll={{x:true}} 
                            rowSelection={{columnWidth:"100px",onSelect:this.onSelect,onChange:this.onChange.bind(this)}} columns={columns} 
                            dataSource={this.state.tableData} 
                            onRow={(record, index) => ({
                                onClick: this.onRowClick.bind(this, record, index)
                              })}
                                rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>

                    </Col>
                    <Col  md={16} >
                        {//<FormRive ref="form" disabled={this.state.formDisable}/>
                        }
                    </Col>
                </Row>
                {this.createModal()}
            </div>
            
        )
    }
    componentDidMount() {
        super.componentDidMount();
        this.handlerTableFns();
        this.loadData();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
    
    onRowClick(...args) {
        console.log(args)
    }
    //处理表格的方法,主要表格撑长
    handlerTableFns() {
        let offset = 250;
        this.setState({
            tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
        });
        // let table = this.refs.table;
        // let tableDom = ReactDOM.findDOMNode(table);
        // let tableBodyDom = tableDom.getElementsByClassName("ant-table-body")[0];
        // tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
        this.onresize = () => {
            this.setState({
                tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
            });
            // tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
        }
        window.addEventListener("resize",this.onresize);
    }
    

    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
        console.log("onChange",selectedRowKeys, selectedRows );
        this.setState({
            checkedRowData:selectedRows
        });

    }
    rowClassName(record, index){
        var selData = this.state.tableSelData;
        if (selData && selData.key === record.key) {
            return "row-highlight";
            
        }else{
            return "";
        }
    }
    async loadData() {
        let cameraPromise = postCamera({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });;
        // let jurisdictionTypePromise = getDict(["jurisdiction_type"]);
        let data = await Promise.all([cameraPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            let listData = data[0];
            listData.forEach((item) => {
                item.key = item.id
            })
            // let dictData = data[1];
            this.setState({
                loading: false,
                tableData: listData,
                // dictData: dictData
            })
            
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }

    }
    
    createModal() {
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"}
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}>
            <FormVideo ref={(node) => { this.f = node ;}}  disabled={false}/>
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
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            
            
        });

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
                fvName : record.name,
                fvCode: record.serialNumber,
                fvIP: record.ip,
                fvPort: record.port,
                fvModel: record.model,
                fvResolvingPower: record.resolution,
                fvSupplier: record.manufacturerId,
                fvChineseShort: record.chineseShort,
                fvPinyinInitial: record.pinyinInitial
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
            //     {title: '名称',dataIndex: 'name' ,width: "10%"},
            // {title: '唯一识别码',dataIndex: 'serialNumber',width: "15%"},
            // {title: 'ip地址',dataIndex: 'ip',width: "15%"},
            // {title: '端口',dataIndex: 'port',width: "10%"},
            // {title: '型号',dataIndex: 'model',width: "15%"},
            // {title: '分辨率',dataIndex: 'resolution',width: "10%"},
            // {title: '生产厂商', dataIndex: 'manufactureName', width: "10%"},
            // {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            // {title: '拼音或首字母', dataIndex: 'pinyininitial', width: "10%"},
                let data =  {
                    name : item.fvName,
                    serialNumber: item.fvCode,
                    ip: item.fvIP,
                    port: item.fvPort,
                    model: item.fvModel,
                    resolution: item.fvResolvingPower,
                    manufacturerId: item.fvSupplier,
                    chineseShort: item.fvChineseShort,
                    pinyinInitial: item.fvPinyinInitial
                };
                addCamera(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        data.data.key = data.data.id;
                        this.state.tableData.push(data.data);
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
                    id: id,
                    name : item.fvName,
                    serialNumber: item.fvCode,
                    ip: item.fvIP,
                    port: item.fvPort,
                    model: item.fvModel,
                    resolution: item.fvResolvingPower,
                    manufacturerId: item.fvSupplier,
                    chineseShort: item.fvChineseShort,
                    pinyinInitial: item.fvPinyinInitial
                };
                modifyCamera(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        var d = data.data;
                        d.key = d.id;
                        for (let i = 0; i < this.state.tableData.length; i++) {
                            let item = this.state.tableData[i];
                            if (item.id === d.id) {
                                this.state.tableData[i] = d;
                                break;
                            }
                        }
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
        let data = {id: record.id};
        removeCamera(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            if (data.code === 200) {
                var treeData = this.state.tableData.filter(({id}) => {
                    if (record.id === id) {
                        return false;
                    }
                    return true;
                });
                this.setState({
                    tableData: treeData
                });
            }else{
                message.error(data.msg || "服务器异常!", 5);
            }
            
        }).catch((ex) => {
          
            message.error(ex || "服务器异常!",5);
        });
    }

}

export default Video;