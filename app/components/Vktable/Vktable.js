import React from 'react';
import {InputNumber, Input,Table,Button,Popconfirm } from '../Antd.js';

class Vktable extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
        	enable:false,//记录现在的状态
			dataSource: [],
        };
        this.tempKey = props.tempKey || "vk-tempKey"; //用来生成空数据
        this.tempKeyIndex = 0;//用来生成空数据

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
    
    //表格可编辑,加上控件
    enableColumns(columns) {
		if (!Array.isArray(columns)) return;
		columns.forEach((item) => {
			
			item.render = (text, record, index) => {
				let ele = text;
				if (this.state.enable) {
					switch(item.type){
						case "Input": ele = <Input defaultValue={text} onChange={this.itemChange.bind(this, record, item, index)}/>; break;
						case "Number": ele = <InputNumber  defaultValue={text} onChange={this.itemChange.bind(this, record, item, index)}/>; break;
						// case "DatePicker":
						// case "TreeSelect":
						default: break;
					}
				}
				return ele;
			}
			
		});
		
		let option = {title: '操作', dataIndex: 'deleteRow', width: "5%", render: (text, record) => {
			return this.state.enable ? <Popconfirm title="是否确认删除?" onConfirm={this.confirmDelete.bind(this, text, record)}  okText="Yes" cancelText="No">
			    <a href="#">行删除</a>
			  </Popconfirm> : "行删除";
		}};

		return [].concat(columns,[option]);
		
    }

    setData(data) {
		if (!Array.isArray(data)) data = [];
		this.setState({
			dataSource: data
		});
		return this;
    }
    getData() {
		return this.state.dataSource.filter(({key, isEdited}) => {
			return key.indexOf(this.tempKey) === -1 || isEdited;
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
    		default:break;
    	}
    	//临时数据加个标示
    	if (!record.isEdited) {
			record.isEdited = true;
    	}
    	if ((this.state.dataSource.length -1) === index) {
    		this.state.dataSource.push(this.getEmptyData());
			this.forceUpdate();
    	}
    }
    
    componentDidMount() {
    	// this.setEmptyData();
    }
    getEmptyData() {
    	let {columns} = this.props;
    	if (!Array.isArray(columns)) return null;
		let emptyData = {};
    	columns.forEach(({dataIndex, type}) => {
			switch (type) {
				case "Input": emptyData[dataIndex] = "" ; break;
				case "Number": emptyData[dataIndex] = 0; break;
				default: break;
			}
    	});
    	emptyData.key = this.tempKey + "-" + this.tempKeyIndex;
    	this.tempKeyIndex++;
    	return emptyData;
    }
    confirmDelete(text, record) {
    	console.log(text, record);
    	let thisKey = record.key;
    	let ds = this.state.dataSource.filter(({ key }) => {
			if (thisKey === key) {
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
  //   cancel(data) {
		// this.fill(data);
  //   }

}
export default Vktable;