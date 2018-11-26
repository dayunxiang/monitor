import Map from "../map/ubimap.js";
export function mapParser(json, events) {
    let defaultEvents = {
        onViewChange: null,
        featureClick: null
    };
    events = Object.assign({}, defaultEvents, events);
    let map = new Map({
        target: 'map',
        center: [121.072395, 31.148462],
        zoom: 10
    });
    map.addTile({
        url: "http://180.166.40.10:8078/MapService?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=default&STYLE=default&TILEMATRIXSET=advsearoad&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png",
        visible: true,
        opacity:0.5,
        key: "gaode"
    });
    map.addGis({
        url: 'http://221.181.88.134:8079/map/river/201801/',
        zIndex: 10,
        key: "river"
    });
    map.addGis({
        url: 'http://221.181.88.134:8079/map/satellite/201801/',
        zIndex: 11,
        key: "satellite",
        visible: false
    });
    map.addGis({
        url: 'http://221.181.88.134:8079/map/plane/201801/',
        zIndex: 11,
        key: "plane",
        visible: false
    });
    map.addVector({
        key: "conservancy",
        zIndex: 20,
        style: {
            heading: function(featureObj) {
                return featureObj.heading;
            },
            src: function(featureObj) {
                return featureObj.isWaterMonitor ? require("../../../../../statics/img/marker-blue.png"): require("../../../../../statics/img/marker.png");
            },
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
    map.addVector({
        key: "person",
        zIndex: 20,
        style: {
            src: function(featureObj) {
                return require("../../../../../statics/img/person.png");
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
    map.startHighlightFeatureonLayer("conservancy");
    map.startHighlightFeatureonLayer("person");
    map.startSelectFeature("conservancy", events.featureClick && events.featureClick.bind(this, "conservancy"));
    map.startSelectFeature("person", events.featureClick && events.featureClick.bind(this, "person"));

    let _this = this, zoom = map.getView().getZoom();
    map.onView("change:resolution", function(a) {
        let zoom = this.getZoom()
        // _mapTools.setViewZoomChange(zoom);
        if (zoom <= 12) {
            map.startCluster("conservancy", true);
        }else{
            map.stopCluster("conservancy");
        }
        events.onViewChange && events.onViewChange(zoom);
    });
    // mapTools.setViewZoomChange(zoom);
    if ( zoom <= 12) {
        map.startCluster("conservancy", true);
    }else{
        map.stopCluster("conservancy");
    }
    return map;
}