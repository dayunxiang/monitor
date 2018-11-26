import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
// import "./style.css";

class FormUnit extends React.Component {
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
        let {dictData} = this.props;
        let regionOptions = dictData && dictData.region_type ? dictData.region_type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
            
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}  >
                <FormItem
                    {...formItemLayout}
                    label="行政区编码"
                     >
                    {getFieldDecorator('regionCode', {
                        rules: [{
                          required: true, message: '行政区编码',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="行政区名称"
                     >
                    {getFieldDecorator('regionName', {
                        rules: [{
                          required: true, message: '行政区名称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="父编码"
                     >
                    {getFieldDecorator('regionParentCode', {
                        rules: [{
                          required: true, message: '行政区编码',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                     {...formItemLayout}
                    label="行政区类型"
                    >
                 {getFieldDecorator('regionType', {
                    rules: [{ required: true, message: '请输入行政区类型!' }],
                  })(
                   <Select disabled={this.state.disabled}>
                        {regionOptions}
                    </Select>
                 )}
                 </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label="描述"
                     >
                    {getFieldDecorator('regionDesc', {
                        rules: [
                        ],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="位置"
                     >
                    {getFieldDecorator('regionLocation', {
                        rules: [],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
               
               
                <FormItem
                    {...formItemLayout}
                    label="中文简写"
                     >
                    {getFieldDecorator('regionShortName', {
                        rules: [
                       ],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="拼音或首字母"
                     >
                    {getFieldDecorator('regionPY', {
                        rules: [
                        ],
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

const WrappedApp = Form.create()(FormUnit);

export default WrappedApp;