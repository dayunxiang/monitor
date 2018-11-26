import React from 'react';
// import { Tree, Menu, Icon} from '../Antd.js';
import { Row, Col, Input, Button} from '../../../../components/Antd.js';

class RectifyConfirm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            value: ""
        };

    }

    render() {
        return (
            <Row>
                <Col xs={24}>
                    <Col xs={8}><label className="ps-search-label">审批意见</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
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
        })
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
        onSubmit && onSubmit(this.props.entity, {content: this.state.value}, success);
    }
    cancelClick() {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    
}
export default RectifyConfirm;