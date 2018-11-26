import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker,Progress,Popconfirm,Tabs   } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import moment from 'moment';
import  '../HistoryRectify/HistoryRectify.css'
import RectifyLog from "../../../../../components/RectifyLog/RectifyLog.js"
// import RectifyNotice from "./RectifyNotice.js"
import RectifyNotice from "../../../../../containers/Home/SubPages/WaterConservancyRectify/RectifyNotice.js"

import '../HistoryAlarm/HistoryAlarm.css'
import {getDict,postRectifyList,postIrrigationBasic,postRectifyLog,postRectifyFindOne,personShow,findTargerContent,findAllTargerContent} from '../../../../../data/dataStore.js' //引入url地址
const Option = Select.Option;
const ProgressCircle = Progress.Circle;

class HistoryRectify extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
         tableData:[], //table的数据 
         dictData: null,  //报警类型
         titleData:null,  //报警设备
         titleData2:null, //维护状态 warmingMessage	
         tableData4:null,  //整改内容
         tableData5:null, //水利设施
         personShowDataTable:null,  //报告人
         targetContentAll:[], //问题点
        }
        this.cach = {}; //缓存 优化

    }
      componentDidMount() {
         this.loadData()
      }
    //   搜索事件
    async checkSearch() {
         let param={
            conservancyId:this.state.styleValue,  //设施id
            targetId:this.state.deviceValue,   //大项id
            rectificationId:this.state.queryValue, //问题id
            processState:this.state.stateValue,  //问题状态
            // rectificationSerial:11,

            // start:this.state.starttime,
            // end:this.state.endTime 
        }
        let data = await postRectifyList(param).then((res) =>{ return res.json();}).catch(ex => {});
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
                tableData4:data.data
            })}}
   // 整改记录
   async loadData() {
   // let statePromise = getDict(["alarm_type"]);  //报警类型
    let statePromise1=getDict(['device_type']);   //报警设备
    let statePromise2=getDict(['process_state']);   //维护状态  
    let RectifyList= postRectifyList({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("整改信息接口出错");}).then((data) => {
        if (data.code === 200) {
              console.log(data.data,'整改是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    let  WaterConservancyList = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施信息接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'水利设施是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    // 报告人员   personShow
    let  personShowList = personShow({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("获取报告人施信息接口出错");}).then((data) => {
        if (data.code === 200) {
        //   console.log(data.data,'报告人是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });    
    // 问题点  问题内容  findTargerContent
    let  findTargerContentList = findAllTargerContent({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("获取问题点信息接口出错");}).then((data) => {
        if (data.code === 200) {
          console.log(data.data,'问题点是多少？？？')
            return data.data;
        }
        return Promise.reject(data.msg);
    });    

    let data = await Promise.all([statePromise1,statePromise2,RectifyList,WaterConservancyList,personShowList,findTargerContentList]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
        // let TitleData = data[0];
        // TitleData.forEach((item) => {
        //     item.key = item.rectificationId   //这是遍历的时候用
        // })
        // let dictData = data[0];
         let titleData=data[0];
         let titleData2=data[1];
        let warmingData=data[2];
        let waterList=data[3]; //水利设施
        let  personShowData=data[4]; //报告人
        let targetContent=data[5]; //问题点
        //  let readyData=data[4];
        //  console.log(readyData,'readyData')
        // this.primaryData = {conData}
        this.setState({
             loading: false,
            //  dictData: dictData,
             titleData:titleData,
             titleData2:titleData2,
             tableData4:warmingData,
             tableData5:waterList, //水利设施
             personShowDataTable:personShowData,
             targetContentAll:targetContent

        })
    }else{
        this.setState({
            loading: false
        })
        message.error( data ||  "服务器异常!",5);
    }
}
    //   设施
    handleChange(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'类型的值是多少')
        this.setState({
            styleValue:value.key
        })
      }
         // 报告人
         handleChange1(value) {
            // console.log(`selected ${value}`);
            // console.log(value,'设施的值')
            this.setState({
                facilities:value.key
            })
          }
             //  问题点
      handleChange2(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'报警设备的值是多少')
        this.setState({
            deviceValue:value.key
        })
      }
    //   问题内容
      handleChange3(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'维护状态的值是多少')
        this.setState({
            queryValue:value.key
        })
      }
       //   整改状态
       handleChange4(value) {
        // console.log(`selected ${value}`);
        // console.log(value,'维护状态的值是多少')
        this.setState({
            stateValue:value
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
        // 查看照片
    Checkphoto(record,e){
        // console.log(record,'照片')
        this.imgData=record.images[0]
        // console.log( this.imgData,'imgData')
        this.setState({
          Modal:true,
        })
      }
      handleCancel(record,e){
        this.setState({
          Modal:false
        })
      }
    //   点击显示日志
      logClick(record) {
        this.setState({
            // showModalType:constants.RECTIFY_LOG,
            showModal: true,
            noticeLoading: true
        })
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
                            case 3015: entitys[2].children.push({title:"内部整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
                            case 3016: entitys[3].children.push({title:"内部提交整改", "time":d.gmtCreate, name:d.processorName, content: d.content});break;
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
    rectifySubmit(){

    }
    // 查看编码
    showRectifyPage(record) {
        this.setState({
            showModalType:1,
            showModal2: true,
            // selRecord: record,
            noticeLoading: true
        })

        postRectifyFindOne({rectificationId: record.rectificationId}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");})
        .then((data) => {
            if (data.code === 200) {
                
                this.setState({
                    selRecord: data.data,
                    noticeLoading: false
                })
                return data.data;
            }
            return Promise.reject(data.msg);
        })
        .catch((ex) => {
            message.error( ex ||  "服务器异常!",5);
        })}
        optionBtnClick(record, key, name) {
                    this.setState({
                        // showModalType:constants.RECTIFY_REPORT,
                        showModa2: true,
                        selRecord: record
      })}
    //   点击查看图片
    oriImgsClick(){
        this.setState({
            Modal5:true
        })}
        handleCancel5(){
            this.setState({
                Modal5:false,
                Modal:false
            })
        }
        clickShow(){
            this.setState({
                Modal5:false
            })
        }
    render() {
    //   const GiveAlarmList=this.props.giveAlarm
      const columns = [
        {title: '问题编号',dataIndex: 'rectificationSerial' ,width: "10%",render:(text, record, index) =>{
            return <a href="javascript:void(0)" onClick={this.showRectifyPage.bind(this, record)}>{text}</a>
        }},
        {title: '问题设施',dataIndex: 'conservancyName',width: "10%" ,align:'center',},
        {title: '报告时间',dataIndex: 'gmtModified',width: "10%" ,align:'center'},
        {title: '报告人',dataIndex: 'reporterName',width: "10%" ,align:'center'},
        {title: '问题点',dataIndex: 'targetName',width: "10%" ,align:'center'},
        {title: '问题内容',dataIndex: 'subTargetName',width: "10%" ,align:'center'},
        {title: '检查情况说明',dataIndex: 'rectificationReason',width: "10%" ,align:'center'},
        {title: '问题图片',dataIndex: 'images',width: "8%" ,align:'center', render: (text, record) => {
            return    <a href="javascript:;" onClick={() => this.Checkphoto(record)}>查看</a>
        }
            // <Button title="Sure to delete?" type="primary" onClick={() => this.Checkphoto(record)}>
            
            // </Button>
          },
        // {title: '问题照片',dataIndex: 'facilityInfoId5',width: "6%" ,align:'center'},
        // {title: '整改照片',dataIndex: 'images',width: "6%" ,align:'center'},
        {title: '整改状态',dataIndex: 'processStateName',width: "6%" ,align:'center'},
        {title: '资金额度',dataIndex: 'expenseMoney',width: "6%" ,align:'center'},
        {title: '日志', dataIndex: '', width: "10%", render:(text, record, index) => {
            return <a href="javascript:void(0)" onClick={this.logClick.bind(this, record)}>日志</a>
        }},
    ];
        const RangePicker = DatePicker.RangePicker
        const TabPane = Tabs.TabPane;
        // 报告人  tableData4
        let OptionsPersonList=null;
        if(this.state.personShowDataTable!=null && this.state.personShowDataTable.map!=null){
            OptionsPersonList = this.state.personShowDataTable.map((text) => {
                return <Option key={text.userId} value={text.userId} >{text.name}</Option>
             });

            OptionsPersonList.unshift(<Option key="null" value="">全部</Option>);
        }
        // 问题点
        let targetNameList=null;
        if(this.state.targetContentAll!=null && this.state.targetContentAll.map!=null){
            targetNameList = this.state.targetContentAll.map((text) => {
                return <Option key={text.targetId} value={text.targetId} >{text.targetName}</Option>
             });

             targetNameList.unshift(<Option key="null" value="">全部</Option>);
        }
        // 问题内容
        // allList= checkCoverBox.map((pane) => <TreeNode key={pane.targetId}  title={pane.targetName} value={pane.targetId} > 
        // {/* <span> {pane.targetName}</span> */}

        // {pane.list.map((pen) => <TreeNode onChange={this.clickChange.bind(this)} key={pen.contentId} title={pen.contentName} value={pen.contentId}> 
        //     {/* {pen.subTargetName} */}
            
        // </TreeNode>)}
        
        // </TreeNode>)






        let subTargetNameList=null;
        let BigsubTargetNameList=null;
        if(this.state.targetContentAll!=null && this.state.targetContentAll.map!=null){
            // subTargetNameList=   this.state.targetContentAll.map((pane) =><Option key="null" value="">全部</Option>



            subTargetNameList=this.state.targetContentAll.map((pane) => {
           console.log(pane,'pane')
        //    return pane
          return pane.list.map((pen)=>{
           return  <Option key={pen.contentId} value={pen.contentId} >{pen.contentName}</Option>
            })

                
             });

        }
        console.log(subTargetNameList,'subTargetNameList')
        // 水利设施
        let  OptionsList=null;
        if(this.state.tableData5 != null && this.state.tableData5 !=undefined){
            // console.log(this.state.tableData5,'hhhhhhhhhhh')
            OptionsList = this.state.tableData5.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
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
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                
            >  
                    {OptionsList}
       
              </Select>
         </Col>      
                  {/* 报告人 */}
                  <Col  xs={24} sm={12}  md={4}>
                <label htmlFor="">报告人</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange1.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
                  {OptionsPersonList}
            </Select>
         </Col>  
                    {/* 问题点 */}
          <Col  xs={24} sm={12}  md={4}>
             <label htmlFor="">问题点</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                    {targetNameList}               
            </Select>
            </Col>
            {/* 问题内容 */}
            <Col  xs={24} sm={12}  md={4}>
                <label htmlFor="">问题内容</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange3.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
                   {subTargetNameList}
            </Select>
         </Col>    
                   {/* 整改状态 */}
            <Col  xs={24} sm={12}  md={4}>
                <label htmlFor="">整改状态</label>
               <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange4.bind(this)}
                // onFocus={this.handleFocus.bind(this)}
                // onBlur={this.handleBlur.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {OptionsState}                
                 </Select>
            </Col>
            {/* <Col  xs={24} sm={12}  md={4}>
                <div className="rr">
                 <RangePicker
                 ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                 onChange={this.onChange.bind(this)} />
                 </div>
            </Col> */}
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
            <div className="count">
            水利整改列表
            </div>
            <div className="count_l">
            <Table columns={columns} dataSource={this.state.tableData4} size="middle" bordered={true}  />
            </div>
            {/* 详细照片 */}
            <Modal
                    title="详细照片"
                    visible={this.state.Modal5}
                    // onOk={this.AreYouOk.bind(this)}
                    onCancel={this.handleCancel5.bind(this)}
                    width={600}
                    bodyStyle={{width:'600px',height:'500px'}}
                    footer={null}
                    centered={true}
                  > 
                  <Button  type="primary" onClick={this.clickShow.bind(this)} > 后退</Button>
                  <div className="modal" >
                  <img src={"/api/"+ this.imgData} />
                  </div>                 
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
                    centered={true}
                  > 
                  <div className="modal" style={{height:'85px',width:'85px',}}>
                  <img className='ps-rect-img' src={"/api/"+ this.imgData} onClick={this.oriImgsClick.bind(this)} />
                  </div>                 
                </Modal>
                {/* 整改日志 */}
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
                    {/* 显示整改单 */}
                    <Modal
                    title="整改信息"
                    footer={false}
                    destroyOnClose
                    width={"80%"}
                    visible={this.state.showModal2}
                    onOk={() => { this.setState({showModal2: false})}}
                    onCancel={() => { this.setState({showModal2: false})}}>
                        <RectifyNotice loading={this.state.noticeLoading} showTools={false} entity={this.state.selRecord} optionBtnClick={this.optionBtnClick.bind(this)}></RectifyNotice>
                    </Modal>
        	</div>
            
        )
    }
    
    
}

export default HistoryRectify;