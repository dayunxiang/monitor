import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,DatePicker,Popconfirm  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {relevanUnit,personShow,postIrrigationBasic,Addinspector,Queryinspector,addInfo,QueryforConservancy,deletecondition} from '../../../../../data/dataStore.js'; //引入url

// import '../Inspectors/style.css'
// import '../WarningMessage/warning.css'
import '../gradeList/gradeList.css'
import moment from 'moment';
const Step = Steps.Step;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class InspectionUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
            tableData:[],
            dictData:null,
            tableData1:[],
            QuerytableData:[],
            UserIdList:[],
            paibanState:[],
            tableData8:[]
            // LogData:this.props.logList
          };
        
      }
    // 事件
            componentDidMount(){
               this.loadData()
              }
            //   公司展示
              async loadData() {
                let stateList= relevanUnit({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("公司展示列表接口出错");}).then((data) => {
                    if (data.code === 200) {
                          console.log(data.data,'公司值是多少？？？')
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                }); 
                let data = await Promise.all([ stateList]).then((data) => {
                    return data;
                }).catch(ex => { return ex;})
                if (Array.isArray(data) && data.length ) {
            
                     let dictData = data[0];
                    //  let waterData=data[1];
                    this.setState({
                         loading: false,
                         dictData: dictData,
                        //  waterData:waterData,
                    })
                }else{
                    this.setState({
                        loading: false
                    })
                    message.error( data ||  "服务器异常!",5);
                }
            }
    // 关联人员
    async UserList() {
        let param =  {
            conservancyId:this.WaterId
           };
        let data = await personShow(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        console.log(data.data,'人员')
        this.setState({
            loading: false,
            tableData:data.data
        })
    }}
    // 展示排班 
    async AllList() {
        // 获取当前日期
        // var nowdate = new Date();
        // var y = nowdate.getFullYear();
        // var m = nowdate.getMonth()+1;
        // var d = nowdate.getDate();
        // var h=nowdate.getHours();
        // var mi=nowdate.getMinutes()
        // var s=nowdate.getSeconds()
        // var formatnowdate =y+'-'+m+'-'+d+' '+h+':'+mi+':'+s;
        // var date = new Date();
        // var d = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +date.getHours()+ ":" + date.getMinutes()+":"+data.getSeconds();
        // 获取一周前日期
        // var oneweekdate = new Date(nowdate-7*24*3600*1000);
        // var y = oneweekdate.getFullYear();
        // var m = oneweekdate.getMonth()+1;
        // var d = oneweekdate.getDate();
        // var h=nowdate.getHours();
        // var mi=nowdate.getMinutes()
        // var s=nowdate.getSeconds()
        // var formatwdate = y+'-'+m+'-'+d+' '+h+':'+mi+':'+s;
        // console.log(formatwdate,'获取一周前日期')
        let param =  {

            conservancyId:this.WaterId,
            startSchedule: this.start,  //开始排班时间
            endSchedule: this.end   //结束时间
           };
        let data = await QueryforConservancy(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        console.log(data.data,'展示排班')
        this.setState({
            loading: false,
            tableData8:data.data
        })
    }}
  // 水利设施
  async ShuiliList() {
    let param =  {
        maintenanceCompanyId:this.ComponentId
       };
    let data = await postIrrigationBasic(param).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code=200 ) {
    // data.data.forEach((item) => {
    //     item.key = item.id
    // }
    console.log(data.data,'水利设施')
    this.setState({
        loading: false,
        tableData1:data.data
    })}}
    // async addInfo () {
    //     let newIdList=[];
    //     let everyId=[];
    //      let everyId2=[];
    //     console.log(this.state.paibanState,'this.state.paibanState')
    //     if(this.state.paibanState=== '0'){
    //     if( this.UserIdList!=null && this.UserIdList!='undefind'){
    //         newIdList=this.UserIdList
    //     }
    //     everyId=newIdList.map((item,index)=>{
    //         return {
    //             userId:parseInt(item.key),      //用户id
    //             userName:item.label,
    //             beginTime: this.start,
    //             endTime:this.end
    //            }
    //     })
            
    //     } else if(this.state.paibanState==='1'){
    //         if( this.UserIdList!=null && this.UserIdList!='undefind'){
    //             newIdList=this.UserIdList
    //         }
    //         everyId2=newIdList.map((item,index)=>{
    //             return {
    //                 userId:item.key,      //用户id
    //                 userName:item.label,
    //                 beginTime: this.start,
    //                 endTime:this.end
    //                }
    //         })                
    //     }
    //     let param =  {
    //         conservancyId:this.WaterId,  //水利设施id
    //         conservancyName:this.WaterName,         //水利设施名称
    //         scheduleDate:this.paibanDay,     //排班日期
    //         normalSchedule:everyId, //正常排班  
    //         floodSchedule:everyId2  
    //        };
    //     let paramm=[param]
    //     let data = await addInfo(paramm).then((res) =>{ return res.json();}).catch(ex => {});
    //     if (data.code=200 ) {
    // }
    // }
  // 公司点击事件
    handleChange1(value){
        this.ComponentId=value;
        this.UserList()
        this.ShuiliList()
   console.log(value,'公司111');
    }
    // 水利设施事件
    handleChange(value){
        this.WaterId=parseInt( value.key)
        this.WaterName=value.label
        console.log(value.key,'水利111')
        this.UserList()
        this.AllList()


    }
    // 排班人员
    handleChange2(value){
     this.UserIdList=value
     console.log(value,'value')

    }
    //    排班类型
    // handleChange3(value){
    //     console.log(value.key,'value')
    //     this.paibanState=value.key
    //     this.setState({
    //         paibanState:value.key
    //     })
    // }
    // 人员绑定事件
    // bindinggrade(){
    //     this.addInfo()

    // }
    // 排班查询
    AlarmSearch(){


    }
    // 排班上下班时间
    onChangeTime(dates, dateStrings) {
        this.start=dateStrings[0];
        this.end=dateStrings[1]
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }
      // 排班日期
    //   onChange(value, dateString) {
    //       this.paibanDay=dateString
    //     console.log(dateString,'dateString');
    //   }
      onOk(value) {
        console.log('onOk: ', value);
      }
        //   删除事件
    removeClick(text, record, index) {
        this.removeYujing(record);
    }   
    removeYujing(record) {
        let data = {
            inspectorScheduleId: record.facilityId,  //排班记录id
            conservancyId: record.facilityId,
            userId:userId,  //用户id
            scheduleDate:scheduleDate, //排班时间
            scheduleType:record.scheduleType //排班类型
        };
        deletecondition(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
        }).then((data) => {
            if (data.code === 200) { 
                // this.MubiaoList()
                // this.setState({
                //     tableData4: trData
                // });
            }else{
                // message.error(data.msg || "服务器异常!", 5);
            } 
        }).catch((ex) => { 
            // message.error(ex || "服务器异常!",5);
        });
    } 
    render() {
        // let normal=this.state.tableData8
        // let avt=[]
        // if(normal!=null && normal!='undefind' && normal.map!=null && normal.map!='undefind'){
        //     normal.map((item)=>{
        //     avt= item.floodSchedule
        //     })
        // }
      
        const columns = [
            {title: '所属水利设施',dataIndex: 'conservancyName',width: "11%" ,align:'center',},
            {title: '排班时间',dataIndex: 'scheduleDate',width: "11%" ,align:'center'},
            {title: '正常排班人员',dataIndex: 'normalSchedule',width: "11%" ,align:'center', 
            render:( text, record, index) =>{ 
                let user=[]
                if(record.normalSchedule!=null  && record.normalSchedule.map!=null ){
                    user = record.normalSchedule.map((item)=>{
                        return item.userName 
                    })
                }
    
                // user.join(',')
               return   user.join(',')
                
               }},
            {title: '正常上班时间',dataIndex: 'scheduleDate2',width: "11%" ,align:'center',
            render:( text, record, index) =>{ 
                let beginTime=[]
                if(record.normalSchedule!=null && record.normalSchedule!='undefind' && record.normalSchedule.map!=null && record.normalSchedule.map!='undefind'){
                    beginTime=record.normalSchedule.map((item)=>{
                       return item.beginTime 
                    })
                }
               return  beginTime.join(',')
                
               }
        },
            {title: '正常下班时间',dataIndex: 'scheduleDate3',width: "11%" ,align:'center',
            render:( text, record, index) =>{ 
                let endTime=[]
                if(record.normalSchedule!=null && record.normalSchedule!='undefind' && record.normalSchedule.map!=null && record.normalSchedule.map!='undefind'){
                    endTime= record.normalSchedule.map((item)=>{
                        return item.endTime 
                    })
                }
               return  endTime.join(',')
                
               }
        },
            {title: '汛期排班人员',dataIndex: 'scheduleDate4',width: "11%" ,align:'center',
            render:( text, record, index) =>{ 
                let floodUser=[]
                if(record.floodSchedule!=null && record.floodSchedule.map!=null ){
                    floodUser=record.floodSchedule.map((item)=>{
                       return item.userName 
                    })
                }
               return  floodUser.join(',')
                
               }
        },
            {title: '汛期上班时间',dataIndex: 'scheduleDate5',width: "11%" ,align:'center',
            render:( text, record, index) =>{ 
                let beginTime=[]
                if(record.floodSchedule!=null && record.floodSchedule.map!=null ){
                    beginTime=record.floodSchedule.map((item)=>{
                       return item.beginTime 
                    })
                }
               return  beginTime.join(',')
                
               }
        },
            {title: '汛期下班时间',dataIndex: 'scheduleDate6',width: "11%" ,align:'center',
            render:( text, record, index) =>{ 
                let endTime=[]
                if(record.floodSchedule!=null && record.floodSchedule.map!=null ){
                    endTime=record.floodSchedule.map((item)=>{
                       return item.endTime 
                    })
                }
               return  endTime.join(',')
                
               }
        },
            {title: '删除绑定项',dataIndex: '',width: "17%" ,align:'center', render: (text, record, index) => {
                return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">解除</a>
                 </Popconfirm>;
            
        }}

    ];
        //   公司列表
          let  OptionsList=null;
          if(this.state.dictData != null && this.state.dictData !=undefined){
               OptionsList = this.state.dictData.map((text) => {
                  return <Option key={text.id}>{text.companyName}</Option>
               });
          } 
        //   人员  
        let  User=null;
        if(this.state.tableData != null && this.state.tableData !=undefined){
            User = this.state.tableData.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        // 水利 name
        let  ShuiliList=null;
        if(this.state.tableData1 != null && this.state.tableData1 !=undefined){
            ShuiliList = this.state.tableData1.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        return (
        <div className='vip'>
          <Row  style={{marginRight:'15px'}}>
                <Col xs={24} sm={12}  md={4}> 
                  {/* 类型部分 */}
                 <label htmlFor="">公司名称</label>
                 <Select showSearch style={{ width: 200 }}  
                  onChange={this.handleChange1.bind(this)}  
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                  {/* {stateOptions} */}
                  {OptionsList}
                  </Select>
                </Col>
                <Col xs={24} sm={12}  md={4}>
                <label htmlFor="">公司所属水利设施</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
                 {ShuiliList}
                  
            </Select>
                </Col>
                 {/* 排班人员 */}
               <Col xs={24} sm={12}  md={4}>
             <label htmlFor="">排班人员选择</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                mode={'multiple'}
                tokenSeparators={[',']}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                    {/* {TypeOptions}                */}
                    {User}
            </Select>
            </Col>
              {/* 排班日期 */}
              {/* <Col xs={24} sm={12}  md={4}>
                <label htmlFor="">排班日期</label>
                <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                onChange={this.onChange.bind(this)}
                onOk={this.onOk.bind(this)}
                />       
                </Col> */}
            {/* 排班类型 */}
            {/* <Col xs={24} sm={12}  md={4}>
             <label htmlFor="">排班类型</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange3.bind(this)}
                tokenSeparators={[',']}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
               <Option value="0">正常</Option>
               <Option value="1">汛期</Option>
            </Select>
            </Col >   */}
                <Col xs={24} sm={12}  md={4}>
                 
                 <RangePicker
                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onChangeTime.bind(this)}
                    placeholder={['开始时间', '结束时间']}               
                    className='timeCycle'
                />
                </Col>
            </Row>
            <Row>
                <Col span={1.5}  style={{float:'right'}}>
                 {/* 查询按钮 */}
               <Button type="primary" icon="add" style={{float:'right',marginRight:'15px',marginTop:'15px'}} onClick={this.AlarmSearch.bind(this)}>排班查询</Button>
                </Col>
                {/* <Col span={1.5}  style={{float:'right'}}>
               <Button type="primary" icon="add" style={{float:'right',marginRight:'15px',marginTop:'15px'}} onClick={this.bindinggrade .bind(this)}>排班安排</Button>
                </Col>
                */}
            </Row>
       <Table columns={columns} dataSource={this.state.tableData8} size="middle" bordered={true}/>

      </div>
        )
      }
    }
export default InspectionUser;