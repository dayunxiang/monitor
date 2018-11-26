import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker } from '../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import "./style.css";

class AlternatorForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled:this.props.disabled == null ? true : this.props.disabled
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
                            label="日期   "
                             >
                            {getFieldDecorator('atDate', {
                                rules: [ {
                                     required: true, message: '请填写日期!',

                                }],
                            })(
                            <DatePicker style={{width:"100%"}}  locale={locale} format="YYYY-MM-DD" disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="动车"
                             >
                            {getFieldDecorator('atMotorCar', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="发电"
                             >
                            {getFieldDecorator('atGeneration', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="油温"
                             >
                            {getFieldDecorator('atOilTemperature', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="水温"
                             >
                            {getFieldDecorator('atWaterTemperature', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="HZ"
                             >
                            {getFieldDecorator('atHz', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电压V"
                             >
                            {getFieldDecorator('atVoltage', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电流A1"
                             >
                            {getFieldDecorator('atA1', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电流A2"
                             >
                            {getFieldDecorator('atA2', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="电流A3"
                             >
                            {getFieldDecorator('atA3', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="操作者"
                             >
                            {getFieldDecorator('atOperator', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="记录人员"
                             >
                            {getFieldDecorator('atRecorder', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="运行情况"
                             >
                            {getFieldDecorator('atRunStatus', {
                                rules: [],
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
                            {getFieldDecorator('atRemark', {
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

const WrappedApp = Form.create()(AlternatorForm);

export default WrappedApp;