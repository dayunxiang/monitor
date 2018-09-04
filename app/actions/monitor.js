import * as actionTypes from '../constants/monitor.js';

export function showMonitor(data) {
    return {
        type: actionTypes.SHOW_MONITOR,
        data: data
    };
}