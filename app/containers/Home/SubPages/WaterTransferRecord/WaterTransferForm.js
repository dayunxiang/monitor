import React from 'react';
// import ReactDOM from 'react-dom'
import {  Modal, TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker, InputNumber,Upload  } from '../../../../components/Antd.js';

const Option = Select.Option;

class WaterTransferForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            content: "",
            previewVisible2: false,
            previewImage2: '',
            fileList2: [],
            content2: "",
            wtOutRunTime: "",
            wtOutAmount: "",
            wtInRunTime: "",
            wtInAmount: "",
            wtOutType: "",
            wtReporter: ""
        };
        this._search = {
            
        }

    }

    render() {
        const { previewVisible, previewImage, fileList,previewVisible2, previewImage2, fileList2 } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        let options = this.props.dictData && Array.isArray(this.props.dictData.pilotage_drain_mode) && this.props.dictData.pilotage_drain_mode.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        })
        return (
            <Row>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">排水运动时间</label></Col>
                    <Col xs={16}>
                        <Input defaultValue={this.state.wtOutRunTime} onChange={this.inputChange1.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">排水量(立方米)</label></Col>
                    <Col xs={16}>
                        <Input defaultValue={this.state.wtOutAmount} onChange={this.inputChange2.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">引水运动时间</label></Col>
                    <Col xs={16}>
                        <Input defaultValue={this.state.wtInRunTime} onChange={this.inputChange3.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">引水量(立方米)</label></Col>
                    <Col xs={16}>
                        <Input defaultValue={this.state.wtInAmount} onChange={this.inputChange4.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">引排水方式</label></Col>
                    <Col xs={16}>
                        <Select defaultValue={this.state.wtOutType} onChange={this.inputChange5.bind(this)} style={{width:"100%"}}>
                            {options}
                        </Select>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">填报人</label></Col>
                    <Col xs={16}>
                        <Input defaultValue={this.state.wtReporter} onChange={this.inputChange6.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
                    </Col>
                </Col>
                
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">调水前照片</label></Col>
                    <Col xs={16}>
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
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputDescChange2.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">调水后照片</label></Col>
                    <Col xs={16}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList2}
                            onPreview={this.handlePreview2.bind(this)}
                            onChange={this.handleChange2.bind(this)}
                            beforeUpload={(file) => {
                                this.setState(({ fileList }) => ({
                                  fileList2: [...fileList, file],
                                }));
                                return false;
                            }}
                        >
                          {fileList2.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </Col>
                </Col>
                <Col xs={24}>
                    <div className="ps-rect-tools">
                        <Button className="ps-rect-sure" type="primary" loading={this.state.loading} onClick={this.submitClick.bind(this)}>确认</Button>
                        <Button className="ps-rect-cancel" type="default" onClick={this.cancelClick.bind(this)}>取消</Button>
                    </div>
                </Col>
            </Row>
        );
    }
    // wtOutRunTime: 0,
    //         wtOutAmount:  0,
    //         wtInRunTime: 0,
    //         wtInAmount: 0,
    //         wtOutType:"",
    //         wtReporter:""
    inputChange1(e) {
        this.setState({
            wtOutRunTime: e.target.value
        });
    }
    inputChange2(e) {
        this.setState({
            wtOutAmount: e.target.value
        });
    }
    inputChange3(e) {
        this.setState({
            wtInRunTime: e.target.value
        });
    }
    inputChange4(e) {
        this.setState({
            wtInAmount: e.target.value
        });
    }
    inputChange5(e) {
        this.setState({
            wtOutType: e
        });
    }
    inputChange6(e) {
        this.setState({
            wtReporter: e.target.value
        });
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
    handleCancel() {
        this.setState({ previewVisible: false })
    }
    handlePreview2(file) {
        this.setState({
            previewImage2: file.url || file.thumbUrl,
            previewVisible2: true
        });
    }
    handleChange2({fileList}) {
        this.setState({ fileList2: fileList })
    }
    handleCancel2() {
        this.setState({ previewVisible2: false })
    }
    inputChange(e) {
        let content = e.target.value;
        this.setState({ content});
    }
    inputDescChange2(e) {
       let content = e.target.value;
        this.setState({ content2: content});
    }
    submitClick() {
        let success = () => {
            this.setState({
                loading: false
            });
        };
        this.setState({
            loading: true
        });
        let {onSubmit} = this.props;
        let value = {
            fileList: this.state.fileList, 
            content: this.state.content, 
            fileList2: this.state.fileList2, 
            content2: this.state.content2,
            wtOutRunTime: this.state.wtOutRunTime,
            wtOutAmount: this.state.wtOutAmount,
            wtInRunTime: this.state.wtInRunTime,
            wtInAmount: this.state.wtInAmount,
            wtOutType: this.state.wtOutType,
            wtReporter: this.state.wtReporter
        }
        onSubmit && onSubmit(this.props.entity, value, success);
    }
    cancelClick() {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    componentDidMount() {
        
    }
    // static getDerivedStateFromProps(props, state) {
    //     let nextState = {
    //         previewVisible: state.previewVisible,
    //         previewImage: state.previewImage,
    //         fileList: state.fileList
    //     }
    //     if (props.show === false) {
    //         nextState.fileList = [];
    //     }
    //     return nextState;
    // }
}

export default WaterTransferForm;
// // --------------------
// const Option = Select.Option;
// const FormItem = Form.Item;
// import locale from 'antd/lib/date-picker/locale/zh_CN';
// // import "./style.css";

// class WaterTransferForm extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         this.state = {
//             disabled:this.props.disabled == null ? true : this.props.disabled
//         }
        
//     }
    
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         const formItemLayout = {
//             labelCol: {
//                 xs: { span: 24 },
//                 sm: { span: 6 },
//             },
//             wrapperCol: {
//                 xs: { span: 24 },
//                 sm: { span: 14 },
//             },
//         };
//         const formLayout = {
//             md:8,
//             xs:24
//         }
//         let options = this.props.dictData && Array.isArray(this.props.dictData.pilotage_drain_mode) && this.props.dictData.pilotage_drain_mode.map(({text, value}) => {
//             return <Option key={value} value={value}>{text}</Option>;
//         })
//         return (
//             <Form onSubmit={this.handleSubmit.bind(this)} >
//                 <Row>
                    
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="排水运动时间"
//                              >
//                             {getFieldDecorator('wtOutRunTime', {
//                                 rules: [{  required: true, message: '请填写排水运动时间!' },{  type: "number", message: '请填写数字!' }],
//                             })(
//                             <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
//                             )}
//                         </FormItem>
//                     </Col>
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="排水量(立方米)"
//                              >
//                             {getFieldDecorator('wtOutAmount', {
//                                 rules: [{  required: true, message: '请填写排水量!' },{  type: "number", message: '请填写数字!' }],
//                             })(
//                             <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
//                             )}
//                         </FormItem>
//                     </Col>
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="引水运动时间"
//                              >
//                             {getFieldDecorator('wtInRunTime', {
//                                 rules: [{  required: true, message: '请填写引水运动时间!' },{  type: "number", message: '请填写数字!' } ],
                                
//                             })(
//                             <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
//                             )}
//                         </FormItem>
//                     </Col>
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="引水量(立方米)"
//                              >
//                             {getFieldDecorator('wtInAmount', {
//                                 rules: [{  required: true, message: '请填写排水量!' },{  type: "number", message: '请填写数字!' }],
//                             })(
//                             <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
//                             )}
//                         </FormItem>
//                     </Col>
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="引排水方式"
//                              >
//                             {getFieldDecorator('wtOutType', {
//                                 rules: [],
//                             })(
//                             <Select>
//                                 {options}
//                             </Select>
//                             )}
//                         </FormItem>
//                     </Col>
//                     <Col {...formLayout}>
//                         <FormItem
//                             {...formItemLayout}
//                             label="填报人"
//                              >
//                             {getFieldDecorator('wtReporter', {
//                                 rules: [{  required: true, message: '请填写填报人!' }],
//                             })(
//                             <Input disabled={this.state.disabled}/>
//                             )}
//                         </FormItem>
//                     </Col>
                    
                    
//                 </Row>
//                 <Row>
//                     <Col xs={24} className="ps-rect-margintop10">
//                         <Col xs={8}><label className="ps-search-label">照片类别</label></Col>
//                         <Col xs={16}>
//                             <Select style={{width: "100%"}} defaultValue={1} onChange={this.inputTypeChange.bind(this)}>
//                                 <Option value={1}>调水前</Option>
//                                 <Option value={2}>调水后</Option>
//                             </Select>
//                         </Col>
//                     </Col>
//                     <Col xs={24} className="ps-rect-margintop10">
//                         <Col xs={8}><label className="ps-search-label">描述</label></Col>
//                         <Col xs={16}>
//                             <Input onChange={this.inputChange.bind(this)}></Input>
//                         </Col>
//                     </Col>
                    
//                     <Col xs={24} className="ps-rect-margintop10">
//                         <Col xs={8}><label className="ps-search-label">上传照片</label></Col>
//                         <Col xs={16}>
//                             <Upload
//                                 listType="picture-card"
//                                 fileList={fileList}
//                                 onPreview={this.handlePreview.bind(this)}
//                                 onChange={this.handleChange.bind(this)}
//                                 beforeUpload={(file) => {
//                                     this.setState(({ fileList }) => ({
//                                       fileList: [...fileList, file],
//                                     }));
//                                     return false;
//                                 }}
//                             >
//                               {fileList.length >= 5 ? null : uploadButton}
//                             </Upload>
//                             <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
//                                 <img alt="example" style={{ width: '100%' }} src={previewImage} />
//                             </Modal>
//                         </Col>
//                     </Col>
//                     <Col xs={24}>
//                         <div className="ps-rect-tools">
//                             <Button className="ps-rect-sure" type="primary" loading={this.state.loading} onClick={this.submitClick.bind(this)}>确认</Button>
//                             <Button className="ps-rect-cancel" type="default" onClick={this.cancelClick.bind(this)}>取消</Button>
//                         </div>
//                     </Col>
//                 </Row>
//             </Form>
//         );
//     }
//     componentWillReceiveProps(nextProps){
//         if (nextProps.disabled !== this.state.disabled) {
//             this.setState({
//                 disabled:nextProps.disabled
//             });
//         }
//     }

//     handleSelectChange(e){
//         // e.preventDefault();
//     }
//     handleSubmit(e){
//         e.preventDefault();
//         this.props.form.validateFields(
//           (err) => {
//             if (!err) {
//               console.info('success');
//             }
//           },
//         );
//         // var vals = this.props.form.getFieldsValue();
//         // console.log(vals);
//         window.setTimeout(() => {return this.props.form.resetFields()},1000)
        
//     }
//     componentDidMount() {
        
//     }
   
//     ontreeChange(value){
//         console.log(value);
//     }

   

    
// }

// const WrappedApp = Form.create()(WaterTransferForm);

// export default WrappedApp;