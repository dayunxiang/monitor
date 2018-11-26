
import React from 'react';
import { Modal, Carousel, Button} from '../../../../components/Antd.js';
const Fragment = React.Fragment;
import ImageUpload from "./ImageUpload.js"

class WaterTransferItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            showModal: false,
            imgs: null,
            showUpload: false,
        };

    }

    render() {
        let { entity } = this.props;
        if (!entity) {
            entity ={};
        }
        let beforeModel = [], afterModel = [], beforeImgs, afterImgs, beforeRemark = [], afterRemark = [];
        if (Array.isArray(entity.imageDispayVOList)) {
            for (var i = 0; i < entity.imageDispayVOList.length; i++) {
                let d = entity.imageDispayVOList[i];
                if (d.displayOrder ===1) {
                    beforeModel.push(d);
                    beforeRemark.push(d.remark?d.remark:"无描述");
                }else{
                    afterModel.push(d);
                    afterRemark.push(d.remark?d.remark:"无描述");
                }
            }
        }
        
        if (beforeModel.length) {
            beforeImgs = beforeModel.map((item, i) => {
                return <img className="ps-wt-img" key={i} src={"/api/" + item.imgUrl.replace("images/", "images/thumb/")} alt="图片"/>;
            });
        }
        if (afterModel.length) {
            afterImgs = afterModel.map((item, i) => {
                return <img className="ps-wt-img" key={i} src={"/api/" + item.imgUrl.replace("images/", "images/thumb/")} alt="图片"/>;
            });
        }
        return (
            <Fragment>
                <table className="ps-wt-table" border="1">
                    <tbody>
                        <tr>
                            <td width="10%" rowSpan="2">编号</td>
                            <td width="40%" className="ps-weight-label" onClick={this.imgBeforeClick.bind(this, beforeModel)}>{beforeImgs}</td>
                            <td width="40%" className="ps-weight-label" onClick={this.imgAfterClick.bind(this, afterModel)}>{afterImgs}</td>
                           
                        </tr>
                        <tr>
                            <td className="ps-weight-label">描述:{beforeRemark.join(",")}</td>
                            <td className="ps-weight-label">描述:{afterRemark.join(",")}</td>
                        </tr>
                       
                    </tbody>
                </table>
                {this.createCarousel()}
                {this.createUpload()}
            </Fragment>
        );
    }
    
    componentDidMount() {
        
    }
    getImgDiv(model) {
    }
    createCarousel() {
        if (!this.state.showModal) return;
        if (!this.state.selImgs || !this.state.selImgs.length) return;
        let imgs = this.state.selImgs.map((item, i) => {
            return <div key={i}><img key={"bigimg"+i} className="ps-wt-img-big" alt="图片" src={"/api/" + item.imgUrl} /></div>;
        });
        return (
            <Modal
                title="整改"
                footer={false}
                width={"80%"}
                destroyOnClose
                visible={this.state.showModal}
                onOk={() => { this.setState({showModal: false})}}
                onCancel={() => { this.setState({showModal: false})}}>
                <Carousel autoplay>
                    {imgs}
                </Carousel>
            </Modal>
        );
    }
    createUpload() {
        let modal = <Modal ref={(node)=>{this.up = node}}
            title="上传图片"
            footer={false}
            width={"60%"}
            destroyOnClose
            visible={this.state.showUpload}
            onOk={() => { this.setState({showUpload: false})}}
            onCancel={() => { this.setState({showUpload: false})}}>
            <ImageUpload onSubmit={this.imageUploadSubmit.bind(this)} onCancel={() => { this.setState({showUpload: false})}} entity={this.props.entity}></ImageUpload>
        </Modal>;
        return modal;
    }
   
    onUploadClick() {
        this.setState({
            showUpload: true
        })
    }
    imageUploadSubmit(entity, value, succss) {
        let thisSuccess = () => {
            succss();
            this.setState({showUpload: false});
        };
        let { onSubmit } = this.props;
        onSubmit && onSubmit(entity, value, thisSuccess);
    }
    imgBeforeClick(beforeModel) {
        if (!Array.isArray(beforeModel)) return;
        this.setState({
            showModal: true,
            selImgs: beforeModel
        });

    }
    imgAfterClick(afterModel) {
        if (!Array.isArray(afterModel)) return;
        this.setState({
            showModal: true,
            selImgs: afterModel
        });

    }
}
export default WaterTransferItem;