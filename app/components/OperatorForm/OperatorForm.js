import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class OperatorForm extends React.Component {
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
                    label="用户编码"
                     >
                    {getFieldDecorator('oCode', {
                        rules: [ {
                             required: true, message: '请输入用户编码!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名称"
                     >
                    {getFieldDecorator('oName', {
                        rules: [{
                          required: true, message: '请输入用户名称!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                     >
                    {getFieldDecorator('oPassword', {
                        rules: [{
                          required: true, message: '请输入用户密码!',
                        }],
                    })(
                    <Input type="password" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                     >
                    {getFieldDecorator('email', {
                        rules: [{
                          type: 'email', message: '非法 E-mail!',
                        }, {
                          required: true, message: '请输入 E-mail!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="区域"
                     >
                    {getFieldDecorator('region', {
                        rules: [{
                          required: true, message: '请输入 region!',
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
                </FormItem>
                <FormItem
                    label="Gender"
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

const WrappedApp = Form.create()(OperatorForm);

export default WrappedApp;