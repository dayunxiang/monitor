import React from 'react';
import { Modal, DatePicker, Input, Row, Col, Table, Button, message, Spin, Divider, Select} from '../../../../components/Antd.js';
import NiceSelect from '../../../../components/Select/Select.js';
import {postIrrigationBasic, postGreenReportImg, addGreenReportImg, exportGreenReportImg} from '../../../../data/dataStore.js';
const { MonthPicker} = DatePicker;
const Option = Select.Option;
import GreenItem from "./GreenItem.js"
// import Modal from '../../../../components/Modal/Modal.js';
import GreenImageupload from "./GreenImageUpload.js";

import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import "./style.css"
class GreenConservationRecord extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            loading: true,
            tableData: null,
            primaryData: null,
            searchBtnLoading: false,
            showModal: false,
            confirmLoading: false
        };
        this._search = {
            conValue:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM")
        }

    }

    render() {
        const columns = [
            {title: '名称', dataIndex: 'gmtCreate', width: "20%"},
            {title: '计划数量', dataIndex: 'rectificationSerial', width: "20%"},
            {title: '单位', dataIndex: 'content', width: "20%"},
            {title: '完成数量', dataIndex: '', width: "20%"},
            {title: '单位', dataIndex: '', width: "20%"},
            {title: '养护编号', dataIndex: 'reporterName', width: "20%"},
            {title: '备注', dataIndex: 'remark', width: "20%"}
        ];
        let GreenItems = null;
        if (Array.isArray(this.state.tableData)) {
            GreenItems = this.state.tableData.map((item, i) => {
                return <GreenItem key={i} entity={item}></GreenItem>
            });
        }
        return (
            this.state.loading ?
                <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
                <div className="vk-subpage">
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
                                        
                                        <Button type="primary" onClick={this.export.bind(this)}>导出</Button>
                                    </Button.Group>
                                </Col>
                                
                            </Col>
                            <Col xxl={5} md={10} sm={12}>
                                <Col xs={5}></Col>
                                <Col xs={19}>
                                    <Button.Group>
                                        {<Button type="primary" onClick={this.newClick.bind(this)}>添加</Button>}
                                    </Button.Group>
                                </Col>
                            </Col>
                        </Col>
                        <Col xs={24} >
                            <Divider className="ps-ir-divider"/>
                            {GreenItems}

                        </Col>
                        
                    </Row>
                    {this.createModal()}
                </div>
        );
    }
    
    componentDidMount() {
        this.loadData()
    }
    searchClick() {
        this.setState({
            searchBtnLoading: true
        });
        postGreenReportImg({facilityId: this._search.conValue, dateTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                this._selectMonth = this._search.month;
                this._selectCon = this._search.conValue;
                data.data.forEach((item) => {
                    item.key = item.rectificationId
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
    
    conChange(v) {
        this._search.conValue = v;
    }
    export() {
        exportGreenReportImg({facilityId: this._search.conValue, dateTime: this._search.month}).then((res) => {
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
    createModal() {
        let modal  = 
         <Modal visible={this.state.showModal} width={"60%"} 
            onCancel={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            footer={false}
            destroyOnClose
            title={this._selectMonth + "月"}
            confirmLoading={this.state.confirmLoading}
            >
            {
                <GreenImageupload onSubmit={this.modalOkClick.bind(this)} onCancel={() => { this.setState({showModal: false})}} />
            }
        </Modal>
        return modal;
    }
    newClick() {
        if (!this._selectMonth) {
            return message.error("请先搜索记录",5);
        }
        this.setState({
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
        });
    }
    removeClick(text, record, index) {
        let ids = [record.id];
        delAlternatorRunRecord({ids: ids}).then((res) => {
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
    modalOkClick(entity, value, success) {
        this.add(entity, value, success)
    }
    add(entity, value, success) {
        
        this.setState({
            confirmLoading: true
        });
        
        let formData= new FormData();
        formData.append("facilityId", this._selectCon);
        formData.append("dsc1", value.content);
        formData.append("dsc2", value.content2);
        formData.append("dsc3", value.content3);
        if (Array.isArray(value.fileList)) {
            value.fileList.forEach((item) => {
                formData.append("file1", item.originFileObj);
            })
        }
        if (Array.isArray(value.fileList2)) {
            value.fileList2.forEach((item) => {
                formData.append("file2", item.originFileObj);
            })
        }
        if (Array.isArray(value.fileList3)) {
            value.fileList3.forEach((item) => {
                formData.append("file3", item.originFileObj);
            })
        }
        addGreenReportImg(formData).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            success();
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
            success();
            this.setState({
                confirmLoading: false
            });
            message.error(ex || "服务器异常!",5);
        });
            
        
    }
    async loadData() {
        // postCamera, postWaterGate, postWaterPump, postNetwork, postWaterLevel
        // let listPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("列表接口出错");}).then((data) => {
        //     if (data.code === 200) {
        //         return data.data;
        //     }
        //     return Promise.reject(data.msg);
        // });
        let irPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        
        // let dictPromise = getDict(["facility_type", "water_gate_type", "gate_river_position_type", "gate_type"]);
        
        let data = await Promise.all([irPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex instanceof Object ? ex.toSting(): ex;;})
        if (Array.isArray(data) && data.length ) {
            // let listData = data[0]; 
            // if (listData == null) {
            //     listData = [];
            // }
            // listData.forEach((item) => {
            //     item.key = item.id
            // })
            let conData = data[0];
            this.setState({
                loading: false,
                // tableData: listData,
                primaryData: {conData}
            })
            
        }else{
            this.setState({
                loading: false,
            })
            message.error( data ||  "服务器异常!",5);
        }

    }
    
}
export default GreenConservationRecord;