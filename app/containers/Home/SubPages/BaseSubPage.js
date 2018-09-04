import React from 'react';
import ReactDOM from 'react-dom'
// import { Tree, Menu, Icon} from 'antd';


class BaseSubPage extends React.Component {
  	constructor(props, context) {
        super(props, context);
        // this.state = { };

    }

    componentDidMount(){
        this.adjustSubpage();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onPageResize);
    }
    componentDidCatch(error, info){
        console.log(error, info);
        // this.props.homeActions.reset();
    }
    adjustSubpage(){
        
        let thisDom = ReactDOM.findDOMNode(this);
        var windowH = window.innerHeight;
        var h = (windowH ) > 500 ? (windowH - 98) +'px': (500 - 98)+'px' 
        thisDom.style.height = h;
        this.onPageResize = () => {
            var windowH = window.innerHeight;
            var h = (windowH ) > 500 ? (windowH - 98) +'px': (500 - 98)+'px' 
            thisDom.style.height = h;
        }
        window.addEventListener("resize", this.onPageResize)
    }
	
}
export default BaseSubPage;