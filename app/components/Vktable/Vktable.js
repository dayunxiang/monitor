import React from 'react';
import {InputNumber, Input,Table,Button } from '../Antd.js';

class Vktable extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
        	enable:false,//记录现在的状态
			// dataSource: props.dataSource,
			// columns: props.columns
			showAddLayer:false,
			addData:null
        };

    }

    render() {
    	let {columns, dataSource} = this.props;
    	columns = this.enableColumns(columns);
	    return (
	    	<div>
	    		<Table {...this.props} columns={columns} dataSource={dataSource}/>
	    	</div>
	    );
    }
    
    //表格可编辑,加上控件
    enableColumns(columns){
		if (!Array.isArray(columns)) return;
		columns.forEach((item) => {
			
			item.render = (text, record, index) => {
				let ele = text;
				if (this.props.enable) {
					switch(item.type){
						case "Input": ele = <Input defaultValue={text} onChange={this.itemChange.bind(this,record, item, index)}/>; break;
						case "Number": ele = <InputNumber  defaultValue={text} onChange={this.itemChange.bind(this,record, item,index)}/>; break;
						// case "DatePicker":
						// case "TreeSelect":
						default: break;
					}
				}
				
				return ele;
			}
			
		});
		return columns;
		
    }
    addEmptyRow(dataSource,columns){
    	if (!Array.isArray(columns)) return null;
    	var emtpyData = {key:dataSource&&dataSource.length ? ("d-"+(dataSource.length+1)):"d-0"};

		columns.forEach((item) => {
			emtpyData[item.dataIndex] = null;
		});
    	if (!dataSource) {
			dataSource = [emtpyData];
		}else{
			dataSource.push(emtpyData);
		}
		return dataSource;
    }
    removeEmptyRow(dataSource){
    	if (!dataSource) return null;
    	var emtpyData = {key:dataSource&&dataSource.length ? ("d-"+(dataSource.length+1)):"d-0"};
		var lastData = dataSource[dataSource.length - 1];
		var flag = true;
		for(var key in lastData){ //数据中除了key 其他如果有值,说明不能删除该数据
			if (key === "key") continue;
			if (lastData[key] != null) {
				flag = false;
				break;
			}
		}
		if (flag) {
			dataSource.splice(dataSource.length - 1, 1);
		}
		return dataSource;
    }
    itemChange(record, item, index,e){
    	switch(item.type){
    		case "Input": record[item.dataIndex] = e.target.value;break;
    		case "Number" : record[item.dataIndex] = e;break;
    		default:break;
    	}
    	if (this.props.editChange) {
    		this.props.editChange(index, record, e);
    	}
		
		
    }
    
    componentDidMount(){
    	
    }
    
	
}
export default Vktable;