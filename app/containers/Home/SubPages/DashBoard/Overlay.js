import React from 'react';
// import { Tree, Menu, Icon} from '../Antd.js';


class Overlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
        };

    }
    render() {
        let { overlays, entity, show } = this.props;
        if (!Array.isArray(overlays)) return null;
        let ActiveOverlay = null;
        for (var i = 0; i < overlays.length; i++) {
            let Overlay = overlays[i];
            if (Overlay.canHandle && Overlay.canHandle(entity)) {
                ActiveOverlay = Overlay;
                break;
            }
        }
        return (
            show && ActiveOverlay ? <ActiveOverlay {...this.props} overlays={null}></ActiveOverlay> : null
        );
    }
    componentDidMount() {
        
    }
   
    
}
export default Overlay;