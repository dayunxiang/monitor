import "whatwg-fetch";
if (!window.requestAnimationFrame) {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function(id) {
                window.clearTimeout(id);
            };
    })();
}
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

 function postData(url, data) {
    url = true ? ("/api"+url) : url;

	return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: data ? appendParam(data) : null
    }).then((res) => {
        let cloneRes = res.clone();
        try {
            let d = cloneRes.json();
            d.then((data) => {
                // console.log(data);
            });
        } catch (ex) {
            
        }
        return res;
    })
}

function postJSONData(url, data) {
    url = true ? ("/api"+url) : url;
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        // 注意 post 时候参数的形式
        body: data ? JSON.stringify(data) : null
    });
}
function postFormData(url, data) {
    url = true ? ("/api"+url) : url;
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            // 'Accept': 'application/json, text/plain, */*',
            // 'Content-Type': 'application/json'
        },
        // 注意 post 时候参数的形式
        body: data
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
/*将度转换成为度分秒*/
export function formatDegree(value) { 
    value = Math.abs(value);  
    var v1 = Math.floor(value);//度  
    var v2 = Math.floor((value - v1) * 60);//分  
    v2 < 10 ? (v2 = "0"+v2) : v2;
    var v3 = Math.round((value - v1) * 3600 % 60);//秒  
    v3 < 10 ? (v3 = "0"+v3) : v3;
    return v1 + '°' + v2 + '\'' + v3 + '"';  
}
export {cloneObj, getRandomColor, getRandomNum, postData, postJSONData, postFormData}

export function throttle(method, delay) {
    var timer=null;
    return function(...args) {
        // var context = this, args = arguments;
        window.clearTimeout(timer);
        timer = window.setTimeout(()=> {
            method.apply(this, args);
        }, delay);
    };
}