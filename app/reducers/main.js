import * as actionTypes from '../constants/main.js';
import home from './home.js';
import monitor from './monitor.js';
import { combineReducers } from 'redux';
const initialState = {
	monitor:{show:true},
	home:{}
};

function mainInfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_MONITOR:
			for(let key in state){
				state[key].show = false;
				state.monitor.show = true;
			}
            return {...state};
        case actionTypes.ADD_HOME:
        	for(let key in state){
				state[key].show = false;
				state.home.show = true;
			}
            return {...state};
        default:
            return state;
    }
}

export default combineReducers({
    home, monitor, show:mainInfo
});