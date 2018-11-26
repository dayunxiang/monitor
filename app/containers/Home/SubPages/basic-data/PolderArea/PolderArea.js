import React from 'react';
import ReactDOM from 'react-dom'
import {Modal as AntdModal,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, message, Divider , Popconfirm, Spin} from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

import FormPolderArea from './FormPolderArea.js';
// import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
// import Cover from '../../../../../components/Cover/Cover.js';
import FileUpload from '../../../../../components/FileUpload/FileUpload.js';
import { postPolderArea, addPolderArea, modifyPolderArea, removePolderArea, getDict, importPolderArea } from '../../../../../data/dataStore.js';
import Modal from '../../../../../components/Modal/Modal.js';
// import "./style.css";
class PolderArea extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            formDisable:true, //表单可编辑性
            cover:false, //遮盖
            showModal: false, 
            modalType: 1, // 1新增,2 上传
            confirmLoading: false,
            dictData:{}
        }

    }
    render() {
        const columns = [
            {title: '圩区名称',dataIndex: 'name' ,width: "10%"},
            {title: '控制类型',dataIndex: 'typeName' ,width: "10%"},
            {title: '引排方式',dataIndex: 'typeNamePDM',width: "15%"},
            {title: '圩内控制水位（米）',dataIndex: 'damInsideControlWaterLevel',width: "15%"},
            {title: '圩外常水位（米）',dataIndex: 'damOutsideNormalWaterLevel',width: "10%"},

            {title: '圩内高程',dataIndex: 'damInsideAltitude',width: "10%"},
            {title: '圩堤顶平均宽度',dataIndex: 'damHeadWidth',width: "10%"},
            {title: '圩堤顶高程',dataIndex: 'damHeadAltitude',width: "10%"},
            {title: '圩堤长度',dataIndex: 'damLength',width: "10%"},
            {title: '护坡圩堤长度',dataIndex: 'damProtectSlopeLength',width: "10%"},
            {title: '覆盖面积',dataIndex: 'coverageArea',width: "10%"},
            {title: '水面积（亩）',dataIndex: 'waterArea',width: "10%"},
            {title: '耕地面积（亩）',dataIndex: 'farmlandArea',width: "10%"},
            {title: '排涝控制面积(亩)',dataIndex: 'drainageControlArea',width: "10%"},

            {title: '排水动力', dataIndex: 'drainagePower', width: "10%"},
            {title: '引水动力', dataIndex: 'pilotagePower', width: "10%"},
            {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            {title: '拼音或首字母', dataIndex: 'pinyinInitial', width: "10%"},
            {title: '创建日期', dataIndex: 'gmtCreate', width: "15%"},
            {title: '修改日期', dataIndex: 'gmtModified', width: "15%"},
            {title: '修改', dataIndex: "", width: "50px", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "", width: "50px", fixed:"right", render: (text, record, index) => {
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
                            圩区基础资料
                            <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                            <Button type="primary" size="small" className="ps-new" onClick={this.import.bind(this)}>导入</Button>
                        </div>
                        
                        <Divider className="ps-ir-divider"/>
                    </Col>
                    <Col  md={24} >
                        <Table ref="table" size={'small'} bordered={true} scroll={{x:true}} 
                            rowSelection={{columnWidth:"100px",onSelect:this.onSelect,onChange:this.onChange.bind(this)}} columns={columns} 
                            dataSource={this.state.tableData} 
                            onRow={(record, index) => ({
                                onClick: null
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
        // this.handlerTableFns();
        this.loadData();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
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
    import() {
        this.setState({
            modalType: 2,
            showModal: true
        },() => {
            console.log("gg")
        });
    }
    onImportSubmit(fileList, success) {
        if (!fileList || !fileList.length) return message.error("请选择文件", 5);
        if (fileList.length >1) return message.error("请选择一个文件", 5);
        let fileData = new FormData();
        fileData.append('file', fileList[0]);
       
        importPolderArea(fileData).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data)=>{
            if (data.code === 200) {
                success && success();
                message.success("导入成功,请重新搜索!");
                this.setState({
                    showModal: false
                });
                return 1;
            }else{
                return Promise.reject(data.msg);
            }
            
        }).catch((ex) => {
            success && success();
            message.error((ex instanceof Object ? ex.toString() : ex) || "服务器异常!",5);
        });
    }
    async loadData() {
        let listPromise = postPolderArea().then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let dictPromise = getDict(["pilotage_drain_mode", 'type']);
        let data = await Promise.all([listPromise, dictPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length) {
            let listData = data[0];
            listData.forEach((item) => {
                item.key = item.id
            })
            let dictData = data[1];
            this.setState({
                loading: false,
                tableData: listData,
                dictData: dictData
            })
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }

    }
    
    createModal() {
        let modal = null;
        if (this.state.modalType === 1) {
            modal = <Modal visible={this.state.showModal} width={"90%"}
                onClose={() => {this.setState({showModal: false})}}
                onOk={this.modalOkClick.bind(this)}
                confirmLoading={this.state.confirmLoading}>
                <FormPolderArea ref={(node) => { this.f = node ;}} dictData={this.state.dictData} disabled={false}/>
            </Modal>
        }else if(this.state.modalType === 2) {
             modal = <AntdModal visible={this.state.showModal} width={"20%"} 
                    title="文件上传"
                    footer={false}
                    destroyOnClose
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                    <FileUpload onSubmit={this.onImportSubmit.bind(this)} />
            </AntdModal>
        }
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
            modalType: 1,
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
            modalType: 1,
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            form.setFieldsValue({
                pfName : record.name,
                pfType: record.type+"",
                pfPilotageDrainMode: record.pilotageDrainMode+"",
                pfDamInsideControlWaterLevel: record.damInsideControlWaterLevel,
                pfDamOutsideNormalWaterLevel: record.damOutsideNormalWaterLevel,
                pfDamInsideAltitude: record.damInsideAltitude,
                pfDamHeadWidth : record.damHeadWidth,
                pfDamHeadAltitude: record.damHeadAltitude,
                pfDamLength: record.damLength,
                pfDamProtectSlopeLength: record.damProtectSlopeLength,
                pfCoverageArea: record.coverageArea,
                pfWaterArea : record.waterArea,
                pfFarmlandArea: record.farmlandArea,
                pfDrainageControlArea: record.drainageControlArea,
                pfDrainagePower: record.drainagePower,
                pfPilotagePower: record.pilotagePower,
                pfChineseShort: record.chineseShort,
                pfPinyinInitial: record.pinyinInitial
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
            //     {title: '圩区名称',dataIndex: 'name' ,width: "10%"},
            // {title: '控制类型',dataIndex: 'type' ,width: "10%"},
            // {title: '引排方式',dataIndex: 'pilotageDrainMode',width: "15%"},
            // {title: '圩内控制水位（米）',dataIndex: 'damInsideControlWaterLevel',width: "15%"},
            // {title: '圩外常水位（米）',dataIndex: 'damOutsideNormalWaterLevel',width: "10%"},

            // {title: '圩内高程',dataIndex: 'damInsideAltitude',width: "10%"},
            // {title: '圩堤顶平均宽度',dataIndex: 'damHeadWidth',width: "10%"},
            // {title: '圩堤顶高程',dataIndex: 'damHeadAltitude',width: "10%"},
            // {title: '圩堤长度',dataIndex: 'damLength',width: "10%"},
            // {title: '护坡圩堤长度',dataIndex: 'damProtectSlopeLength',width: "10%"},
            // {title: '覆盖面积',dataIndex: 'coverageArea',width: "10%"},
            // {title: '水面积（亩）',dataIndex: 'waterArea',width: "10%"},
            // {title: '耕地面积（亩）',dataIndex: 'farmlandArea',width: "10%"},
            // {title: '排涝控制面积(亩)',dataIndex: 'drainageControlArea',width: "10%"},

            // {title: '排水动力', dataIndex: 'drainagePower', width: "10%"},
            // {title: '引水动力', dataIndex: 'pilotagePower', width: "10%"},
            // {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            // {title: '拼音或首字母', dataIndex: 'pinyinInitial', width: "10%"},
                let data =  {
                    name : item.pfName,
                    type: item.pfType*1,
                    pilotageDrainMode: item.pfPilotageDrainMode,
                    damInsideControlWaterLevel: item.pfDamInsideControlWaterLevel,
                    damOutsideNormalWaterLevel: item.pfDamOutsideNormalWaterLevel,
                    damInsideAltitude: item.pfDamInsideAltitude,
                    damHeadWidth : item.pfDamHeadWidth,
                    damHeadAltitude: item.pfDamHeadAltitude,
                    damLength: item.pfDamLength,
                    damProtectSlopeLength: item.pfDamProtectSlopeLength,
                    coverageArea: item.pfCoverageArea,
                    waterArea : item.pfWaterArea,
                    farmlandArea: item.pfFarmlandArea,
                    drainageControlArea: item.pfDrainageControlArea,
                    drainagePower: item.pfDrainagePower,
                    pilotagePower: item.pfPilotagePower,
                    chineseShort: item.pfChineseShort,
                    pinyinInitial: item.pfPinyinInitial
                };
                addPolderArea(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        data.data[0].key = data.data[0].id;
                        this.state.tableData.push(data.data[0]);
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
                    name : item.pfName,
                    type: item.pfType*1,
                    pilotageDrainMode: item.pfPilotageDrainMode,
                    damInsideControlWaterLevel: item.pfDamInsideControlWaterLevel,
                    damOutsideNormalWaterLevel: item.pfDamOutsideNormalWaterLevel,
                    damInsideAltitude: item.pfDamInsideAltitude,
                    damHeadWidth : item.pfDamHeadWidth,
                    damHeadAltitude: item.pfDamHeadAltitude,
                    damLength: item.pfDamLength,
                    damProtectSlopeLength: item.pfDamProtectSlopeLength,
                    coverageArea: item.pfCoverageArea,
                    waterArea : item.pfWaterArea,
                    farmlandArea: item.pfFarmlandArea,
                    drainageControlArea: item.pfDrainageControlArea,
                    drainagePower: item.pfDrainagePower,
                    pilotagePower: item.pfPilotagePower,
                    chineseShort: item.pfChineseShort,
                    pinyinInitial: item.pfPinyinInitial
                };
                modifyPolderArea(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        var d = data.data[0];
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
        removePolderArea(data).then((res) => {
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

export default PolderArea;