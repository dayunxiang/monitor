import React from 'react';
import ReactDOM from 'react-dom'
// import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table } from '../../../../../components/Antd.js';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Table,Progress,Steps,Timeline,Popover  } from '../../../../../components/Antd.js';
import {relevanUnit,personShow,postIrrigationBasic,inspectorList} from '../../../../../data/dataStore.js'; //引入url
import moment from 'moment';
const Step = Steps.Step;
const Option = Select.Option;
class Children extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            childText: "这是子组件的文字"
        })
      }
    // 事件
    clickFun(text) {
        console.log(text,'text')
        this.props.pfn(text)//这个地方把值传递给了props的事件当中
    }
    componentDidMount(){
            //    this.loadData()
              }
           
    


    render() {  
        return (
            <div className="list">
            <ul>
                {
                    this.props.arr.map(item => {
                        return (
                            <li key={item.userName}>
                                {item.userName} 评论是:{item.text}
                            </li>
                        )
                    })
                }
            </ul>
            {/* //通过事件进行传值，如果想得到event，可以在参数最后加一个event，
            这个地方还是要强调，this，this，this */}
            <button onClick={this.clickFun.bind(this, this.state.childText)}>click me</button>
        </div>
        )
      }
    }
export default Children;