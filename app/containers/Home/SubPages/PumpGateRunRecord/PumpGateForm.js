import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker } from '../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import "./style.css";

class PumpGateForm extends React.Component {
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
        const { getFieldDecorator, validateFields } = this.props.form;
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
                            label="泵号"
                             >
                            {getFieldDecorator('pgfPumpNo', {
                                rules: [{  required: true, message: '请填写泵号!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="泵启动时间"
                             >
                            {getFieldDecorator('pgfPumpOpenTime', {
                                rules: [{  required: true, message: '请填写日期!' }],
                            })(
                            <DatePicker style={{width:"100%"}} locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="泵停机时间"
                             >
                            {getFieldDecorator('pgfPumpCloseTime', {
                                rules: [ {  required: true, message: '请填写日期!' }, {validator: this.handleCheckCloseTime}],
                                
                            })(
                            <DatePicker style={{width:"100%"}}  locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电压(V)"
                             >
                            {getFieldDecorator('pgfVoltage', {
                                rules: [{  required: true, message: '请填写电压!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电流(A)"
                             >
                            {getFieldDecorator('pgfElectric', {
                                rules: [{  required: true, message: '请填写电流!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="闸门开启时间"
                             >
                            {getFieldDecorator('pgfGateStartTime', {
                                rules: [{  required: true, message: '请填写日期!' }],
                            })(
                            <DatePicker style={{width:"100%"}}  locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="闸门结束时间"
                             >
                            {getFieldDecorator('pgfGateCloseTime', {
                                rules: [{  required: true, message: '请填写日期!' },{validator: this.handleCheckCloseTime2}],
                            })(
                            <DatePicker style={{width:"100%"}}  locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="操作员"
                             >
                            {getFieldDecorator('pgfOperator', {
                                rules: [{  required: true, message: '请填写操作员!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="填报人"
                             >
                            {getFieldDecorator('pgfReporter', {
                                rules: [{  required: true, message: '请填写填报人!' }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                             >
                            {getFieldDecorator('pgfRemark', {
                                rules: [],
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

const WrappedApp = Form.create()(PumpGateForm);

export default WrappedApp;