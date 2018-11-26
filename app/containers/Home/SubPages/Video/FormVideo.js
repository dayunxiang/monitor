import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormVideo extends React.Component {
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
                    label="设备编号"
                     >
                    {getFieldDecorator('fvCode', {
                        rules: [ {
                             required: true, message: '请填写设备编号!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设备名称"
                     >
                    {getFieldDecorator('fvName', {
                        rules: [{
                          required: true, message: '请填写设备名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号"
                     >
                    {getFieldDecorator('fvModel', {
                        rules: [{
                          required: true, message: '请填写型号',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="IP"
                     >
                    {getFieldDecorator('fvIP', {
                        rules: [
                        {
                          required: true, message: '请输入IP',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="端口号"
                     >
                    {getFieldDecorator('fvPort', {
                        rules: [
                        {
                          required: true, message: '请输入端口号',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="分辨率"
                     >
                    {getFieldDecorator('fvResolvingPower', {
                        rules: [
                        {
                          required: true, message: '请输入分辨率',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="生产厂商"
                     >
                    {getFieldDecorator('fvSupplier', {
                        rules: [{
                          required: true, message: '请输入 生产厂商!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                
                <FormItem
                    label="中文简写"
                    {...formItemLayout} >
                        {getFieldDecorator('fvChineseShort', {
                        rules: [{ required: true, message: '请填写中文简写' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="拼音或首字母"
                    {...formItemLayout} >
                        {getFieldDecorator('fvPinyinInitial', {
                        rules: [{ required: true, message: '请填写拼音或首字母' }],
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

const WrappedApp = Form.create()(FormVideo);

export default WrappedApp;