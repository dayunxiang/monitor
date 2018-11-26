import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormWaterPump extends React.Component {
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
                    label="水泵编码"
                     >
                    {getFieldDecorator('wpCode', {
                        rules: [ {
                             required: true, message: '请填写水位仪编码!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="水泵名称"
                     >
                    {getFieldDecorator('wpName', {
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
                    {getFieldDecorator('wpModel', {
                        rules: [
                        {
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
                    {getFieldDecorator('wpSpec', {
                        rules: [{
                          required: true, message: '请输入 规格!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    label="泵宽"
                    {...formItemLayout} >
                        {getFieldDecorator('wpPumpWidth', {
                        rules: [{ required: true, message: '请填写泵宽' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="流量"
                    {...formItemLayout} >
                        {getFieldDecorator('wpFlow', {
                        rules: [{ required: true, message: '请填写建设单位' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="生产厂商"
                    {...formItemLayout} >
                        {getFieldDecorator('wpManufacturer', {
                        rules: [{ required: true, message: '请填写生产厂商' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="拼音或首字母"
                    {...formItemLayout} >
                        {getFieldDecorator('wpPinyinInitial', {
                        rules: [{ required: true, message: '请填写拼音或首字母' }],
                        })(
                        <Input disabled={this.state.disabled}/>
                        )}
                </FormItem>
                <FormItem
                    label="中文简写"
                    {...formItemLayout} >
                        {getFieldDecorator('wpChineseShort', {
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
        // console.log(value);
    }

   

    
}

const WrappedApp = Form.create()(FormWaterPump);

export default WrappedApp;