import React from 'react';
import ReactDOM from 'react-dom'
import { Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin } from '../../../../../components/Antd.js';
import BaseSubPage from '../../BaseSubPage.js'
import FormLrrigation from '../../../SubPages/basic-data/Irrigation/FormLrrigation.js'
import Vktable from '../../../../../components/Vktable/Vktable.js';
// import Toolbar from '../../../../../components/Toolbar/Toolbar.js';
// import Cover from '../../../../../components/Cover/Cover.js';
import Modal from '../../../../../components/Modal/Modal.js';
import { postIrrigation,postIrrigationBasic, postCamera, postWaterGate, postWaterPump, postNetwork, postWaterLevel, getDict,
    addIrrigation, modifyIrrigation, removeIrrigation, getOneIrrigation, postDamTree, postRegionTree } from '../../../../../data/dataStore.js';
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import NiceTree from '../../../../../components/NiceTree/NiceTree.js';
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import {cloneObj} from "../../../../../util/common.js"
import "./style.css";
// import "./style.css";
class Irrigation extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            activeBtn: 1, //默认选中btn
            showModal: false,
            dictData:{}, // 字典数据
            treeData: {},
            confirmLoading: false, // 确认转圈
            detailLoading: false, // 明细内容出来前转圈
            primaryData: null, //基础数据
            searchValue: {
                name: ""
            }

        }

    }
    render() {
        const columns = [
        	{title: '水利设施编码',dataIndex: 'serialNumber' ,width: "15%"},
			{title: '名称',dataIndex: 'name',width: "10%"},
			{title: '口门类型',dataIndex: 'gateTypeName',width: "10%"},
        	{title: '设施类型',dataIndex: 'facilityTypeName',width: "10%"},
        	{title: '设施位置',dataIndex: 'location',width: "10%"},
        	{title: '水闸类型',dataIndex: 'waterGateTypeName',width: "10%"},
        	{title: '建造日期',dataIndex: 'buildDate',width: "15%"},
        	{title: '平均宽度',dataIndex: 'facilityAverageWidth',width: "10%"},
            {title: '中文简写', dataIndex: 'chineseShort', width: "10%"},
            {title: '拼音或首字母', dataIndex: 'pinyinInitial', width: "10%"},
            {title: '修改', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">删除</a>
                </Popconfirm>;
            }}   	
        ];
        
        let delMessage = this.state.checkedRowData ? this.state.checkedRowData.map(function(item, i) {
        	return item.name;
        }).join(","):""
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
                                    defaultExpandAll={true}
                                    checkStrictly={true}
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
                                    水利设施基础资料
                                    <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                                </div>
                                
                                <Divider className="ps-ir-divider"/>
                            </Col>
                            <Col xs={24}>
                                <Col md={5}>
                                    <Col md={8}><label className="ps-search-label">名称</label></Col>
                                    <Col md={16}>
                                        <Input ref={(node) => {this.searchNameInput = node;}} ></Input>
                                    </Col>
                                </Col>
                                <Col md={5}>
                                    <Col md={8}><label className="ps-search-label">类型</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
                                <Col md={5}>
                                    <Col md={8}><label className="ps-search-label">闸孔类别</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
                                <Col md={5}>
                                    <Col md={8}><label className="ps-search-label">启闭方式</label></Col>
                                    <Col md={16}>
                                        <Select defaultValue="1" style={{ width: '100%' }}>
                                            <Option value="1">全部</Option>
                                        </Select>
                                    </Col>
                                </Col>
                                <Col md={4}>
                                    <Col xs={20} offset={4}>
                                        <Button.Group>
                                            <Button type="primary" onClick={this.searchClick.bind(this)}>搜索</Button>
                                            <Button type="primary">导出</Button>
                                        </Button.Group>
                                    </Col>
                                    
                                </Col>
                            </Col>
                            <Col xs={24} className="ps-ir-table">
                                <Table ref="table" size={'small'} bordered={true} scroll={{}}
                                    columns={columns}
                                    dataSource={this.handleSearchTableData(this.state.tableData)}
                                    rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>
                            </Col>
                        </Row>
                    </div>

                </div>
        		
				{this.createModal()}

        	</div>
            
        )
    }
    componentWillReceiveProps(nextProps) {
        console.time("123")
    }
    componentDidUpdate(prevProps, prevState) {
        
        console.timeEnd("123")
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
   
    searchClick() {
        // let searchName = this.searchNameInput.input.value;
        // console.log(this.searchNameInput)
        // let d = this.tableData.filter(({name}) => {
        //     if (name.indexOf(searchName) > -1 ) {
        //         return true;
        //     }
        //     return false;
        // })
        // this.setState({
        //     tableData: d
        // })
        this.forceUpdate();
    }
    handleSearchTableData(data) {
        if (!Array.isArray(data)) return null;
        let searchName = this.searchNameInput && this.searchNameInput.input.value;
        if (searchName == null) return data;
        let d = data.filter(({name}) => {
            if (name.indexOf(searchName) > -1 ) {
                return true;
            }
            return false;
        })
        return d;
    }
    async loadTreeData() {
        // postCamera, postWaterGate, postWaterPump, postNetwork, postWaterLevel
        let irPromise = postIrrigationBasic({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水利设施接口出错");}).then((data) => {
            if (data.code === 200) {
                // console.log(data.data,'data.data')

                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let CameraPromise = postCamera({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("视频接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let WaterGatePromise = postWaterGate().then((res) =>{ return res.ok ? res.json() : Promise.reject("闸门接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let WaterPumpPromise = postWaterPump().then((res) =>{ return res.ok ? res.json() : Promise.reject("水泵接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let postNetworkPromise = postNetwork().then((res) =>{ return res.ok ? res.json() : Promise.reject("网络设备接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let WaterLevelPromise = postWaterLevel({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水位仪接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let dictPromise = getDict(["facility_type", "water_gate_type", "gate_river_position_type", "gate_type"]);
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
        let data = await Promise.all([irPromise, dictPromise, CameraPromise, WaterGatePromise, WaterPumpPromise, postNetworkPromise, WaterLevelPromise, damTreePromise, regionTreePromise]).then((data) => {
            return data;
        }).catch(ex => { return ex instanceof Object ? ex.toString(): ex;;})
        if (Array.isArray(data) && data.length ) {
            let listData = data[0]; 
            if (listData == null) {
                listData = [];
            }
            listData.forEach((item) => {
                item.key = item.id
            })
            // this.tableData = listData;
            let dictData = data[1];
            let cameraData = data[2];
            cameraData = cameraData.map(({id, name}) => {
                return {value: id, text: name};
            })
            let waterGateData = data[3];
            waterGateData = waterGateData.map(({id, name}) => {
                return {value: id, text: name};
            })
            let waterPumpData = data[4];
            waterPumpData = waterPumpData.map(({id, name}) => {
                return {value: id, text: name};
            })
            let networkData = data[5];
            networkData = networkData.map(({id, name}) => {
                return {value: id, text: name};
            })
            let waterLevelData = data[6];
            waterLevelData = waterLevelData.map(({id, name}) => {
                return {value: id, text: name};
            })
            let damTreeData = [data[7]];
            let regionTreeData = [data[8]];
            this.setState({
                loading: false,
                tableData: listData,
                dictData: dictData,
                primaryData: {cameraData, waterGateData, waterPumpData, networkData, waterLevelData},
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
        const swColumns = [
            {title: '水位仪',dataIndex: 'id',width: "34%",type:"Select", getData:() => {
                return this.state.primaryData && this.state.primaryData.waterLevelData;
            }}
        ];
        const zmColumns = [
            {title: '闸门',dataIndex: 'id',width: "34%",type:"Select", getData:() => {
                return this.state.primaryData && this.state.primaryData.waterGateData;
            }},
            {title: '闸门安装位置',dataIndex: 'positionType',width: "34%",type:"Select", getData:() => {
                return this.state.dictData && this.state.dictData.gate_river_position_type;
            }}
        ];
        const sbColumns = [
            {title: '水泵',dataIndex: 'id',width: "34%",type:"Select", getData:() => {
                return this.state.primaryData && this.state.primaryData.waterPumpData;
            }}
        ];
        const spColumns = [
            {title: '视频',dataIndex: 'id',width: "34%",type:"Select", getData:() => {
                return this.state.primaryData && this.state.primaryData.cameraData;
            }}
        ];
        const wlColumns = [
            {title: '网络设备',dataIndex: 'id',width: "34%",type:"Select", getData:() => {
                return this.state.primaryData && this.state.primaryData.networkData;
            }}
        ];
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"} 
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}
            >
            {this.state.detailLoading ? <div className="ps-loading-center"><Spin size="large" /></div> : 
            <div>
                <FormLrrigation ref={(node) => { this.f = node ;}} dictData={this.state.dictData} disabled={false}/>
                <Tabs defaultActiveKey="bindSw">
                    <TabPane tab="水位仪" key="bindSw" forceRender={true}>
                        
                        <Vktable ref={(node) => {this.swTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                             columns={swColumns} tempKey="vk-mt"
                        />
                    </TabPane>
                    <TabPane tab="闸门" key="bindZm" forceRender={true}>
                        <Vktable ref={(node) => {this.zmTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                             columns={zmColumns} tempKey="vk-mt"
                        />
                    </TabPane>
                    <TabPane tab="水泵" key="bindSb" forceRender={true}>
                        <Vktable ref={(node) => {this.sbTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                             columns={sbColumns} tempKey="vk-mt"
                        />
                    </TabPane>
                    <TabPane tab="视频" key="bindSp" forceRender={true}>
                        <Vktable ref={(node) => {this.spTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                             columns={spColumns} tempKey="vk-mt"
                        />
                    </TabPane>
                    <TabPane tab="网络设备" key="bindWl" forceRender={true}>
                        <Vktable ref={(node) => {this.wlTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                             columns={wlColumns} tempKey="vk-mt"
                        />
                    </TabPane>
                </Tabs>
            </div>}
            
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
            showModal: true,
            detailLoading: false
        }, () => {
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            this.swTable.new();
            this.zmTable.new();
            this.sbTable.new();
            this.spTable.new();
            this.wlTable.new();
        });
      

    }
    modifyClick(text, record, index) {
        this.mode = 2;
        this.modifyId = record.id;
        this.setState({
            showModal: true,
            detailLoading: true
        });
        getOneIrrigation({id: record.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        }).then((item) => {
            this.setState({
                detailLoading: false
            })
            if (!this.f) return;
            let form = this.f.getForm();
            form.resetFields();
            form.setFieldsValue({
                lrCode : item.serialNumber,
                lrName: item.name,
                lrGateType: item.gateType+"",
                lrFacilityType: item.facilityType+"",
                lrLocation: item.location,
                lrWaterGateType: item.waterGateType+"",
                lrBuildDate: item.buildDate && moment(item.buildDate, 'YYYY-MM-DD hh:mm:ss'),
                lrFacilityAverageWidth: item.facilityAverageWidth,
                lrChineseShort: item.chineseShort,
                lrPinyinInitial: item.pinyinInitial
            });
            item.levelList && item.levelList.forEach((item) => { item.key = item.id; });
            item.gateList && item.gateList.forEach((item) => { item.key = item.id; item.positionType = item.positionType+""; });
            item.pumpList && item.pumpList.forEach((item) => { item.key = item.id; });
            item.cameraList && item.cameraList.forEach((item) => { item.key = item.id; });
            item.networkList && item.networkList.forEach((item) => { item.key = item.id; });
            this.swTable.edit(item.levelList);
            this.zmTable.edit(item.gateList);
            this.sbTable.edit(item.pumpList);
            this.spTable.edit(item.cameraList);
            this.wlTable.edit(item.networkList);

        })
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
                    serialNumber : item.lrCode,
                    name: item.lrName,
                    gateType: item.lrGateType,
                    facilityType: item.lrFacilityType,
                    location: item.lrLocation,
                    waterGateType: item.lrWaterGateType,
                    buildDate: item.lrBuildDate.format('YYYY-MM-DD hh:mm:ss'),
                    facilityAverageWidth: item.lrFacilityAverageWidth,
                    chineseShort: item.lrChineseShort,
                    pinyinInitial: item.lrPinyinInitial,
                    levelList: this.swTable.getData(),
                    gateList: this.zmTable.getData(),
                    pumpList: this.sbTable.getData(),
                    cameraList: this.spTable.getData(),
                    networkList: this.wlTable.getData()
                };
                console.log(data )
                addIrrigation(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        data.data.key = data.data.id;
                        this.state.tableData.push(data.data);
                        // if (this.state.tableData !== this.tableData) {
                        //     this.tableData.push(data.data)
                        // }
                        
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
                    serialNumber : item.lrCode,
                    name: item.lrName,
                    gateType: item.lrGateType,
                    facilityType: item.lrFacilityType,
                    location: item.lrLocation,
                    waterGateType: item.lrWaterGateType,
                    buildDate: item.lrBuildDate.format('YYYY-MM-DD hh:mm:ss'),
                    facilityAverageWidth: item.lrFacilityAverageWidth,
                    chineseShort: item.lrChineseShort,
                    pinyinInitial: item.lrPinyinInitial,
                    levelList: this.swTable.getData(),
                    gateList: this.zmTable.getData(),
                    pumpList: this.sbTable.getData(),
                    cameraList: this.spTable.getData(),
                    networkList: this.wlTable.getData()
                };
                modifyIrrigation(data).then((res) => {
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
                                Object.assign(this.state.tableData[i], d)
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
        removeIrrigation(data).then((res) => {
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
                // var treeData2 = this.tableData.filter(({id}) => {
                //     if (record.id === id) {
                //         return false;
                //     }
                //     return true;
                // });
                // this.tableData = treeData2;
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

export default Irrigation;