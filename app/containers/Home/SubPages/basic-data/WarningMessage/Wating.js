import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,Upload   } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {present} from '../../../../../data/dataStore.js'; //引入url
import InProcess from '../../basic-data/WarningMessage/InProcess.js' //递交组件
//import Base from '../../Global/Base/Base.js'
// import '../Inspectors/style.css'
import '../WarningMessage/warning.css'
import moment from 'moment';
const FormItem = Form.Item;

class Wating extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.Ok=this.Ok.bind(this)
        this.state = {
            tableData:[],
            tableWating:this.props.WatingList,
            // 上传
            previewVisible: false,
            previewImage: '',
            fileList: [],
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
    //   this.warmingMess()
        }
//     async lt() {
//         let item = this.props.form.getFieldsValue();
//         let filedata = new FormData();
//         filedata.append('alarmId', 1);
//         filedata.append('content', 1);
//         filedata.append('remark', 1);
//     //     let data1 =  {
//     //         alarmId:this.state.tableData2.facilityInfoId,
//     //         content: item.wlName,
//     //         remark: item.remarks,  
//     //    };
//         let data = await present(filedata).then((res) =>{ return res.json();}).catch(ex => {});
//         if (data.code==200 ) {
//         // data.data.forEach((item) => {
//         //     item.key = item.id
//         // })
//         console.log(data.data,'详细信息')
//         this.setState({
//             loading: false,
//             // tableData:data.data
//             visible3: false,

//         })
//     }

//  }
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
    submitB = () => { // 此处使用箭头函数，避免bind绑定
        this.props.handleOk()

        this.setState({
            visible3: true,
          });
    }

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
             <div className="ps-wd-title">
              <span className="ps-wd-title-center">设备维护明细单</span>
              <span className="ps-wd-title-right">{this.state.tableWating.rectificationSerial}</span>
             </div>   
              <div className="left-over">
              断线报警
              </div>
               <div className="right">
               <table border="1">
                  <tbody>
        
                    <tr>
                        <td className="ps-weight-label">报警时间</td>
                        <td>{this.state.tableWating.gmtModified}</td>
                        <td className="ps-weight-label">报警设施</td>
                        <td>{this.state.tableWating.facilityName}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">报警设备</td>
                        <td>{this.state.tableWating.deviceTypeName}</td>
                        <td className="ps-weight-label">报警类型</td>
                        <td>{this.state.tableWating.alarmTypeName}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">维护人</td>
                        <td></td>
                        <td className="ps-weight-label">维护状态</td>
                        <td>维护中</td>
                    </tr>
                    
                     </tbody>
                 </table> 
                 {/* <div className="one">
                    <div className="titl">设备故障原因</div>
                    <div className="content">闸位开度仪与内闸闸门接触不良，导致数据传输终止</div>
                </div> */}
                {/* 照片 */}
                {/* <div className="two">
                    <div className="titl">故障处照片</div>
                    <div className="content"></div>
                </div> */}
                {/* 备注 */}
                {/* <div className="tree">
                    <div className="titl">备注</div>
                    <div className="content"></div>
                </div> */}
               
               </div>
               <div className="btn">
                 <Button className="one" onClick={this.submitB.bind(this)} >开始维护</Button>
                 <Button className="two" >解除</Button>
                 <Button className="tree">查看日志</Button>
                </div>
            {/* 保存并上传 */}
                
           </div>
        )}
        }

        const WrappedApp = Form.create()(Wating );

export default WrappedApp;
