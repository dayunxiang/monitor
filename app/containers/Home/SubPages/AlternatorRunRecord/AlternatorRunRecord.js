import React from 'react';
import { Modal as AntdModal ,DatePicker, Input, Row, Col, Table, Button, message, Spin, Divider, Select, Popconfirm} from '../../../../components/Antd.js';
import NiceSelect from '../../../../components/Select/Select.js';
import {postIrrigationBasic , postAlternatorRunRecord, addAlternatorRunRecord, delAlternatorRunRecord, exportAlternatorRunRecord, importAlternatorRunRecord} from '../../../../data/dataStore.js';
import Modal from '../../../../components/Modal/Modal.js';
import AlternatorForm from "./AlternatorForm.js"
import FileUpload from '../../../../components/FileUpload/FileUpload.js';
const { MonthPicker} = DatePicker;
const Option = Select.Option;
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class AlternatorRunRecord extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            loading: true,
            tableData: null,
            primaryData: null,
            searchBtnLoading: false,
            showModal: false,
            confirmLoading: false,
            modalType: 1, // 1新增,2 上传
        };
        this._search = {
            conValue:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM"),
        }

    }

    render() {
        const columns = [
            {title: '日期', dataIndex: 'gmtCreate', width: "10%"},
            {title: '动车', dataIndex: 'motorCar', width: "10%"},
            {title: '发电', dataIndex: 'generation', width: "10%"},
            {title: '油温', dataIndex: 'oilTemperature', width: "5%"},
            {title: '水温', dataIndex: 'waterTemperature', width: "5%"},
            {title: 'HZ', dataIndex: 'hz', width: "5%"},
            {title: '电压V', dataIndex: 'voltage', width: "5%"},
            {title: '电流A1', dataIndex: 'a1', width: "5%"},
            {title: '电流A2', dataIndex: 'a2', width: "5%"},
            {title: '电流A3', dataIndex: 'a3', width: "5%"},
            {title: '操作者', dataIndex: 'operator', width: "10%"},
            {title: '记录人员', dataIndex: 'recorder', width: "10%"},
            {title: '运行情况', dataIndex: 'runStatus', width: "5%"},
            {title: '备注', dataIndex: 'remark', width: "10%"},
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
                        <Col xs={24} >
                            <Divider className="ps-ir-divider"/>
                            <Table size={'small'} bordered={true} scroll={{x: true}} 
                                columns={columns}
                                dataSource={this.state.tableData}
                                pagination={{defaultPageSize: 30}}/>

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
        if (!this._search.conValue) {
            return message.error("请先选择设施!",5);
        }
        this.setState({
            searchBtnLoading: true
        });
        postAlternatorRunRecord({facilityId: this._search.conValue, insTime: this._search.month, targetId: this._search.type}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
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
    
    conChange(v) {
        this._search.conValue = v;
    }
    createModal() {
        let modal = null;
        if (this.state.modalType === 1) {
            modal = <Modal visible={this.state.showModal} width={"90%"} 
                onClose={() => {this.setState({showModal: false})}}
                onOk={this.modalOkClick.bind(this)}
                title={this._selectMonth + "月"}
                confirmLoading={this.state.confirmLoading}
                >
                    <AlternatorForm ref={(node) => { this.f = node ;}} dictData={this.state.dictData} disabled={false}/>
            </Modal>
        } else if (this.state.modalType === 2) {
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
    newClick() {
        if (!this._selectMonth) {
            return message.error("请先搜索记录",5);
        }
        this.setState({
            showModal: true,
            modalType:1
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
    modalOkClick() {
        this.add()
    }
    add() {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                let item = form.getFieldsValue();
                let addDate = item.atDate.format("YYYY-MM-DD");
                if (addDate.indexOf(this._selectMonth) === -1) {
                    return message.error("请选择"+this._selectMonth+"的日期!", 5);
                }
                if (this._checkHasDate(addDate)) {
                    return message.error("当前时间已存在,请选择其他日期!", 5);
                }
                this.setState({
                    confirmLoading: true
                });
                
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
                addAlternatorRunRecord(data).then((res) => {
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
    _checkHasDate(data) {
        if(!Array.isArray(this.state.tableData)) return;
        for (var i = 0; i < this.state.tableData.length; i++) {
            let d = this.state.tableData[i];
            if (d.insTime === data) {
                return true;
            }
        }
    }
    export() {
        if (!this._search.conValue) {
            return message.error("请先选择设施!",5);
        }
        exportAlternatorRunRecord({facilityId: this._search.conValue, insTime: this._search.month, targetId: this._search.type}).then((res) => {
            if (res.ok) {
                res.blob().then((blob) => {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(blob);
                    var filename = "柴油发电机运行记录";
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
       
        importAlternatorRunRecord(fileData).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data)=>{
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
export default AlternatorRunRecord;