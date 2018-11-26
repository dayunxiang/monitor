import * as actionTypes from '../constants/userinfo'

export function loginSuccess(data) {
    return {
        type: actionTypes.USERINFO_LOGIN_SUCCESS,
        data
    }
}
export function loginFailure(data) {
    return {
        type: actionTypes.USERINFO_LOGIN_FAILURE,
        data
    }
}

export function loginOut(data) {
    return {
        type: actionTypes.USERINFO_LOGIN_OUT,
        data
    }
}