
import React from 'react';
import {Modal, Row, Col, Table, message, Button, DatePicker, Divider, Popconfirm, Icon } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
// import Test from '../../../../components/test.js';
import {postIrrigationBasic, postHealthDuty, addShipPass, delShipPass,updateHealthDuty, importHealthDuty, exportHealthDuty} from '../../../../data/dataStore.js';
import NiceSelect from '../../../../components/Select/Select.js';
// import Modal from '../../../../components/Modal/Modal.js';
// import ShipPassForm from './ShipPassForm.js';
import Vktable from '../../../../components/Vktable/Vktable2.js';
// let abca = require('../../../../../bower_components/kurento-client/js/kurento-client.js');
// import abca from "kurento-client"
import FileUpload from '../../../../components/FileUpload/FileUpload.js';

// console.log(abca);
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker} = DatePicker;

class HealthDutyRecord extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            tableData: [], // table的数据
            primaryData: null,
            searchBtnLoading: false,
            saveBtnLoading: false,
            showModal: false,
            confirmLoading: false,
            enable: false,
            modalType: 1, // 
        };
        this._search = {
            conValue:"",
            conText:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM"),
        }
        this.getSelectData = () =>{
            return [{text:<Icon type="check" style={{color:'#52c41a'}} theme="outlined" />,value:"1"},{text:<Icon type="close" style={{color:'#eb2f96'}} theme="outlined" />,value:"2"}];
        }
    }
    render() {
        const columns = [
            {title: '位置\\日期', dataIndex: 'positionName', type:"Input", componentsWidth:"100px"},
            {title: '负责人', dataIndex:"cleaner", type:"Input", componentsWidth:"100px"},
            {title: '1', width: 100, dataIndex:"d1", type:"Select",getData:this.getSelectData},
            {title: '2', width: 100, dataIndex:"d2",type:"Select",getData:this.getSelectData},
            {title: '3', width: 100, dataIndex:"d3",type:"Select",getData:this.getSelectData},
            {title: '4', width: 100, dataIndex:"d4",type:"Select",getData:this.getSelectData},
            {title: '5', width: 100, dataIndex:"d5",type:"Select",getData:this.getSelectData},
            {title: '6', width: 100, dataIndex:"d6",type:"Select",getData:this.getSelectData},
            {title: '7', width: 100, dataIndex:"d7",type:"Select",getData:this.getSelectData},
            {title: '8', width: 100, dataIndex:"d8",type:"Select",getData:this.getSelectData},
            {title: '9', width: 100, dataIndex:"d9",type:"Select",getData:this.getSelectData},
            {title: '10', width: 100, dataIndex:"d10",type:"Select",getData:this.getSelectData},
            {title: '11', width: 100, dataIndex:"d11",type:"Select",getData:this.getSelectData},
            {title: '12', width: 100, dataIndex:"d12",type:"Select",getData:this.getSelectData},
            {title: '13', width: 100, dataIndex:"d13",type:"Select",getData:this.getSelectData},
            {title: '14', width: 100, dataIndex:"d14",type:"Select",getData:this.getSelectData},
            {title: '15', width: 100, dataIndex:"d15",type:"Select",getData:this.getSelectData},
            {title: '16', width: 100, dataIndex:"d16",type:"Select",getData:this.getSelectData},
            {title: '17', width: 100, dataIndex:"d17",type:"Select",getData:this.getSelectData},
            {title: '18', width: 100, dataIndex:"d18",type:"Select",getData:this.getSelectData},
            {title: '19', width: 100, dataIndex:"d19",type:"Select",getData:this.getSelectData},
            {title: '20', width: 100, dataIndex:"d20",type:"Select",getData:this.getSelectData},
            {title: '21', width: 100, dataIndex:"d21",type:"Select",getData:this.getSelectData},
            {title: '22', width: 100, dataIndex:"d22",type:"Select",getData:this.getSelectData},
            {title: '23', width: 100, dataIndex:"d23",type:"Select",getData:this.getSelectData},
            {title: '24', width: 100, dataIndex:"d24",type:"Select",getData:this.getSelectData},
            {title: '25', width: 100, dataIndex:"d25",type:"Select",getData:this.getSelectData},
            {title: '26', width: 100, dataIndex:"d26",type:"Select",getData:this.getSelectData},
            {title: '27', width: 100, dataIndex:"d27",type:"Select",getData:this.getSelectData},
            {title: '28', width: 100, dataIndex:"d28",type:"Select",getData:this.getSelectData},
            {title: '29', width: 100, dataIndex:"d29",type:"Select",getData:this.getSelectData},
            {title: '30', width: 100, dataIndex:"d30",type:"Select",getData:this.getSelectData},
            {title: '31', width: 100, dataIndex:"d31",type:"Select",getData:this.getSelectData},
          
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
                                    {this.state.enable ? null: <Button type="primary" onClick={this.newClick.bind(this)}>修改记录</Button>}
                                    {this.state.enable ? <Button type="primary" loading={this.state.saveBtnLoading} onClick={this.saveClick.bind(this)}>保存</Button> : null}
                                    {this.state.enable ? <Button type="primary" onClick={this.cancelClick.bind(this)}>取消</Button>: null}
                                </Button.Group>
                            </Col>
                        </Col>
                    </Col>
                    <Col md={24}>
                        <Divider className="ps-ir-divider"/>
                        <Vktable ref={(node) => {this.table = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                         columns={columns} tempKey="vk-mt"
                        />
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
        postHealthDuty({facilityId: this._search.conValue, queryTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                // 记录当前选择的月份
                this._selectMonth = this._search.month;
                this._selectCon = this._search.conValue;
                data.data.forEach((item, i) => {
                    item.key = i;
                    for (var j = 0; j < 31; j++) {
                        item["d"+(j+1)] = item.listStatus && item.listStatus.length && item.listStatus[j] && item.listStatus[j].status && item.listStatus[j].status*1 ? item.listStatus[j].status: ""
                    }
                    
                })
                
                this.table.fill(data.data);
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
        let modal = 
         <Modal visible={this.state.showModal} width={"20%"} 
            title="文件上传"
            footer={false}
            destroyOnClose
            onOk={() => { this.setState({showModal: false})}}
            onCancel={() => { this.setState({showModal: false})}}>
                <FileUpload onSubmit={this.onImportSubmit.bind(this)} />
        </Modal>
        return modal;
    }
    import() {
        this.setState({
            showModal: true
        });
    }
    onImportSubmit(fileList, success) {
        if (!fileList || !fileList.length) return message.error("请选择文件", 5);
        if (fileList.length >1) return message.error("请选择一个文件", 5);
        let fileData = new FormData();
        fileData.append('file', fileList[0]);
       
        importHealthDuty(fileData).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data)=>{
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
        exportHealthDuty({facilityId: this._search.conValue, queryTime: this._search.month}).then((res) => {
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
        if (this._selectMonth && this._selectCon) {
            this.setState({
                enable: true
            })
            this.table.edit(this.state.tableData)
        }else{
            return message.error("请先搜索记录",5);
        }
    }
    saveClick() {
        let data = this.table.getData();
        
        if (!Array.isArray(data) || !data.length) return;
        let para = data.map((d) => {
            return {
                facilityInfoId: this._selectCon,
                queryTime: this._selectMonth,
                positionName: d.positionName,
                cleaner: d.cleaner,
                statusRow: [d.d1, d.d2, d.d3, d.d4,d.d5,d.d6,d.d7,d.d8,d.d9,d.d10,d.d11,d.d12,d.d13,d.d14,d.d15,d.d16,d.d17,d.d18,
                d.d19,d.d20,d.d21,d.d22,d.d23,d.d24,d.d25,d.d26,d.d27,d.d28,d.d29,d.d30,d.d31]
            }
        })
        this.setState({
            saveBtnLoading: true
        });
        updateHealthDuty(para).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            if (data.code === 200) {
                return postHealthDuty({facilityId: this._selectCon, queryTime: this._selectMonth}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");});
            } else {
                return Promise.reject(data.msg || "新增接口出错");
            }
            
        }).then((data) => {
            if (data.code === 200) {
                // 记录当前选择的月份
                data.data.forEach((item, i) => {
                    item.key = i;
                    for (var j = 0; j < 31; j++) {
                        item["d"+(j+1)] = item.listStatus && item.listStatus.length && item.listStatus[j] && item.listStatus[j].status && item.listStatus[j].status*1 ? item.listStatus[j].status: ""
                    }
                })
                
                this.table.fill(data.data);
                this.setState({
                    tableData: data.data,
                    enable: false,
                    saveBtnLoading: false
                });
                return;
            }
            return Promise.reject(data.msg);
        }).catch((ex) => {
            this.setState({
                enable: false,
                saveBtnLoading: false
            });
            message.error((ex instanceof Object ? ex.toString() : ex) || "服务器异常!",5);
        });
    }
    cancelClick() {
        this.setState({
            enable: false
        });
        this.table.fill(this.state.tableData);
    }
    removeClick(text, record, index) {
        let ids = record.id;
        delShipPass({id: ids}).then((res) => {
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
                    // "month":this._selectMonth,
                    "upriverCount" :item.spGateOpenCountUp,
                    "downriverCount":item.spGateOpenCountDown,
                    "dayToll":item.spDayCost,
                    "dayShipCount":item.spDayCount,
                    "dayTonnage":item.spDayTon,
                    "additionalToll":item.spAddGateCost,
                    "additionalShipCount":item.spAddGateCount,
                    "additionalTonnage":item.spAddGateTon,
                    "recorder":item.spReporter,
                };
                addShipPass(data).then((res) => {
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
                    message.error((ex instanceof Object ? ex.toString() : ex) || "服务器异常!",5);
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

export default HealthDutyRecord;