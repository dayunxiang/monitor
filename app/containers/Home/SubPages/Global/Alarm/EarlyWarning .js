import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import {warning} from '../../../../../data/dataStore.js' //引入url地址
import {getDict,warning,readyy,end,removeWaring,removeYujing} from '../../../../../data/dataStore.js'; //引入url

import  '../Alarm/style.css'
import NextLog from '../../basic-data/WarningMessage/NextLog.js'  //日志组件
import InProcess  from '../../basic-data/WarningMessage/InProcess.js'  //开始维护组件
 import BeginMaintenance from '../../basic-data/WarningMessage/BeginMaintenance.js'
// import BeginMaintenancee from '../../Global/Alarm/BeginMaintenancee.js'
import Config from '../../basic-data/WarningMessage/Config.js' //确认结果组件

import ServicingDetail from '../../basic-data/WarningMessage/ServicingDetail.js' //待维护组件

// select部分
class EarlyWarning extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
           tableData:[], //table的数据
            // table:this.props.earlyWarning,
        }}
    //   类型事件
  
      componentDidMount() {
        // this.alarm()
        // this.alarm2()
        // this.alarm()
        // this.props.onRef(this)
      }
      componentWillMount(){
        // this.props.getMsg(this.state.msg);
    }
      // myName = () =>{
      //   alert('123')
      //   this.alarm() 
      // }
  // 报警信息
  // async alarm() {
  //     let alarmParam={
  //       facilityInfoId:this.state.table,
  //       gmtCreateStart: this.starttime,
  //       gmtCreateEnd:this.endTime
  //     }
  //     let data = await warning(alarmParam).then((res) =>{ return res.json();}).catch(ex => {});
  //     if (data && data.data ) {
  //         data.data.forEach((item) => {
  //             item.key = item.id
  //         })
  //          console.log(data.data,'测试的值是多少1122122')
  //         this.setState({
  //             loading: false,
  //             tableData:data.data
  //         })
  //     }
  // }
//   async alarm2() {
//     let alarmParam2={
//       facilityInfoId:93,
//     }
//     let data = await warning(alarmParam2).then((res) =>{ return res.json();}).catch(ex => {});
//     if (data && data.data ) {
//         data.data.forEach((item) => {
//             item.key = item.id
//         })
//          console.log(data.data,'测试的值是多少1122122')
//         this.setState({
//             loading: false,
//             tableData:data.data
//         })
//     }

