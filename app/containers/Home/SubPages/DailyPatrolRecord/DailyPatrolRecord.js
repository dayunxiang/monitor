import React from 'react';
import { Modal, Carousel, DatePicker, Input, Row, Col, Table, Button, message, Spin, Divider, Select} from '../../../../components/Antd.js';
import NiceSelect from '../../../../components/Select/Select.js';
import {postIrrigationBasic , dailyPatrol, dailyPatrolExport} from '../../../../data/dataStore.js';
const { MonthPicker} = DatePicker;
const Option = Select.Option;
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class DailyPatrolRecord extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            loading: true,
            tableData: null,
            primaryData: null,
            searchBtnLoading: false,
            showModal: false
        };
        this._search = {
            conValue:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM"),
            type:""
        }
        this.exprot = this.export.bind(this);
    }

    render() {
        const columns = [
            {title: '日期', dataIndex: 'insTime', width: "20%"},
            {title: '巡查结果', dataIndex: 'isAbnormal', width: "20%", render:(text, record, index)=>{
                return text ? "正常" : "异常";
            }},
            {title: '巡查员', dataIndex: 'reporterName', width: "20%"},
            {title: '养护记录表编号', dataIndex: 'rectSerial', width: "20%", render: (text, record, index) => {
                return <a href="JavaScript:void(0)" onClick={this.showImgClick.bind(this, record)}>{text}</a>
            }},
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
                                <Col xs={8}><label className="ps-search-label">巡检类型</label></Col>
                                <Col xs={16}>
                                    <Select style={{width: "100%"}} defaultValue={this._search.type} onChange={this.typeChange.bind(this)}>
                                        <Option value="">全部</Option>
                                        <Option value="1">闸门及金属结构</Option>
                                        <Option value="2">卷扬式启闭机</Option>
                                        <Option value="3">水泵</Option>
                                        <Option value="4">高、低压开关柜</Option>
                                        <Option value="5">现场控制柜</Option>
                                        <Option value="6">水工建筑物</Option>
                                    </Select>
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
        dailyPatrol({facilityId: this._search.conValue, insTime: this._search.month, targetId: this._search.type}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                data.data.forEach((item) => {
                    item.key = item.facilityName +"-"+item.rectSerial
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
    typeChange(v){
        this._search.type = v;
    }
    createModal() {
        let modal = null;
      
        if (!this.state.selImgs || !this.state.selImgs.length) return null;
        let imgs = this.state.selImgs.map((item, i) => {
            return <div key={i}><img key={"bigimg"+i} className="ps-wt-img-big" alt="图片" src={"/api/" + item} /></div>;
        });
        modal = <Modal visible={this.state.showModal} width={"90%"}
            title={"图片"}
            footer={false}
            onCancel={() => { this.setState({showModal: false})}}
            destroyOnClose
            >
                <Carousel autoplay>
                {imgs}
                </Carousel>
        </Modal>

         
        return modal;
        
    }
    export() {
        dailyPatrolExport({facilityId: this._search.conValue, insTime: this._search.month, targetId: this._search.type}).then((res) => {
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
    showImgClick(record) {
        this.setState({
            showModal: true,
            selImgs: record.images
        })
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
export default DailyPatrolRecord;