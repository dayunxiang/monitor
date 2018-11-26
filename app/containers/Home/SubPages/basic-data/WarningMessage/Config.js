import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,Upload   } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {readyy} from '../../../../../data/dataStore.js'; //引入url
import InProcess from '../../basic-data/WarningMessage/InProcess.js' //递交组件
//import Base from '../../Global/Base/Base.js'
// import '../Inspectors/style.css'
import '../WarningMessage/warning.css'
import moment from 'moment';
const FormItem = Form.Item;

class Config extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.Ok=this.Ok.bind(this)
        this.state = {
            tableData:[],
            ConfigData:this.props.inconfig,
            // 上传
            previewVisible: false,
            previewImage: '',
            fileList: [],
            tableDataconfig:[],
            tableDataconfig1:[]
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
       this.ftao()
        }
    async ftao() {
        let item = this.props.form.getFieldsValue();
        let data1 =  {
            alarmId:this.state.ConfigData.id,
       };
        let data = await readyy(data1).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
        // data.data.forEach((item) => {
        //     item.key = item.id
        // })
        //  console.log(data.data,'维护编号详细信息')
        this.setState({
            loading: false,
             tableDataconfig:data.data[0],
             tableDataconfig1:data.data[1]

        })
    }

 }
// 正式开始整改
    beginNext=()=>{
            // console.log(record,'record')
            this.setState({
                visible3: true,
                //  visible:false
                // zt:record,
            });

        }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields(
          (err) => {
            if (!err) {
            //   console.info('success');
            }
          },
        );
        // var vals = this.props.form.getFieldsValue();
        // console.log(vals);
        window.setTimeout(() => {return this.props.form.resetFields()},1000)
        
    }
    // handleUpload(){
        
    // }
    handleUpload=(record)=>{
        // console.log(record,'试一下')
       
    }
    // submitA = () => { // 此处使用箭头函数，避免bind绑定
    //     this.props.handle()

    //     this.setState({
    //         visible3: true,
    //       });
    // }

    int(e){
        // console.log(this.e.target,'////////////////////????')
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

      AreOk(){
        this.ftao()
        this.setState({
            visible5: true,
          });
      }
      handleCancel5(){
        this.setState({
            visible5: false,
          });
      }
      handleOk5 = () => { // 此处使用箭头函数，避免bind绑定
        // this.props.AreYouOk()
        this.setState({
            visible5: false,
          });
    }
    showPictureA(e,item){
        this.setState({
            visibleA:true,
            detailA:item
        })
    }
    handleCancelA(){
        this.setState({
            visibleA:false
        })
    }
    showPictureB(e,item1){
        this.setState({
            visibleB:true,
            detailB:item1
        })
    }
    handleCancelB(){
        this.setState({
            visibleB:false
        })
    }
    backPhoneA(){
        this.setState({
            visibleA:false
        })
    }
    backPhoneB(){
        this.setState({
            visibleB:false
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        let  oriImgs;
        let entity;
         if(this.state.tableDataconfig!=null && this.state.tableDataconfig.images!=null && this.state.tableDataconfig!='undefind' && this.state.tableDataconfig.images!='undefind'){
            entity=this.state.tableDataconfig.images;  
        //    console.log(entity,'entity')
            oriImgs=entity.map((item,i)=>{
                   return <img key={i} className="ps-rect-img" alt="图片"   onClick={(e) => this.showPictureA(e,item)}  src={"/api/" + this.state.tableDataconfig.images[i]} />;
               })  
         }
         let  oriImgs1;
         let entity1;
          if(this.state.tableDataconfig1!=null && this.state.tableDataconfig1.images!=null && this.state.tableDataconfig1!='undefind' && this.state.tableDataconfig1.images!='undefind'){
             entity1=this.state.tableDataconfig1.images;  
            // console.log(entity,'entity')
             oriImgs1=entity1.map((item1,i)=>{
                    return <img key={i} className="ps-rect-img" alt="图片"  onClick={(e) => this.showPictureB(e,item1)}  src={"/api/" + this.state.tableDataconfig1.images[i]} />;
                })  
          }
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>)
          const  {getFieldDecorator} = this.props.form;

        return (
            <div className='vip'>
               {/* 详细照片A */}
           <Modal
            title="详细照片"
            visible={this.state.visibleA}
            // onOk={this.handleOk3.bind(this)}
            onCancel={this.handleCancelA.bind(this)}
            width={700}
            bodyStyle={{width:'700px',height:'600px'}}
            footer={null}
            centered={true}>   
             <div>
            <Button type="primary"  onClick={() => this.backPhoneA()} >后退</Button>
            </div>
            {/* {this.state.detail} */}
            <div>
            {/* {oriImgs} */}
            <img alt="图片"   src={"/api/" + this.state.detailA} />
              {/* this.detail */}
            </div>
           </Modal>
              {/* 详细照片B */}
              <Modal
            title="详细照片"
            visible={this.state.visibleB}
            // onOk={this.handleOk3.bind(this)}
            onCancel={this.handleCancelB.bind(this)}
            width={700}
            bodyStyle={{width:'700px',height:'600px'}}
            footer={null}
            centered={true}>   
             <div>
            <Button type="primary"  onClick={() => this.backPhoneB()} >后退</Button>
            </div>
            <div>
            {/* {oriImgs} */}
            <img alt="图片"   src={"/api/" + this.state.detailB} />
              {/* this.detail */}
            </div>
           </Modal>
            {/* 确认弹窗 */}
            <Modal
          title="待确认结果"
          visible={this.state.visible5}
           onOk={this.handleOk5.bind(this)}
          onCancel={this.handleCancel5.bind(this)}
          width={400}
          bodyStyle={{width:'300px',height:'200px'}}
        //   footer={null}
          centered={true}
          okText="确认"
          cancelText="取消"
        >
        {
            <div style={{fontSize:'18px'}}> 确定结束本次报警？</div>
        }
        </Modal>
      
            <div className="ps-wd-title">
             <span className="ps-wd-title-center">设备维护明细单</span>
             <span className="ps-wd-title-right">{this.state.tableDataconfig.rectificationSerial}</span>
            </div>   
             <div className="left">
             断线报警
             </div>
              <div className="right">
              <table border="1">
                 <tbody>
       
                   <tr>
                       <td className="ps-weight-label">报警时间</td>
                       <td>{this.state.tableDataconfig.gmtModified}</td>
                       <td className="ps-weight-label">报警设施</td>
                       <td>{this.state.ConfigData.facilityName}</td>
                   </tr>
                   <tr>
                       <td className="ps-weight-label">报警设备</td>
                       <td>{this.state.ConfigData.deviceTypeName}</td>
                       <td className="ps-weight-label">报警类型</td>
                       <td>{this.state.ConfigData.alarmTypeName}</td>
                   </tr>
                   <tr>
                       <td className="ps-weight-label">维护人</td>
                       <td>{this.state.tableDataconfig.personnelName}</td>
                       <td className="ps-weight-label">维护状态</td>
                       <td>{this.state.tableDataconfig.processStateName}</td>
                   </tr>
                   
                    </tbody>
                </table> 
                <div className="one">
                   <div className="titl">设备故障原因</div>
                   <div className="content">{this.state.tableDataconfig.content}</div>
               </div>
               {/* 照片 */}
               <div className="two">
                   <div className="titl">故障处照片</div>
                   <div className="content">
                   {oriImgs}
                   {/* {this.state.tableDataconfig.images} */}
                   {/* <img  className="ps-rect-img"  src={"/api/" +this.state.tableDataconfig.images } /> */}

                   </div>
               </div>
               {/* 备注 */}
               <div className="tree">
                   <div className="titl">备注</div>
                   <div className="content">{this.state.tableDataconfig.remark}</div>
               </div>
              

                {/* 维护结果 */}
                <div className="fruit">
                <div className="fruit_l">
                维护结果
                </div>
                <div className="fruit_r">
                <div className="one">
                   <div className="titl">维护完成说明</div>
                   <div className="content">{this.state.tableDataconfig1.content}</div>
               </div>
               {/* 照片 */}
               <div className="two">
                   <div className="titl">维护完成照片</div>
                   <div className="content">
                   {/* {this.state.tableDataconfig1.images} */}
                   {/* <img  className="ps-rect-img"  src={"/api/" +this.state.tableDataconfig1.images } /> */}
                   {oriImgs1}

                   </div>
               </div>
               {/* 备注 */}
               <div className="tree">
                   <div className="titl">备注</div>
                   <div className="content">{this.state.tableDataconfig1.remark}</div>
               </div>
                </div>
                </div>
              
              </div>
              <div className="btn">
                {/* <Button className="one" onClick={this.AreOk.bind(this)} >确认</Button> */}
                {/* <Button className="two" >重新编辑</Button> */}
                {/* <Button className="tree">查看日志</Button> */}
               </div>
           {/* 保存并上传 */}
               
          </div>
        )}
        }

        const WrappedApp = Form.create()(Config );

export default WrappedApp;
