import React from 'react';
import { Table, Icon, IconFont } from "../../../../../components/Antd.js";
import { postJSONData } from "../../../../../util/common.js"

class GridChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let { data } = this.state;
        let columns = null;
        if (data && data.fields && Array.isArray(data.fields)) {
            let length = data.fields.length;
            columns = data.fields.map((item) => {
                return {title: item.caption, dataIndex: item.field, width: 100 / length + "%"};
            });
        }
        let ths = columns && columns.map((item, index) => {
            return <th key={index} width={item.width}>{item.title}</th>;
        });
        let dataSource = data.dataRows && data.dataRows.map((item) => {
            return item.rowValue;
        });
        let trs = dataSource && dataSource.map((item, index) => {
            let tds = columns.map((d, i) => {
                return <td key={index+""+i} width={d.width}>{item[d.dataIndex]}</td>;
            });
            return <tr key={index}>{tds}</tr>;
        });
        // dataSource = [].concat(dataSource, dataSource,dataSource)
        // trs = [].concat(trs,trs,trs,trs,trs);
        let icf = data.titleIconShow ? <IconFont type={data.titleIconName}></IconFont> : null;
        return (
            <div className="ps-m-g-cont">
                <div className="ps-m-g-title">{data.name}{icf}</div>
                <table>
                    <thead>
                        <tr>{ths}</tr>
                    </thead>
                </table>
                <div className="ps-m-g-body" ref={(node) => {this.body = node;}}>
                    <table>
                        <tbody ref={(node)=> {this.tbody = node;}}>
                            {trs}
                        </tbody>
                    </table>
                </div>
            </div>
            
        );
    }
    
    componentDidMount() {
        let { data } = this.state;
        if (data.gridRollStyle) {
            this.startmove();
        }
        this.startInterval();

        // window.setTimeout(() => {
        //     this.forceUpdate();
        // },10000)
    }
    componentDidUpdate(prevProps, prevState) {
        let { data } = this.state;
        if (data.gridRollStyle) {
            this.startmove();
        }
    }
    componentWillUnmount() {
        if (this._moveTimer) {
            window.clearInterval(this._moveTimer);
        }
        if (this._quickTimer) {
            window.cancelAnimationFrame(this._quickTimer);
        }
        if (this._timer) {
            window.clearInterval(this._timer);
        }
        this.setState = () => {return;};
        this.forceUpdate = () => {return;};
    }
    startInterval() {
        let { data } = this.state;
        let interval = data.refreshInterval ? data.refreshInterval: 60;
        let func = () => {
            postJSONData(data.dataUrl, {}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
                if (data.code === 200) {
                    this.state.data && (this.state.data.dataRows = data.data);
                    this.forceUpdate();
                    return ;
                }
                return Promise.reject(data.msg);
            }).catch((ex) => {});
        }
        this._timer = window.setInterval(func, interval * 1000);
        func();
    }
    startmove() {
        if (this._moveTimer) {
            window.clearInterval(this._moveTimer);
        }

        let {scrollHeightOnce} = this.props;
        if (this.body.children[0].children[0].children.length > 0) {
            let firstTr = this.body.children[0].children[0].children[0];
            scrollHeightOnce = firstTr.clientHeight ? firstTr.clientHeight: scrollHeightOnce;
        }
        let scrollHeight = this.body.scrollHeight;
        let clientHeight = this.body.clientHeight;
        if (clientHeight >= scrollHeight) { return; }
        this._moveTimer = window.setInterval(() => {
            // this.body.scrollTop += 31;
            
            let scrollHeight = this.body.scrollHeight;
            let clientHeight = this.body.clientHeight;
            let scrollTop = this.body.scrollTop;
            
            if (clientHeight + scrollTop >= scrollHeight) {
                // this.body.scrollTop = 0;
                this._quickMoveOnceToTop(this.body, scrollTop, scrollTop);
            }else {
                this._quickMoveOnce(this.body, scrollHeightOnce, scrollTop);
            }
        },5000);
    }
    _quickMoveOnce(dom, length, baseLength) {
        let index = 0;
        if (this._quickTimer) {
            window.cancelAnimationFrame(this._quickTimer);
        }
        let func = () => {
            let nextMoveDy = length / 60;
            let nextMoveLength = nextMoveDy * index;
            
            dom.scrollTop = baseLength + nextMoveLength;
            if (index === 60) {
                dom.scrollTop = baseLength + length;
                index = 0;
                return window.cancelAnimationFrame(this._quickTimer);
            }
            index++;
            this._quickTimer = window.requestAnimationFrame(func)
        };
        this._quickTimer = window.requestAnimationFrame(func)
    }
    _quickMoveOnceToTop(dom, length, baseLength) {
        let index = 0;
        if (this._quickTimer) {
            window.cancelAnimationFrame(this._quickTimer);
        }
        let func = () => {
            let nextMoveDy = length / 60;
            let nextMoveLength = nextMoveDy * index;
            
            dom.scrollTop = baseLength - nextMoveLength;
            if (index === 60) {
                dom.scrollTop = baseLength - length;
                index = 0;
                return window.cancelAnimationFrame(this._quickTimer);
            }
            index++;
            this._quickTimer = window.requestAnimationFrame(func, 1000/60)
        }
        this._quickTimer = window.requestAnimationFrame(func,1000/60)
    }
    static getDerivedStateFromProps(props, state) {
        return {
            data: state.data ? state.data: props.data
        };
    }

    
}
export default GridChart;