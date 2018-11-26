import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
// import {baseInfo} from '../../../../../data/dataStore.js' 
import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址

class Base extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
        	 tableData:[], //table的数据
        	
        }

    }
//     componentDidMount(){
//    this.waterBeng()
//   }
//   componentDidUpdate(){
    // this.props.BaseList.pumpList
//   }
  // 水泵基础资料
// async waterBeng() {
//   let data = await baseInfo({id:1}).then((res) =>{ return res.json();}).catch(ex => {});
//   if (data && data.data ) {
//     data.data.pumpList.forEach((item) => {
//       item.key = item.id
//   })
//       // console.log(data.data.serialNumber,'测试的值是多少????????')
//       this.setState({
//           loading: false,
//           tableData:data.data
//       })
//   }

// }

    render() {
       
      const columns = [
        {title: '水泵编码',dataIndex: 'serialNumber' ,width: "15%",align:'center'},
        {title: '水泵名称',dataIndex: 'name',width: "10%" ,align:'center'},
        {title: '流量',dataIndex: 'flow',width: "10%" ,align:'center'},
        {title: '型号',dataIndex: 'model',width: "10%" ,align:'center'},
        {title: '泵宽',dataIndex: 'pumpWidth',width: "10%" ,align:'center'},
        {title: '规格',dataIndex: 'spec',width: "10%" ,align:'center',key:''},
        {title: '生产厂商',dataIndex: 'manufacturerId',width: "15%" ,align:'center'},
        {title: '中文简写',dataIndex: 'chineseShort',width: "10%" ,align:'center'},
        {title: '拼音首字母',dataIndex: 'pinyinInitial',width: "10%" ,align:'center'},
    
        
    ];
    //   console.log(this.props.BaseList,'this.props.BaseList')
        return (
        
        	<div className="vk-subpage2">
        	 <Table columns={columns} dataSource={this.props.BaseList.pumpList} size="middle" bordered={true} />
        	</div>
            
        )
    }
    
    
}

export default Base;