import * as actionTypes from '../constants/userinfo'

let initialState = {};
try {
    let userInfoStr = window.sessionStorage && window.sessionStorage.getItem("userinfo");
    if (userInfoStr) {
        initialState = JSON.parse(userInfoStr);
    }
} catch(e) {

}


export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_LOGIN_SUCCESS:
            return action.data;
        case actionTypes.USERINFO_LOGIN_OUT:
            return {};
        default:
            return state;
    }
}