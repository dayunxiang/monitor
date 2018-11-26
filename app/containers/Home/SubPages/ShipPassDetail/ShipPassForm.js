import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker, InputNumber  } from '../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import "./style.css";

class ShipPassForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled:this.props.disabled == null ? true : this.props.disabled
        }
        this.handleCheckCloseTime = (rule, value, callback) => {
            const { getFieldValue } = this.props.form;
            
            if (value && value < getFieldValue('pgfPumpOpenTime')) {
                return callback('必须大于开启日期')
            }
            return callback();
        }
        this.handleCheckCloseTime2 = (rule, value, callback) => {
            const { getFieldValue } = this.props.form;
           
            if (value && value < getFieldValue('pgfGateStartTime')) {
                return callback('必须大于开启日期')
            }
            return callback();
        }
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
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
        const formLayout = {
            md:8,
            xs:24
        }
        
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} >
                <Row>
                    
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="闸门启闭次数(上行)"
                             >
                            {getFieldDecorator('spGateOpenCountUp', {
                                rules: [{  required: true, message: '请填写闸门启闭次数!' },{  type: "number", message: '请填写数字!' }],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="闸门启闭次数(下行)"
                             >
                            {getFieldDecorator('spGateOpenCountDown', {
                                rules: [{  required: true, message: '请填写闸门启闭次数!' },{  type: "number", message: '请填写数字!' }],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="白天闸费"
                             >
                            {getFieldDecorator('spDayCost', {
                                rules: [ ],
                                
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="白天船只数量"
                             >
                            {getFieldDecorator('spDayCount', {
                                rules: [],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="白天船只吨位"
                             >
                            {getFieldDecorator('spDayTon', {
                                rules: [],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="加闸闸费"
                             >
                            {getFieldDecorator('spAddGateCost', {
                                rules: [],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="加闸船只数"
                             >
                            {getFieldDecorator('spAddGateCount', {
                                rules: [],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="加闸吨位"
                             >
                            {getFieldDecorator('spAddGateTon', {
                                rules: [],
                            })(
                            <InputNumber style={{width:"100%"}} disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="填报人"
                             >
                            {getFieldDecorator('spReporter', {
                                rules: [{  required: true, message: '请填写填报人!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    
                    
                </Row>
                
            </Form>
        );
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.disabled !== this.state.disabled) {
            this.setState({
                disabled:nextProps.disabled
            });
        }
    }

    handleSelectChange(e){
        // e.preventDefault();
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
    componentDidMount() {
        
    }
   
    ontreeChange(value){
        console.log(value);
    }

   

    
}

const WrappedApp = Form.create()(ShipPassForm);

export default WrappedApp;