import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../actions/home.js';
import HomeHeader from '../../components/HomeHeader/index.js';
import {loginOut} from '../../actions/userAction.js';
import './style.css';
// import Tree from '../../components/Tree/Tree.js'
import AntTree from '../../components/Tree/AntTree.js';
import Scroll from '../../components/Scroll/Scroll.js';
import Operator from './SubPages/Operator/Operator.js'; //操作员
import Role from './SubPages/Role/Role.js'; //角色
import Resource from './SubPages/Resource/Resource.js'; //资源
import Group from './SubPages/Group/Group.js'; //组

import UserManage from './SubPages/UserManage/UserManage.js';  //用户管理
import UnitManage from './SubPages/UnitManage/UnitManage.js';  //单位管理
import PersonnelManage from './SubPages/PersonnelManage/PersonnelManage.js';  //人员管理
import VideoMonitor from './SubPages/VideoMonitor/VideoMonitor.js';  //人员管理
import Authority from './SubPages/Authority/Authority.js' //资源权限

import Inbound from './SubPages/Inbound/Inbound.js';
import Organization from './SubPages/Organization/Organization.js';
import MapApi from './SubPages/MapApi/MapApi.js';
import DashBoard from './SubPages/DashBoard/DashBoard.js';
import Monitor from './SubPages/Monitor/Monitor.js';
import DeviceRunRecord from './SubPages/DeviceRunRecord/DeviceRunRecord.js';
import Video from './SubPages/Video/Video.js';
import WaterConservancyRectify from './SubPages/WaterConservancyRectify/WaterConservancyRectify.js';
import DailyPatrolRecord from './SubPages/DailyPatrolRecord/DailyPatrolRecord.js';
import FacilitiesMaintenanceSummary from './SubPages/FacilitiesMaintenanceSummary/FacilitiesMaintenanceSummary.js';
import FacilitiesMaintenanceRecord from './SubPages/FacilitiesMaintenanceRecord/FacilitiesMaintenanceRecord.js';
import GreenConservationMonth from './SubPages/GreenConservationMonth/GreenConservationMonth.js';
import GreenConservationRecord from './SubPages/GreenConservationRecord/GreenConservationRecord.js';
import AlternatorRunRecord from './SubPages/AlternatorRunRecord/AlternatorRunRecord.js';
import PumpGateRunRecord from './SubPages/PumpGateRunRecord/PumpGateRunRecord.js';
import FacilitiesMgrChangeWork from './SubPages/FacilitiesMgrChangeWork/FacilitiesMgrChangeWork.js';
import ShipPassDetail from './SubPages/ShipPassDetail/ShipPassDetail.js';
import HealthDutyRecord from './SubPages/HealthDutyRecord/HealthDutyRecord.js';
import WaterTransferRecord from './SubPages/WaterTransferRecord/WaterTransferRecord.js';
import WaterTransferImage from './SubPages/WaterTransferImage/WaterTransferImage.js';
import FloodPreventionHouse from './SubPages/FloodPreventionHouse/FloodPreventionHouse.js';
import FloodPreventionMaterial from './SubPages/FloodPreventionMaterial/FloodPreventionMaterial.js';

// import { hashHistory } from 'react-router';
import PropTypes from 'prop-types'
import { Tabs, message} from '../../components/Antd.js';

import Irrigation from '../Home/SubPages/basic-data/Irrigation/Irrigation.js'; //水利设施基础信息
import WaterLevel from '../Home/SubPages/basic-data/WaterLevel/WaterLevel.js'; //水位信息
import GatePosition from '../Home/SubPages/basic-data/GatePosition/GatePosition.js';  //闸位仪
import ElectricMeter from '../Home/SubPages/basic-data/ElectricMeter/ElectricMeter.js'; //电量仪管理
import WaterPump from '../Home/SubPages/basic-data/WaterPump/WaterPump.js'; //水泵设置管理
import SluiceGate from '../Home/SubPages/basic-data/SluiceGate/SluiceGate.js'; //闸门管理

import NetworkSettings from '../Home/SubPages/basic-data/NetworkSettings/NetworkSettings.js'; //网络设置管理
import Rive from '../Home/SubPages/basic-data/Rive/Rive.js'; //河流管理
import PolderArea from '../Home/SubPages/basic-data/PolderArea/PolderArea.js'; //圩区管理

import FloodPrevention from '../Home/SubPages/basic-data/FloodPrevention/FloodPrevention.js'; //防汛设施管理

