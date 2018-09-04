import React from 'react';
// import ReactDOM from 'react-dom'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class OrganizationForm extends React.Component {
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
            <Form >
                <FormItem
                    {...formItemLayout}
                    label="机构编码"
                     >
                    {getFieldDecorator('ogCode', {
                        rules: [ {
                          required: true, message: '请输入机构编码!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="机构名称"
                     >
                    {getFieldDecorator('ogName', {
                        rules: [{
                          required: true, message: '请输入机构名称!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="经理"
                     >
                    {getFieldDecorator('oPassword', {
                        rules: [{
                          required: true, message: '请输入经理!',
                        }],
                    })(
                    <Input type="password" disabled={this.state.disabled}/>
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
   
    componentDidMount() {
    	
    }
   
  

   

    
}

const WrappedApp = Form.create()(OrganizationForm);

export default WrappedApp;