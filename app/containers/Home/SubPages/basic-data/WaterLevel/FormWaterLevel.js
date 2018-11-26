import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormWaterLevel extends React.Component {
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
        const treeData = [{
              title: 'Node1',
              value: "10",
              key: '0-0',
              children: [{
                title: 'Child Node1',
                value: "11",
                key: '0-0-1',
              }, {
                title: 'Child Node2',
                value: "12",
                key: '0-0-2',
              }],
            }, {
              title: 'Node2',
              value: "20",
              key: '0-1',
            }];
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="唯一识别码"
                     >
                    {getFieldDecorator('wlCode', {
                        rules: [ {
                             required: true, message: '请填写唯一编码!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="水位仪名称"
                     >
                    {getFieldDecorator('wlName', {
                        rules: [{
                          required: true, message: '请填写水位仪名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号"
                     >
                    {getFieldDecorator('wlModel', {
                        rules: [{
                          
                        }],
                    })(
                    <Input type="text" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型式"
                     >
                    {getFieldDecorator('wlSpec', {
                        rules: [{
                          
                        }],
                    })(
                    <Input type="text" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="量程(米)"
                     >
                    {getFieldDecorator('wlRange', {
                        rules: [
                        {
                          required: true, message: '请输入量程',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大水位变率"
                     >
                    {getFieldDecorator('wlMaxChangeRate', {
                        rules: [{
                            // required: false ,type:"number", message: '请输入数值类型'
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="分辨率"
                     >
                    {getFieldDecorator('wlResolvingPower', {
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
                    {getFieldDecorator('wlMaxWorkWaterTemperature', {
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
                    {getFieldDecorator('wlMinWorkWaterTemperature', {
                        rules: [{
                          
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最高工作环境温度"
                     >
                    {getFieldDecorator('wlMaxWorkAmbientTemperature', {
                        rules: [{
                            
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最低工作环境温度"
                     >
                    {getFieldDecorator('wlMinWorkAmbientTemperature', {
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
                    {getFieldDecorator('wlManufacturer', {
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
                    {getFieldDecorator('wlChineseShort', {
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
                    {getFieldDecorator('wlPinyinInitial', {
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
        // console.log(value);
    }

   

    
}

const WrappedApp = Form.create()(FormWaterLevel);

export default WrappedApp;