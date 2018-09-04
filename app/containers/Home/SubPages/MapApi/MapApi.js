import React from 'react';
import {Tree,Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, 
    Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';
import Toolbar from '../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../components/Cover/Cover.js';
import treedata from "../../../../data/mapapi.js"
import BaseSubPage from '../BaseSubPage.js'
const { TextArea } = Input;

class MapApi extends BaseSubPage {
  	constructor(props, context) {
        super(props, context);
        this.state = { 
            treeData:null, //table的数据
            treeSelData:null, //当前选中的行数据
            treeCheckDataKeys:null, //当前选择的
            formDisable:true, //表单可编辑性
            cover:false, //遮盖
            checkedRowData:null, //勾选的行数据,用户删除
        };

    }

    render() {
        //
        let toolbarOpt = {
            newClick: this.toolbarNewClick.bind(this),
            editClick: this.toolbarEditClick.bind(this),
            removeClick:this.toolbarRemoveClick.bind(this),
            saveClick: this.toolbarSaveClick.bind(this),
            cancelClick: this.toolbarCancelClick.bind(this),
        };
        let formData = { };
        if (this.state.treeSelData) {
            for (let key in this.state.treeSelData) {
                formData[key] = this.state.treeSelData[key]
            }
        }
	    return (
	      	<div className="vk-subpage">
                <Row>
                    <Col  md={8} >
                        <Toolbar {...toolbarOpt}/>
                        <div ref="treeCont" style={{overflow:"auto"}}>
                            <Tree checkable
                                checkStrictly={true}
                                onSelect={this.onTreeSelect.bind(this)}
                                onCheck={this.onTreeCheck.bind(this)}>{this.handlerTreeNode(this.state.treeData)}
                            </Tree>
                        </div>
                        
                        <Cover cover={this.state.cover} />
                        
                    </Col>
                    <Col  md={16} >
                        <div ref="mainCont" style={{overflow:"auto"}}>
                            <Row>
                                <Col offset={2} md={18}>
                                    {"接口名称"}
                                    <Input placeholder="接口名称" value={formData.code} disabled={this.state.formDisable}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} md={18}>
                                    {"接口描述"}
                                    <Input placeholder="接口描述" value={formData.name} disabled={this.state.formDisable}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} md={18}>
                                    {"接口参数"}
                                    <Table pagination={false} scroll={{x:true}} columns={this._getParamTableCols()} dataSource={formData.param} />
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2} md={18}>
                                    {"接口结果"}
                                    <TextArea rows={4} value={formData.result}disabled={this.state.formDisable}/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
	    );
    }
    
    toolbarNewClick(){

    }
    toolbarEditClick(){

    }
    toolbarRemoveClick(){

    }
    toolbarSaveClick(){

    }
    toolbarCancelClick(){

    }
    onTreeSelect(selectedKeys, e){
        if (e.selected) {
            window.setTimeout(() => {
                this.setState({
                    treeSelData: e.node.props.entity
                });
            } ,0);
        }else{
            this.setState({
                treeSelData: null
            });
        }
    }
    onTreeCheck(){

    }
    _getParamTableCols(){
        return   [{
            title: '参数',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '说明',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        } ,{
            title: '是否必填',
            dataIndex: 'isRequire',
            key: 'isRequire',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            
        }];
    }
    loadTreeData(){
        // var d = [{code:"getMap",name:"获取地图",param:[
        //             {   
        //                 key:"1",
        //                 code:"username",
        //                 name: "用户名称",
        //                 type: "String",
        //                 isRequire:"是",
        //                 remark: "必须传"
        //             }
        //         ],
        //         result:"返回一个map对象"
        //     }];
        this.setState({
            treeData:treedata
        });

    }
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={i+"."+n.name+""+n.code} key={n.code} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.name+""+n.code} key={n.code} entity={n}>{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
        super.componentDidMount();
    	this.loadTreeData();
        var treeCont = this.refs.treeCont;
        var mainCont = this.refs.mainCont;
        var windowH = window.innerHeight;
        var h = (windowH ) > 500 ? (windowH - 128) +'px': (500 - 128)+'px' ;
        var mh = (windowH ) > 500 ? (windowH - 98) +'px': (500 - 98)+'px' ;
        treeCont.style.height = h;
        mainCont.style.height = mh;
        this.onresize = () => {
            var windowH = window.innerHeight;
            var h = (windowH ) > 500 ? (windowH - 128) +'px': (500 - 128)+'px' ;
            var mh = (windowH ) > 500 ? (windowH - 98) +'px': (500 - 98)+'px' ;
            treeCont.style.height = h;
            mainCont.style.height = mh;
        }
        window.addEventListener("resize", this.onresize);

    }
    componentWillUnmount(){
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
	
}
export default MapApi;