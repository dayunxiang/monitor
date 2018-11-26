import React from 'react';
import {Radio, Spin, Button, Input, Select, Row, Col, Tree,Icon,Divider,message } from '../../../../components/Antd.js';
// import RTSPVideoPlayer from '../../../../util/videoplayer.js';
import {postDamTree, postRegionTree, postRegionCameraTree} from '../../../../data/dataStore.js';
import BaseSubPage from '../BaseSubPage.js'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import NiceTree from '../../../../components/NiceTree/NiceTree.js';
import {cloneObj} from "../../../../util/common.js"
import RtcVideo from "./RtcVideo.js"
import "./style.css"
class VideoMonitor extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            loading: true,
            jsLoading: true,
            treeData: {},
            activeBtn: 1, //默认选中btn
            layout: 2,
            activeVideo: 0,
            video:null
        };
        this.treeForceRender = false;
        this.resize = () => {
            let videoBox = document.querySelectorAll(".ps-right-item .ps-video-box");
            let gW = 0;
            if (videoBox && videoBox.length) {
                for (var i = 0; i < videoBox.length; i++) {
                    let item = videoBox[i];
                    if (!gW) {
                        gW = item.clientWidth;
                    }
                    let h = gW / 1.77;
                    item.style.height = h + "px";
                }
            }
            
            
        };
    }
