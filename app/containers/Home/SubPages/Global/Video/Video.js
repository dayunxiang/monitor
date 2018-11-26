import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover  } from '../../../../../components/Antd.js';
// import BaseSubPage from '../../BaseSubPage.js'
import BaseSubPage from '../../BaseSubPage.js'
import '../Video/style.css'
const Option = Select.Option;

class Video extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
          
          };
        
      }
    // 事件
     handleChange(value) {
        console.log(`selected ${value}`);
      }
      
       handleBlur() {
        console.log('blur');
      }
      
       handleFocus() {
        console.log('focus');
      }
    // 第二个视频
    Change(value) {
        console.log(`selected ${value}`);
      }
      
       Blur() {
        console.log('blur');
      }
      
       Focus() {
        console.log('focus');
      }
    render() {
      
      
        return (
        	<div className='video'>
            {/* 标题部分 */}
                <div className="title">
                <div className="tit">
                <Icon type="video-camera" theme="outlined"  />
                <span>   
                    视频信息信息
                    </span>
                </div>
                {/* 选择框 */}
                <div className="select_one">
                <label htmlFor="">实时视频码流</label>
                <Select
                showSearch
                style={{ width: 200 }}
                // placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
               <Option value="jack">主码流</Option>
                <Option value="lucy">辅码流</Option>
            </Select>,
                </div>
                <div className="select_two">
                <label htmlFor="">历史视频码流</label>
                <Select
                showSearch
                style={{ width: 200 }}
                // placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.Change.bind(this)}
                onFocus={this.Focus.bind(this)}
                onBlur={this.Blur.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="jack">主码流</Option>
                <Option value="lucy">辅码流</Option>
            </Select>,
                </div>
                 {/* 载入视频 */}
                 <div className="down">
                <Button type="primary">载入视频</Button>
                </div>
                {/* 保存视频 */}
                <div className="save">
                <Button type="primary">保存视频</Button>
                </div>
               
                </div>
                {/* 内容部分 */}
                <div className="content">
                <div className="gutter-example">
                    <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频1</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频2</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频3</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频4</div>
                    </Col>
                    </Row>
                </div>

                  <div className="gutter-example">
                    <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频5</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频6</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频7</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box">视频8</div>
                    </Col>
                    </Row>
                </div>

                
                </div>
            </div>
        )
}
}
export default Video;