import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table , Steps, Popover} from '../../../../../components/Antd.js';

import {Pagination, Modal, Form, Input, Tooltip, Icon, Cascader,Tree, Select,Steps, Popover, Row, Col, Checkbox, Button,DatePicker, AutoComplete ,Table,Upload,message,Menu,Layout,Breadcrumb,Tabs  } from '../../../../../components/Antd.js';
import {postDamTree, postRegionTree ,follow,baseInfo,warning,getDict,alarmmessage,monthCover,dayCover,inspectorList,reported,watreLevel,gongkuang} from '../../../../../data/dataStore.js';

import BaseSubPage from '../../BaseSubPage.js'

import FormUnit from '../../../SubPages/basic-data/Unit/FormUnit.js';
import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../../components/Cover/Cover.js';
import Map from '../../../SubPages/basic-data/Map/Map.js'
import Base from '../../Global/Base/Base.js' //水泵展示信息
import RegionTree from '../../Global/RegionTree.js' //树形组件
import BaseInfo from '../../Global/Base/BaseInfo.js'  //基础信息组件
import ActualTime from '../../Global/ActualTime/ActualTime.js' //实时组件

import EarlyWarning from '../../Global/Alarm/EarlyWarning .js'  //实时报警组件
import GiveAlarm from '../../Global/Alarm/GiveAlarm.js'  //智能预警组件
import ChechCover from '../../Global/Inspectors/CheckCover.js' // 覆盖巡查组件
import Reported from '../../Global/Inspectors/Reported.js'  //上报组件
import Video from '../../Global/Video/Video.js'   //视频组件
import WaterYi from '../../Global/Base/WaterYi.js'  //水位仪组件
import Floodgate from '../../Global/Base/Floodgate.js' // 闸门组件
import VideoShow from '../../Global/Base/VideoShow.js'  //视频组件
import DeviceList from '../../Global/ActualTime/DeviceList.js' //设备工况组件


import NetworkShow from '../../Global/Base/NetworkShow.js' //网络设备组件
import {cloneObj} from "../../../../../util/common.js"

import moment from 'moment';
import '../Map/style.css'
 const ButtonGroup = Button.Group;
 const Search = Input.Search;
 const Option = Select.Option;
// 全局提示
const TabPane = Tabs.TabPane;

// 树状图部分

class API extends BaseSubPage {  
  constructor(props){
    super(props);
    this.EwrlyOk=this.EwrlyOk.bind(this)
    this.DiaoGiveAlarm=this.DiaoGiveAlarm.bind(this)

    this.state={
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      loading: true,
      treeData: {},
      activeBtn: 1, //默认选中btn
      showModal: false,
      confirmLoading: false,
      tableData:[],
      BaseData:[],
      WaterData:[],
      WaterLevelData:[],
      Baojing:[],  //报警
      alarmType:null,
      deviceType:null,
      detePickerList:[]

    }
    this.cach = {}; //缓存 优化
  }
  componentDidMount() {
     super.componentDidMount();
     this.loadData();   //树形
     this.Base();  //基础部分默认
     this.alarm() //报警默认
     this.loadData2()  //类型
     this.psalarm() //预警默认
     this.CoverM() //月覆盖率默认
     this.Coverd() //日覆盖默认
     this.inspectors() //巡查默认
     this.report()  //问题上报默认
     this.watreLevel()  //实时工况
     this.gongk() //设备工况
}
componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener("resize", this.onresize);
}
// 点击获取值   e:{selected: bool, selectedNodes, node, event}
onSelect = (selectedKeys, info, node, event) => {
     this.list=selectedKeys[0];   //点击具体
     console.log( this.list,' this.list')

     this.Base()  //基础
      this.watreLevel() 
      this.alarm() //报警
      this.psalarm() //预警
      this.CoverM() //月覆盖率
      this.Coverd()  //日覆盖
      this.inspectors() //巡查
      this.report() //问题上报
      this.gongk()  //设备工况
      this.setState({
      })}
      // 点击关注事件
   attention(value,index){
    this.everyId=index;
    this.Base1()
    this.watreLevel1() 
    this.alarm1()
    this.psalarm1()
    this.CoverM1()
    this.Coverd1()  //日覆盖
    this.inspectors1() //巡查
    this.report1() //问题上报
    this.gongk1()  //设备工况
    //   console.log(value,'val')
    //   console.log(index,'index') //值
}
 async loadData2() {
    let statePromise = getDict(["alarm_type"]);  //报警类型
    let statePromise1=getDict(['device_type']);   //报警设备
    // let stateList= warmingMessage({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("报警信息接口出错");}).then((data) => {
    //     if (data.code === 200) {
    //         // console.log(data.data,'看看值是多少？？？')
    //         return data.data;
    //     }
    //     return Promise.reject(data.msg);
    // });
    let data = await Promise.all([ statePromise,statePromise1,]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
         let alarmType = data[0];
         let deviceType=data[1];
        this.setState({
             loading: false,
             alarmType: alarmType,
             deviceType:deviceType,
            
        })
    }else{
        this.setState({
            loading: false
        })
        message.error( data ||  "服务器异常!",5);
    }}
