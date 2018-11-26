import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import '../Inspectors/style.css'
import {monthCover,dayCover,inspectorList} from '../../../../../data/dataStore.js'

class CheckCover extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
             tableData2:[],
             tableData3:[], //table的数据
            //  tableData:{},
            //  tableData1:{}
        }

    }
    componentDidMount() {
       // this.CoverM();  //月覆盖
        //this.Coverd(); //日覆盖
        // this.inspectors(); //巡查
    }
    render() {
        // console.log(pen.abnormal,'pen.abnormal')
        const Step = Steps.Step;
       let  checkCoverBox
       let allList=[]
       if(this.props.detailCheck!=null && this.props.detailCheck.map!=null && this.props.detailCheck.map!='undefind'&&this.props.detailCheck!='undefind'){
        checkCoverBox=this.props.detailCheck;
        allList= checkCoverBox.map((pane) => <div key={pane.targetId}  className='zf-show3' icon={<Icon type="user" />} > 
        <div className="big">
        <div className="dirct" ></div>
         <span> {pane.targetName}</span>
         <div className="line"></div>
        </div>

          {pane.subTargetRecordList.map((pen) => <div key={pen.inspectOrder} className='zf-show1'> 
          <div className="small">
           <div className="small-line"></div>
           <div className="conent">
           <div className={"small-dirct " +(pen.abnormal==0 ? "Smallshixin" : " ")}>
            {/* {pen.abnormal}  */}
                         </div>
           <span className={'spn' +(!pen.abnormal==0 ? "bg" : " ")}>{pen.subTargetName}</span>
           </div>
           </div>
          </div>)}
        
      </div>)
       }
        // let checkCoverBox=this.props.detailCheck ? this.props.detailCheck : '';
        // checkCoverBox ? checkCoverBox : ''
        // console.log(checkCoverBox,'checkCoverBox1111111111')
        return (
        	<div className="vk-subpage">
            {/* 上 */}
            <div className="check_cover_t">
            <span >巡查覆盖查询</span>
            <div className="two">
            <Button disabled={true}>2018年10月</Button>                
            </div>
            <div className="first">
            <Button  type="primary">排班表</Button>
            </div>
           
                </div>
            {/* 中 */}
            <div className="check_cover_m">
            {/* 日覆盖率 */}
          <div className="ll">
          <div className="name-l">
            当日覆盖率
            </div>
            <div className="pro-l">
            <Progress percent={this.props.day} type="line" status="active" strokeWidth ={30} strokeLinecap="square"/>
                
            </div>
          </div>
            {/* 月覆盖率 */}
           <div className="rr">
           <div className="name-r">
            当月覆盖率
            </div>
            <div className="pro-r">
            <Progress percent={this.props.checkBox} type="line" status="active" strokeWidth ={30} strokeLinecap="square"/>
                
            </div>
           </div>
            </div>
            {/* 下 */}
            <div className="check_cover_b">
                        <div className="zf-Steps">
                          { allList}

                     </div>
            </div>
        	</div>
     )}}
export default CheckCover;