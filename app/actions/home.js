import * as actionTypes from '../constants/home.js';
export function showHome(data) {
    return {
        type: actionTypes.SHOW_HOME,
        data: data
    };
}


export function updateTreeData(data) {
    return {
        type: actionTypes.UPDATAE_TREE,
        data: data
    }
}

export function addTab(data) {
    return {
        type: actionTypes.ADD_TAB,
        data: data
    }
}

export function removeTab(data) {
    return {
        type: actionTypes.REMOVE_TAB,
        data: data
    }
}

export function activeTab(data) {
    return {
        type: actionTypes.ACTIVE_TAB,
        data: data
    }
}

export function reset() {
    return {
        type: actionTypes.RESET
    }
}
export function callLayout(data) {
    return {
        type: actionTypes.CALL_LAYOUT,
        data: data
    }
}