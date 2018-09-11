import React from 'react';
import Wrap from "./Wrap.js";
import Map from "./map/ubimap.js";
import { Button } from "../../../components/Antd.js"

class Monitor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
        this.map = null;

    }

    render() {
        return (
            <div className="ps-monitor">
                <div ref={(node) => {this.div = node; }} id="map" style={{height:"100%"}}>
                </div>
                <div className="ps-tools">
                    <Button type="primary" onClick={this.btnClick.bind(this)}>测试</Button>
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

        console.log(this.div);
        try {
            this.createMap();
            this.test();
        }catch(e) {

        }
        
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
        this.map.addFeatures("region", [
            {
                type: "Polygon",
                id: "Polygon002",
                lonlats:[[122.2321, 31.232 ], [121.2321, 31.232 ], [121.2321, 32.232 ],[122.2321, 31.232 ]],
            }
        ]);
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
            target: 'map',
            center: [121.072395, 31.148462],
            zoom: 10
        });
        this.map.addTile({
            url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
            visible: true,
            key: "gaode"
        });
        this.map.addGis({
            url: 'http://221.181.88.134:8079/map/river/201801/',
            zIndex: 10,
            key: "satellite"
        });
        this.map.addVector({
            key: "ship",
            zIndex: 20,
            style: {
                heading: function(featureObj) {
                    return featureObj.heading;
                },
                src: function(featureObj) {
                    return require("../../../statics/img/shipRed.png");
                },
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
        this.map.startHighlightFeatureonLayer("ship");
        this.map.startCluster("ship");
        this.map.addVector({
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
}
export default Wrap(Monitor);