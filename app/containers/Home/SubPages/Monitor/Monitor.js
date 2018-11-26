import React from 'react';
import Map from "./map/ubimap.js";
import { message, Col, Row } from "../../../../components/Antd.js";
import MapTools from "../../../../components/MapTools/MapTools.js";
import BaseSubPage from '../BaseSubPage.js';
import "./style.css";
import ConOverlay from "./ConOverlay.js";
import Overlay from "./Overlay.js";
import PersonOverlay from "./PersonOverlay.js";
import {postConservancyDyn, postPersonDyn, postFacWaterDyn,postFacEleDyn,postFacGateDyn, postFacPumpDyn, postFacVideoDyn,postFacNetworkDyn,
postChartSub, postChartSummary, postChartGrid } from '../../../../data/dataStore.js';
import Search from "../../../../components/Search/Search.js";
import ConversancySearch from "../../../../components/Search/ConversancySearch.js";
import PersonSearch from "../../../../components/Search/PersonSearch.js";

class Monitor extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showOverlay: false,
            loadingOverlay: false,
            currentOverlayEntity: null,
            listData: [],
            pearsonData: [],
            map: null,
        };
        this.map = null;


    }

    render() {
       
        return (
            <div className="vk-subpage ps-monitor">
                <div ref={(node) => {this.div = node; }} id="map" style={{height: "100%"}}>
                </div>
                
                <div className="ps-tools">
                    <MapTools ref={(node) =>{this.mapTools = node;}} map={this.state.map} callback={this.mapHandler()}></MapTools>
                </div>
                {
                    <Search style={{width:250,top:20,left:50,position:"absolute"}} itemClick={this.getItemClickFuncs()} items={[ConversancySearch, PersonSearch]} data={[].concat(this.state.listData, this.state.pearsonData)} ></Search>
                }
                <Overlay onClose={this.overlayClose.bind(this)} overlays={[ConOverlay, PersonOverlay]} show={this.state.showOverlay} loading={this.state.loadingOverlay} entity={this.state.currentOverlayEntity} right={1} top={130} width={400} ></Overlay>
                
            </div>
            
        );
    }
    componentDidCatch(a, b) {
        console.log(a, b);
    // this.props.homeActions.reset();
    }
    componentDidMount() {
        super.componentDidMount() ;
        this.loadData();
        // try {
            this.createMap();
        // }catch(e) {

        // }
        window.setTimeout(() => {
            this.setState({
                scrollData: "XXX报警了!!"
            })
        },4000)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.layout !== this.props.layout) {
            return window.setTimeout(() => {
                this.map && this.map.updateSize();
            }, 600);
        }
        if (prevProps.isActive == false && this.props.isActive) {
            this.map && this.map.updateSize();
        }
        
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        window.clearInterval(this.alarmTimer);
    }
    btnClick(e) {   
        // this.map.startSearch("Polygon", function(){
        //     console.log(arguments)
        // });
        this.map.startEditablePolygonInLayerFeature("region","Polygon002");
        // this.map.startEditablePolygon();
    }
    test() {
        this.map.addFeatures("ship", [
            {
                type:"Point",
                id:"ship002",
                lonlat:[122.2321, 31.232 ],
                heading:40
            },
            {
                type:"Point",
                id:"ship003",
                lonlat:[121.2321, 31.232 ],
                heading:40
            },
        ]);
        // this.map.addFeatures("region", [
        //     {
        //         type: "Polygon",
        //         id: "Polygon002",
        //         lonlats:[[122.2321, 31.232 ], [121.2321, 31.232 ], [121.2321, 32.232 ],[122.2321, 31.232 ]],
        //     }
        // ]);
        window.setTimeout(() => {
            // this.map.removeFeature("ship","ship002");
            // this.map.updateFeature("ship",{
            //     type:"Point",
            //     id:"ship003",
            //     lonlat:[122.2321, 32.232 ],
            //     heading:90
            // })
            // this.map.clear("ship");
        },3000);
    }
    // createMap1(d) {
    //     this.map = mapParser(d, {});
    //     this.setState({
    //         map: this.map
    //     });
    // }
    createMap() {
        this.map = new Map({
            target: 'map',
            center: [121.049423, 31.000566],
            zoom: 11,
            minZoom: 11,
            maxZoom: 19
        });
        this.map.addTile({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            visible: true,
            opacity:1,
            key: "gaode"
        });
        this.map.addGis({
            url: 'http://221.181.88.134:8079/map/river/201801/',
            zIndex: 10,
            key: "river"
        });
        this.map.addGis({
            url: 'http://221.181.88.134:8079/map/satellite/201801/',
            zIndex: 11,
            key: "satellite",
            visible: false
        });
        this.map.addGis({
            url: 'http://221.181.88.134:8079/map/plane/201801/',
            zIndex: 11,
            key: "plane",
            visible: false
        });
        this.map.addVector({
            key: "conservancy",
            zIndex: 20,
            style: {
                heading: function(featureObj) {
                    return featureObj.heading;
                },
                src: function(featureObj) { //
                    return require("../../../../statics/icon/transparent.png");
                },
                // offset:[11,-11],
                // offsetOrigin:"bottom-right",
                anchor: [0.5, 1],
                strokeColor: "#1890ff",
                width: 3,
                fillColor: "#1890ff",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.name + "";
                },
                font: '14px sans-serif'
            }
        });
        this.map.addVector({
            key: "person",
            zIndex: 20,
            style: {
                src: function(featureObj) {
                    return require("../../../../statics/img/person.png");
                },
                anchor:[0.5, 0.5],
                strokeColor: "#aaee77",
                width: 2,
                fillColor: "rgba(114,151,59,0.4)",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.username + "";
                },
                font: '14px sans-serif'
            }
        });
        this.map.addVector({
            key: "focus",
            zIndex: 22,
            style: {
                img: this.getFocusCanvas(),
                imgSize:[40, 40],
                // offset:[11,-11],
                // offsetOrigin:"bottom-right",
                anchor: [0.5, 1],
                strokeColor: "red",
                width: 3,
                fillColor: "red",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.name + "";
                },
                font: '14px sans-serif'
            }
        });
        
        this.map.startHighlightFeatureonLayer("conservancy");
        this.map.startHighlightFeatureonLayer("person");
        this.map.startSelectFeature("conservancy", this.featureClick.bind(this));
        this.map.startSelectFeature("person", this.featureClick.bind(this));

        let _this = this, zoom = this.map.getView().getZoom();
        this.map.onView("change:resolution", function(a) {
            let zoom = this.getZoom()
            _this.mapTools.setViewZoomChange(zoom);
            if (zoom <= 12) {
                _this.map.startCluster("conservancy", true);
                _this.setFoucsLonlat([0,0])
            }else{
                _this.map.stopCluster("conservancy");
            }
            if (zoom > 16) {
                _this.div.className = "ps-ol-cont-show";
            }else {
                _this.div.className = "ps-ol-cont-hide";
            }

        });
        this.mapTools.setViewZoomChange(zoom);
        if ( zoom <= 12) {
            this.map.startCluster("conservancy", true);
        }else{
            this.map.stopCluster("conservancy");
        }
        if (zoom > 16) {
            _this.div.className = "ps-ol-cont-show";
        }else {
            _this.div.className = "ps-ol-cont-hide";
        }
       
        this.setState({
            map: this.map
        });
        this.map.addFeature("focus", {type:"Point", id:1, lonlat:[0,0]});
    }
    getOverlayDiv(text) {
        var div = document.createElement("div");
        div.setAttribute("class", "qp-cont");
        var img = document.createElement("img");
        img.setAttribute("class", "qp-img");
        img.setAttribute("src", require("../../../../statics/img/person.png"));
        var div1 = document.createElement("div");
        div1.setAttribute("class", "qp-right-cell");
        var div11 = document.createElement("div");
        div11.setAttribute("class", "qp-bg");
        var div12 = document.createElement("div");
        div12.setAttribute("class", "qp-hide-text");
        div12.innerHTML = text;
        var div111 = document.createElement("div");
        div111.setAttribute("class", "qp-text");
        div111.innerHTML = text;
        div11.appendChild(div111);
        div1.appendChild(div11);
        div1.appendChild(div12);
        div.appendChild(img);
        div.appendChild(div1);
        return div;
    }
    mapHandler() {
        return {
            rectSearch: (param) => {
                console.log(param, this.state);
            }
        };
    }

    async loadData() {
        let conPromise = postConservancyDyn({}).then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let personPromise = postPersonDyn().then((res) => {return res.ok ? res.json() : Promise.reject("巡查员接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
       
        
        // let jurisdictionTypePromise = getDict(["jurisdiction_type"]);
        let data = await Promise.all([ conPromise, personPromise]).then((data) => {
            return data;
        }).catch((ex) => {return ex instanceof Object ? ex.toString() : ex;});
        if (Array.isArray(data) && data.length) {
            let listData = data[0];
            listData && listData.forEach((item) => {
                item.itemType = 1;
            })
            let personData = data[1];
            this.setState({
                listData: listData,
                pearsonData: personData
            });
            this.addConservancyListData(listData);
            this.addPersonListData(personData);

        } else {
            this.setState({
                loading: false
            });
            message.error(data || "服务器异常!", 5);
        }

    }
    addConservancyListData(data) {
        if (!Array.isArray(data)) return;
        let newData = data.map((item) => {
            //加上overlay
            let div = document.createElement("div");
            let inLevel = "", outLevel = "";
            if (item.waterList && item.waterList.length) {
                for (var i = 0; i < item.waterList.length; i++) {
                    var wl = item.waterList[i];
                    if (wl.waterPositonType === 2401) {
                        inLevel = wl.waterLevel;
                    }else{
                        outLevel = wl.waterLevel;
                    }
                }
            }
            let div1 = `<div>${item.name}</div><div>${"内河水位:"+inLevel+",外河水位:"+outLevel}</div>`;
            div.innerHTML = div1;
            this.map.addOverlay(item.id, {Coordinate:[item.lon ? item.lon : 0, item.lat ? item.lat : 0], className:"ps-ol-con-text", offset:[-20,20]},div);
            return {...item, type:"Point",lonlat:[item.lon ? item.lon : 0, item.lat ? item.lat : 0],itemType:1}
        })
        this.map.addFeatures("conservancy", newData)
       
    }
    addPersonListData(data) {
        if (!Array.isArray(data)) return;
        let newData = data.map((item) => {
            return {...item, type:"Point",lonlat:[item.lon, item.lat],itemType:2}
        })
        this.map.addFeatures("person", newData)
    }
    async featureClick(model) {
        this.setFoucsLonlat([model.lon, model.lat]);
        // 走接口
        this.setState({
            showOverlay: true,
            loadingOverlay: true,
            currentOverlayEntity:model
        });
        if (ConOverlay.canHandle(model)) {
            //postFacWaterDyn,postFacEleDyn,postFacGateDyn, postFacPumpDyn, postFacVideoDyn,postFacNetworkDyn
            let waterPromise = postFacWaterDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("水位仪接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            let elePromise = postFacEleDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("电量接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            let gatePromise = postFacGateDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("闸位接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            let pumpPromise = postFacPumpDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("泵接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            let videoPromise = postFacVideoDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("视频接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            let networkPromise = postFacNetworkDyn({facilityInfoId: model.id}).then((res) =>{ return res.ok ? res.json() : Promise.reject("网络接口出错");}).then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
            // let jurisdictionTypePromise = getDict(["jurisdiction_type"]);
            let data = await Promise.all([waterPromise, elePromise, gatePromise, pumpPromise, videoPromise, networkPromise]).then((data) => {
                return data;0
            }).catch(ex => { return ex;});
            if (Array.isArray(data) && data.length) {
                model.waterDyn = data[0];
                model.eleDyn = data[1];
                model.gateDyn = data[2];
                model.pumpDyn = data[3];
                model.videoDyn = data[4];
                model.networkDyn = data[5];
                this.setState({
                    showOverlay: true,
                    loadingOverlay: false,
                    currentOverlayEntity:model
                });
            }else{
                this.setState({
                    showOverlay: false,
                    loadingOverlay: false
                });
                message.error(data || "服务器异常!", 5);
            }
            
        }
        // this.setState({
        //     showOverlay: true,
        //     currentOverlayEntity: model
        // })
    }
    
    overlayClose() {
        this.setState({
            showOverlay: false
        })
    }
    getItemClickFuncs() {
        let conFunc = (key, entity) => {
            this.map.setCenter([entity.lon, entity.lat]);
            // this.setFoucsLonlat([entity.lon, entity.lat]);
            this.map.setZoom(this.map.getZoom() > 12 ? this.map.getZoom(): 13)
            this.featureClick(entity);
            // this.setState({
            //     showOverlay: true,
            //     currentOverlayEntity: entity
            // });
        }
        let personFunc = (key, entity) => {
            this.map.setCenter([entity.lon, entity.lat]);
            this.setState({
                showOverlay: true,
                currentOverlayEntity: entity
            });
        }
        return [conFunc, personFunc];
        
    }
    setFoucsLonlat(lonlat) {
        this.map.updateFeature("focus",{
            type: "Point",
            id:1,
            lonlat: lonlat
        })
    }
    getFocusCanvas() {
        var canvas = document.createElement("canvas");
        canvas.width = 40;
        canvas.height = 40;
        var context = canvas.getContext("2d");
        context.strokeStyle = "#ff0000";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(10, 0);
        context.moveTo(30, 0);
        context.lineTo(40, 0);
        context.lineTo(40, 10);
        context.moveTo(40, 30);
        context.lineTo(40, 40);
        context.lineTo(30, 40);
        context.moveTo(10, 40);
        context.lineTo(0, 40);
        context.lineTo(0, 30);
        context.moveTo(0, 10);
        context.lineTo(0, 0);

    //     context.moveTo(0, 0);
    // context.lineTo(40, 10);
    // context.lineTo(0, 20);
    // context.lineTo(10, 10);
    // context.lineTo(0, 0);
        context.stroke();
        return canvas;
        // this.canvas = canvas;
    }
}
export default Monitor;