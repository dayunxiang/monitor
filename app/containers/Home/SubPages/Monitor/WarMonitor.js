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
postChartSub, postChartSummary, postChartGrid, postConservancyDynBasic, postWaterLevelWar,postShipWar } from '../../../../data/dataStore.js';
import Search from "../../../../components/Search/Search.js";
import ConversancySearch from "../../../../components/Search/ConversancySearch.js";
import PersonSearch from "../../../../components/Search/PersonSearch.js";
import SubSystemBoard from "./ChartComp/SubSystemBoard.js";
import SummaryChart from "./ChartComp/SummaryChart.js";
import GridChart from "./ChartComp/GridChart.js";

class Monitor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showOverlay: false,
            loadingOverlay: false,
            currentOverlayEntity: null,
            listData: [],
            pearsonData: [],
            map: null,
            subData:null,
            summaryData: null,
            gridData: null,
            scrollData: "这是一个滚动"
        };
        this.map = null;


    }

    render() {
        let SummaryCharts = this.state.summaryData && this.state.summaryData.map((item) => {
            return <SummaryChart layout={this.props.layout} isActive={this.props.isActive} key={item.id} data={item}></SummaryChart>;
        });
        let GridCharts = this.state.gridData && this.state.gridData.map((item) => {
            return <Col xs={8} key={item.id}><GridChart key={item.id} data={item} scrollHeightOnce={31}></GridChart></Col>;
        });
        return (
            <div className="ps-war-monitor">
                
                <div ref={(node) => {this.div = node; }} id="map" style={{height: "100%"}}>
                </div>
                {
                    // <div className="ps-m-srcoll-text"><marquee direction="left">{this.state.scrollData}</marquee></div>
                }
                {
                    // <div className="ps-tools">
                    //     <MapTools ref={(node) =>{this.mapTools = node;}} map={this.state.map} callback={this.mapHandler()}></MapTools>
                    // </div>
                }
                
                {
                    // <Search style={{width:250,top:20,left:280,position:"absolute"}} itemClick={this.getItemClickFuncs()} items={[ConversancySearch, PersonSearch]} data={[].concat(this.state.listData, this.state.pearsonData)} ></Search>
                }
                <Overlay onClose={this.overlayClose.bind(this)} overlays={[ConOverlay, PersonOverlay]} show={this.state.showOverlay} loading={this.state.loadingOverlay} entity={this.state.currentOverlayEntity} right={1} top={130} width={400} ></Overlay>
                <div className="ps-m-left">
                    <div className="ps-m-header">青浦区水利设施监控系统</div>
                    {this.state.subData ? <SubSystemBoard data={this.state.subData}></SubSystemBoard> : null}
                    <div className="ps-m-sum-cont">
                        {SummaryCharts}
                    </div>
                </div>
                <div className="ps-m-bottom">
                    <Row>{GridCharts}</Row>
                </div>
                
            </div>
            
        );
    }
    componentWillReceiveProps() {

    }
    componentDidCatch(a, b) {
        console.log(a, b);
    // this.props.homeActions.reset();
    }
    componentDidMount() {
        // super.componentDidMount() ;
        this.loadData();
        this.loadShipData();
        try {
            this.createMap();
        }catch(e) {

        }
        window.setTimeout(() => {
            this.setState({
                scrollData: "受强降水云团影响，预计未来2-3小时内全市大部地区累积降水量将达50毫米以上。上海中心气象台已于5月25日20时19分更新暴雨黄色预警信号为暴雨橙色预警信号，市防汛指挥部决定于20时25分将全市防汛防台响应行动等级提升为Ⅲ级。"
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
        // super.componentWillUnmount();
        window.clearInterval(this.alarmTimer);
        this.setState = () => {return;};
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
                src: function(featureObj) {
                    return require("../../../../statics/icon/transparent.png");
                },
                // offset:[11,-11],
                // offsetOrigin:"bottom-right",
                // anchor: [0.5, 1],
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
            key: "ship",
            zIndex: 20,
            style: {
                src: function(featureObj) {
                    return require("../../../../statics/img/shipRed.png");
                },
                heading: function(featureObj) {
                    return featureObj.heading;
                },
                anchor:[0.5, 0.5],
                strokeColor: "#aaee77",
                width: 2,
                fillColor: "rgba(114,151,59,0.4)",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.name + "";
                },
                font: '14px sans-serif'
            }
        });
        this.map.startHighlightFeatureonLayer("conservancy");
        this.map.startHighlightFeatureonLayer("person");
        this.map.startHighlightFeatureonLayer("ship");
        this.map.startSelectFeature("conservancy", this.featureClick.bind(this));
        this.map.startSelectFeature("person", this.featureClick.bind(this));

        let _this = this, zoom = this.map.getView().getZoom();
        this.map.onView("change:resolution", function(a) {
            let zoom = this.getZoom()
            // _this.mapTools.setViewZoomChange(zoom);
            if (zoom <= 12) {
                _this.map.setVisible("conservancy", true);
                _this.map.startCluster("conservancy", true);
            }else{
                _this.map.setVisible("conservancy", true);
                _this.map.stopCluster("conservancy");
            }
            if (zoom >= 16) {
                _this.map.setVisible("ship", true);
            }else{
                _this.map.setVisible("ship", false);
            }

        });
        // this.mapTools.setViewZoomChange(zoom);
        if ( zoom <= 12) {
            this.map.startCluster("conservancy", true);
        }else{
            this.map.stopCluster("conservancy");
        }
        if (zoom >= 16) {
            this.map.setVisible("ship", true);
        }else{
            this.map.setVisible("ship", false);
        }
        // 动态展示
        this.map.addOverlay("qp", {Coordinate:[121.072395,31.148462]}, this.getOverlayDiv("最新问题上报"));
        this.alarmTimer = window.setInterval(() => {
            this.map.removeOverlayClass("qp", "animate-active");
            window.setTimeout(() => {
                this.map.addOverlayClass("qp", "animate-active");
            }, 20);
            
        }, 6000);
        this.setState({
            map: this.map
        });
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
        let conPromise = postConservancyDynBasic({}).then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
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
        let chartSubPromise = postChartSub().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let chartSummaryPromise = postChartSummary().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let chartGridPromise = postChartGrid().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let wlPromise = postWaterLevelWar().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let shipPromise = postShipWar().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        // let jurisdictionTypePromise = getDict(["jurisdiction_type"]);
        let data = await Promise.all([chartSubPromise, chartSummaryPromise, chartGridPromise, conPromise, personPromise, wlPromise, shipPromise]).then((data) => {
            return data;
        }).catch((ex) => {return ex instanceof Object ? ex.toString() : ex;});
        if (Array.isArray(data) && data.length) {
            let listData = data[3];
            let personData = data[4];
            this.setState({
                listData: listData,
                pearsonData: personData,
                subData: data[0],
                summaryData: data[1],
                gridData: data[2]
            });
            this.addConservancyListData(listData);
            this.addPersonListData(personData);
            this.addWaterLevelPoint(data[5]);
            this.addShipListData(data[6]);
        } else {
            this.setState({
                loading: false
            });
            message.error(data || "服务器异常!", 5);
        }

    }
    async loadShipData() {
        let shipPromise = postShipWar().then((res) => {return res.ok ? res.json() : Promise.reject("接口出错");})
            .then((data) => {
                if (data.code === 200) {
                    return data.data;
                }
                return Promise.reject(data.msg);
            });
        let data = await Promise.all([ shipPromise]).then((data) => {
            return data;
        }).catch((ex) => {return ex instanceof Object ? ex.toString() : ex;});
        if (Array.isArray(data) && data.length) {
            this.addShipListData(data[0]);
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
            return {...item, type: "Point", lonlat:[item.lon ? item.lon : 0, item.lat ? item.lat : 0], itemType:1}
        })
        this.map.addFeatures("conservancy", newData);
    }
    addPersonListData(data) {
        if (!Array.isArray(data)) return;
        let newData = data.map((item) => {
            return {...item, type:"Point",lonlat:[item.lon, item.lat], itemType:2}
        })
        this.map.addFeatures("person", newData)
    }
    addShipListData(data) {
        if (!Array.isArray(data)) return;
        let newData = data.map((item) => {
            return {...item, id: item.shipId, type:"Point",lonlat:[item.lon, item.lat], itemType:3}
        })
        this.map.addFeatures("ship", newData)
    }
    addWaterLevelPoint(data) {
        if (data && data.length) {
            data.forEach((item) => {
                let div = document.createElement("div");
                div.innerHTML = "<div>"+item.name+" "+item.waterLevel+"</div>";
                this.map.addOverlay(item.monitoringPointId, {Coordinate:[item.lon ? item.lon : 0, item.lat ? item.lat : 0], className:"ps-ol-wl-text", offset:[-20,20]},div);
            })
        }
            
    }
    async featureClick(model) {
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
}
export default Monitor;