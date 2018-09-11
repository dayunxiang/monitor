import React from 'react';
// import { Tree, Menu, Icon} from 'antd';
import "./style.css";

class Srcoll extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
            originDivH: 0,
            wrapH: 0
        };

    }

    render() {
        let { height } = this.props;
        let wrapStyle = {
            height: height ? height : "150px",
            overflow: "hidden"
        };
        let barStyle = {
            height: this.state.wrapH && this.state.originDivH  ? (this.state.wrapH *this.state.wrapH /this.state.originDivH): 0,
            display: this.state.originDivH <= this.state.wrapH ? "none" : "block"
        };
	    return (
            <div className="vk-scroll-cont" onMouseEnter={this.srcollContentMouseEnter.bind(this)} >
    	      	<div className="vk-scroll-wrap" ref={(node) => { this.wrap = node}} style={wrapStyle}>
                    
                    {this.props.children}
                </div>
                <div className="vk-scroll-bar" ref={(node) => { this.bar = node}} style={barStyle}
                onMouseDown={this.mouseDown.bind(this)} 
                ></div>
            </div>
	    );
    }
    componentDidMount() {
        this.reset();
    }
    reset() {
        let wrapH = this.wrap.clientHeight;
        let childrenDiv = this.wrap.children[0];
        if (!childrenDiv) { return; }
        let originDivH = childrenDiv.clientHeight;
        console.log(wrapH, originDivH);
        this.setState({
            originDivH: originDivH,
            wrapH: wrapH
        });
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this._mouseMoveFunc);
        document.removeEventListener("mouseup", this._mouseUpFunc)
        this._mouseMoveFunc = null;
        this._mouseUpFunc = null;
    }
    componentWillReceiveProps() {

    }
    srcollContentMouseEnter(e) {
        e.preventDefault();
        this.reset();
    }
    mouseDown(e) {
        e.preventDefault();
        this._pageY = e.pageY;
        this._start = true;
        this._top = this.bar.style.top.replace("px", "") * 1;
        console.log(e);
        this._mouseMoveFunc = this._mouseMove.bind(this);
        this._mouseUpFunc = this._mouseUp.bind(this);
        document.addEventListener("mousemove", this._mouseMoveFunc);
        document.addEventListener("mouseup", this._mouseUpFunc)
    }
    _mouseMove(e) {

        e.preventDefault();
        let originDivH = this.state.originDivH, wrapH = this.state.wrapH;
        if (!this._start) return;
        let dy = e.pageY - this._pageY;
        this._pageY = e.pageY;
        let xs = (originDivH - wrapH);
        let scorllSpace = wrapH - wrapH * wrapH / originDivH;
        let goPx = xs / scorllSpace;
        this._top +=  dy; 
        console.log(this.bar.style.top);
        if (this._top < 0 ) {
            this._top = 0;
            // return;
        }
        if (this._top > scorllSpace) {
            this._top = scorllSpace ;
            // return;
        }


        // if (dy<0 || dy > scorllSpace) return;
        this.wrap.scrollTop = this._top * goPx;
        this.bar.style.top = this._top + "px";
        dy
    }
    _mouseUp(e) {
        e.preventDefault();
        this._start = false;
        this._pageY = 0;

    }
    mouseOut(e) {
        // this.mouseUp(e);
    }
	
}
export default Srcoll;