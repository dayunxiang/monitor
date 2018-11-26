import React from 'react';
// import ReactDOM from 'react-dom'
import {  Form, Input, Select } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class GroupForm extends React.Component {
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
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="组编码"
                     >
                    {getFieldDecorator('code', {
                        rules: [ {
                             required: true, message: '请输入组编码!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="组名称"
                     >
                    {getFieldDecorator('code', {
                        rules: [{
                          required: true, message: '请输入组名称!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
               
                <FormItem
                    label="状态"
                    {...formItemLayout} >
                        {getFieldDecorator('state', {
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
                disabled:nextProps.disabled
            });
        }
    }
    componentDidMount() {
        
    }

}

const WrappedApp = Form.create()(GroupForm);

export default WrappedApp;