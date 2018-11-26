import React from 'react';
import ReactDOM from 'react-dom'
import "./style.css";
import {Button} from "../Antd.js"

class Modal extends React.Component {
     constructor(props, context) {
        super(props, context);
        this.state = {
            anClassName: "vk-md-hide",
            visible: false
        };
    }

    render() {
        let { title, visible, width, okText, cancelText } = this.props;
        // if (!visible) {
        //     return null;
        // }

        let dom = <div className={"vk-md-main " + this.state.anClassName}>
            <div className={"vk-mask"  } onClick={this.close.bind(this)} ></div>
            <div className={"vk-md-wrap " } onClick={this.close.bind(this)}>
                <div className="vk-md-cont" style={{width: width ? width : 520}} onClick={this.contClick.bind(this)}>
                    <Button icon="close" className="vk-md-close" onClick={this.close.bind(this)}></Button>
                    <div className="vk-md-header">{title?title:"Modal" }</div>
                    <div className="vk-md-body">{this.props.children}</div>
                    <div className="vk-md-footer">
                        <span>
                            <Button type="primary" loading={this.props.confirmLoading} onClick={this.okClick.bind(this)}>{okText ? okText : "确认"}</Button>
                            <Button type="default" onClick={this.cancelClick.bind(this)}>{cancelText ? cancelText : "取消"}</Button>
                        </span>
                    </div>
                </div>
            </div>
        </div>;
        
        return ReactDOM.createPortal(dom, document.getElementsByTagName("body")[0]);
     
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.visible === this.state.visible) return
        if (this.state.visible) {
            this.setState({
                anClassName: "vk-md-enter"
            });
            window.setTimeout(() => {
                this.setState({
                    anClassName: "vk-md-visible"
                });
            },1);
        }else {
            this.setState({
                anClassName: "vk-md-leave"
            });
            window.setTimeout(() => {
                this.setState({
                    anClassName: "vk-md-hide"
                });
            },500);
        }
        
    }
    componentDidMount() {
        if (this.state.visible) {
            this.setState({
                anClassName: "vk-md-enter"
            });
            window.setTimeout(() => {
                this.setState({
                    anClassName: "vk-md-visible"
                });
            },1);
        }else {
            
            this.setState({
                anClassName: "vk-md-hide"
            });
        }
    }
    close() {
        let { onClose } = this.props;
        
        // window.setTimeout(() => {
            onClose && onClose();
            
        // },500)
        
        
    }
    contClick(e) {
        e.stopPropagation();
    }
    okClick() {
        let {onOk } = this.props;
        onOk();
    }
    cancelClick() {
        this.close();
    }
    // componentWillReceiveProps(nextProps) {
        // if (nextProps.visible === this.props.visible) return;
        // if (nextProps.visible) {
        //     this.setState({
        //         anClassName: "vk-md-enter"
        //     });
        //     window.setTimeout(() => {
        //         this.setState({
        //             anClassName: "vk-md-visible"
        //         });
        //     },1);
        // } else {
        //     this.setState({
        //         anClassName: "vk-md-leave"
        //     });
        //     window.setTimeout(() => {
        //         this.setState({
        //             anClassName: "vk-md-hide"
        //         });
        //     },500);
        // }
        // if (nextProps.visible) {
        //     this.setState({
        //         anClassName: "vk-md-visible"
        //     });
        // }else{
        //     this.setState({
        //         anClassName: "vk-md-hide"
        //     });
        // }
        // window.setTimeout(() => {
        //     this.setState({
        //         visible: nextProps.visible
        //     });
        // })
    // }
    static getDerivedStateFromProps(props, state) {
        return {
            visible: props.visible,
            // anClassName: props.visible ? "vk-md-enter" : "vk-md-leave"
        };
    }
}
export default Modal;