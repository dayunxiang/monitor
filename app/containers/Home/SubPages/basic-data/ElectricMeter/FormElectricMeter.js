import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormElectricMeter extends React.Component {
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
        
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="电量仪编码"
                     >
                    {getFieldDecorator('emCode', {
                        rules: [ {
                             required: true, message: '请填写电量仪编码码!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电量仪名称"
                     >
                    {getFieldDecorator('emName', {
                        rules: [{
                          required: true, message: '请填写电量仪名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号"
                     >
                    {getFieldDecorator('emModel', {
                        rules: [{
                          required: true, message: '请输入型号',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="规格"
                     >
                    {getFieldDecorator('emSpec', {
                        rules: [
                        {
                          required: true, message: '请输入输入规格',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="生产厂商"
                     >
                    {getFieldDecorator('emManufacturerId', {
                        rules: [{
                          required: true, message: '请输入 生产厂商!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    label="拼音或首字母"
                    {...formItemLayout} >
                        {getFieldDecorator('emPinyinInitial', {
                        rules: [{ required: true, message: '请填写拼音或首字母' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="中文简写"
                    {...formItemLayout} >
                        {getFieldDecorator('emChineseShort', {
                        rules: [{ required: true, message: '请填写中文简写' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                
                
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

const WrappedApp = Form.create()(FormElectricMeter);

export default WrappedApp;