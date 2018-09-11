import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'
import LoginForm from '../../components/LoginForm/LoginForm.js';
import * as userinfoActions from '../../actions/userAction.js'
import { postData, getRandomColor ,getRandomNum} from '../../util/common.js';
import { postLogin } from '../../data/dataStore.js';

import { Modal} from '../../components/Antd.js';
// import { Modal} from 'antd';
import './style.css'
import Ball from './canvas/ball.js';
import Board from './canvas/board.js';
import Item from './canvas/item.js';
import Enginee from './canvas/enginee.js';
import Buff from './canvas/buff.js';
function logger(target, name, descriptor){
    console.log(target, name, descriptor);
    let func = descriptor.value ;
    descriptor.value = function(){
        console.log(this,"loggerDes");
        return func.apply(this, arguments);
    }
    // return descriptor;
}

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            gg:false,
            showform:true,
            crashNum:1,
        }
        this.keys ={};
        console.log(this.props.param,hashHistory)
    }

    render() {
        return (
            <div ref="loginCont" className="vk-login-cont">
                <canvas id="canvas" ref="canvas" width="1300" height="700" ></canvas>
                <LoginForm ref='LoginForm' show={this.state.showform} login={this.login.bind(this)}/>
            </div>
        )
    }

    @logger
    login(username, password) {
        if (true) {
            // window.setTimeout(() => {
            //     this.refs.LoginForm.setLoading(false);
            //     this.props.userInfoActions.loginSuccess({username:username,id:1});
            //     this.jumpToHome();
            // },2000);
            
            postLogin( {username:username, password:password}).then(res => {
                return res.json()
            }).then(json => {
                this.refs.LoginForm.setLoading(false);
                if (json.code === 0) {
                    
                    this.props.userInfoActions.loginSuccess(json.data);
                    window.sessionStorage.setItem("userinfo",JSON.stringify(json.data) );
                    this.jumpToHome();
                }
            }).catch( ex => {
                this.refs.LoginForm && this.refs.LoginForm.setLoading(false);
            })
            this.jumpToHome();
            
        }
        this.setState({
            showform:true
        });
        
    }
    componentDidMount() {
        var loginCont = this.refs.loginCont, canvas= this.refs.canvas;
        var windowH = window.innerHeight,windowW = window.innerWidth;
        var h = (windowH ) > 500 ? (windowH ) : (500 );
        loginCont.style.height = h+"px";
        canvas.height = h;
        canvas.width = windowW;
        this.onresize = ()=>{
            var windowH = window.innerHeight,windowW = window.innerWidth;
            var h = (windowH) > 500 ? (windowH ) : (500 );
            loginCont.style.height = h+"px";
            canvas.height = h;
            canvas.width = windowW;
            this.restartGame();
            // canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);
        }
        window.addEventListener("resize", this.onresize)
        if (DEV) {
            console.log("开发版本", DEV);
        }else{
            console.log("发布版本", DEV);
            
        }
        this.startGame();

        console.log(this.props.params);

        // import(/*webpackChunkName:'test'*/'../../components/test.js').then((module) => {
        //     var Com = module.default;
        //     var test = <Com />;
        //     console.log(test)
        // })
    }
    
    componentWillUnmount(){
        window.removeEventListener("resize", this.onresize);
        window.removeEventListener("keydown", this.gameKeydown);
        window.removeEventListener("keydown", this.gameKeyup);
        this.stopAnimation();
        this.modal && this.modal.destroy();
    }
    
    jumpToHome() {
        hashHistory.push('/main');
    }

    updateUserinfo() {

    }
    startGame(){

        // var cnv = document.getElementById("canvas");
        var cnv = this.refs.canvas;
        var cxt = cnv.getContext("2d");
        var balls = [],items = [];
        // for (var i = 0; i < 30; i++) {
        //  var ball = new Ball(getRandomNum(0, cnv.width), getRandomNum(0, cnv.height), 0 ,getRandomColor());
        //  ball.vx = getRandomNum(-2,2);
        //  ball.vy = getRandomNum(-2,2);
        //  balls.push(ball);
        // }
        var ball1 = new Ball(cnv.width/2,cnv.height/2);
        ball1.vx = 3;
        ball1.vy = 3;
        ball1.color="#ff0000"
        var board = new Board(cnv.width*0.5,cnv.height*0.9, 50, 20 );
        board.vx = 0;
        var enginee = new Enginee(cnv);
        enginee.addBall(ball1);
        enginee.setBoard(board);
        for (var i = 0; i < 50; i++) {
            var cnvw10 =cnv.width/10, cnvw20 = cnv.width/20;
            var height = 20;
            var item = new Item((i%10)*cnvw10+10,parseInt(i/10)*(height+10), cnvw20, height, getRandomColor());
            items.push(item);
        }
        enginee.addItems(items);
        var buff = new Buff(getRandomNum(0, cnv.width),13,null, null,1, 6000);
        enginee.addBuff(buff);
        enginee.on("itemCrash", this.itemCrash.bind(this));
        enginee.on("goodGame", this.goodGame.bind(this));
        this.gameKeydown = this.gameKeydown.bind(this);
        this.gameKeyup = this.gameKeyup.bind(this);
        this.enginee = enginee;
        window.addEventListener("keydown", this.gameKeydown);
        window.addEventListener("keyup", this.gameKeyup);
        // this.timer = null;
        var _this = this;
        enginee.run();
        // this.goAnimation(cnv);
    }

    
    stopAnimation(){
        this.enginee.stop();
        // window.cancelAnimationFrame(this.timer)
    }
    restartGame(){
        if (this.modal) {
            this.modal.destroy();
        }
        this.setState({
            crashNum:0
        });
        this.stopAnimation();
        var cnv = this.refs.canvas, items = [];
        for (var i = 0; i < 50; i++) {
            var cnvw10 =cnv.width/10, cnvw20 = cnv.width/20;
            var height = 20;
            var item = new Item((i%10)*cnvw10+10,parseInt(i/10)*(height+10), cnvw20, height, getRandomColor());
            items.push(item);
        }
        this.enginee.clearItems().addItems(items);
        var ball1 = new Ball(cnv.width/2,cnv.height/2);
        ball1.vx = 3;
        ball1.vy = 3;
        ball1.color="#ff0000";
        this.enginee.clearBalls().addBall(ball1);
        this.enginee.run();
        // this.goAnimation(cnv);
    }
    
    gameKeydown( e){
        var code = e.keyCode;
        this.confirmKey(code, true);
             
    }
    gameKeyup( e){
        var code = e.keyCode;
        this.confirmKey(code, false);
          
    }
    confirmKey(code, isDown){
        switch(code){
            case 65:
                if (isDown) {
                    this.enginee.getBoard().vx = -5;
                }else{
                    this.enginee.getBoard().vx = 0;
                }
                this.keys[code] = isDown;
                break;
            case 68:
                if (isDown) {
                    this.enginee.getBoard().vx = 5;
                }else{
                    this.enginee.getBoard().vx = 0;
                }
                this.keys[code] = isDown;
                break;
        }
        for(var key in this.keys){
            if(this.keys[key]){
                switch(key){
                    case "65":
                        this.enginee.getBoard().vx = -5;
                        break;
                    case "68":
                        this.enginee.getBoard().vx = 5;
                        break;
                }
            }
        }
    }   
    itemCrash(){
        this.setState({
            crashNum: ++this.state.crashNum
        },() => {
            if (this.state.crashNum>2) {
                this.setState({
                    showform:true,
                });
            }
            if (this.state.crashNum%5===0) {
                var thisball = this.enginee.getBall(0);
                this.enginee.getBall(0).vx *=1.2;
                this.enginee.getBall(0).vy *=1.2;
            }
        });
    }
    goodGame(){
        this.stopAnimation();
        this.modal = Modal.confirm({
            title: '失败了',
            content: '是否继续?.',
            okText: '确认',
            cancelText: '取消',
            onOk: this.confirmOk.bind(this)
        });
    }

    confirmOk(){
        this.restartGame();
    }


}


// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userinfoActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)