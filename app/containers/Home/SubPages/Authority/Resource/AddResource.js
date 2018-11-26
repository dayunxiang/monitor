import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
//import {powerAddList} from '../../../../../data/dataStore.js' //引入url地址
import {powerAddList} from '../../../../../data/dataStore.js'
const FormItem = Form.Item;
// import "./style.css";

class AddResource extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData:[],
            disabled:this.props.disabled == null ? true : this.props.disabled
        }

    }
    handleChange(value) {
        console.log(`selected ${value}`);
      }
      
     
      componentWillMount() {

        this.Addlist()

    }
    async Addlist() {
        let data = await powerAddList({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            
            // console.log(data.data,'data的值')
            // console.log(data,'data')
             var  carme=data.data.map((item)=>{
               return item
             });
            // console.log(carme,'carme')
            //  console.log(data.data.cameraList[0].cameraName,'测试111111的值是多少')
            this.setState({
                loading: false,
                tableData:carme
            })
        }
        
        }
    render() {
        const Option = Select.Option;
        const { TextArea } = Input;
        const children = [];
        const vt=this.state.tableData;
        for (let i = 0; i <vt.length; i++) {
            // console.log(vt[i].resourceName,'///////////////')
        children.push(<Option key={vt[i].id}>{vt[i].resourceName}</Option>);
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
                    // label="权限组ID"
                 
                     >
                    {getFieldDecorator('wID', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,display:'none'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="权限组命名"
                     >
                    {getFieldDecorator('wlName', {
                        rules: [{
                        //   required: true, message: '请填写权限组命名',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
              
              
                <FormItem
                    {...formItemLayout}
                    label="唯一标识码"
                     >
                    {getFieldDecorator('only', {
                        rules: [{
                            // required: false ,type:"number", message: '请填写单位'
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="父唯一标识码"
                     >
                    {getFieldDecorator('parentOnly', {
                        rules: [{
                            // required: false ,type:"number", message: '请填写人员'

                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设施类型"
                     >
                    {getFieldDecorator('wlRange', {
                       
                    })(
                    <Select
                    mode="tags"
                    style={{ width: 300  }}
                    onChange={this.handleChange.bind(this)}
                     tokenSeparators={[',']}
                  >
                    {children}
                  </Select>,


                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="组描述"
                     >
                    {getFieldDecorator('describe', {
                        rules: [{
                          
                        }],
                    })(
                        <TextArea rows={4}  style={{ width: 300 }} />  )}
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

const WrappedApp = Form.create()(AddResource);

export default WrappedApp;