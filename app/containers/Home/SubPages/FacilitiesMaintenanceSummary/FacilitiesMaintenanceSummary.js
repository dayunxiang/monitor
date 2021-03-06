import React from 'react';
import { DatePicker, Input, Row, Col, Table, Button, message, Spin, Divider, Select} from '../../../../components/Antd.js';
import NiceSelect from '../../../../components/Select/Select.js';
import {postIrrigationBasic, postFaMaintainSum,postFaMaintainSumExport } from '../../../../data/dataStore.js';
const { MonthPicker} = DatePicker;
const Option = Select.Option;
import BaseSubPage from '../BaseSubPage.js'
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class FacilitiesMaintenanceSummary extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            loading: true,
            tableData: null,
            primaryData: null,
            searchBtnLoading: false
        };
        this._search = {
            conValue:"",
            month:""
        }
        this.exprot = this.export.bind(this);
    }

    render() {
        const columns = [
            {title: '日期', dataIndex: 'gmtCreate', width: "20%"},
            {title: '编号', dataIndex: 'rectificationSerial', width: "20%"},
            {title: '养护内容', dataIndex: 'content', width: "20%"},
            {title: '养护人', dataIndex: 'reporterName', width: "20%"},
            {title: '备注', dataIndex: 'remark', width: "20%"}
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
                                    <NiceSelect onChange={this.conChange.bind(this)} style={{width: "100%"}} valueText={["id", "name"]} data={this.state.primaryData && this.state.primaryData.conData} maxCount={100}></NiceSelect>
                                </Col>
                            </Col>
                            <Col xxl={5} md={10} sm={12}>
                                <Col xs={8}><label className="ps-search-label">月份</label></Col>
                                <Col xs={16}>
                                    <MonthPicker style={{width: "100%"}} defaultValue={moment(new Date(),"YYYY-MM")} onChange={this.onMonthChange.bind(this)} placeholder="Select month" />
                                </Col>
                            </Col>
                            <Col xxl={5} md={10} sm={12}>
                                <Col xs={5}></Col>
                                <Col xs={19}>
                                    <Button.Group>
                                        <Button type="primary" loading={this.state.searchBtnLoading} onClick={this.searchClick.bind(this)}>搜索</Button>
                                      
                                        <Button type="primary" onClick={this.exprot}>导出</Button>
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
                </div>
        );
    }
    
    componentDidMount() {
        super.componentDidMount();
        this.loadData()
    }
    searchClick() {
        this.setState({
            searchBtnLoading: true
        });
        postFaMaintainSum({conservancyId: this._search.conValue, dateTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
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
        postFaMaintainSumExport({conservancyId: this._search.conValue, dateTime: this._search.month}).then((res) => {
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
export default FacilitiesMaintenanceSummary;