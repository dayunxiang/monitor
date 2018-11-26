import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,TreeSelect,Popconfirm  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {relevanUnit,personShow,postIrrigationBasic,inspectorList,findContentByCondition,findTargerContent,configInspection,deleteConfigInspection} from '../../../../../data/dataStore.js'; //引入url

// import '../Inspectors/style.css'
// import '../WarningMessage/warning.css'
import moment, { relativeTimeThreshold } from 'moment';
const Step = Steps.Step;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
// const customDot = (dot, { status, index }) => (
//   <Popover content={<span>step {index} status: {status}</span>}>
//     {dot}
//   </Popover>
// );
class InspectionTarget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:[],  //目标
            dictData:null, //公司
            tableData1:[],  //水利设施
            MubiaoData:[],   //目标
            findTargerContentData:[],
            findTargerContentDataSmall:[]

            // LogData:this.props.logList
          };
      }
    // 事件
    componentDidMount(){
               this.loadData()
               this.findTargerContent()
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
    // 目标  this.shuiliId
    async findTargerContent() {
        let param =  {
            companyId: this.shuiliId
           };
        let data = await findTargerContent(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code=200 ) {

        this.setState({
            loading: false,
            findTargerContentData:data.data,
            // findTargerContentDataSmall:smallContent

        })
    }
}
// 绑定
async configInspectionAll() {
    let paramGobal =  {
        facilityId: this.shuiliId,
        contentId:this.smallValue
       };
    let data = await configInspection(paramGobal).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code=200 ) {
        this.MubiaoList()

}
}
// 展示已绑定的目标
async MubiaoList() {
    let param =  {
        facilityId: this.shuiliId
       };
    let data = await findContentByCondition(param).then((res) =>{ return res.json();}).catch(ex => {});
    if (data.code=200 ) {
    // data.data.forEach((item) => {
    //     item.key = item.id
    // }
    console.log(data.data,"目标1111")
    this.setState({
        loading: false,
        MubiaoData:data.data
    })
}
}
// 水利设施
async ShuiliList() {
    let param =  {
        maintenanceCompanyId: this.UserId
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
    })
}
}
// 公司点击事件
    handleChange1(value){
        this.UserId=value;
        // this.UserList()
         this.ShuiliList()
   console.log(value,'value');
    }
    // 水利设施事件
    handleChange(value){
        this.shuiliId=value.key
        // this. UserList()
        this.MubiaoList()
        console.log(`selected ${value}`);

    }
    // 绑定目标事件
    handleChange2(value){
        console.log(`selected ${value}`);

    }
    // 人员绑定事件
    AlarmSearch(){
        this.configInspectionAll()
    }
    // 小项事件
    onChange = (value) => {
        this.smallValue=value
        console.log(value);
        this.setState({
            value:value
          }
        );
      }
      clickChange=(value)=>{
        console.log(value);

      }
    //   删除事件
    removeClick(text, record, index) {
        this.removeYujing(record);
    }   
    removeYujing(record) {
        let data = {
            facilityId: record.facilityId,
            contentId:record.contentId
        };
        deleteConfigInspection(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
        }).then((data) => {
            if (data.code === 200) { 
                this.MubiaoList()
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
            {title: '所属公司名称',dataIndex: 'companyName' ,width: "25%" ,align:'center',},
            {title: '所属水利设施名称',dataIndex: 'facilityName',width: "25%" ,align:'center',},
            {title: '已绑定目标',dataIndex: 'contentName',width: "25%" ,align:'center'},
        
            {title: '删除绑定项',dataIndex: '',width: "25%" ,align:'center', render: (text, record, index) => {
                    return  <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                        <a href="#">解除</a>
                     </Popconfirm>;
                
            }}
        ];
            const treeData = [
                {
                 title: 'Node1',
               
               children: [{
                  title: 'Child Node1',
                }]
               }
               ]

                    let  checkCoverBox
                    let allList=''
                    let smValue
                    if(this.state.findTargerContentData!=null && this.state.findTargerContentData.map!=null && this.state.findTargerContentData.map!='undefind'&& this.state.findTargerContentData!='undefind'){
                    checkCoverBox=this.state.findTargerContentData;
                    allList= checkCoverBox.map((pane) => <TreeNode key={pane.targetId}  title={pane.targetName} value={pane.targetId} > 
                    {/* <span> {pane.targetName}</span> */}

                    {pane.list.map((pen) => <TreeNode onChange={this.clickChange.bind(this)} key={pen.contentId} title={pen.contentName} value={pen.contentId}> 
                        {/* {pen.subTargetName} */}
                        
                    </TreeNode>)}
                    
                    </TreeNode>)
                    }
        //   公司列表
          let  OptionsList=null;
          if(this.state.dictData != null && this.state.dictData !=undefined){
               OptionsList = this.state.dictData.map((text) => {
                  return <Option key={text.id}>{text.companyName}</Option>
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
             <TreeSelect
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                treeDefaultExpandAll
                multiple
                treeCheckStrictly={true}
                onChange={this.onChange.bind(this)}
                >             
                 {allList}

                {/* {this.renderTreeNode(this.state.findTargerContentData)} */}
            </TreeSelect>

            </Col>
                <Col span="4">
                 {/* 查询按钮 */}
            <Button type="primary" icon="add" style={{float:'right',marginRight:'15px'}} onClick={this.AlarmSearch.bind(this)}>巡检目标绑定</Button>
                </Col>
            </Row>
       <Table columns={columns} dataSource={this.state.MubiaoData} size="middle" bordered={true}/>

      </div>
        )
      }
    }
export default InspectionTarget;