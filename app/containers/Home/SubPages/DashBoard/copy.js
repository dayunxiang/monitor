import React from 'react';
// import { bindActionCreators } from 'redux';
import { Row, Col } from '../../../../components/Antd.js';
import BaseSubPage from '../BaseSubPage.js';
import echarts from 'echarts';
import "./style.css";

class DashBoard extends BaseSubPage {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }
    render() {
        return (
            <div className="mn-subpage">
                <Row type="flex" justify="space-between">
                    <Col xs={4}><div className="ps-overview-item">覆盖率统计</div></Col>
                    <Col xs={4}><div className="ps-overview-item">巡查考勤统计</div></Col>
                    <Col xs={4}><div className="ps-overview-item">养护绩效管理</div></Col>
                    <Col xs={4}><div className="ps-overview-item">监理绩效管理1</div></Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.alarmChartDiv = node}}>未读报警</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.evidenceChartDiv = node}}>待审批流转</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.openCloseChartDiv = node}}>启闭记录</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.attendanceChartDiv = node}}>考勤异常</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.waterZChartDiv = node}}>检测水位柱状图</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.waterQChartDiv = node}}>检测水位曲线图</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.ssScrollChartDiv = node}}>设施工况滚动</div></Col>
                    <Col xs={12}><div className="ps-overview" ref={(node) => {this.ssDetailChartDiv = node}}>设施工况详情</div></Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        super.componentDidMount();
        this.createAlarmChart();
        this.createEvidenceChart();
        this.createOpenCloseChart();

    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.layout !== this.props.layout) {
            window.setTimeout(() => {
                this.resetCharts();
            }, 600);
        } else {
            if (this.props.isActive) {
                this.resetCharts();
            }
        }
    }
    resetCharts() {
        this.alarmChart && this.alarmChart.resize();  //报警
        this.evidenceChart && this.evidenceChart.resize();  //待审批流转
        this.openCloseChart && this.openCloseChart.resize(); //启闭记录



    }
    // 未读报警部分
    createAlarmChart() {
        if (!this.alarmChart) {
            this.alarmChart = echarts.init(this.alarmChartDiv);
        }
        this.alarmChart.setOption({
            title: { text: '未读报警' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    // 待审批流转
    createEvidenceChart() {
        if (!this.evidenceChart) {
            this.evidenceChart = echarts.init(this.evidenceChartDiv);
        }
        this.evidenceChart.setOption({
            title: { text: '待审批流转' },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        });
    }

// 启闭记录  openCloseChartDiv
createOpenCloseChart() {
    if (!this.alarmChart) {
        this.alarmChart = echarts.init(this.alarmChartDiv);
    }
    this.alarmChart.setOption({
        title: { text: '启闭记录' },
        tooltip: {},
        xAxis: {
            data: ["老大","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
}
}



export default DashBoard;