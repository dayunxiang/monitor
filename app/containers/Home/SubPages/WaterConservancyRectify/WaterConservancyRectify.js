import React from 'react';
import ReactDOM from 'react-dom'
import { Modal, DatePicker, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, message, Divider , Popconfirm, Spin } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js'
const RangePicker = DatePicker.RangePicker
import {getOperationBtns} from "./rectifyUtil.js";
import RectifyNotice from "./RectifyNotice.js"
const confirm = Modal.confirm;
import RectifyUpload from "./RectifyUpload.js"
import RectifyApproveMenoy from "./RectifyApproveMenoy.js"
import RectifyReport from "./RectifyReport.js"
import RectifyConfirm from "./RectifyConfirm.js"
import RectifyLog from "../../../../components/RectifyLog/RectifyLog.js"

import { postRectifyList, getDict,postRectifyReport, postRectifyReview, postRectifySend, postRectifyStart, postRectifyCommit, postRectifySure,
postRectifyComplete, postRectifyCancel, postRectifyReject, postRectifyFindOne,postIrrigationBasic,postRectifyLog, postInRectify,
postRectifyInCommit, postRectifyInComplete, postRectifyInReject  } from '../../../../data/dataStore.js';
import * as constants from "./RectifyConstants.js"
const Option = Select.Option;
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// import "./style.css";
class WaterConservancyRectify extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            tableData:null, //table的数据
            tableSelData:null, //当前选中的行数据
            formDisable:true, //表单可编辑性
            dictData:null, //
            primaryData: null,
            selRecord: null, //当前选中的记录
            showModal: false,// 模态框的可见性
            showModalType:1,// 1仅仅查看,2开始整改,3提交整改,4 整改,5 汇报
            noticeLoading: false,// 查看详情转圈
            conSearchInputValue: "", //
            conSearchValue: "",
            stateSearchValue:"",
            searchBtnLoading: false
        };
        this.primaryData = null;
        this.cach = {}; //缓存 优化
    }
    render() {
        let {userinfo} = this.props
        const columns = [
            {title: '问题编号',dataIndex: 'rectificationSerial' ,width: "10%",render:(text, record, index) =>{
                return <a href="javascript:void(0)" onClick={this.showRectifyPage.bind(this, record)}>{text}</a>
            }},
            {title: '问题设施',dataIndex: 'conservancyName',width: "15%"},
            {title: '报告时间',dataIndex: 'gmtModified',width: "15%" , defaultSortOrder:"descend", sorter: (a,b)=>{
                    if (a.gmtModified > b.gmtModified) {
                        return 1;
                    }else if(a.gmtModified < b.gmtModified){
                        return -1;
                    }else{
                        return 0;
                    }
                 }
            },
            {title: '报告人',dataIndex: 'reporterName',width: "10%"},
            {title: '问题点', dataIndex: 'targetName', width: "10%"},
            {title: '问题内容', dataIndex: 'subTargetName', width: "10%"},
            {title: '状态', dataIndex: 'processStateName', width: "10%"},
            {title: '日志', dataIndex: '', width: "10%", render:(text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.logClick.bind(this, record)}>日志</a>
            }},
            {title: '操作', dataIndex: '', width: "10%", render:(text, record, index) => {
                let options = getOperationBtns(userinfo.userType, record.processState);
                let btns = options.map(({key, name}) => {
                    return <Button key={key} type="primary" size="small" ghost onClick={this.optionBtnClick.bind(this, record, key, name)}>{name}</Button>;
                });
                return btns;
            }}
            
        ];
        let conOptions = [<Option key="null" value="">全部</Option>];
        if (this.primaryData && this.primaryData.conData && this.primaryData.conData.length) {
            let v =  this.state.conSearchInputValue, d = this.primaryData.conData ;
            for (var i = 0; i < d.length; i++) {
                let item = d[i]
                if (item.name.indexOf(v) > -1) {
                    conOptions.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
                    if (conOptions.length >= 100 ) {
                        break;
                    }
                }
            }
        }
        let stateOptions = null;
        if (this.state.dictData && this.state.dictData.process_state) {
            if (this.cach["process_state"]) {
                stateOptions = this.cach["process_state"]
            }else{
                stateOptions = this.state.dictData.process_state.map(({text, value}) => {
                    return <Option key={value} value={value}>{text}</Option>
                });
                stateOptions.unshift(<Option key="null" value="">全部</Option>);
                this.cach["process_state"] = stateOptions;
            }
        }
        return (
            this.state.loading ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <Row>
                    <Col xs={24} >
                        <div className="ps-ir-title">
                            <Icon type="book"></Icon>
                            水利整改信息
                        </div>
                        
                        <Divider className="ps-ir-divider"/>
                    </Col>
                    <Col  md={24} >
                    {
                        // <Col md={5}>
                        //     <Col md={24}>
                        //         <RangePicker />
                        //     </Col>
                        // </Col>
                    }
                        <Col xxl={5} md={8} sm={12}>
                            <Col xs={8}><label className="ps-search-label">水利设施</label></Col>
                            <Col xs={16}>
                                <Select ref={node =>{ this.conSelect = node}} showSearch filterOption={this.conFilterOption} onSearch={this.conSearch.bind(this)} onChange={this.conChange.bind(this)} value={this.state.conSearchValue} style={{ width: '100%' }}>
                                    {conOptions}
                                </Select>
                            </Col>
                        </Col>
                        <Col xxl={5} md={8} sm={12}>
                            <Col xs={8}><label className="ps-search-label">状态</label></Col>
                            <Col xs={16}>
                                <Select ref={node =>{ this.stateSelect = node}} showSearch filterOption={this.filterOption} onChange={this.conStateChange.bind(this)} value={this.state.stateSearchValue} style={{ width: '100%' }}>
                                    {stateOptions}
                                </Select>
                            </Col>
                        </Col>
                    {
                        // <Col md={5}>
                        //     <Col md={8}><label className="ps-search-label">问题点</label></Col>
                        //     <Col md={16}>
                        //         <Select defaultValue="1" style={{ width: '100%' }}>
                        //             <Option value="1">全部</Option>
                        //         </Select>
                        //     </Col>
                        // </Col>
                    }
                        
                        <Col xxl={5} md={8} sm={12}>
                            <Col xs={20} offset={4}>
                                <Button.Group>
                                    <Button type="primary" loading={this.state.searchBtnLoading} onClick={this.searchBtnClick.bind(this)}>搜索</Button>
                                    <Button type="primary">导出</Button>
                                </Button.Group>
                            </Col>
                        </Col>
                    </Col>
                    <Col className="ps-ir-table" md={24} >
                        <Table ref="table" size={'small'} bordered={true} scroll={{x:true}} 
                            columns={columns} 
                            dataSource={this.state.tableData} 
                            onRow={(record, index) => ({
                                onClick: this.onRowClick.bind(this, record, index)
                              })}
                                rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>

                    </Col>
                    
                </Row>
                {this.showModal()}
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
    conFilterOption() {
        return true;
    }
    filterOption(value, option) {
        if (option.props.children && option.props.children.indexOf(value) > -1 ) {
            return true;
        }
        return false;
    }
    conSearch(value) {
        console.log(this._time);
        if (this._time) {
            window.clearTimeout(this._time);
        }
        console.log("after", this._time);
        this._time = window.setTimeout(() => {
            console.log("done", this._time);
            this.setState({
                conSearchInputValue: value
            })
        },300)
        
    }
    conChange(e) {
        this.setState({
            conSearchValue: e
        })
    }
    conStateChange(e) {
        this.setState({
            stateSearchValue: e
        })
    }
    searchBtnClick(e) {
        this.setState({
            searchBtnLoading: true
        });
        console.log(this.state.conSearchValue, this.state.stateSearchValue);
        let listPromise = postRectifyList({conservancyId: this.state.conSearchValue, processState: this.state.stateSearchValue}).then((res) =>{ return res.ok ? res.json() : Promise.reject("整改接口出错");}).then((data) => {
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
        }).catch((ex) => {
            this.setState({
                searchBtnLoading: false
            });
            message.error( ex ||  "服务器异常!",5);
        });
    }
    onRowClick(...args) {
        // console.log(args)
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
    showRectifyPage(record) {
        this.setState({
            showModalType:1,
            showModal: true,
            // selRecord: record,
            noticeLoading: true
        })

        postRectifyFindOne({rectificationId: record.rectificationId}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
        .then((data) => {
            if (data.code === 200) {
                
                this.setState({
                    selRecord: data.data,
                    noticeLoading: false
                })
                return data.data;
            }
            return Promise.reject(data.msg);
        })
        .catch((ex) => {
            message.error( ex ||  "服务器异常!",5);
        })
       

    }
    logClick(record) {
        this.setState({
            showModalType:constants.RECTIFY_LOG,
            showModal: true,
            noticeLoading: true
        })
        let listPromise = postRectifyLog({rectificationId: record.rectificationId}).then((res) =>{ return res.ok ? res.json() : Promise.reject("整改接口出错");}).then((data) => {
            if (data.code === 200) {
                let list = data.data && data.data.processFlowList;
                let entitys = [
                    {title:"发现问题", children:[]},
                    {title:"汇报问题", children:[]},
                    {title:"处理问题", children:[]},
                    {title:"整改问题", children:[]},
                    {title:"审核结果", children:[]},
                    {title:"流程结束", children:[]},
                ]
                if(Array.isArray(list)){
                    for (var i = 0; i < list.length; i++) {
                        let d = list[i]
                        switch (d.processState) {
                            case 3001: entitys[0].children.push({title:"发现问题", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3002: entitys[1].children.push({title:"汇报问题", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3003: entitys[2].children.push({title:"复核问题", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3004: entitys[2].children.push({title:"整改下发", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3005: entitys[3].children.push({title:"开始整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3006: entitys[3].children.push({title:"提交整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3007: entitys[4].children.push({title:"问题确认", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3008: entitys[5].children.push({title:"整改完成", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3009: entitys[5].children.push({title:"已撤销", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3010: entitys[4].children.push({title:"驳回", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3015: entitys[2].children.push({title:"内部整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3016: entitys[3].children.push({title:"内部提交整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                        }
                    }
                }

                this.setState({
                    showModalType:constants.RECTIFY_LOG,
                    showModal: true,
                    selRecord: entitys,
                    noticeLoading: false
                })
                return;
            }
            return Promise.reject(data.msg);
        });
        
    }
    showModal() {
        let modal = null;
        switch (this.state.showModalType) {
            case 1: // 显示整改单
                modal = (
                    <Modal
                    title="整改信息"
                    footer={false}
                    destroyOnClose
                    width={"80%"}
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        <RectifyNotice loading={this.state.noticeLoading} showTools={false} entity={this.state.selRecord} optionBtnClick={this.optionBtnClick.bind(this)}></RectifyNotice>
                    </Modal>
                )
                break;
            case constants.RECTIFY_START: // 显示开始整改
                modal = (
                    <Modal
                    title="整改"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        <RectifyUpload show={this.state.showModal} entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyUpload>
                    </Modal>
                )
                break;
            case constants.RECTIFY_SUBMIT: // 显示提交整改
                modal = (
                    <Modal
                    title="整改"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        <RectifyUpload show={this.state.showModal} entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyUpload>
                    </Modal>
                )
                break;
            case constants.RECTIFY_RECTIFY: // 显示整改
                modal = (
                    <Modal
                    title="整改"
                    footer={false}
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyApproveMenoy entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyApproveMenoy>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_REPORT: // 显示汇报
                modal = (
                    <Modal
                    title="整改"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyReport entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyReport>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_REVIEW: // 显示复核
                modal = (
                    <Modal
                    title="是否确认整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否确认整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_SURE: // 显示确认整改
                modal = (
                    <Modal
                    title="是否确认整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否确认整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_FINISH: // 显示完成整改
                modal = (
                    <Modal
                    title="是否完成整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否确认整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_CANCEL: // 显示取消整改
                modal = (
                    <Modal
                    title="是否取消整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否确认整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_REJECT: // 显示驳回整改
                modal = (
                    <Modal
                    title="是否驳回整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyUpload show={this.state.showModal} entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyUpload>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_LOG: // 显示日志
                modal = (
                    <Modal
                    title="整改日志"
                    footer={false}
                    destroyOnClose
                    width={"80%"}
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyLog entity={this.state.selRecord} loading={this.state.noticeLoading} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyLog>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_INRECTIFY: // 内部整改
                modal = (
                    <Modal
                    title="整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否内部整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_INSUBMIT: // 内部提交整改
                modal = (
                   <Modal
                    title="整改"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        <RectifyUpload show={this.state.showModal} entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyUpload>
                    </Modal>
                )
                break;
            case constants.RECTIFY_INFINISH: // 内部完成整改
                modal = (
                    <Modal
                    title="整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyConfirm entity={this.state.selRecord} content={"是否完成整改?"} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyConfirm>
                        }
                    </Modal>
                )
                break;
            case constants.RECTIFY_INREJECT: // 内部驳回
                modal = (
                    <Modal
                    title="是否驳回整改?"
                    footer={false}
                    destroyOnClose
                    visible={this.state.showModal}
                    onOk={() => { this.setState({showModal: false})}}
                    onCancel={() => { this.setState({showModal: false})}}>
                        {
                            <RectifyUpload show={this.state.showModal} entity={this.state.selRecord} onSubmit={this.rectifySubmit.bind(this, this.state.showModalType)} onCancel={() => {this.setState({showModal: false})}}></RectifyUpload>
                        }
                    </Modal>
                )
                break;

        }
        return modal;
        
    }
    optionBtnClick(record, key, name) {
        switch (key) {
            case "report": // 汇报
                this.setState({
                    showModalType:constants.RECTIFY_REPORT,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "cancel": // 取消
                this.setState({
                    showModalType:constants.RECTIFY_CANCEL,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "review": // 复核
                this.setState({
                    showModalType:constants.RECTIFY_REVIEW,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "rectify": // 整改
                this.setState({
                    showModalType:constants.RECTIFY_RECTIFY,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "startRectify": // 开始整改
                this.setState({
                    showModalType:constants.RECTIFY_START,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "submitRectify": // 提交整改
                this.setState({
                    showModalType:constants.RECTIFY_SUBMIT,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "sureRectify": // 确认整改
                this.setState({
                    showModalType:constants.RECTIFY_SURE,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "finishRectify": // 完成整改
                this.setState({
                    showModalType:constants.RECTIFY_FINISH,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "reject": // 驳回
                this.setState({
                    showModalType:constants.RECTIFY_REJECT,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "inRectify": // 内部整改
                this.setState({
                    showModalType:constants.RECTIFY_INRECTIFY,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "inSubmitRectify": // 内部提交整改
                this.setState({
                    showModalType:constants.RECTIFY_INSUBMIT,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "inFinishRectify": // 内部整改完成
                this.setState({
                    showModalType:constants.RECTIFY_INFINISH,
                    showModal: true,
                    selRecord: record
                })
                break;
            case "inReject": // 内部驳回
                this.setState({
                    showModalType:constants.RECTIFY_INREJECT,
                    showModal: true,
                    selRecord: record
                })
                break;
        }

    }
    // 模态框确认事件
    rectifySubmit(showModalType,record, value, success) {
        let param = null;
        switch (showModalType) {
            case constants.RECTIFY_REPORT: //  确认汇报
                param = {
                    rectificationSerial: record.rectificationSerial,
                    expenseMoney: value.value,
                    content: value.content,
                    remark: value.remark,
                    requestCompleteDate: value.time && value.time.format("YYYY-MM-DD HH:mm:ss")
                };
                postRectifyReport(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "待复核";
                        record.processState = 3002;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_REVIEW: //确认复核
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content
                };
                postRectifyReview(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "待整改";
                        record.processState = 3003;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_RECTIFY: //整改
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content,
                    remark: `@${value.value}@`
                };
                postRectifySend(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "整改下发";
                        record.processState = 3004;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_START: //开始整改
                
                let filedata = new FormData();
                filedata.append('rectificationSerial', record.rectificationSerial);
                filedata.append('content', value.content);
                filedata.append('remark', value.remark);
                if(Array.isArray(value.fileList)){
                    value.fileList.forEach((file) => {
                        filedata.append('files', file.originFileObj);
                    })
                }

                postRectifyStart(filedata).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "整改中";
                        record.processState = 3005;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_SUBMIT: //提交整改
                
                let filedata2 = new FormData();
                filedata2.append('rectificationSerial', record.rectificationSerial);
                filedata2.append('content', value.content);
                filedata2.append('remark', value.remark);
                if(Array.isArray(value.fileList)){
                    value.fileList.forEach((file) => {
                        filedata2.append('files', file.originFileObj);
                    })
                }
                postRectifyCommit(filedata2).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "提交整改";
                        record.processState = 3006;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_SURE: //确认整改
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content,
                };
                
                postRectifySure(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "问题确认";
                        record.processState = 3007;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_FINISH: //完成整改
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content,
                };
                
                postRectifyComplete(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "整改完成";
                        record.processState = 3008;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_CANCEL: //取消整改
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content,
                };
                
                postRectifyCancel(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "已撤销";
                        record.processState = 3009;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_REJECT: //驳回整改
                let filedata3 = new FormData();
                filedata3.append('rectificationSerial', record.rectificationSerial);
                filedata3.append('content', value.content);
                filedata3.append('remark', value.remark);
                if(Array.isArray(value.fileList)){
                    value.fileList.forEach((file) => {
                        filedata3.append('files', file.originFileObj);
                    })
                }
                postRectifyReject(filedata3).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "整改驳回";
                        record.processState = 3010;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_INRECTIFY: //内部整改
                let paramIn = {
                    rectificationSerial: record.rectificationSerial
                }
               
                postInRectify(paramIn).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "内部整改中";
                        record.processState = 3015;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_INSUBMIT: //内部提交整改
                
                let fileData4 = new FormData();
                fileData4.append('rectificationSerial', record.rectificationSerial);
                fileData4.append('content', value.content);
                fileData4.append('remark', value.remark);
                if(Array.isArray(value.fileList)){
                    value.fileList.forEach((file) => {
                        fileData4.append('files', file.originFileObj);
                    })
                }
                postRectifyInCommit(fileData4).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "内部整改提交";
                        record.processState = 3016;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_INFINISH: //内部完成整改
                param = {
                    rectificationSerial: record.rectificationSerial,
                    content: value.content,
                };
                
                postRectifyInComplete(param).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "整改完成";
                        record.processState = 3008;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
            case constants.RECTIFY_INREJECT: //内部驳回
                let filedata6 = new FormData();
                filedata6.append('rectificationSerial', record.rectificationSerial);
                filedata6.append('content', value.content);
                filedata6.append('remark', value.remark);
                if(Array.isArray(value.fileList)){
                    value.fileList.forEach((file) => {
                        filedata6.append('files', file.originFileObj);
                    })
                }
                postRectifyInReject(filedata6).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
                .then((data) => {
                    if (data.code === 200) {
                        record.processStateName = "内部整改中";
                        record.processState = 3015;
                        success && success();
                        this.setState({
                            showModal: false,
                        });
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                })
                .catch((ex) => {
                    success && success();
                    message.error( ex ||  "服务器异常!",5);
                })
                break;
        }
    }
    async loadData() {
        let listPromise = postRectifyList({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("整改接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let conPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let statePromise = getDict(["process_state"]);
        let data = await Promise.all([listPromise, conPromise, statePromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            let listData = data[0];
            listData.forEach((item) => {
                item.key = item.rectificationId
            })
            let conData = data[1];
            let dictData = data[2];
            this.primaryData = {conData}
            this.setState({
                loading: false,
                tableData: listData,
                // primaryData:{conData},
                dictData: dictData
            })
            
            
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }

    }
    
    

    
}

export default WaterConservancyRectify;