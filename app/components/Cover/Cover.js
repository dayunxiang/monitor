import React from 'react';
import ReactDOM from 'react-dom'
// import { Tree, Menu, Icon} from 'antd';
import './style.css';
import PropTypes from 'prop-types';


class Cover extends React.Component {
  	constructor(props, context) {
        super(props, context);


    }

    render() {
        let { cover, fullScreen, topOffset } = this.props;
        var style = {
            zIndex:9999,
            height:"calc(100% - "+(topOffset !=null ?topOffset:30)+"px)",
            height:"-moz-calc(100% - "+(topOffset !=null ?topOffset:30)+"px)",
            height:"-webkit-calc(100% - "+(topOffset !=null ?topOffset:30)+"px)",
        }
        
        if (cover) {
            var dom = <div style={style} className="vk-cover" ></div>;
            if (fullScreen) {
                return ReactDOM.createPortal(dom, document.getElementsByTagName("body")[0])
            }else{
                return dom;
            }
        }else{
            return null;

        }
    }
    componentWillUnmount() {
        console.log(this);
        setTimeout(()=> {
            console.log(this);
        },3000)
    }
    
}
Cover.propTypes = {
    cover: PropTypes.bool
};

export default Cover;