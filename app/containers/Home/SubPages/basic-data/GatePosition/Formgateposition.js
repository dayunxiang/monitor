import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class Formgateposition extends React.Component {
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
                    label="闸位仪编码"
                     >
                    {getFieldDecorator('gpCode', {
                        rules: [ {
                             required: true, message: '闸位仪编码!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="闸位仪名称"
                     >
                    {getFieldDecorator('gpName', {
                        rules: [{
                          required: true, message: '闸位仪名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号"
                     >
                    {getFieldDecorator('gpModel', {
                        rules: [{
                          
                        }],
                    })(
                    <Input type="text" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="规格"
                     >
                    {getFieldDecorator('gpSpec', {
                        rules: [{
                          
                        }],
                    })(
                    <Input type="text" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="防护等级"
                     >
                    {getFieldDecorator('gpRange', {
                        rules: [
                        {
                          required: true, message: '请输入防护等级',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="转速"
                     >
                    {getFieldDecorator('gpRotationRate', {
                        rules: [{
                            // required: false ,type:"number", message: '请输入数值类型'
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大圈数"
                     >
                    {getFieldDecorator('gpMaxCircleNum', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最高工作水温"
                     >
                    {getFieldDecorator('gpMaxWorkWaterTemperature', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最低工作水温"
                     >
                    {getFieldDecorator('gpMinWorkWaterTemperature', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                
                <FormItem
                    {...formItemLayout}
                    label="生产厂商"
                     >
                    {getFieldDecorator('gpManufacturer', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文简写"
                     >
                    {getFieldDecorator('gpChineseShort', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="拼音或首字母"
                     >
                    {getFieldDecorator('gpPinyinInitial', {
                        rules: [{
                          
                        }],
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

const WrappedApp = Form.create()(Formgateposition);

export default WrappedApp;