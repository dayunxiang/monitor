import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
// import '../../Global/ActualTime/ActualTime.css'
import {gongkuang} from '../../../../../data/dataStore.js' //引入url地址
class DeviceList extends React.Component{
    constructor(props) {   
        super(props);
        this.state = {
            tableData:[],
        }

    }
    modifyClick(){
        // alert('123')
    }
    componentDidMount() {
//    this.gongk()
    }
    
    // 设备工况信息
    // async gongk() {
    // let data = await gongkuang({facilityInfoId:1}).then((res) =>{ return res.json();}).catch(ex => {});   //facilityInfoId
    // if (data && data.data ) {
    //       console.log(data.data,'测试工况的具体的值是多少')   
    //     var table=data.data.monitoringAllDeviceVO
    //     var arr = []
    //     for (let i in table) {
    //         let o ={};
    //         o[i] = table[i];
    //         arr.push(o)
    //     }
    //      console.log(arr,'arr');
    //      var obj = Object.assign(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12],arr[13],arr[14],arr[15],arr[16])
    //     // var obj1=arr[0];
    // //    var tt=$.extend()
    //     var tabl2=[obj]
    //     // console.log(tabl2,'tt')
    //     // console.log(table,'实时数据值？？？？？？？？？？？？？？？？？？')
    //     this.setState({
    //         loading: false,
    //         tableData:tabl2
    //  }) }}
    render() {
       
      const columns = [
      
        {title: '更新时间',dataIndex: 'time' ,width: "9%" ,align:'center',key:'1',},
        // {title: '报警时间',dataIndex: 'gmtCreate' ,width: "15%" ,align:'center',render: gmtCreate => <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>},

         {title: '内闸',dataIndex: 'insideGateState',width: "7%" ,align:'center',key:'2',render:insideGateState =>{ 
             if(insideGateState==1){
               return '打开'
            } else if(insideGateState==0){
               return '关闭'
             }
            },},
          
        {title: '外闸',dataIndex: 'outsideGateState',width: "7%" ,align:'center',key:'3',render:outsideGateState =>{ 
            if(outsideGateState==1){
              return '启用'
            } else if(outsideGateState==0){
              return '未启用'
            }
           }},
        {title: '节制闸',dataIndex: 'checkGateState',width: "7%" ,align:'center',key:'4',render:checkGateState =>{ 
            if(checkGateState==0){
              return '关闭'
            } else if(checkGateState==1){
              return '打开'
            }
           },},
        // {title: '水泵1',dataIndex: 'pumpList[0].pumpState',width: "7%" ,align:'center',key:'5',render:(processState,record) =>{ 
        //     if(enabled==1){
        //       return '打开'
        //     } else if(enabled==0){
        //       return '关闭'
        //     }
        //    },},
        {title: '水泵2',dataIndex: 'pumpList[1].pumpState',width: "7%" ,align:'center',key:'6',render:enabled =>{ 
            if(enabled==1){
                return '打开'
            } else if(enabled==0){
              return '关闭'
            }
           },},
        {title: '水泵3',dataIndex: 'pumpList[2].pumpState',width: "7%" ,align:'center',key:'7',render:enabled =>{ 
            if(enabled==1){
                return '打开'
            } else if(enabled==0){
              return '关闭'
            }
           },},
        {title: '水泵4',dataIndex: 'pumpList[3].pumpState',width: "7%" ,align:'center',key:'8',render:enabled =>{ 
            if(enabled==1){
                return '打开'
            } else if(enabled==0){
              return '关闭'
            }
           },},
        {title: '水泵5',dataIndex: 'pumpList[4].pumpState',width: "7%" ,align:'center',key:'9',render:enabled =>{ 
            if(enabled==1){
                return '打开'
            } else if(enabled==0){
              return '关闭'
            }
           },},
        {title: '水泵6',dataIndex: 'pumpList[5].pumpState',width: "7%" ,align:'center',key:'10',render:enabled =>{ 
            if(enabled==1){
                return '打开'
            } else if(enabled==0){
              return '关闭'
            }
           },},
        {title: '视频设备',dataIndex: 'cameraState',width: "7%" ,align:'center',key:'13',render:cameraState =>{ 
            if(cameraState==1){
              return '启用'
            } else if(cameraState==0){
              return '未启用'
            }
           },},
        {title: '网络设备',dataIndex: 'networkState',width: "7%" ,align:'center',key:'14',render:networkState =>{ 
            if(networkState==0){
              return '正常'
            } else if(networkState==1){
              return '异常'
            }
           },},  
    ];
    // const ab=this.state.tableData;
      const dataSource=[this.props.DetePickerData]
    //   console.log(dataSource,'dataSource????????!!!!!!')
    //  console.log(this.props.DetePickerData2,'this.props.DetePickerData')
        return (
        	<div className="vk-subpage1">
           <Table ref="table" size={'middle'} bordered={true} scroll={{x:true}}
                                    columns={columns}
                                     dataSource={dataSource}                                 
                                    pagination={{defaultPageSize:30}}/>
        	</div>
            
        )
    }
    
    
}

export default DeviceList;