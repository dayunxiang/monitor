import { postData,postFormData, postJSONData } from "../util/common.js";
let dict  = {};
//  查询数据字典
export function postDict(data) {
    return postData("/typeDictionary/getByCategorys", data);
}
export async function getDict(keys) {
    if (!Array.isArray(keys)) {
        keys = [keys];
    }
    let nullKey = [], returnData = {};
    keys.forEach((key) => {
        if (dict[key] != null) {
            returnData[key] = dict[key];
        }else{
            nullKey.push(key);
        }
    });
    if (nullKey.length) {
        let data = await postDict({categorys: nullKey}).then((res) => {return res.ok ? res.json() : Promise.reject("字典接口出错");}).then((data) => { 
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });

        dict = {...dict, ...data};
        return {...data,...returnData};
    }else{
        return returnData;
    }
}
//  登录接口
export function postLogin(data) {
    return postData("/login", data);
}
//  登出接口
export function postLogout() {
    return postData("/logout");
}
// 行政区列表
export function postRegionList() {
    return postData("/region/findRegion");
}
// 行政区添加
export function postRegionAdd(data) {
    return postJSONData("/region/addRegion", data);
}
// 行政区修改
export function postRegionModify(data) {
    return postJSONData("/region/updateRegion", data);
}
// 行政区删除
export function postRegionRemove(data) {
    return postData("/region/deleteRegionById", data);
}
// 行政区导入
export function importRegion(data) {
    return postFormData("/region/import", data);
}
//  河流列表
export function postRiver(data) {
    return postData("/river/findRiverByCondition", data);
}
//  添加河流
export function addRiver(data) {
    return postJSONData("/river/addRiver", data);
}
//  修改河流
export function modifyRiver(data) {
    return postJSONData("/river/updateRiver", data);
}
//  删除河流
export function removeRiver(data) {
    return postData("/river/deleteRiverById", data);
}
//  导入河流
export function importRiver(data) {
    return postFormData("/river/import", data);
}
// 月覆盖
export function monthCover(data){
    return postJSONData("/facilityUnite/inspection/monthRate",data);
}
// 日覆盖
export function dayCover(data){
    return postJSONData("/facilityUnite/inspection/dayRate",data);
}
// 巡查记录
export function inspectorList(data){
    return postJSONData("/facilityUnite/inspection/record",data);
}
// 问题上报  
export function reported(data){
    
    return postJSONData("/facilityUnite/inspection/rectification",data);
}
// 基本信息设施基础资料
export function baseInfo(data){
    return postJSONData("/facilityUnite/baseInfo/getFacility",data)
}
// 预警信息
export function alarmmessage(data){
    return postJSONData("/facilityUnite/alarm/getFacilityAlarm",data)
}
// 报警信息
export function warning (data){
    return postJSONData("/facilityUnite/alarm/getDeviceAlarm",data)
}
// 水位实时信息
export function watreLevel (data){
    return postData("/facilityUnite/monitoring/queryWaterLevelMonitor",data)
}
// 设备工况信息

// export function gongkuang (data){
//     return postData("/facilityUnite/monitoring/queryGateMonitoring",data)
// }

// 设备工况信息
export function gongkuang (data){
    return postData("/facilityUnite/monitoring/queryAllDevice",data)
}

// 权限组管理展示List
export function powerList (data){
    return postJSONData("/group/list",data)
}

//  权限组管理新增
export function powerAdd(data){
    return postData("/group/add",data)
}

// 权限组新增设备类型接口
export function powerAddList(data){
    return postJSONData("/group/resources/query",data)
}

//  权限组管理修改
export function powerEdit(data){
    return postData("/group/edit",data)
}

//  权限组管理删除
export function powerDelete(data){
    return postData("/group/delete",data)
}

// 功能权限展示list
export function FunctionList (data){
    return postData("/role/list",data)
}
// 功能权限新增
export function FunctionAdd(data){
    return postData("/role/add",data)
}
// 功能权限删除
export function FunctionDelete(data){
    return postData("/role/delete",data)
}
// 功能权限修改
export function FunctionEdit(data){
    return postData("/role/edit",data)
}

