import React from 'react';
import { Select } from '../Antd.js';
const Option = Select.Option;

class NiceSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            searchInputValue: ""
        };

    }

    render() {
        let props = this.props;
        
        return (
            <Select {...props} filterOption={this.filterOption} onFocus={this.onFocus.bind(this)} showSearch onSearch={this.onSearch.bind(this)}>{this.getFilterOption(this.state.data)}</Select>
        );
    }
    
    componentDidMount() {
        
    }
    onFocus() {
        this.setState({
            searchInputValue: ""
        });
    }
    filterOption(value, option) {
        return true;
    }
    onSearch(value) {
        if (this._time) {
            window.clearTimeout(this._time);
        }
        this._time = window.setTimeout(() => {
            this.setState({
                searchInputValue: value
            });
            window.clearTimeout(this._time);
        }, 300)
    }
    getFilterOption(data) {
        if (!Array.isArray(data)) return;
        let v = this.state.searchInputValue;
        let valueKey = this.props.valueText && this.props.valueText[0] || "value";
        let textKey = this.props.valueText && this.props.valueText[1] || "text";
        let maxCount = this.props.maxCount || 100;
        let opts = [<Option key="null" value="">全部</Option>];
        for (var i = 0; i < data.length; i++) {
            let item = data[i]
            if (item.name.indexOf(v) > -1) {
                opts.push(<Option key={item[valueKey]} value={item[valueKey]} >{item[textKey]}</Option>);
                if (opts.length >= maxCount ) {
                    break;
                }
            }
        }
        return opts;
    }
    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data
        };
    }
    
}
export default NiceSelect;