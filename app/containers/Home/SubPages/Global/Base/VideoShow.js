import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址
import moment from 'moment';

class VideoShow extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
        	 tableData:[], //table的数据
        	
        }

    }
//     componentDidMount(){
//       this.video()
//      }
//      // 视频基础资料
//    async video() {
//      let data = await baseInfo({id:1}).then((res) =>{ return res.json();}).catch(ex => {});
//      if (data && data.data ) {
//        data.data.cameraList.forEach((item) => {
//          item.key = item.id
//      })
//         //  console.log(data.data.cameraList,'测试的水位仪值是多少????????')
//          this.setState({
//              loading: false,
//              tableData:data.data
//          })
//      }
   
//    }
    render() {
      const columns = [
        {title: '唯一编号',dataIndex: 'serialNumber' ,width: "9%" ,align:'center'},
        {title: '摄像头名称',dataIndex: 'name',width: "9%" ,align:'center'},
        {title: '摄像头IP',dataIndex: 'ip',width: "8%" ,align:'center'},
        {title: '摄像头端口',dataIndex: 'port',width: "9%" ,align:'center'},
    
        {title: '摄像头型号',dataIndex: 'model',width: "9%" ,align:'center'},
    
        {title: '生产厂商公司ID',dataIndex: 'manufacturerId',width: "9%" ,align:'center'},
        {title: '摄像头分辨率',dataIndex: 'resolution',width: "9%" ,align:'center'},
        {title: '数据创建时间',dataIndex: 'gmtCreate',width: "10%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '数据最后修改时间',dataIndex: 'gmtModified',width: "10%" ,align:'center',render: gmtModified => <span>{moment(gmtModified).format('YYYY-MM-DD HH:mm:ss')}</span>},
        {title: '拼音首字母',dataIndex: 'pinyinInitial',width: "9%" ,align:'center'},
        {title: '中文简写',dataIndex: 'chineseShort',width: "9%" ,align:'center'},

        
    
        
    ];
      
        return (
        	<div className="vk-subpage2">
        	 <Table columns={columns} dataSource={this.props.videoShow.cameraList} size="middle" bordered={true} />
        	</div>
            
        )
    }
    
    
}

export default VideoShow;