import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址
import moment from 'moment';

 
  
class WaterYi extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
        	tableData:[], //table的数据
        	
        }

    }
    // componentDidMount(){
    //   this.waterWeiYi()
    //  }
     // 水位仪基础资料
  //  async waterWeiYi() {
  //    let data = await baseInfo({id:1}).then((res) =>{ return res.json();}).catch(ex => {});
  //    if (data && data.data ) {
  //      data.data.levelList.forEach((item) => {
  //        item.key = item.id
  //    })
  //       //  console.log(data.data.levelList,'测试的水位仪值是多少????????')
  //        this.setState({
  //            loading: false,
  //            tableData:data.data
  //        })
  //    }
   
  //  }
    render() { 
      const columns = [
        {title: '水位仪唯一编码',dataIndex: 'serialNumber' ,width: "8%" ,align:'center'},
        {title: '名称',dataIndex: 'name' ,width: "7%" ,align:'center'},

        {title: '型式',dataIndex: 'spec',width: "7%" ,align:'center'},
        {title: '里程',dataIndex: 'rangeAbility',width: "7%" ,align:'center'},
        {title: '最大水位变率',dataIndex: 'maxChangeRate' ,width: "7%" ,align:'center'},
    
        {title: '分辨率',dataIndex: 'resolvingPower' ,width: "6%" ,align:'center'},
        {title: '最高工作水温',dataIndex: 'maxWorkWaterTemperature' ,width: "6%" ,align:'center'},
        {title: '最低工作水温',dataIndex: 'minWorkWaterTemperature' ,width: "6%" ,align:'center'},
        {title: '最高工作环境温度',dataIndex: 'maxWorkAmbientTemperature' ,width: "6%" ,align:'center'},
        {title: '最低工作环境温度',dataIndex: 'minWorkAmbientTemperature' ,width: "6%" ,align:'center'},
        {title: '记录创建时的治时间',dataIndex: 'gmtCreate' ,width: "7%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '记录修改时的时间',dataIndex: 'gmtModified' ,width: "7%" ,align:'center',render: gmtModified => <span>{moment(gmtModified).format('YYYY-MM-DD HH:mm:ss')}</span>,},
        {title: '拼音首字母',dataIndex: 'pinyinInitial' ,width: "6%" ,align:'center'},
        {title: '中文简写',dataIndex: 'chineseShort' ,width: "6%" ,align:'center'},
        {title: '生产厂商',dataIndex: 'manufacturerId' ,width: "7%" ,align:'center'},
      ]
        return (
        	<div className="vk-subpage2">
        	 <Table columns={columns} dataSource={this.props.WaterWeiYi.levelList} size="middle" bordered={true} />
        	</div>
            
        )
    }
    
    
}

export default WaterYi;