// let videoTag = document.getElementById("video");
//         // let kurentoSvr = "ws://221.181.88.134:5432/kurento";
//         let kurentoSvr = "ws://192.168.2.116:5432/kurento";
//         let videoPlayer = new this.RTSPVideoPlayer(videoTag, kurentoSvr);
//         videoPlayer.setRTSPSourceUrl("rtsp://admin:admin123@192.168.100.100/cam/realmonitor?channel=1&subtype=0");
//         videoPlayer.addEventListener("error", function(error){
//             //console.log(error);
//         });
//         videoPlayer.play();
    render() {
        return (
            (this.state.loading || this.state.jsLoading) ? 
            <div className="vk-subpage vk-subpage-loading" ><Spin size="large" /></div> : 
            <div className="vk-subpage">
                <div className="ps-irrigation-flex">
                    <div className="ps-flex-item ps-left-item">
                        <div className="ps-tree-search-cont noselect">
                            <ButtonGroup style={{width:"100%"}}>
                                <Button type="default" style={{width: "100%"}} className={this.state.activeBtn === 1 ? "active": ""} onClick={this.onbtnClick.bind(this, 1)}>
                                    控制区结构
                                </Button>
                            </ButtonGroup>
                            <Search className="ps-tree-search"
                                placeholder="模糊查找"
                                style={{ width: "100%"}}
                                onChange={this.throttle(this.searchChange, 300).bind(this)}
                            />
                            {
                            <NiceTree checkable
                                multiple={true}
                                draggable={true}
                                disableCheckbox={true} 
                                onCheck={this.onCheck.bind(this)}
                                defaultExpandAll={true}
                                checkStrictly={true}
                                onSelect={this.onTreeSelect.bind(this)}
                                forceRender={this.treeForceRender}
                                onDragStart={this.dragStart}
                                dataSource={(this.state.activeBtn ===1) ? (this.state.treeData && this.state.treeData.damTreeData) :(this.state.treeData && this.state.treeData.regionTreeData)}
                                >
                            </NiceTree>
                            }
                            
                        </div>
                    </div>
                    <div className="ps-flex-item ps-right-item">
                        <Row>
                            <Col xs={24} >
                                <div className="ps-ir-title">
                                    <Icon type="book"></Icon>
                                    实时视频
                                </div>
                                
                                <Divider className="ps-ir-divider"/>
                            </Col>
                            <Col xs={24}>
                                <Col md={24}>
                                    <Col md={8}><label >显示方式</label></Col>
                                    <Col md={16}>
                                        <RadioGroup defaultValue={this.state.layout} onChange={this.selectNumChange.bind(this)}>
                                            <Radio value={1}>1×1</Radio>
                                            <Radio value={2}>2×2</Radio>
                                            <Radio value={3}>3×3</Radio>
                                            <Radio value={4}>4×4</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Col>
                                <Divider className="ps-ir-divider"/>
                            </Col>
                            <Col xs={24} className="ps-video-pannel">
                                {this.createLayout(this.state.layout)}
                            </Col>
                            
                        </Row>
                    </div>

                </div>
            </div>
            
        );
            //<div className="vk-subpage">
                //<div className="ps-video-cont"><video id="video" autoPlay width="100%" height="100%"></video></div>
            //</div>
    }
    
    componentDidMount() {
        super.componentDidMount();
        this.calcDivContainer()
        this.loadData();

        import(/*webpackChunkName:'videoPlay'*/'../../../../util/videoplayer.js').then((module) => {
            this.RTSPVideoPlayer = module.default;
            // this.start();
            this.setState({
                jsLoading: false
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.state.loading && !this.state.jsLoading) {
            this.resize();
        }
        
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
        this.setState = () => {return;}
    }
    calcDivContainer() {
        this.resize();
        window.addEventListener("resize", this.resize);

    }
    createLayout(layout) {
        let num = layout * layout;
        let comps = [];
        for (var i = 0; i < num; i++) {
            let video = null;
            // if (this.state.video[i]) {
            //     let d = this.state.video[i];
            //     let rtspUrl = d.rtspUrl+ "?channel=" + d.channel + "&subtype=" +d.subtype;
            //     video = <RtcVideo index={i} subtypeChange={this.subtypeChange.bind(this)} domId={"video"+i} videoPlayer={this.RTSPVideoPlayer} kurentoSvr={d.wsUrl} RTSPSourceUrl={rtspUrl} ></RtcVideo>
            // }
            if (this.state.video && this.state.video.length) {
                for (var j = 0; j < this.state.video.length; j++) {
                    let videoData = this.state.video[j];
                    if (videoData.index === i) {
                        let d = videoData;
                        let rtspUrl = d.rtspUrl+ "?channel=" + d.channel + "&subtype=" +d.subtype;
                        video = <RtcVideo index={i} subtypeChange={this.subtypeChange.bind(this)} domId={"video"+i} videoPlayer={this.RTSPVideoPlayer} kurentoSvr={d.wsUrl} RTSPSourceUrl={rtspUrl} ></RtcVideo>
                        break;
                    }
                }
            }
            
            let comp = (
                <Col key={i} onDragEnter={this.dragColEnter} onDragOver={this.dragColOver} onDrop={this.dragColDrop.bind(this, i)} onClick={this.videoContClick.bind(this, i)} className={'ps-video-box ' + ((i === this.state.activeVideo) ? "ps-video-active" : "")} xs={24/layout}>
                {video}
                </Col>
            );
            comps.push(comp);
        }
        return comps;
    }
    videoContClick(index) {
        this.setState({
            activeVideo: index
        });
    }
    start() {
        let videoTag = document.getElementById("video");
        // let kurentoSvr = "ws://221.181.88.134:5432/kurento";
        let kurentoSvr = "ws://192.168.2.116:5432/kurento";
        let videoPlayer = new this.RTSPVideoPlayer(videoTag, kurentoSvr);
        videoPlayer.setRTSPSourceUrl("rtsp://admin:admin123@192.168.100.100/cam/realmonitor?channel=1&subtype=0");
        videoPlayer.addEventListener("error", function(error){
            //console.log(error);
        });
        videoPlayer.play();
    }
    // 点击复选框触发
    onCheck=(defaultCheckedKeys)=>{
        console.log(defaultCheckedKeys,'checkedKeys')
    }
    handlerTreeNode(node) {
        if (!Array.isArray(node)) return;
        var treeNodes = [];
        for (var i = 0; i < node.length; i++) {
            var n = node[i];
            var treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n} ></Tree.TreeNode>;
            if (n.children && n.children.length) {
                var nodes = this.handlerTreeNode(n.children);
                treeNode = <Tree.TreeNode title={n.title} key={n.id} entity={n}>{nodes}</Tree.TreeNode>;
            }
            treeNodes.push(treeNode);
        }
        return treeNodes;
    }
    //表格勾选
    onChange(selectedRowKeys, selectedRows) {
        console.log("onChange",selectedRowKeys, selectedRows );
        this.setState({
            checkedRowData:selectedRows
        });

    }
   
    searchChange(value) {
        if (!this.treeData || !this.treeData.damTreeData) return;
        let damData = this.treeData.damTreeData;
        // let regionTree = this.treeData.regionTreeData;
        this.treeForceRender = true;
        this.setState({
            treeData: {
                damTreeData: this.filterData(cloneObj(damData), value),
                // regionTreeData: this.filterData(cloneObj(regionTree), value)
            }
        },() => {
            this.treeForceRender = false;
        })
        
    }
    
    filterData(data, keywords) {
        if (!Array.isArray(data)) return;
        return data.filter((item) => {
            let flag = false;
            if (item.title.indexOf(keywords) > -1) {
                flag = true;
            }else{
                flag = false;
            }
            if (item.children && item.children.length) {
                item.children = this.filterData(item.children, keywords);
                if (item.children.length) {
                    flag = true;
                }
            }
            return flag;
        })
    }
    throttle(method, delay) {
        var timer=null;
        return function(...args) {
            // var context = this, args = arguments;
            let value = args[0].target.value;
            window.clearTimeout(timer);
            timer = window.setTimeout(()=> {
                method.apply(this, [value]);
            }, delay);
        };
    }
    selectNumChange(e) {
        this.setState({
            layout: e.target.value
        },() => {
            // this.resize();
        })
    }
    subtypeChange(e, index) {
        console.log(e, index);
        // let d = this.state.video[index];
        for (var i = 0; i < this.state.video.length; i++) {
            let video = this.state.video[i];
            if (video.index === index) {
                video.subtype = e.key;
                this.forceUpdate();
                break;
            }
        }
        
    }
    onTreeSelect(a, b, c) {
        let vd = {wsUrl: 'ws://221.181.88.134:5432/kurento', rtspUrl: "rtsp://admin:admin123@192.168.100.101/cam/realmonitor",channel: 1,subtype: 0 };
        this.addVideoData(vd, this.state.activeVideo);
        
    }
    addVideoData(data, index) {
        let videoData = this.state.video;
        let activeVideo = index;
        let vd = data;
        let hasData = false;
        if (videoData && videoData.length) {
            for (var i = 0; i < videoData.length; i++) {
                let v = videoData[i];
                if (v.index === activeVideo) {
                    Object.assign(v, vd);
                    hasData = true;
                    // this.forceUpdate();
                    break;
                }
            }
        }
        if (!hasData) {
            vd.index = activeVideo;
            if (Array.isArray(videoData)) {
                videoData.push(vd);
            }else{
                videoData = [vd];
            }
            //  ?  : ;
        }
        this.setState({
            video: videoData
        })
    }
    async loadData() {
        
        let damTreePromise = postRegionCameraTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("树接口出错");}).then((data) => {
            if (data.code === 200) {
                return data.data;
            }
            return Promise.reject(data.msg);
        });
        // let regionTreePromise = postRegionTree().then((res) =>{ return res.ok ? res.json() : Promise.reject("树接口出错");}).then((data) => {
        //     if (data.code === 200) {
        //         return data.data;
        //     }
        //     return Promise.reject(data.msg);
        // });
        let data = await Promise.all([damTreePromise ]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        if (Array.isArray(data) && data.length ) {
            
            let damTreeData = [data[0]];
            // let regionTreeData = [data[1]];
            this.treeForceRender = true;
            this.setState({
                loading: false,
                treeData: {damTreeData}
            },() => {
                this.treeForceRender = false;
            })
            this.treeData = {damTreeData};//记录一下 用于搜索
        }else{
            this.setState({
                loading: false
            });
            message.error(data ||  "服务器异常!",5);
        }

    }
    onbtnClick(key, e) {
        this.setState({
            activeBtn: key
        },() => {

        })
    }
    dragColEnter(e) {
        e.preventDefault();
        console.log(e);
    }
    dragColDrop(i, e) {
        console.log("dragColDrop", e);
        let vd = {wsUrl: 'ws://221.181.88.134:5432/kurento', rtspUrl: "rtsp://admin:admin123@192.168.100.101/cam/realmonitor",channel: 1,subtype: 0 };
        this.addVideoData(vd, i);
    }
    dragColOver(e) {
        e.preventDefault();
        console.log("dragOver",e);
    }
    dragStart(e,a,b) {
        // e.preventDefault();
        console.log("dragStart",e);
    }
    dragDrop(e) {
        console.log("dragDrop", e);
    }
    
}
export default VideoMonitor;