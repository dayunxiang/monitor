
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../../../actions/home.js';
import {Modal, Row, Col, Table, message, Button, DatePicker, Divider, Popconfirm, Carousel } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
// import Test from '../../../../components/test.js';
import {postIrrigationBasic, getDict, postWaterTransRec, addWaterTransRec, delWaterTransRec, postWaterTransImg, exportWaterTransRec} from '../../../../data/dataStore.js';
import NiceSelect from '../../../../components/Select/Select.js';
// import Modal from '../../../../components/Modal/Modal.js';
import WaterTransferForm from './WaterTransferForm.js';

import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker} = DatePicker;

class WaterTransferRecord extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            tableData: [], // table的数据
            primaryData: null,
            searchBtnLoading: false,
            showModal: false,
            modalType: 1,
            selImgs:null
        };
        this._search = {
            conValue:"",
            conText:"",
            month:moment(new Date(),"YYYY-MM").format("YYYY-MM"),
        }
    }
    render() {
        const columns = [
            {title: '日期', dataIndex: 'gmtCreate', width: "20%"},
            {title: '排水', children: [
                {
                    title: '运动时间(小时)',
                    width: "10%",
                    dataIndex: 'drainageTimespan',
                    key: 'drainageTimespan',
                    
                },
                {
                    title: '排水量(立方米)',
                    width: "10%",
                    dataIndex: 'drainageAmount',
                    key: 'drainageAmount'
                }
            ]},
            {title: '引水', children: [
                {
                    title: '运动时间(小时)',
                    width: "10%",
                    dataIndex: 'diversionTimespan',
                    key: 'diversionTimespan'
                },
                {
                    title: '引水量(立方米)',
                    width: "10%",
                    dataIndex: 'diversionAmount',
                    key: 'diversionAmount'
                }
            ]},
            {title: '引排水方式', width: "20%", dataIndex:"diversionDrainageTypeName"},
            {title: '填报人', width: "20%", dataIndex:"recorder"},
            {title: '查看图片', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.seePicClick.bind(this, record)}>查看图片</a>
            }},
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
                                    {
                                        //<Button type="primary">下载</Button>
                                    }
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
        postWaterTransRec({facilityInfoId: this._search.conValue, queryTime: this._search.month}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
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
    export() {
        exportWaterTransRec({facilityInfoId: this._search.conValue, queryTime: this._search.month}).then((res) => {
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
        let modal = null;
        if (this.state.modalType === 1) { // 添加modal
            modal = <Modal visible={this.state.showModal} width={"90%"} 
                onCancel={() => {this.setState({showModal: false})}}
                onOk={this.modalOkClick.bind(this)}
                title={this._selectMonth + "月/" + this._search.conText}
                footer={false}
                destroyOnClose
                >
                    <WaterTransferForm dictData={this.state.dictData} onSubmit={this.modalOkClick.bind(this)} onCancel={() => { this.setState({showModal: false})}} />
            </Modal>
        }else if (this.state.modalType === 2){
            if (!this.state.selImgs || !this.state.selImgs.length) return null;
            let imgs = this.state.selImgs.map((item, i) => {
                return <div key={i}><img key={"bigimg"+i} className="ps-wt-img-big" alt="图片" src={"/api/" + item.imgUrl} /></div>;
            });
            modal = <Modal visible={this.state.showModal} width={"90%"} 
                onCancel={() => {this.setState({showModal: false})}}
                onOk={this.modalOkClick.bind(this)}
                title={"图片"}
                footer={false}
                destroyOnClose
                >
                    <Carousel autoplay>
                    {imgs}
                    </Carousel>
            </Modal>
        }

         
        return modal;
        
    }
    newClick() {
        if (!this._selectMonth) {
            return message.error("请先搜索记录",5);
        }
        this.setState({
            showModal: true,
            modalType: 1
        }, () => {
            // if (!this.f) return;
            // let form = this.f.getForm();
            // form.resetFields();
        });
    }
    removeClick(text, record, index) {
        let ids = record.id;
        delWaterTransRec({id: ids}).then((res) => {
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
        
        let formData= new FormData();
        formData.append("facilityInfoId", this._selectCon);
        formData.append("drainageTimespan", value.wtOutRunTime);
        formData.append("drainageAmount", value.wtOutAmount);
        formData.append("diversionTimespan", value.wtInRunTime);
        formData.append("diversionAmount", value.wtInAmount);
        formData.append("diversionDrainageType", value.wtOutType);
        formData.append("recorder", value.wtReporter);
        formData.append("dsc1", value.content);
        formData.append("dsc2", value.content2);
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
        this.setState({showModal: true})
        addWaterTransRec(formData).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            success && success();
            
            if (data.code === 200) {
                data.data[0].key = data.data[0].id;
                this.state.tableData.push(data.data[0]);
               
            } else {
                
                message.error(data.msg || "服务器异常!", 5);
            }
            this.setState({showModal: false})
            
        }).catch((ex) => {
            success && success();
            this.setState({showModal: false})
            message.error((ex instanceof Object ? ex.toString() : ex) || "服务器异常!",5);
        });
        
    }
    seePicClick(record) {
        postWaterTransImg({id: record.id}).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            if (data.code === 200) {
                let selImgs = data.data[0] && data.data[0].imageDispayVOList;
                this.setState({
                    showModal: true,
                    modalType: 2,
                    selImgs: selImgs
                })
            } else {
                
                message.error(data.msg || "服务器异常!", 5);
            }
            
            
        }).catch((ex) => {
            message.error((ex instanceof Object ? ex.toString() : ex) || "服务器异常!",5);
        });
        
    }
    async loadData() {
        let lstPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        
        let dictPromise = getDict(["pilotage_drain_mode"]);
        
        let data = await Promise.all([lstPromise, dictPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex instanceof Object ? ex.toSting(): ex;;})
        if (Array.isArray(data) && data.length ) {
         
            let conData = data[0];
            let dictData = data[1];
            this.setState({
                loading: false,
                primaryData: {conData},
                dictData: dictData
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
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WaterTransferRecord);

// export default WaterTransferRecord;