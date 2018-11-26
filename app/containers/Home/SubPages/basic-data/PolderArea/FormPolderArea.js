import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
const Option = Select.Option;
const FormItem = Form.Item;
// import "./style.css";

class FormPolderArea extends React.Component {
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
        let { dictData } = this.props;
        let typeOptions = dictData && dictData.type ? dictData.type.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
        let pdmOptions = dictData && dictData.pilotage_drain_mode ? dictData.pilotage_drain_mode.map(({text, value}) => {
            return <Option key={value} value={value}>{text}</Option>;
        }): "";
       
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩区名称	"
                             >
                            {getFieldDecorator('pfName', {
                                rules: [ {
                                     required: true, message: '圩区名称	!',

                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="控制类型"
                             >
                            {getFieldDecorator('pfType', {
                                rules: [{
                                  required: true, message: '控制类型',
                                }],
                            })(
                            <Select disabled={this.state.disabled}>
                                {typeOptions}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="引排方式"
                             >
                            {getFieldDecorator('pfPilotageDrainMode', {
                                rules: [{
                                  required: true, message: '引排方式',
                                }],
                            })(
                            <Select disabled={this.state.disabled}>
                                {pdmOptions}
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩内控制水位（米）"
                             >
                            {getFieldDecorator('pfDamInsideControlWaterLevel', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩内控制水位（米）!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩外常水位（米）"
                             >
                            {getFieldDecorator('pfDamOutsideNormalWaterLevel', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩外常水位（米）!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩内高程"
                             >
                            {getFieldDecorator('pfDamInsideAltitude', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩内高程!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩堤顶平均宽度"
                             >
                            {getFieldDecorator('pfDamHeadWidth', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩堤顶平均宽度!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩堤顶高程"
                             >
                            {getFieldDecorator('pfDamHeadAltitude', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩堤顶高程!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="圩堤长度"
                             >
                            {getFieldDecorator('pfDamLength', {
                                rules: [
                                {
                                  required: true, message: '请输入 圩堤长度!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="护坡圩堤长度"
                             >
                            {getFieldDecorator('pfDamProtectSlopeLength', {
                                rules: [
                                {
                                  required: true, message: '请输入 护坡圩堤长度!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="覆盖面积"
                             >
                            {getFieldDecorator('pfCoverageArea', {
                                rules: [
                                {
                                  required: true, message: '请输入 覆盖面积!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="水面积（亩）"
                             >
                            {getFieldDecorator('pfWaterArea', {
                                rules: [
                                {
                                  required: true, message: '请输入 水面积（亩）!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="耕地面积（亩）"
                             >
                            {getFieldDecorator('pfFarmlandArea', {
                                rules: [
                                {
                                  required: true, message: '请输入 耕地面积（亩）!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="排涝控制面积(亩)"
                             >
                            {getFieldDecorator('pfDrainageControlArea', {
                                rules: [
                                {
                                  required: true, message: '请输入 排涝控制面积(亩)!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="排水动力"
                             >
                            {getFieldDecorator('pfDrainagePower', {
                                rules: [
                                {
                                  required: true, message: '请输入 排水动力!',
                                }],
                            })(
                            <Input disabled={this.state.disabled}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col {...formLayout}>
                        <FormItem
                            {...formItemLayout}
                            label="引水动力"
                             >
                            {getFieldDecorator('pfPilotagePower', {
                                rules: [
                                {
                                  required: true, message: '请输入 引水动力!',
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
                            {getFieldDecorator('pfChineseShort', {
                                rules: [
                                {
                                  required: true, message: '请输入中文简写!',
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
                            {getFieldDecorator('pfPinyinInitial', {
                                rules: [
                                {
                                  required: true, message: '请输入拼音或首字母!',
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

const WrappedApp = Form.create()(FormPolderArea);

export default WrappedApp;