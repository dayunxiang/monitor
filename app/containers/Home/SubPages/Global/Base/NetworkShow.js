import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址
import moment from 'moment';

class NetworkShow extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
        	tableData:[], //table的数据   	
        }
    }
//     componentDidMount(){
//       this.network()
//      }
//      // 网络设备基础资料
//    async network() {
//      let data = await baseInfo({id:1}).then((res) =>{ return res.json();}).catch(ex => {});
//      if (data && data.data ) {
//        data.data.networkList.forEach((item) => {
//          item.key = item.id
//      })
//         //  console.log(data.data.cameraList,'测试的网络设备值是多少????????')
//          this.setState({
//              loading: false,
//              tableData:data.data
//          })
//      }
   
//    }
    render() {
      const columns = [
        {title: '网络设置编码',dataIndex: 'serialNumber' ,width: "10%" ,align:'center'},
        {title: '网络设备名称',dataIndex: 'name',width: "10%" ,align:'center'},
        {title: '规格',dataIndex: 'spec',width: "10%" ,align:'center'},
    
        {title: '型号',dataIndex: 'model',width: "10%" ,align:'center'},
        {title: '生产厂商',dataIndex: 'manufacturerId',width: "10%" ,align:'center'},
        {title: '设备类型',dataIndex: 'deviceType',width: "10%" ,align:'center'},
        {title: '中文简写',dataIndex: 'chineseShort',width: "10%" ,align:'center'},
        {title: '拼音首字母',dataIndex: 'pinyinInitial',width: "10%" ,align:'center'},
        {title: '数据创建时间',dataIndex: 'gmtCreate',width: "10%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},

        {title: '数据修改时间',dataIndex: 'gmtModified',width: "10%" ,align:'center',render: gmtModified => <span>{moment(gmtModified).format('YYYY-MM-DD HH:mm:ss')}</span>},

    ];
        return (
        	<div className="vk-subpage2">
        	 <Table columns={columns} dataSource={this.props.netWork.networkList} size="middle" bordered={true} />
        	</div>
            
        )
    }
    
    
}

export default NetworkShow;