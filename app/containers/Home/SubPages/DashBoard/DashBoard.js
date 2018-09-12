import React from 'react';
import {Button, Row, Col } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';

class DashBoard extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }
    render() {
        return (
            <div className="vk-subpage">
                <Row>
                    <Col xs={6}><Button type="primary" block>覆盖率统计</Button></Col>
                    <Col xs={6}><Button type="primary" block>巡查考勤统计</Button></Col>
                    <Col xs={6}><Button type="primary" block>养护绩效管理</Button></Col>
                    <Col xs={6}><Button type="primary" block>监理绩效管理</Button></Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        super.componentDidMount();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    
}

export default DashBoard;