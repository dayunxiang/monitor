import React from 'react';
import {Spin} from '../../../../components/Antd.js';
const Fragment = React.Fragment;

class ConOverlay extends React.Component {
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
        let waterLevel = entity.waterDyn, inWl = [], outWl = [];
        if (waterLevel && waterLevel.length) {

            for (var i = 0; i < waterLevel.length; i++) {
                let wlData = waterLevel[i];
                if (wlData.positionType === 2402) { //外河
                    outWl.push(wlData.waterLevel)
                }else {
                    inWl.push(wlData.waterLevel) ;
                }
            }
        }
        let ele = entity.eleDyn, eletrElement = null, eleCont = null
        if (ele && ele.length ) {
            eletrElement = ele.map((item) => {
                return <tr key={item.id}>
                    <td colSpan="2">{item.electricityInstrumentInfoName}</td>
                    <td>{item.electric}</td>
                    <td>{item.voltage}</td>
                </tr>
            })
            eleCont = <Fragment>
                <tr>
                    <td colSpan="2" className="ps-ol-label">电量仪</td>
                    <td className="ps-ol-label">电压</td>
                    <td className="ps-ol-label">电流</td>
                </tr>
                {eletrElement}
            </Fragment>;
        }
        let gate = entity.gateDyn, gateElement = null, gateCont = null
        if (gate && gate.length ) {
            gateElement = gate.map((item) => {
                return <tr key={item.id}>
                    <td colSpan="2">{item.gateInfoName}</td>
                    <td colSpan="2">{item.distanceBottom}</td>
                </tr>
            })
            gateCont = <Fragment>
                <tr>
                    <td colSpan="2" className="ps-ol-label">闸位仪</td>
                    <td colSpan="2" className="ps-ol-label">闸位仪开度</td>
                </tr>
                {gateElement}
            </Fragment>;
        }
        let pump = entity.pumpDyn, pumpElement = null, pumpCont = null
        if (pump && pump.length ) {
            pumpElement = pump.map((item) => {
                return <tr key={item.id}>
                    <td >{item.pumpInfoName}</td>
                    <td >{item.electric}</td>
                    <td >{item.voltage}</td>
                    <td >{item.openCloseOperate ? "开" : "关"}</td>
                </tr>
            })
            pumpCont = <Fragment>
                <tr>
                    <td className="ps-ol-label">泵</td>
                    <td className="ps-ol-label">电流</td>
                    <td className="ps-ol-label">电压</td>
                    <td className="ps-ol-label">开关状态</td>
                </tr>
                {pumpElement}
            </Fragment>;
        }
        
        return (
            <div className="ps-ol-table" style={containerStyle} onMouseDown={this.mouseDown.bind(this)} ref={(node) => {this.container = node}}>
                <div className="ps-ol-title">
                    <span className="ps-ol-title-center">{entity.name}</span>
                    <a className="ps-ol-close" href="javascript:void(0)" onClick={this.onClose.bind(this)}>关闭</a>
                </div>
                {
                    loading ? <Spin size="large" /> :
                    <table border="1">
                        <tbody>
                            <tr>
                                <td width="24%"className="ps-ol-label">名称名称</td>
                                <td width="24%">{entity.name}</td>
                                <td width="24%"className="ps-ol-label">唯一识别号</td>
                                <td width="24%">{entity.serialNumber}</td>
                            </tr>
                            <tr>
                                <td className="ps-ol-label">闸宽</td>
                                <td>{entity.gateSize}</td>
                                <td className="ps-ol-label">设施类型</td>
                                <td>{entity.facilityTypeName}</td>
                            </tr>
                            <tr>
                                <td className="ps-ol-label">经度</td>
                                <td>{entity.lon}</td>
                                <td className="ps-ol-label">纬度</td>
                                <td>{entity.lat}</td>
                            </tr>
                            <tr>
                                <td className="ps-ol-label">内河水位</td>
                                <td>{inWl.join(",")}</td>
                                <td className="ps-ol-label">外河水位</td>
                                <td>{outWl.join(",")}</td>
                            </tr>
                            {eleCont}
                            {gateCont}
                            {pumpCont}
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
        return entity && entity.itemType === 1 ? true : false;
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
export default ConOverlay;