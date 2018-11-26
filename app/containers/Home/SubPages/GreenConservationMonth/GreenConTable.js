import React from 'react';
import { Table, Input} from '../../../../components/Antd.js';


class Test extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            enable: false,
        };

    }

    render() {
        const columns = [
            {title: '名称', dataIndex: 'mainTypeName', width: "20%"},
            {title: '计划数量', dataIndex: 'plannedQuantity', width: "10%", render:(text, record, index) => {
                if (this.state.enable) {
                    return <Input type="text" onChange={this.onChange.bind(this, record, "Input", "num1")} defaultValue={text}/>;
                }else{
                    return text;
                }
            }},
            {title: '单位', dataIndex: 'perUnit', width: "10%"},
            {title: '完成数量', dataIndex: 'realQuantity', width: "10%",render:(text, record, index) => {
                if (this.state.enable) {
                    return <Input type="text" onChange={this.onChange.bind(this, record, "Input", "num2")} defaultValue={text}/>;
                }else{
                    return text;
                }
            }},
            {title: '单位', dataIndex: 'perUnit2', width: "10%",render:(text, record, index)=>{ return record.perUnit;}},
            {title: '养护编号', dataIndex: 'maintenanceSerial', width: "20%", render:(text, record, index) => {
                if (this.state.enable) {
                    return <Input type="text" onChange={this.onChange.bind(this, record, "Input", "no")} defaultValue={text}/>;
                }else{
                    return text;
                }
            }},
            {title: '登记人', dataIndex: 'mainUserName', width: "10%", render:(text, record, index) => {
                if (this.state.enable) {
                    return <Input type="text" onChange={this.onChange.bind(this, record, "Input", "reporterName")} defaultValue={text}/>;
                }else{
                    return text;
                }
            }},
            {title: '备注', dataIndex: 'remark', width: "10%"}
        ];
        
        return (
            <Table size={'small'} bordered={true} 
                columns={columns}
                dataSource={this.state.dataSource}
                pagination={{defaultPageSize: 30}}/>
        );
    }
    
    componentDidMount() {
        
    }
    onChange(record, type, key, e) {
        switch (type) {
            case "Input" :record[key] = e.target.value;
        }
        // this.forceUpdate();
    }
    setData(data) {
        this.setState({
            dataSource: data
        });
        return this;
    }
    setEnable(flag) {
        this.setState({
            enable: flag
        });
        return this;
    }
    
}
export default Test;