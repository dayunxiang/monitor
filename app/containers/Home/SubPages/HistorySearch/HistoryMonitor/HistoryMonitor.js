import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import  '../Alarm/style.css'
import '../HistoryWaterLevel/HistoryWaterLevel.css'
import {getDict,WaterMonitor,mplist } from '../../../../../data/dataStore.js' //引入url地址

const ProgressCircle = Progress.Circle;
const RangePicker = DatePicker.RangePicker
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class HistoryMonitor extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
            MonitorData:[], //table的数据 
            mplisData:[]
       
        
        }
    }
      componentDidMount() {
         this.loadData()
      }

    //   查询交互
    async monitorAjax() {
        let param = {
            monitoringPointId:this.state.styleValue ? this.state.styleValue : 0 ,
            start:this.state.starttime,
            end:this.state.endTime
        }
       
        let data = await WaterMonitor(param).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code==200 ) {
             this.setState({
                MonitorData: data.data,
              });        }
     }
   // 记录
   async loadData() {  
    let MonitorList= WaterMonitor({monitoringPointId:1}).then((res) =>{ return res.ok ? res.json() : Promise.reject("监测点列表接口出错");}).then((data) => {
        if (data.code === 200) {
            //   console.log(data.data,'值是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    // 监测点
    let mplistList= mplist({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("监测点接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'看看监测点值是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    let data = await Promise.all([ MonitorList,mplistList]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
       
         let MonitorData = data[0];
         let mplisData=data[1];
       
        this.setState({
             loading: false,
             MonitorData: MonitorData,
             mplisData:mplisData
           
        })
    }else{
        this.setState({
            loading: false
        })
        // message.error( data ||  "服务器异常!",5);
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
  
    //   时间时间
     onChange(dates, dateStrings) {
        // console.log('From: ', dates[0], ', to: ', dates[1]);
        // console.log('From111: ', dateStrings[0], ', to111: ', dateStrings[1]);  //时间的开始和结束时间
        this.setState({
            starttime:dateStrings[0] ? dateStrings[0]+" "+'00:00:00' : null,
            endTime:dateStrings[1] ? dateStrings[1]+" "+'23:59:59' :null
        })
      }
    //   搜索
    AlarmSearch(){
        this.monitorAjax()
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
    render() {
    // 监测点水位列表
    const columns= [
        {title: '更新时间',dataIndex: 'gmtCreate' ,width: "10%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '监测点',dataIndex: 'monitoringPointName',width: "10%" ,align:'center',},
        {title: '水位',dataIndex: 'waterLevel',width: "10%" ,align:'center'},
    ];
          

          let  OptionsList=null;
          if(this.state.mplisData != null && this.state.mplisData !=undefined){
               OptionsList = this.state.mplisData.map((text) => {
                  return <Option key={text.monitoringPointId}>{text.monitoringPointName}</Option>
               });
               OptionsList.unshift(<Option key="0" value="">全部</Option>);
          } 
        //    设施
        //  监测点
        // let MonitorOptions = null;
        // if (this.state.titleData && this.state.titleData.device_type) {
        //     if (this.cach["device_type"]) {
        //         TypeOptions = this.cach["device_type"]
        //     }else{
        //         TypeOptions = this.state.titleData.device_type.map(({text, value}) => {
        //             return <Option key={value} value={value}>{text}</Option>
        //         });
        //         TypeOptions.unshift(<Option key="null" value="">全部</Option>);
        //         this.cach["device_type"] = TypeOptions;
        //     }
        // }
        return (
        	<div className="zf-page">
            <div className="input">
            <Row>
         <Col xs={24} sm={12}  md={8}> 
                  {/* 类型部分 */}
                 <label htmlFor="">监测点</label>
                 <Select showSearch style={{ width: 200 }}   onChange={this.handleChange1.bind(this)}  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                 {OptionsList}
                 </Select>
         </Col>
            <Col xs={24} sm={12}  md={8}>
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange.bind(this)} />
                 </div>
            </Col>
            <Col xs={24} sm={12}  md={8}>
             {/* 下载 */}
             <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmDowm.bind(this)}>下载</Button>
            </Col>
               {/* 打印 */}
               <Col xs={24} sm={12}  md={6} style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmStamp.bind(this)}>打印</Button>
            </Col>
               {/* 导出 */}
               <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmExport.bind(this)}>导出</Button>
            </Col>
             
            <Col  xs={24} sm={12}  md={6} style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>查询</Button>
            </Col>   
            </Col>
            </Row>
            </div>
            <div className="button">
            <Row >
           
            </Row>
            </div>

            <div className="count">
            监测点水位列表
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.MonitorData} size="middle" bordered={true} />
            </div>
        	</div>
            
        )
    }
    
    
}

export default HistoryMonitor;