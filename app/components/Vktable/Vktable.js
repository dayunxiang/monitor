import React from 'react';
import {InputNumber, Input, Table, message,Popconfirm ,Select} from '../Antd.js';
const Option = Select.Option;

class Vktable extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
        	enable:false,//记录现在的状态
			dataSource: [],
        };
        this.tempKey = props.tempKey || "vk-tempKey"; //用来生成空数据
        this.tempKeyIndex = 0;//用来生成空数据
        this.emptyDataMap = {
            Input: "",
            Number: 0,
            Select: ""
        };
    }

    render() {
    	let {columns} = this.props;
    	columns = this.enableColumns(columns);
	    return (
	    	<div>
	    		<Table {...this.props} columns={columns} dataSource={this.state.dataSource}/>
	    	</div>
	    );
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.columns, this.props.columns, nextProps.columns===this.props.columns )
        return true;
    }
    //表格可编辑,加上控件
    enableColumns(columns) {
		if (!Array.isArray(columns)) return;
		columns.forEach((item) => {
			item.render = (text, record, index) => {
				let ele = text;
				if (this.state.enable) {
					switch(item.type){
						case "Input": ele = <Input style={{ width: '100%' }} value={text} onChange={this.itemChange.bind(this, record, item, index)}/>; break;
						case "Number": ele = <InputNumber style={{ width: '100%' }} value={text} onChange={this.itemChange.bind(this, record, item, index)}/>; break;
                        case "Select": 
                            let data = item.getData && item.getData();
                            let options = data && data.map((d) => { return <Option key={d.value} value={d.value}>{d.text}</Option>});
                            ele = <Select showSearch filterOption={this.filterOption} style={{ width: '100%' }} value={text} onChange={this.itemChange.bind(this, record, item, index)}>{options}</Select>; break;
						// case "DatePicker":
						// case "TreeSelect":
						default: break;
					}
				} else{
                    switch(item.type){
                        
                        case "Select": 
                            let d = this._findDataFromSelect(item.getData && item.getData(), text);
                            ele = d && d.text; break;
                       
                        default: break;
                    }
                }
				return ele;
			}
			
		});
		
		let option = {title: '操作', dataIndex: 'deleteRow', width: "5%", render: (text, record, index) => {
			return this.state.enable ? <Popconfirm title="是否确认删除?" onConfirm={this.confirmDelete.bind(this, text, record, index)}  okText="Yes" cancelText="No">
			    <a href="#">行删除</a>
			  </Popconfirm> : "行删除";
		}};

		return [].concat(columns,[option]);
		
    }
    _findDataFromSelect(arr, value) {
        if (Array.isArray(arr) && value) {
            for (let i = 0; i<arr.length; i++) {
                let d = arr[i];
                if (d.value === value) {
                    return d;
                    break;
                }
            }
        }
        return "";
    }
    filterOption(value, option) {
        if (option.props.children && option.props.children.indexOf(value) > -1 ) {
            return true;
        }
        return false;
    }
    setData(data) {
		if (!Array.isArray(data)) data = [];
		this.setState({
			dataSource: data
		});
		return this;
    }
    getData() {
		return this.state.dataSource.filter((item) => {
			return !this.isEmptyRow(item);
		});
    }
    setEnable(isEnable) {
		this.setState({
			enable: isEnable
		});
		return this;
    }
    // addEmptyRow(emptyData) {
    // 	this.state.dataSource.push(emptyData);
    // 	this.setState({
    // 		dataSource: this.state.dataSource
    // 	});
    // }
    // removeEmptyRow(dataSource) {
    	
    // }
    itemChange(record, item, index, e) {
    	switch (item.type) {
    		case "Input": record[item.dataIndex] = e.target.value;break;
    		case "Number" : record[item.dataIndex] = e;break;
            case "Select" : record[item.dataIndex] = e;break;
    		default:break;
    	}
    	
    	if ((this.state.dataSource.length -1) === index) {
    		this.state.dataSource.push(this.getEmptyData());
			
    	}
        this.forceUpdate();
    }
    
    componentDidMount() {
    	// this.setEmptyData();
    }
    getEmptyData() {
    	let {columns} = this.props;
    	if (!Array.isArray(columns)) return null;
		let emptyData = {};
    	columns.forEach(({dataIndex, type}) => {
            emptyData[dataIndex] = this.emptyDataMap[type];
			// switch (type) {
			// 	case "Input": emptyData[dataIndex] = "" ; break;
			// 	case "Number": emptyData[dataIndex] = 0; break;
			// 	default: break;
			// }
    	});
    	emptyData.key = this.tempKey + "-" + this.tempKeyIndex;
    	this.tempKeyIndex++;
    	return emptyData;
    }
    isEmptyRow(item) {
        let {columns} = this.props;
        let flag = true;
        columns.forEach(({dataIndex, type}) => {
            if (Array.isArray(item[dataIndex]) || Object.prototype.toString.call(item[dataIndex]) === '[object Object]') {
                if (JSON.stringify(item[dataIndex]) !== JSON.stringify(this.emptyDataMap[type])) {
                    flag = false;
                }
            } else {
                if (item[dataIndex] !== this.emptyDataMap[type]) {
                    flag = false;
                }

            }
        });
        return flag;
    }
    confirmDelete(text, record, index) {
        if (this.isEmptyRow(record)) return;
    	let thisKey = record.key;
        let hasEmptyRow = false;
    	let ds = this.state.dataSource.filter((item) => {
			if (thisKey === item.key) {
				return false;
			}
			return true;
    	});
    	if (!ds || !ds.length ) {
    		ds = [this.getEmptyData()];
    	}
    	this.setState({
    		dataSource: ds
    	});
    }
    valid() {
        let {columns} = this.props;
        if (!columns || columns.length === 0) return;
        // let colNullMap = {};
        // columns.forEach((item) => {
        //     colNullMap[item.dataIndex] = item.notNull;
        // });
        let flag = true;
        this.getData().forEach((data, i) => {
            columns.forEach((col) => {
                if (col.notNull) {//  必填字段
                    if (!data[col.dataIndex]) { //
                        message.error(`第${i + 1}行字段'${col.title}'必填`);
                        flag = false;
                        return flag;
                    }
                }
            });
            return flag;
        });
        return flag;
    }
	ownerFill() {
		this.setEnable(false).setData(this.getData());
	}
    fill(data) {
		this.setEnable(false).setData(data);
    }
    new() {
    	let data = this.getEmptyData();
		this.setEnable(true).setData([data]);
    }
    edit(data) {
		if (!Array.isArray(data)) {
			data = [];
		}else{
			data = JSON.parse(JSON.stringify(data));
		}
		data.push(this.getEmptyData());
        this.setEnable(true).setData(data);
    }
  

}
export default Vktable;