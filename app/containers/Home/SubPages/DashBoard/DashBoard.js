import React from 'react';
// import { bindActionCreators } from 'redux';
import { Row, Col,Button,Table,Steps ,Icon } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
import echarts from 'echarts';
// import "./DashBoard.css";
import './border.css'
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../../../actions/home.js';
import BaseMap  from '../DashBoard/BaseMap.js'

import {warning,alarmmessage,irrigation,inspectorList,eightList,rounds,warmingMessage,Queryrectification} from '../../../../data/dataStore.js' //引入url地址

// import Map from './SmallMap.js'
//  import Map from "./map/ubimap.js";
 const Step = Steps.Step;
class DashBoard extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            seconds:'',
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData8:[],
            inWaterLevelData:[],
            facilityNameData:[],
            allData:[],
            exchangeData:[],
            selectData: null, //点击数据
            // tableData10:[],
            // tableData9:[]

        };
        this.onPageResize = () => {
            if (this.chart) {
                this.chart.resize();
            }
        };
    }
        componentDidMount() {
            this.warmingMessage()
                this.alarmmessage()
                this.irrigation()
                this.roundsList()
                this.eightList()
                // this.scroll()
         
        }
        componentWillUnmount(){
            window.removeEventListener("resize", this.onPageResize);

        }
        // 报警
        async warmingMessage() {
                let data = await Queryrectification({}).then((res) =>{ return res.json();}).catch(ex => {});
                if (data && data.data ) {
                // data.data.forEach((item) => {
                //     item.key = item.deviceSerialNumber
                // })
               console.log(data.data,'待审批???????')
                this.setState({
                    loading: false,
                    tableData2:data.data.splice(0,3)
                })
            }}
        // 报警  
        async alarmmessage() {
            let data = await warmingMessage({relieveState:4401}).then((res) =>{ return res.json();}).catch(ex => {});
            if (data && data.data ) {
            // data.data.forEach((item) => {
            //     item.key = item.id
            // })
           console.log(data.data,'报警 具体的值是多少')
            this.setState({
                loading: false,
                tableData1:data.data.splice(0,3)
            })
        }}
        // 水利工况动态
        async irrigation() {
            let data = await irrigation({}).then((res) =>{ return res.json();}).catch(ex => {});
            if (data && data.data ) {
            // data.data.forEach((item) => {
            //     item.key = item.id
            // })

        //   outsideGateState
        let ap=data.data;
        let outsideWaterLevel=ap.map((item)=>{
            item.itemType = 3;// 用于弹出框判断
            return item.outsideWaterLevel
        })
        let insideWaterLevel=ap.map((itm)=>{
            return itm.insideWaterLevel
        })
        let facilityName=ap.map((gatepum)=>{
            return gatepum.facilityName
        })

        console.log(outsideWaterLevel,'outsideWaterLevel')
            this.setState({
                loading: false,
                tableData3:outsideWaterLevel.slice(0,12),
                inWaterLevelData:insideWaterLevel.slice(0,12),
                facilityNameData:facilityName.slice(0,12),
                allData:data.data
            })
    //         const myChartContainer = document.getElementById( 'main' );  
    //         const myChart = echarts.init( myChartContainer );
    //         this.chart=myChart;
    //         window.addEventListener("resize", this.onPageResize);
    //         myChart.setOption({
    //             title: { text: '' },
    //            tooltip: { trigger: 'axis',
    //            axisPointer: {
    //                type: 'cross',
    //                crossStyle: {
    //                    color: '#999'
    //                }
    //            }},
    //            legend: {
    //                data:['外河水位','内河水位','水差']
    //            },
    //            xAxis: [
    //                {
    //                    type: 'category',   
                     
    //                    data:this.state.facilityNameData,
   
    //                    axisPointer: {
    //                        type: 'shadow'
    //                    }
    //                }
    //            ], yAxis: [
    //                {
    //                    type: 'value',
    //                    name: '水量',
    //                    min: 0,
    //                    max: 6,
    //                    interval: 1,
    //                    axisLabel: {
    //                        formatter: '{value}m'
    //                    }
    //                },
    //            ],
    //            series: [
    //                {
    //                    name:'外河水位',
    //                    type:'bar',
    //                    barMaxWidth:10,
    //                    barCategoryGap:'10',
    //                    data:this.state.tableData3
    //                },
    //                {
    //                    name:'内河水位',
    //                    type:'bar',
    //                    barMaxWidth:10,
    //                    data:this.state.inWaterLevelData
    //                },
    //            ]
    //        });
         }
        
    }
    // 巡查动态
    async roundsList() {
        let data = await rounds({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
       console.log(data.data,'巡查动态的值是多少')
        this.setState({
            loading: false,
            tableData4:data.data.splice(0,3)
        })
    }

}
    // 总控台八个
    
    async eightList() {
        let data = await eightList({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
        var AlarmData=data.data.alarmItemCountList
        var everyAlarm=AlarmData.map((item)=>{
            return item
        })
        // 流转
        var exchange=data.data.circulationItemCount
        var everyExchange=exchange.map((itn)=>{
            return itn
        })
      console.log(data.data,'总控台八个的值是多少')
      console.log(everyAlarm,'everyAlarm')
      console.log(everyExchange,'everyExchange')
        this.setState({
            loading: false,
            tableData8:data.data,
            tableData9:everyAlarm,
            exchangeData:everyExchange
        })
        // 流转
        var myChart3 = echarts.init(document.getElementById('main3'));
        myChart3.setOption({
            tooltip : {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // color:['#bbe2e8','rgb(26,187,156)',],   

            color:['#bbe2e8','rgb(26,187,156)','rgb(247,247,247)','#B34D9E','#B34D9E','#B34D9E','#FF0000','#61B34D','#84A77A','pink'],   
            // legend: {
            //     orient: 'vertical',
            //      bottom: 10,
            //     x : 10,
            //     y : 100,
            //     //  data: ['西凉', '益州','兖州','荆州','幽州']
            // },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data:[
            
                        {value:this.state.exchangeData[0].number, name: this.state.exchangeData[0].name},
                        {value:this.state.exchangeData[1].number, name: this.state.exchangeData[1].name},
                        {value:this.state.exchangeData[2].number, name: this.state.exchangeData[2].name},
                        {value:this.state.exchangeData[3].number, name: this.state.exchangeData[3].name},
                        {value:this.state.exchangeData[4].number, name: this.state.exchangeData[4].name},
                        {value:this.state.exchangeData[5].number, name: this.state.exchangeData[5].name},
                        {value:this.state.exchangeData[6].number, name: this.state.exchangeData[6].name},
                        {value:this.state.exchangeData[7].number, name: this.state.exchangeData[7].name},
                        {value:this.state.exchangeData[8].number, name: this.state.exchangeData[8].name},
                        {value:this.state.exchangeData[9].number, name: this.state.exchangeData[9].name},

                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal : {
                            label : {
                              show : false
                            },
                            labelLine : {
                              show : false
                            }
                          },
                    }
                }
            ]
        })
        // 报警

        var myChart2 = echarts.init(document.getElementById('main2'));
        myChart2.setOption({
                 tooltip : {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     // top: 'middle',
                //      bottom: 10,
                //     // left: 'center',
                //     orient : 'vertical',
			    // 	x : 10,
			    // 	y : 100,
                //     // data: ['设备故障报警', '通讯故障报警','设施运行预警','设施报警',]
                //     // data:[this.state.tableData9[0].name]
                // },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:this.state.tableData9[0].number, name: this.state.tableData9[0].name},
                            {value:this.state.tableData9[1].number, name: this.state.tableData9[1].name},
                            {value:this.state.tableData9[2].number, name: this.state.tableData9[2].name},
                            {value:this.state.tableData8.facilityAlarmCount, name: '设施故障报警'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal : {
                                label : {
                                  show : false
                                },
                                labelLine : {
                                  show : false
                                }
                              },
                        }
                    }
                ]
            })

        // 設施
        var myChart1 = echarts.init(document.getElementById('main1'));
        myChart1.setOption({

            tooltip : {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:['#bbe2e8','rgb(26,187,156)',],   
            // legend: {
            //     orient: 'vertical',
            //     // top: 'middle',
            //      bottom: 10,
            //     // left: 'center',
            //     orient : 'vertical',
            //     x : 10,
            //     y : 100,
            //     data: ['已安装','未安装']
            // },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data:[
                        {value:this.state.tableData8.facilityWithDeviceCount,name:'已安装'},
                        {value:(this.state.tableData8.facilityCount-this.state.tableData8.facilityWithDeviceCount),name:'未安装'},
                        // {value:634, name: '益州'},
                        // {value:735, name: '西凉'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal : {
                            label : {
                              show : false
                            },
                            labelLine : {
                              show : false
                            }
                          },
                    }
                }
            ]
         })
    }}
    // 点击事件
    ShowMapClick(data) {
        this.setState({
            selectData: data
        })
    }
    render() {
            // 报警

            // const columns2=[
            //     {title: '水利设施',dataIndex: 'facilityName' ,width: "20%" ,align:'center'},
            //     {title: '内河(内/外)',dataIndex: '',width: "20%" ,align:'center',render:( text, record, index) =>{ 
            //         console.log(text,'text')
            //     }},
            //     {title: '闸位(内/外/节制)',dataIndex: 'reportName',width: "20%" ,align:'center'},
            //     {title: '水泵工况',dataIndex: 'reportName',width: "20%" ,align:'center'},

            // ]
            // const columns2 = [
            //     {title: '报警时间',dataIndex: 'gmtModified' ,width: "33%" ,align:'center',
            //     // render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
            // },
            //     {title: '报警设备',dataIndex: 'facilityName',width: "33%" ,align:'center'},
            //     // {title: '水利设施Id',dataIndex: 'facilityInfoId',width: "10%" ,align:'center'},
            //     // {title: '报警设备唯一标识',dataIndex: 'deviceSerialNumber',width: "15%" ,align:'center'},
              
            //     {title: '报警类型',dataIndex: 'alarmType',width: "34%" ,align:'center',render:alarmType =>{ 
            //         if(alarmType==4101){
            //           return '设备故障报警'
            //         } else if(alarmType==4102){
            //           return '通讯故障报警'
            //         } else if(alarmType==4103){
            //             return '设施运行报警'
            //           }
            //        }}];
            // 滚动条
            let everyTable;
            let everyData
            if(this.state.allData!=null && this.state.allData.map!=null){
                 everyTable=this.state.allData
            }
            everyData= everyTable.map((item)=> 
            
                    <div className='AllWater'>
                      <div className="everyWater">
                      <div className='water_one'>

                       <div className='water_two' key={item.facilityId}  onClick={ this.ShowMapClick.bind(this, item)}  > 
                        <a  href="javascript:void(0)">
                        {item.facilityName}
                        </a>
                       </div> 
                       <div className="time">{item.time} </div>
                      <div className="rive">
                       <div  className="nextOne"> 内河： {item.insideWaterLevel!=null ? item.insideWaterLevel.toFixed(2) : ' '}</div> 
                       <div className="nextTwo">外河： {item.outsideWaterLevel!=null ? item.outsideWaterLevel.toFixed(2) : ' '}</div>
                      </div>
                     {/* 闸 */}
                     <div className="gate">
                       <div className="nextOne"> 内闸： {item.insideGateState===3101 ? '开启' : (item.insideGateState===3102  ? '关闭' : ' ')}</div> 
                       <div className="nextTwo"> 外闸： {item.outsideGateState===3101 ? '开启' : (item.outsideGateState===3102 ? '关闭' : ' ')}</div> 
                     </div>
                        {/* <span> 节制闸： {item.checkGateState}</span> */}
                        <div className='pumpOne'>
                        <div className="pumpName">水泵：</div>
                        {
                         item.pumpList.map((itm,index)=>  <div className='content'>
                        <div className='Number'>{index+1}</div>
                        <div className={ itm.pumpState===3101 ? "Smallshixin" : 'red' } ></div>

                         <div >
                       {/* { itm.pumpState} */}
                        </div>

                         </div>
                         )
                          } 
                        
                        </div>
                      
                       </div>
                      </div>
                    </div>
            )
            // everyData= everyTable.map((item)=> 
            // <tr>
            // <td>{item.facilityName}</td> 
            // <td>{item.insideWaterLevel}/{item.outsideWaterLevel}</td>
            // <td>{item.insideGateState}/{item.outsideGateState}/{item.checkGateState}</td>
            // <td>{item.outsideWaterLevel}</td>
            // </tr>
            // )
            // 下面进度条 报警
            let oneStep   
            let onStepData
            if(this.state.tableData1!=null && this.state.tableData1.map!=null){
                oneStep=this.state.tableData1
           }
           onStepData=oneStep.map((psdh)=> 
            <div className="every">
            <span>
             <div className="item-facilityName">{psdh.alarmTypeName}</div>
              <div className="item-line">{psdh.facilityName}</div>
              <div className="item-line2">{psdh.gmtModified}</div>
           </span>
         </div>
        
          
        )
        // 下面巡查  tableData4
        let QueryStep   
        let QueryData
        if(this.state. tableData4!=null && this.state. tableData4.map!=null){
            QueryStep=this.state. tableData4
       }
       QueryData=QueryStep.map((ps)=> 
          <div className="every">
            <span>
            <div className="item-facilityName">{ps.facilityName}</div>
            <div className="item-line2">{ps.dateTime}</div>
            <div className="item-line">{ps.reportName}</div>
            <div className="item-line">{ps.targetName}</div>
            {/* <div className="item-line">{ps.targetStatus}</div> */}

        </span>
        </div>
        )
        // 待审批
        let WaterTable
        let WaterData
        if(this.state. tableData2!=null && this.state. tableData2.map!=null){
            WaterTable=this.state. tableData2
       }
       WaterData=WaterTable.map((item)=> 
          <div className="every">
            <span>
            <div className="item-facilityName">{item.conservancyName}</div>
            <div className="item-line">{item.rectificationSerial}</div>
            <div className="item-line2">{item.gmtModified}</div>
            <div className="item-line">{item.targetName}</div>
            {/* <div className="item-line">{item.processStep} </div> */}

        </span>
        </div>
        )
            return (
            <div className="General_control">
             {/* 图像 */}
            <div className="psdh">
            <Row>
            <div className="pt">
            <Col xs={12} sm={6} md={4} >
            <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}} onClick={this.reduxJumpClick.bind(this, "水利设施综合监控", "Inbound")}>
            <div className="line"></div>
            <div className="line-right">
                     <div className='NameText' >
                       <Icon type="bar-chart" />
                       设施总数
                       </div>
                       {/*  {value:this.state.tableData8.facilityWithDeviceCount,name:'已安装'},
                        {value:(this.state.tableData8.facilityCount-this.state.tableData8.facilityWithDeviceCount),name:'未安装'}, */}
                    <div className='Bigtext'>{this.state.tableData8.facilityCount}</div>
                    <div className="no">已安装 {this.state.tableData8.facilityWithDeviceCount} </div>
                    <div className="yes">未安装 {(this.state.tableData8.facilityCount-this.state.tableData8.facilityWithDeviceCount)}</div>
              </div>  
              </div>  

              <div className="bing">
              <div id="main1"  style={{ width: 140, height:140 }}></div>                          
              </div>
              </Col>
              <Col xs={12} sm={6} md={4} >
              <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}}  onClick={this.reduxJumpClick.bind(this, "报警信息", "WarningMessage")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="sound" />
                      报警</div>
                       <div className='Bigtext1' style={{color:'red',fontSize:'30px',textAlign:'center'}}>{this.state.tableData8.alarmCount}</div>
                       <div className="no"> 报警总数 {this.state.tableData8.facilityAlarmCount} </div>
                       <div className="yes">预警总数 {(this.state.tableData8.alarmCount-this.state.tableData8.facilityAlarmCount)} </div>
                </div>
              </div>  
              <div className="bing">
              <div id="main2"  style={{ width: 140, height: 140 }}></div>                          
              </div>
              </Col>
                {/* 12 */}
                <Col xs={12} sm={6} md={4} >
                <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}} onClick={this.reduxJumpClick.bind(this, "水利设施综合监控", "Inbound")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="exception" />
                      流转</div>
                       <div className='Bigtext'>{this.state.tableData8.circulationCount}</div>
                       {/* <div className="no">报警 {this.state.exchangeData[0].number} </div> */}
                       {/* <div className="yes">预警 {(this.state.tableData8.facilityCount-this.state.tableData8.facilityWithDeviceCount)}</div> */}
                </div>
              </div>  
              <div className="bing">
              <div id="main3"  style={{ width: 140, height:140 }}></div>                          
              </div>
              </Col>
              <Col xs={12} sm={6} md={2} >
              <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}}  onClick={this.reduxJumpClick.bind(this, "考勤查询", "HistoryCheck")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="table" />
                     考勤异常</div>
                       <div className='Bigtext1' style={{color:'red',fontSize:'30px',textAlign:'center'}}>{this.state.tableData8.attendanceCount}</div>
                </div>
              </div>  
              </Col>
                {/* 1111 */}
                <Col xs={12} sm={8} md={2} >

                <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}} onClick={this.reduxJumpClick.bind(this, "水利设施综合监控", "API")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="heart" />
                         关注
                    </div>
                       <div className='Bigtext'>{this.state.tableData8.favoriteCount}</div>
                </div>
              </div>  
              </Col>
                {/* 56 */}
                <Col xs={12} sm={8} md={2} >
                <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}} onClick={this.reduxJumpClick.bind(this, "监测点查询", "HistoryMonitor")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="environment" />
                      监测点</div>
                       <div className='Bigtext'>{this.state.tableData8.monitoringPointCount}</div>
                </div>
              </div>  
              </Col>
                    {/* 788 */}
                    <Col xs={12} sm={8} md={2} >
                    <div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}} onClick={this.reduxJumpClick.bind(this, "水利设施综合监控", "Inbound")}>
              <div className="line"></div>
                      <div className="line-right">
                      <div className='NameText' >
                      <Icon type="tool" />
                      维护中设备</div>
                       <div className='Bigtext'>{this.state.tableData8.maintainDeviceCount}</div>
                </div>
              </div>  
              </Col>
              {/* 898 */}
            </div>
            </Row>

            <Row>
               <div className="showPic">
               {/* <div className="title">水利工況动态</div> */}
               <div className="all">
               <div className="picture">
               <div className="map clearfix">
                    {/* 地图 */}
                   <div className="detail_title">
                   {/* <span>地图</span> */}
                    {/* <Button className='LT' onClick={this.reduxJumpClick.bind(this, "地图", "Monitor")} >
                     详情
                     </Button> */}
                   </div>
                    <BaseMap selectData={this.state.selectData} ></BaseMap>
                    </div>
                {/* <div id="main" style={{  height: 400 }}></div>      */}
                 </div>
                 {/* 水位滚动 */}
                 <div className="left-m" >

                 {/* <Table  className="table2"  columns={columns2} dataSource={this.state.tableData3} size="middle" pagination={false} scroll={{ x: true, y: 400 }}/> */}

                <div className="table">
                      {everyData}
                   {/* <table id='colee'>
                    <thead>
                        <tr>
                        <th>水利设施</th>
                        <th>内河(内/外)</th>
                        <th>闸位(内/外/节制)</th>
                         <th>水泵工况</th>
                        </tr>
                    </thead>
                    <tbody className='body' id='colee1'>
                       {everyData}
                    </tbody>
                    <div className="colee2"></div>
                 </table> */}
                   </div>
                 </div>
               </div>

               </div>
            </Row>
            </div>
             {/* <Row>
             <div className="buttom">
             <div className="pic_one">
             <div className="one">
               <div className="oneTe">最新报警</div>
               <div className="pic1"> {onStepData}</div>
              </div>
             </div>
             <div className="pic_two">
             <div className="one">
               <div className="oneTe">巡查动态</div>
               <div className="pic1"> {QueryData}</div>
              </div>
             </div>
                <div className="pic_three">
                <div className="one">
                <div className="tree">
                 <div className="oneTe">待审批</div>
                 <div className="pic1">{WaterData}</div>
                 </div>
                </div>
                </div>
                 </div>  
             </Row> */}
            </div>
        );
    }
    reduxJumpClick(title, key) {
        var text = {
            key: key,
            title: title
        };
        this.props.homeActions.addTab(text);
    }
   
}


// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        tabData: state.home.tabData,
        tabIndex: state.home.tabIndex,
        layout: state.home.layout
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);
// export default DashBoard;