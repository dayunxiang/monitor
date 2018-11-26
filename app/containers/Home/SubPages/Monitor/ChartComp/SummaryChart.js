import React from 'react';
import echarts from 'echarts';
import { postJSONData } from "../../../../../util/common.js"

class SummaryChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeData: null
        };
        this.onPageResize = () => {
            if (this.chart) {
                this.chart.resize();
            }
        };
        this.resize = true;
    }

    render() {
        let { data } = this.state;
        if (!data ) return null;
        let _return =null;
        switch (data.chartStyle) {
            case 0:
                let keyValuetrs = data.segDatas && data.segDatas.map(({segValue, segName}, i) => {
                    return <tr key={i}><td width="50%">{segName}</td><td width="50%">{segValue}</td></tr>;
                });
                let keyValueChart = <div className="ps-m-summary-chart">
                    <div className="ps-m-smchart" id={"smChart"+ data.id}></div>
                    <table>
                        <tbody>
                            {keyValuetrs}
                        </tbody>
                    </table>
                </div>;
                _return = keyValueChart;
                break;
            case 1:
                let summary = data.segDatas && data.segDatas.reduce((a, b) => {
                    return a + b.segValue;
                }, 0);
                if (!summary) {summary = 0}
                
                let sumText = (this.state.activeData && this.state.activeData.value != null) ? (this.state.activeData.value + "/" + summary) : summary;
                let pieChart = <div className="ps-m-summary-chart">
                    <div className="ps-m-smchart" id={"smChart"+ data.id}></div>
                    <div className="ps-m-sm-chart-title">
                        <div className="ps-m-sm-chart-subtitle-text">{this.state.activeData && this.state.activeData.name ? this.state.activeData.name : data.name}</div>
                        <div className="ps-m-sm-chart-subtitle-num">{sumText}</div>
                    </div>
                </div>;
                _return = pieChart;
                break;
            case 2:
                let lineChart = <div className="ps-m-summary-chart">
                    <div className="ps-m-smchart" id={"smChart"+ data.id}></div>
                </div>;
                _return = lineChart;
                break;
            default: break;
        }
        return (
            _return
        );
    }
    
    componentDidMount() {
        this.createChart();
        this.startInterval();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.resize) {
            this.chart && this.chart.resize();
        }
    }
    componentWillUnmount() {
        if (this._timer) {
            window.clearInterval(this._timer);
        }
        window.removeEventListener("resize", this.onPageResize);
        this.setState = () => {return;};
        this.forceUpdate = () => {return;};
    }
    createChart(data) {
        if (!data) {
            data = this.state.data;
        }
        if (!data || !data.segDatas) return;
        switch (data.chartStyle) {
            case 0: this.createKeyValueChart(data);break;
            case 1: this.createPieChart(data);break;
            case 2: this.createBarChart(data);break;
            default: break;
        }
    }
    createKeyValueChart(data) {


    }
    createPieChart(data) {
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('smChart' + data.id));
            window.addEventListener("resize", this.onPageResize);
        }
        var chartData = data.segDatas && data.segDatas.map(({segValue, segName}) => {
            return {name: segName, value: segValue};
        });
        if (!chartData) {
            chartData = [];
        }
        var option = {
            color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
            title: {
                text: this.state.data && this.state.data.name,
                left: "center",
                textStyle: {
                    color: "white"
                },
                top:"10%"

            },
            legend: {
                type: this.state.data && this.state.data.showLegend ? "scroll" : null,
                orient: 'horizontal',
                // x:'right',
                left: 0,
                bottom: "10%",
                itemWidth: 5,
                itemHeight: 5,
                formatter: '{name}',
                textStyle: {
                    color: '#ffffff'
                },
                // selectedMode:true,
                data: chartData,
                pageTextStyle:{
                    color:"#ffffff"
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                position:["20%",10]
                // formatter: function(item){
                //  return showDtl(item);
                // }
            },
            grid: {
                top:-0,
            },
            series: [
                {
                    name: this.state.data && this.state.data.name,
                    type: 'pie',
                    radius: ['50%', "70%"],
                    center: ['50%', '50%'],

                    data:chartData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                        
                    },
                    labelLine: {
                        normal: {
                            length: 2,
                            length2: 5
                        }
                    },
                    label: {
                        normal: {
                            show:false,
                            position: 'inner',
                            formatter: '{d}%({c})'
                        }
                    }
                }
            ],
            animation:true
        };
        this.chart.setOption(option);
        if (this.pieTimer) {
            window.clearInterval(this.pieTimer);
        }
        let dataInd = 0;
        this.pieTimer = window.setInterval(() => {
            if (!chartData.length) return;
            if (dataInd>chartData.length-1) {
                dataInd = 0;
            }
            this.chart.dispatchAction({
                type:'pieUnSelect',
                dataIndex:dataInd === 0 ? chartData.length-1: dataInd-1,
            });
            this.chart.dispatchAction({
                type:'pieSelect',
                dataIndex:dataInd,
            });
            this.setState({
                activeData: chartData[dataInd]
            });
            dataInd++;
        }, 3000);
    }
    createBarChart(data) {
        if (!this.chart) {
            this.chart = echarts.init(document.getElementById('smChart' + data.id));
            window.addEventListener("resize", this.onPageResize);
        }
        var chartData = data.segDatas && data.segDatas.map(({segValue, segName}) => {
            return {name: segName, value: segValue};
        });
        var xData = data.segDatas && data.segDatas.map(({segValue, segName}) => {
            return segName;
        });
        if (!chartData) {
            chartData = [];
        }
        var option = {
            title: {
                text: this.state.data && this.state.data.name,
                left: "center",
                textStyle: {
                    color: "white"
                }

            },
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
                    data : xData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: "white"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "white"
                        }

                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        textStyle: {
                            color: "white"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "white"
                        }

                    }
                }
            ],
            series : [
                {
                    name:this.state.data && this.state.data.name,
                    type:'bar',
                    barWidth: '60%',
                    data:chartData
                }
            ]
        }
        this.chart.setOption(option);
    }
    startInterval() {
        let { data } = this.state;
        let interval = data.refreshInterval ? data.refreshInterval: 60;
        let func = () => {
            postJSONData(data.dataUrl, {}).then((res) =>{ return res.ok ? res.json() : Promise.reject("接口出错");}).then((data) => {
                if (data.code === 200) {
                    this.state.data && (this.state.data.segDatas = data.data);
                    this.createChart(this.state.data);
                    this.resize = false;
                    this.forceUpdate(() => {
                        this.resize = true;
                    });
                    return ;
                }
                return Promise.reject(data.msg);
            }).catch((ex) => {});
        }
        this._timer = window.setInterval(func, interval * 1000);
        func();
    }
    static getDerivedStateFromProps(props, state) {
        return {
            data: state.data ? state.data: props.data
        };
    }
    
}
export default SummaryChart;