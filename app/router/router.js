import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import App from '../containers'
// import Home from '../containers/Home'
// import Login from '../containers/Login'
// import Chess from '../containers/Chess'
import NotFoundPage from '../containers/NotFound';
import Test from '../containers/Test/Test.js';


// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps
// const loginContainer = (location, cb) => {
//     require.ensure([], require => {
//         cb(null,require('../containers/Login').default)
//     },"login")
// }
const loginContainer = (location, cb) => {
    import(/*webpackChunkName:'login'*/'../containers/Login').then((module) => {

        cb(null, module.default);
    });
    // require.ensure([], require => {
    //     cb(null,require('../containers/Login').default)
    // },"login")
}
// const homeContainer = (location, cb) => {
//     console.log(0);
//     require.ensure([], require => {
//         console.log(1);
//         cb(null,require('../containers/Home').default);
//         console.log(2);
//     },"home")
// }
const homeContainer = (location, cb) => {
   import(/*webpackChunkName:'home'*/"../containers/Home").then((module) => {
        cb(null, module.default);
   })
}

const mainContainer = (location, cb) => {
   import(/*webpackChunkName:'main'*/"../containers/Main").then((module) => {
        cb(null, module.default);
   })
}
class RouterMap extends React.Component {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute getComponent={loginContainer}/>
                    <Route path='/login' getComponent={loginContainer} />
                    <Route path='/home'  getComponent={homeContainer} />
                    <Route path='/main'  getComponent={mainContainer} />
                    <Route path='/notfound' component={NotFoundPage} />
                    <Route path='/test' component={Test} />
                    <Redirect from='*' to='/notfound' />
                </Route>
            </Router>
        )
    }
}

export default RouterMap
