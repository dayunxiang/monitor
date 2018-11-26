import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm  } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
import  '../Alarm/style.css'

import {alarmmessage,removeYujing} from '../../../../../data/dataStore.js' //引入url地址

 

class GiveAlarm extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
         tableData:[], //table的数据
        	
        }

    }
      //   时间时间
    

      componentDidMount() {
        // this.alarm()
      }
  
  
  // 智能预警信息
  // async alarm() {
  //     let data = await alarmmessage({facilityInfoId:1,gmtCreateStart: this.starttime,gmtCreateEnd:this.endTime}).then((res) =>{ return res.json();}).catch(ex => {});
  //     if (data && data.data ) {
  //         data.data.forEach((item) => {
  //             item.key = item.id
  //         })
  //          console.log(data.data,'测试预警的值是多少')
  //         this.setState({
  //             loading: false,
  //             tableData:data.data
  //         })
  //     }
  // }
  // 查询事件
  // warmingSearch(){
  //  this.alarm()
  // }
  //   解除预警事件
  removeClick(text, record, index) {
    this.removeYujing(record);
}

removeYujing(record) {
    let data = {alarmId: record.id};
    removeYujing(data).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("接口出错");
    }).then((data) => {
        if (data.code === 200) { 
          this.props.DiaoGiveAlarm()
             this.loadData()
            this.setState({
              GiveAlarmList: trData
            });
        }else{
            // message.error(data.msg || "服务器异常!", 5);
        } 
    }).catch((ex) => { 
        // message.error(ex || "服务器异常!",5);
    });
} 
    render() {
      const GiveAlarmList=this.props.giveAlarm
      const columns = [
        {title: '预警信息生成时间',dataIndex: 'gmtCreate' ,width: "20%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '预警信息修改时间',dataIndex: 'gmtModified',width: "20%" ,align:'center',render: gmtModified => <span>{moment(gmtModified).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '预警类型',dataIndex: 'alarmType',width: "15%" ,align:'center',render:alarmType =>{ 
            if(alarmType==4101){
              return '设备故障报警'
            } else if(alarmType==4102){
              return '通讯故障报警'
            } else if(alarmType==4103){
                return '设施运行报警'
              }
           },},
        {title: '预警子类型',dataIndex: 'alarmSubtype',width: "15%" ,align:'center',render:alarmSubtype =>{ 
            if(alarmSubtype==4201){
              return '防汛预警期间，动力排水口门未开泵'
            } else if(alarmSubtype==4202){
              return '乘潮排水，南门水位小于等于2.8米，未开闸门排水'
            } else if(alarmSubtype==4203){
                return '乘潮引水，南门水位小于等于2.8米，未开闸门引水'
              }else if(alarmSubtype==4204){
                return '乘潮排水，3.0米>南门水位>2.8米，未开闸门排水'
              }else if(alarmSubtype==4205){
                return '乘潮排水，南门水位大于3.0米，未开闸门排水'
              }
           },},
        {title: '水利设施唯一标识',dataIndex: 'facilityInfoId',width: "15%" ,align:'center'},
        {title: '报警状态是否被解除',dataIndex: 'relieveState',width: "15%" ,align:'center',render: (text, record, index) => {
          if(record.relieveState==4401) {
              return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                  <a href="#">未解除</a>
               </Popconfirm>;
          }else {
            return '已解除'
        }}}];
        const RangePicker = DatePicker.RangePicker
        return (
        	<div className="vk-page">
            
        	 <Table columns={columns} dataSource={GiveAlarmList} size="middle" bordered={true} />
        	</div>
            
        )
    }
    
    
}

export default GiveAlarm;