import Unit from '../Home/SubPages/basic-data/Unit/Unit.js'; //单位管理

import Map from '../Home/SubPages/basic-data/Map/Map.js'; // 地图管理

import API from '../Home/SubPages/basic-data/Map/API.js'; // 地图管理

import WarningMessage from '../Home/SubPages/basic-data/WarningMessage/WarningMessage.js';  //报警信息

import HistoryAlarm from '../Home/SubPages/HistorySearch/HistoryAlarm/HistoryAlarm.js'; //历史报警查询
import HistoryWaterLevel from '../Home/SubPages/HistorySearch/HistoryWaterLevel/HistoryWaterLevel.js';  //历史水位查询
import HistoryMode from  '../Home/SubPages/HistorySearch/HistoryMode/HistoryMode.js' //历史工况
import HistoryRectify from '../Home/SubPages/HistorySearch/HistoryRectify/HistoryRectify.js'; //历史整改查询
import HistoryCheck from '../Home/SubPages/HistorySearch/HistoryCheck/HistoryCheck.js'; //历史考勤查询
import HistoryMonitor from '../Home/SubPages/HistorySearch/HistoryMonitor/HistoryMonitor.js'; //历史监测点查询
import gradeListQuery from '../Home/SubPages/InspectionBinding/gradeListQuery/gradeListQuery.js'; //排班查询

import InspectionTarget from '../Home/SubPages/InspectionBinding/InspectionTarget/InspectionTarget.js'; //水利设施绑定目标
import InspectionUser from '../Home/SubPages/InspectionBinding/InspectionUser/InspectionUser.js';  //水利设施绑定人员
import gradeList from '../Home/SubPages/InspectionBinding/gradeList/gradeList.js';  //排班绑定


import { postLogout } from '../../data/dataStore.js';


const TabPane = Tabs.TabPane;
const Pages = {
    gradeListQuery:gradeListQuery, //排班查询
    WarningMessage:WarningMessage,  //报警信息
    HistoryAlarm:HistoryAlarm, //历史报警查询
    HistoryWaterLevel:HistoryWaterLevel, //历史水位查询
    HistoryMode:HistoryMode,  //历史工况
    HistoryRectify:HistoryRectify, //历史整改查询
    HistoryCheck:HistoryCheck, //历史考勤查询
    HistoryMonitor:HistoryMonitor, //历史监测点查询

    InspectionTarget:InspectionTarget, //水利设施绑定目标
    InspectionUser:InspectionUser, //水利设施绑定人员
    gradeList:gradeList,  //绑定
    Operator: Operator,
    Role: Role,
    Resource: Resource,
    Group: Group,
    Inbound: Inbound,
    Organization: Organization,
    MapApi: MapApi,
    DashBoard: DashBoard,
    Monitor: Monitor,//地图
    DeviceRunRecord: DeviceRunRecord,
    Video: Video,
    Authority:Authority, //资源权限
    VideoMonitor: VideoMonitor,
    WaterConservancyRectify: WaterConservancyRectify,
    DailyPatrolRecord: DailyPatrolRecord,
    FacilitiesMaintenanceSummary: FacilitiesMaintenanceSummary,
    FacilitiesMaintenanceRecord: FacilitiesMaintenanceRecord,
    GreenConservationMonth: GreenConservationMonth,
    GreenConservationRecord: GreenConservationRecord,
    AlternatorRunRecord: AlternatorRunRecord,
    PumpGateRunRecord: PumpGateRunRecord,
    FacilitiesMgrChangeWork: FacilitiesMgrChangeWork,
    ShipPassDetail: ShipPassDetail,
    HealthDutyRecord: HealthDutyRecord,
    WaterTransferRecord: WaterTransferRecord,
    WaterTransferImage: WaterTransferImage,
    FloodPreventionHouse: FloodPreventionHouse,
    FloodPreventionMaterial: FloodPreventionMaterial,
    Irrigation:Irrigation, // 水利设施基础信息
    WaterLevel:WaterLevel,  //水位信息
    GatePosition:GatePosition,  //闸位仪
    ElectricMeter:ElectricMeter,  //电量仪管理
    WaterPump:WaterPump, //水泵设置管理
    SluiceGate:SluiceGate,  //闸门管理
    NetworkSettings:NetworkSettings,  //网络设置管理
    Rive:Rive,  //河流管理
    PolderArea:PolderArea, //圩区管理
    FloodPrevention:FloodPrevention,  //防汛设施管理
    Unit:Unit, //单位管理
    Map:Map, //地图管理
    UserManage:UserManage,  //用户管理
    UnitManage:UnitManage,  //单位管理
    PersonnelManage:PersonnelManage,  //人员管理
    API:API,
    WarningMessage:WarningMessage,  //报警信息
    
};
// let consolelog = function(text){
//     return (target,name, descriptor) =>{
//         console.log(target,name, descriptor);
//         let fn = descriptor.value;
//         descriptor.value = function(){
//             let value = fn.apply(this, arguments);
//             console.log(text);
//         }
//         return descriptor;
//     }
// }
// let consolelog1 = function(target,name, descriptor){

