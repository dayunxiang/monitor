import React from 'react';
// import { Tree, Menu, Icon} from '../Antd.js';


class PersonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            left: 0,
            top: 0
        };

    }

    render() {
        let { entity, width } = this.props;
        if (entity == null) {
            entity = {};
        }
        let containerStyle  = {
            width:width ? width:"400px", 
            top: this.state.top, 
            left: this.state.left
        };
        
        return (
            <div className="ps-ol-table" style={containerStyle} onMouseDown={this.mouseDown.bind(this)} ref={(node) => {this.container = node}}>
                <div className="ps-ol-title">
                    <span className="ps-ol-title-center">{entity.username}</span>
                    <a className="ps-ol-close" href="javascript:void(0)" onClick={this.onClose.bind(this)}>关闭</a>
                </div>
                <table border="1">
                    <tbody>
                        <tr>
                            <td width="24%"className="ps-ol-label">名称名称</td>
                            <td width="24%">{entity.username}</td>
                            <td width="24%"className="ps-ol-label">速度</td>
                            <td width="24%">{entity.speed}</td>
                        </tr>
                       
                        <tr>
                            <td className="ps-ol-label">经度</td>
                            <td>{entity.lon}</td>
                            <td className="ps-ol-label">纬度</td>
                            <td>{entity.lat}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        );
    }
    componentDidMount() {
        
    }
    static getDerivedStateFromProps(props, state) {
        return {
            left: state.left ? state.left: (props.left ? props.left : 0),
            top: state.top ? state.top: (props.top ? props.top : 0)
        };
    }
    static canHandle(entity) {
        return entity && entity.username ? true : false;
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
        // let right = this.container.style.right;
        // let bottom = this.container.style.bottom;
        if (left) {
            left = window.parseInt(left);
        }else {
            // right = window.parseInt(right);
        }
        if (top) {
            top = window.parseInt(top);
        }else {

        }

        this.setState({
            left: left + dx,
            top: top + dy
        });
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
export default PersonOverlay;