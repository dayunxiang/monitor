import React from 'react';
import "./style.css";

class ChessItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        	self:true, //是否自己
        	isActive: false //是否已使用
        }
    }
    render() {
    	var style = {
    		width:25,
    		height:25,
    		// borderRadius:'50%',
    		border:"1px solid black",
    		float:"left",
    		backgroundColor:"gray"
    	};
    	var imgStyle = {
    		backgroundColor:(this.state.isActive ? (this.state.self ? "black" : "white"): "transparent"),
    		boxShadow: (this.state.isActive ? '0px 0px 5px 5px #888888 inset' :"")
    	}
        return (
            <div style={style} onClick={this.itemClick.bind(this)}>
            	<div className="chess-item-img" style={imgStyle}></div>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
    	this.setState({
    		isActive: nextProps.isActive,
    		self: nextProps.self
    	});
    }
    itemClick() {
    	if (this.state.isActive) return;
		
    	
    	var { opt , entity } =  this.props;
    	if (opt.itemClickCB) {
    		opt.itemClickCB(entity);
    	}
    	
    }
    itemAutoClick(){
    	if (this.state.isActive) return;
		
    	this.setState({
    		isActive:true,
    		self:false
    	});
    }

}

export default ChessItem