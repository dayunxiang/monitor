import React from 'react';
import {Button, Dropdown, Menu, Icon } from '../../../../components/Antd.js';

class Test extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.fullScreen = false;
        
    }

    render() {
        let {domId} = this.props;
        const menu = (
            <Menu onClick={this.menuItemClick.bind(this)}>
                <Menu.Item key="0">
                    <a href="javascript:void(0)">主码流</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="javascript:void(0)">辅码流</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div ref={(node) => {this.div = node;}} className={"ps-video-cont "} onDoubleClick={this.doubleClick.bind(this)} onDragEnter={this.onDragEnter} onDrag={this.onDragStart}>
                <video id={domId} controls="controls" autoPlay></video>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button type="primary" ghost>选择码流</Button>
                </Dropdown>
            </div>
        );
    }
    
    componentDidMount() {
        let { videoPlayer, kurentoSvr,  RTSPSourceUrl, domId } = this.props;
        let videoTag = document.getElementById(domId);
        // let kurentoSvr = "ws://221.181.88.134:5432/kurento";
        let vp = new videoPlayer(videoTag, kurentoSvr);
        vp.setRTSPSourceUrl(RTSPSourceUrl);
        vp.addEventListener("error", function(error){
            //console.log(error);
        });
        vp.play();
        this.vp = vp;
    }
    componentWillUnmount() {
        
        this.vp && this.vp.stop();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.kurentoSvr !== prevProps.kurentoSvr || this.props.RTSPSourceUrl !== prevProps.RTSPSourceUrl) {
            this.vp.stop();
            this.vp.setRTSPSourceUrl(this.props.RTSPSourceUrl);
            this.vp.play();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.kurentoSvr !== nextProps.kurentoSvr || this.props.RTSPSourceUrl !== nextProps.RTSPSourceUrl) {
            return true;
        }
        return false;
    }
    
    doubleClick(e) {
        if (this.fullScreen) {
            this.exitFullscreen()
            this.fullScreen = false;
        }else{
            this.launchFullscreen(e.target)
            this.fullScreen = true;
        }
        
    }
    launchFullscreen(element)  {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen(); 
        } else if(element.oRequestFullscreen) {
            element.oRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
    }
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.oRequestFullscreen){
            document.oCancelFullScreen();
        }else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
    menuItemClick(e) {
        let {subtypeChange, index } = this.props;
        subtypeChange && subtypeChange(e, index);
    }
    onDragEnter(e) {
        console.log(e)
    }
    onDragStart(e) {
        console.log(e)
    }
}
export default Test;