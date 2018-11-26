import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Tabs  } from '../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
// import BaseSubPage from '../../BaseSubPage.js'
// import '../../Global/Base/base.css'
// import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址

// import {monthCover} from '../../../../../data/dataStore.js'
import Resource from '../Authority/Resource/Resource.js'  //权限组组件
import Functional from '../Authority/Functional/Functional.js'  //功能权限组件
class Authority extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
             tableData:[], //table的数据
        	
        }
    }
    callback(key) {
        console.log(key);
      }
    render() {
        const TabPane = Tabs.TabPane;

        return (
        	<div className="vk">
         <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
         {/* 资源权限 */}
        <TabPane tab="资源权限组" key="1">
        <Resource></Resource>
        </TabPane>
        {/* 功能权限 */}
        <TabPane tab="功能权限组" key="2">
        <Functional></Functional>
        </TabPane>
  </Tabs>            
            </div>
         )
    
    
}
}
export default Authority;
