import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
// import "./style.css";

class FormSluiceGate extends React.Component {
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
        let gocOptions = dictData && dictData.gate_open_close_mode ? dictData.gate_open_close_mode.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="闸门编码	"
                     >
                    {getFieldDecorator('sgCode', {
                        rules: [ {
                             required: true, message: '闸门编码	!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="闸门名称"
                     >
                    {getFieldDecorator('sgName', {
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
                    {getFieldDecorator('sgModel', {
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
                    {getFieldDecorator('sgSpec', {
                        rules: [
                        {
                          required: true, message: '请输入规格!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启闭方式"
                     >
                    {getFieldDecorator('sgType', {
                        rules: [
                        {
                          required: true, message: '请输入闸门启闭方式',
                        }],
                    })(
                    <Select disabled={this.state.disabled}>
                        {gocOptions}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="生产厂商"
                     >
                    {getFieldDecorator('sgManufacturer', {
                        rules: [
                        {
                          required: true, message: '生产厂商!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="拼音或首字母"
                     >
                    {getFieldDecorator('sgPinyinInitial', {
                        rules: [
                        {
                          required: true, message: '请输入拼音或首字母!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文简写"
                     >
                    {getFieldDecorator('sgChineseShort', {
                        rules: [
                        {
                          required: true, message: '请输入中文简写!',
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

const WrappedApp = Form.create()(FormSluiceGate);

export default WrappedApp;