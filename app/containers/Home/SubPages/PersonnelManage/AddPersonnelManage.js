import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';
 import {relevanUnit} from '../../../../data/dataStore.js'


const FormItem = Form.Item;
// import "./style.css";

class AddPersonnelManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData:[],
            disabled:this.props.disabled == null ? true : this.props.disabled
        }

    }
    componentWillMount() {

        this.Addlst()

    }
    async Addlst() {
        let data = await relevanUnit({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            
            //  console.log(data.data,'新增接口的值')
            //  var  carme=data.data.map((item)=>{
            //    return item
            //  });
            // console.log(carme,'想看看值')
              console.log(data.data,'关联公司的值是多少')
            this.setState({
                loading: false,
                tableData:data.data
            })
        }
        
        }
    render() {
        const Option = Select.Option;
        const { TextArea } = Input;

        const children = [];
         const vb=this.state.tableData;
        // console.log(vb,'vb')
         for (let i = 0; i <vb.length; i++) {
        // //     console.log(vb[i].id,'vt[i]的值')
        // //   console.log(vb[i].fuctionName,'///////////////')
         children.push(<Option key={vb[i].id}> {vb[i].companyName} </Option>);

         }
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
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
             <FormItem
                    {...formItemLayout}
                     label="唯一标识符"
                 
                     >
                    {getFieldDecorator('FID', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="人员姓名"
                     >
                    {getFieldDecorator('wlName', {
                        rules: [ {
                             required: true, message: '请填写姓名!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系电话"
                     >
                    {getFieldDecorator('phone', {
                        rules: [{
                          required: true, message: '请填联系电话',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系地址"
                     >
                    {getFieldDecorator('add', {
                        rules: [{
                          required: true, message: '请填联系地址',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                     >
                    {getFieldDecorator('email', {
                        rules: [{
                          required: true, message: '请填邮箱',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label=""
                     >
                    {getFieldDecorator('unit', {
                       
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300,display:'none' }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="简称"
                     >
                    {getFieldDecorator('jianc', {
                        rules: [{
                          required: true, message: '请输入简称',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="关联公司"
                     >
                    {getFieldDecorator('wlFunction', {
                       
                    })(
                    <Select
                    mode="tags1"
                    style={{ width: 300  }}
                    allowClear={true}
                    onChange={this.handleChange.bind(this)}
                     tokenSeparators={[',']}
                  >
                    {children}
                  </Select>,


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
    handleChange(){
        // console.log(`selected ${value}`);

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
        // console.log(value);
    }

   

    
}

const WrappedApp = Form.create()(AddPersonnelManage );

export default WrappedApp;