import React from 'react';
// import { Tree, Menu, Icon} from '../Antd.js';
import { Row, Col, Input, Button, DatePicker} from '../../../../components/Antd.js';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class RectifyReport extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: "",
            remark: "",
            content: "",
            time: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
            loading: false
        };

    }

    render() {
        return (
            <Row>
                <Col xs={24}>
                    <Col xs={8}><label className="ps-search-label">申请金额</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">完成时间</label></Col>
                    <Col xs={16}>
                        <DatePicker style={{width:"100%"}} defaultValue={moment(this.state.time, "YYYY-MM-DD HH:mm:ss")} locale={locale} format="YYYY-MM-DD HH:mm:ss" showTime onChange={this.inputTimeChange.bind(this)} />
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">内容</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputContentChange.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">备注</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputRemarkChange.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24}>
                    <div className="ps-rect-tools">
                        <Button className="ps-rect-sure" type="primary" loading={this.state.loading} onClick={this.submitClick.bind(this)}>确认</Button>
                        <Button className="ps-rect-cancel" type="default" onClick={this.cancelClick.bind(this)}>取消</Button>
                    </div>
                </Col>
            </Row>
        );
    }
    componentDidMount() {
        
    }
    
    inputChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    inputRemarkChange(e) {
        this.setState({
            remark: e.target.value
        });
    }
    inputContentChange(e) {
        this.setState({
            content: e.target.value
        });
    }
    inputTimeChange(e) {
        this.setState({
            time: e
        });
    }
    submitClick() {
        let success = () => {
            this.setState({
                loading: false
            });
        };
        this.setState({
            loading: true
        });
        let {onSubmit} = this.props;
        onSubmit && onSubmit(this.props.entity, {value: this.state.value, remark: this.state.remark, content: this.state.content, time:this.state.time}, success);
    }
    cancelClick() {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    
}
export default RectifyReport;