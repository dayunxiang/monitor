import React from 'react';
import { Row, col, Button, Spin, Carousel, Icon} from '../../../../components/Antd.js';
import "./RectifyNotice.css";
import {getOperationBtns} from "./rectifyUtil.js";
const Fragment = React.Fragment;

class RectifyNotice extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showImg: false,
            imgs: null
        };

    }

    render() {
        let { entity, showTools, loading } = this.props;
        if (entity == null) {
            entity = {};
        }
        let oriImgs = entity.images && entity.images.length ? entity.images.map((item, i) => {
            return <img key={i} className="ps-rect-img" alt="图片" src={"/api/" + item.replace("images/", "images/thumb/")} />;
        }) : "";
        let rectifyImgs = entity.commitInfo && entity.commitInfo.images && entity.commitInfo.images.length ? entity.commitInfo.images.map((item, i) => {
            return <img key={i} className="ps-rect-img" alt="图片" src={"/api/" + item.replace("images/", "images/thumb/")} />;
        }) : "";
        let rejectImgs = entity.rejectInfo && entity.rejectInfo.images && entity.rejectInfo.images.length ? entity.rejectInfo.images.map((item, i) => {
            return <img key={i} className="ps-rect-img" alt="图片" src={"/api/" + item.replace("images/", "images/thumb/")} />;
        }) : "";
        return (
            <div className="ps-word-table">
                {this.state.showImg ? this.createCarousel() :
                    <Fragment>
                        <div className="ps-wd-title">
                            <span className="ps-wd-title-left">{entity.rectificationSerial}</span>
                            <span className="ps-wd-title-center">水利行业长效检查整改通知单</span>
                            <span className="ps-wd-title-right">{entity.ss}</span>
                        </div>
                        {
                            loading ? <Spin size="large"></Spin> :
                                <Fragment>
                                    <table border="1">
                                        <tbody>
                                            <tr>
                                                <td width="4%" rowSpan="7">检查情况</td>
                                                <td width="24%"className="ps-weight-label">设施名称</td>
                                                <td width="24%">{entity.conservancyName}</td>
                                                <td width="24%"className="ps-weight-label">所在村(居委)</td>
                                                <td width="24%">{entity.ss}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">报告人</td>
                                                <td>{entity.reporterName}</td>
                                                <td className="ps-weight-label">联系方式</td>
                                                <td>{entity.reporterMobile}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">报告时间</td>
                                                <td>{entity.gmtCreate}</td>
                                                <td className="ps-weight-label">状态</td>
                                                <td>{entity.processStateName}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">问题点</td>
                                                <td>{entity.targetName}</td>
                                                <td className="ps-weight-label">问题内容</td>
                                                <td>{entity.subTargetName}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">检查情况说明</td>
                                                <td colSpan="3">{entity.rectificationReason}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">检查问题照片</td>
                                                <td colSpan="3" onClick={this.oriImgsClick.bind(this)}>{oriImgs}</td>
                                            </tr>
                                            <tr>
                                                <td className="ps-weight-label">资金额度</td>
                                                <td colSpan="3">{entity.expenseMoney}</td>
                                            </tr>
                                            {  
                                                entity.commitInfo ?
                                                    <Fragment>
                                                        <tr>
                                                            <td rowSpan="5">整改情况</td>
                                                            <td className="ps-weight-label">处理人</td>
                                                            <td>{entity.commitInfo.processorName}</td>
                                                            <td className="ps-weight-label">联系方式</td>
                                                            <td>{entity.commitInfo.processorMobile}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="ps-weight-label">报告时间</td>
                                                            <td colSpan="3">{entity.commitInfo.gmtModified}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="ps-weight-label">整改情况说明</td>
                                                            <td colSpan="3">{entity.commitInfo.content}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="ps-weight-label">备注</td>
                                                            <td colSpan="3">{entity.commitInfo.remark}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="ps-weight-label">整改完成照片</td>
                                                            <td colSpan="3" onClick={this.rectifyImgsClick.bind(this)}>{rectifyImgs}</td>
                                                        </tr>
                                                    </Fragment>
                                                    :null
                                            }
                                            {  
                                                entity.rejectInfo ?
                                                    <Fragment>
                                                        <tr>
                                                            <td rowSpan="2">再整改通知</td>
                                                            <td className="ps-weight-label">整改不合格说明</td>
                                                            <td colSpan="3">{entity.rejectInfo.content}</td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td className="ps-weight-label">现场照片</td>
                                                            <td colSpan="3" onClick={this.rejectImgsClick.bind(this)}>{rejectImgs}</td>
                                                        </tr>
                                                    </Fragment>
                                                    :null
                                            }
                                            
                                        </tbody>
                                    </table>
                                    
                                    {showTools ? this.renderTools() : null}
                                </Fragment>

                        }
                    </Fragment>
                }
                
                
            </div>
        );
    }
    createCarousel() {
        if (!this.state.imgs || !this.state.imgs.length) return;
        let imgs = this.state.imgs.map((item, i) => {
            return <div key={i}><img key={"bigimg"+i} className="ps-rect-img-big" alt="图片" src={"/api/" + item} /></div>;
        });
        return (
            <Fragment>
                <div className="ps-rect-back">
                    <Button type="primary" onClick={this.back.bind(this)}>
                        <Icon type="left" />后退
                    </Button>
                </div>
                <Carousel autoplay>
                    {imgs}
                </Carousel>
            </Fragment>
        );
    }
    componentDidMount() {
        
    }
    renderTools(role, status) {
        let options = getOperationBtns(role, status);
        let btns = options.map(({key, name}) => {
            return <Button key={key} type="primary" size="small" ghost onClick={this.btnClick.bind(this, key, name)}>{name}</Button>;
        });
        let logBtn = <Button key="log" type="primary" size="small" ghost onClick={this.btnClick.bind(this, "log", "日志")}>日志</Button>;
        let downloadBtn = <Button key="download" type="primary" size="small" ghost  onClick={this.btnClick.bind(this, "download", "下载")}>下载</Button>;
        return (
            <div className="ps-wd-tools">
                {btns}
                <span className="ps-wd-right-tools">{[logBtn, downloadBtn]}</span>
            </div>
        );
    }
    btnClick(key, name) {
        this.props.optionBtnClick && this.props.optionBtnClick(key, name);
    }
    oriImgsClick(e) {
        e.stopPropagation();
        let { entity} = this.props;
        if (!entity.images || !entity.images.length) return;
        this.setState({
            showImg: true,
            imgs: entity.images
        });
    }
    rectifyImgsClick(e) {
        e.stopPropagation();
        let { entity} = this.props;
        if (!entity.commitInfo || !entity.commitInfo.images || !entity.commitInfo.images.length) return;
        this.setState({
            showImg: true,
            imgs: entity.commitInfo && entity.commitInfo.images
        });
    }
    rejectImgsClick(e) {
        e.stopPropagation();
        let { entity} = this.props;
        if (!entity.rejectInfo || !entity.rejectInfo.images || !entity.rejectInfo.images.length) return;
        this.setState({
            showImg: true,
            imgs: entity.rejectInfo && entity.rejectInfo.images
        });
    }
    back(e) {
        e.stopPropagation();
        this.setState({
            showImg: false
        });
    }
    
}
export default RectifyNotice;