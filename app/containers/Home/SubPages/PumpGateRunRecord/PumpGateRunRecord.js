
import React from 'react';
import {Modal as AntdModal, Row, Col, Table, message, Button, DatePicker, Divider, Popconfirm } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
// import Test from '../../../../components/test.js';
import {postIrrigationBasic, postPumpGate, addPumpGate, delPumpGate, importPumpGate, exportPumpGate} from '../../../../data/dataStore.js';
import NiceSelect from '../../../../components/Select/Select.js';
import Modal from '../../../../components/Modal/Modal.js';
import FileUpload from '../../../../components/FileUpload/FileUpload.js';
import PumpGateForm from './PumpGateForm.js';

import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker} = DatePicker;

class PumpGateRunRecord extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            tableData: [], // table的数据
            primaryData: null,
            searchBtnLoading: false,
            showModal: false,
            modalType: 1, // 1新增,2 上传
            confirmLoading: false
        };
        this._search = {
            conValue:"",
            conText:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM"),
        }
    }
    render() {
        const columns = [
            {title: '日期', dataIndex: 'gmtModified', width: "10%"},
            {title: '泵机运转情况', children: [
                {
                    title: '泵号',
                    width: "10%",
                    dataIndex: 'pumpNum',
                    key: 'pumpNum',
                    
                },
                {
                    title: '启动时间',
                    width: "10%",
                    dataIndex: 'pumpOpenTime',
                    key: 'pumpOpenTime'
                },
                {
                    title: '停机时间',
                    width: "10%",
                    dataIndex: 'pumpCloseTime',
                    key: 'pumpCloseTime'
                },
                {
                    title: '累计时间(小时)',
                    width: "5%",
                    dataIndex: 'pumCountTime',
                    key: 'pumCountTime'
                }
            ]},
            {title: '电气运行情况', children: [
                {
                    title: '电压(V)',
                    width: "5%",
                    dataIndex: 'voltage',
                    key: 'voltage'
                },
                {
                    title: '电流(A)',
                    width: "5%",
                    dataIndex: 'electric',
                    key: 'electric'
                }
            ]},
            {title: '闸门运行情况', children: [
                {
                    title: '开启时间',
                    width: "10%",
                    dataIndex: 'gateOpenTime',
                    key: 'gateOpenTime',
                    
                },
                {
                    title: '关闭时间',
                    width: "10%",
                    dataIndex: 'gateCloseTime',
                    key: 'gateCloseTime',
                    
                },
                {
                    title: '累计时间(小时)',
                    width: "5%",
                    dataIndex: 'gateCountTime',
                    key: 'gateCountTime',
                }
            ]},
            {title: '操作员', width: "5%", dataIndex:"operator"},
            {title: '填报人', width: "5%", dataIndex:"recorder"},
            {title: '备注', width: "10%", dataIndex:"remark"},
            {title: '删除', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">删除</a>
                </Popconfirm>;
            }}  
        ];
        return (
            <div className="vk-subpage" >
                <Row>
                    <Col xs={24} >
                        <Col xxl={5} md={10} sm={12}>
                            <Col xs={8}><label className="ps-search-label">设施名称</label></Col>
                            <Col xs={16}>
                                <NiceSelect defaultValue={this._search.conValue} onChange={this.conChange.bind(this)} style={{width: "100%"}} valueText={["id", "name"]} data={this.state.primaryData && this.state.primaryData.conData} maxCount={100}></NiceSelect>
                            </Col>
                        </Col>
                        <Col xxl={5} md={10} sm={12}>
                            <Col xs={8}><label className="ps-search-label">月份</label></Col>
                            <Col xs={16}>
                                <MonthPicker style={{width: "100%"}} defaultValue={moment(this._search.month,"YYYY-MM")} onChange={this.onMonthChange.bind(this)} placeholder="Select month" />
                            </Col>
                        </Col>
                        
                        <Col xxl={5} md={10} sm={12}>
                            <Col xs={5}></Col>
                            <Col xs={19}>
                                <Button.Group>
                                    <Button type="primary" loading={this.state.searchBtnLoading} onClick={this.searchClick.bind(this)}>搜索</Button>
                                    <Button type="primary" onClick={this.import.bind(this)}>导入</Button>
                                    <Button type="primary" onClick={this.export.bind(this)}>导出</Button>
                                </Button.Group>
                            </Col>
                            
                        </Col>
                        <Col xxl={5} md={10} sm={12}>
                            <Col xs={5}></Col>
                            <Col xs={19}>
                                <Button.Group>
                                    <Button type="primary" onClick={this.newClick.bind(this)}>添加记录</Button>
                                </Button.Group>
                            </Col>
                        </Col>
                    </Col>
                    <Col md={24}>
                        <Divider className="ps-ir-divider"/>
                        <Table ref="table"  bordered={true} 
                            columns={columns} 
                            dataSource={this.state.tableData} onRow={(record, index) =>{ return { onClick: this.tableRowClick.bind(this, record, index) }}}
                            pagination={{defaultPageSize:20}}/>
                    </Col>
                </Row>
                {this.createModal()}
            </div>
        );
    }
    componentDidMount() {
        super.componentDidMount();
        this.loadData()
    }
    searchClick() {
        if (!this._search.conValue) {
            return message.error("请先选择设施!",5);
        }
        this.setState({
            searchBtnLoading: true
        });
        postPumpGate({facilityInfoId: this._search.conValue, queryTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                // 记录当前选择的月份
                this._selectMonth = this._search.month;
                this._selectCon = this._search.conValue;
                data.data.forEach((item) => {
                    item.key = item.id;
                })
                this.setState({
                    tableData: data.data,
                    searchBtnLoading: false
                });
                return;
            }
            return Promise.reject(data.msg);
        }).catch((ex) =>{
            this.setState({
                searchBtnLoading: false
            });
            message.error( ex ||  "服务器异常!",5);
        });
    }
    onMonthChange(v){
        let month = v.format('YYYY-MM');
        // console.log(month)
        this._search.month = month;
    }
    
    conChange(v, option) {
        this._search.conValue = v;
        this._search.conText = option.props.children;
    }
    createModal() {
        let modal = null;
        if (this.state.modalType === 1) {
            modal = <Modal visible={this.state.showModal} width={"90%"} 
                onClose={() => {this.setState({showModal: false})}}
                onOk={this.modalOkClick.bind(this)}
                title={this._selectMonth + "月/" + this._search.conText}
                confirmLoading={this.state.confirmLoading}
                >
                    <PumpGateForm ref={(node) => { this.f = node ;}}  disabled={false}/>
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
    import() {
        this.setState({
            modalType: 2,
            showModal: true
        });
    }
    onImportSubmit(fileList, success) {
        if (!fileList || !fileList.length) return message.error("请选择文件", 5);
        if (fileList.length >1) return message.error("请选择一个文件", 5);
        let fileData = new FormData();
        fileData.append('file', fileList[0]);
       
        importPumpGate(fileData).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data)=>{
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
    export() {
        exportPumpGate({facilityInfoId: this._search.conValue, queryTime: this._search.month}).then((res) => {
            if (res.ok) {
                res.blob().then((blob) => {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(blob);
                    var filename = "下载文件";
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
            }else{
                return Promise.reject("导出失败");
            }
            
            
        }).catch((ex)=> {
            let exMsg = ex instanceof Object ? ex.toString() : ex;
            message.error(exMsg,5);
        });
    }
    newClick() {
        if (!this._selectMonth) {
            return message.error("请先搜索记录",5);
        }
        this.setState({
            modalType: 1,
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
        });
    }
    removeClick(text, record, index) {
        let ids = record.id;
        delPumpGate({id: ids}).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            if (data.code === 200) {
                var newData = this.state.tableData.filter(({id}) => {
                    if (record.id === id) {
                        return false;
                    }
                    return true;
                });
                this.setState({
                    tableData: newData
                });
            }else{
                message.error(data.msg || "服务器异常!", 5);
            }
        }).catch((ex) => {
            message.error(ex || "服务器异常!",5);
        });
    }
    modalOkClick() {
        this.add()
    }
    add() {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                let item = form.getFieldsValue();
                if (item.pgfPumpOpenTime > item.pgfPumpCloseTime) {
                    return message.error("泵关闭时间不能小于开启时间", 5);
                }
                if (item.pgfGateStartTime > item.pgfGateCloseTime) {
                    return message.error("闸门关闭时间不能小于开启时间", 5);
                }
                this.setState({
                    confirmLoading: true
                });
                
                let data =  {
                    "facilityInfoId":this._selectCon,
                    "month":this._selectMonth,
                    "pumpNum" :item.pgfPumpNo,
                    "pumpOpenTime":item.pgfPumpOpenTime.format("YYYY-MM-DD HH:mm:ss"),
                    "pumpCloseTime":item.pgfPumpCloseTime.format("YYYY-MM-DD HH:mm:ss"),
                    "voltage":item.pgfVoltage,
                    "electric":item.pgfElectric,
                    "gateOpenTime":item.pgfGateStartTime.format("YYYY-MM-DD HH:mm:ss"),
                    "gateCloseTime":item.pgfGateCloseTime.format("YYYY-MM-DD HH:mm:ss"),
                    "operator":item.pgfOperator,
                    "recorder":item.pgfReporter,
                    "remark":item.pgfRemark
                };
                addPumpGate(data).then((res) => {
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
    async loadData() {
        let lstPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        
        // let dictPromise = getDict(["facility_type", "water_gate_type", "gate_river_position_type", "gate_type"]);
        
        let data = await Promise.all([lstPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex instanceof Object ? ex.toSting(): ex;;})
        if (Array.isArray(data) && data.length ) {
         
            let conData = data[0];
            this.setState({
                loading: false,
                primaryData: {conData}
            })
            
        }else{
            this.setState({
                loading: false,
            })
            message.error( data ||  "服务器异常!",5);
        }
        
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    tableRowClick(record, index) {

    }
}

export default PumpGateRunRecord;