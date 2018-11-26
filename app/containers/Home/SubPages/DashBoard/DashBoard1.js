import React from 'react';
// import { bindActionCreators } from 'redux';
import { Row, Col,Button,Table  } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
import echarts from 'echarts';
import "./style.css";
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../../../actions/home.js';

import {warning,alarmmessage,irrigation,inspectorList,eightList,rounds,warmingMessage} from '../../../../data/dataStore.js' //引入url地址

// import Map from './SmallMap.js'
//  import Map from "./map/ubimap.js";
 import BaseMap  from '../DashBoard/BaseMap.js'

class DashBoard extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            seconds:'',
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData8:[]

        };
    }
    ticking=()=> {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            var l = ["日","一","二","三","四","五","六"];
            var d = new Date().getDay();
            var str = "星期" + l[d];
            var dayList=year+'年'+month+'月'+day+'日 '+str+ hour+':'+minute+':'+second;
            this.setState({
            seconds:dayList
           })
    }
    componentDidMount(){
        this.interval = setInterval(()=>this.ticking(),1000)
        this.warmingMessage()
        this.alarmmessage()
        this.irrigation()
        this.roundsList()
        this.eightList()
        }
        component(){

        }
        // 报警
        async warmingMessage() {
                let data = await warmingMessage({relieveState:4401}).then((res) =>{ return res.json();}).catch(ex => {});
                if (data && data.data ) {
                // data.data.forEach((item) => {
                //     item.key = item.deviceSerialNumber
                // })
            //   console.log(data.data,'报警的值是多少???????')
                this.setState({
                    loading: false,
                    tableData2:data.data
                })
            }
    
        }
        // 预警
        async alarmmessage() {
            let data = await alarmmessage({relieveState:4401}).then((res) =>{ return res.json();}).catch(ex => {});
            if (data && data.data ) {
            // data.data.forEach((item) => {
            //     item.key = item.id
            // })
        //   console.log(data.data,'预警的值是多少')
            this.setState({
                loading: false,
                tableData1:data.data
            })
        }

    }
        // 水利工况动态
        async irrigation() {
            let data = await irrigation({}).then((res) =>{ return res.json();}).catch(ex => {});
            if (data && data.data ) {
            // data.data.forEach((item) => {
            //     item.key = item.id
            // })
        //   console.log(data.data,'水利工况动态的值是多少')
            this.setState({
                loading: false,
                tableData3:data.data
            })
        }

    }
    // 巡查动态
    async roundsList() {
        let data = await rounds({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
    //   console.log(data.data,'巡查动态的值是多少')
        this.setState({
            loading: false,
            tableData4:data.data
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
    //   console.log(data.data,'总控台八个的值是多少')
        this.setState({
            loading: false,
            tableData8:data.data
        })
    }

}
    render() {
            // 报警
          const columns2 = [
            {title: '报警时间',dataIndex: 'gmtModified' ,width: "33%" ,align:'center',
            // render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
            {title: '报警设备',dataIndex: 'facilityName',width: "33%" ,align:'center'},
            // {title: '水利设施Id',dataIndex: 'facilityInfoId',width: "10%" ,align:'center'},
            // {title: '报警设备唯一标识',dataIndex: 'deviceSerialNumber',width: "15%" ,align:'center'},
          
            {title: '报警类型',dataIndex: 'alarmType',width: "34%" ,align:'center',render:alarmType =>{ 
                if(alarmType==4101){
                  return '设备故障报警'
                } else if(alarmType==4102){
                  return '通讯故障报警'
                } else if(alarmType==4103){
                    return '设施运行报警'
                  }
               },},
        ];
        // 预警
        // const columns2 = [
        //     {title: '预警时间',dataIndex: 'gmtCreate' ,width: "33%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        //     {title: '预警设备',dataIndex: 'gmtModified',width: "33%" ,align:'center'},
        //     {title: '预警类型',dataIndex: 'alarmType',width: "34%" ,align:'center',render:alarmType =>{ 
        //         if(alarmType==4101){
        //           return '设备故障报警'
        //         } else if(alarmType==4102){
        //           return '通讯故障报警'
        //         } else if(alarmType==4103){
        //             return '设施运行报警'
        //           }
        //        }}];
            //    工况
            const columns3 = [
                {title: '上报时间',dataIndex: 'time' ,width: "25%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
                {title: '水利设施',dataIndex: 'facilityName',width: "25%" ,align:'center'},
                {title: '内河水位',dataIndex: 'insideWaterLevel',width: "25%" ,align:'center'},
                {title: '外河水位',dataIndex: 'outsideWaterLevel',width: "25%" ,align:'center'},
                //  {title: '内闸',dataIndex: 'alarmType',width: "33%" ,align:'center'},
                // {title: '外闸',dataIndex: 'alarmType',width: "33%" ,align:'center'},
            
            ];
            const columns4= [
                {title: '更新时间',dataIndex: 'dateTime',width: "20%" ,align:'center',
                // render: gmtModified => <span>{moment(gmtModified).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
                {title: '报告人员',dataIndex: 'reportName',width: "20%" ,align:'center'},
                {title: '水利设施',dataIndex: 'facilityName' ,width: "20%" ,align:'center'},
                {title: '巡查内容',dataIndex: 'targetName',width: "20%" ,align:'center'},
                {title: '状态',dataIndex: 'targetStatus',width: "20%" ,align:'center',render:isAbnormal =>{ 
                if(isAbnormal==1){
                  return '异常'
               } 
               },},
            
            ];
        return (
            
            <div className="General_control">
              <Row>
                 {/* 左边部分 */}
                 <Col span={6}>
                 <div className="left">
                 {/* 时间 天气预报 */}
                 <div className="left-t">
                 <div className="day">
                 <img src={require('../../../Home/SubPages/DashBoard/img/time.png')} />
                 <span id="demo">{this.state.seconds}</span>  
                 </div>
                 <div className="weath">
                 {<iframe width="420" style={{border:0,width:"100%",height:180,padding:'30px',margin:'0 auto',}}  src="http://i.tianqi.com/index.php?c=code&id=12&icon=1&num=5"></iframe>}
                 </div>
                <div className="detail">  
                    <Row type="flex" justify="space-around">
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.alarmChartDiv = node}}>
                    <Button onClick={this.reduxJumpClick.bind(this, "水利设施综合监控", "Inbound")}>
                    <div>设施</div>
                    <div>{this.state.tableData8.facilityCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.evidenceChartDiv = node}}>
                    <Button onClick={this.reduxJumpClick.bind(this, "报警信息", "WarningMessage")}>
                    <div>报警</div>
                    <div>{this.state.tableData8.alarmCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.openCloseChartDiv = node}}>
                    <Button>
                     <div>流转</div>
                    <div>{this.state.tableData8.circulationCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.attendanceChartDiv = node}}>
                    <Button > 
                    <div>关注</div>
                    <div>{this.state.tableData8.favoriteCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.waterZChartDiv = node}}>
                    <Button onClick={this.reduxJumpClick.bind(this, "监测点查询", "HistoryMonitor")}>
                    <div>监测点</div>
                    <div>{this.state.tableData8.monitoringPointCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.waterQChartDiv = node}}>
                    <Button>
                    <div>维护中设备</div>
                    <div>{this.state.tableData8.maintainDeviceCount}</div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.ssScrollChartDiv = node}}>
                    <Button>
                     {/* <div>累计审批资金</div> */}
                     <div>
                     {/* {this.state.tableData8.approveCount} */}
                     </div>
                    </Button>
                    </div></Col>
                    <Col xs={6}><div className="zf-btn" ref={(node) => {this.ssDetailChartDiv = node}}>
                    <Button onClick={this.reduxJumpClick.bind(this, "考勤查询", "HistoryCheck")} > 
                    <div>考勤异常</div>
                    <div>{this.state.tableData8.attendanceCount}</div>
                    </Button>
                    </div></Col>
                </Row>
                 </div> 
                 </div>
                 {/* 报警部分 */}
                 <div className="left-m">
                 <div className="nav-title">
                 <span className="title">最新报警</span>
                  <Button onClick={this.reduxJumpClick.bind(this, "报警信息", "WarningMessage")} > 详情</Button>
                 </div>
              <Table className="table2" columns={columns2} dataSource={this.state.tableData2} size="middle"  pagination={false} scroll={{ x: true, y: 350 }}/>
                 </div>
                 {/* 下面部分 */}
                <div className="left-b"></div>
                 </div>
                 </Col>
                 {/* 右边部分 */}
                 <Col span={18}>
                 <div className="right">
                 <div className="right-top">
                    <div className="map clearfix">
                    {/* 地图 */}
                   <div className="detail_title">
                   {/* <span>地图</span> */}
                    <Button className='LT' onClick={this.reduxJumpClick.bind(this, "地图", "Monitor")} > 详情</Button>
                   </div>
                    <BaseMap></BaseMap>
                    </div>
                <div className="sport">
                <div className="title_t">
                    <span className="title">水利工况动态</span>
                    <Button onClick={this.reduxJumpClick.bind(this, "水利设施监控", "Inbound")}> 详情</Button>
                 </div>
                    <Table  className="table2"  columns={columns3} dataSource={this.state.tableData3} size="middle" pagination={false} scroll={{ x: true, y: 400 }}/>
                </div>
                 </div>
                 {/* 下面巡查动态 */}
                 <div className="right-bottom">
                <div className="tt">
                <span className='title1'>巡查动态</span>
                 <Button onClick={this.reduxJumpClick.bind(this, "水利整改", "WaterConservancyRectify")}> 整改详情</Button></div>
                 <Table  className="table4" size="middle" dataSource={this.state.tableData4} columns={columns4} pagination={false} scroll={{ x: true, y: 270 }} />
                 </div>
                 </div>
                 </Col>
             </Row>
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