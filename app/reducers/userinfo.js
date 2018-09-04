import * as actionTypes from '../constants/userinfo'

let initialState = {};
let userInfoStr = window.sessionStorage.getItem("userinfo");
if (userInfoStr) {
	initialState = JSON.parse(userInfoStr);
}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_LOGIN_SUCCESS:
            return action.data;
        default:
            return state;
    }
}