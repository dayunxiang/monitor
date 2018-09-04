import React from 'react';
import { Avatar, Row, Col, Menu, Input, Dropdown, Icon, Badge, Button } from '../Antd.js';

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
                <img src={require("../../statics/img/ubilogo.png")} alt="logo"/>
              </div>
              <div className="nav-cont nav-center-cont">
                <ul className="nav-center-ul" >
                  <li className="nav-center-li short-width" data-key="func" onClick={this.liClick.bind(this)}>
                    <a href="#" className="lg-font">
                      <Icon type="bars" />
                    </a>
                    
                  </li>
                  <li className="nav-center-li" data-key="monitor" onClick={this.liClick.bind(this)}>
                    <a href="#">设备监控</a>
                  </li>
                  <li className="nav-center-li" data-key="system" onClick={this.liClick.bind(this)}>
                    <a href="">信息管理</a>
                    
                  </li>
                  
                  {
                  //   <li className="nav-center-li" data-key="shoppingList" onClick={this.liClick.bind(this)}>
                  //   <a href="#" className="lg-font">
                  //     <Badge count={0} showZero>
                  //       <Icon type="shopping-cart" />
                  //     </Badge>
                  //   </a>
                    
                  // </li>
                  }
                </ul>
              </div>
              <div className="nav-cont nav-right-cont">
                <div className="nav-right-wrap">
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="javascript:void(0)">
                      XXX管理员 <Icon type="down" />
                    </a>
                  </Dropdown>
                  <span className="nav-logout">
                    <Button type="primary" ghost shape="circle" icon="poweroff" data-key="poweroff" onClick={this.liClick.bind(this)}></Button>
                  </span>
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