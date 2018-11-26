import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,DatePicker,Popconfirm,message  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {getDict,warmingMessage,readyy,end,removeWaring,removeYujing} from '../../../../../data/dataStore.js'; //引入url
import BeginMaintenance from '../../basic-data/WarningMessage/BeginMaintenance.js'
import InProcess  from '../../basic-data/WarningMessage/InProcess.js'  //开始维护组件
import ServicingDetail from '../../basic-data/WarningMessage/ServicingDetail.js' //待维护组件
import Config from '../../basic-data/WarningMessage/Config.js' //确认结果组件
import NextLog from '../../basic-data/WarningMessage/NextLog.js'  //日志组件
import Wating from '../../basic-data/WarningMessage/Wating.js'  //待维护组件
import moment from 'moment';
const Option = Select.Option;
const Step = Steps.Step;
class CheckCoverp extends React.Component {
    constructor(props,) {
        super(props);
        this.handleOk=this.handleOk.bind(this)

        this.handle=this.handle.bind(this)
        this.state = {
             tableData2:[],
             tableData3:[], //table的数据
             dictData: null,  //报警类型
             titleData:null,  //报警设备
             titleData2:null, //维护状态 warmingMessage
             tableData4:[],  
             state:false,
             zt:[],
             treeData: null, //table的数据
             trData:null
            
        }
        this.cach = {}; //缓存 优化
    }
    componentDidMount() {
     this.loadData(); 

        
    }

   
//     async readyy() {
//         // let item = this.props.form.getFieldsValue();
//         let data1 =  {
//             alarmId:8,
//             // content: item.wlName,
//             // remark: item.remarks,  
//        };
//         let data = await readyy(data1).then((res) =>{ return res.json();}).catch(ex => {});
//         if (data.code==200) {
//         // data.data.forEach((item) => {
//         //     item.key = item.id
//         // })
//         console.log(data.data,'老大的查询值是多少')
//     }

//  }
    // 确认交互
    async end() {
        let ar=this.state.configData.id;
        let param = new FormData();
           param.append('alarmId', ar);
       
        let data = await end(param).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code==200 ) {
             message.success((data.msg))
             this.setState({
                visible4: false,
              });
              this.loadData()
        }
    
     }
    // 巡查记录
    async loadData() {
        let statePromise = getDict(["alarm_type"]);  //报警类型
        let statePromise1=getDict(['device_type']);   //报警设备
        let statePromise2=getDict(['process_state']);   //维护状态  
        let stateList= warmingMessage({relieveState:4401}).then((res) =>{ return res.ok ? res.json() : Promise.reject("报警信息接口出错");}).then((data) => {
            if (data.code === 200) {
                // console.log(data.data,'看看值是多少？？？')
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let data = await Promise.all([ statePromise,statePromise1,statePromise2,stateList,]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            // let TitleData = data[0];
            // TitleData.forEach((item) => {
            //     item.key = item.rectificationId   //这是遍历的时候用
            // })
             let dictData = data[0];
             let titleData=data[1];
             let titleData2=data[2];
             let warmingData=data[3];
            //  let readyData=data[4];
            //  console.log(readyData,'readyData')
            // this.primaryData = {conData}
            this.setState({
                 loading: false,
                 dictData: dictData,
                 titleData:titleData,
                 titleData2:titleData2,
                 tableData4:warmingData,
            })
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }
    }
      // 报警设施事件
      handleChange(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'设施的值')
        this.setState({
            facilities:value.key
        })
      }

    //    报警类型事件
    handleChange1(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'类型的值是多少')
        this.setState({
            styleValue:value
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
            starttime:dateStrings[0]+" "+'00:00:00',
            endTime:dateStrings[1]+" "+'23:59:59'
        })
      }
    //   搜索
    AlarmSearch(){
        this.checkSearch()
    }
    // 查询交互
    async checkSearch() {
        let param =  {
            alarmType:this.state.styleValue,  //报警类型
            facilityInfoId: this.state.facilities,                     //报警设施
            deviceType:this.state.deviceValue,                         //报警设备
            processState:this.state.stateValue,                       //维护状态
            gmtCreateStart:this.state.starttime,                    //
            gmtCreateEnd:this.state.endTime,
            relieveState:4401
           };
        //    console.log(param,'param')
        let data = await warmingMessage(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
        // console.log(data.data,'报警信息')
        // var ps=data.data;
        // var lt=ps.map((item,index)=>{
        //     return item
        // })
        // console.log(lt[0].processStateName,'lt???')
        this.setState({
            loading: false,
            tableData4:data.data
        })
    }

}
    // 查看
    handleDelete = (record,e) => {
        // console.log(e,'e');
        // console.log(record,'record')
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
    //   弹出框消失
    
    //   
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
                this.loadData()
                this.setState({
                    tableData4: trData
                });
            }else{
                // message.error(data.msg || "服务器异常!", 5);
            } 
        }).catch((ex) => { 
            // message.error(ex || "服务器异常!",5);
        });
    } 
    // 解除报警事件
    removeClick1(text, record, index) {
        this.removeWarming(record);
    }

    removeWarming(record) {
        let data = {alarmId: record.id};
        removeWaring(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
        }).then((data) => {
            if (data.code === 200) { 
                this.loadData()
                this.setState({
                    tableData: treeData
                });
            }else{
                // message.error(data.msg || "服务器异常!", 5);
            } 
        }).catch((ex) => { 
            // message.error(ex || "服务器异常!",5);
        });
    } 
    //维护编码  维护中事件
    inMaintenance=(record)=>{
        this.setState({
            visibleServicing: true,
            inMain:record,
        });
        // console.log(record,'record')
    }
    handleCancelServicing=(record)=>{
        this.setState({
            visibleServicing: false,
            lt:record
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
    // 维护操作  开始维护
    begin=(record)=>{
        // console.log(record,'record')
        this.setState({
            visible: true,
            zt:record,
          });
    }
    handleOk = (e) =>{
        this.loadData()  //开始整改刷新页面
        this.setState({
            visible: false,
          });
    }
    handleCancel () {
         this.setState({
          visible: false,
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
        this.loadData()  // 递交结果 刷新页面
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
    //  确认确定事件
     AreYouOk(e){
        this.end()
       
     }
    render() {
         const lt=this.state.tableData4.processState;
        //  console.log(lt,'lt')
        const columns = [
            {title: '报警时间',dataIndex: 'gmtCreate' ,width: "8%" ,align:'center',
            // render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
            {title: '报警设施',dataIndex: 'facilityName',width: "8%" ,align:'center'},
            {title: '报警类型',dataIndex: 'alarmType',width: "8%" ,align:'center',render:alarmType =>{ 
                if(alarmType==4101){
                  return '设备故障报警'
                } else if(alarmType==4102){
                  return '通讯故障报警'
                } else if(alarmType==4103){
                    return '设备预警'
                }
               },},
            // {title: '报警设备',dataIndex: 'deviceTypeName',width: "8%" ,align:'center'},
             {title: '设备类型',dataIndex: 'deviceType',width: "8%" ,align:'center',render:deviceType =>{ 
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
            {title: '维护编号',dataIndex: '',width: "10%" ,align:'center',render:(processState,record) =>{ 
                // alarmType==4103  
                 if(record.alarmType==4103) {
                     return
                 }
                 if( record.processState==null){
                    return ''
                    } else if(record.processState==3005){
                    return   <Button  onClick={() => this.inMaintenance(record)}>{record.rectificationSerial}</Button>
                    }else if(record.processState==3006){
                     return   <Button  onClick={() => this.gameOver(record)}>{record.rectificationSerial}</Button>
                   }
                }
            },
            {title: '报警内容',dataIndex: 'deviceTypeName',width: "12%" ,align:'center',
            render:(deviceTypeName,record) =>{ 
                  if(record.alarmType==4103){
                  return deviceTypeName
                  }
               }
            },
            {title: '维护状态',dataIndex: '',width: "8%" ,align:'center',render:(processState,record) =>{ 
                if(record.alarmType==4103) {
                    return
                }
                if( record.processState==null){
                   return '待维护'
                   } else if(record.processState==3005){
                   return  '维护中'
                   }else if(record.processState==3006){
                    return  '已维护'
                  }
               },},
            
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
            {title: '其他操作', dataIndex: "", width: "5%", render: (text, record, index) => {
                if(record.alarmType==4103) {
                    return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                        <a href="#">解除</a>
                     </Popconfirm>;
                } else if(record.alarmType!=4103){
                    return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick1.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                         <a href="#">解除</a>
                     </Popconfirm>;
                }
            }},
            {title: '备注',dataIndex: 'deviceSerialNumber3333',width: "10%" ,align:'center'},
        ];
            // 选框判断
            // 报警类型
            let stateOptions = null;
            if (this.state.dictData && this.state.dictData.alarm_type) {
                if (this.cach["alarm_type"]) {
                    stateOptions = this.cach["alarm_type"]
                }else{
                    stateOptions = this.state.dictData.alarm_type.map(({text, value}) => {
                        return <Option key={value} value={value}>{text}</Option>
                    });
                    stateOptions.unshift(<Option key="null" value="">全部</Option>);
                    this.cach["alarm_type"] = stateOptions;
                }
            }
                //    报警设施
            let TypeOptions = null;
            if (this.state.titleData && this.state.titleData.device_type) {
                if (this.cach["device_type"]) {
                    TypeOptions = this.cach["device_type"]
                }else{
                    TypeOptions = this.state.titleData.device_type.map(({text, value}) => {
                        return <Option key={value} value={value}>{text}</Option>
                    });
                    TypeOptions.unshift(<Option key="null" value="">全部</Option>);
                    this.cach["device_type"] = TypeOptions;
                }
            }
            // 维护状态
            let OptionsState = null;
            if (this.state.titleData2 && this.state.titleData2.process_state) {
                if (this.cach["process_state"]) {
                    OptionsState = this.cach["process_state"]
                }else{
                    OptionsState = this.state.titleData2.process_state.map(({text, value}) => {
                        return <Option key={value} value={value}>{text}</Option>
                    });
                    OptionsState.unshift(<Option key="null" value="">全部</Option>);
                    this.cach["process_state"] = OptionsState;
                }
            }
        // 时间组件
        const RangePicker = DatePicker.RangePicker
        return (
        	<div className="vk-subpage">
             <div className="alarm_title">
             <Row>
                <Col span="4"> 
                  {/* 类型部分 */}
                 <label htmlFor="">报警类型</label>
                 <Select showSearch style={{ width: 200 }}   onChange={this.handleChange1.bind(this)}  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >{stateOptions}</Select>
                </Col>
                <Col span="4">
                <label htmlFor="">报警设施</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                // onFocus={this.handleFocus.bind(this)}
                // onBlur={this.handleBlur.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
                    {this.state.tableData4.map(text=>{
                        // console.log(text,'text')
                        // console.log(text.facilityName,'text的值？？？？？？')
                        return  <Option key={text.id} value={text.id} >{text.facilityName}</Option>
                    })}
            </Select>
                </Col>
                <Col span="4">
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
                <Col span="4">
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
                <Col span="4">
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange.bind(this)} />
                 </div>
                </Col>
                <Col span="4">
                 {/* 查询按钮 */}
            <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>查询</Button>
                </Col>
            </Row>
            {/* 中间 */}
          <div className="m">
            {/* 维护编号 待维护弹窗 */}
            {/* <Modal
                title="设备维护明细单"
                visible={this.state.visibleWating}
                onCancel={this.handleCancelWating.bind(this)}
                handleOk={this.handleOk.bind(this)}
                width={1300}
                bodyStyle={{width:'1300px',height:'400px'}}
                footer={null}
                centered={true}ddddd
              >
              <Wating WatingList={this.state.Wating}></Wating>
            </Modal> */}
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
          </div>
          {/* 右边 */}
            </div>
           {/* 信息 */}
           <div className="message">
            {/* <GiveAlarm></GiveAlarm> */}
            <Table columns={columns} dataSource={this.state.tableData4} size="middle" bordered={true}/>
            </div>
        	</div>
            
        )
    }
    
    
}

export default CheckCoverp;