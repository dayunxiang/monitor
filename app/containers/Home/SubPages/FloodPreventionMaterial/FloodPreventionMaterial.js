//FloodPreventionMaterial
import React from 'react';
import ReactDOM from 'react-dom'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, message, Divider , Popconfirm, Spin }  from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js'
import { floodPrevMatList, addFloodPrevMat, updateFloodPrevMat, removeFloodPrevMat, getDict, floodPrevDict } from '../../../../data/dataStore.js';
import FormFloodPreventionMaterial from './FormFloodPreventionMaterial.js';
import Modal from '../../../../components/Modal/Modal.js';
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
// import "./style.css";
class FloodPreventionMaterial extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            formDisable:true, //表单可编辑性
            cover:false, //遮盖
            showModal: false, 
            confirmLoading: false
        }
    }
    render() {
        const columns = [
            {title: '物资id',dataIndex: 'id' ,width: "10%"},
            {title: '物资名称',dataIndex: 'name',width: "10%"},
            {title: '物资类型',dataIndex: 'type',width: "10%"},
            {title: '型号及规格',dataIndex: 'modelSpecification',width: "10%"},
            {title: '计量单位',dataIndex: 'metricUnit',width: "10%"},
            {title: '数量',dataIndex: 'gmtCreate',width: "10%"},
            {title: '养护频次',dataIndex: 'maintenanceFrequency',width: "10%"},
            {title: '创建时间',dataIndex: 'gmtCreate',width: "10%"},
            {title: '修改时间',dataIndex: 'gmtModified',width: "10%"},
            {title: '所属仓库',dataIndex: 'location',width: "10%"},
            {title: '修改', dataIndex: "", fixed:"right", render: (text, record, index) => {
                return <a href="javascript:void(0)" onClick={this.modifyClick.bind(this, text, record, index)}>修改</a>;
            }},
            {title: '删除', dataIndex: "",  fixed:"right", render: (text, record, index) => {
                return <Popconfirm title="是否确认删除?" onConfirm={this.removeClick.bind(this, text, record, index)}  okText="Yes" cancelText="No">
                    <a href="#">删除</a>
                </Popconfirm>;
            }}
        ];
       
        return (
            this.state.loading ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <Row>
                    <Col xs={24} >
                        <div className="ps-ir-title">
                            <Icon type="book"></Icon>
                            防汛仓库信息
                            <Button type="primary" size="small" className="ps-new" onClick={this.newBtnClick.bind(this)}>新增</Button>
                        </div>
                        
                        <Divider className="ps-ir-divider"/>
                    </Col>
                    <Col  md={24} >
                        <Table ref="table" size={'small'} bordered={true} scroll={{x:true}} 
                            rowSelection={{onSelect:this.onSelect,onChange:this.onChange.bind(this)}} columns={columns} 
                            dataSource={this.state.tableData} 
                            onRow={(record, index) => ({
                                onClick: null
                              })}
                                rowClassName={this.rowClassName.bind(this)} pagination={{defaultPageSize:30}}/>

                    </Col>
                    <Col  md={16} >
                        {//<FormRive ref="form" disabled={this.state.formDisable}/>
                        }
                    </Col>
                </Row>
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
    async loadData() {
        let floodPromise = floodPrevMatList({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let dictPromise = getDict(["goods_type","metric_unit"]);
        let whPromise = floodPrevDict().then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let data = await Promise.all([floodPromise, dictPromise, whPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            let tableData = data[0];
            tableData.forEach((item) => {
                item.key = item.id
            });
            let dictData = data[1];
            this.setState({
                loading: false,
                tableData: tableData,
                dictData: dictData,
                whData: data[2]
            })
        }else{
            this.setState({
                loading: false
            })
            message.error((data && data.msg) || data ||  "服务器异常!",5);
        }

    }
    
    createModal() {
        let modal = 
         <Modal visible={this.state.showModal} width={"90%"}
            onClose={() => {this.setState({showModal: false})}}
            onOk={this.modalOkClick.bind(this)}
            confirmLoading={this.state.confirmLoading}>
            {
                <FormFloodPreventionMaterial ref={(node) => { this.f = node ;}} disabled={false} dictData={this.state.dictData} whData={this.state.whData}/>
            }
            
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
            // form.resetFields();
            form.setFieldsValue({
                fpName: record.name,
                fpLocation: record.location,
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
                    name: item.fpName,
                    location: item.fpLocation
                };
                addFloodPrevMat(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        data.data[0].key = data.data[0].id;
                        this.state.tableData.push(data.data[0]);
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
                    name: item.fpName,
                    location: item.fpLocation
                };
                updateFloodPrevMat(data).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject("接口出错");
                    
                }).then((data) => {
                    if (data.code === 200) {
                        var d = data.data[0];
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
        removeFloodPrevMat(data).then((res) => {
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

export default FloodPreventionMaterial;