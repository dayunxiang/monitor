import React from 'react';
// import {Input} from '../Antd.js';


class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let { entity } = this.props;
        return (
            <li className="vk-item-li" onClick={this.liClick.bind(this)}>{entity.name}</li>
        );
    }
    static canHandle(data) {
        return data && data.facilityType ? true : false;
    }
    static searchKeys(data) {
        return ["name"]
    }
    liClick() {
        let {itemClick, entity} = this.props;
        itemClick && itemClick("Conversancy", entity);
    }
    componentDidMount() {
        
    }
}
export default Search;