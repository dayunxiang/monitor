import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import '../../Global/Base/base.css'
import {baseInfo} from '../../../../../data/dataStore.js' //引入url地址

// import {monthCover} from '../../../../../data/dataStore.js'

class BaseInfo extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
             tableData:{}, //table的数据
            // Basedetail:this.props.baseId
        }
    }
    // componentDidMount() {
    //     this.props.onRef(this)
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate', prevProps, prevState)
    //   }
    // BaseClick=()=>{
    // this.BASE()
    // }
// 设施基础资料
// async BASE() {
    
//     let param={
//         id:this.props.baseId
//     }
//     console.log(param,'param')
//     let data = await baseInfo(param).then((res) =>{ return res.json();}).catch(ex => {});
//     if (data.code==200) {
//         // data.data.forEach((item) => {
//         //     item.key = item.id
//         // })
//         // console.log(data.data.serialNumber,'测试的值是多少')
//         this.setState({
//             loading: false,
//             tableData:data.data
//         })
//     }
// }

    render() {
       let qibi
       let koumen
       let sheshiType
    //    启闭方式
    if(this.props.baseId.gateWorkMode===2301){
        qibi='卷扬式'
    } else if(this.props.baseId.gateWorkMode===2302) {
        qibi='液压式'
    } else if(this.props.baseId.gateWorkMode===2303){
        qibi='升卧式'
    } 
    //    if(this.props.baseId.gateWorkMode===)
    if(this.props.baseId.gateType===2001){
        koumen='引水口门'
    } else if(this.props.baseId.gateType===2002) {
         koumen='动力排水口门'
    } else if(this.props.baseId.gateType===2003){
         koumen='乘潮排水口门'
    } else if(this.props.baseId.gateType===2004){
         koumen='太浦河沿线口门'
    }
    // 设施类型
    if(this.props.baseId.facilityType===2101){
        sheshiType='单闸'
    } else if(this.props.baseId.facilityType===2102) {
        sheshiType='套闸'
    } else if(this.props.baseId.facilityType===2103){
        sheshiType='节制闸'
    } else if(this.props.baseId.facilityType===2104){
        sheshiType='分洪闸'
    }else if(this.props.baseId.facilityType===2105) {
        sheshiType='泵闸'
   } else if(this.props.baseId.facilityType===2106){
    sheshiType='泵站'
   } else if(this.props.baseId.facilityType===2107){
    sheshiType='排涝站'
   }else if(this.props.baseId.facilityType===2108){
    sheshiType='水闸'
}

        return (
        	<div className="vk">
            {/* 上面部分 */}
            <div className="zf-top">
            <div>设施基础资料 </div>
            {/* let at=this.props.baseId; */}

            </div>
            <div className="zf-b">
            {/* 左边 */}
            <div className="lef">
           <ul>
               {/* <li>
                   <span>水利设施ID</span>
                   <div>{this.props.baseId.id}</div>
               </li> */}
               <li>
               <span>设备唯一编号</span>
               <div>{this.props.baseId.serialNumber}</div>
               </li>
               <li>
               <span>水利设施名称</span>
                   <div>{this.props.baseId.name}</div>
               </li>
              
               <li>
               <span>口门类型</span>
                   <div>
                   {koumen}
                   </div>
               </li>
               <li>
               <span>设施类型</span>
                   <div>{sheshiType}</div>
               </li>
               <li>
               <span>水闸类型</span>
                   <div>{this.props.baseId.facilityTypeName}</div>
               </li>
               <li>
               <span>闸门启闭方式</span>
                   <div>
                   {qibi}
                   </div>
               </li>
           </ul>
            </div>
           {/* 右边 */}
           <div className="righ">
           <ul>
               <li>
                   <span>水利设施的平均宽度</span>
                   <div>{this.props.baseId.facilityAverageWidth}</div>
               </li>
               <li>
               <span>闸孔尺寸</span>
                   <div>{this.props.baseId.gateSize}</div>
               </li>
               <li>
               <span>建造日期</span>
                   <div>{this.props.baseId.buildDate}</div>
               </li>
               <li>
               <span>拼音首字母</span>
                   <div>{this.props.baseId.pinyinInitial}</div>
               </li>
               {/* <li>
               <span>养护单位ID</span>
                   <div>{this.props.baseId.maintenanceCompanyId}</div>
               </li> */}
               {/* <li>
               <span>水利设施照片组ID</span>
                   <div>{this.props.baseId.conservancyImgGroupId}</div>
               </li> */}
               <li>
               <span>数据的创建时间</span>
                   <div>{this.props.baseId.gmtCreate}</div>
               </li>
               <li>
               <span>最后修改时间</span>
                   <div>{this.props.baseId.gmtModified}</div>
               </li>
              
           </ul>
           </div>
            </div>
        	</div>
            
        )
    }
    
    
}

export default BaseInfo;
