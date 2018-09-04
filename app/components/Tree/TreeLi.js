import React from 'react';

class TreeLi extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let {data} = this.props;
        // if (!data.show) return "";

        let level = data.level, space = [], style = {display:data.show ? "block": "none"};

        for (var i = 0; i < level; i++) {
            space.push(<span key={i} className="ubi-space"></span>);
        }
        return (
            <li style={style}><a onClick={this.liClick.bind(this, data)}> { space }{ data.text }</a></li>
        )
    }
    liClick(opt) {
        this.props.nodeClick(opt);
    }
    
 
}


export default TreeLi