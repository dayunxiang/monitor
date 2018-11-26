import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs,Steps   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import  '../Alarm/style.css'
import '../HistoryAlarm/HistoryAlarm.css'
import {getDict,postIrrigationBasic,AlarmList,chakan} from '../../../../../data/dataStore.js' //引入url地址
//import NextLog from '../../basic-data/'  //日志组件
import AlarmLog from '../../HistorySearch/HistoryAlarm/AlarmLog.js' //日志組件

const Step = Steps.Step;

const ProgressCircle = Progress.Circle;
const Option = Select.Option;
class HistoryAlarm extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
         tableData: null,  //类型
         tableData1:null,  //设备
         tableData2:null, //维护状态 warmingMessage	
         tableData3:null, //水利设施
         AlarmData:[],  //所有报警信息
         LogData:[]  //日志
        }
        this.cach = {}; //缓存 优化
    }
      componentDidMount() {
        this.loadData()
        this.AlarmAllList()
        // this.LogShow()

      }
    //   展示所有报警
    async AlarmAllList() {
        let param={
            facilityId:this.state.facilities ? this.state.facilities : 0,
            alarmType:this.state.styleValue ? this.state.styleValue : 0,
            deviceType:this.state.deviceValue ? this.state.deviceValue :0,
            maintenanceState:this.state.stateValue ? this.state.stateValue : 0,
            start:this.state.starttime,
            end:this.state.endTime
        }
        let data = await AlarmList(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
             console.log(data.data,'所有报警是多少????????')
            this.setState({
                loading: false,
                AlarmData:data.data
            })}}

            // 日志
         async LogShow() {
            let param={
                maintenanceNumber:this.recordLog
            }
            let data = await chakan(param).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code==200 ) {
                 console.log(data.data,'日志是多少????????')
                 var psdh=data.data;
                 var lt=psdh.map((item,index)=>{
                     return item
                 })
                 this.setState({
                      loading: false,
                      LogData:lt
                    })}}
   // 巡查记录  
   async loadData() {
    let statePromise = getDict(["alarm_type"]);  //报警类型
    let statePromise1=getDict(['device_type']);   //报警设备
    let statePromise2=getDict(['process_state']);   //维护状态  
    let SheshiList= postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("设施信息接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'看看设施值是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    let data = await Promise.all([ statePromise,statePromise1,statePromise2,SheshiList]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
      
         let dictData = data[0];
         let titleData=data[1];
         let titleData2=data[2];
         let SheshiData=data[3];
        this.setState({
             loading: false,
             tableData: dictData,  //报警类型
             tableData1:titleData,   //报警设备
             tableData2:titleData2,  //维护状态
             tableData3:SheshiData,  //水利设施
        })
    }else{
        this.setState({
            loading: false
        })
        message.error( data ||  "服务器异常!",5);
    }
}
    //   报警类型
    handleChange1(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'类型的值是多少')
        this.setState({
            styleValue:value
        })
      }
         // 报警设施事件
         handleChange(value) {
            // console.log(`selected ${value}`);
            // console.log(value,'设施的值')
            this.setState({
                facilities:value.key
            })
          }
             //   报警设备
      handleChange2(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'报警设备的值是多少')
        this.setState({
            deviceValue:value.key
        })
      }
    //   维护状态
      handleChange3(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'维护状态的值是多少')
        this.setState({
            stateValue:value.key
        })
      }
    //   时间时间
     onChange(dates, dateStrings) {
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log('From111: ', dateStrings[0], ', to111: ', dateStrings[1]);  //时间的开始和结束时间
        this.setState({
            starttime:dateStrings[0] ? dateStrings[0]+" "+'00:00:00' : null,
            endTime:dateStrings[1] ? dateStrings[1] +" "+'23:59:59' : null
        })
      }
    //   搜索
    AlarmSearch(){
        this.AlarmAllList()
    }
    // 导出
    AlarmExport(){

    }
    // 打印
    AlarmStamp(){

    }
    // 下载
    AlarmDowm(){

    }
     callback(key) {
        // console.log(key);
      }
    //   日志
     // 查看
     handleDelete = (record,e)=>  {
         this.recordLog=record.maintenanceNumber;

        this.setState({
          visible8: true,
        //   recordLog:record.maintenanceNumber
        })
        this.LogShow()
    }
      handleCancel8(){
        this.setState({
            visible8: false,
          });
        }
    render() { 
      
      const columns = [
        {title: '报警时间',dataIndex: 'gmtCreate' ,width: "10%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '报警设施',dataIndex: 'facilityName',width: "10%" ,align:'center',},
        {title: '报警类型',dataIndex: 'alarmType',width: "10%" ,align:'center',render:alarmType =>{ 
            if(alarmType==4101){
              return '设备故障报警'
            } else if(alarmType==4102){
              return '通讯故障报警'
            } else if(alarmType==4103){
                return '设备预警'
            }
           }},
        {title: '报警设备',dataIndex: 'deviceType',width: "10%" ,align:'center',render:deviceType =>{ 
            if(deviceType==4001){
              return '闸位仪'
              } else if(deviceType==4002){
              return '电量仪'
              }else if(deviceType==4003){
                return '水位仪'
              }else if(deviceType==4004){
                return '摄像头'
              }else if(deviceType==4005){
                return '网络设备'
              }
           },},
        {title: '维护编码',dataIndex: 'maintenanceNumber',width: "10%" ,align:'center'},
        {title: '报警内容',dataIndex: 'alarmContent',width: "10%" ,align:'center'},
        {title: '维护状态',dataIndex: 'maintenanceState',width: "10%" ,align:'center',render:(processState,record) =>{ 
           if(record.maintenanceState==4402){
               return  '已解除'
               }else if(record.maintenanceState==3013){
                return  '已维护'
              }
           }},
        {title: '维护日志',dataIndex: 'facilityInfoId2',width: "10%" ,align:'center',render:(processState,record) =>{ 
            // alarmType==4103  
             if(record.maintenanceState==3013) {
                 return  <Button  onClick={() => this.handleDelete(record)}>查看</Button>
             }
            }},
        {title: '备注',dataIndex: 'memo',width: "10%" ,align:'center'},
    ];
        const RangePicker = DatePicker.RangePicker
        const TabPane = Tabs.TabPane;
          // 报警类型
          let stateOptions = null;
          if (this.state.tableData && this.state.tableData.alarm_type) {
              if (this.cach["alarm_type"]) {
                  stateOptions = this.cach["alarm_type"]
              }else{
                  stateOptions = this.state.tableData.alarm_type.map(({text, value}) => {
                      return <Option key={value} value={value}>{text}</Option>
                  });
                  stateOptions.unshift(<Option key="null" value="">全部</Option>);
                  this.cach["alarm_type"] = stateOptions;
              }
          }
              //    报警设备
          let TypeOptions = null;
          if (this.state.tableData1 && this.state.tableData1.device_type) {
              if (this.cach["device_type"]) {
                  TypeOptions = this.cach["device_type"]
              }else{
                  TypeOptions = this.state.tableData1.device_type.map(({text, value}) => {
                      return <Option key={value} value={value}>{text}</Option>
                  });
                  TypeOptions.unshift(<Option key="null" value="">全部</Option>);
                  this.cach["device_type"] = TypeOptions;
              }
          }
          // 维护状态
          let OptionsState = null;
          if (this.state.tableData2 && this.state.tableData2.process_state) {
              if (this.cach["process_state"]) {
                  OptionsState = this.cach["process_state"]
              }else{
                  OptionsState = this.state.tableData2.process_state.map(({text, value}) => {
                      return <Option key={value} value={value}>{text}</Option>
                  });
                  OptionsState.unshift(<Option key="null" value="">全部</Option>);
                  this.cach["process_state"] = OptionsState;
              }
          }
        //   水利设施
        let  OptionsList=null;
        if(this.state.tableData3 != null && this.state.tableData3 !=undefined){
             OptionsList = this.state.tableData3.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        let allShow=null;
        let every=null;
        let zhenggaiIn=null;
        let dijiao=null;
        let stateType=null;
        if(this.state.LogData!=null && this.state.LogData!='undefind'){
          allShow=this.state.LogData;
        }
       console.log(allShow,'allShow')
       every=allShow.map((item,index)=>{
        if(item.processState===3005){
            stateType='整改中'
        } else if(item.processState===3006){
            stateType='递交整改'
        }
           if( item.processState==3005){
            zhenggaiIn= <div className="every">
            <div className="zf-log-item-dot"></div>
            <span className="zf-log-item-name"></span>
           <span>
               <div className="item-line">状态：{stateType}</div>
               <div className="item-line">维护人：{item.personName}</div>
               <div className="item-line">维护时间：{item.gmtModified}</div>
               <div className="item-line">维护内容：{item.content}</div>
           </span>
          </div>
           }else if(item.processState==3006){
            dijiao= <div  className="every">
            <div className="zf-log-item-dot"></div>
            <span className="zf-log-item-name"></span>
           <span>
               <div className="item-line">状态：{stateType}</div>
               <div className="item-line">维护人：{item.personName}</div>
               <div className="item-line">维护时间：{item.gmtModified}</div>
               <div className="item-line">维护内容：{item.content}</div>
           </span>
          </div>
           }
       })
        return (
        	<div className="zf-page">
            <div className="input">
            <Row>
        <Col xs={24} sm={12}  md={4}>
                <label htmlFor="">设施区域选择</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >  
                  {OptionsList}
            </Select>
         </Col>
         <Col  xs={24} sm={12}  md={4}> 
                  {/* 类型部分 */}
                 <label htmlFor="">报警类型</label>
                 <Select showSearch style={{ width: 200 }}   onChange={this.handleChange1.bind(this)}  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >{stateOptions}</Select>
         </Col>
               
          <Col  xs={24} sm={12}  md={4}>
             <label htmlFor="">报警设备</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                // onFocus={this.handleFocus2.bind(this)}
                // onBlur={this.handleBlur.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                    {TypeOptions}               
            </Select>
            </Col>
            <Col  xs={24} sm={12}  md={4}>
                <label htmlFor="">维护状态</label>
               <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange3.bind(this)}
                // onFocus={this.handleFocus.bind(this)}
                // onBlur={this.handleBlur.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
                {OptionsState}                
                 </Select>
            </Col>
            <Col  xs={24} sm={12}  md={8}>
                {/* <label htmlFor="">时间</label> */}
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange.bind(this)} />
                 </div>
            </Col>
            </Row>
            </div>
            <div className="button">
            <Row >
            {/* 下载 */}
            <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmDowm.bind(this)}>下载</Button>
            </Col>
               {/* 打印 */}
               <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmStamp.bind(this)}>打印</Button>
            </Col>
               {/* 导出 */}
               <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmExport.bind(this)}>导出</Button>
            </Col>
             
            <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>查询</Button>
            </Col>   
            </Row>
            </div>
         {/* 日志 */}
        <Modal
          title="日志详情"
          visible={this.state.visible8}
          onCancel={this.handleCancel8.bind(this)}
          width={1000}
          bodyStyle={{width:'1000px',height:'400px'}}
          footer={null}
          centered={true}
        >
        <div className='vip'>
        <div className="title">
            {/* BJ.100000002 */}
        { this.recordLog}
        </div>
       <div className="content_steps">
       <div className="Big">
    
      </div>
        {/* 子步骤 */}
       {/* <Step key={pen.conservancyId} title={pen.processStateName}/> */}

      <div className="log">
      <Steps size="small" className="BigStep">
            <Step title="开始维护" />
            <Step title="递交维护" />
         </Steps>
            {/* {every} */}
            <div className="oneAll">{zhenggaiIn}</div>
            <div className="twoAll">{dijiao}</div>
        </div>
      </div>
    </div>
        {/* <AlarmLog alarmID={this.state.recordLog} ></AlarmLog> */}
        </Modal>
            <div className="count">
            报警列表查询
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.AlarmData} size="middle" bordered={true} />
            </div>
        	</div>
            
        )
    }
    
    
}

export default HistoryAlarm;