import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,Upload   } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {present,readyy} from '../../../../../data/dataStore.js'; //引入url
import InProcess from '../../basic-data/WarningMessage/InProcess.js' //递交组件
//import Base from '../../Global/Base/Base.js'
// import '../Inspectors/style.css'
import '../WarningMessage/warning.css'
import moment from 'moment';
const FormItem = Form.Item;
class ServicingDetail extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.Ok=this.Ok.bind(this)
        this.state = {
            tableData:[],
            tableInMain:this.props.inMain,
            // 上传
            previewVisible: false,
            previewImage: '',
            fileList: [],
            ServivingData:[],
            table:[],
            detail:[]
          
          };
      }
    //   上传事件
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    handleChange = ({ fileList }) => this.setState({ 
        fileList 
    })

    // 事件
      componentDidMount(){
       this.readyServicing()
        }
        async readyServicing() {
            let data1 =  {
            alarmId:this.state.tableInMain.id
           };
        //    console.log(data1,'维护编号11111')
            let data = await readyy(data1).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code==200) {
            this.setState({
            ServivingData:data.data[0],
            })
        }
    
     }
// 正式开始整改
    beginNext=()=>{
            // console.log(record,'record')
            this.setState({
                visible3: true,
                //  visible:false
                //  zt:record,
            });

        }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields(
          (err) => {
            if (!err) {
              console.info('success');
            }
          },
        );
        // var vals = this.props.form.getFieldsValue();
        // console.log(vals);
        window.setTimeout(() => {return this.props.form.resetFields()},1000)
        
    }
    handleUpload=(record)=>{
        // console.log(record,'试一下')
       
    }
    submitA = () => { // 此处使用箭头函数，避免bind绑定
        this.props.handle()

        this.setState({
            visible3: true,
          });
    }
    // 递交事件
    Ok= (e) => {
        this.setState({
          visible3: false,
        });
      }
    handleCancel3 = (e) => {
         this.setState({
          visible3: false,
        });
      }
    //   查看详细照片
    // oriImgsClick(e) {
    //     alert('12')
    //     e.stopPropagation();
    //     let { entity} = this.props;
    //     if (!entity.images || !entity.images.length) return;
    //     this.setState({
    //         showImg: true,
    //         imgs: entity.images
    //     });
    // }
    showPicture(e,item){
        this.detail=e.target
        // console.log(item,'item')
        // console.log( this.detail,' this.detail')
        this.setState({
            visible9:true,
             detail:item
        })
    }
    handleCancel9= (e) =>{
        this.setState({
            visible9:false,
            visible3: false, 
        })
    }
    backPhone(){
        this.setState({
            visible9:false,
        })
    }
    render() {
        // console.log(this.state.detail,'detaildetaildetail')
       let  oriImgs;
       let entity;
        if(this.state.ServivingData!=null && this.state.ServivingData.images!=null && this.state.ServivingData!='undefind' && this.state.ServivingData.images!='undefind'){
           entity=this.state.ServivingData.images;  
        //   console.log(entity,'entity')
           oriImgs=entity.map((item,i)=>{
                  return <img key={i} alt="图片" className='ps-rect-img'   onClick={(e) => this.showPicture(e,item)} src={"/api/" + this.state.ServivingData.images[i]} />;
         })}
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>)
          const  {getFieldDecorator} = this.props.form;
        return (
            <div className='vip'>
             <Modal
            title="设备维护明细单"
            visible={this.state.visible3}
            // onOk={this.handleOk3.bind(this)}
            onCancel={this.handleCancel3.bind(this)}
            width={1400}
            bodyStyle={{width:'1400px',height:'700px'}}
            footer={null}
            centered={true}
            >
            {/* <ServicingDetail></ServicingDetail> */}
                <InProcess ztList={this.state.zt} Ok={this.Ok.bind(this)}></InProcess>

           </Modal>
           {/* 详细照片 */}
           <Modal
            title="详细照片"
            visible={this.state.visible9}
            // onOk={this.handleOk3.bind(this)}
            onCancel={this.handleCancel9.bind(this)}
            width={700}
            bodyStyle={{width:'700px',height:'600px'}}
            footer={null}
            centered={true}>   
             <div>
            <Button type="primary"  onClick={() => this.backPhone()} >后退</Button>
            </div>
            {/* {this.state.detail} */}
            <div>
            {/* {oriImgs} */}
            <img alt="图片"   src={"/api/" + this.state.detail} />
              {/* this.detail */}
            </div>
           </Modal>
             <div className="ps-wd-title">
              <span className="ps-wd-title-center">设备维护明细单</span>
              <span className="ps-wd-title-right">{this.state.ServivingData.rectificationSerial}</span>
             </div>   
              <div className="left">
              断线报警
              </div>
               <div className="right">
               <table border="1">
                  <tbody>
                    <tr>
                        <td className="ps-weight-label">报警时间</td>
                        <td>{this.state.ServivingData.gmtModified}</td>
                        <td className="ps-weight-label">报警设施</td>
                        <td>{this.state.tableInMain.facilityName}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">报警设备</td>
                        <td>{this.state.tableInMain.deviceTypeName}</td>
                        <td className="ps-weight-label">报警类型</td>
                        <td>{this.state.tableInMain.alarmTypeName}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">维护人</td>
                        <td>{this.state.ServivingData.personnelName}</td>
                        <td className="ps-weight-label">维护状态</td>
                        <td>{this.state.ServivingData.processStateName}</td>
                    </tr>
                    
                     </tbody>
                 </table> 
                 <div className="one">
                    <div className="titl">设备故障原因</div>
                    <div className="content">{this.state.ServivingData.content}</div>
                </div>
                {/* 照片 */}
                <div className="two">
                    <div className="titl">故障处照片</div>
                    <div className="content"  >
                    {oriImgs}
                    {/* <img  className="ps-rect-img"  src={"/api/" +this.state.ServivingData.images } /> */}
                    </div>
                </div>
                {/* 备注 */}
                <div className="tree">
                    <div className="titl">备注</div>
                    <div className="content">{this.state.ServivingData.remark}</div>
                </div>
               
               </div>
               <div className="btn">
                 {/* <Button className="one" onClick={this.submitA.bind(this)} >递交报告</Button> */}
                 {/* <Button className="two" >重新编辑</Button> */}
                 {/* <Button className="tree">查看日志</Button> */}
                </div>
            {/* 保存并上传 */}
                
           </div>
        )}
        }

        const WrappedApp = Form.create()(ServicingDetail );

export default WrappedApp;
