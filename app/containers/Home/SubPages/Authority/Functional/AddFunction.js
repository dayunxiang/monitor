import React from 'react';
// import ReactDOM from 'react-dom'
import {  TreeSelect,Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {FunctionAddList} from '../../../../../data/dataStore.js'


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
    componentWillMount() {

        this.Addlst()

    }
    async Addlst() {
        let data = await FunctionAddList({}).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            
             console.log(data.data,'新增接口的值')
             var  carme=data.data.map((item)=>{
               return item
             });
            console.log(carme,'想看看值')
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
        const vb=this.state.tableData;
        console.log(vb,'vb')
        for (let i = 0; i <vb.length; i++) {
        //     console.log(vb[i].id,'vt[i]的值')
        //   console.log(vb[i].fuctionName,'///////////////')
        children.push(<Option key={vb[i].id}> {vb[i].fuctionName} </Option>);

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
                    {getFieldDecorator('FID', {
                      
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 ,display:'none'}}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色名称1"
                     >
                    {getFieldDecorator('wlName', {
                        rules: [ {
                             required: true, message: '请填写角色名称!',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色描述"
                     >
                    {getFieldDecorator('describe', {
                        rules: [{
                          required: true, message: '请填角色描述',
                        }],
                    })(
                    <Input disabled={this.state.disabled}  style={{ width: 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色功能"
                     >
                    {getFieldDecorator('wlFunction', {
                       
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

const WrappedApp = Form.create()(AddResource);

export default WrappedApp;