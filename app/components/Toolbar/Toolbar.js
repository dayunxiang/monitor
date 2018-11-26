import React from 'react';
import { Button, Icon , Menu ,Dropdown} from '../Antd.js';

import "./style.css";

class Toolbar extends React.Component {
  	constructor(props, context) {
        super(props, context);
        this.state = {
            buttons: [
                {text:"新增",icon:"file-add", type:"new"},
                {text:"修改",icon:"edit", type:"edit"},
                {text:"删除",icon:"close", type:"remove"},
                {text:"保存",icon:"save", type:"save"},
                {text:"取消",icon:"reload", type:"cancel"},
            ],
            extButtons: [
                {text:"上一行",icon:"file-add", type:"pre"},
                {text:"下一行",icon:"file-add", type:"next"},
            ],
            status: 1, //1 普通状态,2新增状态 ,3修改状态,
            saveing:false //保存状态
        };

    }

    render() {
        var dropDown = "";
        if (this.state.extButtons && this.state.extButtons.length ) {
            var more = <Menu onClick={this.extBtnClick.bind(this, this.state.status)}>
                {
                    this.state.extButtons.map((item, i) => {<Menu.Item key={item.type}>{item.text}</Menu.Item>;})
                }
            </Menu>;
            dropDown = <Dropdown overlay={more} trigger={['click']}>
                <Button type="primary" size="small" icon="down" title="更多">
                </Button>
            </Dropdown>
        } 
	    return (
	      	<div ref="toolCont" className="vk-toolbar-cont">
                {
                    this.calBtns(this.state.status).map((item, i) => {
                        return   <Button key={item.type} type="primary" icon={item.icon} size="small" loading={item.type === "save" ? this.state.saveing : false} onClick={this[item.type+"Click"].bind(this)}>{item.text}</Button>

                    })
                }
                { dropDown }
            </div>
	    );
    }
    componentWillReceiveProps(){
        
    }
    componentDidMount(){
    	var w = this.refs.toolCont.clientWidth;
       
    }
    extBtnClick(state,item){
        let { extBtnClick } = this.props;
        if (extBtnClick) {
            extBtnClick(state, item);
        }
    }
    newClick(e){
        e.preventDefault();
        
        let { newClick } = this.props;
        if (newClick) {
            newClick(() =>{
                this.showBtns(2);
            });
        }
    }
    editClick(e){
        let { editClick } = this.props;
        
        if (editClick) {
            editClick(() =>{
                this.showBtns(3);
            });
        }
    }
    removeClick(e){
        let { removeClick } = this.props;
        if (removeClick) {
            removeClick();
        }
    }
    saveClick(e){
        let { saveClick } = this.props;
        this.setState({
            saveing:true
        })
        if (saveClick) {
            saveClick(this.state.status ,(success) => {
                this.showBtns(1);
                this.setState({
                    saveing:false
                });
            },(err) => {
                this.setState({
                    saveing:false
                });
            });
        }
    }
    cancelClick(e){
        let { cancelClick } = this.props;
        this.showBtns(1);
        if (cancelClick) {
            cancelClick();
        }
    }
    showBtns(status){
        var buttons = this.state.buttons;
        this.setState({
            status:status
        });
    }
    calBtns(status){
        var { buttons } = this.state;
        switch(status){
            case 1:
                return buttons.filter(function(item){
                    if (item.type !== "save" && item.type !== "cancel") {
                        return true;
                    }
                    return false;
                });
            case 2:
                return buttons.filter(function(item){
                    if (item.type === "save" || item.type === "cancel") {
                        return true;
                    }
                    return false;
                });
            case 3:
                return buttons.filter(function(item){
                    if (item.type === "save" || item.type === "cancel") {
                        return true;
                    }
                    return false;
                });
            default:
                return [];

        }
        
    }
	
}
export default Toolbar;