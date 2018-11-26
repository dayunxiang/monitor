import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover,Upload,message  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
//import BaseSubPage from '../../BaseSubPage.js'
import {warmingMe,query} from '../../../../../data/dataStore.js'; //引入url

//import Base from '../../Global/Base/Base.js'
// import '../Inspectors/style.css'
import '../WarningMessage/warning.css'
import moment from 'moment';
const FormItem = Form.Item;

class BeginMaintenance extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            tableData:[],
            tableData2:this.props.ztList,
            at:this.props.cuandi,
            // 上传
            previewVisible: false,
            previewImage: '',
            fileList: [],
          };
      }
    //   上传事件
    // handleCancel = () => this.setState({ previewVisible: false })
    // handlePreview = (file) => {
    //   this.setState({
    //     previewImage: file.url || file.thumbUrl,
    //     previewVisible: true,
    //   });
    // }
    // handleChange = ({ fileList }) => this.setState({ 
    //     fileList 
    // })
    handleCancel() {
        this.setState({ previewVisible: false })
    }
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    handleChange({fileList}) {
        this.setState({ fileList })
    }

    // 事件
    componentDidMount(){
    //   this.warmingMess()
    // this.query()
        }
    async warmingMess() {
         let item = this.props.form.getFieldsValue();
        let filedata = new FormData();
            filedata.append('alarmId', this.state.tableData2.id);
            filedata.append('content', item.wlName);
            filedata.append('remark', item.remarks);
            // filedata.append('files', file.originFileObj);
            // // filedata.append('files', file.originFileObj);   
            if(Array.isArray(this.state.fileList)){
                this.state.fileList.forEach((file) => {
                    filedata.append('files', file.originFileObj);
                })
            }         
        let data = await warmingMe(filedata).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200) {  
            this.props.handleOk()
            message.success((data.msg))
      }

 }
//  查询
// async query() {
//     let at=3;
//     let data = await query(at).then((res) =>{ return res.json();}).catch(ex => {});
//     if (data.code==200) {
//     // data.data.forEach((item) => {
//     //     item.key = item.id
//     // })
//      console.log(data.data,'查询的值是多少')
//     // this.setState({
//     //     loading: false,
//     //     tableData:data.data
//     // })
// }

// }
// 正式开始整改
  
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields(
          (err) => {
            if (!err) {
              console.info('success');
            }
          },
        );
        window.setTimeout(() => {return this.props.form.resetFields()},1000)
        
    }
    handleUpload=(record)=>{
        console.log(record,'试一下')
       
    }
    // 递交按钮
    submitUp = () => { // 此处使用箭头函数，避免bind绑定
         this.warmingMess()
        //  this.props.handleOk()
    }
    int(e){
        console.log(this.e.target,'////////////////////????')
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
             <div className="ps-wd-title">
              <span className="ps-wd-title-center">设备维护明细单</span>
              <span className="ps-wd-title-right">{this.state.tableData2.rectificationSerial}</span>
             </div>    
                <table border="1">
                  <tbody>
                    <tr>
                        <td className="ps-weight-label">报警设备</td>
                        <td>{this.state.tableData2.deviceName}</td>
                        <td className="ps-weight-label">报警时间</td>
                        <td>{this.state.tableData2.gmtModified}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">维护责任单位</td>
                        <td></td>
                        <td className="ps-weight-label">报警设施</td>
                        <td>{this.state.tableData2.facilityName}</td>
                    </tr>
                    <tr>
                        <td className="ps-weight-label">报警类型</td>
                        <td>{this.state.tableData2.alarmTypeName}</td>
                        <td className="ps-weight-label">维护状态</td>
                        <td>待维护</td>
                    </tr>
                    </tbody>
                 </table>
            <div className="reason">
             <Form onSubmit={this.handleSubmit.bind(this)} >
                 <FormItem
                 className='j'
                    {...formItemLayout}
                    label="设备故障原因"
                     >
                    {getFieldDecorator('wlName', {
                        rules: [ {
                             required: true, message: '请填写原因!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 500 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="故障处照片"
                     >
                    {getFieldDecorator('photo', {
                        rules: [ {
                             required: true, message: '请填写原因!',
                        }],
                    })(
                  <div className="clearfix">
                     <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            beforeUpload={(file) => {
                                this.setState(({ fileList }) => ({
                                  fileList: [...fileList, file],
                                }));
                                return false;
                            }}
                        >
                    {fileList.length >= 5 ? null : uploadButton}  
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                 </div>               
                   )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                     >
                    {getFieldDecorator('remarks', {
                        rules: [ {
                             required: true, message: '请填写原因!',
                        }],
                    })(
                    <Input  disabled={this.state.disabled}  style={{ width: 500 ,height:60}}/>
                    )}
                </FormItem>
            </Form>

            </div>
            {/* 保存并上传 */}
            <Button onClick={this.submitUp.bind(this)} >保存并上传</Button>
           </div>
          
        )}
        }

        const WrappedApp = Form.create()(BeginMaintenance );

export default WrappedApp;
