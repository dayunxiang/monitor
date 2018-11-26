import React from 'react';
import { Menu, Dropdown, Button, Icon, Checkbox, Select } from '../Antd.js';
const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;
const Option = Select.Option;

class MapTools extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
            measuring: false,
            showMenu: false,
            tools: [
                {
                    title: "开启度分秒",
                    checkbox: true,
                    isChecked: false,
                    key: "formatDegree"
                },
                {
                    title: "开启聚合",
                    key: "cluster",
                    icon: "star",
                    children: [
                        {
                            title: "水利设施聚合",
                            key: "conversancyCluster",
                            checkbox: true,
                        },
                        {
                            title: "巡查人员聚合",
                            key: "personCluster",
                            checkbox: true,
                        }
                    ]
                },
                {
                    title: "图层开关",
                    key: "layer",
                    icon: "poweroff",
                    children: [
                        {
                            title: "遥感卫星图层",
                            key: "satelliteLayer",
                            isChecked: false,
                            checkbox: true,
                            select: true
                        },
                        {
                            title: "无人机图层",
                            key: "planeLayer",
                            isChecked: false,
                            checkbox: true,
                            select: true
                        },
                        {
                            title: "河道图层",
                            key: "riverLayer",
                            isChecked: true,
                            checkbox: true,
                            select: true
                        },
                        {
                            title: "水利设施图层",
                            key: "conversancyLayer",
                            isChecked: true,
                            checkbox: true,
                        },
                        {
                            title: "巡查人员图层",
                            key: "personLayer",
                            isChecked: true,
                            checkbox: true,
                        },
                        

                    ]
                },
                {
                    title: "搜索",
                    key: "search",
                    icon: "search",
                    children: [
                        {
                            title: "矩形搜索",
                            key: "rectSearch"
                        },
                        {
                            title: "圆形搜索",
                            key: "circleSearch"
                        },
                        {
                            title: "多边形搜索",
                            key: "polygonSearch"
                        }
                    ]
                },
                {
                    title: "测量",
                    key: "measure",
                    icon: "radius-setting",
                    children: [
                        {
                            title: "测量距离",
                            key: "measureLength"
                        },
                        {
                            title: "测量面积",
                            key: "measureArea"
                        }
                    ]
                }
            ],
            currentClick: []
        };
    }

    render() {
        // const menu = (
        //     <Menu onClick={this.menuClick}>
        //         <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
        //                 <Menu.Item key="1">Option 1</Menu.Item>
        //                 <Menu.Item key="2">Option 2</Menu.Item>
        //                 <Menu.Item key="3">Option 3</Menu.Item>
        //                 <Menu.Item key="4">Option 4</Menu.Item>
        //         </SubMenu>
        //         <SubMenu key="sub2" title={<span><Icon type="mail" /><span>开启聚合</span></span>}>
        //                 <Menu.Item key="5">Option 1</Menu.Item>
        //                 <Menu.Item key="6">Option 2</Menu.Item>
        //                 <Menu.Item key="7">Option 3</Menu.Item>
        //         </SubMenu>
        //         <Menu.Item>
        //             <Checkbox onClick={this.onChange.bind(this)} defaultChecked={true}>开启度分秒</Checkbox>
        //         </Menu.Item>
        //     </Menu>
        // );
        const menu = this.createMenuComponent(this.state.tools, true);

	    return (
            <ButtonGroup>
                {this.state.measuring ? <Button type="primary" onClick={this.stopMeasure.bind(this)}>停止测量</Button> : null}
                <Dropdown overlay={menu} placement="bottomLeft" trigger={["hover"]}>
                    <Button type="primary" onClick={this.toolsBtnClick.bind(this)}>地图工具</Button>
                </Dropdown>
            </ButtonGroup>
	    );
    }
    createMenuComponent(data, isRoot, subData) {
        let cmps = [];
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            if (!d.children || !d.children.length) {
                if (d.checkbox && d.select) {
                    let cmp = <Menu.Item key={d.key}>
                        <Checkbox onClick={this.onChange.bind(this, d.key)} checked={d.isChecked}>{d.title}</Checkbox>
                        <span onClick={this.selectClick}><Select size="small" onChange={this.onSelectChange.bind(this, d.key)} style={{ width: 100 }} ><Option value="201809">201809</Option></Select></span>
                    </Menu.Item>;
                    cmps.push(cmp);
                } else if (d.checkbox) {
                    let cmp = <Menu.Item key={d.key}>
                        <Checkbox onClick={this.onChange.bind(this, d.key)} checked={d.isChecked}>{d.title}</Checkbox>
                    </Menu.Item>;
                    cmps.push(cmp);
                } else {
                    let cmp = <Menu.Item key={d.key}>{d.title}</Menu.Item>;
                    cmps.push(cmp);
                }
            } else {
                let cmp = this.createMenuComponent(d.children, false, d);
                cmps.push(cmp);
            }
        }
        if (isRoot) {
            return <Menu onClick={this.menuClick.bind(this)}>{cmps}</Menu>;
        } else {
            return <SubMenu key={subData.key} title={<span className="ps-submenu-title"><Icon type={subData.icon} /><span>{subData.title}</span></span>} >{cmps}</SubMenu>
        }
    }
    componentDidMount() {
    	
    }
    selectClick(e) {
        // e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    }
    onSelectChange(key, e) {
        let map = this.props.map ;
        if (!map) {return;}
        switch (key) {
            case "satelliteLayer" : map.setGisUrl("satellite", "http://221.181.88.134:8079/map/satellite/" + e + "/");break;
            case "planeLayer" : map.setGisUrl("plane", "http://221.181.88.134:8079/map/plane/" + e + "/");break;
            case "riverLayer" : map.setGisUrl("river", "http://221.181.88.134:8079/map/river/" + e + "/");break;
            
            default: break;
        }
    }
    onChange(key, e) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        let map = this.props.map;
        if (!map) {return;}
        switch (key) {
            case "formatDegree": // 度分秒
                map.showFormatDegree(e.target.checked);
                break;
            case "conversancyCluster":
                e.target.checked ? map.startCluster("conservancy", true) : map.stopCluster("conservancy");
                break;
            case "personCluster":
                e.target.checked ? map.startCluster("person") : map.stopCluster("person");
                break;
            case "conversancyLayer":
                map.setVisible("conservancy", e.target.checked);
                break;
            case "personLayer":
                map.setVisible("person", e.target.checked);
                break;
            case "satelliteLayer":
                map.setVisible("satellite", e.target.checked);
                break;
            case "riverLayer":
                map.setVisible("river", e.target.checked);
                break;
            case "planeLayer":
                map.setVisible("plane", e.target.checked);
                break;
            default: break;
        }
        this.findDataByKey(this.state.tools, key, e.target.checked);
        this.forceUpdate();
    }
    menuClick(e) {
        let key = e.key;
        let map = this.props.getMap();
        switch (key) {
            case "rectSearch":
                map.startSearch("Rect", (param) => {
                    let { callback } = this.props;
                    return callback && callback.rectSearch && callback.rectSearch(param);
                });
                break;
            case "measureLength":
                map.activeMeasure("LineString");
                this.setState({
                    measuring: true
                });
                break;
            case "measureArea":
                map.activeMeasure("Polygon");
                this.setState({
                    measuring: true
                });
                break;
            default: break;
        }
    }
	findDataByKey(arr, key, checked) {
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];
            if (d.key === key) {
                d.isChecked = checked;
                break;
            }
            if (d.children && d.children.length) {
                this.findDataByKey(d.children, key, checked);
            }
        }
    }
    stopMeasure() {
        this.props.map.stopMeasure();
        this.setState({
            measuring: false
        });
    }
    toolsBtnClick() {
        this.setState({
            showMenu: ! this.state.showMenu
        });
    }
    setViewZoomChange(zoom) {
        if (this._timer) {
            window.clearTimeout(this._timer);
        }
        this._timer = window.setTimeout(() => {
            if (zoom <= 12) {
                if (this.state.tools[1].children[0].isChecked !== true) {
                    this.state.tools[1].children[0].isChecked = true;
                    this.forceUpdate();
                }
            }else{
                if (this.state.tools[1].children[0].isChecked !==false) {
                    this.state.tools[1].children[0].isChecked = false;
                    this.forceUpdate();
                }
            }
            
        },300);
    }
}
export default MapTools;