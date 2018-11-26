import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, message, Divider , Popconfirm, Spin } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

import FormSluiceGate from './FormSluiceGate.js';
import { postWaterGate, addWaterGate, modifyWaterGate, removeWaterGate, getDict, postDamTree, postRegionTree } from '../../../../../data/dataStore.js';
import Modal from '../../../../../components/Modal/Modal.js';
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
import {cloneObj} from "../../../../../util/common.js"
// import "./style.css";
class SluiceGate extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            treeData: null, //table的数据
            activeBtn: 1, //默认选中btn
            showModal: false,
            confirmLoading: false,
            dictData: {}
        }

    }
    render() {
        const columns = [
            {title: '闸门编码',dataIndex: 'serialNumber' ,width: "10%"},
            {title: '闸门名称',dataIndex: 'name',width: "10%"},
            {title: '型号',dataIndex: 'model',width: "10%"},
            {title: '规格',dataIndex: 'spec',width: "10%"},
            {title: '闸门启闭方式',dataIndex: 'getGateTypeName',width: "10%"},
            {title: '生产厂商',dataIndex: 'manufacturerId',width: "10%"},
            {title: '拼音或首字母',dataIndex: 'pinyinInitial',width: "10%"},
            {title: '中文简写',dataIndex: 'chineseShort',width: "10%"},
            {title: '创建日期', dataIndex: 'gmtCreate', width: "10%"},
            {title: '修改日期', dataIndex: 'gmtModified', width: "10%"},
            {title: '修改', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">删除</a>
                </Popconfirm>;
            }}      
        ];
        
        
        return (
            this.state.loading ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <div className="ps-irrigation-flex">
                    <div className="ps-flex-item ps-left-item">
                        <div className="ps-tree-search-cont">
                            <ButtonGroup style={{width:"100%"}}>
                                <Button type="default" style={{width: "50%"}} className={this.state.activeBtn === 1 ? "active": ""} onClick={this.onbtnClick.bind(this, 1)}>
                                    控制区结构
                                </Button>
                                <Button type="default" style={{width: "50%"}} className={this.state.activeBtn === 2 ? "active": ""} onClick={this.onbtnClick.bind(this, 2)}>
                                    行政区结构
                                </Button>
                            </ButtonGroup>
                            <Search className="ps-tree-search"
                                placeholder="模糊查找"
                                style={{ width: "100%"}}
                                onChange={this.throttle(this.searchChange, 300).bind(this)}
                            />
                            <Tree checkable
                                defaultExpandAll={true}
                                checkStrictly={true}
                                >{this.handlerTreeNode((this.state.activeBtn ===1) ? (this.state.treeData && this.state.treeData.damTreeData) :(this.state.treeData && this.state.treeData.regionTreeData))}
                            </Tree>
                        </div>
                    </div>
                    <div className="ps-flex-item ps-right-item">
                        <Row>
                            <Col xs={24} >
                                <div className="ps-ir-title">
                                    <Icon type="book"></Icon>
                                    闸门基础资料
                                    <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                                </div>
                                
                                <Divider className="ps-ir-divider"/>
                            </Col>
                            <Col xs={24}>
                                
                                <Col md={6}>
                                    <Col md={8}><label className="ps-search-label">量程(以上)</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Col md={8}><label className="ps-search-label">所属</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Col md={4} offset={4}>
                                        <Button type="primary">搜索</Button>
                                    </Col>
                                    <Col md={4}>
                                        <Button type="primary">导出</Button>
                                    </Col>
                                </Col>
                            </Col>
                            <Col xs={24} className="ps-ir-table">
                                <Table ref="table" size={'small'} bordered={true} scroll={{x:true}}
                                    columns={columns}
                                    dataSource={this.state.tableData}
                                    rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>
                            </Col>
                        </Row>
                    </div>

                </div>
                
                {this.createModal()}
            </div>
            
        )
    }
    componentDidMount() {
        super.componentDidMount();
        // this.handlerTableFns();
        this.loadTreeData();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
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
    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
        console.log("onChange",selectedRowKeys, selectedRows );
        this.setState({
            checkedRowData:selectedRows
        });

    }
    rowClassName(record, index ) {
        var selData = this.state.tableSelData;
        if (selData && selData.key === record.key) {
            return "row-highlight";
            
        }else{
            return "";
        }
    }
    searchChange(value) {
        if (!this.treeData || !this.treeData.damTreeData || !this.treeData.regionTreeData) return;
        let damData = this.treeData.damTreeData;
        let regionTree = this.treeData.regionTreeData;
        this.setState({
            treeData: {
                damTreeData: this.filterData(cloneObj(damData), value),
                regionTreeData: this.filterData(cloneObj(regionTree), value)
            }
        })
        
    }
    
    filterData(data, keywords) {
        if (!Array.isArray(data)) return;
        return data.filter((item) => {
            let flag = false;
            if (item.title.indexOf(keywords) > -1) {
                flag = true;
            }else{
                flag = false;
            }
            if (item.children && item.children.length) {
                item.children = this.filterData(item.children, keywords);
                if (item.children.length) {
                    flag = true;
                }
            }
            return flag;
        })
    }
    throttle(method, delay) {
        var timer=null;
        return function(...args) {
            // var context = this, args = arguments;
            let value = args[0].target.value;
            window.clearTimeout(timer);
            timer = window.setTimeout(()=> {
                method.apply(this, [value]);
            }, delay);
        };
    }
    async loadTreeData() {
        let listPromise = postWaterGate().then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });;
        let dictPromise = getDict(["gate_open_close_mode"]);
        let damTreePromise = postDamTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("控制区树接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let regionTreePromise = postRegionTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("行政区树接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let data = await Promise.all([listPromise, dictPromise, damTreePromise, regionTreePromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            let listData = data[0];
            listData.forEach((item) => {
                item.key = item.id
            })
            let dictData = data[1];
            let damTreeData = [data[2]];
            let regionTreeData = [data[3]];
            this.setState({
                loading: false,
                tableData: listData,
                dictData: dictData,
                treeData: {damTreeData, regionTreeData}
            })
            this.treeData = {damTreeData, regionTreeData};//记录一下 用于搜索
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }
    }
    onbtnClick(key, e) {
        this.setState({
            activeBtn: key
        })
    }
    createModal() {
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"} 
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}>
            <FormSluiceGate ref={(node) => { this.f = node ;}} dictData={this.state.dictData} disabled={false}/>
            
        </Modal>
        return modal;
    }
    modalOkClick() {
        if (this.mode === 1) { //新增状态
            this.add();
        } else if (this.mode === 2) {
            this.modify(this.modifyId);
        }
    }
    newBtnClick(e) {
        this.mode = 1;
        this.setState({
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
           
            
        });

    }
    modifyClick(text, record, index) {
        this.mode = 2;
        this.modifyId = record.id;
        this.setState({
            showModal: true
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            form.setFieldsValue({
                sgCode : record.serialNumber,
                sgName: record.name,
                sgModel: record.model,
                sgSpec: record.spec,
                sgType: record.gateTypeCode,
                sgManufacturer: record.manufacturerId,
                sgChineseShort: record.chineseShort,
                sgPinyinInitial: record.pinyinInitial
            });
            
        });

    }
    removeClick(text, record, index) {
        this.remove(record);
    }
    
    add() {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let item = form.getFieldsValue();
                let data =  {
                    serialNumber : item.sgCode,
                    name: item.sgName,
                    model: item.sgModel,
                    spec: item.sgSpec,
                    gateTypeCode: item.sgType,
                    manufacturerId: item.sgManufacturer,
                    chineseShort: item.sgChineseShort,
                    pinyinInitial: item.sgPinyinInitial
                };
                addWaterGate(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        data.data.key = data.data.id;
                        this.state.tableData.push(data.data);
                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                    } else {

                        this.setState({
                            confirmLoading: false
                        });
                        message.error(data.msg || "服务器异常!", 5);
                        
                    }
                    
                }).catch((ex) => {
                    this.setState({
                        confirmLoading: false
                    });
                    message.error(ex || "服务器异常!",5);
                });
            }
        })
        
    }
    modify(id) {
        let form = this.f.getForm();
        form.validateFields((err)=> {
            if (!err) {
                this.setState({
                    confirmLoading: true
                });
                let item = form.getFieldsValue();
                let data =  {
                    id: id,
                    serialNumber : item.sgCode,
                    name: item.sgName,
                    model: item.sgModel,
                    spec: item.sgSpec,
                    gateTypeCode: item.sgType,
                    manufacturerId: item.sgManufacturer,
                    chineseShort: item.sgChineseShort,
                    pinyinInitial: item.sgPinyinInitial
                };
                modifyWaterGate(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        var d = data.data;
                        d.key = d.id;
                        for (let i = 0; i < this.state.tableData.length; i++) {
                            let item = this.state.tableData[i];
                            if (item.id === d.id) {
                                this.state.tableData[i] = d;
                                break;
                            }
                        }
                        this.setState({
                            confirmLoading: false,
                            showModal: false
                        });
                    } else {
                        this.setState({
                            confirmLoading: false
                        });
                        message.error(data.msg || "服务器异常!", 5);
                    }
                }).catch((ex) => {
                    this.setState({
                        confirmLoading: false
                    });
                    message.error(ex || "服务器异常!",5);
                });
            }
        });
        
    }
    remove(record) {
        let data = {id: record.id};
        removeWaterGate(data).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("接口出错");
            
        }).then((data) => {
            if (data.code === 200) {
                var treeData = this.state.tableData.filter(({id}) => {
                    if (record.id === id) {
                        return false;
                    }
                    return true;
                });
                this.setState({
                    tableData: treeData
                });
            }else{
                message.error(data.msg || "服务器异常!", 5);
            }
            
        }).catch((ex) => {
          
            message.error(ex || "服务器异常!",5);
        });
    }
   
    
}

export default SluiceGate;