//  报警信息
async alarm() {
    let alarmParam={
        facilityInfoId:this.list ? this.list : 1,
        gmtCreateStart: this.state.starttime,
        gmtCreateEnd:this.state.endTime,
        alarmType:this.state.alarmStyle,   //入参不确定
        deviceType:this.state.deviceStyle,  //入参不确定
        relieveState:4401
    }
    let data = await warning(alarmParam).then((res) =>{ return res.json();}).catch(ex => {});
    if (data && data.data ) {
        data.data.forEach((item) => {
            item.key = item.id
        })
        this.setState({
            loading: false,
            Baojing:data.data
        })}}

// 关注
async alarm1() {
    let alarmParam={
        facilityInfoId:this.everyId,
        gmtCreateStart: this.state.starttime,
        gmtCreateEnd:this.state.endTime,
        alarmType:this.state.alarmStyle,   //入参不确定
        deviceType:this.state.deviceStyle,  //入参不确定
        relieveState:4401
    }
    let data = await warning(alarmParam).then((res) =>{ return res.json();}).catch(ex => {});
    if (data && data.data ) {
        data.data.forEach((item) => {
            item.key = item.id
        })
        this.setState({
            loading: false,
            Baojing:data.data
        })}} 
// 设施基础信息
 async Base() {
     let at
    let param={
         id : this.list ? this.list : 1
    }
    let data = await baseInfo(param).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code===200) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
        //   console.log(data.data,'基础信息是多少')
        this.setState({
             BaseData:data.data
        })}}
    //关注部分
    async Base1() {
        let at
       let param={
            id : this.everyId
       }
       let data = await baseInfo(param).then((res) =>{ return res.json();}).catch(ex => {});
       if (data.code===200) {
           // data.data.forEach((item) => {
           //     item.key = item.id
        //    // })
        //      console.log(data.data,'基础信息是多少')
           this.setState({
                BaseData:data.data
           })}}    
   async loadData() {
    let damTreePromise = postDamTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("控制区树接口出错");}).then((data) => {
        if (data.code === 200) {
            // console.log(data.data,'控制区信息')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    let regionTreePromise = postRegionTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("行政区树接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'行政区信息')
            return data.data;
        }
        return Promise.reject(data.msg);
    });
    // 关注
    let followList = follow().then((res) =>{ return res.ok ? res.json() : Promise.reject("关注接口出错");}).then((data) => {
        if (data.code === 200) {
            //  console.log(data.data,'关注信息')
            this.setState({
                loading: false,
                tableData:data.data,
            })
            return data.data;
        }
    });
    
    let data = await Promise.all([ damTreePromise, regionTreePromise,followList ]).then((data) => {
        return data;
    }).catch(ex => { return ex;})
    if (Array.isArray(data) && data.length ) {
        let damTreeData = [data[0]];
        let regionTreeData = [data[1]];

        this.setState({
            loading: false,
            treeData: {damTreeData, regionTreeData}
        })
        this.treeData = {damTreeData, regionTreeData};//记录一下 用于搜索
    }else{
        this.setState({
            loading: false
        });
        message.error(data ||  "服务器异常!",5);
    }
}
  callbackl(){
    
  }
  onbtnClick(key, e) {
    this.setState({
        activeBtn: key
    })
}
// 搜索点击事件
onChange(selectedRowKeys, selectedRows) {
    // console.log("onChange11111",selectedRowKeys, selectedRows );
    this.setState({
        checkedRowData:selectedRows
    });
}
rowClassName(record, index ) {
    var selData = this.state.tableSelData;
    if (selData && selData.key === record.key) {
        return "row-highlight";
    }else{
        return "";
    }
}
filterData(data, keywords) {
    if (!Array.isArray(data)) return;
    return data.filter((item) => {
        let flag = false;
        if (item.title.indexOf(keywords) > -1) {
            flag = true;
        }else{
            flag = false;
        }
        if (item.children && item.children.length) {
            item.children = this.filterData(item.children, keywords);
            if (item.children.length) {
                flag = true;
            }
        }
        return flag;
    })
}
  throttle(method, delay) {
    var timer=null;
    return function(...args) {
        // var context = this, args = arguments;
        let value = args[0].target.value;
        window.clearTimeout(timer);
        timer = window.setTimeout(()=> {
            method.apply(this, [value]);
        }, delay);
    };
}
// 搜索
searchChange(value) {
    if (!this.treeData || !this.treeData.damTreeData || !this.treeData.regionTreeData) return;
    let damData = this.treeData.damTreeData;
    let regionTree = this.treeData.regionTreeData;
    this.setState({
        treeData: {
            damTreeData: this.filterData(cloneObj(damData), value),
            regionTreeData: this.filterData(cloneObj(regionTree), value)
        }
    })
    
}
  onCheck = (checkedKeys, info) => {
    // console.log('onCheck245', checkedKeys, info);
    this.list=checkedKeys;   //点击按钮选择
  }
