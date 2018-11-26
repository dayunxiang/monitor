import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Popconfirm } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {postRectifyLog} from '../../../../../data/dataStore.js'

import Base from '../../Global/Base/Base.js'
import '../Inspectors/style.css'

import moment from 'moment';
import Log from '../../Global/Inspectors/Log.js'
// import RectifyLog from "../../../../components/RectifyLog/RectifyLog.js"
import RectifyLog from "../../../../../components/RectifyLog/RectifyLog.js"


 
class Reported extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
           tableData:[], //table的数据
          visible: false
        	
        }

    }
    // 查看Log事件
    CheckLog = (record,e) => {
      // console.log(record,'record  Log的值')
      this.setState({
        visible: true,
        recordLog:record
      });
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
                    }
                }
            }

            this.setState({
                // showModalType:constants.RECTIFY_LOG,
                showModal: true,
                selRecord: entitys,
                noticeLoading: false
            })
            return;
        }
        return Promise.reject(data.msg);
    });
    }
    // 查看照片
    Checkphoto(record,e){
      // console.log(record,'照片')
      this.imgData=record.images[0]
      // console.log( this.imgData,'imgData')
      this.setState({
        Modal:true,
      })
    }
    // 查看詳細照片
    showPhone(){
      this.setState({
        Modal8:true,
      })
    }
    CancelHand(){
      this.setState({
        Modal8:false,
      })
    }
    handleCancel(record,e){
      this.setState({
        Modal:false
      })
    }
    // 时间事件
    showModal(){
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      // console.log(e);
      this.setState({
        visible: false,
      });
    }
    rectifySubmit(){

    }
  // 查询
    render() {
      // console.log(this.state.imgData,'this.state.recordLog.images.images')
    const columns = [
        {title: '问题编码',dataIndex: 'rectificationSerial' ,width: "7%" ,align:'center'},
        // {title: '巡检问题ID',dataIndex: 'rectificationId',width: "8%" ,align:'center'},
        {title: '报告人',dataIndex: 'reporterName',width: "7%" ,align:'center'},
        {title: '问题水利设施',dataIndex: 'conservancyName',width: "8%" ,align:'center'},
        {title: '巡检项目',dataIndex: 'targetName',width: "10%" ,align:'center'},
        {title: '巡检问题',dataIndex: 'rectificationReason',width: "9%" ,align:'center'},
        {title: '问题图片',dataIndex: 'images',width: "8%" ,align:'center', render: (text, record) => (
          <Button title="Sure to delete?" type="primary" onClick={() => this.Checkphoto(record)}>
               <a href="javascript:;">查看</a>
          </Button>
        )},
        {title: '当前所处步骤',dataIndex: 'processStepName',width: "2%" ,align:'center'},
        {title: '当前处理状态',dataIndex: 'processStateName',width: "8%" ,align:'center'},
        {title: '数据创建时间',dataIndex: 'gmtCreate',width: "10%" ,align:'center'},
        {title: '数据修改时间',dataIndex: 'gmtModified',width: "10%" ,align:'center'},

        {title: '日志',dataIndex: 'index',width: "10%" ,align:'center', render: (text, record) => (
          <Button title="Sure to delete?" type="primary" onClick={() => this.CheckLog(record)}>
               <a href="javascript:;">查看</a>
          </Button>
        
        ),},
        // {title: '操作',dataIndex: 'index1',width: "10%"},
    ];
      // const RangePicker = DatePicker.RangePicker;
        return (
        	<div className="subpage">
          
          <Table  columns={columns } dataSource={this.props.ReportDetail} size="middle"  bordered={true}/>
          <div className="log_show">
          <Button type="primary" onClick={this.showModal.bind(this)} style={{display:'none'}}> 
          Open Modal
        </Button>
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
                    {/* 照片 */}
                  <Modal
                    title="问题照片"
                    visible={this.state.Modal}
                    // onOk={this.AreYouOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={400}
                    bodyStyle={{width:'300px',height:'200px'}}
                    footer={null}
                    centered={true}>                  
                {/* <img  src={"/api/" +   this.imgData.images ? '' :  this.imgData.images } /> */}
                <img src={"/api/"+ this.imgData}onClick={() => this.showPhone()} style={{width:'280px',height:'160px'}} />
                </Modal>
                {/* 詳細照片 */}
                <Modal
                    title="照片詳情"
                    visible={this.state.Modal8}
                    // onOk={this.AreYouOk.bind(this)}
                    onCancel={this.CancelHand.bind(this)}
                    width={600}
                    bodyStyle={{width:'600px',height:'400px'}}
                    footer={null}
                    centered={true}>    
                   <img src={"/api/"+ this.imgData} style={{width:'550px',height:'370px'}} />
                {/* <img  src={"/api/" +   this.imgData.images ? '' :  this.imgData.images } /> */}
                {/* <img src={"/api/"+ this.imgData}onClick={() => this.showPhone()} /> */}
                </Modal>
          </div>
              {/* <Log></Log> */}
        	</div>
            
        )
    }
    
    
}

export default Reported;