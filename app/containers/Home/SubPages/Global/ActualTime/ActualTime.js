import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,DatePicker } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import DeviceList from '../../Global/ActualTime/DeviceList.js'
   import '../ActualTime/ActualTime.css'
  import echarts from 'echarts';
  //import {watreLevel} from '../../../../../data/dataStore.js' //引入url地址

class ActualTime extends React.Component {
    constructor(props,) {
        super(props);
        this.state = {
             data1:[],
             data2: []

        }
    }
    componentDidMount() {
            //  this.waterLe()
    }
    componentDidUpdate(){
        // this.waterLe()
    }
    // 改变事件
     onChange(date, dateString) {
        // console.log(date, dateString);
        // console.log(dateString)
        this.time=dateString
      }

    //  水位查询
    waterSearch(){
        this.waterLe()

    }
    // 工况查询
    deviceSearch(){
        // alert('工况')
    }
     
    queryId=()=>{
        this.waterLe()
    }
// 水位实时
async waterLe() {
    // console.log(this.props.actualTime,'传值')
    // let param={
    //     facilityInfoId:this.props.actualTime[0]
    // }
    // console.log(param,'paramID的值')
    // let data = await watreLevel(param).then((res) =>{ return res.json();}).catch(ex => {});
    // if (data && data.data ) {
    //     console.log(data.data,'水位实时数据')
    //     data.data.forEach((item) => {
    //         // item.key = item.waterLevelInstrumentInfoId
    //     })
        var list=this.props.WaterLevelData;
         console.log(list,'list')
        var list2=[];
        var list3=[];
       var tb= list.map((item) => {
            item.key = item.id            
            if(item.positionType=='2401'){
            list2.push(item.waterLevel)
            } else if(item.positionType=='2402'){
            list3.push(item.waterLevel)
            }
             return item.waterLevel;
        })
          console.log(list2,'外河水位')
          console.log(list3,'内河水位')
        
        this.setState({
            loading: false,
            data1:list2,
            data2:list3,
        })
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        // const it=[...this.state.data1]
        // const it2=[...this.state.data2]
        myChart.setOption({
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00','14:00','16:00','18:00','20:00','22:00','24:00',]
            },
            yAxis : [
                {
                    show : true,
                    type : 'value',
                    axisLine : {onZero: false},
                    axisLabel : {
                        formatter: '{value} '
                    },
                    boundaryGap : false,
                    // data : [0, 10, 20, 30, 40, 50, 60, 70, 80]
                }
            ],
            series: [{
            
                // data:this.state.data1,
                data:[1,5,8,15,11,19],
                type: 'line',
                smooth: true,
                key:'1'
            },{
                // data:this.state.data2,
                data:[4,9,10,12,18,13],
                type: 'line',
                smooth: true,
                key:'2'
            }
        ]
        });
    }
    render() {
        return (
        	<div className="actual-time">
            {/* 实时信息*/}
          <div className="actual-t">
          {/* 上面标题及时间 */} 
          
          {/* 曲线图 */}
          <div className="actual-t-l">
          <ul>
              <li>
              <img src={require('../../Global/ActualTime/img/011.jpg')} />
              </li>
              <li>
              <img src={require('../../Global/ActualTime/img/02.jpg')} />
              </li>
              {/* <li>
              <img src={require('../../Global/ActualTime/img/02.jpg')} />
            
              </li> */}
              <div className="water_different">
              <span className='O'>内外河水差值</span>
              ：
              <span className='T'>36</span>
              </div>
          </ul>
          </div>
         <div className="box_main">
         <h2>水位曲线图</h2>
         <div id="main" >
          
          {/* 这是柱状图 */}
          </div>
         </div>
          <div className="actual-t-r">
          <img src={require('../../Global/ActualTime/img/red.png')} />
         <span>
             内河
             </span>
             <img src={require('../../Global/ActualTime/img/点.png')} />
            <span>外河</span>
          </div>
          </div>
          {/* 设备工况 */}
          
          <div className="actual-t">
         
         {/* <DeviceList></DeviceList> */}

                {/* 写的页面 */}
               

          </div>

        	</div>
            
        )
    }
    
    
}

export default ActualTime;
