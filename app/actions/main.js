import * as actionTypes from '../constants/main.js';

export function addMonitor(data) {
    return {
        type: actionTypes.ADD_MONITOR,
        data: data
    };
}
export function addHome(data) {
    return {
        type: actionTypes.ADD_HOME,
        data: data
    };
}