import React from 'react';
import { Tree, Menu, Icon} from '../Antd.js';
import '../../css/anticon.css'
const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;

class AntTree extends React.Component {
    render() {
        return (
			<Menu
		    mode="inline"
	        theme="dark"
	        inlineCollapsed={this.props.inlineCollapsed}
	        onClick={this.itemClick.bind(this)}
	        // openKeys={this.state.openKeys}
	        onOpenChange={this.onOpenChange}
	        style={{ width: '100%' }} >
					{/* 实时监控 */}
				<SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>实时监控</span></span>}>
		            <Menu.Item key="Monitor">地图</Menu.Item>
		            <Menu.Item key="Inbound">水利设施监控</Menu.Item>
		            <Menu.Item key="3">巡检监控</Menu.Item>
					<Menu.Item key="API">水利设施综合监控</Menu.Item>
					<Menu.Item key="WarningMessage">报警信息</Menu.Item>

		        </SubMenu>
						{/* 视频监控 */}
		        <SubMenu key="sub2" title={<span><Icon type="video-camera" theme="outlined" /><span>视频监控</span></span>}>
		            <Menu.Item key="VideoMonitor">实时视频</Menu.Item>
		            <Menu.Item key="Video">视频管理</Menu.Item>
	
		        </SubMenu>
						{/* 巡检运维 */}
				<SubMenu key="sub3" title={<span>  <Icon type="book" /><span>数据台帐</span></span>}>
					<Menu.Item key="WaterConservancyRectify">水利整改</Menu.Item>
		            <Menu.Item key="DailyPatrolRecord">日常巡查记录表</Menu.Item>
		            <Menu.Item key="FacilitiesMaintenanceSummary">设施养护汇总表</Menu.Item>
		            <Menu.Item key="FacilitiesMaintenanceRecord">水利设施养护记录表</Menu.Item>
		            <Menu.Item key="GreenConservationMonth">绿化养护月报表</Menu.Item>
		            <Menu.Item key="GreenConservationRecord">绿化养护记录表</Menu.Item>
		            <Menu.Item key="AlternatorRunRecord">柴油发电机组运行记录</Menu.Item>
		            <Menu.Item key="PumpGateRunRecord">(泵)闸启闭运行记录</Menu.Item>
		            <Menu.Item key="WaterTransferRecord">调水记录汇总</Menu.Item>
		            <Menu.Item key="WaterTransferImage">调水图片汇总</Menu.Item>
		            <Menu.Item key="FacilitiesMgrChangeWork">设施管理交接班</Menu.Item>
		            <Menu.Item key="ShipPassDetail">船舶过闸情况明细表</Menu.Item>
		            <Menu.Item key="HealthDutyRecord">卫生值勤记录表</Menu.Item>
		            {
		    //         	<Menu.Item key="DeviceRunRecord">设备运行记录</Menu.Item>
			   //          <Menu.Item key="8">养护记录</Menu.Item>
			   //          <Menu.Item key="9">绩效管理</Menu.Item>
						// <Menu.Item key="10">巡查排班</Menu.Item>
			   //          <Menu.Item key="11">巡查运维配置</Menu.Item>
		            }
		            
		        </SubMenu>
					{/* 数据查询 */}
				<SubMenu key="sub4" title={<span><Icon type="search" theme="outlined" /><span>数据查询</span></span>}>
		          <Menu.Item key="HistoryAlarm">报警查询</Menu.Item>
		          <Menu.Item key="HistoryWaterLevel">水位查询</Menu.Item>
				  <Menu.Item key="HistoryMonitor">监测点查询</Menu.Item>
		          <Menu.Item key="HistoryMode">工况查询</Menu.Item>
				  <Menu.Item key="HistoryRectify">整改查询</Menu.Item>
				  <Menu.Item key="HistoryCheck">考勤查询</Menu.Item>
				  <Menu.Item key="gradeListQuery">排班查询</Menu.Item>


		        </SubMenu>
						{/* 基础资料管理 */}
		        <SubMenu key="sub5" title={<span><Icon type="appstore" /><span>基础资料管理</span></span>}>
					<Menu.Item key="Irrigation">水利设施管理</Menu.Item>
		            <Menu.Item key="WaterLevel">水位仪管理</Menu.Item>
		            <Menu.Item key="GatePosition">闸位仪管理</Menu.Item>
					<Menu.Item key="ElectricMeter">电量仪管理</Menu.Item>
		            <Menu.Item key="WaterPump">水泵管理</Menu.Item>
		            <Menu.Item key="SluiceGate">闸门管理</Menu.Item>
					<Menu.Item key="NetworkSettings">网络设备管理</Menu.Item>
		            <Menu.Item key="Rive">河流管理</Menu.Item>
		            <Menu.Item key="PolderArea">圩区管理</Menu.Item>
					<Menu.Item key="FloodPrevention">防汛设施管理</Menu.Item>
		            <Menu.Item key="Unit">行政区管理</Menu.Item>
		            <Menu.Item key="Map">地图管理</Menu.Item>
		        </SubMenu>
				{/* 巡查管理 */}
				<SubMenu key="sub6" title={<span> <Icon type="bar-chart" /> <span>巡查管理</span></span>}>
					<Menu.Item key="InspectionUser">水利设施巡查人员绑定</Menu.Item>
		            <Menu.Item key="InspectionTarget">水利设施巡查目标绑定</Menu.Item>  
					<Menu.Item key="gradeList">排班人员绑定</Menu.Item>
		        </SubMenu>
		    {/* 防汛管理 */}
				<SubMenu key="sub8" title={<span> <Icon type="notification" /> <span>防汛管理</span></span>}>
					<Menu.Item key="FloodPreventionHouse">防汛仓库信息</Menu.Item>
					<Menu.Item key="FloodPreventionMaterial">防汛物资信息</Menu.Item>
		        </SubMenu>
						{/* 系统设置 */}
				<SubMenu key="sub7" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
		          <Menu.Item key="UserManage">用户管理</Menu.Item>
							
		          {/* <Menu.Item key="Role">角色管理</Menu.Item>   */}
		          {/* <Menu.Item key="Resource">资源管理</Menu.Item> */}
		          {/* <Menu.Item key="Group">组管理</Menu.Item> */}
		          <Menu.Item key="Authority">权限组管理</Menu.Item>
		          <Menu.Item key="PersonnelManage">人员管理</Menu.Item>
				  <Menu.Item key="UnitManage">单位管理</Menu.Item>

		            {/* <Menu.Item key="Operator">用户管理</Menu.Item>
		            <Menu.Item key="Role">角色管理</Menu.Item>
		            <Menu.Item key="Resource">资源管理</Menu.Item>
		            <Menu.Item key="Group">组管理</Menu.Item>
		            <Menu.Item key="52">参数设置</Menu.Item>
		            <Menu.Item key="53">配置管理</Menu.Item> */}
		        </SubMenu>
			
	        </Menu>
	    );
    }
	itemClick({ item, key, keyPath }) {
		if (this.props.itemClick) {
			this.props.itemClick(item, key, keyPath);
		}
	}
}
export default AntTree;