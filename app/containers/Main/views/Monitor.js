import React from 'react';
import Wrap from "./Wrap.js";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {easeIn, easeOut} from 'ol/easing.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';

class Monitor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        return (
            <div id="map" style={{height:"100%"}}>
            </div>
        );
    }
    componentWillReceiveProps() {

    }
    componentDidMount() {
        var london = fromLonLat([-0.12755, 51.507222]);
        var moscow = fromLonLat([37.6178, 55.7517]);
        var istanbul = fromLonLat([28.9744, 41.0128]);
        var rome = fromLonLat([12.5, 41.9]);
        var bern = fromLonLat([7.4458, 46.95]);
        var view = new View({
            center: istanbul,
            zoom: 6
        });
    	var map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    preload: 4,
                    source: new OSM()
                })
            ],
            // Improve user experience by loading tiles while animating. Will make
            // animations stutter on mobile or slow devices.
            loadTilesWhileAnimating: true,
            view: view
        });
    }
}
export default Wrap(Monitor);