import * as actionTypes from '../constants/home.js'

const initialState = { tabData:[],tabIndex:0 };

//
const findTabIndex = (arr, data) => {
	for (var i = 0; i < arr.length; i++) {
		var a = arr[i];
		if (a.key === data.key) {
			return i;
		}
	}
	return null;
}

export default function homeInfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_HOME:
            return {...state,show:action.data}
        case actionTypes.UPDATAE_TREE:
            return {...state,treeData:action.data};
        case actionTypes.ADD_TAB:
        	var index = findTabIndex(state.tabData, action.data);
        	var nowTabData, currentIndex;
        	if (index == null) {
        		nowTabData = state.tabData.concat([action.data]);
        		currentIndex = nowTabData.length - 1;
        	}else{
        		nowTabData = state.tabData;
        		currentIndex = index;
        	}
            return {...state, tabData:nowTabData, tabIndex:currentIndex };
        case actionTypes.REMOVE_TAB:
        	var nowTabData = state.tabData.filter(function(a){
        		if(a.key !== action.data){
        			return true;
        		}
        		return false;
        	});
        	var index = findTabIndex(state.tabData, {key:action.data} );
        	var currentIndex;
        	if (index == null) {

        	}else{
        		if (index == 0) {//删除第一个
        			currentIndex = 0;
        		}else{
                    if (state.tabIndex === index) { //删除了当前激活的tab
                         currentIndex = index - 1; 
                     }else{//不是当前激活的
                        if (state.tabIndex < index) { //删除了激活窗口后面的tab
                            currentIndex = state.tabIndex;
                        }else{ //删除了激活窗口前面的tab
                            currentIndex = state.tabIndex - 1;
                        }
                        
                     }
                   

        			
        		}
        			
        	}
        	
            return {...state,tabData:nowTabData,tabIndex:currentIndex};
        case actionTypes.ACTIVE_TAB:
        	var index = findTabIndex(state.tabData, {key:action.data} );
        	return {...state,tabIndex:index};
        case actionTypes.RESET: 
            return initialState;
        default:
            return state
    }
}