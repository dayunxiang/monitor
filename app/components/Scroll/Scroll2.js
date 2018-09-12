
// import { Tree, Menu, Icon} from 'antd';
import "./style.css";

class Srcoll {
  	constructor(option) {
        this.target = option.target || "target";

    }
    createBar() {
        let div = document.createElement("div");
        div.className = "vk-scroll-bar";
        this.bar = div;
        return div;
    }
    install() {
        this.mouseDownFucn = (e)=>{

        }
        div.addEventListener("mousedown", this.mouseDownFucn);
    }
    init() {
        let target = document.getElementById(option.target);
        target.appendChild(this.createBar());
    }

    // render() {
    //     let dom = <div className="vk-scroll-bar"></div>
	   //  return ReactDOM.createPortal(dom, document.getElementsByTagName("body")[0]);
    // }
    // componentDidMount() {
    //     this.reset();
    // }
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
    // componentWillReceiveProps() {

    // }
    // srcollContentMouseEnter(e) {
    //     e.preventDefault();
    //     this.reset();
    // }
    // mouseDown(e) {
    //     e.preventDefault();
    //     this._pageY = e.pageY;
    //     this._start = true;
    //     this._top = this.bar.style.top.replace("px", "") * 1;
    //     console.log(e);
    //     this._mouseMoveFunc = this._mouseMove.bind(this);
    //     this._mouseUpFunc = this._mouseUp.bind(this);
    //     document.addEventListener("mousemove", this._mouseMoveFunc);
    //     document.addEventListener("mouseup", this._mouseUpFunc);
    // }
    // _mouseMove(e) {

    //     e.preventDefault();
    //     let originDivH = this.state.originDivH, wrapH = this.state.wrapH;
    //     if (!this._start) return;
    //     let dy = e.pageY - this._pageY;
    //     this._pageY = e.pageY;
    //     let xs = (originDivH - wrapH);
    //     let scorllSpace = wrapH - wrapH * wrapH / originDivH;
    //     let goPx = xs / scorllSpace;
    //     this._top +=  dy; 
    //     console.log(this.bar.style.top);
    //     if (this._top < 0 ) {
    //         this._top = 0;
    //         // return;
    //     }
    //     if (this._top > scorllSpace) {
    //         this._top = scorllSpace ;
    //         // return;
    //     }


    //     // if (dy<0 || dy > scorllSpace) return;
    //     this.wrap.scrollTop = this._top * goPx;
    //     this.bar.style.top = this._top + "px";
    //     dy
    // }
    // _mouseUp(e) {
    //     e.preventDefault();
    //     this._start = false;
    //     this._pageY = 0;

    // }
    // mouseOut(e) {
    //     // this.mouseUp(e);
    // }
	
}
export default Srcoll;