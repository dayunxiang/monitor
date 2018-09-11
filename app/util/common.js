import "whatwg-fetch";

 function cloneObj(initalObj) {
	if (!initalObj) return null;
	var obj = null;
    
    obj = JSON.parse(JSON.stringify(initalObj));
    
    return obj;
}
 function getRandomColor() {
	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
}
 function getRandomNum(a, b) {
	return Math.random()*(b-a) + a;
}

 function postData(url,data) {
	return  fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: appendParam(data)
    });
}

function appendParam(data) {
	if (data) {
		var str = "";
		for(var key in data){
			if (data.hasOwnProperty(key)) {
				str += key+"="+data[key] +"&"
			}
		}
		return str;
	}
}
export {cloneObj,getRandomColor,getRandomNum,postData}