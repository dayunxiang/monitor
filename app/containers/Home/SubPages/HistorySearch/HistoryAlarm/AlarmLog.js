import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {chakan} from '../../../../../data/dataStore.js'; //引入url

import Base from '../../Global/Base/Base.js'
// import '../Inspectors/style.css'
// import '../WarningMessage/warning.css'
import moment from 'moment';
const Step = Steps.Step;

// const customDot = (dot, { status, index }) => (
//   <Popover content={<span>step {index} status: {status}</span>}>
//     {dot}
//   </Popover>
// );
class AlarmLog extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
            tableData:[],
            // LogData:this.props.logList
          };
      }
    // 事件
    componentDidMount(){    //
                // this.log()
                this.props.onRow(this)
         }
    async log() {
        let param =  {
            maintenanceNumber:this.props.alarmID
           };
        let data = await chakan(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })

         console.log(data.data,'报警日志的值是多少')
        // var ps=data.data;
        // var lt=ps.map((item,index)=>{
        //     return item
        // })
        // console.log(lt[0].processStateName,'lt???')
        this.setState({
            loading: false,
            // tableData:lt
        })
    }
}
    render() {
    //   let ap;
    //   if(this.props.alarmID!=null && this.props.alarmID!='undefind'){
    //       ap=this.props.alarmID
    //   }
    //   console.log(ap,'ap')
        return (
        <div className='vip'>
        <div className="title">
            {/* BJ.100000002 */}
        {/* {this.state.LogData.rectificationSerial} */}
        </div>
       <div className="content_steps">
       <div className="Big">
    
      </div>
        {/* 子步骤 */}
       {/* <Step key={pen.conservancyId} title={pen.processStateName}/> */}

      <div className="log">
         <Steps size="small" className="BigStep">
            <Step title="开始维护" />
            <Step title="递交维护" />
            {/* <Step title="确认维护" /> */}
         </Steps>
               {/* {
              ap.map((pen,i)=> <div key={i} className="every">
                 <div className="zf-log-item-dot"></div>
                 <span className="zf-log-item-name"></span>
                <span>
                    <div className="item-line">状态：{pen.maintenanceState}</div>
                     <div className="item-line">维护人：{pen.personName}</div>
                     <div className="item-line">维护时间：{pen.gmtModified}</div>
                     <div className="item-line">维护内容：{pen.content}</div>
                </span>
                
                <br/>
                <br/>
                <br/>
                <br/>

               </div>
            
            )
             } */}

        </div>
      </div>
    </div>
        )
      }
    }
export default AlarmLog;