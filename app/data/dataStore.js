import { postData } from "../util/common.js";

//登录接口
export function postLogin(data){
	return postData("/api/login", data);
}