handlerTreeNode(node) {
  if (!Array.isArray(node)) return;
  var treeNodes = [];
  for (var i = 0; i < node.length; i++) {
      var n = node[i];
      var treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} ></Tree.TreeNode>;
      if (n.children && n.children.length) {
          var nodes = this.handlerTreeNode(n.children);
          treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n}>{nodes}</Tree.TreeNode>;
      }
      treeNodes.push(treeNode);
  }
  return treeNodes;
}

// 报警类型
handleChange1(value) {
this.setState({
    alarmStyle:value
})
  }
  //设备类型
  handleChange(value) {
    // console.log(value)
    this.setState({
        deviceStyle:value.key
    })
  }

//   时间时间
 onChange(dates, dateStrings) {
    this.setState({
        starttime:dateStrings[0]+" "+'00:00:00',
        endTime:dateStrings[1]+" "+'23:59:59'
    })
  }
  
  // 报警查询事件
  AlarmSearch(){
    this.alarm()  //
  }
   // 预警 时间组件
   warmChange(dates, dateStrings) {
    this.setState({
        start:dateStrings[0]+" "+'00:00:00',
        end:dateStrings[1]+" "+'23:59:59'
    })
  }
//   预警查询
warmingSearch(){
    this.psalarm()  //查询预警信息
}
    async psalarm() {
        let psparam={
            facilityInfoId:this.list ? this.list : 1,
            gmtCreateStart:this.state.start,
            gmtCreateEnd:this.state.end
        }
        let data = await alarmmessage(psparam).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            data.data.forEach((item) => {
                item.key = item.id
            })
            this.setState({
                loading: false,
                psalarmData:data.data
            })}}
    // 关注
    async psalarm1() {
        let psparam={
            facilityInfoId:this.everyId,
            gmtCreateStart:this.state.start,
            gmtCreateEnd:this.state.end
        }
        let data = await alarmmessage(psparam).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            data.data.forEach((item) => {
                item.key = item.id
            })
            this.setState({
                loading: false,
                psalarmData:data.data
            })}}
    // 巡查 月覆盖
    async CoverM() {
        let date=new Date;
        let year=date.getFullYear(); 
        let month=date.getMonth()+1;
        // console.log(year,'year')
        let CoverMParam={
            // facilityInfoId:this.list,
            facilityInfoId : this.list ? this.list : 1,
            year:year,
            month:month
        }
        let data = await monthCover(CoverMParam).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code===200 ) {
        this.setState({
            loading: false,
            CoverMData:data.data.coverageRate
        })}}
        // 关注
        async CoverM1() {
            let date=new Date;
            let year=date.getFullYear(); 
            let month=date.getMonth()+1;
            // console.log(year,'year')
            let CoverMParam={
                // facilityInfoId:this.list,
                facilityInfoId : this.everyId,
                year:year,
                month:month
            }
            let data = await monthCover(CoverMParam).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code===200 ) {
            this.setState({
                loading: false,
                CoverMData:data.data.coverageRate
            })}}
            // 关注
            async Coverd1() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                var nowDate = year + "-" + month + "-" + day+" "+hour+':'+minute+":"+second;
                let CoverdParam={
                    // facilityInfoId:this.list,
                    facilityInfoId : this.everyId,
                    inspectionDate:'2018-10-11 12:17:55'
                }
                    let data = await dayCover(CoverdParam).then((res) =>{ return res.json();}).catch(ex => {});
                    if (data.code===200 ) {
                    this.setState({
                        loading: false,
                        CoverdData:data.data.coverageRate
                    })} }
            // 巡查日覆盖
            async Coverd() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                var nowDate = year + "-" + month + "-" + day+" "+hour+':'+minute+":"+second;
                let CoverdParam={
                    // facilityInfoId:this.list,
                    facilityInfoId : this.list ? this.list : 1,
                    inspectionDate:'2018-10-11 12:17:55'
                }
                    let data = await dayCover(CoverdParam).then((res) =>{ return res.json();}).catch(ex => {});
                    if (data.code===200 ) {
                    this.setState({
                        loading: false,
                        CoverdData:data.data.coverageRate
                    })} }
                  //巡查  详细展示// 
             async inspectors() {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    if (month < 10) {
                        month = "0" + month;
                    }
                    if (day < 10) {
                        day = "0" + day;
                    }
                    let nowDate = year + "-" + month + "-" + day+" "+hour+':'+minute+":"+second;
                    let inspectorsParam={
                        facilityInfoId : this.list ? this.list : 1,
                        insTime:'2018-10-30 12:17:55'
                      }
                    let data = await inspectorList(inspectorsParam).then((res) =>{ return res.json();}).catch(ex => {});
                    if (data.code===200 ) {
                        // console.log(data.data,'返回的所有')
                         var tableDate3=data.data.targetRecordList;  
                        //  console.log(tableDate3,'tableDate3')
                        var tt=tableDate3.map((item,index)=>{
                            return item   //六个中的每一个
                        })   
                        var xx=tableDate3.map((item,index)=>{
                            return item.subTargetRecordList;   //六个中的每一个
                        })
                        // console.log(xx,'xx')
                     this.setState({
                         loading: false,
                         inspectorsData:tt,     
                }) } }
        // 关注
        async inspectors1() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            let nowDate = year + "-" + month + "-" + day+" "+hour+':'+minute+":"+second;
            let inspectorsParam={
                facilityInfoId : this.everyId,
                insTime:'2018-10-30 12:17:55'
              }
            let data = await inspectorList(inspectorsParam).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code===200 ) {
                // console.log(data.data,'返回的所有')
                 var tableDate3=data.data.targetRecordList;  
                //  console.log(tableDate3,'tableDate3')
                var tt=tableDate3.map((item,index)=>{
                    return item   //六个中的每一个
                })   
                var xx=tableDate3.map((item,index)=>{
                    return item.subTargetRecordList;   //六个中的每一个
                })
                // console.log(xx,'xx')
             this.setState({
                 loading: false,
                 inspectorsData:tt,     
        }) } }
          //  问题上报
          ChangeReported(dates, dateStrings) {
            this.setState({
                Reportstart:dateStrings[0]+" "+'00:00:00',
                Reportend:dateStrings[1]+" "+'23:59:59'
            })
          } 
        //   问题上报查询
          RequestSearch(){
             this.report()
          }
        //   关注
        async report1() {
            let  reportParam={
              conservancyId : this.everyId,
              gmtCreateStart:this.state.Reportstart,
              gmtCreateEnd:this.state.Reportend
            }
          let data = await reported(reportParam).then((res) =>{ return res.json();}).catch(ex => {});
          if (data.code===200 ) {
              data.data.forEach((item) => {
                  item.key = item.rectificationId
              })
              //  console.log(data.data,'测试问题上报的值是多少')
              this.setState({
                  loading: false,
                  ReportData:data.data
              })}}
          async report() {
              let  reportParam={
                conservancyId : this.list ? this.list : 1,
                gmtCreateStart:this.state.Reportstart,
                gmtCreateEnd:this.state.Reportend
              }
            let data = await reported(reportParam).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code===200 ) {
                data.data.forEach((item) => {
                    item.key = item.rectificationId
                })
                //  console.log(data.data,'测试问题上报的值是多少')
                this.setState({
                    loading: false,
                    ReportData:data.data
                })}}
      // 实时水位
     async watreLevel() {
        let Waterparam={
            facilityInfoId : this.list ? this.list : 1,
            gmtCreateStart:this.state.waterstart,
        }
        let data = await watreLevel(Waterparam).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            //  console.log(data.data,'测试的水位仪值是多少????????')
            this.setState({
                loading: false,
                WaterLevelData:data.data
            })}}
    // 关注
    async watreLevel1() {
        let Waterparam={
            facilityInfoId:this.everyId 
        }
        let data = await watreLevel(Waterparam).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            //  console.log(data.data,'测试的水位仪值是多少????????')
            this.setState({
                loading: false,
                WaterLevelData:data.data
            })}}
    // 实时水位 查询
    waterSearch(){
        this.watreLevel()
    }
    //  实时水位 时间改变
    WaterChange(dates, dateStrings){
        // console.log(dates,dateStrings,'dateStrings试一下')

        this.setState({
            waterstart:dateStrings+" "+'00:00:00',
        })
     }
     // 实时工况 查询
     deviceSearch(){
        this.gongk()
    }
    // 工况时间选择
    GongkuangChange(dates, dateStrings){
        // console.log(dates,dateStrings,'dateStrings试一下')
        this.setState({
            gongTime:dateStrings+" "+'00:00:00',
        })
    }
    // 设备工况
    async gongk() {
        let gongParam={
            facilityInfoId: this.list ? this.list : 1,
            gmtCreateStart:this.state.gongTime,
        }
    let data = await gongkuang(gongParam).then((res) =>{ return res.json();}).catch(ex => {});   //facilityInfoId
    if (data.code===200 ) {
        //   console.log(data.data,'工况具体的值')   
        let  table=data.data.monitoringAllDeviceVO
        // var arr = []
        // for (let i in table) {
        //     let o ={};
        //     o[i] = table[i];
        //     arr.push(o)
        // }
        //  console.log(arr,'arr');
        //  var obj = Object.assign(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12],arr[13],arr[14],arr[15],arr[16])
        // var tabl2=[obj]
        // console.log(table,'table')
        this.setState({
            loading: false,
            detePickerList:table,
        })}}
        // 关注
        async gongk1() {
            let gongParam={
                facilityInfoId: this.everyId,
                gmtCreateStart:this.state.gongTime,
            }
        let data = await gongkuang(gongParam).then((res) =>{ return res.json();}).catch(ex => {});   //facilityInfoId
        if (data.code===200 ) {
            //   console.log(data.data,'工况具体的值')   
            let  table=data.data.monitoringAllDeviceVO
            // var arr = []
            // for (let i in table) {
            //     let o ={};
            //     o[i] = table[i];
            //     arr.push(o)
            // }
            //  console.log(arr,'arr');
            //  var obj = Object.assign(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12],arr[13],arr[14],arr[15],arr[16])
            // var tabl2=[obj]
            // console.log(table,'table')
            this.setState({
                loading: false,
                detePickerList:table,
            })}}
            // 调用方法
            EwrlyOk(e){
                this.alarm()  //  
            }
            DiaoGiveAlarm(e){
                this.psalarm()
            }

            // 
            handlerTableFns() {
                let offset = 250;
                this.setState({
                    tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
                });
                // let table = this.refs.table;
                // let tableDom = ReactDOM.findDOMNode(table);
                // let tableBodyDom = tableDom.getElementsByClassName("ant-table-body")[0];
                // tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
                this.onresize = () => {
                    this.setState({
                        tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
                    });
                    // tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
                }
                window.addEventListener("resize",this.onresize);
            }
       render() {   
        //    console.log(window.innerHeight,'屏幕')
         //    报警设备
         let TypeOptions = null;
         if (this.state.deviceType && this.state.deviceType.device_type) {
             if (this.cach["device_type"]) {
                 TypeOptions = this.cach["device_type"]
             }else{
                 TypeOptions = this.state.deviceType.device_type.map(({text, value}) => {
                     return <Option key={value} value={value}>{text}</Option>
                 });
                 TypeOptions.unshift(<Option key="null" value="">全部</Option>);
                 this.cach["device_type"] = TypeOptions;
             }
         } 
        // 报警类型
        let stateOptions = null;
        if (this.state.alarmType && this.state.alarmType.alarm_type) {
            if (this.cach["alarm_type"]) {
                stateOptions = this.cach["alarm_type"]
            }else{
                stateOptions = this.state.alarmType.alarm_type.map(({text, value}) => {
                    return <Option key={value} value={value}>{text}</Option>
                });
                stateOptions.unshift(<Option key="null" value="">全部</Option>);
                this.cach["alarm_type"] = stateOptions;
            }
        }
        let userMessage;
        let userMes;
        // 树组件
        const RangePicker = DatePicker.RangePicker
        if(this.state.activeBtn ===1){
            userMessage=(
                <Tree checkable
                defaultExpandAll={true}
                checkStrictly={true}
                onSelect={this.onSelect.bind(this)}
                onCheck={this.onCheck.bind(this)}                                     
                >
                {this.handlerTreeNode(
            this.state.treeData && this.state.treeData.damTreeData
                    )}
            </Tree>
            )
        } else if(this.state.activeBtn ===2){
            userMessage=(
                <Tree checkable
                defaultExpandAll={true}
                checkStrictly={true}
                onSelect={this.onSelect.bind(this)}
                onCheck={this.onCheck.bind(this)}                                     
                >
                {this.handlerTreeNode(
                this.state.treeData && this.state.treeData.regionTreeData
                    )}
             </Tree>
             )
        } else if(this.state.activeBtn ===3){
            userMes=(
        <div>
           {
          this.state.tableData.map((val,index)=> {
          return (
          <div className="guanzu" >
            <Button  key={val.id}    onClick={(value) => this.attention(value,val.id)}   >{val.facilityInfoName}</Button>
         {/* <div className="text1"></div> */}
            </div>
        )})}
      </div>
            )
        }
      return (
      <div className='vk-subpage'>
       <div className="box" >
     {/* 左边的盒子 */}
     <div className="left">                    
        <div className="zf-tree-search-cont">
        <ButtonGroup style={{width:"100%"}}>
        <Button type="default" style={{width: "33%"}} className={this.state.activeBtn === 1 ? "active": ""} onClick={this.onbtnClick.bind(this, 1)}> 控制区结</Button>
        <Button type="default" style={{width: "33%"}} className={this.state.activeBtn === 2 ? "active": ""} onClick={this.onbtnClick.bind(this, 2)}>行政区结构 </Button>
        <Button type="default" style={{width: "33%"}} className={this.state.activeBtn === 3 ? "active": ""} onClick={this.onbtnClick.bind(this, 3)}>关注</Button>
       </ButtonGroup>
        <Search className="ps-tree-search" placeholder="模糊查找" style={{ width: "100%"}} onChange={this.throttle(this.searchChange, 300).bind(this)}/>
                {userMessage}
                {userMes}
        </div>
     </div>
       {/* 右边 的盒子 */}
       <div className="right">
       {/* 右上的盒子 */}
       <div className="r-top">
        <Tabs defaultActiveKey="1" onChange={this.callbackl.bind(this)}>
        <TabPane tab="基本信息"  key="1">
        {/* 设施基础资料部分 */}
          <div className="r">
          <BaseInfo baseId={this.state.BaseData}></BaseInfo>
          </div>
          {/* 设备资料部分 */}
          <div className="b">
          <div className='zf-one'>设备基础资料</div>
          <Tabs defaultActiveKey="1" onChange={this.callbackl.bind(this)}>
            <TabPane tab="水泵信息" key="1">
            <Base BaseList={this.state.BaseData}></Base>
            </TabPane>
            <TabPane tab="水位仪信息" key="2"> 
            <WaterYi WaterWeiYi={this.state.BaseData} ></WaterYi>
            </TabPane>
            <TabPane tab="闸门" key="3">
            <Floodgate floodgate={this.state.BaseData}></Floodgate>
            </TabPane>
            <TabPane tab="视频设备" key="4">
            <VideoShow videoShow={this.state.BaseData}></VideoShow>
            </TabPane>
            <TabPane tab="网络设备" key="5">
            <NetworkShow netWork={this.state.BaseData}></NetworkShow>
            </TabPane>
            </Tabs> 
           </div>
        </TabPane>
        {/* 实时工况部分 */}
        <TabPane tab="实时工况"  key="2">
        <div className="gongk">
        <div className="actual-t-t">
          <div className="one">水位实时信息(单位：米)</div>
          <div className="two">
          <Button type="primary" icon="search"  onClick={this.waterSearch.bind(this)}>查询</Button>
          </div>
          <div className="three">
          <DatePicker onChange={this.WaterChange.bind(this)} />
          </div>
        </div>
        <ActualTime actualTime={this.state.WaterLevelData}  ></ActualTime>
        </div>
        {/* 设备工况信息 */}
        <div className="shebei">
        <div className="actual-t-t">
          <div className="one">设备工况信息</div>
          <div className="two">
          <Button type="primary" icon="search"  onClick={this.deviceSearch.bind(this)}>查询</Button>
          </div>
          <div className="three">
          <DatePicker onChange={this.GongkuangChange.bind(this)} />
          </div>
          </div>
          <DeviceList DetePickerData={this.state.detePickerList}   ></DeviceList>
        </div>
        </TabPane>
        {/* 报警信息 */}
        <TabPane tab="报警信息"     key="3">
        <div className="alaem-t">
        <div className="warm_nav">
         {/* 报警信息标题 类型  时间 */}
            <div className="alarm_title">
            <div className="l">
            <span>实时报警信息</span>
            </div>
            {/* 中间 */}
          <div className="m">
          <label htmlFor="">设备类型</label>
            <Select showSearch style={{ width: 200 }} optionFilterProp="children"  onChange={this.handleChange.bind(this)} labelInValue={true} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {TypeOptions}
            </Select>
            {/* 类型部分 */}
            <label htmlFor="">报警类型</label>
            <Select showSearch style={{ width: 200 }} optionFilterProp="children" onChange={this.handleChange1.bind(this)}filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {stateOptions}
            </Select>
          
          </div>
          {/* 右边 */}
          <div className="rr">
          <RangePicker  ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.onChange.bind(this)}/>
          </div>
            {/* 查询按钮 */}
            <Button type="primary" icon="search"  onClick={this.AlarmSearch.bind(this)}>查询</Button>
            </div>
        </div>
      
        <EarlyWarning earlyWarning={this.state.Baojing}   EwrlyOk={this.EwrlyOk.bind(this)}    ></EarlyWarning>
        </div>
        <div className="alarm-b">
          {/* 预警 */}
          <div className="alarm-title">
            <div className="l">
            智能预警信息
            </div>
         {/* 查询按钮 */}
            <div className="btn-l">
            <Button type="primary" icon="search"  onClick={this.warmingSearch.bind(this)}>查询</Button>
            </div>
          {/* 右边 */}
          <div className="time-r">
          <RangePicker ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.warmChange.bind(this)}/>
          </div>
        </div>
        <GiveAlarm giveAlarm={this.state.psalarmData}  DiaoGiveAlarm={this.DiaoGiveAlarm.bind(this)}></GiveAlarm>
        </div>
        </TabPane>
        {/* 巡查信息 */}
        <TabPane tab="巡查信息" key="4">
        {/* 巡查覆盖查询 */}
        <div className="inspectors-t">
        <ChechCover checkBox={this.state.CoverMData} day={this.state.CoverdData} detailCheck={this.state.inspectorsData}></ChechCover>
        </div>
        {/* 问题上报 */}
        <div className="inspectors-b">
        <div className="problem_report">
        <div className="One">
            问题上报
        </div>   
         {/* 查询按钮 */}
         <div className="btn">
          <Button type="primary" icon="search"  onClick={this.RequestSearch.bind(this)}>查询</Button>
          </div>       
        <div className="Two">
        <RangePicker  ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }} onChange={this.ChangeReported.bind(this)}/>
        </div>
        </div>
        <Reported ReportDetail={this.state.ReportData}></Reported>
        </div>
        </TabPane>
        <TabPane tab="视频信息" key="5">
          <Video></Video>
        </TabPane>
        {/* <TabPane tab="调水信息"     key="6">Content of Tab Pane 3</TabPane> */}
          {/* */}
      </Tabs>,
       </div>
       {/* 右下的盒子 */}
       
       </div>
       </div>
      </div>
      )
    } }


    const WrappedApp = Form.create()(API );
    export default WrappedApp;
    