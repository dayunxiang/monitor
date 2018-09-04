import { combineReducers } from 'redux'
import userinfo from './userinfo'
// import homeInfo from './home.js'
import main from './main.js';

export default combineReducers({
    userinfo, main
});