import React from 'react';
import {Modal,Tree ,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js'

import OrganizationForm from '../../../../components/OrganizationForm/OrganizationForm.js';
import Toolbar from '../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../components/Cover/Cover.js';
// import "./style.css";

class Organization extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
        	treeData:null, //table的数据
        	treeSelData:null, //当前选中的行数据
            treeCheckDataKeys:null, //当前选择的
        	formDisable:true, //表单可编辑性
        	cover:false, //遮盖
        	checkedRowData:null, //勾选的行数据,用户删除
        	modalShow: false //莫泰窗口
        }
        // this.index = 100;//测试

    }
    render() {
        let toolbarOpt = {
            newClick: this.toolbarNewClick.bind(this),
            editClick: this.toolbarEditClick.bind(this),
            removeClick:this.toolbarRemoveClick.bind(this),
            saveClick: this.toolbarSaveClick.bind(this),
            cancelClick: this.toolbarCancelClick.bind(this),
        };
        let delMessage = this.state.checkedRowData ? this.state.checkedRowData.map(function(item, i){
            return item.name;
        }).join(","):"";
        return (
            <div className="vk-subpage">
                <Row>
                    <Col  md={8} >
                        <Toolbar {...toolbarOpt}/>
                        <Tree checkable
                            checkStrictly={true}
                            onSelect={this.onTreeSelect.bind(this)}
                            onCheck={this.onTreeCheck.bind(this)}>{this.handlerTreeNode(this.state.treeData)}
                        </Tree>
                        <Cover cover={this.state.cover} />
                        
                    </Col>
                    <Col  md={16} >
                        <OrganizationForm ref="form" disabled={this.state.formDisable} />
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
    	// this.handlerTableFns();
    	this.loadTreeData();
    }
    componentWillUnmount(){
        super.componentWillUnmount();
    }
    
    //处理表格的方法,主要表格撑长
    handlerTableFns() {
    	
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
    loadTreeData() {
    	var data = [
            {
                title:"研发中心",
                key:"YFZX",
                children:[
                {
                    title:"研发一部",
                    key:"YFYB"
                },
                {
                    title:"研发二部",
                    key:"YFEB"
                }
            ]},
            {
                title:"销售中心",
                key:"XSZX",
                children:[
                {
                    title:"销售一部",
                    key:"XSYB"
                },
                {
                    title:"销售二部",
                    key:"XSEB"
                }
            ]}
        ]
        this.setState({
        	treeData:data
        })

    }
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.key} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.key} entity={n}>{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    onTreeSelect(selectedKeys, e) {
        if (e.selected) {
            window.setTimeout(() => {
                this.setState({
                    treeSelData: e.node.props.entity
                },() => {
                    this.fillForm();
                });
            } ,0);
        }else{
            this.setState({
                treeSelData: null
            },() => {
                this.fillForm();
            });
        }
        
    	
		
    }
    onTreeCheck(checkedkeys,e) {
        console.log(checkedkeys,e);
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
    	if (this.state.treeSelData) {
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
    	if (this.state.treeSelData && this.state.treeSelData.length) {
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
		    			var data = {title:vals.ogName,key:vals.ogCode};
                        this.addTreeNodeByEntity(data,this.state.treeSelData ? this.state.treeSelData.key : null);
		    			
		    			this.setState({
		    				treeData:this.state.treeData,
		    				treeSelData: data,
		    				formDisable:true,
		    				cover:false
		    			},() => {
		    				this.fillForm();
		    			});
		    		}else{ //修改
		    			var data = { code:vals.oCode, name:vals.oName, password:vals.oPassword, email:vals.email, sex:vals.gender};
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
    	var form = this.refs.form.getForm(), selData = this.state.treeSelData;
    	if (selData) {
    		form.setFieldsValue({
	    		ogName: selData.title,
	    		ogCode: selData.key,
	    		
	    	});
    	}
        console.log(this.state)
    	
    }
    cleanForm() {
    	var form = this.refs.form.getForm();
    	form.setFieldsValue({
    		ogName: '',
            ogCode: '',
    	});
    }
    addTreeNodeByEntity(entity,key) {
        if (!key) {
            var treedata = this.state.treeData;
            if (Array.isArray(treedata)) { //如果本身是数组,
                treedata.push(entity);
            }else{ //不是数组,说明是null
                this.state.treeData = [entity]
            }
            return;
        }
        var currentNode = this.findCurrentNodeByKey(key,this.state.treeData);
        if (currentNode) { //有节点
            if (currentNode.children && currentNode.children.length) { //有子节点
                currentNode.children.push(entity);
            }else{
                currentNode.children=[entity];
            }
            
        }
        
    }
    //根据key查询父节点对象
    findParentNodeByKey(fkey,list,parent) {
        if (!Array.isArray(list)) {return null};
        for (var i = 0; i < list.length; i++) {
            var d = list[i];
            if (d.key === fkey) {
                return parent;
            }
            if (d.children && d.children.length) {
                var subd = this.findParentNodeByKey(fkey,d.children,d);
                if (subd) {
                    return subd;
                }else{
                    continue;
                }
                
            }
        }
    }
    //根据当前key查找对象
    findCurrentNodeByKey(fkey,list){
        if (!Array.isArray(list)) {return null};
        for (var i = 0; i < list.length; i++) {
            var d = list[i];
            if (d.key === fkey) {
                return d;
            }
            if (d.children && d.children.length) {
                var subd = this.findCurrentNodeByKey(fkey,d.children);
                if (subd) {
                    return subd;
                }else{
                    continue;
                }
                
            }
        }
    }

   

    
}

export default Organization;