// 功能新增设备类型接口
export function FunctionAddList(data){
    return postData("/role/resources/query",data)
}

// 用户管理展示
export function userShow(data){
    return postData("/user/list",data)
}

// 用户新增
export function userAdd(data){
    return postData("/user/add",data)
}
// 用户修改
export function userEdit(data){
    return postData("/user/update",data)   //接口未写
}
// 用户删除
export function userdelete(data){
    return postData("/user/remove",data)  
}

// 关联人员
// export function relevancePerson(data){
//     return postData("/user/remove",data)  
// }

// 公司新增
export function companyAdd(data){
    return postData("/company/add",data)  
}
// 公司删除
export function companyDelet(data){
    return postData("/company/delete",data)  
}
// 公司修改
export function companyEdit(data){
    return postData("/company/update",data)  
}
// 公司展示
export function relevanUnit(data){
    return postData("/company/query",data)  
}
// 人员管理展示
export function personShow(data){
    return postData("/personnel/query",data)  
}
// 人员管理添加
export function personEdit(data){
    return postData("/personnel/update",data)  
}
// 人员管理删除
export function personDelete(data){
    return postData("/personnel/deleteByPersonnelId",data)  
}

// 关注
export function follow(data){
    return postData("/monitoring/favourite",data)  
}
// {this.handlerTreeNode(
//     (this.state.activeBtn ===1) ? (this.state.treeData && this.state.treeData.damTreeData) : ((this.state.activeBtn ===2) ?(this.state.treeData && this.state.treeData.regionTreeData) : (this.state.treeData && this.state.treeData.followList))
//     )}


// 水利设施监控
export function irrigation(data){
    return postData("/facilityUnite/monitoring/queryAllFacilityWater",data)  
}

// 水利设施圩区
export function control(data){
    return postData("/facilityUnite/monitoring/queryAllFacilityDeviceByDamDomainIds",data)  
}

// 总控台八个点

