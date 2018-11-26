import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import  '../Alarm/style.css'
import '../HistoryCheck/HistoryCheck.css'
import {getDict,postIrrigationBasic,findBypage} from '../../../../../data/dataStore.js' //引入url地址
import HistoryLog from '../HistoryCheck/HistoryLog.js'
const ProgressCircle = Progress.Circle;
const RangePicker = DatePicker.RangePicker
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class HistoryCheck extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
            CheckData:[], //水利设施的数据 
            findBypageData:[]
        }
    }
      componentDidMount() {
         this.loadData()
         this.findBypageList()
      }
      async findBypageList() {
        let param={
            facilityInfoId: 0,
            // startTime:this.state.starttime,
            // endTime:this.state.endTime,
            // state:this.state.styleValue,
            // uid:''
        }
        let data = await findBypage(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            //   console.log(data.data,'考勤值是多少????????')
            this.setState({
                loading: false,
                findBypageData:data.data
            })}}
            async findBypageList1() {
                let param={
                    facilityInfoId:this.state.facilities ? this.state.facilities : 0,
                    startTime:this.state.starttime,
                    endTime:this.state.endTime,
                    state:this.state.styleValue,
                    uid:''
                }
                let data = await findBypage(param).then((res) =>{ return res.json();}).catch(ex => {});
                if (data.code==200 ) {
                    //   console.log(data.data,'考勤值是多少????????')
                    this.setState({
                        loading: false,
                        findBypageData:data.data
               })}}
   // 巡查记录
   async loadData() {
    let CheckList= postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施信息接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'设施？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    // let findBypageList= findBypage({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("考勤信息接口出错");}).then((data) => {
    //     if (data.code === 200) {
    //          console.log(data.data,'考勤？？？')
    //         return data.data;
    //     }
    //     return Promise.reject(data.msg);
    // });
    let data = await Promise.all([ CheckList,]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
      
         let CheckData = data[0];
        //  let findByList= data[1];
        this.setState({
             loading: false,
             CheckData: CheckData,
            //  findBypageData:findByList
            
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
            styleValue:value.key
        })
      }
         // 设施事件
         handleChange(value) {
            // console.log(`selected ${value}`);
            // console.log(value,'设施的值')
            this.setState({
                facilities:value.key
            })
          }
    //   时间时间
     onChange(dates, dateStrings) {
        this.setState({
            starttime:dateStrings[0] ? dateStrings[0]+" "+'00:00:00' : '',
            endTime:dateStrings[1] ? dateStrings[1]+" "+'23:59:59' : ''
        })
      }
    //   考勤
    handleChange2(){

    }
    //   搜索
    AlarmSearch(){
        this.findBypageList1()
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
    //   查看事件
    handleDelete(record){
        // console.log(record,'record')
        // alert('12')
        this.setState({
            visible:true,
            lt:record
        })
    }
    handleCancel4(){
        this.setState({
            visible:false
        })
    }
    render() {   
      const columns = [
        {title: '考勤时间',dataIndex: 'attendanceDate' ,width: "20%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '所属设施',dataIndex: 'facilityName',width: "20%" ,align:'center',},
        {title: '考勤人员',dataIndex: 'personelName',width: "20%" ,align:'center'},
        {title: '考勤结果',dataIndex: 'attendanceState',width: "20%" ,align:'center',render:(attendanceState) =>{ 
            if( attendanceState===1){
                    return  '正常'           
        }else if(attendanceState===2){
            return '异常'
        }
    }},
        {title: '考勤日志',dataIndex: '',width: "20%" ,align:'center',render:( text, record, index) =>{ 
            return  <Button  onClick={() => this.handleDelete(record)}>查看</Button>
        }},
      
    ];
        //    设施
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
              }}
        let  OptionsList=null;
        if(this.state.CheckData != null && this.state.CheckData !=undefined){
          //    console.log(this.state.titleData1,'hhhhhhhhhhh')
             OptionsList = this.state.CheckData.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        return (
        	<div className="zf-page">
        <Modal
          title="日志"
          visible={this.state.visible}
        //   onOk={this.AreYouOk.bind(this)}
          onCancel={this.handleCancel4.bind(this)}
          width={1200}
          bodyStyle={{width:'1200px',height:'700px'}}
           footer={null}
          centered={true}
        >
        <HistoryLog LogList={this.state.lt}></HistoryLog>
        </Modal>
            <div className="input">
            <Row>
        <Col  xs={24} sm={12}  md={6}>
                <label htmlFor="">设施区域选择</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
             {OptionsList}
            </Select>
         </Col>
       
               
        <Col xs={24} sm={12}  md={6}>
                <label htmlFor="">考勤状态</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange1.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>  
             <Option value="0">全部</Option>
             <Option value="1">正常</Option>
             <Option value="2">异常</Option>            
             </Select>
         </Col>
         {/* 考勤人员 */}
         <Col xs={24} sm={12}  md={6}>
                <label htmlFor="">考勤人员</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>  
             <Option value="0">全部</Option>     
             </Select>
         </Col>
         {/* 时间 */}
            <Col xs={24} sm={12}  md={6}>
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

            {/* <div className="picture">
            <div className="picture_nav">
            占比统计数据
            </div>
                

            <div className="picture_title">
          <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                <TabPane tab="类别" key="1"> 
                <ProgressCircle percent={75} />

                </TabPane>
                <TabPane tab="设备" key="2">
                </TabPane>
                <TabPane tab="维护状态" key="3">
                </TabPane>
          </Tabs>
            <span>参与统计总数：100</span>
            </div>
            <div className="shuju">
            100
            </div>
            </div> */}
            <div className="count">
            考勤列表查询
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.findBypageData} size="middle" bordered={true} />
            </div>
        	</div>
            
        )
    }
    
    
}

export default HistoryCheck;