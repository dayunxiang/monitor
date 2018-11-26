import React from 'react';
import {Tabs, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table, Tree, Divider, message, Popconfirm, Spin} from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
// import Test from '../../../../components/test.js';
import {irrigation, postDamTree, postRegionTree,control} from '../../../../data/dataStore.js';

// import {cloneObj} from "../../../../../util/common.js"
import {cloneObj} from "../../../../util/common.js"

import "./style.css";
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
class Inbound extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData: [], // table的数据
            activeBtn: 1, //默认选中btn
        };
    }
    render() {
        const columns = [
            {title: '水利设施', dataIndex: 'facilityName', width:'7.7%',align:'center'},
            {title: '时间', dataIndex: 'time', width: '7.7%',align:'center'},
            {title: '水位',width: '15.3%', children: [
                {
                    title: '内河',
                    width: '7%',
                    dataIndex: 'insideWaterLevel',
                    key: 'nh',
                    align:'center'
                    
                },
                {
                    title: '外河',
                    width:  '7%',
                    dataIndex: 'outsideWaterLevel',
                    key: 'wh',
                    align:'center'

                }
            ]},
            {title: '闸位', width: '23%' , children: [
                {
                    title: '内闸',
                    align:'center',
                    width:  '7%',
                    dataIndex: 'insideGateState',
                    key: 'nz',
                    render:insideGateState =>{ 
                        if(insideGateState===3102){
                          return '关闭'
                        } else if(insideGateState===3101){
                          return '打开'
                        }
                       },
                },

               
                {
                    title: '外闸',
                    align:'center',
                    width: '7%',
                    dataIndex: 'outsideGateState',
                    key: 'wz',
                    render:outsideGateState =>{ 
                        if(outsideGateState===3102){
                          return '关闭'
                        } else if(outsideGateState===3101){
                          return '打开'
                        }
                       },
                },
                {
                    title: '节制闸',                   
                    align:'center',
                    width: '7%',
                    dataIndex: 'checkGateState',
                    key: 'jzz',
                    render:checkGateState =>{ 
                        if(checkGateState===3102){
                          return '关闭'
                        } else if(checkGateState===3101){
                          return '打开'
                        }
                       },
                }
            ]},
            {title: '水泵', width: '46%', children: [
                {
                    title: '水泵1',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[0]',
                    key: 'sb1',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[0]!=null &&  record.pumpList[0].pumpState!=null && record.pumpList[0]!='undefind' && record.pumpList[0].pumpState!='undefind'){
            
                            if(  record.pumpList[0].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[0].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },

                {
                    title: '水泵2',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[1].pumpState',
                    key: 'sb2',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[1]!=null &&  record.pumpList[1].pumpState!=null && record.pumpList[1]!='undefind' && record.pumpList[1].pumpState!='undefind'){
            
                            if(  record.pumpList[1].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[1].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },
                {
                    title: '水泵3',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[2].pumpState',
                    key: 'sb3',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[2]!=null &&  record.pumpList[2].pumpState!=null && record.pumpList[2]!='undefind' && record.pumpList[2].pumpState!='undefind'){
            
                            if(  record.pumpList[2].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[2].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },
                {
                    title: '水泵4',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[3].pumpState',
                    key: 'sb4',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[3]!=null &&  record.pumpList[3].pumpState!=null && record.pumpList[3]!='undefind' && record.pumpList[3].pumpState!='undefind'){
            
                            if(  record.pumpList[3].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[3].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },
                {
                    title: '水泵5',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[4].pumpState',
                    key: 'sb5',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[4]!=null &&  record.pumpList[4].pumpState!=null && record.pumpList[4]!='undefind' && record.pumpList[4].pumpState!='undefind'){
            
                            if(  record.pumpList[4].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[4].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },
                {
                    title: '水泵6',
                    width: '7%',
                    align:'center',
                    dataIndex: 'pumpList[5].pumpState',
                    key: 'sb6',
                    render:( text, record, index) =>{ 
                        if( record.pumpList[5]!=null &&  record.pumpList[5].pumpState!=null && record.pumpList[5]!='undefind' && record.pumpList[5].pumpState!='undefind'){
            
                            if(  record.pumpList[5].pumpState===0){
                                return  '关闭'
                                }  else if( record.pumpList[5].pumpState===1){
                                    return '开启'
                                }
                        }
                       }
                },
            ]},
            // {title: '其他', width: 100, children: [
            //     {
            //         title: '视频设备',
            //         width: 100,
            //         dataIndex: 'cameraState',
            //         key: 'spsb',
            //         render:cameraState =>{ 
            //             if(cameraState===0){
            //               return '关闭'
            //             } else if(cameraState===1){
            //               return '打开'
            //             }
            //            },
            //     },
            //     {
            //         title: '网络设备',
            //         width: 100,
            //         dataIndex: 'networkState',
            //         key: 'wlsb',
            //         render:networkState =>{ 
            //             if(networkState===0){
            //               return '关闭'
            //             } else if(networkState===1){
            //               return '打开'
            //             }
            //            },
                // }
            // ]}
        ];
        // 判断
        let NextuserMessage;
        let NextuserMessage1
        // let userMes;
        // 时间组件
        // const RangePicker = DatePicker.RangePicker
        if(this.state.activeBtn ===1){
            NextuserMessage=(
                <Tree 
                // checkStrictly={false}
                defaultExpandAll={true}
                // defaultExpandAll={true}
                onSelect={this.onSelect.bind(this)}
                >
                {this.handlerTreeNode(
                  this.state.treeData && this.state.treeData.damTreeData
                    )}
            </Tree>
            )
        } else if(this.state.activeBtn ===2){
            NextuserMessage1=(
                <Tree  checkable
                multiple={true}
                disableCheckbox={true} 
                onCheck={this.onCheck.bind(this)}
                defaultExpandAll={true}
                checkStrictly={true}
                >
                {this.handlerTreeNode(
                this.state.treeData && this.state.treeData.regionTreeData
                    )}
             </Tree>
        ) } 
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
                             {NextuserMessage}
                             {NextuserMessage1}
                            
                        </div>
                    </div>
                    <div className="ps-flex-item ps-right-item">
                        <Row>
                            <Col xs={24} >
                                <div className="zs-table-cont">
                                <div className="psdh">
                                <Table ref="table"  bordered={true} 
                             columns={columns} 
                             dataSource={this.state.tableData} onRow={(record, index) =>{ return { onClick: this.tableRowClick.bind(this, record, index) }}}
                             pagination={{defaultPageSize:45}}/>
                                </div>
                               
                                </div>
                            </Col>
                            
                           
                        </Row>
                    </div>

                </div>
                
            </div>
        );
    }
    // 点击树形
    onSelect = (selectedKeys, info, node, event) => {
        this.ID=selectedKeys[0];   //点击具体 
         console.log(selectedKeys[0],'selectedKeys[0]')
        this.irrigationn()

    }

    // 点击行政区
    // onSelectregion=(selectedKeys,info, node, event)=>{
    //  this.list=selectedKeys
    //  console.log(this.list,'this.list')
    // }

    // 点击复选框触发
    onCheck=(defaultCheckedKeys)=>{
        this.list=defaultCheckedKeys.checked;
        this.administration()  //行政区
        // console.log(defaultCheckedKeys.checked,'checkedKeys')
    }
    // 点击事件
    onbtnClick(key, e) {
        this.setState({
            activeBtn: key
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

    // 树
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n}></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} >{nodes} </Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    componentDidMount() {
        super.componentDidMount();
        this.irrigationn()
        this.loadData()
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
        // 交互部分    默认展示接口
    async loadData() {
        // let wlPromise = irrigation({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
        //     if (data.code === 200) {
        //         return data.data;
        //     }
        //     return Promise.reject(data.msg);
        // });
        let damTreePromise = postDamTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("控制区树接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
                // console.log(data.data,'控制区树')
            }
           
            return Promise.reject(data.msg);
        });
        let regionTreePromise = postRegionTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("行政区树接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        let data = await Promise.all([ damTreePromise, regionTreePromise ]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
           // let wlData = data[0];  //默认展示
            // wlData.forEach((item) => {
            //     item.key = item.id
            // })
            let damTreeData = [data[0]];  //控制区
            let regionTreeData = [data[1]];  //行政区
            this.setState({
                loading: false,
                // tableData:wlData,
                treeData: {damTreeData, regionTreeData}
            })
            this.treeData = {damTreeData, regionTreeData};//记录一下 用于搜索
        }else{
            this.setState({
                loading: false
            });
            message.error(data ||  "服务器异常!",5);
        }

    }
     // 树形搜索
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
    // 这是点击控制区树展示的
    async irrigationn() {
        let param={
            damDomainIds:this.ID  ? this.ID : ''
        }
        let data = await control(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            // console.log(data.data,'水利设施内容')
            //  var tableDate3=data.data.targetRecordList;  
            // var tt=tableDate3.map((item,index)=>{
            //     return item   //六个中的每一个
            // })   
            // var xx=tableDate3.map((item,index)=>{
            //     return item.subTargetRecordList;   //六个中的每一个
            // })
            this.setState({
                loading: false,
                 tableData:data.data,     
            })
        }
    }
    // 行政区树
    async administration () {
        let param={
            facilityInfoIds:this.list  ? this.list : ''
        }
        let data = await irrigation(param).then((res) =>{ return res.json();}).catch(ex => {});
        if (data && data.data ) {
            // console.log(data.data,'水利设施内容')
            //  var tableDate3=data.data.targetRecordList;  
            // var tt=tableDate3.map((item,index)=>{
            //     return item   //六个中的每一个
            // })   
            // var xx=tableDate3.map((item,index)=>{
            //     return item.subTargetRecordList;   //六个中的每一个
            // })
            this.setState({
                loading: false,
                 tableData:data.data,     
            })
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    tableRowClick(record, index) {

    }}
export default Inbound;