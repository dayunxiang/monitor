import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class Reveice extends React.Component {
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
            const formLayout = {
                md:8,
                xs:24
            }
        return (
            
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Row>
              <Col {...formLayout}>
              <FormItem
                    {...formItemLayout}
                    label="河流ID"
                     >
                    {getFieldDecorator('oCode', {
                        rules: [ {
                             required: true, message: '河流ID11111	!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
              </Col>
               
                <Col {...formLayout}>
                <FormItem
                    {...formItemLayout}
                    label="河流名称"
                     >
                    {getFieldDecorator('riverName', {
                        rules: [{
                          required: true, message: '名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                </Col>

               
                <Col {...formLayout}>
                <FormItem
                    {...formItemLayout}
                    label="河流状态"
                     >
                    {getFieldDecorator('oPassword', {
                        rules: [{
                          required: true, message: '河流状态',
                        }],
                    })(
                    <Input type="password1" disabled={this.state.disabled}/>
                    )}
                </FormItem>
                </Col>

               
                <Col {...formLayout}>
                <FormItem
                    {...formItemLayout}
                    label="管辖类别"
                     >
                    {getFieldDecorator('email1', {
                        rules: [
                        {
                          required: true, message: '管辖类别!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                </Col>

               
                <Col {...formLayout}>
                <FormItem
                    {...formItemLayout}
                    label="位置范围"
                     >
                    {getFieldDecorator('email2', {
                        rules: [
                        {
                          required: true, message: '位置范围',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                </Col>

                </Row>
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

const WrappedApp = Form.create()(Reveice);

export default WrappedApp;