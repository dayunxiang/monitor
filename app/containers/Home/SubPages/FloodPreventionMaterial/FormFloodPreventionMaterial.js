import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';

const FormItem = Form.Item;
// import "./style.css";

class FormFloodPreventionMaterial extends React.Component {
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
        let {dictData, whData} = this.props;
        let goodsTypeOptions = dictData && dictData.goods_type ? dictData.goods_type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        let unitOptions = dictData && dictData.metric_unit ? dictData.metric_unit.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        let whOptions = whData && whData.length ? whData.map(({id, name}) => {
            return <Option key={id} value={id}>{name}</Option>;
        }): "";
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="物资名称"
                     >
                    {getFieldDecorator('fmName', {
                        rules: [ {
                             required: true, message: '请填写物资名称!',

                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="物资类别"
                     >
                    {getFieldDecorator('fmType', {
                        rules: [{
                          required: true, message: '请填写物资类别',
                        }],
                    })(
                    <Select disabled={this.state.disabled} >
                        {goodsTypeOptions}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="型号规格"
                     >
                    {getFieldDecorator('fmModel', {
                        rules: [],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="单位"
                     >
                    {getFieldDecorator('fmUnit', {
                        rules: [{
                          required: true, message: '请填写单位',
                        }],
                    })(
                    <Select disabled={this.state.disabled} >
                        {unitOptions}
                    </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="养护频次"
                     >
                    {getFieldDecorator('fmFrequency', {
                        rules: [{
                          required: true, message: '请填写仓养护频次',
                        }],
                    })(
                    <Input disabled={this.state.disabled}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所属仓库"
                     >
                    {getFieldDecorator('fpWareHouse', {
                        rules: [{
                          required: true, message: '请填写仓库位置',
                        }],
                    })(
                    <Select disabled={this.state.disabled} >
                        {whOptions}
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

const WrappedApp = Form.create()(FormFloodPreventionMaterial);

export default WrappedApp;