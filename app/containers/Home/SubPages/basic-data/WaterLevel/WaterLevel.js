import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Tree,Table, Divider, message, Popconfirm, Spin} from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'

// import FormWaterLevel from '../../../../../components/OperatorForm/OperatorForm.js';
import FormWaterLevel from '../../../SubPages/basic-data/WaterLevel/FormWaterLevel.js'
import {postWaterLevel, addWaterLevel, modifyWaterLevel, removeWaterLevel, postDamTree, postRegionTree} from '../../../../../data/dataStore.js';
// import Vktable from '../../../../../components/Vktable/Vktable.js';
// import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
// import Cover from '../../../../../components/Cover/Cover.js';
import Modal from '../../../../../components/Modal/Modal.js';
import {cloneObj} from "../../../../../util/common.js"
import NiceTree from '../../../../../components/NiceTree/NiceTree.js';
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class WaterLevel extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            treeData: {},
            activeBtn: 1, //默认选中btn
            showModal: false,
            confirmLoading: false,
            tableData: null,
            
        }
        // this.treeForceRender = false;

    }
    render() {
        const columns = [
            {title: '水位仪名称', dataIndex: 'name', width: "10%"},
            {title: '识别码', dataIndex: 'serialNumber', width: "8%"},
            {title: '型号', dataIndex: 'model', width: "8%"},
            {title: '型式', dataIndex: 'spec', width: "10%"},
            {title: '量程(M)', dataIndex: 'rangeAbility', width: "8%"},
            {title: '最大水位变率', dataIndex: 'maxChangeRate', width: "8%"},
            {title: '分辨率', dataIndex: 'resolvingPower', width: "8%"},
            {title: '最高工作水温', dataIndex: 'maxWorkWaterTemperature', width: "8%"},
            {title: '最低工作水温', dataIndex: 'minWorkWaterTemperature', width: "8%"},
            {title: '最高工作环境温度', dataIndex: 'maxWorkAmbientTemperature', width: "8%"},
            {title: '最低工作环境温度', dataIndex: 'minWorkAmbientTemperature', width: "8%"},

            {title: '生产厂商', dataIndex: 'manufacturerId', width: "10%"},
            {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            {title: '拼音或首字母', dataIndex: 'pinyinInitial', width: "10%"},
            {title: '修改', dataIndex: "", width: "5%", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "", width: "5%", render: (text, record, index) => {
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
                            {
                                    <NiceTree checkable
                                        multiple={true}
                                        disableCheckbox={true} 
                                        onCheck={this.onCheck.bind(this)}
                                        defaultExpandAll={true}
                                        checkStrictly={true}
                                        forceRender={this.treeForceRender}
                                        dataSource={(this.state.activeBtn ===1) ? (this.state.treeData && this.state.treeData.damTreeData) :(this.state.treeData && this.state.treeData.regionTreeData)}
                                        >
                                    </NiceTree>
                            }
                            
                        </div>
                    </div>
                    <div className="ps-flex-item ps-right-item">
                        <Row>
                            <Col xs={24} >
                                <div className="ps-ir-title">
                                    <Icon type="book"></Icon>
                                    水位仪基础资料
                                    <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                                </div>
                                
                                <Divider className="ps-ir-divider"/>
                            </Col>
                            <Col xs={24}>
                                <Col md={6}>
                                    <Col md={8}><label className="ps-search-label">河流方位</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
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
// 
                </div>
                
                {this.createModal()}
            </div>
            
        )
    }
    componentDidMount() {
        super.componentDidMount();
        // this.handlerTableFns();
        this.loadData();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
    componentDidUpdate(prevProps, prevState) {
        console.timeEnd("123");
    }
     // 点击复选框触发
     onCheck=(defaultCheckedKeys)=>{
        // console.log(defaultCheckedKeys,'checkedKeys')
    }
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n}>{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
        // console.log("onChange",selectedRowKeys, selectedRows );
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
    async loadData() {
        let wlPromise = postWaterLevel({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
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
        let data = await Promise.all([wlPromise, damTreePromise, regionTreePromise ]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            let wlData = data[0];
            wlData.forEach((item) => {
                item.key = item.id
            })
            let damTreeData = [data[1]];
            let regionTreeData = [data[2]];
            // this.treeForceRender = true;
            this.setState({
                loading: false,
                tableData:wlData,
                treeData: {damTreeData, regionTreeData}
            },() => {
                // this.treeForceRender = false;
            })
            this.treeData = {damTreeData, regionTreeData};//记录一下 用于搜索
        }else{
            this.setState({
                loading: false
            });
            message.error(data ||  "服务器异常!",5);
        }

    }
    onbtnClick(key, e) {
        // this.treeForceRender = true;
        this.setState({
            activeBtn: key
        },() => {
            // this.treeForceRender = false;
        })
    }
    createModal() {
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"} 
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}
            >

            <FormWaterLevel ref={(node) => { this.f = node ;}} disabled={false}/>
            
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
        console.time("123");
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
                wlName : record.name,
                wlCode: record.serialNumber,
                wlModel: record.model,
                wlSpec: record.spec,
                wlRange: record.rangeAbility,
                wlMaxChangeRate: record.maxChangeRate,
                wlResolvingPower : record.resolvingPower,
                wlMaxWorkWaterTemperature: record.maxWorkWaterTemperature,
                wlMinWorkWaterTemperature: record.minWorkWaterTemperature,
                wlMaxWorkAmbientTemperature: record.maxWorkAmbientTemperature,
                wlMinWorkAmbientTemperature: record.minWorkAmbientTemperature,
                wlManufacturer: record.manufacturerId,
                wlChineseShort: record.chineseShort,
                wlPinyinInitial: record.pinyinInitial
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
                    name : item.wlName,
                    serialNumber: item.wlCode*1,
                    model: item.wlModel,
                    spec: item.wlSpec,
                    rangeAbility: item.wlRange,
                    maxChangeRate: item.wlMaxChangeRate,
                    resolvingPower : item.wlResolvingPower,
                    maxWorkWaterTemperature: item.wlMaxWorkWaterTemperature,
                    minWorkWaterTemperature: item.wlMinWorkWaterTemperature,
                    maxWorkAmbientTemperature: item.wlMaxWorkAmbientTemperature,
                    minWorkAmbientTemperature: item.wlMinWorkAmbientTemperature,
                    manufacturerId: item.wlManufacturer,
                    chineseShort: item.wlChineseShort,
                    pinyinInitial: item.wlPinyinInitial
                };
                addWaterLevel(data).then((res) => {
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
                    name : item.wlName,
                    serialNumber: item.wlCode*1,
                    model: item.wlModel,
                    spec: item.wlSpec,
                    rangeAbility: item.wlRange,
                    maxChangeRate: item.wlMaxChangeRate,
                    resolvingPower : item.wlResolvingPower,
                    maxWorkWaterTemperature: item.wlMaxWorkWaterTemperature,
                    minWorkWaterTemperature: item.wlMinWorkWaterTemperature,
                    maxWorkAmbientTemperature: item.wlMaxWorkAmbientTemperature,
                    minWorkAmbientTemperature: item.wlMinWorkAmbientTemperature,
                    manufacturerId: item.wlManufacturer,
                    chineseShort: item.wlChineseShort,
                    pinyinInitial: item.wlPinyinInitial
                };
                modifyWaterLevel(data).then((res) => {
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
        removeWaterLevel(data).then((res) => {
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

export default WaterLevel;