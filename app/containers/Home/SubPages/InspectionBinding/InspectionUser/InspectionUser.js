import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,Popconfirm } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {relevanUnit,personShow,postIrrigationBasic,Addinspector,Queryinspector,deleteUser} from '../../../../../data/dataStore.js'; //引入url

// import '../Inspectors/style.css'
// import '../WarningMessage/warning.css'
import moment from 'moment';
const Step = Steps.Step;
const Option = Select.Option;

// const customDot = (dot, { status, index }) => (
//   <Popover content={<span>step {index} status: {status}</span>}>
//     {dot}
//   </Popover>
// );
class InspectionUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
            tableData:[],
            dictData:null,
            tableData1:[],
            QuerytableData:[],
            UserIdList:[]
            // LogData:this.props.logList
          };
        
      }
    // 事件
            componentDidMount(){
               this.loadData()
              }
            //   公司展示
              async loadData() {
                let stateList= relevanUnit({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("公司展示列表接口出错");}).then((data) => {
                    if (data.code === 200) {
                          console.log(data.data,'公司值是多少？？？')
                        return data.data;
                    }
                    return Promise.reject(data.msg);
                }); 
                let data = await Promise.all([ stateList]).then((data) => {
                    return data;
                }).catch(ex => { return ex;})
                if (Array.isArray(data) && data.length ) {
            
                     let dictData = data[0];
                    //  let waterData=data[1];
                    this.setState({
                         loading: false,
                         dictData: dictData,
                        //  waterData:waterData,
                    })
                }else{
                    this.setState({
                        loading: false
                    })
                    message.error( data ||  "服务器异常!",5);
                }
            }
    // 关联人员
    async UserList() {
        let param =  {
            companyId: this.ComponentId
           };
        let data = await personShow(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // }
        console.log(data.data,'人员')
        this.setState({
            loading: false,
            tableData:data.data
        })
    }}
  // 水利设施
  async ShuiliList() {
    let param =  {
        maintenanceCompanyId:this.ComponentId
       };
    let data = await postIrrigationBasic(param).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code=200 ) {
    // data.data.forEach((item) => {
    //     item.key = item.id
    // }
    console.log(data.data,'水利设施')
    this.setState({
        loading: false,
        tableData1:data.data
    })}}
    // 养护人员添加
    async AddUser() {
        let newIdList=[];
        let everyId=[];
        if(this.UserIdList!=null && this.UserIdList!='undefind'){
            newIdList=this.UserIdList
        }
        everyId=newIdList.map((item,index)=>{
            return {
                conservancyId: this.WaterId,  //水利设施id
                userInfoId:item.key      //用户id
               }
        })
        console.log(everyId,'everyId')
        let data = await Addinspector(everyId).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // }
        // console.log(data.data,'')
        // this.setState({
        //     loading: false,
        //     tableData1:data.data
        // })   
    }
    }
    async QueryUser() {
        let param =  {
            conservancyId:this.WaterId,  //水利设施id
           };
        let data = await Queryinspector(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // }
         console.log(data.data,'绑定的人员')
        this.setState({
            loading: false,
            QuerytableData:data.data
        })  
    }
    } 
    // 添加排班   
    // async addInfo() {
    //     let param =  {
    //         conservancyId:this.WaterId,  //水利设施id 
    //        };
    //     let data = await addInfo(param).then((res) =>{ return res.json();}).catch(ex => {});
    //     if (data.code=200 ) {
        
    //      console.log(data.data,'绑定的人员')
      
    // }
    // } 
  // 公司点击事件
    handleChange1(value){
        this.ComponentId=value;
        this.UserList()
        this.ShuiliList()
   console.log(value,'公司111');
    }
    // 水利设施事件
    handleChange(value){
        this.WaterId=value.key
        console.log(value.key,'水利111')
        this.QueryUser()


    }
    // 绑定人员事件
    handleChange2(value){
        console.log(value,'人员111')
        console.log(`selected ${value}`);
        // this.setState({
        //     UserIdList:value
        // })
     this.UserIdList=value

    }
    // 人员绑定事件
    AlarmSearch(){
        this. AddUser()
        this.QueryUser()
    }
     removeClick(text, record, index) {
        this.removeYujing(record);
    }   
    removeYujing(record) {
        let data = {
            conservancyUserRelationId:record.conservancyUserRelationId,
            conservancyId: record.conservancyId,
            userInfoId:record.userInfoId
        };
        deleteUser(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
        }).then((data) => {
            if (data.code === 200) { 
                this.QueryUser()()  //重新调用展示
                // this.setState({
                //     tableData4: trData
                // });
            }else{
                // message.error(data.msg || "服务器异常!", 5);
            } 
        }).catch((ex) => { 
            // message.error(ex || "服务器异常!",5);
        });
    } 
    render() {
        const columns = [
            {title: '所属公司',dataIndex: 'companyName' ,width: "25%" ,align:'center',},
            {title: '所属水利设施',dataIndex: 'conservancyName',width: "25%" ,align:'center',},
            {title: '公司所属人员',dataIndex: 'userName',width: "25%" ,align:'center'},
            {title: '删除绑定人员',dataIndex: '',width: "25%" ,align:'center', render: (text, record, index) => {
                return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">解除</a>
                 </Popconfirm>;
            
        }}
        
    ];
        //   公司列表
          let  OptionsList=null;
          if(this.state.dictData != null && this.state.dictData !=undefined){
               OptionsList = this.state.dictData.map((text) => {
                  return <Option key={text.id}>{text.companyName}</Option>
               });
          } 
        //   人员  
        let  User=null;
        if(this.state.tableData != null && this.state.tableData !=undefined){
            User = this.state.tableData.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        // 水利 name
        let  ShuiliList=null;
        if(this.state.tableData1 != null && this.state.tableData1 !=undefined){
            ShuiliList = this.state.tableData1.map((text) => {
                return <Option key={text.id}>{text.name}</Option>
             });
        } 
        return (
        <div className='vip'>
          <Row>
                <Col span="4"> 
                  {/* 类型部分 */}
                 <label htmlFor="">公司名称</label>
                 <Select showSearch style={{ width: 200 }}  
                  onChange={this.handleChange1.bind(this)}  
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                  {/* {stateOptions} */}
                  {OptionsList}
                  </Select>
                </Col>
                <Col span="4">
                <label htmlFor="">公司所属水利设施</label>
                 <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >  
                 {ShuiliList}
                  
            </Select>
                </Col>
                <Col span="4">
             <label htmlFor="">公司所属人员</label>
            <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onChange={this.handleChange2.bind(this)}
                mode={'multiple'}
                tokenSeparators={[',']}
                labelInValue={true}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                    {/* {TypeOptions}                */}
                    {User}
            </Select>
            </Col>
                <Col span="4">
                 {/* 查询按钮 */}
            <Button type="primary" icon="add" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>人员绑定</Button>
                </Col>
            </Row>
       <Table columns={columns} dataSource={this.state.QuerytableData} size="middle" bordered={true}/>

      </div>
        )
      }
    }
export default InspectionUser;