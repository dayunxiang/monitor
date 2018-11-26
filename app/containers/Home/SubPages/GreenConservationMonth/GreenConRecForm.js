import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker } from '../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import "./style.css";

class GreenConRecForm extends React.Component {
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
        let options = this.props.dictData && this.props.dictData.map(({mainTypeConde, mainTypeName}) => {
            return <Option key={mainTypeConde} value={mainTypeConde}>{mainTypeName}</Option>;
        });
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} >
                <Row>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="名称"
                             >
                            {getFieldDecorator('gcfName', {
                                rules: [ {
                                     required: true, message: '请填写名称!',

                                }],
                            })(
                            <Select disabled={this.state.disabled}>
                                {options}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="计划数量"
                             >
                            {getFieldDecorator('gcfPlanNum', {
                                rules: [],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="完成数量"
                             >
                            {getFieldDecorator('gcfFinNum', {
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
                            {getFieldDecorator('gcfRemark', {
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

const WrappedApp = Form.create()(GreenConRecForm);

export default WrappedApp;