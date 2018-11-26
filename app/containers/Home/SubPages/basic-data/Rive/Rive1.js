import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, message } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

import FormRive from '../../../SubPages/basic-data/Rive/FormRive.js';
import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../../components/Cover/Cover.js';
import { postRiver, addRiver } from '../../../../../data/dataStore.js';
// import "./style.css";
class Rive extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
        	tableData:null, //table的数据
        	tableSelData:null, //当前选中的行数据
        	formDisable:true, //表单可编辑性
        	cover:false, //遮盖
        	checkedRowData:null, //勾选的行数据,用户删除
        	modalShow: false, //莫泰窗口
            tableSrcollY:0,
        }
        this.index = 100;//测试

    }
    render() {
        const columns = [
        	{title: '河流名称',dataIndex: 'river_name' ,width: "50%"},
			{title: '描述',dataIndex: 'remark',width: "50%"}
        ];
        //
        let toolbarOpt = {
        	newClick: this.toolbarNewClick.bind(this),
        	editClick: this.toolbarEditClick.bind(this),
        	removeClick:this.toolbarRemoveClick.bind(this),
        	saveClick: this.toolbarSaveClick.bind(this),
        	cancelClick: this.toolbarCancelClick.bind(this),
        };
        let delMessage = this.state.checkedRowData ? this.state.checkedRowData.map(function(item, i){
        	return item.name;
        }).join(","):""
        return (
        	<div className="vk-subpage">
        		<Row>
				    <Col  md={8} >
				    	<Toolbar {...toolbarOpt}/>
				    	<Table ref="table" size={'small'} bordered={false} scroll={{y:this.state.tableSrcollY}} 
					    	rowSelection={{onSelect:this.onSelect,onChange:this.onChange.bind(this)}} columns={columns} 
							dataSource={this.state.tableData} 
							onRow={(record, index) => ({
								onClick: this.tableRowClick.bind(this, record, index)
							  })}
	                            rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>
				    	<Cover cover={this.state.cover} fullScreen={false} topOffset={30}/>

				    </Col>
				    <Col  md={16} >
				    	<FormRive ref="form" disabled={this.state.formDisable}/>
				    </Col>
				</Row>
				<Modal
		          title="是否删除?"
		          visible={this.state.modalShow}
		          onOk={this.modalOkClick.bind(this)}
		          onCancel={this.modalCancelClick.bind(this)}
		        >
		          {"删除这些吗"+delMessage}
		        </Modal>
        	</div>
            
        )
    }
    componentDidMount() {
        super.componentDidMount();
    	this.handlerTableFns();
    	this.loadTableData();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
    

    //处理表格的方法,主要表格撑长
    handlerTableFns() {
    	let offset = 250;
        this.setState({
            tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
        });
    	// let table = this.refs.table;
    	// let tableDom = ReactDOM.findDOMNode(table);
    	// let tableBodyDom = tableDom.getElementsByClassName("ant-table-body")[0];
    	// tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
    	this.onresize = () => {
            this.setState({
                tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
            });
            // tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';
        }
        window.addEventListener("resize",this.onresize);
    }
    modalOkClick(e){
    	
    	window.setTimeout(() => {
    		this.setState({
	    		modalShow:false
	    	});
    		Modal.success({
			    title: '成功',
			    content: '删除成功.',
			});
			let nowdata = this.state.tableData.filter((item) => {
				let flag = true;
				let checkData = this.state.checkedRowData;
				for (var i = 0; i < checkData.length; i++) {
					var d = checkData[i];
					if (item.key === d.key) {
						flag = false;
					}
				}
				return flag;
			});
			this.setState({
				tableData:nowdata
			});
    	},1000);
    }
    modalCancelClick(e){
    	this.setState({
    		modalShow:false
    	});
    }

    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
    	console.log("onChange",selectedRowKeys, selectedRows );
    	this.setState({
    		checkedRowData:selectedRows
    	});

    }
    rowClassName(record, index){
        var selData = this.state.tableSelData;
        if (selData && selData.key === record.key) {
            return "row-highlight";
            
        }else{
            return "";
        }
	}
	// 数据展示部分
    async loadTableData() {
    	let data = await postRiver().then(res => {  
            return res.json()
        }).catch( ex => {});
        if (data && data.data ) {
            data.data.forEach((item) => {
                item.key = item.id
            })
            this.setState({
                tableData:data.data 
            })
        }
        

    }
    tableRowClick(record, index, event) {
    	this.setState({
			tableSelData: record
		},() => {
			this.fillForm();
		});
		
    }
    toolbarNewClick(success){
        success();
    	this.cleanForm();
    	this.setState({
    		formDisable:false,
    		cover:true
    	});
    }
    toolbarEditClick(success){
    	if (this.state.tableSelData) {
    		success();
    		this.setState({
	    		formDisable:false,
	    		cover:true
	    	});
    	}else{
    		Modal.warning({
			    title: '对不起',
			    content: '请先单击修改行!',
			});
    	}
    	
    }
    toolbarRemoveClick(){
    	if (this.state.checkedRowData && this.state.checkedRowData.length) {
    		this.setState({
	    		modalShow:true
	    	});
    	}else{
    		Modal.warning({
			    title: '对不起',
			    content: '请先选择待删除行!',
			});
    	}
    	
  //   	Modal.warning({
		//     title: '确认',
		//     content: 'some messages...some messages...',
		//     maskClosable:true,
		//     cancelText: "取消",
		//     okText:"确定",
		//     onOk:function(a){
		//     	console.log(a, a());
		//     	;
		//     }
		// });
    }
    //status 表示新增2还是修改3,
    toolbarSaveClick(status, success, error){
    	var form = this.refs.form.getForm();
    	form.validateFields(
          (err) => {
            if (!err) {
            	// 
                var vals = form.getFieldsValue();
    			console.log(vals);
    			
		    		
		    		if (status === 2) { //新增
                        addRiver(vals).then((res) => {
                            return res.json();
                        }).then((data) => {
                            if (data && data.code === 200) {
                                success();
                                form.resetFields();
                                this.setState({
                                    tableData:this.state.tableData,
                                    // tableSelData: data,
                                    formDisable:true,
                                    cover:false
                                },() => {
                                    this.fillForm();
                                });
                            }else{
                                message.error((data && data.msg) || "新增失败!",5);
                                error();
                            }
                            
                        }).catch((ex) => {
                             message.error( ex || "新增失败!",5);
                             error();
                        })
		    			
		    		}else{ //修改
		    			var data = { code:vals.oCode, name:vals.oName, password:vals.oPassword, email:vals.email, sex:vals.gender,region:vals.region};
		    			this.state.tableData.forEach((item) => {
		    				if (item.key === this.state.tableSelData.key) {
		    					Object.assign(item,data);
		    					return false;
		    				}
		    			});
		    			this.setState({
		    				tableData:this.state.tableData,
		    				tableSelData: data,
		    				formDisable:true,
		    				cover:false
		    			},() => {
		    				this.fillForm();
		    			});
		    		}
			    	

            }else{
            	error();
            }
          },
        );
    	
    	
    }
    toolbarCancelClick(){
    	var form = this.refs.form.getForm();
    	form.resetFields();
    	this.setState({
    		formDisable:true,
    		cover:false
    	});
    	this.fillForm();
    }
    //填充表单
    fillForm(){
    	var form = this.refs.form, selData = this.state.tableSelData;
    	if (selData) {
    		form.setFieldsValue({
	    		riverName: selData.river_name,
	    		// oName: selData.name,
	    		// oPassword:selData.password,
	    		// email: selData.email,
	    		// gender: selData.sex,
                // region:selData.region
	    	});
    	}
        console.log(form== this.refs.form.getForm(), form.setFieldsValue ==this.refs.form.getForm().setFieldsValue)
    	
    }
    cleanForm() {
    	var form = this.refs.form.getForm();
    	form.setFieldsValue({
    		riverName: "",
    		oName: '',
    		oPassword:'',
    		email: '',
    		gender: ''
    	});
    }

   

    
}

export default Rive;