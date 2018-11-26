import React from 'react';
import { Menu, Input, Dropdown, Icon, Badge, Button } from '../Antd.js';
const Search = Input.Search;

import "./style.css";
class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const menu = (
            <Menu onClick={this.menuItemClick}>
                <Menu.Item key="1">操作1</Menu.Item>
                <Menu.Item key="2">操作2</Menu.Item>
                <Menu.Item key="3">操作3</Menu.Item>
            </Menu>
        );
        return (
            <nav className="navbar navbar-default">
                <div className="nav-cont nav-left-cont">
                    <img src={require("../../statics/img/qp.png")} alt="logo"/>
                    <span className="nav-system-name">青浦水闸泵站监控系统</span>
                </div>
                <div className="nav-cont nav-center-cont">
                    <ul className="nav-center-ul" >
                        <li className="nav-center-li short-width" data-key="func" onClick={this.liClick.bind(this)}>
                            <a href="#" className="lg-font">
                                <Icon type="bars" />
                            </a>
                        </li>
                        <li  className="nav-center-li">
                            <Search
                                placeholder="全局搜索"
                                style={{ width: 200 }}
                            />
                        </li>
                    </ul>
                </div>
                <div className="nav-cont nav-right-cont">
                    <div className="nav-right-wrap">
                        <ul className="nav-right-ul" >
                            <li className="nav-right-li" data-key="war-monitor" onClick={this.liClick.bind(this)}>
                                <a href="#">
                                    <Badge count={0} showZero={false} offset={[5,-5]}>
                                      作战图
                                    </Badge>
                                </a>
                            </li>
                            <li draggable={true} className="nav-right-li" data-key="monitor" onClick={this.liClick.bind(this)}>
                                <a href="#" draggable={true}>
                                    <Badge count={0} showZero={false} offset={[5,-5]}>
                                      报警
                                    </Badge>
                                </a>
                            </li>
                            <li className="nav-right-li" data-key="conservancy" onClick={this.liClick.bind(this)}>
                                <a href="">
                                    <Badge count={0} showZero={false} offset={[5,-5]}>
                                      流转
                                    </Badge>
                                </a>
                            </li>
                            <li className="nav-right-li" data-key="shoppingList" onClick={this.liClick.bind(this)}>
                                <a href="#" className="lg-font">
                                    <Badge count={0} showZero offset={[5,-5]}>
                                       消息
                                    </Badge>
                                </a>
                            </li>
                            <li className="nav-right-li">
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="javascript:void(0)">
                                        <Icon type="user" style={{fontSize:"40px"}}/>
                                    </a>
                                </Dropdown>
                            </li>
                            <li className="nav-right-li">
                                <span className="nav-logout">
                                    <Button type="primary" ghost shape="circle" icon="poweroff" data-key="poweroff" onClick={this.liClick.bind(this)}></Button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    menuItemClick(e) {
        e.domEvent.preventDefault();
        // e.preventDefault();
        console.log(e);
    }

    liClick(e) {
        e.preventDefault();
        var {itemClick} = this.props;
        var key = e.currentTarget.getAttribute('data-key');
        itemClick(key);
    }


}

export default HomeHeader;