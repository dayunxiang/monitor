import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import  '../Alarm/style.css'
// import '../HistoryMode/HistoryMode.css'
import {getDict,postIrrigationBasic,findPumpGateHistory,findNetCameraHistory} from '../../../../../data/dataStore.js' //引入url地址
const ProgressCircle = Progress.Circle;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
class HistoryMode extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
         tableData:[], //table的数据 
         dictDataList: null,  // 设施
         titleData1:null,  //设备
         GataData:null, // 列表
         NetCamerData:[]
        }
        this.cach = {}; //缓存 优化
    }
      componentDidMount() {
         this.loadData()
         this.watreLevel()
        this.watreLevel1() //其他设备
      }
      async watreLevel() {
        let param={
             id:this.state.sheshiValue ? this.state.sheshiValue : 1,
             statrtTime:this.state.starttime,
             endTime:this.state.endTime
        }
        let data = await findPumpGateHistory(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            //   console.log(data.data[0].list,'ben===值是多少????????')
              var PumpGateList=data.data[0].list;
              var at=PumpGateList.map(item=>{
                  return item
              })
            //   console.log(at,'at')
            this.setState({
                loading: false,
                GataData:at
            })}}
   // 
//    其他设备
async watreLevel1() {
    let param={
        id:this.state.facilities ? this.state.facilities : 1,
        statrtTime:this.state.start,
        endTime:this.state.end
    }
    let data = await findNetCameraHistory(param).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code==200 ) {
        //   console.log(data.data[0].list,'其他设备值是多少????????')
          var PumpGateList=data.data[0].list;
          var at=PumpGateList.map(item=>{
              return item
          })
        //   console.log(at,'at')
        this.setState({
            loading: false,
            NetCamerData:at
        })}}


   async loadData() {
    let TypeList=getDict(['device_type']);   //设备
    let DateList= postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施信息接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'设施？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    let data = await Promise.all([TypeList,DateList]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
         let dictDataList = data[0]; //设备
         let titleData=data[1];   //水利设施
         let GateHistoryData=data[2]  //闸工况信息
        //  console.log(titleData,'titleData')
        this.setState({
              loading: false,
              dictDataList: dictDataList,
              titleData1:titleData,
        })
    }else{
        this.setState({
            loading: false
        })
          message.error( data ||  "服务器异常!",5);
    }}
         // 其他设备设施事件
         NethandleChange(value) {
            // console.log(`selected ${value}`);
            // console.log(value,'设施的值')
            this.setState({
                facilities:value.key
            })
        }
        //   设备
      handleChange2(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'报警设备的值是多少')
        // this.setState({
        //     deviceValue:value.key
        // })
      }
    //   时间时间
     onChange(dates, dateStrings) {
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log('From111: ', dateStrings[0], ', to111: ', dateStrings[1]);  //时间的开始和结束时间
        this.setState({
            starttime:dateStrings[0]+" "+'00:00:00',
            endTime:dateStrings[1]+" "+'23:59:59'
        })
      }
    //   搜索
    AlarmSearch(){
        // this.checkSearch()
        this.watreLevel()

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
    //  其他设备事件
     //   搜索
     AlarmSearch1(){
        // this.checkSearch()
        this.watreLevel1() //其他设备
    }
    // 导出
    AlarmExport1(){

    }
    // 打印
    AlarmStamp1(){

    }
    // 下载
    AlarmDowm1(){

    }
    //  callback1(key) {
    //     console.log(key);
    //   }
        // 泵设施事件
        benghandleChange(value) {
            // console.log(`selected ${value}`);
            // console.log(value,'设施的值')
            this.setState({
                sheshiValue:value.key
            })
        }
        //   设备
      handleChange1(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'报警设备的值是多少')
        // this.setState({
        //     deviceValue:value.key
        // })
      }
    //   时间时间
     onChange1(dates, dateStrings) {
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log('From111: ', dateStrings[0], ', to111: ', dateStrings[1]);  //时间的开始和结束时间
        this.setState({
            start:dateStrings[0]+" "+'00:00:00',
            end:dateStrings[1]+" "+'23:59:59'
        })
      }
    render() {
        //   console.log(this.state.GataData.list,'this.state.GataData.list')
      const columns = [
        {title: '更新时间',dataIndex: 'time' ,width: "8%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '水利设施',dataIndex: 'facilityInfoName',width: "8%" ,align:'center',},
        {title: '内闸工况',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2501){
                    if(lt.openCloseOperate==3102){
                        return '关闭'
                    } else if( lt.openCloseOperate==3101){
                        return '开启'
                    }
                    } 
        }
    }},
        {title: '内闸位(cm)',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 

            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2501){
                        return lt.openDistance
            }} 
        }},
      
        {title: '外闸工况',dataIndex: '',width: "7%" ,align:'center',render:(text, record, index) =>{ 
            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2502){
                    if(lt.openCloseOperate==3102){
                        return '关闭'
                    } else if( lt.openCloseOperate==3101){
                        return '开启'
          } } }
           }},
        {title: '外闸位(cm)',dataIndex: '',width: "7%" ,align:'center',render:(text, record, index) =>{ 
           
            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2502){
                        return lt.openDistance
            }} 

           }},
        {title: '节制闸工况',dataIndex: 'facilityInfoId8',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2503){
                    if(lt.openCloseOperate==3102){
                        return '关闭'
                    } else if( lt.openCloseOperate==3101){
                        return '开启'
                    }
                    } 
        }
    }
        
    },
        {title: '节制闸位(cm)',dataIndex: 'facilityInfoId5',width: "7%" ,align:'center',render:( text, record, index) =>{ 

            let lt
            // console.log(record.gateStateMonitorLogDOList.gateType,'record.gateStateMonitorLogDOList')
            let ll=record.gateStateMonitorLogDOList
            for(var i=0;i<ll.length;i++ ){
               lt= ll[i]
            }
            // console.log(lt,'lt')
            if( lt!=null  && lt!='undefind' && lt.gateType!=null && lt.gateType!='undefind') {
                if( lt.gateType==2503){
                        return lt.openDistance
            }} 
        }
    },
       
        {title: '泵①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[0]!=null &&  record.pumpStateMonitorLogDOList[0].openCloseOperate!=null && record.pumpStateMonitorLogDOList[0]!='undefind' && record.pumpStateMonitorLogDOList[0].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[0].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[0].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},
           {title: '泵②',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[1]!=null &&  record.pumpStateMonitorLogDOList[1].openCloseOperate!=null && record.pumpStateMonitorLogDOList[1]!='undefind' && record.pumpStateMonitorLogDOList[1].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[1].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[1].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},
           {title: '泵③',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[2]!=null &&  record.pumpStateMonitorLogDOList[2].openCloseOperate!=null && record.pumpStateMonitorLogDOList[2]!='undefind' && record.pumpStateMonitorLogDOList[2].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[2].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[2].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},
          
           {title: '泵④',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[3]!=null &&  record.pumpStateMonitorLogDOList[3].openCloseOperate!=null && record.pumpStateMonitorLogDOList[3]!='undefind' && record.pumpStateMonitorLogDOList[3].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[3].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[3].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},
           {title: '泵⑤',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[4]!=null &&  record.pumpStateMonitorLogDOList[4].openCloseOperate!=null && record.pumpStateMonitorLogDOList[4]!='undefind' && record.pumpStateMonitorLogDOList[4].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[4].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[4].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},
           {title: '泵⑥',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.pumpStateMonitorLogDOList[5]!=null &&  record.pumpStateMonitorLogDOList[5].openCloseOperate!=null && record.pumpStateMonitorLogDOList[5]!='undefind' && record.pumpStateMonitorLogDOList[5].openCloseOperate!='undefind'){

                if(  record.pumpStateMonitorLogDOList[5].openCloseOperate===3101){
                    return  '开启'
                    }  else if( record.pumpStateMonitorLogDOList[5].openCloseOperate===3102){
                        return '关闭'
                    }
            }
           }},   
    ];
         const columns1=[
        {title: '更新时间',dataIndex: 'time' ,width: "8%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '水利设施',dataIndex: 'facilityInfoName',width: "8%" ,align:'center',},
       
        {title: '视频设备①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.webCameraStateMonitorLogVOList[0]!=null &&  record.webCameraStateMonitorLogVOList[0].state!=null && record.webCameraStateMonitorLogVOList[0]!='undefind' && record.webCameraStateMonitorLogVOList[0].state!='undefind'){

                if(  record.webCameraStateMonitorLogVOList[0].state===4301){
                    return  '在线'
                    }  else if( record.webCameraStateMonitorLogVOList[0].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '视频设备②',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.webCameraStateMonitorLogVOList[1]!=null &&  record.webCameraStateMonitorLogVOList[1].state!=null && record.webCameraStateMonitorLogVOList[1]!='undefind' && record.webCameraStateMonitorLogVOList[1].state!='undefind'){

                if(  record.webCameraStateMonitorLogVOList[1].state===4301){
                    return  '在线'
                    }  else if( record.webCameraStateMonitorLogVOList[1].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '视频设备③',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.webCameraStateMonitorLogVOList[2]!=null &&  record.webCameraStateMonitorLogVOList[2].state!=null && record.webCameraStateMonitorLogVOList[2]!='undefind' && record.webCameraStateMonitorLogVOList[2].state!='undefind'){

                if(  record.webCameraStateMonitorLogVOList[2].state===4301){
                    return  '在线'
                    }  else if( record.webCameraStateMonitorLogVOList[2].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '视频设备④',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.webCameraStateMonitorLogVOList[3]!=null &&  record.webCameraStateMonitorLogVOList[3].state!=null && record.webCameraStateMonitorLogVOList[3]!='undefind' && record.webCameraStateMonitorLogVOList[3].state!='undefind'){

                if(  record.webCameraStateMonitorLogVOList[3].state===4301){
                    return  '在线'
                    }  else if( record.webCameraStateMonitorLogVOList[3].state===4302){
                        return '断线'
                    }
            }
           }},
       

        {title: '网络设备①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.networkStateMonitorLogVOList[0]!=null &&  record.networkStateMonitorLogVOList[0].state!=null && record.networkStateMonitorLogVOList[0]!='undefind' && record.networkStateMonitorLogVOList[0].state!='undefind'){

                if(  record.networkStateMonitorLogVOList[0].state===4301){
                    return  '在线'
                    }  else if( record.networkStateMonitorLogVOList[0].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '网络设备①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.networkStateMonitorLogVOList[1]!=null &&  record.networkStateMonitorLogVOList[1].state!=null && record.networkStateMonitorLogVOList[1]!='undefind' && record.networkStateMonitorLogVOList[1].state!='undefind'){

                if(  record.networkStateMonitorLogVOList[1].state===4301){
                    return  '在线'
                    }  else if( record.networkStateMonitorLogVOList[1].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '网络设备①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.networkStateMonitorLogVOList[2]!=null &&  record.networkStateMonitorLogVOList[2].state!=null && record.networkStateMonitorLogVOList[2]!='undefind' && record.networkStateMonitorLogVOList[2].state!='undefind'){

                if(  record.networkStateMonitorLogVOList[2].state===4301){
                    return  '在线'
                    }  else if( record.networkStateMonitorLogVOList[2].state===4302){
                        return '断线'
                    }
            }
           }},
           {title: '网络设备①',dataIndex: '',width: "7%" ,align:'center',render:( text, record, index) =>{ 
            if( record.networkStateMonitorLogVOList[3]!=null &&  record.networkStateMonitorLogVOList[3].state!=null && record.networkStateMonitorLogVOList[3]!='undefind' && record.networkStateMonitorLogVOList[3].state!='undefind'){

                if(  record.networkStateMonitorLogVOList[3].state===4301){
                    return  '在线'
                    }  else if( record.networkStateMonitorLogVOList[3].state===4302){
                        return '断线'
                    }
            }
           }},
      ]
        // 判断
        // 设备类型
        // console.log(this.state.titleData1,'this.state.titleData1')
          let TypeOptions = null;
          if (this.state.dictDataList && this.state.dictDataList.device_type) {
              if (this.cach["device_type"]) {
                  TypeOptions = this.cach["device_type"]
              }else{
                  TypeOptions = this.state.dictDataList.device_type.map(({text, value}) => {
                      return <Option key={value} value={value}>{text}</Option>
                  });
                  TypeOptions.unshift(<Option key="null" value="">全部</Option>);
                  this.cach["device_type"] = TypeOptions;
              }
          }
        //   水利设施
          let  OptionsList=null;
          if(this.state.titleData1 != null && this.state.titleData1 !=undefined){
            //    console.log(this.state.titleData1,'hhhhhhhhhhh')
               OptionsList = this.state.titleData1.map((text) => {
                  return <Option key={text.id}>{text.name}</Option>
               });
          } 
          let  OptionsList2=null;
          if(this.state.titleData1 != null && this.state.titleData1 !=undefined){
            //    console.log(this.state.titleData1,'hhhhhhhhhhh')
               OptionsList2 = this.state.titleData1.map((text) => {
                  return <Option key={text.id}>{text.name}</Option>
               });
          } 
        return (
        <div className="zf-page">
        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
        <TabPane tab="泵(闸)" key="1">
        <div className="input">
        <Row>
        <Col xs={24} sm={12}  md={8}>
                <label htmlFor="">设施区域选择</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.benghandleChange.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>  
                {OptionsList}
            </Select>
         </Col>
               
          {/* <Col xs={24} sm={12}  md={8}>
             <label htmlFor="">设备类别</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            </Select>
            </Col> */}
            {/* 时间 */}
            <Col xs={24} sm={12}  md={8}>
               <div className="rr">
                 <RangePicker ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.onChange.bind(this)} />
                </div>
            </Col>
            </Row>
           <Row>
           <div className="button">
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
            </div> 
           </Row>
           
            </div>
            <div className="count">
            泵(闸)工况列表
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.GataData} size="middle" bordered={true} />
            </div>
            </TabPane>
           
                <TabPane tab="其他设备" key="2">
                    <div className="input">
            <Row>
            <Col  xs={24} sm={12}  md={8}>
                    <label htmlFor="">设施区域选择</label>
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    onChange={this.NethandleChange.bind(this)}
                    labelInValue={true}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>  
                    {OptionsList2}
                </Select>
            </Col>
                
            <Col  xs={24} sm={12}  md={8}>
                <label htmlFor="">设备类别</label>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    onChange={this.handleChange1.bind(this)}
                    labelInValue={true}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {/* {TypeOptions} */}
            </Select>
            </Col>
            {/* 时间 */}
            <Col  xs={24} sm={12}  md={8}>
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange1.bind(this)} />
                 </div>
            </Col>
            </Row>
            <Row>
            <div className="button">
            {/* 下载 */}
            <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmDowm1.bind(this)}>下载</Button>
            </Col>
               {/* 打印 */}
               <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmStamp1.bind(this)}>打印</Button>
            </Col>
               {/* 导出 */}
               <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmExport1.bind(this)}>导出</Button>
            </Col>
             
            <Col span="1.5"  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch1.bind(this)}>查询</Button>
            </Col>   
            </div>
            </Row>
            </div>
           
            <div className="count">
            其他设备工况列表
            </div>
            <div className="count_l">
            <Table columns={columns1} dataSource={this.state.NetCamerData} size="middle" bordered={true} />
            </div>
                </TabPane>
            </Tabs>
        	</div>
            
        )
    }
    
    
}

export default HistoryMode;