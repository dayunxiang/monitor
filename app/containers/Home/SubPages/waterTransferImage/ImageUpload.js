import React from 'react';
import { Row, Col, Input, Modal, Button, Icon, message, Upload, Select} from '../../../../components/Antd.js';
const Option = Select.Option;

class ImageUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            content: "",
            type: null
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
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">照片类别</label></Col>
                    <Col xs={16}>
                        <Select style={{width: "100%"}} defaultValue={1} onChange={this.inputTypeChange.bind(this)}>
                            <Option value={1}>调水前</Option>
                            <Option value={2}>调水后</Option>
                        </Select>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
                    </Col>
                </Col>
                
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">上传照片</label></Col>
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
    inputTypeChange(e) {
       
        this.setState({ type: e});
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
        onSubmit && onSubmit(this.props.entity, {fileList:this.state.fileList, content: this.state.content, type: this.state.type}, success);
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

export default ImageUpload;