export function eightList(data){
    return postJSONData("/facilityUnite/monitoring/queryAllCount",data)  
}
//  水位仪列表
export function postWaterLevel(data) {
    return postJSONData("/waterLevel/findByList", data);
}
//  添加水位仪
export function addWaterLevel(data) {
    return postJSONData("/waterLevel/insert", data);
}
//  修改水位仪
export function modifyWaterLevel(data) {
    return postJSONData("/waterLevel/update", data);
}
//  删除水位仪
export function removeWaterLevel(data) {
    return postData("/waterLevel/deleteById", data);
}
//  闸位仪列表
export function postGatePosition(data) {
    return postJSONData("/gateOpening/findByList", data);
}
//  添加闸位仪
export function addGatePosition(data) {
    return postJSONData("/gateOpening/insert", data);
}
//  修改闸位仪
export function modifyGatePosition(data) {
    return postJSONData("/gateOpening/update", data);
}
//  删除闸位仪
export function removeGatePosition(data) {
    return postData("/gateOpening/deleteById", data);
}
//  电量仪列表
export function postElectricMeter(data) {
    return postJSONData("/electricity/findByPage", data);
}
//  添加电量仪
export function addElectricMeter(data) {
    return postJSONData("/electricity/insert", data);
}
//  修改电量仪
export function modifyElectricMeter(data) {
    return postJSONData("/electricity/update", data);
}
//  删除电量仪
export function removeElectricMeter(data) {
    return postData("/electricity/deleteById", data);
}
//  圩区列表
export function postPolderArea(data) {
    return postJSONData("/damDomain/findDamByCondition", data);
}
//  添加圩区
export function addPolderArea(data) {
    return postJSONData("/damDomain/addDam", data);
}
//  修改圩区
export function modifyPolderArea(data) {
    return postJSONData("/damDomain/updateDam", data);
}
//  删除圩区
export function removePolderArea(data) {
    return postData("/damDomain/deleteDamById", data);
}
//  导入圩区
export function importPolderArea(data) {
    return postFormData("/damDomain/import", data);
}
//  网络设备列表
export function postNetwork(data) {
    return postJSONData("/network/listNetwork", data);
}
//  添加网络设备
export function addNetwork(data) {
    return postJSONData("/network/add", data);
}
//  修改网络设备
export function modifyNetwork(data) {
    return postJSONData("/network/update", data);
}
//  删除网络设备
export function removeNetwork(data) {
    return postData("/network/deleteNetworkById", data);
}
//  水泵列表
export function postWaterPump(data) {
    return postJSONData("/pump/listPump", data);
}
//  添加水泵
export function addWaterPump(data) {
    return postJSONData("/pump/add", data);
}
//  修改水泵
export function modifyWaterPump(data) {
    return postJSONData("/pump/update", data);
}
//  删除水泵
export function removeWaterPump(data) {
    return postData("/pump/deletePumpById", data);
}
//  闸门列表
export function postWaterGate(data) {
    return postJSONData("/gate/listGate", data);
}
//  添加闸门
export function addWaterGate(data) {
    return postJSONData("/gate/add", data);
}
//  修改闸门
export function modifyWaterGate(data) {
    return postJSONData("/gate/update", data);
}
//  删除闸门
export function removeWaterGate(data) {
    return postData("/gate/deleteById", data);
}
//  摄像头列表
export function postCamera(data) {
    return postJSONData("/camera/list", data);
}
//  添加摄像头
export function addCamera(data) {
    return postJSONData("/camera/add", data);
}
//  修改摄像头
export function modifyCamera(data) {
    return postJSONData("/camera/update", data);
}
//  删除摄像头
export function removeCamera(data) {
    return postJSONData("/camera/delete", data);
}
//  水利设施列表
export function postIrrigation(data) {
    return postJSONData("/conservancy/list", data);
}
//  水利设施列表(基本字典信息)
export function postIrrigationBasic(data) {
    return postJSONData("/conservancy/list/basic", data);
}
//  删除水利设施
export function getOneIrrigation(data) {
    return postJSONData("/conservancy/find/detail", data);
}
//  添加水利设施
export function addIrrigation(data) {
    return postJSONData("/conservancy/addTest", data);
}
//  修改水利设施
export function modifyIrrigation(data) {
    return postJSONData("/conservancy/update", data);
}
//  删除水利设施
export function removeIrrigation(data) {
    return postJSONData("/conservancy/delete", data);
}
//  控制区树
export function postDamTree(data) {
    return postData("/monitoring/damTree", data);
}
//  行政区树
export function postRegionTree(data) {
    return postData("/monitoring/regionTree", data);
}
//  区域视频树
export function postRegionCameraTree(data) {
    return postData("/monitoring/damCameraTree", data);
}
//  水利设施动态信息
export function postConservancyDyn(data) {
    return postJSONData("/conservancy/findByListForMapNew", data);
}
//  水利设施动态信息
export function postConservancyDynBasic(data) {
    return postJSONData("/conservancy/findByListForMapBasic", data);
}

// 人员动态信息
export function postPersonDyn(data) {
    return postData("/personnel/personnelPos", data);
}
//  巡查员动态信息
export function  rounds  (data) {
    return postJSONData("/inspection/getInspDynamic", data);
}
// 报警信息
export function warmingMessage(data) {
    return postData("/facilityUnite/alarm/getAllFacilityAndDeviceAlarm", data);
}


//  根据水利设施查询水位仪动态信息
export function postFacWaterDyn(data) {
    return postData("/monitoring/water", data);
}
//  根据水利设施查询电量仪动态信息
export function postFacEleDyn(data) {
    return postData("/monitoring/electricity", data);
}
//  根据水利设施查询闸位仪动态信息
export function postFacGateDyn(data) {
    return postData("/monitoring/gate", data);
}
//  根据水利设施查询泵动态信息
export function postFacPumpDyn(data) {
    return postData("/monitoring/pump", data);
}
//  根据水利设施查询视频动态信息
export function postFacVideoDyn(data) {
    return postData("/monitoring/cream", data);
}
//  根据水利设施查询网络设备动态信息
export function postFacNetworkDyn(data) {
    return postData("/monitoring/network", data);
}

