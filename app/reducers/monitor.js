import * as actionTypes from '../constants/monitor.js';

const initialState = { show: true };

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_MONITOR:
            return {...state, show:action.data};
        default:
            return state;
    }
}