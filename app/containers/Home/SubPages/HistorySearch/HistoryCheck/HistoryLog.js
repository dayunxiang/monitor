import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
//import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址
import moment from 'moment';

 
  
class HistoryLog extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
        	tableData:[], //table的数据
        	
        }

    }
    // 下班点击图片详情
    OffWork(){
        this.setState({
            visible:true
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    // 上班
    OnWork(){
        this.setState({
            visible1:true
        })
    }
    handleCancel1(){
        this.setState({
            visible1:false
        })
    }
    render() { 
     
        return (
        	<div className="vk-subpage2">
        <Modal
          title="照片详情"
          visible={this.state.visible}
        //   onOk={this.AreYouOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          width={500}
          bodyStyle={{width:'500px',height:'400px'}}
           footer={null}
          centered={true}>
        {/* 下班照片详情 */}
        <img  alt="图片"   src={"/api/" + this.props.LogList.clockinImage} />;

        </Modal>
        <Modal
          title="照片详情"
          visible={this.state.visible1}
        //   onOk={this.AreYouOk.bind(this)}
          onCancel={this.handleCancel1.bind(this)}
          width={500}
          bodyStyle={{width:'500px',height:'400px'}}
           footer={null}
          centered={true}>
        {/* 上班照片详情 */}
        <img alt="图片"   src={"/api/" + this.props.LogList.clockinImage} />;

        </Modal>
              {/* 查看日志 */}
        <div className="modal">
        <ul>
               <li>
               <div className="nav">限定机制</div>
               <div  className="content">{this.props.LogList.clockinTime}</div>
               </li>
               <li>
               <div  className="nav">签到时间</div>
                   <div  className="content">{this.props.LogList.clockinTime}</div>
               </li>
              
               <li>
               <div  className="nav">签到地址</div>
                   <div  className="content">
                   {this.props.LogList.locationClockin}
                   </div>
               </li>
               <li>
               <div  className="nav">经度</div>
                   <div  className="content">{this.props.LogList.lonClockin}</div>
               </li>
               <li>
               <div  className="nav">纬度</div>
                   <div  className="content">{this.props.LogList.latClockin}</div>
               </li>
               <li>
               <div  className="nav">签到备注</div>
                   <div  className="content">{this.props.LogList.remarkClockout}</div>
               </li>
               <li>
               <div  className="nav1">照片</div>
                   <div  className="content1">
                   {/* {this.props.LogList.clockinImage} */}
                   <img className="ps-rect-img" alt="图片" onClick={this.OnWork.bind(this)}  src={"/api/" + this.props.LogList.clockinImage} />;
                   </div>
               </li>
              
               <li>
               <div  className="nav">限定机制</div>
                   <div  className="content">{this.props.LogList.clockoutTime}</div>
               </li>
               <li>
               <div  className="nav">签到时间</div>
                   <div  className="content">{this.props.LogList.clockoutTime}</div>
               </li>
               <li>
               <div  className="nav">签到地址</div>
                   <div  className="content">
                   {this.props.LogList.clockinImagegroupid}
                   </div>
               </li>
               <li>
               <div  className="nav">经度</div>
                   <div  className="content">{this.props.LogList.lonClockout}</div>
               </li>
               <li>
               <div  className="nav">纬度</div>
                   <div  className="content">{this.props.LogList.latClockout}</div>
               </li>
               <li>
               <div  className="nav">签到备注</div>
                   <div  className="content">{this.props.LogList.remarkClockout}</div>
               </li>
               <li>
               <div  className="nav1">照片</div>
                   <div  className="content1">
                   <img className="ps-rect-img" alt="图片" onClick={this.OffWork.bind(this)}  src={"/api/" + this.props.LogList.clockinImage} />;

                   {this.props.LogList.clockoutImagegroupid}
                   </div>
               </li>
           </ul>
        </div>
        	</div>
            
        )
    }
    
    
}

export default HistoryLog;