//  整改列表
export function postRectifyList(data) {
    return postJSONData("/inspect/list/rectification", data);
}
//  内部整改
export function postInRectify(data) {
    return postData("/inspect/start/rectification/inner", data);
}
//  整改汇报
export function postRectifyReport(data) {
    return postJSONData("/inspect/report/rectification", data);
}
//  整改复核
export function postRectifyReview(data) {
    return postJSONData("/inspect/review/rectification", data);
}
//  整改
export function postRectifySend(data) {
    return postJSONData("/inspect/init/rectification", data);
}
//  开始整改
export function postRectifyStart(data) {
    return postFormData("/inspect/start/rectification", data);
}
//  提交整改
export function postRectifyCommit(data) {
    return postFormData("/inspect/commit/rectification", data);
}
//  内部提交整改
export function postRectifyInCommit(data) {
    return postFormData("/inspect/commit/rectification/inner", data);
}
//  确认整改
export function postRectifySure(data) {
    return postJSONData("/inspect/confirm/rectification", data);
}
//  完成整改
export function postRectifyComplete(data) {
    return postJSONData("/inspect/complete/rectification", data);
}
//  内部完成整改
export function postRectifyInComplete(data) {
    return postJSONData("/inspect/complete/rectification", data);
}
//  整改撤销
export function postRectifyCancel(data) {
    return postJSONData("/inspect/cancel/rectification", data);
}
//  整改驳回
export function postRectifyReject(data) {
    return postFormData("/inspect/reject/rectification", data);
}
//  内部驳回
export function postRectifyInReject(data) {
    return postFormData("/inspect/reject/rectification/inner", data);
}
//  获取单个问题
export function postRectifyFindOne(data) {
    return postJSONData("/inspect/find/rectification/status", data);
}
//  整改日志
export function postRectifyLog(data) {
    return postJSONData("/inspect/find/rectification/detail", data);
}
//  日常巡查记录
export function dailyPatrol(data) {
    return postJSONData("/inspection/inspRecordQuery", data);
}
//  日常巡查记录导出
export function dailyPatrolExport(data) {
    return postJSONData("/inspection/inspRecordExport", data);
}
//  设施养护汇总
export function postFaMaintainSum(data) {
    return postJSONData("/conservancyMaintenance/getConMainList", data);
}
//  设施养护汇总导出
export function postFaMaintainSumExport(data) {
    return postJSONData("/conservancyMaintenance/exportConMain", data);
}

// 报警信息开始维护
export function warmingMe(data) {
    return postFormData("/process/start", data);
}
// 待维护的接口
export function readyy(data) {
    return postData("/process/query", data);
}
// 递交报告
export function present(data) {
    return postFormData("/process/commit", data);
}
// 查询报告接口
// export function query(data) {
//     return postFormData("/process/query", data);
// }

// 确认接口

export function end(data) {
    return postFormData("/process/end", data);
}
// 删除报警
export function removeWaring(data) {
    return postData("/process/relieve", data);
}
// 删除预警
export function removeYujing(data) {
    return postData("/process/cancel", data);
}
//  设施养护记录
export function postFaMaintainRecord(data) {
    return postJSONData("/conservancyMaintenance/listConMainImage", data);
}

