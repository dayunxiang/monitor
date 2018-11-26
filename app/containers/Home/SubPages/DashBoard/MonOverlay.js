import React from 'react';
import {Spin} from '../../../../components/Antd.js';
const Fragment = React.Fragment;
class MonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            left: 0,
            top: 0,
            right:0
        };

    }

    render() {
        let { entity, width, loading } = this.props;
        if (entity == null) {
            entity = {};
        }
        let containerStyle  = {
            width:width ? width:"400px", 
            top: this.state.top, 
            left: this.state.left ? this.state.left:"auto" ,
            right: this.state.right ? this.state.right:"auto"
        };
        return (
            <div className="ps-ol-table" style={containerStyle} onMouseDown={this.mouseDown.bind(this)} ref={(node) => {this.container = node}}>
                <div className="ps-ol-title">
                    <span className="ps-ol-title-center">{entity.name}</span>
                    <a className="ps-ol-close" href="javascript:void(0)" onClick={this.onClose.bind(this)}>关闭</a>
                </div>
                 {
                    <table border="1">
                        <tbody>
                        <tr>
                            <td width="24%" className="ps-ol-label">水利设施名称</td>
                            <td width="24%">{entity.facilityName}</td>
                            <td width="24%" className="ps-ol-label">时间</td>
                            <td width="24%">{entity.time}</td>
                      </tr>
                      <tr>
                        <td className="ps-ol-label">内河水位</td>
                        <td>{entity.insideWaterLevel!=null ? entity.insideWaterLevel.toFixed(2) : ' '}</td>
                        <td className="ps-ol-label">外河水位</td>
                        <td>{entity.outsideWaterLevel!=null ? entity.outsideWaterLevel.toFixed(2) : ' '}</td>
                      </tr>
                      <tr>
                        <td className="ps-ol-label">内闸</td>
                        <td>{entity.insideGateState===3101 ? '开启' : (entity.insideGateState===3102  ? '关闭' : ' ')}</td>
                        <td className="ps-ol-label">外闸</td>
                        <td>{entity.outsideGateState===3101 ? '开启' : (entity.outsideGateState===3102 ? '关闭' : ' ')}</td>
                      </tr>
                      <tr>
                        <td className="ps-ol-label">水泵①</td>
                        <td>{entity.pumpList[0]!=null ? (entity.pumpList[0].pumpState===3101 ? '开启' : (entity.pumpList[0].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                        <td className="ps-ol-label">水泵②</td>
                        <td>{entity.pumpList[1]!=null ? (entity.pumpList[1].pumpState===3101 ? '开启' : (entity.pumpList[1].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                      </tr>
                      <tr>
                        <td className="ps-ol-label">水泵③</td>
                        <td>{entity.pumpList[2]!=null ? (entity.pumpList[2].pumpState===3101 ? '开启' : (entity.pumpList[2].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                        <td className="ps-ol-label">水泵④</td>
                        <td>{entity.pumpList[3]!=null ? (entity.pumpList[3].pumpState===3101 ? '开启' : (entity.pumpList[3].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                      </tr>
                      <tr>
                        <td className="ps-ol-label">水泵⑤</td>
                        <td>{entity.pumpList[4]!=null ? (entity.pumpList[4].pumpState===3101 ? '开启' : (entity.pumpList[4].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                        <td className="ps-ol-label">水泵⑥</td>
                        <td>{entity.pumpList[5]!=null ? (entity.pumpList[5].pumpState===3101 ? '开启' : (entity.pumpList[5].pumpState===3102 ? '关闭' : ' ')) : ' ' }</td>
                      </tr>
                        </tbody>
                    </table>
                }
                
            </div>
        );
    }
    componentDidMount() {
        
    }
    static getDerivedStateFromProps(props, state) {
        return {
            left: state.left ? state.left: (props.left ? props.left : 0),
            top: state.top ? state.top: (props.top ? props.top : 0),
            right: state.right ? state.right: (props.right ? props.right : 0),
        };
    }
    static canHandle(entity) {
        return entity && entity.itemType === 3 ? true : false;
    }
    mouseDown(e) {
        e.preventDefault();
        this._pageY = e.pageY;
        this._pageX = e.pageX;
        this._start = true;
        
        this._mouseMoveFunc = this._mouseMove.bind(this);
        this._mouseUpFunc = this._mouseUp.bind(this);
        document.addEventListener("mousemove", this._mouseMoveFunc);
        document.addEventListener("mouseup", this._mouseUpFunc);
    }
    _mouseMove(e) {
        e.preventDefault();
        if (!this._start) return;
        let dy = e.pageY - this._pageY;
        let dx = e.pageX - this._pageX;
        this._pageY = e.pageY;
        this._pageX = e.pageX;
        this.viewMove(dx, dy);

    }
    viewMove(dx, dy) {
        let left = this.container.style.left;
        let top = this.container.style.top;
        let right = this.container.style.right;
        // let bottom = this.container.style.bottom;
        if (top) {
            top = window.parseInt(top);
        }else{

        }

        if (left && left !=="auto") {
            left = window.parseInt(left);
            this.setState({
                left: left + dx,
                top: top + dy
            });
        }else if(right && right !=="auto"){
            right = window.parseInt(right);
            this.setState({
                right: right - dx,
                top: top + dy
            });

        }
        

        
    }
    _mouseUp(e) {
        e.preventDefault();
        this._start = false;
        this._pageY = 0;
        this._pageX = 0;
        document.removeEventListener("mousemove", this._mouseMoveFunc);
        document.removeEventListener("mouseup", this._mouseUpFunc);
        this._mouseMoveFunc = null;
        this._mouseUpFunc = null;

    }
    onClose() {
        let { onClose} = this.props;
        onClose && onClose()
    }
    
}
export default MonOverlay;