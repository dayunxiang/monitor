import React from "react";
import { connect } from 'react-redux';
import HomeHeader from '../../components/HomeHeader/index.js';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../actions/home.js';
import './style.css';
// import Tree from '../../components/Tree/Tree.js'
import AntTree from '../../components/Tree/AntTree.js';
import Scroll from '../../components/Scroll/Scroll.js';
import Operator from './SubPages/Operator/Operator.js';
import Inbound from './SubPages/Inbound/Inbound.js';
import Organization from './SubPages/Organization/Organization.js';
import MapApi from './SubPages/MapApi/MapApi.js';
import { hashHistory } from 'react-router';
import { Tabs, Button ,Avatar} from '../../components/Antd.js';
const TabPane = Tabs.TabPane;
const Pages = {
    Operator: Operator,
    Inbound: Inbound,
    Organization: Organization,
    MapApi: MapApi
};
// let consolelog = function(text){
//     return (target,name, descriptor) =>{
//         console.log(target,name, descriptor);
//         let fn = descriptor.value;
//         descriptor.value = function(){
//             let value = fn.apply(this, arguments);
//             console.log(text);
//         }
//         return descriptor;
//     }
// }
// let consolelog1 = function(target,name, descriptor){

//     console.log(target,name, descriptor);
//     let fn = descriptor.value;
//     descriptor.value = function(){
//         let value = fn.apply(this, arguments);
//         console.log("finish");
//     }
//     return descriptor;
// }
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        // console.log(123);
        this.state = {
            collapsed: false
        }
    }
    render() {
        let activeKey = this.props.tabData && this.props.tabData.length ? this.props.tabData[this.props.tabIndex].key : "";
        let tab = <Tabs hideAdd
            onChange={this.onChange.bind(this)}
            activeKey={activeKey}
            type="editable-card"
            onEdit={this.onEdit.bind(this)} >
            {this.props.tabData.map((pane) => <TabPane tab={pane.title} key={pane.key}>{this.createSubPage(pane.key)}</TabPane>)}
        </Tabs>;
        return (
            <div ref="homeWrap" className="vk-home-wrap">
                <HomeHeader userinfo={this.props.userinfo} itemClick={this.headerItemClick.bind(this)} />
                <div ref="tree" className="vk-tree-cont" style={{width: this.state.collapsed ? "64px" : "250px"}}>
                    <Scroll>
                       <div className="vk-tree" style={{overflow: this.state.collapsed ? "visible" : "auto"}}>
                            <AntTree inlineCollapsed={this.state.collapsed} itemClick={this.treeItemClick.bind(this)}/>
                        </div>
                    </Scroll>
                    
                    
                </div>
                <div ref="cont" className="vk-wrapper-cont" style={{paddingLeft: this.state.collapsed ? "64px" : "250px"}}>
                    <div className="vk-cont">
                        {
                            this.props.tabData && this.props.tabData.length ? tab : null
                        }
                    </div>
                </div>
            </div>
        );
    }
    // @consolelog("调用完成")
    componentDidMount() {
        console.log("cdm");
        if (!this.props.userinfo.id) {
            // hashHistory.push('/login');
        }
        // var treeDiv = this.refs.tree;
        // var contDiv = this.refs.cont;
        // var homeWrap = this.refs.homeWrap
        // var windowH = window.innerHeight;
        // var h = (windowH ) > 500 ? (windowH - 50) +'px': (500 - 50)+'px' ;
        // var wh = (windowH ) > 500 ? (windowH ) +'px': (500 )+'px' ;
        // treeDiv.style.height = h;
        // contDiv.style.height = h;
        // this.onresize = () => {
            // var windowH = window.innerHeight;
            // var h = (windowH) > 500 ? (windowH - 50) +'px': (500 -50)+'px';
            // var wh = (windowH ) > 500 ? (windowH ) +'px': (500 )+'px' ;
            // treeDiv.style.height = h;
            // contDiv.style.height = h;
        // }
        // window.addEventListener("resize", this.onresize);


    }
    componentWillUnmount() {
        // window.removeEventListener("resize", this.onresize);
    }
    componentDidCatch(a, b) {
        console.log(a, b);
        // this.props.homeActions.reset();
    }
    createSubPage(key,props) {
        var Com = Pages[key];
        if (Com) {
            return <Com {...props}/>
        }
        
    }
    onChange(activeKey){
        this.props.homeActions.activeTab(activeKey);
    }
    onEdit(targetKey, action) {
        if (action === "remove") {
            this.props.homeActions.removeTab(targetKey);
        }
    }
    
    treeItemClick(item, key, keyPath) {
        var text = {
            key: key,
            title: item.props.children
        }
        this.props.homeActions.addTab(text);
    }
    headerItemClick(key) {
        console.log(key);
        switch (key) {
            case "func":
                this.setState({
                    collapsed: !this.state.collapsed
                });
                break;
            case "poweroff":
                hashHistory.push('/login');
                break;
            default: break;
        }
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    console.log(state);
    return {
        userinfo: state.userinfo,
        tabData: state.home.tabData,
        tabIndex: state.home.tabIndex
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);