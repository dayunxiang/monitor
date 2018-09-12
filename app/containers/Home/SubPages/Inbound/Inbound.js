import React from 'react';
import ReactDOM from 'react-dom'
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js'
import InboundForm from '../../../../components/InboundForm/InboundForm.js';
import Toolbar from '../../../../components/Toolbar/Toolbar.js';
import Cover from '../../../../components/Cover/Cover.js';
import Scroll from '../../../../components/Scroll/Scroll.js';
import { cloneObj } from '../../../../util/common.js';
import moment from 'moment';
import Vktable from '../../../../components/Vktable/Vktable.js';
// import Test from '../../../../components/test.js';
// import "./style.css";

class Inbound extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData:null, //table的数据
            tableSelData:null, //当前选中的行数据
            tableSelDtlData:null, //当前选中后的详细数据
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
            {title: '单据编号',dataIndex: 'billNo' ,width: "33%"},
            {title: '单据状态',dataIndex: 'status',width: "33%"},
            {title: '时间',dataIndex: 'createTime',width: "34%"},
            
        ];
        const dtlColumns = [
            {title: '物料',dataIndex: 'material' ,width: "33%", type:"Input",render:(text, record) => {
                if(this.state.cover){
                    return <Input defaultValue={text} onChange={this.tableDtlInputChange.bind(this,record,"material")}/>;
                }else{
                    return text;
                }
                
            }},
            {title: '数量',dataIndex: 'num',width: "34%",type:"Number", render:(text, record) => {
                if(this.state.cover){
                    return <Input defaultValue={text} onChange={this.tableDtlInputChange.bind(this,record,"num")}/>;
                }else{
                    return text;
                }
            }},
            
        ];
        //
        let toolbarOpt = {
            newClick: this.toolbarNewClick.bind(this),
            editClick: this.toolbarEditClick.bind(this),
            removeClick:this.toolbarRemoveClick.bind(this),
            saveClick: this.toolbarSaveClick.bind(this),
            cancelClick: this.toolbarCancelClick.bind(this),
            extBtnClick:this.toolbarExtBtnClick.bind(this)
        };
        let delMessage = this.state.checkedRowData ? this.state.checkedRowData.map(function(item, i){
            return item.name;
        }).join(","):"";
        
        return (
            <div className="vk-subpage" >
                <Row>
                    <Col  md={8} >
                        <Toolbar {...toolbarOpt}/>
                        <Table ref="table" size={'small'} bordered={false} scroll={{x:250}} 
                            rowSelection={{onSelect:this.onSelect,onChange:this.onChange.bind(this)}} columns={columns} 
                            dataSource={this.state.tableData} onRow={(record, index) =>{ return { onClick:this.tableRowClick.bind(this, record, index) }}}
                            expandedRowRender={record => <p>{'哈哈哈哈哈'}</p>} pagination={{defaultPageSize:30}}/>
                        {this.state.cover? <Cover cover={this.state.cover} />:null} 

                    </Col>
                    <Col  md={16} >
                        <InboundForm formData={this.state.tableSelDtlData} ref="form" disabled={this.state.formDisable} />
                        
                            <div className="vktest" style={{height:"150px",overflow:"auto"}}>
                                <Scroll>
                                    <div>
                                        <p>1</p>
                                        <p>2</p>
                                        <p>3</p>
                                        <p>4</p>
                                        <p>5</p>
                                        <p>6</p>
                                    </div>
                                </Scroll>
                            </div>
                        
                        
                        <Vktable ref={(node) => {this.vkTable = node;}} size={'small'} bordered={false} scroll={{x:true}} 
                            rowSelection={{onSelect:null,onChange:null}} columns={dtlColumns} tempKey="vk-mt"
                        />
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
    componentWillUnmount(){
        super.componentWillUnmount();
        window.removeEventListener("resize", this.onresize);
    }
    
    //处理表格的方法,主要表格撑长
    handlerTableFns() {
         let offset = 200;
        this.setState({
            tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
        });
        
        // let offset = 200;
        let table = this.refs.table;
        let tableDom = ReactDOM.findDOMNode(table);
        let tableBodyDom = tableDom.getElementsByClassName("ant-table-body")[0];
        tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset-4) : (500 - offset)) + 'px';
        this.onresize = () => {
            this.setState({
                tableSrcollY: (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset))
            });
            tableBodyDom.style.height = (window.innerHeight > 500 ? (window.innerHeight - offset) : (500 - offset)) + 'px';

        }
        window.addEventListener("resize", this.onresize);
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
    loadTableData() {
        let columns = [];
        for (var i = 0; i < 74; i++) {
            columns.push({key:i, billNo:"2017110821212121212121212"+i, createTime:"2017-11-08 12:12:12", status:"10", applyMan:"taosy", warehouse:"1",
                            // materialDtl:[
                            //     {key:i,id:"102",material:"猕猴桃",num:"20"+i}
                            // ]
                        })
        }
        this.setState({
            tableData:columns
        })

    }
    tableRowClick(record, index, event) {
        // console.log(record, index, event);
        this.setState({
            tableSelData: record
        });
        window.setTimeout(() => {
            let dtlData = {
                billNo:"201711080001",
                createTime:"2017-11-08 12:12:12",
                status:"10",
                applyMan:"taosy",
                warehouse:"1",
                materialDtl:[
                    {key:1,id:"102",material:"猕猴桃",num:"201"}
                ]
            }
            this.setState({
                tableSelDtlData: dtlData
            }, () => {
                this.fillForm();
            });
        },0);
        
    }
    toolbarExtBtnClick(state, item){
        if (item.key == "next") {
            console.log("next")
            this.state.tableData[20].billNo = 123;
            this.forceUpdate();
        }
    }
    toolbarNewClick(success){
        success();
        this.newForm();
        this.setState({
            formDisable:false,
            cover:true,
        });
    }
    toolbarEditClick(success){
        if (this.state.tableSelDtlData) {
            success();
            this.setState({
                formDisable:false,
                cover:true,
            });
            this.editForm();
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
        
  //    Modal.warning({
        //     title: '确认',
        //     content: 'some messages...some messages...',
        //     maskClosable:true,
        //     cancelText: "取消",
        //     okText:"确定",
        //     onOk:function(a){
        //      console.log(a, a());
        //      ;
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
                var vals = this.getFormValue();
                var tableData = this.vkTable.getData();
                console.log(tableData);
                window.setTimeout(() => {
                    success();
                    this.vkTable.ownerFill();
                    form.resetFields();
                    if (status === 2) { //新增
                        // var formData = {key:100, billNo:vals.billNo, createTime:vals.billTime, status:vals.billStatus, applyMan:vals.applyMan, warehouse:vals.warehouse};
                        // this.state.tableData.push(formData);
                        // var dtlData = Object.assign({},formData,{materialDtl: this.state.tableDtlData})
                        // this.setState({
                        //     tableData:this.state.tableData,
                        //     tableSelData: formData,
                        //     tableSelDtlData: dtlData,
                        //     formDisable:true,
                        //     cover:false,
                        //     tableDtlData:null
                        // },() => {
                        //     this.fillForm();
                        // });
                    }else{ //修改
                        // var data = { billNo:vals.billNo, createTime:vals.billTime, status:vals.billStatus, applyMan:vals.applyMan, warehouse:vals.warehouse};
                        // var nowData = null;
                        // this.state.tableData.forEach((item) => {
                        //     if (item.key === this.state.tableSelData.key) {
                        //         nowData = Object.assign(item,data);
                        //         return false;
                        //     }
                        // });
                        // this.state.tableSelDtlData.materialDtl = this.state.tableDtlData;
                        // var dtlData = Object.assign(this.state.tableSelDtlData,data);
                        
                        // this.setState({
                        //     tableData:this.state.tableData,
                        //     tableSelData: nowData,
                        //     tableSelDtlData: dtlData,
                        //     formDisable:true,
                        //     cover:false,
                        //     tableDtlData:null
                        // },() => {
                        //     this.fillForm();
                        // });
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
            cover:false,
        });
        this.cancelForm();
    }
    //获取表单的对象
    getFormValue(){
        var form = this.refs.form.getForm();
        var vals = form.getFieldsValue();
        return {
            ...vals,
            billTime: vals.billTime.format('YYYY-MM-DD HH:mm:ss')
        }
    }
    //填充表单
    fillForm(){
        var form = this.refs.form.getForm(), selData = this.state.tableSelDtlData;
        if (selData) {
            form.setFieldsValue({
                billNo: selData.billNo,
                billTime: moment(selData.createTime, 'YYYY-MM-DD HH:mm:ss'),
                billStatus:selData.status,
                applyMan: selData.applyMan,
                warehouse: selData.warehouse,
                isnotic:true
            });
            this.vkTable.fill(selData.materialDtl)
        }
        
    }
    cleanForm() {
        var form = this.refs.form.getForm();
        form.setFieldsValue({
            billNo: "",
            billTime: moment('2018-01-02 12:12:12', 'YYYY-MM-DD HH:mm:ss'),
            billStatus:"",
            applyMan: "",
            warehouse: ""
        });
    }
    newForm() {
        var form = this.refs.form.getForm();
        form.setFieldsValue({
            billNo: "",
            billTime: moment('2018-01-02 12:12:12', 'YYYY-MM-DD HH:mm:ss'),
            billStatus:"",
            applyMan: "",
            warehouse: ""
        });
        this.vkTable.new();
    }
    editForm() {
        var form = this.refs.form.getForm(), selData = this.state.tableSelDtlData;
        if (selData) {
            form.setFieldsValue({
                billNo: selData.billNo,
                billTime: moment(selData.createTime, 'YYYY-MM-DD HH:mm:ss'),
                billStatus:selData.status,
                applyMan: selData.applyMan,
                warehouse: selData.warehouse,
                isnotic:true
            });
            this.vkTable.edit(selData.materialDtl);
        }
    }
    cancelForm() {
        var form = this.refs.form.getForm(), selData = this.state.tableSelDtlData;
        if (selData) {
            form.setFieldsValue({
                billNo: selData.billNo,
                billTime: moment(selData.createTime, 'YYYY-MM-DD HH:mm:ss'),
                billStatus:selData.status,
                applyMan: selData.applyMan,
                warehouse: selData.warehouse,
                isnotic:true
            });
            this.vkTable.setEnable(false).setData(selData.materialDtl);
        }
        this.vkTable.fill(selData && selData.materialDtl);
    }
 
    
   

    
}

export default Inbound;