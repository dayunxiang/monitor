import React from 'react';
import { Tree, Menu, Icon} from 'antd';


class Test extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = { };

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
	    return (
	      	<Form layout="horizontal">
                <Row>
                    <Col md={12}>
                        <FormItem
                            {...formItemLayout}
                            label="接口名称"
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
                            label="接口描述"
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
    componentWillReceiveProps(){

    }
    componentDidMount(){
    	
    }
	
}
export default Test;