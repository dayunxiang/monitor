import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
//import  '../Alarm/style.css'
import '../HistoryWaterLevel/HistoryWaterLevel.css'
import {getDict,postIrrigationBasic,WaterLevelQuery} from '../../../../../data/dataStore.js' //引入url地址
const Option = Select.Option;
const ProgressCircle = Progress.Circle;
const RangePicker = DatePicker.RangePicker
const TabPane = Tabs.TabPane;
class HistoryWaterLevel extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
         tableData:[], //table的数据 
         dictData: null,  //设施展示
         waterData:[]
        //  titleData:null,  //报警设备
        //  titleData2:null, //维护状态 warmingMessage	
        }
    }
      componentDidMount() {
         this.loadData()
         this.waterListQuery()
      }
      //    其他设备
async waterListQuery() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate()-4;
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var dayList1=year+'-'+month+'-'+day+' '+'00:00:00';
    var dayList=year+'-'+month+'-'+day+' '+'23:59:59';

     let param={
        facilityId:this.state.facilities ? this.state.facilities : 0,
        start:this.state.starttime ? this.state.starttime : dayList1,
        end:this.state.endTime ? this.state.endTime : dayList
    }
    let data = await WaterLevelQuery(param).then((res) =>{ return res.json();}).catch(ex => {});
    loading: true
    if (data.code==200 ) {
        //   console.log(data.data[0].list,'其他设备值是多少????????')
        //   var PumpGateList=data.data[0].list;
        //   var at=PumpGateList.map(item=>{
        //       return item
        //   })
        //   console.log(at,'at')
        loading: false
        this.setState({
            loading: false,
            waterData:data.data
        })}}
   // 水利设施记录
   async loadData() {
    let stateList= postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("设施选择接口出错");}).then((data) => {
        if (data.code === 200) {
         console.log(data.data,'水利设施值是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    // 水位展示
    let WaterList= WaterLevelQuery({facilityId:0}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水位信息接口出错");}).then((data) => {
        if (data.code === 200) {
             console.log(data.data,'看看水位值是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    
    let data = await Promise.all([ stateList,WaterList]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {

         let dictData = data[0];
         let waterData=data[1];
              
        this.setState({
             loading: false,
             dictData: dictData,
             waterData:waterData,
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
            // console.log(value.key,'设施的值')
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
            endTime:dateStrings[1] ? dateStrings[1]+" "+'23:59:59': null
        })
      }
    //   搜索
    AlarmSearch(){
        this.waterListQuery()
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
      const columns = [
        {title: '更新时间',dataIndex: 'gmtCreate' ,width: "20%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '水利设施',dataIndex: 'facilityName',width: "20%" ,align:'center',},
        {title: '内河水位',dataIndex: 'inLandLevel',width: "20%" ,align:'center'},
        {title: '外河水位',dataIndex: 'outerLevel',width: "20%" ,align:'center'},
        {title: '水位差值',dataIndex: 'difference',width: "20%" ,align:'center',
        // render:( text, record, index) =>{
        //     retuen (record.outerLevel-record.inLandLevel)
        // },
    }
    ];
        
        let  OptionsList=null;
        if(this.state.dictData != null && this.state.dictData !=undefined){
             OptionsList = this.state.dictData.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        return (
        	<div className="zf-page">
            <div className="input">
        <Row>
        <Col  xs={24} sm={12}  md={8}>
                <label htmlFor="">设施选择</label>
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
    
            <Col xs={24} sm={12}  md={8}>
                {/* <div className="time">
                时间选择
                </div> */}
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange.bind(this)} />
                 </div>
            </Col>
            <Col xs={24} sm={12}  md={8} >
             {/* 下载 */}
             <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               {/* <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmDowm.bind(this)}>下载</Button> */}
            </Col>
               {/* 打印 */}
               <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               {/* <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmStamp.bind(this)}>打印</Button> */}
            </Col>
               {/* 导出 */}
               <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmExport.bind(this)}>导出</Button>
            </Col>
             
            <Col xs={24} sm={12}  md={6}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="search" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>查询</Button>
            </Col>   
            </Col>
            <div className="button">
           
            </div>
            </Row>
            </div>
           

            <div className="count">
            设施水位列表
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.waterData} size="middle" bordered={true} />
            </div>
        	</div>
            
        )
    }
    
    
}

export default HistoryWaterLevel;