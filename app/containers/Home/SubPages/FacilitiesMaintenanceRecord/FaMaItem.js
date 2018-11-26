import React from 'react';
import { Modal, Carousel} from '../../../../components/Antd.js';
const Fragment = React.Fragment;

class FaMaItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            showModal: false,
            imgs: null
        };

    }

    render() {
        let { entity } = this.props;
        if (!entity) {
            entity ={};
        }
        let beforeImgs = entity.conMainImageVO && entity.conMainImageVO.preInfo && entity.conMainImageVO.preInfo.images;
        if (Array.isArray(beforeImgs)) {
            beforeImgs = beforeImgs.map((item, i) => {
                return <img className="ps-fm-img" key={i} src={"/api/" + item.replace("images/", "images/thumb/")} alt="图片"/>;
            });
        }
        let durImgs = entity.conMainImageVO && entity.conMainImageVO.durInfo && entity.conMainImageVO.durInfo.images;
        if (Array.isArray(durImgs)) {
            durImgs = durImgs.map((item, i) => {
                return <img className="ps-fm-img" key={i} src={"/api/" + item.replace("images/", "images/thumb/")} alt="图片"/>;
            });
        }
        let afterImgs = entity.conMainImageVO && entity.conMainImageVO.afterInfo && entity.conMainImageVO.afterInfo.images;
        if (Array.isArray(afterImgs)) {
            afterImgs = afterImgs.map((item, i) => {
                return <img className="ps-fm-img" key={i} src={"/api/" + item.replace("images/", "images/thumb/")} alt="图片"/>;
            });
        }
        return (
            <Fragment>
                <table className="ps-fama-table" border="1">
                    <tbody>
                        <tr>
                            <td width="4%">编号</td>
                            <td width="32%"colSpan="3" className="ps-weight-label">{entity.rectificationSerial}</td>
                        </tr>
                        <tr>
                            <td className="ps-weight-label">照片</td>
                            <td onClick={this.imgBeforeClick.bind(this)}>{beforeImgs}</td>
                            <td onClick={this.imgDurClick.bind(this)}>{durImgs}</td>
                            <td onClick={this.imgAfterClick.bind(this)}>{afterImgs}</td>
                        </tr>
                        <tr>
                            <td width="4%" className="ps-weight-label">描述</td>
                            <td width="32%">整改前</td>
                            <td width="32%">整改中</td>
                            <td width="32%">整改后</td>
                        </tr>
                    </tbody>
                </table>
                {this.createCarousel()}
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
            return <div key={i}><img key={"bigimg"+i} className="ps-fm-img-big" alt="图片" src={"/api/" + item} /></div>;
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
    imgBeforeClick() {
        let { entity } = this.props;
        let imgs = entity && entity.conMainImageVO && entity.conMainImageVO.preInfo && entity.conMainImageVO.preInfo.images;
        if (!Array.isArray(imgs)) return;
        this.setState({
            showModal: true,
            selImgs: imgs
        });
    }
    imgDurClick() {
        let { entity } = this.props;
        let imgs = entity && entity.conMainImageVO && entity.conMainImageVO.durInfo && entity.conMainImageVO.durInfo.images;
        if (!Array.isArray(imgs)) return;
        this.setState({
            showModal: true,
            selImgs: imgs
        });

    }
    imgAfterClick() {
        let { entity } = this.props;
        let imgs = entity && entity.conMainImageVO && entity.conMainImageVO.afterInfo && entity.conMainImageVO.afterInfo.images;
        if (!Array.isArray(imgs)) return;
        this.setState({
            showModal: true,
            selImgs: imgs
        });

    }
    
}
export default FaMaItem;