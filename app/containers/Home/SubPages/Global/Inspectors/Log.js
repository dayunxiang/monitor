import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import {postRectifyLog,} from '../../../../../data/dataStore.js'; //引入url

import Base from '../../Global/Base/Base.js'
import '../Inspectors/style.css'

import moment from 'moment';
const Step = Steps.Step;

// const customDot = (dot, { status, index }) => (
//   <Popover content={<span>step {index} status: {status}</span>}>
//     {dot}
//   </Popover>
// );
class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:[],
            tableData2:this.props.rowList
          };
      }
    // 事件
    componentDidMount(){
      this.log()
        }
    async log() {
        // const parameter =this.props.rowList.rectificationId
        // console.log(parameter,'rowList')

        let data = await postRectifyLog({rectificationId:4}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
        // console.log(data.data,'详细日志的值是多少')
        this.setState({
            loading: false,
            tableData:data.data
        })
    }
}
    render() {
        return (
        	<div className='vip'>
        <div className="title">
        {this.state.tableData2.rectificationSerial}
        </div>
      <div className="content_steps">
    <div className="Big">
    <Steps size="small" current={1}>
            <Step title="发现问题" />
            <Step title="汇报问题" />
            <Step title="处理问题" />
            <Step title="整改问题" />
            <Step title="结果审核" />
            <Step title="流程结束" />
      </Steps>
    </div>
      {/* 子步骤 */}
      <div className="one">
            <Steps direction="vertical" current={2} size="small">
                <Step title="章洪武" />
                {/* <Step title="主,侧滚轮"  />
                <Step title="门叶，梁泵" />
                <Step  title="吊耳" />
                <Step  title="搁门器" />
                <Step  title="门槽" />
                <Step  title="其他金属结构" /> */}
            </Steps>
            </div>
      </div>
     </div>
 )}}
export default Log;