import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, browserHistory } from 'react-router'
import configureStore from './store/store'
const history = _DEV_ ? hashHistory: browserHistory;

// 创建 Redux 的 store 对象
const store = configureStore()

import RouteMap from './router/router.js'


render(
    <Provider store={store}>
        <RouteMap history={history}/>
    </Provider>,
    document.getElementById('root')
)