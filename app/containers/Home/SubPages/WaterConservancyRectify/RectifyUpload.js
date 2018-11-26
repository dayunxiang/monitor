import React from 'react';
import { Row, Col, Input, Modal, Button, Icon, message, Upload} from '../../../../components/Antd.js';
import "./RectifyNotice.css";
class RectifyUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            content: "",
            remark: ""
        };

    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <Row>
                <Col xs={24}>
                    <Col xs={8}><label className="ps-search-label">整改报备</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">备注</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputRemarkChange.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改照片</label></Col>
                    <Col xs={16}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview.bind(this)}
                            onChange={this.handleChange.bind(this)}
                            beforeUpload={(file) => {
                                this.setState(({ fileList }) => ({
                                  fileList: [...fileList, file],
                                }));
                                return false;
                            }}
                        >
                          {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
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
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    handleChange({fileList}) {
        this.setState({ fileList })
    }
    handleCancel() {
        this.setState({ previewVisible: false })
    }
    inputChange(e) {
        let content = e.target.value;
        this.setState({ content});
    }
    inputRemarkChange(e) {
        let remark = e.target.value;
        this.setState({ remark});
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
        onSubmit && onSubmit(this.props.entity, {fileList:this.state.fileList, content: this.state.content, remark: this.state.remark}, success);
    }
    cancelClick() {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    componentDidMount() {
        
    }
    static getDerivedStateFromProps(props, state) {
        let nextState = {
            previewVisible: state.previewVisible,
            previewImage: state.previewImage,
            fileList: state.fileList
        }
        if (props.show === false) {
            nextState.fileList = [];
        }
        return nextState;
    }
}

export default RectifyUpload;