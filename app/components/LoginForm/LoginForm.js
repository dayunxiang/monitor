import React from 'react';
import { Button ,Input, Icon } from '../Antd.js';
// import { Button ,Input, Icon } from 'antd';

class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            passowrd: null,
            loading: false,
        }
        this.containerStyle = {
            width:'400px',
            // height: '300px',
            position:'absolute',
            top:"50%",
            left:"50%",
            marginLeft:"-200px",
            marginTop: "-40px"
        }
    }
    render() {
        var {show} = this.props;
        return (
            <div id="lgForm" style={{display:(show?"block":"none"),...this.containerStyle}}>
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
}

export default LoginForm;