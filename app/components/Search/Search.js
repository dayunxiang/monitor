import React from 'react';
import {Input} from '../Antd.js';
import "./Search.css";

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: null,
            searchValue: ""
        };

    }

    render() {
        
        let { items, data, itemClick, style } = this.props;
        const comps = [];
        if (Array.isArray(data) && Array.isArray(items)) {
            root:
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                for (var j = 0; j < items.length; j++) {
                    var Com = items[j];
                    if (Com.canHandle && Com.canHandle(d)) {
                        let keys = Com.searchKeys();
                        if (keys && keys.length) {
                            let flag = false;
                            for (var k = 0; k < keys.length; k++) {
                                let key = keys[k];
                                if (d[key].indexOf(this.state.searchValue) > -1) {
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                comps.push(<Com key={d.id} entity={d} itemClick={itemClick&&itemClick[j]}></Com>);
                                if (comps.length > 100) break root;
                            }
                        } else {
                            comps.push(<Com key={d.id} entity={d} itemClick={itemClick&&itemClick[j]}></Com>);
                            if (comps.length > 100) break root;
                        }
                        break;
                    }
                }
            }
        }
        return (
            <div className="vk-search-container" style={style}>
                <Input onFocus={this.inputFocus.bind(this)} onBlur={this.inputBlur.bind(this)} onChange={this.inputSearch.bind(this)} value={this.state.searchValue} className="vk-search-input"></Input>
                <ul className={"vk-search-ul " + (this.state.open == null ? "":  (this.state.open ? "vk-search-ulshow": "vk-search-ulhide"))} style={{}}>{comps}</ul>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.open == null) return;
        if (this.state.open === false) {
            window.setTimeout(() => {
                this.setState({
                    open: null
                });
            }, 200);
        }
        
    }
    inputSearch(e) {
        this.setState({
            searchValue: e.target.value,
            open: true
        });
    }
    inputBlur(e) {
        window.setTimeout(() => {
            this.setState({
                open: false
            });
        }, 250);
    }
    inputFocus(e) {
        this.setState({
            searchValue: e.target.value,
            open: true
        });
    }
    componentDidMount() {
        
    }
}
export default Search;