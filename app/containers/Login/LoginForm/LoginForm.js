import React from 'react';
import { Button ,Input, Icon } from '../../../components/Antd.js';
// import { Button ,Input, Icon } from 'antd';

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            passowrd: null,
            loading: false,
        }
        
    }
    render() {
        var {show} = this.props;
        return (
            <div id="lgForm" style={{display:(show?"block":"none")}}>
                <div className="logo-cont"><img src={require("../../../statics/img/qp.png")} alt=""/></div>
                <div className="vk-username-cont">
                    <Input
                        placeholder="请输入用户名"
                        prefix={<Icon type="user" />}
                        onChange={this.onChangeUserName.bind(this)}
                        ref={node => this.userNameInput = node}
                      />
                </div>
                <div className="vk-password-cont">
                     <Input 
                        type='password'
                        placeholder="请输入密码"
                        prefix={<Icon type="lock" />}
                        onChange={this.onChangePassword.bind(this)}
                        ref={node => this.userPasswordInput = node}
                        onKeyDown={this.onkeyDown.bind(this)}
                      />
                </div>
                <div className="vk-btns-cont">
                    <Button type="primary" onClick={this.submit.bind(this)} loading={this.state.loading}>登 录</Button>
                </div>
            </div>
        )
    }
    submit() {
        this.setLoading(true);
        this.props.login(this.state.username, this.state.passowrd );
    }
    onChangeUserName(e) {
        this.setState({
            username:e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            passowrd:e.target.value
        })
    }
    setLoading(flag) {
        this.setState({
            loading:flag
        });
    }
    onkeyDown(e) {
        if (e.keyCode === 13) {
            this.props.login(this.state.username, this.state.passowrd );
        }
    }
}

export default LoginForm;