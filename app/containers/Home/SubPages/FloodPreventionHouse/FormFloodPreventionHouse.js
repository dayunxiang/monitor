import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormFloodPreventionHouse extends React.Component {
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
                    label="仓库名称"
                     >
                    {getFieldDecorator('fpName', {
                        rules: [ {
                             required: true, message: '请填写仓库名称!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="仓库位置"
                     >
                    {getFieldDecorator('fpLocation', {
                        rules: [{
                          required: true, message: '请填写仓库位置',
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

const WrappedApp = Form.create()(FormFloodPreventionHouse);

export default WrappedApp;