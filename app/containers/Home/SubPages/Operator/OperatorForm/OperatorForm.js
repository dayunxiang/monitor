import React from 'react';
// import ReactDOM from 'react-dom'
import { TreeSelect, Form, Input, Select } from '../../../../../components/Antd.js';

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
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="用户编码"
                     >
                    {getFieldDecorator('userCode', {
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
                    {getFieldDecorator('userName', {
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
                    {getFieldDecorator('userPassword', {
                        rules: [{
                          required: true, message: '请输入用户密码!',
                        }],
                    })(
                    <Input autoComplete="off" type="password" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                     >
                    {getFieldDecorator('userEmail', {
                        rules: [{
                          type: 'email', message: '非法 E-mail!',
                        }, {
                          required: true, message: '请输入 E-mail!',
                        }],
                    })(
                    <Input autoComplete="off" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="区域"
                     >
                    {getFieldDecorator('userRegion', {
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
                        disabled={this.state.disabled}
                      />
                    )}
                </FormItem>
                
                <FormItem
                    label="所属单位"
                    {...formItemLayout} >
                        {getFieldDecorator('userCompany', {
                            rules: [{ required: true, message: '请选择单位!' }],
                        })(
                        <Select disabled={this.state.disabled}
                          placeholder=""
                        >
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    label="状态"
                    {...formItemLayout} >
                        {getFieldDecorator('userState', {
                        rules: [{ required: true, message: '请选择状态!' }],
                        })(
                        <Select disabled={this.state.disabled}
                          placeholder=""
                        >
                          <Select.Option value="1">正常</Select.Option>
                          <Select.Option value="0">异常</Select.Option>
                        </Select>
                        )}
                </FormItem>
            </Form>
        );
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled !== this.state.disabled) {
            this.setState({
                disabled: nextProps.disabled
            });
        }
    }
    componentDidMount() {
    	
    }
}

const WrappedApp = Form.create()(OperatorForm);

export default WrappedApp;