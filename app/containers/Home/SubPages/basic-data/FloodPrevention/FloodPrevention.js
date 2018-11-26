import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

import FormFloodPrevention from  '../../../SubPages/basic-data/FloodPrevention/FormFloodPrevention.js';
import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../../components/Cover/Cover.js';
// import "./style.css";
class FloodPrevention extends BaseSubPage {
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
        	{title: '防汛设施管理编码',dataIndex: 'code' ,width: "33%"},
        	{title: '名称',dataIndex: 'name',width: "34%"},
        	{title: '状态',dataIndex: 'statue',width: "33%"},
        	
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
							onRow={(record) => ({
								onClick: () => {
									this.setState({
										tableSelData: record
									},() => {
										this.fillForm();
									});
								},
								
							  })}                            rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>
				    	<Cover cover={this.state.cover} fullScreen={false} topOffset={30}/>

				    </Col>
				    <Col  md={16} >
				    	<FormFloodPrevention ref="form" disabled={this.state.formDisable}/>
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
    loadTableData() {
    	let columns = [];
        for (var i = 0; i < 14; i++) {
        	columns.push({key:i, code:"taosy"+i, name:"陶顺逸"+i, statue:"1", password:"11111", email:"5414@qq.com", sex:"1"})
        }
        this.setState({
        	tableData:columns
        })

    }
    tableRowClick(record, index, event) {
    	// console.log(record, index, event);
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
    			window.setTimeout(() => {
		    		success();
		    		form.resetFields();
		    		if (status === 2) { //新增
		    			var data = {key:this.index++, code:vals.oCode, name:vals.oName, statue:"1", password:vals.oPassword, email:vals.email, sex:vals.gender,region:vals.region};
		    			this.state.tableData.push(data);
		    			this.setState({
		    				tableData:this.state.tableData,
		    				tableSelData: data,
		    				formDisable:true,
		    				cover:false
		    			},() => {
		    				this.fillForm();
		    			});
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
			    	
		    	},1000)

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
	    		// oCode: selData.code,
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
    		oCode: '',
    		oName: '',
    		oPassword:'',
    		email: '',
    		gender: ''
    	});
    }

   

    
}

export default FloodPrevention;