import "ol/ol.css";
import {fromLonLat, get, transform} from 'ol/proj.js';
import Olmap from 'ol/Map.js';
import View from 'ol/View.js';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import CircleStyle from 'ol/style/Circle';
import ImageStyle from 'ol/style/Image';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import Cluster from 'ol/source/Cluster';
import Draw from 'ol/interaction/Draw';
import {createBox} from 'ol/interaction/Draw';
import Collection from 'ol/Collection';
import Modify from 'ol/interaction/Modify';
import { shiftKeyOnly, singleClick } from 'ol/events/condition';
import { unByKey } from 'ol/Observable';

export default (function(window) {
    var projection = get("EPSG:3857");
    var sprojection = get('EPSG:4326');
    var Map = function(opt) {
        //地图divID
        /*传入参数的样子
        	{
        		target:"ubiMap",
        		center:[121,29],
        		zoom:1
        	}
         */
        this.target = opt.target ? opt.target : "ubiMap";
        this.map = null;
        this.layers = {};
        this.layerStyle = {};
        this.overlay = {};
        this.controls = {};
        this.hlLayers = []; // 启用高亮
        this.sfLayers = [] ; // 启用的点击交互图层
        this.clusterLayer = {};
        this._init.call(this, opt);

    };

    //初始化map
    Map.prototype._init = function(opt) {
        this.map = new Olmap({
            view: new View({
                center: transform(opt.center, get('EPSG:4326'), get('EPSG:3857')),
                zoom: opt.zoom
            }),
            target: this.target
        });
    };
    //转换坐标
    Map.prototype._transformLonlat = function(lonlat, reverse) {
        if (!lonlat) return;
        if (reverse) {
            return transform(lonlat, get('EPSG:3857'), get('EPSG:4326'));
        } else {
            return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
        }

    };
    //根据key 删除layer
    Map.prototype._removeLayer = function(key) {
        if (!this.layers[key]) return;
        this.map.removeLayer(this.layers[key]);
        delete this.layers[key];

    };
    //生成点的样式
    Map.prototype._createPointStyle = function(style, obj) {
        if (!style) return;
        var heading = null,
            src = null;
        if (typeof style.heading === 'function') {
            heading = style.heading(obj);
        } else {
            heading = style.heading;
        }
        if (typeof style.src === 'function') {
            src = style.src(obj);
        } else {
            src = style.src;
        }
        return new Style({
            image: new Icon({
                rotation: heading,
                src: src
            })
        });
    };
    //构建点的features
    Map.prototype._createPointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoPoint = new Point(obj.lonlat);
            geoPoint.transform(sprojection, projection);
            var feature = new Feature({
                geometry: geoPoint
            });

            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createPointStyle(nowStyle, obj);
                feature.setStyle(style);
            }

            feature.setId(obj.id);
            feature.set('attr', obj);
            return feature;
        }.bind(this));
    };

    //添加点的feature
    Map.prototype._addPointFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createPointFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().addFeature(features[0]);
        }
    };
    //添加点的features
    Map.prototype._addPointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createPointFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().addFeatures(features);
        }
    };
    //修改点的feature
    Map.prototype._updatePointFeature = function(key, obj) {
        if (!this.layers[key] || obj == null || !obj.id) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlat) {
            feature.getGeometry().setCoordinates(transform(obj.lonlat, get('EPSG:4326'), get('EPSG:3857')));
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createPointStyle(nowStyle, obj);
            feature.setStyle(style);
        }
    };
    //批量修改点的features
    Map.prototype._updatePointFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updatePointFeature(key, obj);
        }.bind(this));
    };
    //生成线的样式
    Map.prototype._createLineStyle = function(style, obj) {
        var text = null;
        if (typeof style.fontText === 'function') {
            text = style.fontText(obj);
        } else {
            text = style.fontText;
        }
        return new Style({
            stroke: new Stroke({
                color: style.strokeColor ? style.strokeColor : "#aaee77",
                width: style.width ? style.width : 2,
            }),
            //默认填充样式
            fill: new Fill({
                color: style.fillColor ? style.fillColor : "rgba(114,151,59,0.4)",
            }),
            //默认文字样式
            text: new Text({
                font: style.font ? style.font : '10px sans-serif',
                text: text,
                fill: new Fill({
                    color: style.fontColor ? style.fontColor : "#000000"
                })
            })
        });
    };
    //构建线的features
    Map.prototype._createLineFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoLine = new LineString(obj.lonlats);
            geoLine.transform(sprojection, projection);
            var feature = new Feature({
                geometry: geoLine
            });
            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createLineStyle(nowStyle, obj);
                feature.setStyle(style);
            }
            feature.set('attr', obj);
            feature.setId(obj.id);
            return feature;
        }.bind(this));
    };
    //添加线的feature
    Map.prototype._addLineStringFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createLineFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
    };
    //添加线的features
    Map.prototype._addLineStringFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createLineFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
    };
    //修改线的feature
    Map.prototype._updateLineStringFeature = function(key, obj) {
        if (!this.layers[key] || obj == null || !obj.id) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlats && obj.lonlats.length) {
            feature.getGeometry().setCoordinates(obj.lonlats.map(function(lonlat) {
                return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
            }));
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createLineStyle(nowStyle, obj);
            feature.setStyle(style);
        }
    };
    //批量修改线的features
    Map.prototype._updateLineStringFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updateLineStringFeature(key, obj);
        }.bind(this));
    };
    //生成面的样式
    Map.prototype._createPolygonStyle = function(style, obj) {
        var text = null;
        if (typeof style.fontText === 'function') {
            text = style.fontText(obj);
        } else {
            text = style.fontText;
        }
        return new Style({
            stroke: new Stroke({
                color: style.strokeColor ? style.strokeColor : "#aaee77",
                width: style.width ? style.width : 2,
            }),
            //默认填充样式
            fill: new Fill({
                color: style.fillColor ? style.fillColor : "rgba(114,151,59,0.4)",
            }),
            //默认文字样式
            text: new Text({
                font: style.font ? style.font : '10px sans-serif',
                text: text,
                fill: new Fill({
                    color: style.fontColor ? style.fontColor : "#000000"
                })
            })
        });
    };
    //构建面的features
    Map.prototype._createPolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        return array.map(function(obj) {
            var geoPolygon = new Polygon([obj.lonlats], 'XY');
            geoPolygon.transform(sprojection, projection);
            var polygonFeature = new Feature({
                geometry: geoPolygon
            });
            var nowStyle = obj.style || this.layerStyle[key];
            if (nowStyle) {
                var style = this._createPolygonStyle(nowStyle, obj);
                polygonFeature.setStyle(style);
            }

            polygonFeature.setId(obj.id);
            polygonFeature.set("attr", obj);
            return polygonFeature;
        }.bind(this));
    };
    //添加面的feature
    Map.prototype._addPolygonFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var features = this._createPolygonFeatures(key, [obj]);
        this.layers[key].getSource().addFeature(features[0]);
    };
    //添加面的feature
    Map.prototype._addPolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        var features = this._createPolygonFeatures(key, array);
        this.layers[key].getSource().addFeatures(features);
    };
    //修改面的feature
    Map.prototype._updatePolygonFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var feature = this.layers[key].getSource().getFeatureById(obj.id);
        if (!feature) return;

        feature.set('attr', obj);
        if (obj.lonlats && obj.lonlats.length) {
            feature.getGeometry().setCoordinates([obj.lonlats.map(function(lonlat) {
                return transform(lonlat, get('EPSG:4326'), get('EPSG:3857'));
            })]);
        }
        var nowStyle = obj.style || this.layerStyle[key];
        if (nowStyle) {
            var style = this._createPolygonStyle(nowStyle, obj);
            feature.setStyle(style);
        }
    };
    //批量修改面的features
    Map.prototype._updatePolygonFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length === 0) return;
        array.forEach(function(obj) {
            this._updatePolygonFeature(key, obj);
        }.bind(this));
    };
    /****Map暴露API*/
    //添加瓦片图层
    Map.prototype.addTile = function(param, urlFunc) {
        if (!param || !param.key) return;

        var oneurl = urlFunc ? urlFunc() : param.url;
        var tilelayer = new TileLayer({
            visible: param.visible == null ? true : param.visible,
            source: new XYZ({
                url: oneurl
            })
        });
        tilelayer.set("id", param.key);
        tilelayer.set("type", "tile");
        this.map.addLayer(tilelayer);
        this.layers[param.key] = tilelayer;

    };
    //删除瓦片图层
    Map.prototype.removeTile = function(key) {
        this._removeLayer(key);
    };
    //添加高分影像图层
    Map.prototype.addGis = function(param, urlFunc) {
        if (!param || !param.key) return;
        var oneurl = param.url;
        var tilelayer = new TileLayer({
            visible: param.visible == null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,
            source: (function(url) {
                var convert16 = function(length, value) {
                    var v = Math.abs(value);
                    var s = v.toString(16);
                    var len = length - s.length;
                    var tmp = "";
                    for (var i = 0; i < len; i++) {
                        tmp += "0";
                    }
                    return tmp + s;
                };
                return new XYZ({
                    projection: projection,
                    tileUrlFunction: function(xyz, a, b) {
                        if (urlFunc) return urlFunc(xyz);
                        var x = 'C' + convert16(8, xyz[1]);
                        var y = 'R' + convert16(8, xyz[2] + 1);
                        var z = 'L' + (xyz[0] < 10 ? '0' + xyz[0] : xyz[0]);
                        return url + z + '/' + y + '/' + x + '.' + 'png';
                    }
                });
            })(oneurl)
        });
        this.map.addLayer(tilelayer);
        this.layers[param.key] = tilelayer;

    };
    //删除高分影像图层
    Map.prototype.removeGis = function(key) {
        this._removeLayer(key);
    };
    //添加矢量图
    Map.prototype.addVector = function(param) {
        if (!param || !param.key) return;
        var vectorLayer = new VectorLayer({
            source: new VectorSource(),
            visible: param.visible == null ? true : param.visible,
            zIndex: param.zIndex ? param.zIndex : 0,

        });
        this.map.addLayer(vectorLayer);
        this.layers[param.key] = vectorLayer;
        if (param.style) {
            this.layerStyle[param.key] = param.style;
        }
    };
    //删除矢量图层
    Map.prototype.removeVector = function(key) {
        this._removeLayer(key);
    };
    //添加目标
    Map.prototype.addFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;

        switch (obj.type) {
        case "Point":
            this._addPointFeature(key, obj);
            break;
        case "LineString":
            this._addLineStringFeature(key, obj);
            break;
        case "Polygon":
            this._addPolygonFeature(key, obj);
            break;
        default:
            break;
        }

    };
    //添加多目标
    Map.prototype.addFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        var types = {};
        for (var i = 0; i < array.length; i++) {
            var data = array[i];
            if (!data.type || !data.id) continue; //没有类型就不要
            if (types[data.type]) {
                types[data.type].push(data);
            } else {
                types[data.type] = [data];
            }
        }
        for (var typeKey in types) {
            switch (typeKey) {
            case "Point":
                this._addPointFeatures(key, types[typeKey]);
                break;
            case "LineString":
                this._addLineStringFeatures(key, types[typeKey]);
                break;
            case "Polygon":
                this._addPolygonFeatures(key, types[typeKey]);
                break;
            default:
                break;
            }
        }
    };
    //根据key 删除单个feature
    Map.prototype.removeFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        var fId = null;
        if (typeof obj === "object") {
            fId = obj.id;
        } else if (typeof obj === 'string') {
            fId = obj;
        } else {
            return;
        }
        if (fId && typeof fId === "string") {
            var source = this.layers[key].getSource();
            var feature = source.getFeatureById(fId);
            if (feature) {
                source.removeFeature(feature);
                if (this.clusterLayer[key]) {
                    this.clusterLayer[key].getSource().getSource().removeFeature(feature);
                }
            }

        }
    };
    //根据key, 删除多个features
    Map.prototype.removeFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        for (var i = 0; i < array.length; i++) {
            var d = array[i];
            this.removeFeature(key, d);
        }
    };

    //修改feature
    Map.prototype.updateFeature = function(key, obj) {
        if (!this.layers[key] || obj == null) return;
        switch (obj.type) {
        case "Point":
            this._updatePointFeature(key, obj);
            break;
        case "LineString":
            this._updateLineStringFeature(key, obj);
            break;
        case "Polygon":
            this._updatePolygonFeature(key, obj);
            break;
        default:
            break;
        }
    };
    //修改features
    Map.prototype.updateFeatures = function(key, array) {
        if (!this.layers[key] || array == null || array.length == 0) return;
        var types = {};
        for (var i = 0; i < array.length; i++) {
            var data = array[i];
            if (!data.type || !data.id) continue; //没有类型就不要
            if (types[data.type]) {
                types[data.type].push(data);
            } else {
                types[data.type] = [data];
            }
        }
        for (var typeKey in types) {
            switch (typeKey) {
            case "Point":
                this._updatePointFeatures(key, types[typeKey]);
                break;
            case "LineString":
                this._updateLineStringFeatures(key, types[typeKey]);
                break;
            case "Polygon":
                this._updatePolygonFeatures(key, types[typeKey]);
                break;
            default:
                break;
            }
        }
    };
    //清除所有feature
    Map.prototype.clear = function(key) {
        if (!this.layers[key]) return;
        this.layers[key].getSource().clear();
        if (this.clusterLayer[key]) {
            this.clusterLayer[key].getSource().getSource().clear();
        }
    };
    //隐藏和显示feature
    Map.prototype.setVisibleFeatures = function(key, obj, visible) {
        if (!this.layers[key] || obj == null) return;
        if (typeof obj === "string") {
            obj = {
                id: obj
            };
        }
        var source = this.layers[key].getSource();
        var feature = source.getFeatureById(obj.id);
        if (!feature) return;
        if (!visible) {
            feature.setStyle(new ImageStyle({
                opacity: 0
            }));
        } else {
            var type = feature.get("attr").type,
                style = null;
            switch (type) {
            case "Point":
                this._createPointStyle(key, types[typeKey]);
                break;
            case "LineString":
                this._createLineStyle(key, types[typeKey]);
                break;
            case "Polygon":
                this._createPolygonStyle(key, types[typeKey]);
                break;
            default:
                break;
            }
        }

    };
    //开启高亮
    Map.prototype.startHighlightFeatureonLayer = function(key) {
        if (!this.layers[key]) return;
        this.hlLayers.push(this.layers[key]);
        if (this.hlLayers.length > 1) return;
        var _this = this,
            hlFeature = null;
        this._pointermoveEKey = this.map.on('pointermove', function(e) {

            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (hlFeature) {
                    var hlfeatureStyle = hlFeature.getStyle();
                    hlfeatureStyle.setText(null);
                    hlFeature.setStyle(hlfeatureStyle);
                    hlFeature = null;
                }
                if (feature && layer && feature.get("attr") && feature.get("attr").type === "Point" &&
                        this.hlLayers.indexOf(layer) > -1) {

                    var featureStyle = feature.getStyle();
                    var nowStyle = feature.get("attr").style || this.layerStyle[key];
                    var text = new Text({
                        text: typeof nowStyle.fontText === "function" ? nowStyle.fontText(feature.get("attr")) : nowStyle.fontText,
                        offsetX: 20,
                        offsetY: 10,
                        fill: new Fill({
                            color: nowStyle.fontColor
                        })
                    });
                    featureStyle.setText(text);
                    feature.setStyle(featureStyle);
                    hlFeature = feature;
                }
            }.bind(_this));
        });
    };
    //关闭高亮
    Map.prototype.stopHighlightFeatureonLayer = function(key) {
        if (!this.layers[key]) return;
        var index = this.hlLayers.indexOf(this.layers[key]);
        if (index > -1) {
            this.hlLayers.splice(index, 1);
        }
        if (!this.hlLayers.length) {
            unByKey(this._pointermoveEKey);
            this._pointermoveEKey = null;
        }
    };
    //开启点击features
    Map.prototype.startSelectFeature = function(key, eleTempFunc, eleTempEvent) {
        if (!this.layers[key]) return;
        this.sfLayers.push({
            layer: this.layers[key],
            eleTempFunc: eleTempFunc,
            eleTempEvent: eleTempEvent
        });
        if (this.sfLayers.length > 1) return;
        var overlay = new Overlay({
            id: "pop",
            offset: [0, -20],
            stopEvent: true,
            // autoPan:true,
            positioning: 'bottom-center'
        });
        var hideOverlay = function() {
            if (this.map.getOverlayById('pop')) {
                this.map.removeOverlay(overlay);
            }
        }.bind(this);
        var _this = this;
        this._clickKey = this.map.on("click", function(e) {
            var feature = this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if (feature && layer && feature.get("attr") && feature.get("attr").type === "Point") {
                    for (var i = 0; i < this.sfLayers.length; i++) {
                        var item = this.sfLayers[i];
                        if (item.layer === layer) {
                            hideOverlay();
                            var emptyDiv = document.createElement("div");emptyDiv.innerHTML = "未定义创建模板";
                            var ele = item.eleTempFunc ? item.eleTempFunc(feature.get('attr')) : emptyDiv;
                            overlay.setElement(ele);
                            this.map.addOverlay(overlay);
                            overlay.setPosition(feature.getGeometry().getCoordinates());
                            //绑定事件
                            item.eleTempEvent && item.eleTempEvent.call(overlay, feature.get('attr'), hideOverlay);
                            break;
                        }
                    }
                }
            }.bind(_this));

        });

    };
    //关闭点击features
    Map.prototype.stopSelectFeature = function(key) {
        if (!this.layers[key]) return;

        for (var i = 0; i < this.sfLayers.length; i++) {
            var item = this.sfLayers[i];
            if (item.layer === this.layers[key]) {
                this.sfLayers.splice(i, 1);
                break;
            }
        }
        if (!this.sfLayers.length) {
            unByKey(this._clickKey);
            this._clickKey = null;
        }
    };
    //开启聚合
    Map.prototype.startCluster = function(key) {
        if (!this.layers[key]) return;
        var features = this.layers[key].getSource().getFeatures();
        var clusterSource = new Cluster({
            distance: 30,
            source: new VectorSource(),

        });
        var clusterLayer = new VectorLayer({
        	zIndex: 21,
            source: clusterSource,
            style: function(feature) {
                var style = null;
                if (!style) {
                    var nowStyle = this.layerStyle[key];
                    var text = null;
                    return new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: nowStyle.strokeColor ? nowStyle.strokeColor : "#aaee77",
                            }),
                            fill: new Fill({
                                color: nowStyle.fillColor ? nowStyle.fillColor : "rgba(114,151,59,0.4)",
                            })
                        }),
                        stroke: new Stroke({
                            color: nowStyle.strokeColor ? nowStyle.strokeColor : "#aaee77",
                            width: nowStyle.width ? nowStyle.width : 2,
                        }),
                        //默认填充样式
                        fill: new Fill({
                            color: nowStyle.fillColor ? nowStyle.fillColor : "rgba(114,151,59,0.4)",
                        }),
                        //默认文字样式
                        text: new Text({
                            font: nowStyle.font ? nowStyle.font : '10px sans-serif',
                            text: feature.get('features').length + "",
                            fill: new Fill({
                                color: nowStyle.fontColor ? nowStyle.fontColor : "#000000"
                            })
                        })
                    });
                }
                return style;
            }.bind(this)
        });

        this.map.addLayer(clusterLayer);
        this.clusterLayer[key] = clusterLayer;
        clusterLayer.getSource().getSource().addFeatures(features);
        this.layers[key].setVisible(false);

    };
    //停止聚合
    Map.prototype.stopCluster = function(key) {
        if (!this.layers[key]) return;
        if (!this.clusterLayer[key]) return;
        this.map.removeLayer(this.clusterLayer[key]);
        delete this.clusterLayer[key];
        this.layers[key].setVisible(true);
    };
    //切换图层
    Map.prototype.activeTileLayer = function(key) {
        if (!this.layers[key]) return;
        for (var lkey in this.layers) {
            if (this.layers[lkey] && this.layers[lkey].get("type") === "tile") {
                this.layers[lkey].setVisible(key === lkey);
            }
        }
    };
    //启动测量功能
    Map.prototype.activeMeasure = function(measureType) {
        this.stopMeasure();



        var source = new VectorSource();

        var vector = new VectorLayer({
            source: source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this._measureLayer = vector;
        this.map.addLayer(vector);


        /**
         * Currently drawn feature.
         * @type {ol.Feature}
         */
        var sketch;


        /**
         * The help tooltip element.
         * @type {Element}
         */
        var helpTooltipElement;


        /**
         * Overlay to show the help messages.
         * @type {ol.Overlay}
         */
        var helpTooltip;


        /**
         * The measure tooltip element.
         * @type {Element}
         */
        var measureTooltipElement;


        /**
         * Overlay to show the measurement.
         * @type {ol.Overlay}
         */
        var measureTooltip;


        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = "点击继续测量面积";


        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = '点击继续测量距离';


        /**
         * Handle pointer move.
         * @param {ol.MapBrowserEvent} evt The event.
         */
        var pointerMoveHandler = function(evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '点击开始测量';

            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };




        this._measureEKey = this.map.on('pointermove', pointerMoveHandler);

        this.map.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });

        // var typeSelect = document.getElementById('type');
        // var geodesicCheckbox = document.getElementById('geodesic');

        var draw; // global so we can remove it later


        /**
         * Format length output.
         * @param {ol.geom.LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function(line) {
            var length;
            if (false) {
               
            } else {
                length = Math.round(line.getLength() * 100) / 100;
            }
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        }.bind(this);


        /**
         * Format area output.
         * @param {ol.geom.Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function(polygon) {
            var area;
            if (false) {
               
            } else {
                area = polygon.getArea();
            }
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        }.bind(this);

        var addInteraction = function() {
            var type = (measureType == 'Polygon' ? 'Polygon' : 'LineString');
            draw = new Draw({
                source: source,
                type: /** @type {ol.geom.GeometryType} */ (type),
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        stroke: new Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            this.map.addInteraction(draw);

            createMeasureTooltip();
            createHelpTooltip();

            var listener;
            draw.on('drawstart', function(evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function(evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function() {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
            this._draw = draw;
        }.bind(this);


        /**
         * Creates a new help tooltip
         */
        var createHelpTooltip = function() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            this.map.addOverlay(helpTooltip);
        }.bind(this);


        /**
         * Creates a new measure tooltip
         */
        var createMeasureTooltip = function() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            this.map.addOverlay(measureTooltip);
        }.bind(this);
        addInteraction();
    };
    //停止测量功能
    Map.prototype.stopMeasure = function() {
        if (this._draw && this._measureLayer) {
            this.map.removeInteraction(this._draw);
            this.map.removeLayer(this._measureLayer);
            var arr = [].concat(this.map.getOverlays().getArray());
            for (var i = 0; i < arr.length; i++) {
                this.map.removeOverlay(arr[i]);
            }
            unByKey(this._measureEKey);
            this._draw = null;
            this._measureLayer = null;
            this._helpTooltip = null;
            this._measureTooltip = null;
            this._measureEKey = null;
            delete this._draw;
            delete this._measureLayer;
            delete this._helpTooltip;
            delete this._measureTooltip;
            delete this._measureEKey;
        }
    };
    //开启搜索type:Rect||Circle||Polygon
    Map.prototype.startSearch = function(type, callback) {
        this.stopSearch();
        var _this = this;
        var source = new VectorSource({
            wrapX: false
        });

        var vector = new VectorLayer({
            source: source
        });
        this._searchlayer = vector;
        this.map.addLayer(vector);
        var draw = new Draw({
            source: source,
            type: type === 'Rect' ? 'Circle' : type,
            geometryFunction: type === 'Rect' ? createBox() : undefined
        });
        ;
        this._searchDraw = draw;
        draw.on("drawend", function(e) {
            // var extent = type == 'Circle' ? e.feature.getGeometry().getExtent() : e.feature.getGeometry().getCoordinates();
            // var extent = e.feature.getGeometry().getExtent();
            var timer = window.setTimeout(function() {
                _this.stopSearch();
                window.clearTimeout(timer);
            }, 200);
            if (callback) {
                // var features = _this.getShipFeaturesByExtent(extent);
                var param = {};
                if (type == 'Circle') {
                    var c = transform(e.feature.getGeometry().getCenter(), 'EPSG:3857', 'EPSG:4326');
                    param.type = "Circle";
                    param.center = c;
                    param.radius = e.feature.getGeometry().getRadius();
                } else {
                    var mapPoints = e.feature.getGeometry().getCoordinates()[0].map(function(item) {
                        return transform(item, 'EPSG:3857', 'EPSG:4326');
                    });
                    param.type = 'Polygon';
                    param.points = mapPoints;
                }
                callback(param);
            }
        });
        this.map.addInteraction(draw);
    };
    Map.prototype.stopSearch = function() {
        if (this._searchDraw && this._searchlayer) {
            this.map.removeLayer(this._searchlayer);
            this.map.removeInteraction(this._searchDraw);
            delete this._searchlayer;
            delete this._searchDraw;
        }
    };
    Map.prototype.startEditablePolygon = function(callback) {
        this.stopEditablePolygon();
        var features = new Collection();
        var featureOverlay = new VectorLayer({
            source: new VectorSource({
                features: features
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        featureOverlay.setMap(this.map);
        this._searchEdlayer = featureOverlay;
        var modify = new Modify({
            features: features,
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function(event) {
                return shiftKeyOnly(event) && singleClick(event);
            }
        });
        modify.on("modifyend", function(e) {
            var points = e.features.getArray()[0].getGeometry().getCoordinates()[0];
            return callback && callback(points);
        });
        modify.on("modifystart", function(e) {
            console.log(e);
        });
        this._modifyDraw = modify;
        this.map.addInteraction(modify);




        var draw = new Draw({
            features: features,
            type: "Polygon"
        });
        draw.on("drawend", function(e) {
            var mapPoints = e.feature.getGeometry().getCoordinates()[0].map(function(item) {
                return transform(item, 'EPSG:3857', 'EPSG:4326');
            });
            return callback && callback(mapPoints);
        });
        draw.on("drawstart", function(e) {
            e.stopPropagation();
            // window.setTimeout(function() {
            //     featureOverlay.getSource().clear();
            // }, 0);

        });
        this._edDraw = draw;
        this.map.addInteraction(draw);




        // return {
        // 	prev:function(){

    // 	}
    // };
    };
    Map.prototype.stopEditablePolygon = function() {
        if (this._edDraw && this._modifyDraw && this._searchEdlayer) {
            this._searchEdlayer.getSource().clear();
            // this._edDraw.unByKey([this._drawstartEKey,this._drawendEKey]);
            // this._modifyDraw.unByKey([this._modifyendEKey,this._modifystartEKey]);
            this.map.removeInteraction(this._modifyDraw);
            this.map.removeInteraction(this._edDraw);
            this.map.removeLayer(this._searchEdlayer);
            delete this._searchEdlayer;
            delete this._edDraw;
            delete this._modifyDraw;
        }
    };
    Map.prototype.startEditablePolygonInLayerFeature = function(key, featureId, callback) {
		if (!this.layers[key]) return;
		var layer = this.layers[key];
		var featrue = layer.getSource().getFeatureById(featureId);
		if (!featrue) return;
		var features = new Collection();
		features.push(featrue);
		var modify = new Modify({
            features: features,
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function(event) {
                return shiftKeyOnly(event) && singleClick(event);
            }
        });
        modify.on("modifyend", function(e) {
            var points = e.features.getArray()[0].getGeometry().getCoordinates()[0];
            return callback && callback(points);
        });
        modify.on("modifystart", function(e) {
            console.log(e);
        });
        this._modifyDraw = modify;
        this.map.addInteraction(modify);

    };
    Map.prototype.stopEditablePolygonInLayerfeature = function() {
        this._modifyDraw && this.map.removeInteraction(this._modifyDraw);
        this._edDraw && this.map.removeInteraction(this._edDraw);
        delete this._edDraw;
        delete this._modifyDraw;
    };
    //设置中心点
    Map.prototype.animate = function(param, callback) {
        if (!param) return;
        this.map.getView().animate({
            center: transform(param.center, get('EPSG:4326'), get('EPSG:3857')),
            zoom: param.zoom,
            duration: param.duration
        }, callback);
    };
    //设置中心点
    Map.prototype.setCenter = function(center) {
        if (!center) return;
        center = this._transformLonlat(center);
        this.map.getView().setCenter(center);

    };
    //获得中心点
    Map.prototype.getCenter = function() {
        var center = this.map.getView().getCenter();
        return this._transformLonlat(center, true);
    };
    //设置缩放级别
    Map.prototype.setZoom = function(zoom) {
        if (!zoom) return;
        this.map.getView().setZoom(zoom);

    };
    //获得缩放级别
    Map.prototype.getZoom = function() {
        return this.map.getView().getZoom();
    };
    //绑定事件
    Map.prototype.on = function(eventType, func) {
        return this.map.on(eventType, func);
    };
    //注销事件
    Map.prototype.un = function(eventType, func) {
        return this.map.un(eventType, func);
    };

    return Map;
})(window);