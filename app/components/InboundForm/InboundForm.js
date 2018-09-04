import React from 'react';
// import ReactDOM from 'react-dom'
import {DatePicker, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../Antd.js';

import moment from 'moment';
const FormItem = Form.Item;
import "./style.css";

class InboundForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled:this.props.disabled == null ? true : this.props.disabled,
            ws: [{id:"1",name:"浦西"},{id:"2",name:"浦东"}]
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 10 },
                    md: { span: 10 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                    md: { span: 12 },
                },
            };
        // const formItemLayout = null;
        return (
            <Form layout="horizontal">
                <Row>
                    <Col md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="单据编号"
                             >
                            {getFieldDecorator('billNo', {
                                rules: [ {
                                }],
                            })(
                            <Input  disabled={true} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="单据日期"
                             >
                            {getFieldDecorator('billTime', {
                                rules: [{
                                  required: true, message: '请输入单据日期!',
                                }],
                                normalize:function(value, prevValue, allValues){
                                    return value;
                                }
                            })(
                            <DatePicker format="YYYY-MM-DD HH:mm:ss" disabled={this.state.disabled}/>
                            
                            )}
                        </FormItem>
                    </Col>
                  
                    <Col md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="单据状态"
                             >
                            {getFieldDecorator('billStatus', {
                                rules: [{
                                  required: true, message: '请输入用户密码!',
                                }],
                                
                            })(
                            <Select disabled={this.state.disabled} 
                                  placeholder="状态" 
                                >
                                  <Select.Option value="10">已输入</Select.Option>
                                  <Select.Option value="20">已确认</Select.Option>
                                  <Select.Option value="90">已完成</Select.Option>
                                  <Select.Option value="-1">已作废</Select.Option>
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={12}>
                         
                        <FormItem
                            {...formItemLayout}
                            label="申请人"
                             >
                            {getFieldDecorator('applyMan', {
                               
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={12}>
                        <FormItem
                            label="仓库"
                            {...formItemLayout} >
                                {getFieldDecorator('warehouse', {
                                })(
                                <Select disabled={this.state.disabled}
                                  placeholder="入库仓库"
                                >
                                    {
                                        this.state.ws.map(function(item){
                                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col md={12}>
                        <FormItem
                            label="通知"
                            {...formItemLayout} >
                                {getFieldDecorator('isnotic', {
                                    valuePropName:'checked'
                                })(
                                    <Checkbox disabled={this.state.disabled}>已通知
                                      </Checkbox>
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
 
    componentDidMount() {
    	
    }
    
   
  

   

    
}

const WrappedApp = Form.create()(InboundForm);

export default WrappedApp;