//     console.log(target,name, descriptor);
//     let fn = descriptor.value;
//     descriptor.value = function(){
//         let value = fn.apply(this, arguments);
//         console.log("finish");
//     }
//     return descriptor;
// }
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // console.log(123);
        
    }
    render() {
        let activeKey = this.props.tabData && this.props.tabData.length ? this.props.tabData[this.props.tabIndex].key : "";
        let tab = <Tabs hideAdd
            onChange={this.onChange.bind(this)}
            activeKey={activeKey}
            type="editable-card"
            onEdit={this.onEdit.bind(this)} >
            {this.props.tabData.map((pane) => <TabPane tab={pane.title} key={pane.key} closable={pane.key!=="DashBoard"}>{this.createSubPage(pane.key, pane)}</TabPane>)}
        </Tabs>;
        return (
            <div ref="homeWrap" className="vk-home-wrap">
                <HomeHeader userinfo={this.props.userinfo} itemClick={this.headerItemClick.bind(this)} />
                <div ref="tree" className="vk-tree-cont" style={{width: this.props.layout ? "64px" : "250px"}}>
                    <Scroll>
                       <div className="vk-tree" >
                            <AntTree  inlineCollapsed={this.props.layout} itemClick={this.treeItemClick.bind(this)}/>
                        </div>
                    </Scroll>
                    
                </div>
                <div ref="cont" className="vk-wrapper-cont" style={{paddingLeft: this.props.layout ? "64px" : "250px"}}>
                    <div className="vk-cont">
                        {
                            this.props.tabData && this.props.tabData.length ? tab : null
                        }
                    </div>
                </div>
            </div>
        );
    }
    // @consolelog("调用完成")
    componentDidMount() {
        console.log("cdm");
        if (!this.props.userinfo.id) {
            // hashHistory.push('/login');
        }
        this.showFisrtTabView();
    }

    componentWillUnmount() {
        message.destroy();
        // window.removeEventListener("resize", this.onresize);
    }
    componentDidCatch(a, b) {
        console.log(a, b);
        // this.props.homeActions.reset();
    }
    showFisrtTabView() {
        var text = {
            key: "DashBoard",
            title: "总控台"
        };
        this.props.homeActions.addTab(text);
    }
    createSubPage(key, props) {
        var Com = Pages[key];
        if (Com) {
            return <Com {...props} keyName={key} userinfo={this.props.userinfo} layout={this.props.layout} isActive={this.props.tabData[this.props.tabIndex].key === key}/>;
        }
    }
    onChange(activeKey) {
        this.props.homeActions.activeTab(activeKey);
    }
    onEdit(targetKey, action) {
        if (action === "remove") {
            this.props.homeActions.removeTab(targetKey);
        }
    }
    treeItemClick(item, key, keyPath) {
        var text = {
            key: key,
            title: item.props.children
        };
        this.props.homeActions.addTab(text);
    }
    headerItemClick(key) {
        console.log(key);
        switch (key) {
            case "func":
                this.props.homeActions.callLayout(!this.props.layout);
                break;
            case "poweroff":
                postLogout({}).then(res => {
                    return res.json()
                }).catch( ex => {
                    console.log(ex)
                });;
                this.props.userActions.loginOut();
                this.context.router.push('/login');
                break;
            case "conservancy":
                var text = {
                    key: "WaterConservancyRectify",
                    title: "水利整改"
                };
                this.props.homeActions.addTab(text);
            case "war-monitor":
                this.context.router.push('/monitor');
                break;
            default: break;
        }
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
};

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
        homeActions: bindActionCreators(homeActions, dispatch),
        userActions: bindActionCreators({loginOut}, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);