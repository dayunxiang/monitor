import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';
import {FunctionList,powerList} from '../../../../data/dataStore.js'


const FormItem = Form.Item;
// import "./style.css";

class AddUserManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData:[],
            tableData1:[],
            
            disabled:this.props.disabled == null ? true : this.props.disabled
        }

    }
    componentWillMount() {

        this.Functionlst();
        this.Powerlst();
        // this.Functionlst();

    }
    // 功能权限
    async Functionlst() {
        let data = await FunctionList({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data.code==200 ) {
            
            //   console.log(data.data,'功能权限的值')
            //  var  list2=data.data.map((item)=>{
            //    return item
            //  });
            // console.log(carme,'想看看值')
            //  console.log(data.data.cameraList[0].cameraName,'测试111111的值是多少')
            this.setState({
                loading: false,
                tableData1:data.data,
            })
        }
        
        }
        // 资源权限组
        async Powerlst() {
            let data = await powerList({}).then((res) =>{ return res.json();}).catch(ex => {});
            if (data.code==200 ) {
                
                 console.log(data.data,'资源权限的值')
                 var  carme=data.data.map((item)=>{
                   return item
                 });
                console.log(carme,'carme想看看值')
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
        // 资源
        const children = [];
         const vb=this.state.tableData;
         for (let i = 0; i <vb.length; i++) {
         children.push(<Option key={vb[i].id}> {vb[i].groupName} </Option>);
         }
          // 功能权限
         const children1 = [];
         const showList=this.state.tableData1;
         for (let i = 0; i <showList.length; i++) {
            children1.push(<Option key={showList[i].id}> {showList[i].roleName} </Option>);
            }
        //    相关人员
            // const children2 = [];
            // const showList=this.state.tableData1;
            // for (let i = 0; i <showList.length; i++) {
            //    children2.push(<Option key={showList[i].id}> {showList[i].roleName} </Option>);
            //    }
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
                    label=""
                     >
                    {getFieldDecorator('unit', {
                       
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300,display:'none' }}/>
                    )}
                </FormItem>
             <FormItem
                    {...formItemLayout}
                     label="用户名称"
                 
                     >
                    {getFieldDecorator('name', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                     label="用户类型"
                 
                     >
                    {getFieldDecorator('type', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                     label="状态"
                 
                     >
                    {getFieldDecorator('state', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="登陆密码"
                     >
                    {getFieldDecorator('password', {
                        rules: [ {
                             required: true, message: '请填写密码!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="确认密码"
                     >
                    {getFieldDecorator('describe', {
                        rules: [{
                          required: true, message: '请填写确认密码',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem> */}
                 <FormItem
                    {...formItemLayout}
                    label="描述"
                     >
                    {getFieldDecorator('describe', {
                        rules: [{
                          required: true, message: '请填写确认密码',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="关联人员"
                     >
                    {getFieldDecorator('wlFunction', {
                       
                    })(
                    <Select
                    mode="tags1"
                    style={{ width: 300  }}
                    onChange={this.handleChange.bind(this)}
                     tokenSeparators={[',']}
                  >
                    {children2}
                  </Select>,


                    )}
                </FormItem> */}
                <FormItem
                    {...formItemLayout}
                    label="资源权限组"
                     >
                    {getFieldDecorator('wlFunction1', {      
                    })(
                    <Select
                    mode="tags2"
                    style={{ width: 300  }}
                    onChange={this.handleChange1.bind(this)}
                     tokenSeparators={[',']}
                  >
                    {children}
                  </Select>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="功能权限组"
                     >
                    {getFieldDecorator('wlFunction', {
                       
                    })(
                    <Select
                    mode="tags3"
                    style={{ width: 300  }}
                    onChange={this.handleChange.bind(this)}
                     tokenSeparators={[',']}
                  >
                    {children1}
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
    handleChange1(){

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

const WrappedApp = Form.create()(AddUserManage );

export default WrappedApp;