import React from 'react';
import {Input, Row, Col, Table, DatePicker, Select, Button } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
import moment from 'moment';
// import Test from '../../../../components/test.js';
// import "./style.css";
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class DeviceRunRecord extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tableData:null, //table的数据
        }

    }
    
    render() {
       
        const columns = [
            {title: '设备名称', dataIndex: 'key1', width: "15%" },
            {title: '开启时间', dataIndex: 'key2', width: "15%"},
            {title: '关闭时间', dataIndex: 'key3', width: "15%"},
            {title: '累计时间', dataIndex: 'key4', width: "15%"},
            {title: '电压', dataIndex: 'key5', width: "15%"},
            {title: '电流', dataIndex: 'key6', width: "15%"},
            {title: '操作员', dataIndex: 'key7', width: "15%"},
            {title: '备注', dataIndex: 'key8', width: "10%"},
        ];
        const dateFormat = 'YYYY-MM-DD';
        return (
            <div className="vk-subpage" >
                <Row className="ps-search-condition">
                    <Col md={8}>
                        <Col md={8}><label className="ps-search-label">起始日期</label></Col>
                        <Col md={16}><RangePicker
                            defaultValue={[moment(moment().format(dateFormat), dateFormat), moment(moment().add(7, "days").format(dateFormat), dateFormat)]}
                            format={dateFormat}
                        />
                        </Col>
                    </Col>
                    <Col md={8}>
                        <Col md={8}><label className="ps-search-label">操作员</label></Col>
                        <Col md={16}>
                            <Select defaultValue="1" style={{ width: '100%' }}>
                                <Option value="1">操作员1</Option>
                                <Option value="2">操作员2</Option>
                                <Option value="3" disabled>操作员3</Option>
                                <Option value="4">操作员4</Option>
                            </Select>
                        </Col>
                    </Col>
                    <Col md={8}>
                        <Col md={4} offset={4}>
                            <Button type="primary">搜索</Button>
                        </Col>
                        <Col md={4}>
                            <Button type="primary">导出</Button>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col  md={24} >
                        <Table ref="table" size={'small'} bordered={false} scroll={{x:250}} 
                            columns={columns} 
                            dataSource={this.state.tableData} onRow={(record, index) =>{ return { onClick:this.tableRowClick.bind(this, record, index) }}}
                            expandedRowRender={record => <p>{'哈哈哈哈哈'}</p>} pagination={{defaultPageSize:30}}/>
                       

                    </Col>
                    
                </Row>
                
            </div>
            
        )
    }
    
    componentDidMount() {
        super.componentDidMount();
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    tableRowClick() {

    }
}

export default DeviceRunRecord;