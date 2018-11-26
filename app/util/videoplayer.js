/**
 * RTSP协议视频播放组件
 * 作者：phz
 * 时间:2018/10/30
 *
 * 示例：

 *  function start() {
        let videoTag = document.getElementById("videoOutput");
        let kurentoSvr = "ws://192.168.100.106:8888/kurento";
        let videoPlayer = new RTSPVideoPlayer(videoTag, kurentoSvr);
        videoPlayer.setRTSPSourceUrl("rtsp://admin:admin123@192.168.100.100/cam/realmonitor?channel=1&subtype=0");
        videoPlayer.play();
    }
 *【参数说明】
 * videoOuput 表示页面中Video标签
 *  * rtsp://admin:admin123@192.168.100.100/cam/realmonitor?channel=1&subtype=0 表示摄像头的RTSP服务地址
 * 不同厂商的摄像头，地址可能有所区别，下面列出常用的摄像头地址
 *
 * 【海康摄像头】
 * rtsp://[username]:[password]@[ip]:[port]/[codec]/[channel]/[subtype]/av_stream
 * 说明：
 * username: 用户名。例如admin。
 * password: 密码。例如12345。
 * ip: 为设备IP。例如 192.0.0.64。
 * port: 端口号默认为554，若为默认可不填写。
 * codec：有h264、MPEG-4、mpeg4这几种。
 * channel: 通道号，起始为1。例如通道1，则为ch1。
 * subtype: 码流类型，主码流为main，辅码流为sub。
 *
 * 【大华摄像头】
 * rtsp://username:password@ip:port/cam/realmonitor?channel=1&subtype=0
 * 说明:
 * username: 用户名。例如admin。
 * password: 密码。例如admin。
 * ip: 为设备IP。例如 10.7.8.122。
 * port: 端口号默认为554，若为默认可不填写。
 * channel: 通道号，起始为1。例如通道2，则为channel=2。
 * subtype: 码流类型，主码流为0（即subtype=0），辅码流为1（即subtype=1）
 *
 */
// import kurentoClient from "./kurento-client.js";
require("./adapter.js");
import kurentoUtils from "./kurento-utils.min.js";
require("./kurento-client.js");
// let kurentoUtils = require("./kurento-utils.min.js");

// console.log(kurentoClient, kurentoUtils)
export default class RTSPVideoPlayer{
    /**
     * 构造函数
     * @param video 表示要播放视频的标签<video />
     * @param kmsServerUrl 流媒体服务器地址
     */
    constructor(video, kmsServerUrl){

        this.videotag = video;
        this.kmsServerUrl = kmsServerUrl;
        this.events = {};
    }

    /**
     * 设置RTSP播放源
     * @param url RTSP url
     */
    setRTSPSourceUrl(url){
        this.rtspSrcUrl = url;
    }

    /**
     * 开始播放视频
     */
    play(){

        this.initConnect();
    }

    /**
     * 停止播放视频
     */
    stop(){
        if(this.peer){
            this.peer.dispose();
            this.peer = null;
        }

        if(this.pipeLine){
            this.pipeLine.release();
            this.pipeLine = null;
        }
    }

    /**
     * 初始化连接
     */
    initConnect(){
        let options ={remoteVideo:this.videotag};
        this.peer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, (error)=> {
            //错误处理
            if(error){
                this.onError(error);
            }
        });

        this.peer.generateOffer(this.onOffer.bind(this)) ;

        this.peer.peerConnection.addEventListener("iceconnectionstatechange", (event)=> {
            //连接状态改变事件处理
            this.onConnectChanged(event);
        });
    }

    /**
     *回调，用于连接流媒体服务器时调用
     * @param error
     * @param sdpOffer
     */
    onOffer(error, sdpOffer){
        if(error){
            this.onError(error);
            return;
        }

        kurentoClient(this.kmsServerUrl, (error, kurentoClient)=> {
                if(error){
                    //错误处理
                    this.onError(error);
                    return;
                }

            kurentoClient.create("MediaPipeline", (error, pipe)=> {
                if(error){
                    this.onError(error);
                    return;
                }

                this.pipeLine = pipe;

                //创建输入节点
                this.pipeLine.create("PlayerEndpoint", {uri:this.rtspSrcUrl}, (error, player)=> {
                    if(error){
                        this.onError(error);
                        return;
                    }

                    let videoInput = player;

                    //创建终节点
                    this.pipeLine.create("WebRtcEndpoint", (error, endPoint)=> {

                        if(error){
                            this.onError(error);
                            return;
                        }

                        this.setIceCandidateCallbacks(endPoint, this.peer, this.onError);

                        //处理底层请求
                        endPoint.processOffer(sdpOffer, (error, sdpAns)=> {
                            endPoint.gatherCandidates(this.onError.bind(this));
                            if(this.peer){
                                this.peer.processAnswer(sdpAns);
                            }
                        });

                        //连接远程视频服务
                        videoInput.connect(endPoint, (error) => {
                            if(error){
                                this.onError(error);
                            }
                        });

                        //渲染视频
                        videoInput.play((error)=> {
                            if(error){
                                this.onError(error);
                            }
                        });
                    });
                });
            });
        });
    }

    /**
     * 加入事件处理委托
     * @param eventType
     * @param func
     */
    addEventListener(eventType, func){
        let event = this.events[eventType];

        if(event){
            if(event.indexOf(func) === -1){
                event.push(func);
            }
        }
        else{
            this.events[eventType] = [func];
        }
    }

    /**
     * 移除事件监听器
     * @param eventType 事件类型
     * @param func 事件响应
     */
    removeEvent(eventType, func){
        let event = this.events[eventType];

        if(event.indexOf(func) !== -1){
            event.remove(func);
        }
    }

    /**
     * 激发事件
     * @param type 事件类型
     * @param eventArgs 事件参数
     */
    fireEvent(type, eventArgs){
        let event = this.events[type];

        if(event){
            for(let i = 0; i < event.length; i++){
                if(event[i]){
                    event[i](eventArgs);
                }
            }
        }
    }
    /**
     * 错误处理
     * @param error
     */
    onError(error){
        this.fireEvent("error", error);
    }

    /**
     * 连接改变事件处理
     * @param event
     */
    onConnectChanged(event){
        this.fireEvent("connectchanged", event);
    }

    /**
     * 参数处理
     * @param args 参数
     * @param opts 选项
     * @returns {null|*|{}}
     */
    getpts(args, opts){
        let result = opts.default || {};
        args.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) { result[$1] = $3; });

        return result;
    }

    /**
     * 设置代理服务
     * @param endPoint
     * @param peer
     * @param funcError
     */
    setIceCandidateCallbacks(endPoint, peer, funcError){
        peer.on('icecandidate', (candidate)=>{
            candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);
            endPoint.addIceCandidate(candidate, funcError.bind(this));
        });

        endPoint.on('OnIceCandidate', (event)=>{
            let candidate = event.candidate;
            peer.addIceCandidate(candidate, funcError.bind(this));
        });
    }
}