//  绿化养护月报
export function postGreenReport(data) {
    return postJSONData("/greenMain/getGreenRecordList", data);
}
//  绿化养护月报添加
export function addGreenReport(data) {
    return postJSONData("/greenMain/addGreenRecordList", data);
}
//  绿化养护月报导出
export function postGreenReportExport(data) {
    return postJSONData("/greenMain/exportGreenRecord", data);
}
//  绿化养护记录
export function postGreenReportImg(data) {
    return postJSONData("/greenMain/getGreenTotalRecordList", data);
}
//  绿化养护记录添加
export function addGreenReportImg(data) {
    return postFormData("/greenMain/addGreenTotalRecord", data);
}
//  绿化养护记录
export function exportGreenReportImg(data) {
    return postJSONData("/greenMain/greenTotalRecordExport", data);
}
//  绿化养护字典
export function postGreenReportDict(data) {
    return postJSONData("/greenMain/getGreenDictionary", data);
}
//  柴油发电机运行记录
export function postAlternatorRunRecord(data) {
    return postJSONData("/dynamotor/getRecordList", data);
}
//  柴油发电机运行记录新增
export function addAlternatorRunRecord(data) {
    return postJSONData("/dynamotor/addRecord", data);
}
//  柴油发电机运行记录删除
export function delAlternatorRunRecord(data) {
    return postData("/dynamotor/deleteRecord", data);
}
//  柴油发电机运行记录导出
export function exportAlternatorRunRecord(data) {
    return postJSONData("/dynamotor/exportRecord", data);
}
//  柴油发电机运行记录导入
export function importAlternatorRunRecord(data) {
    return postFormData("/dynamotor/importRecord", data);
}
//  泵闸启闭运行记录
export function postPumpGate(data) {
    return postJSONData("/operationRecord/findPumGate", data);
}
//  泵闸启闭运行记录增加
export function addPumpGate(data) {
    return postJSONData("/operationRecord/addPumGate", data);
}
//  泵闸启闭运行记录删除
export function delPumpGate(data) {
    return postJSONData("/operationRecord/delPumGate", data);
}
//  泵闸启闭运行记录导入
export function importPumpGate(data) {
    return postFormData("/operationRecord/import", data);
}
//  泵闸启闭运行记录导出
export function exportPumpGate(data) {
    return postJSONData("/operationRecord/export", data);
}
//  设施管理交接班记录
export function postFacMgrChangeWork(data) {
    return postJSONData("/waterHandover/findHandoverByCondition", data);
}
//  设施管理交接班记录增加
export function addFacMgrChangeWork(data) {
    return postJSONData("/waterHandover/addHandover", data);
}
//  设施管理交接班记录删除
export function delFacMgrChangeWork(data) {
    return postData("/waterHandover/delHandover", data);
}
//  设施管理交接班记录导入
export function importFacMgrChangeWork(data) {
    return postFormData("/waterHandover/import", data);
}
//  设施管理交接班记录导出
export function exportFacMgrChangeWork(data) {
    return postJSONData("/waterHandover/export", data);
}
//  船舶过闸情况明细表
export function postShipPass(data) {
    return postJSONData("/ship/findShipCrossByCondition", data);
}
//  船舶过闸情况明细表增加
export function addShipPass(data) {
    return postJSONData("/ship/addShipCross", data);
}
//  船舶过闸情况明细表删除
export function delShipPass(data) {
    return postJSONData("/ship/delShipCross", data);
}
//  船舶过闸情况明细表导入
export function importShipPass(data) {
    return postFormData("/ship/import", data);
}
//  船舶过闸情况明细表导出
export function exportShipPass(data) {
    return postJSONData("/ship/export", data);
}
//  卫生值勤记录表
export function postHealthDuty(data) {
    return postJSONData("/healthDut/findHealthDutyByCondition", data);
}
//  卫生值勤记录表
export function updateHealthDuty(data) {
    return postJSONData("/healthDut/updHealthDutyAll", data);
}
//  卫生值勤记录导入
export function importHealthDuty(data) {
    return postFormData("/healthDut/import", data);
}
//  卫生值勤记录导出
export function exportHealthDuty(data) {
    return postJSONData("/healthDut/export", data);
}
// //  卫生值勤记录表增加
// export function addShipPass(data) {
//     return postJSONData("/ship/addShipCross", data);
// }
// //  卫生值勤记录表删除
// export function delShipPass(data) {
//     return postData("/ship/delShipCross", data);
// }
//  调水记录汇总表
export function postWaterTransRec(data) {
    return postJSONData("/waterTransfer/findWaterTransferBycondition", data);
}
//  调水记录汇总增加
export function addWaterTransRec(data) {
    return postFormData("/waterTransfer/addWaterTransferAndTmage", data);
}
//  调水记录汇总删除
export function delWaterTransRec(data) {
    return postJSONData("/waterTransfer/delWaterTransfer", data);
}
//  调水记录汇总导出
export function exportWaterTransRec(data) {
    return postJSONData("/waterTransfer/export", data);
}
//  调水图片汇总表
export function postWaterTransImg(data) {
    return postJSONData("/waterTransfer/findWaterTransferPicture", data);
}
//  调水图片汇总增加
export function addWaterTransImg(data) {
    return postJSONData("/waterTransfer/addWaterTransferPicture", data);
}
//  调水图片汇总增加
export function exportWaterTransImg(data) {
    return postJSONData("/waterTransfer/exportPicture", data);
}
// 历史工况查询

