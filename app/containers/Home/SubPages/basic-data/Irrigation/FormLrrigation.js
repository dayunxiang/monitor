import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, DatePicker } from '../../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
import locale from 'antd/lib/date-picker/locale/zh_CN';
// import "./style.css";

class FormLrrigation extends React.Component {
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
        const formLayout = {
            md:8,
            xs:24
        }
        let {dictData} = this.props;
        let facilityTypeOptions = dictData && dictData.facility_type ? dictData.facility_type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        let waterGateTypeOptions = dictData && dictData.water_gate_type ? dictData.water_gate_type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        let gateTypeOptions = dictData && dictData.gate_type ? dictData.gate_type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} >
                <Row>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="水利设施编码   "
                             >
                            {getFieldDecorator('lrCode', {
                                rules: [ {
                                     required: true, message: '水利设施编码   !',

                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="名称"
                             >
                            {getFieldDecorator('lrName', {
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
                            label="口门类型"
                             >
                            {getFieldDecorator('lrGateType', {
                                rules: [{
                                  required: true, message: '口门类型',
                                }],
                            })(
                            <Select disabled={this.state.disabled} >
                                {gateTypeOptions}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="设施类型"
                             >
                            {getFieldDecorator('lrFacilityType', {
                                rules: [
                                {
                                  required: true, message: '请输入 设施类型!',
                                }],
                            })(
                            <Select disabled={this.state.disabled} >
                                {facilityTypeOptions}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="设施位置"
                             >
                            {getFieldDecorator('lrLocation', {
                                rules: [
                                {
                                  required: true, message: '请输入 设施位置',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="水闸类型"
                             >
                            {getFieldDecorator('lrWaterGateType', {
                                rules: [
                                {
                                  // required: true, message: '请输入水闸类型!',
                                }],
                            })(
                            <Select disabled={this.state.disabled}>
                                {waterGateTypeOptions}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="建造日期"
                             >
                            {getFieldDecorator('lrBuildDate', {
                                rules: [
                                {
                                  required: true, message: '请输入 建造日期!',
                                }],
                            })(
                            <DatePicker style={{width:"100%"}}  locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime disabled={this.state.disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="平均宽度"
                             >
                            {getFieldDecorator('lrFacilityAverageWidth', {
                                rules: [
                                {
                                  required: true, message: '请输入 平均宽度!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="中文简写"
                             >
                            {getFieldDecorator('lrChineseShort', {
                                rules: [
                                {
                                  required: true, message: '请输入 中文简写!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="拼音或首字母"
                             >
                            {getFieldDecorator('lrPinyinInitial', {
                                rules: [
                                {
                                  required: true, message: '请输入 拼音或首字母!',
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

const WrappedApp = Form.create()(FormLrrigation);

export default WrappedApp;