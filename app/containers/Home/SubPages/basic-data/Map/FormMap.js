import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormMap extends React.Component {
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
                    label="闸门编码	"
                     >
                    {getFieldDecorator('oCode', {
                        rules: [ {
                             required: true, message: '闸门编码	!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                     >
                    {getFieldDecorator('oName', {
                        rules: [{
                          required: true, message: '名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号"
                     >
                    {getFieldDecorator('oPassword', {
                        rules: [{
                          required: true, message: '型号',
                        }],
                    })(
                    <Input type="password1" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="规格"
                     >
                    {getFieldDecorator('email1', {
                        rules: [
                        {
                          required: true, message: '请输入 规格!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="生产厂商"
                     >
                    {getFieldDecorator('email2', {
                        rules: [
                        {
                          required: true, message: '请输入 生产厂商',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型式"
                     >
                    {getFieldDecorator('email3', {
                        rules: [
                        {
                          required: true, message: '请输入型式!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文简写"
                     >
                    {getFieldDecorator('email13', {
                        rules: [
                        {
                          required: true, message: '请输入中文简写!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="拼音或首字母"
                     >
                    {getFieldDecorator('email111', {
                        rules: [
                        {
                          required: true, message: '请输入拼音或首字母!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
               
              
               
                
                {/* <FormItem
                    {...formItemLayout}
                    label="所属河流"
                     >
                    {getFieldDecorator('region', {
                        rules: [{
                          required: true, message: '请输入 所属河流!',
                        }],
                    })(
                    <TreeSelect
                        // value={this.state.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="请选择"
                        treeDefaultExpandAll
                        onChange={this.ontreeChange}
                        disabled={this.state.disabled}
                      />
                    )}
                </FormItem> */}
                {/* <FormItem
                    label="里程"
                    {...formItemLayout} >
                        {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                        <Select disabled={this.state.disabled}
                          placeholder="Select a option and change input text above"
                          onChange={this.handleSelectChange}
                        >
                          <Select.Option value="1">male</Select.Option>
                          <Select.Option value="0">female</Select.Option>
                        </Select>
                        )}
                </FormItem> */}
                
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

const WrappedApp = Form.create()(FormMap);

export default WrappedApp;