export function findPumpGateHistory(data) {
    return postData("/history/findPumpGateHistory", data);
}
// 历史工况 其他设备
export function findNetCameraHistory(data) {
    return postData("/history/findNetCameraHistory", data);
}
// 历史水位查询
export function WaterLevelQuery(data) {
    return postData("/waterLevelLog/instrument", data);
}
// 历史监测点水位查询
export function WaterMonitor(data) {
    return postData("/waterLevelLog/monitoringpoint", data);
}
// 历史报警查询
export function AlarmList(data) {
    return postData("/alarmlog/list", data);
}
// 监测点
export function mplist(data) {
    return postData("/waterLevelLog/mplist", data);
}
// 考勤
export function findBypage(data) {
    return postData("/attendance/findBypage", data);
}
// 作战图sub
export function postChartSub(data) {
    return postData("/map/sub", data);
}
// 作战图summary
export function postChartSummary(data) {
    return postData("/map/summary", data);
}
// 作战图grid
export function postChartGrid(data) {
    return postData("/map/monitorGrid", data);
}
// 作战图grid
export function postWaterLevelWar(data) {
    return postData("/map/waterLevel", data);
}
// 作战图ship
export function postShipWar(data) {
    return postData("/map/ship", data);
}



// 历史报警日志
export function chakan(data) {
    return postData("/alarmlog/chakan", data);
}
// 添加养护人员
export function Addinspector(data) {
    return postJSONData("/schedule/add/inspector", data);
}
// 查询养护人员
export function Queryinspector(data) {
    return postJSONData("/schedule/list/inspector", data);
}
// 展示已绑定目标
export function findContentByCondition(data) {
    return postData("/conservancy/findContentByCondition", data);
} 
// 查询所有小项
export function findTargerContent(data) {
    return postData("/conservancy/findTargerContent", data);
}
// 查询所有小项
export function findAllTargerContent(data) {
    return postData("/conservancy/findTargerContent1", data);
}
// 绑定查询项
export function configInspection(data) {
    return postData("/conservancy/configInspection", data);
}
// 删除绑定项
export function deleteConfigInspection(data) {
    return postData("/conservancy/deleteConfigInspection", data);
}
// 添加排班记录
export function addInfo(data) {
    return postJSONData("/schedule/addInfo", data);
}
// 查询排班 展示
export function QueryforConservancy(data) {
    return postJSONData("/schedule/list/forConservancy", data);
}
// 删除巡查记录
export function deletecondition(data) {
    return postData("/schedule/delete/condition", data);
}
// 删除绑定人员
export function deleteUser(data) {
    return postJSONData("/schedule/delete/inspector", data);
}
// // 删除排班  /schedule/delete/condition
// export function deletecondition(data) {
//     return postJSONData("/schedule/delete/condition", data);
// }

// 待审批  /inspect/list/rectification
export function Queryrectification(data) {
    return postJSONData("/inspect/list/rectification/wait/process", data);
}
// 防汛信息仓库
export function floodPrevList(data) {
    return postData("/goodsrepertory/get", data);
}
// 防汛信息仓库字典
export function floodPrevDict(data) {
    return postData("/goodsrepertory/list", data);
}
// 防汛信息仓库新增
export function addFloodPrev(data) {
    return postJSONData("/goodsrepertory/add", data);
}
// 防汛信息仓库修改
export function updateFloodPrev(data) {
    return postJSONData("/goodsrepertory/update", data);
}
// 防汛信息仓库删除
export function removeFloodPrev(data) {
    return postData("/goodsrepertory/delete", data);
}
// 防汛物资
export function floodPrevMatList(data) {
    return postJSONData("/goods/get", data);
}
// 防汛物资新增
export function addFloodPrevMat(data) {
    return postJSONData("/goods/add", data);
}
// 防汛物资修改
export function updateFloodPrevMat(data) {
    return postJSONData("/goods/update", data);
}
// 防汛物资删除
export function removeFloodPrevMat(data) {
    return postData("/goods/delete", data);
}