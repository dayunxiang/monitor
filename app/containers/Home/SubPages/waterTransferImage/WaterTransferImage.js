
import React from 'react';
import { Modal, DatePicker, Input, Row, Col, Table, Button, message, Spin, Divider, Select} from '../../../../components/Antd.js';
import NiceSelect from '../../../../components/Select/Select.js';
import {postIrrigationBasic, postWaterTransImg, addWaterTransImg, exportWaterTransImg } from '../../../../data/dataStore.js';
import BaseSubPage from '../BaseSubPage.js'
const { MonthPicker} = DatePicker;
const Option = Select.Option;
// import Modal from '../../../../components/Modal/Modal.js';
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import WaterTransferItem from "./WaterTransferItem.js";
import WaterTransferForm from "./WaterTransferForm.js";
import "./style.css"
class WaterTransferImage extends BaseSubPage {
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
            id:null,
            conValue:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM")
        }

    }

    render() {
       
        let FaMaItems = null;
        if (Array.isArray(this.state.tableData)) {
            FaMaItems = this.state.tableData.map((item, i) => {
                return <WaterTransferItem key={item.id} entity={item} onSubmit={this.onSubmit.bind(this)}></WaterTransferItem>
            });
        }
        return (
            this.state.loading ?
                <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
                <div className="vk-subpage">
                
                    <Row>
                        {
                        <Col xs={24} >
                            <Col md={5}>
                                <Col md={8}><label className="ps-search-label">设施名称</label></Col>
                                <Col md={16}>
                                    <NiceSelect defaultValue={this._search.conValue} onChange={this.conChange.bind(this)} style={{width: "100%"}} valueText={["id", "name"]} data={this.state.primaryData && this.state.primaryData.conData} maxCount={100}></NiceSelect>
                                </Col>
                            </Col>
                            <Col md={5}>
                                <Col md={8}><label className="ps-search-label">月份</label></Col>
                                <Col md={16}>
                                    <MonthPicker style={{width: "100%"}} defaultValue={moment(this._search.month,"YYYY-MM")} onChange={this.onMonthChange.bind(this)} placeholder="Select month" />
                                </Col>
                            </Col>
                            <Col md={5}>
                                <Col xs={5}></Col>
                                <Col xs={19}>
                                    <Button.Group>
                                        <Button type="primary" loading={this.state.searchBtnLoading} onClick={this.searchClick.bind(this)}>搜索</Button>
                                        <Button type="primary" onClick={this.export.bind(this)}>导出</Button>
                                    </Button.Group>
                                </Col>
                                
                            </Col>
                            
                        </Col>
                        }
                        <Col xs={24} >
                            <Divider className="ps-ir-divider"/>
                            { FaMaItems }
                        </Col>
                        
                    </Row>

                    {this.createModal()}
                </div>
        );
    }
    
    componentDidMount() {
        this.loadData()
        if (this.props.id != null) {
            this._search.id = this.props.id;
            this.searchClick()
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.id) { //redux 过来的id
            if (this.props.id === prevProps.id) return;
            this._search.id = this.props.id;
            this.searchClick()
        }
        
    }
    searchClick() {
        this.setState({
            searchBtnLoading: true
        });
        postWaterTransImg({facilityInfoId: this._search.conValue, queryTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                // 记录当前选择的月份
                // this._selectMonth = this._search.month;
                // this._selectCon = this._search.conValue;
                data.data.forEach((item) => {
                    item.key = item.id
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
    export() {
        exportWaterTransImg({facilityInfoId: this._search.conValue, queryTime: this._search.month, page:1, size:3}).then((res) => {
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
    onMonthChange(v){
        let month = v.format('YYYY-MM');
        // console.log(month)
        this._search.month = month;
    }
    
    conChange(v) {
        this._search.conValue = v;
    }
    onSubmit(entity, value, success) {
        console.log(entity, value, success);
        window.setTimeout(() => {
            success&&success();
        }, 2000)
    }
    createModal() {
        let modal = 
        
        <Modal
        title="添加调水图片"
        width={"60%"}
        footer={false}
        destroyOnClose
        visible={this.state.showModal}
        onOk={() => { this.setState({showModal: false})}}
        onCancel={() => { this.setState({showModal: false})}}>
            {
                 <WaterTransferForm onSubmit={this.modalOkClick.bind(this)} onCancel={() => { this.setState({showModal: false})}} />
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
        
        return success();
        
        let data =  {
            "facilityId":this._selectCon,
            "gmtCreate" :item.atDate.format("YYYY-MM-DD"),
            "motorCar":item.atMotorCar,
            "generation":item.atGeneration,
            "oilTemperature":item.atOilTemperature,
            "waterTemperature":item.atWaterTemperature,
            "hz":item.atHz,
            "voltage":item.atVoltage,
            "a1":item.atA1,
            "a2":item.atA2,
            "a3":item.atA3,
            "operator":item.atOperator,
            "runStatus":item.atRecorder,
            "remark":item.atRunStatus,
            "recorder":item.atRemark
        };
        addWaterTransImg(data).then((res) => {
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
export default WaterTransferImage;