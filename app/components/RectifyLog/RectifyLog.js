import React from 'react';
import {Steps, Spin } from '../Antd.js';
const Step = Steps.Step;
import "./style.css";
class RectifyLog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };

    }

    render() {
        let { entity , loading} = this.props;
        if (!Array.isArray(entity)) {
            entity = [];
        }
        // entity = [{
        //     title:"发现问题",
        //     children:[
        //         {title:"发现问题","time":"2018-10-10 12:12:12", content:"测试",name:"小王"}
        //     ]
        // },{
        //     title:"发现问题",
        //     children:[
        //         {title:"小张","time":"2018-10-10 12:12:12", content:"测试"}
        //     ]
        // },{
        //     title:"发现问题",
        //     children:[
        //         {title:"小张","time":"2018-10-10 12:12:12", content:"测试"}
        //     ]
        // },{
        //     title:"发现问题",
        //     children:[
        //         {title:"小张","time":"2018-10-10 12:12:12", content:"测试"}
        //     ]
        // },{
        //     title:"发现问题",
        //     children:[
        //         {title:"小张","time":"2018-10-10 12:12:12", content:"测试"}
        //     ]
        // },{
        //     title:"发现问题",
        //     children:[
        //         {title:"小张","time":"2018-10-10 12:12:12", content:"测试"}
        //     ]
        // }]
        let comps = entity.map((item, index) => {
            let children = "";
            if (Array.isArray(item.children)) {
                children = item.children.map((subItem, i) => {
                    return this.createItem(subItem, i);
                });
            }
            return <Step key={index} title={item.title} description={children} />;
        });
        return (
            <div className="ps-log-cont">
                {
                    loading ? <div className="ps-log-loadingcont"><Spin size="large"></Spin></div>
                        : <Steps current={entity.length}>
                            {comps}
                        </Steps>
                }
                
            </div>
            
        );
    }
    createItem(entity, i) {
        return (
            <div className="ps-log-item" key={i}>
                {
                    //<span className="vk-log-item-title">{entity.title}</span>
                }
                
                <span className="vk-log-item-name">
                    <div className="vk-log-item-title">{entity.title}</div>
                    <div>{entity.name}</div>
                    <div>{entity.time}</div>
                    <div>{entity.content}</div>
                </span>
                <div className="vk-log-item-line"></div>
                <div className="vk-log-item-dot"></div>
            </div>
        );
    }
    
    componentDidMount() {
        
    }
    
}
export default RectifyLog;