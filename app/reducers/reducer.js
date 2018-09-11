import { combineReducers } from 'redux'
import userinfo from './userinfo'
import home from './home.js'
// import main from './main.js';

export default combineReducers({
    userinfo, home
});