// }
   // 查看
    handleDelete = (record,e) => {
      console.log(e,'e');
      console.log(record,'record')
      this.setState({
        visible8: true,
        recordLog:record
      });
    }
    handleCancel8(){
      this.setState({
          visible8: false,
        //   lt:record
        });
    }

     // 维护操作 递交结果
     goon=(record)=>{
      // this.readyy() ;
      // console.log(record,'record///////////////////////////////////')
      this.setState({
          visible1: true,
           ztt:record,
        });
  }
  handle() {
    this.props.EwrlyOk()
      // this.loadData()  // 递交结果 刷新页面
      this.setState({
        visible1: false,
      });
    }
  handleCancel1 = (e) => {
       this.setState({
        visible1: false,
      });
    }
      //维护操作  确认结果
      config=(record)=>{
        this.setState({
            visible4: true,
            configData:record,
          });
    }
    // 确认关闭事件
    handleCancel4 = (e) => {
        this.setState({
         visible4: false,
       });
     }
      // 维护操作  开始维护
    begin=(record)=>{
      console.log(record,'record开始')
      this.setState({
          visible: true,
          zt:record,
        });
  }
  handleOk = (e) =>{
    this.props.EwrlyOk()
      // this.loadData()  //开始整改刷新页面
      this.setState({
          visible: false,
        });
  }
  handleCancel () {
       this.setState({
        visible: false,
      });
    }
    AreYouOk(e){
      this.end()
      // this.setState({
      //     visible4: false,
      //   });
   }
    //维护编码  维护中事件
    inMaintenance=(record)=>{
      this.setState({
          visibleServicing: true,
          inMain:record,
      });
      console.log(record,'record')
  }
  handleCancelServicing=(record)=>{
    this.setState({
        visibleServicing: false,
        lt:record
      });
}
// 删除
removeClick(text, record, index) {
  this.removeWaring(record);
}
removeWaring(record) {
  let data = {alarmId: record.id};
  removeWaring(data).then((res) => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject("接口出错");
  }).then((data) => {
      if (data.code === 200) { 
        this.props.EwrlyOk()
        this.setState({
            allList: trData
          });
      }else{
          // message.error(data.msg || "服务器异常!", 5);
      } 
  }).catch((ex) => { 
      // message.error(ex || "服务器异常!",5);
  });
} 
 // 维护编码  已维护事件
 gameOver=(record)=>{
  this.setState({
visibleGameOver:true,
config:record
})
}
handleCancelGameOver=(record)=>{
  this.setState({
      visibleGameOver: false,
    });
}
    render() {
      let allList=this.props.earlyWarning
      console.log(this.props.earlyWarning,'this.props.earlyWarning')
      const columns = [
        {title: '报警时间',dataIndex: 'gmtModified' ,width: "15%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '报警设施',dataIndex: 'deviceName',width: "15%" ,align:'center',},
        // {title: '水利设施Id',dataIndex: 'facilityInfoId',width: "10%" ,align:'center'},
        {title: '报警设备唯一标识',dataIndex: 'deviceSerialNumber',width: "15%" ,align:'center'},
        {title: '报警设备',dataIndex: 'deviceType',width: "15%" ,align:'center',render:deviceType =>{ 
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
        {title: '报警类型',dataIndex: 'alarmType',width: "15%" ,align:'center',render:alarmType =>{ 
            if(alarmType==4101){
              return '设备故障报警'
            } else if(alarmType==4102){
              return '通讯故障报警'
            } else if(alarmType==4103){
                return '设施运行报警'
              }
           },},
           {title: '维护编号',dataIndex: 'rectificationSerial',width: "10%" ,align:'center',render:(processState,record) =>{ 
  
             if( record.processState==null){
                return ''
                } else if(record.processState==3005){
                return   <Button  onClick={() => this.inMaintenance(record)}>{record.rectificationSerial}</Button>
                }else if(record.processState==3006){
                 return   <Button  onClick={() => this.gameOver(record)}>{record.rectificationSerial}</Button>
               }
            }

    
        },
        {title: '维护操作',dataIndex: '',width: "10%" ,align:'center',
        render:(processState,record) =>{ 
            if(record.alarmType==4103) {
                return
            }
            if(record.processState==null){
               return <Button  onClick={() => this.begin(record)}>开始维护</Button>
               } else if(record.processState==3005){
               return <Button onClick={() => this.goon(record)}>递交结果</Button>
               }else if(record.processState==3006){
                return <Button  onClick={() => this.config(record)} >确认维护</Button>
               }
           },
    },
    {title: '维护日志',dataIndex: 'index',width: "10%" ,align:'center',render:(processState,record) =>{ 
      // alarmType==4103  
       if(record.alarmType==4103) {
           return
       }
       if( record.processState==null){
          return ''
          } else if(record.processState==3005 || record.processState==3006){
          return   <Button  onClick={() => this.handleDelete(record)}>查看</Button>
          }
      //     else if(record.processState==3006){
      //      return   <Button  onClick={() => this.gameOver(record)}>查看</Button>
      //    }
      }},
        {title: '报警状态是否被解除',dataIndex: '',width: "15%" ,align:'center',render: (text, record, index) => {
          if(record.relieveState==4401) {
              return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                  <a href="#">未解除</a>
               </Popconfirm>;
          }else {
            return '已解除'
        }}}];
       
        return (
        	<div className="vk-sub">
           
           {/* 信息 */}
           <div className="message">
            {/* <GiveAlarm></GiveAlarm> */}
            {/* 数据展示 */}
            <Table columns={columns} dataSource={allList} size="middle" bordered={true}/>
            </div>
              {/* 日志 */}
        <Modal
          title="日志详情"
          visible={this.state.visible8}
          onCancel={this.handleCancel8.bind(this)}
          width={1200}
          bodyStyle={{width:'1200px',height:'400px'}}
          footer={null}
          centered={true}
        >
        {/* 日志详情 查看 */}
        <NextLog logList={this.state.recordLog}></NextLog>
        </Modal>
         {/* 维护操作 递交结果 */}
         <Modal
            title="设备维护明细单"
            visible={this.state.visible1}
            handle={this.handle.bind(this)}
            onCancel={this.handleCancel1.bind(this)}
            width={1400}
            bodyStyle={{width:'1400px',height:'700px'}}
            footer={null}
            centered={true}
            >
            <InProcess zfList={this.state.ztt} handle={this.handle.bind(this)}></InProcess>

        </Modal>
         {/* 维护操作 确认维护 */}
         <Modal
          title="维护确认"
          visible={this.state.visible4}
          onOk={this.AreYouOk.bind(this)}
          onCancel={this.handleCancel4.bind(this)}
          width={400}
          bodyStyle={{width:'300px',height:'200px'}}
        //   footer={null}
          centered={true}
          okText="确认"
          cancelText="取消"
        >
        确定结束本次报警
        </Modal>
        {/* 维护操作   开始维护 */}
        <Modal
                title="设备维护明细单"
                visible={this.state.visible}
                onCancel={this.handleCancel.bind(this)}
                handleOk={this.handleOk.bind(this)}
                width={1400}
                bodyStyle={{width:'1400px',height:'700px'}}
                footer={null}
                centered={true}
              >
               <BeginMaintenance ztList={this.state.zt}     handleOk={this.handleOk.bind(this)}   cuandi={this.state.zf}></BeginMaintenance>
            </Modal>
              {/* 维护编码 维护中弹窗 */}
           <Modal
                title="设备维护明细单"
                visible={this.state.visibleServicing}
                onCancel={this.handleCancelServicing.bind(this)}
                // handleOk={this.handleOk.bind(this)}
                width={1300}
                bodyStyle={{width:'1300px',height:'600px'}}
                footer={null}
                centered={true}ddddd
              >
             <ServicingDetail inMain={this.state.inMain} handle={this.handle.bind(this)}></ServicingDetail>
            </Modal>
             {/* 维护编码 已维护 */}
             <Modal
                title="设备维护明细单"
                visible={this.state.visibleGameOver}
                onCancel={this.handleCancelGameOver.bind(this)}
                // handleOk={this.handleOk.bind(this)}
                width={1300}
                bodyStyle={{width:'1300px',height:'900px'}}
                footer={null}
                centered={true}ddddd
              >
              <Config AreOk={this.AreYouOk.bind(this)}  inconfig={this.state.config}></Config>
            </Modal>
        </div>
            
        )
    }
    
    
}

export default EarlyWarning;