import React from 'react';
// import { Tree, Menu, Icon} from 'antd';
import "./style.css";

class Srcoll extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
            originDivH: 0,
            wrapH: 0,
            barTop:0,
            showBar:1
        };

    }

    render() {
        let { height } = this.props;
        let wrapStyle = {
            height: this.state.wrapH,
            overflow: "hidden"
        };
        let barStyle = {
            background: this.props.barColor || "white",
            height: this.state.wrapH && this.state.originDivH && this.state.originDivH > this.state.wrapH ? (this.state.wrapH *this.state.wrapH /this.state.originDivH): 0,
            opacity: this.state.showBar && this.state.originDivH > this.state.wrapH ? 1 : 0,
            top: this.state.barTop
        };
	    return (
            <div className="vk-scroll-cont" ref={(node) => { this.cont = node}} onMouseEnter={this.srcollContentMouseEnter.bind(this)} 
            onMouseDown={this.srcollContentMouseDown.bind(this)} onWheel={this.srcollContentMouseWheel.bind(this)}
            onMouseLeave={this.srcollContentMouseLeave.bind(this)}>
    	      	<div className="vk-scroll-wrap" ref={(node) => { this.wrap = node}} style={wrapStyle}>
                    
                    {this.props.children}
                </div>
                <div className="vk-scroll-bar" ref={(node) => { this.bar = node}} style={barStyle}
                onMouseDown={this.mouseDown.bind(this)}></div>
            </div>
	    );
    }
    
    reset() {
        let parent = this.cont.parentNode;
        let parentH = parent.clientHeight;
        // let wrapH = this.wrap.clientHeight;
        let childrenDiv = this.wrap.children[0];
        if (!childrenDiv) { return; }
        let originDivH = childrenDiv.clientHeight;

        let xs = (originDivH - parentH);
        let scorllSpace = parentH - parentH * parentH / originDivH;
        let goPx = xs / scorllSpace;
        let barTop = this.wrap.scrollTop/goPx;

        let top = barTop;
        let barHeight = parentH && parentH && originDivH > parentH ? (parentH*parentH/originDivH) : 0;
        if (this.state.barTop + barHeight > parentH) {
            top = parentH - barHeight;
        }
        this.setState({
            originDivH: originDivH,
            wrapH: parentH,
            barTop: top,
            showBar: 1
        });
    }
    componentDidMount() {
        this.reset();
        this._windowResize = () => {
            window.setTimeout(() => {
                this.reset();
            },300);
        };
       
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._windowResize);
    }
    componentWillReceiveProps() {

    }
    srcollContentMouseEnter(e) {
        e.preventDefault();
        // this.setState({
        //     showBar: 1
        // });
        
        this.reset();
    }
    srcollContentMouseLeave(e) {
        e.preventDefault();
        this.setState({
            showBar: 0
        });
    }
    srcollContentMouseDown(e) {
        e.preventDefault();
        window.setTimeout(() =>{
            this.reset();
        }, 300);
    }
    srcollContentMouseWheel(e) {
        if(e.detail==-3 || e.wheelDelta < 0 || e.deltaY <0 ) {//上
            this._barMove(-20);
        }else{
            this._barMove(20);
        }
        
    }
    mouseDown(e) {
        e.preventDefault();
        this._pageY = e.pageY;
        this._start = true;
        // this._top = this.bar.style.top.replace("px", "") * 1;
        // this.setState({
        //     barTop:this.bar.style.top.replace("px", "") * 1
        // });
        console.log(e);
        this._mouseMoveFunc = this._mouseMove.bind(this);
        this._mouseUpFunc = this._mouseUp.bind(this);
        document.addEventListener("mousemove", this._mouseMoveFunc);
        document.addEventListener("mouseup", this._mouseUpFunc);
    }
    _mouseMove(e) {

        e.preventDefault();
        if (!this._start) return;
        let dy = e.pageY - this._pageY;
        this._pageY = e.pageY;
        this._barMove(dy);

    }
    _barMove(dy) {
        let originDivH = this.state.originDivH, wrapH = this.state.wrapH;
        let xs = (originDivH - wrapH);
        let scorllSpace = wrapH - wrapH * wrapH / originDivH;
        let goPx = xs / scorllSpace;
        // this._top +=  dy; 
        let _top = this.state.barTop + dy;
        if (_top < 0 ) {
            _top = 0;
            // return;
        }
        if (_top > scorllSpace) {
            _top = scorllSpace ;
            // return;
        }


        // if (dy<0 || dy > scorllSpace) return;
        this.wrap.scrollTop = _top * goPx;
        // this.bar.style.top = this._top + "px";
        this.setState({
            barTop:_top
        })
    }
    _mouseUp(e) {
        e.preventDefault();
        this._start = false;
        this._pageY = 0;
        document.removeEventListener("mousemove", this._mouseMoveFunc);
        document.removeEventListener("mouseup", this._mouseUpFunc);
        this._mouseMoveFunc = null;
        this._mouseUpFunc = null;

    }
    mouseOut(e) {
        // this.mouseUp(e);
    }
	
}
export default Srcoll;