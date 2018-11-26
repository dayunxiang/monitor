import React from 'react';
import { Row, Col, Input, Modal, Button, Icon, message, Upload, Select} from '../../../../components/Antd.js';
const Option = Select.Option;

class WaterTransferForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            content: "",
            previewVisible2: false,
            previewImage2: '',
            fileList2: [],
            content2: "",
            previewVisible3: false,
            previewImage3: '',
            fileList3: [],
            content3: "",
        };

    }

    render() {
        const { previewVisible, previewImage, fileList,previewVisible2, previewImage2, fileList2, previewVisible3, previewImage3, fileList3 } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        
        return (
            <Row>
                
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改前描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange.bind(this)}></Input>
                    </Col>
                </Col>
                
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改前照片</label></Col>
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
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改中描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange2.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改中照片</label></Col>
                    <Col xs={16}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList2}
                            onPreview={this.handlePreview2.bind(this)}
                            onChange={this.handleChange2.bind(this)}
                            beforeUpload={(file) => {
                                this.setState(({ fileList }) => ({
                                  fileList2: [...fileList, file],
                                }));
                                return false;
                            }}
                        >
                          {fileList2.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                        </Modal>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改后描述</label></Col>
                    <Col xs={16}>
                        <Input onChange={this.inputChange3.bind(this)}></Input>
                    </Col>
                </Col>
                <Col xs={24} className="ps-rect-margintop10">
                    <Col xs={8}><label className="ps-search-label">整改后照片</label></Col>
                    <Col xs={16}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList3}
                            onPreview={this.handlePreview3.bind(this)}
                            onChange={this.handleChange3.bind(this)}
                            beforeUpload={(file) => {
                                this.setState(({ fileList }) => ({
                                  fileList3: [...fileList, file],
                                }));
                                return false;
                            }}
                        >
                          {fileList3.length >= 5 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible3} footer={null} onCancel={this.handleCancel3.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage3} />
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
    handlePreview2(file) {
        this.setState({
            previewImage2: file.url || file.thumbUrl,
            previewVisible2: true
        });
    }
    handleChange2({fileList}) {
        this.setState({ fileList2: fileList })
    }
    handleCancel2() {
        this.setState({ previewVisible2: false })
    }
   
    inputChange2(e) {
       let content = e.target.value;
        this.setState({ content2: content});
    }
    handlePreview3(file) {
        this.setState({
            previewImage3: file.url || file.thumbUrl,
            previewVisible3: true
        });
    }
    handleChange3({fileList}) {
        this.setState({ fileList3: fileList })
    }
    handleCancel3() {
        this.setState({ previewVisible3: false })
    }
   
    inputChange3(e) {
       let content = e.target.value;
        this.setState({ content3: content});
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
        onSubmit && onSubmit(this.props.entity, {fileList: this.state.fileList, content: this.state.content, fileList2: this.state.fileList2, content2: this.state.content2,fileList3: this.state.fileList3, content3: this.state.content3}, success);
    }
    cancelClick() {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
    componentDidMount() {
        
    }
    // static getDerivedStateFromProps(props, state) {
    //     let nextState = {
    //         previewVisible: state.previewVisible,
    //         previewImage: state.previewImage,
    //         fileList: state.fileList
    //     }
    //     if (props.show === false) {
    //         nextState.fileList = [];
    //     }
    //     return nextState;
    // }
}

export default WaterTransferForm;