import React from 'react';
import { Tree, Menu, Icon} from '../Antd.js';

const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;

class AntTree extends React.Component {
  

    render() {
	    return (
	      	<Menu
	        mode="inline"
	        // theme="dark"
	        inlineCollapsed={this.props.inlineCollapsed}
	        onClick={this.itemClick.bind(this)}
	        // openKeys={this.state.openKeys}
	        onOpenChange={this.onOpenChange}
	        style={{ width: '100%' }} >
		        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>基础资料</span></span>}>
		          <Menu.Item key="Operator">操作员</Menu.Item>
		          <Menu.Item key="Stuff">人员</Menu.Item>
		          <Menu.Item key="Material">物料</Menu.Item>
		          <Menu.Item key="Organization">组织机构</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>出库管理</span></span>}>
		          <Menu.Item key="5">Option 5</Menu.Item>
		          <Menu.Item key="6">Option 6</Menu.Item>
		          <SubMenu key="sub3" title="Submenu">
		            <Menu.Item key="7">Option 7</Menu.Item>
		            <Menu.Item key="8">Option 8</Menu.Item>
		          </SubMenu>
		        </SubMenu>
		        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>入库管理</span></span>}>
		          <Menu.Item key="Inbound">入库通知</Menu.Item>
		          <Menu.Item key="10">Option 10</Menu.Item>
		          <Menu.Item key="11">Option 11</Menu.Item>
		          <Menu.Item key="12">Option 12</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub5" title={<span><Icon type="setting" /><span>库存管理</span></span>}>
		          <Menu.Item key="13">Option 9</Menu.Item>
		          <Menu.Item key="14">Option 14</Menu.Item>
		          <Menu.Item key="15">Option 15</Menu.Item>
		          <Menu.Item key="16">Option 16</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub6" title={<span><Icon type="setting" /><span>报表管理</span></span>}>
		          <Menu.Item key="17">Option 17</Menu.Item>
		          <Menu.Item key="18">Option 18</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub7" title={<span><Icon type="setting" /><span>其他管理</span></span>}>
		          <Menu.Item key="MapApi">地图接口</Menu.Item>
		        </SubMenu>
	        </Menu>
	    );
    }
	itemClick({ item, key, keyPath }) {
		if(this.props.itemClick){
			this.props.itemClick(item, key, keyPath );
			console.log(item, key, keyPath);
		}
	}
}
export default AntTree;