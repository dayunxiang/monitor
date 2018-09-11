
import React from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader/index.js'
import { bindActionCreators } from 'redux';
import * as mainActions from '../../actions/main.js';

import './style.css'

import { hashHistory } from 'react-router'
import { Tabs, Button, Avatar } from '../../components/Antd.js';
import Monitor from './views/Monitor.js';
import Home from './views/Home.js'
import Setting from './views/Setting.js'

const comps = {
    monitor: Monitor,
    home: Home
};

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);

        // console.log(123);
        this.state = {
            views: {},
            viewKey: ""
        }
    }
    render() {
        var Components = [];
        var activeItemKey = '';
        for (var key in this.props.main) {
            if (this.props.main[key].show == null) {continue;}
            if (this.props.main[key].show) {activeItemKey = key;}
            var Com = comps[key];
            Components.push((<Com key={key} show={this.props.main[key].show}></Com>));
        }
        return (
            <div ref="mainWrap" className="vk-main-wrap">
                <HomeHeader userinfo={this.props.userinfo} itemClick={this.headerItemClick.bind(this)} activeItem = {activeItemKey}/>
                {Components}
            </div>
        );
    }
    componentDidMount() {}
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
            case "monitor":
                this.props.mainActions.addMonitor();
                break;
            case "system":
                this.props.mainActions.addHome();
                break;
            case "task":
                var views = this.state.views;
                if (!views[key]) {
                    views[key] = Task;
                }
                this.setState({
                    views: views,
                    viewKey: key
                })
                break;
            default:
                break;
        }
    }
    componentWillUnmount() {
        // window.removeEventListener("resize", this.onresize);
    }
    componentDidCatch(a, b) {
        console.log(a, b);
    // this.props.homeActions.reset();
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("mainupdate");
    }


}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    console.log(state);
    return {
        userinfo: state.userinfo,
        main: state.main.show
    };
}

function mapDispatchToProps(dispatch) {
    return {
        mainActions: bindActionCreators(mainActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);