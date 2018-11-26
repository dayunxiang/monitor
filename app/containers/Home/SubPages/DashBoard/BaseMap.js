import React from 'react';
import Map from "../Monitor/map/ubimap.js";  //引入地图
import { Button, message } from "../../../../components/Antd.js";
import MapTools from "../../../../components/MapTools/MapTools.js";
import BaseSubPage from '../BaseSubPage.js'
import "./style.css";
// import ConOverlay from "../../SubPages/DashBoard/ConOverlay.js";
import MonOverlay from "./MonOverlay.js";
import Overlay from "../Monitor/Overlay.js";
// import Overlay from "../../SubPages/DashBoard/Overlay.js";
import {postConservancyDyn,irrigation } from '../../../../data/dataStore.js';
// import Search from "../../../../components/Search/Search.js";
// import ConversancySearch from "../../../../components/Search/ConversancySearch.js";
class BaseMap extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            showOverlay: false,
            currentConservancy: null,
            listData:null
        };
        this.map1 = null;


    }

    render() {
        // let conOverlay = <ConOverlay  entity={null} left={400} top={30} width={400}></ConOverlay>;
        return (
            <div className="vk-subpage ps-monitor">
                <div ref={(node) => {this.div = node; }} id="map1" style={{height: "100%"}}>
                </div>
                {/* <div style={{width:250,top:20,left:40,position:"absolute"}}>详情</div> */}
                {/* <div className="ps-tools">
                    <MapTools getMap={() => { return this.map; }} callback={this.mapHandler()}></MapTools>
                </div> */}
                {/* {
                    <Search style={{width:250,top:20,left:40,position:"absolute"}} itemClick={this.getItemClickFuncs()} items={[ConversancySearch]} data={this.state.listData} keyString="id"></Search>
                } */}

                <Overlay onClose={this.overlayClose.bind(this)} overlays={[MonOverlay]} show={this.state.showOverlay} entity={this.state.currentConservancy} left={1} top={130} width={400} ></Overlay>
            </div>
            
        );
    }
    componentDidCatch(a, b) {
        console.log(a, b);
    // this.props.homeActions.reset();
    }
    componentDidMount() {
        super.componentDidMount() ;
        this.loadData1();
        try {
            this.createMap();
            this.test();
        }catch(e) {

        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.layout !== this.props.layout) {
            return window.setTimeout(() => {
                this.map1 && this.map1.updateSize();
            }, 600);
        }
        if (prevProps.isActive == false && this.props.isActive) {
            this.map1 && this.map1.updateSize();
        }
        if (prevProps.selectData !== this.props.selectData) {
            this.setState({
                showOverlay: true,
                currentConservancy: this.props.selectData
            });
            let lon = this.props.selectData && this.props.selectData.lon ? this.props.selectData.lon : 0;
            let lat = this.props.selectData && this.props.selectData.lat ? this.props.selectData.lat : 0;
            this.map && this.map.setCenter([lon, lat]);
        }
        
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    btnClick(e) {   
        // this.map.startSearch("Polygon", function(){
        //     console.log(arguments)
        // });
        this.map1.startEditablePolygonInLayerFeature("region","Polygon002");
        // this.map.startEditablePolygon();
    }
    test() {
        this.map1.addFeatures("ship", [
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
    createMap() {
        this.map = new Map({
            target: 'map1',
            center: [121.002395, 31.048462],
            zoom: 10
        });
        this.map.addTile({
            url: "http://180.166.40.10:8078/MapService?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=default&STYLE=default&TILEMATRIXSET=advsearoad&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png",
            visible: true,
            key: "gaode"
        });
        this.map.addGis({
            url: 'http://221.181.88.134:8079/map/river/201801/',
            zIndex: 10,
            key: "satellite"
        });
        this.map.addVector({
            key: "conservancy",
            zIndex: 20,
            style: {
                heading: function(featureObj) {
                    return featureObj.heading;
                },
                src: function(featureObj) {
                    return featureObj.isWaterMonitor ? require("../../../../statics/img/marker-blue.png"): require("../../../../statics/img/marker.png");
                },
                // offset:[11,-11],
                // offsetOrigin:"bottom-right",
                anchor:[0.5, 1],
                strokeColor: "#aaee77",
                width: 2,
                fillColor: "rgba(114,151,59,0.4)",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.name + "";
                },
                font: '14px sans-serif',
                opacity: function(featureObj) {
                    return featureObj.isWaterMonitor;
                }
            }
        });
        this.map.startHighlightFeatureonLayer("conservancy");
        this.map.startSelectFeature("conservancy", this.conservancyFeatureClick.bind(this));
        // this.map.startCluster("ship");
        this.map1.addVector({
            key: "region",
            zIndex: 22,
            style: {
                
                strokeColor: "#aaee77",
                width: 2,
                fillColor: "rgba(114,151,59,0.4)",
                fontColor: "red",
                fontText: function(featureObj) {
                    return featureObj.id + "";
                },
                font: '10px sans-serif'
            }
        });
    }
    mapHandler() {
        return {
            rectSearch: (param) => {
                console.log(param, this.state);
            }
        };
    }

    async loadData1() {
        // message.success('正在加载...',10);
        let conPromise = irrigation({}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
            if (data.code === 200) {
                console.log(data.data,'data.data')

                return data.data;
               
            }
            return Promise.reject(data.msg);
        });;
        // let jurisdictionTypePromise = getDict(["jurisdiction_type"]);
        let data = await Promise.all([conPromise]).then((data) => {
            return data;
        }).catch(ex => { return ex;})
        message.destroy();
        if (Array.isArray(data) && data.length ) {
            let listData = data[0];
            this.setState({
                listData: listData
            })
            this.addConservancyListData(listData);
        }else{
            this.setState({
                loading: false
            })
            message.error( data ||  "服务器异常!",5);
        }

    }
    // 拼写
    addConservancyListData(data) {
        if (!Array.isArray(data)) return;
        let newData = data.map((item) => {
            return {...item, id: item.facilityId, name:item.facilityName, type: "Point", lonlat: [item.lon, item.lat], itemType: 3}
        })
        this.map.addFeatures("conservancy", newData)
    }
    conservancyFeatureClick(model) {
        this.setState({
            showOverlay: true,
            currentConservancy: model
        })
    }
    overlayClose() {
        this.setState({
            showOverlay: false
        })
    }
    getItemClickFuncs() {
        let conFunc = (key, entity) => {
            this.map.setCenter([entity.lon, entity.lat]);
            this.setState({
                showOverlay: true,
                currentConservancy: entity
            });
        }
        return [conFunc];
        
    }
}
export default BaseMap;