export default [
	{
		code:"new Map({})",
		name:"创建地图",
		param:[
	        {   
	            key:"1",
	            code:"param",
	            name: "参数",
	            type: "Object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"param.target",
	            name: "地图对挺的divid",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"param.center",
	            name: "地图的中心点",
	            type: "Array",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"param",
	            name: "参数",
	            type: "Object",
	            isRequire:"否",
	            remark: ""
	        }
		],
		result:"返回一个map对象"
	},
	{
		code:"addTile",
		name:"添加瓦片地图",
		param:[
	        {   
	            key:"1",
	            code:"param",
	            name: "参数",
	            type: "Object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"urlFunc",
	            name: "获取url的方法",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"param.key",
	            name: "瓦片地图的key",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"param.url",
	            name: "瓦片地图的url",
	            type: "String",
	            isRequire:"否",
	            remark: "默认有限第二个参数的返回,否则该参数必填"
	        }
		],
		result:""
	},
	{
		code:"removeTile",
		name:"删除瓦片图层",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "瓦片图层的key",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        
		],
		result:""
	},
	{
		code:"addGis",
		name:"添加高分影像图层",
		param:[
	        {   
	            key:"1",
	            code:"param",
	            name: "参数",
	            type: "Object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"urlFunc",
	            name: "获取url的方法",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"param.key",
	            name: "图层的key",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"param.url",
	            name: "图层的url",
	            type: "String",
	            isRequire:"否",
	            remark: "默认有限第二个参数的返回,否则该参数必填"
	        },
	        {   
	            key:"5",
	            code:"param.visible",
	            name: "图层的可见性",
	            type: "Boolen",
	            isRequire:"否",
	            remark: "默认可见"
	        },
	        {   
	            key:"6",
	            code:"param.zIndex",
	            name: "图层的层级",
	            type: "Number",
	            isRequire:"否",
	            remark: ""
	        }
		],
		result:""
	},
	{
		code:"removeGis",
		name:"删除Gis图层",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        
		],
		result:""
	},
	{
		code:"addVector",
		name:"添加矢量图层",
		param:[
	        {   
	            key:"1",
	            code:"param",
	            name: "参数",
	            type: "object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"urlFunc",
	            name: "获取url方法",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"param.key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"param.visible",
	            name: "图层的可见性",
	            type: "boolen",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"5",
	            code:"param.zIndex",
	            name: "图层层级",
	            type: "number",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"6",
	            code:"param.style",
	            name: "图层样式",
	            type: "object",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"7",
	            code:"param.style.heading",
	            name: "角度",
	            type: "function",
	            isRequire:"否",
	            remark: "function的第一个参数传入目标的模型"
	        },
	        {   
	            key:"8",
	            code:"param.style.src",
	            name: "图标的url",
	            type: "function",
	            isRequire:"否",
	            remark: "function的第一个参数传入目标的模型"
	        },
	        {   
	            key:"9",
	            code:"param.style.strokeColor",
	            name: "描线的颜色",
	            type: "string",
	            isRequire:"否",
	            remark: "如#000000或rgba(0,0,0,0)"
	        },
	        {   
	            key:"10",
	            code:"param.style.width",
	            name: "描线的宽度",
	            type: "number",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"11",
	            code:"param.style.fillColor",
	            name: "填充色",
	            type: "string",
	            isRequire:"否",
	            remark: "如#000000或rgba(0,0,0,0)"
	        },
	        {   
	            key:"12",
	            code:"param.style.fontColor",
	            name: "字体颜色",
	            type: "string",
	            isRequire:"否",
	            remark: "如#000000或rgba(0,0,0,0)"
	        },
	        {   
	            key:"13",
	            code:"param.style.fontText",
	            name: "文字内容",
	            type: "function",
	            isRequire:"否",
	            remark: "function的第一个参数传入目标的模型"
	        },
	        {   
	            key:"14",
	            code:"param.style.font",
	            name: "文字字体",
	            type: "string",
	            isRequire:"否",
	            remark: "10px sans-serif"
	        },
	        
		],
		result:""
	},
	{
		code:"removeVector",
		name:"删除矢量图层",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "String",
	            isRequire:"是",
	            remark: ""
	        },
	        
		],
		result:""
	},
	{
		code:"addFeature",
		name:"添加单个目标",
		param:[
			{   
	            key:"0",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"1",
	            code:"obj",
	            name: "feature的模型对象",
	            type: "object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"obj.id",
	            name: "id",
	            type: "string||number",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"obj.type",
	            name: "类型",
	            type: "string",
	            isRequire:"是",
	            remark: "可选:Point||LineString||Polygon"
	        },
	        {   
	            key:"4",
	            code:"obj.lonlat",
	            name: "经纬度",
	            type: "Array",
	            isRequire:"否",
	            remark: "如[121,29]"
	        },
	        {   
	            key:"5",
	            code:"obj.lonlats",
	            name: "经纬度",
	            type: "Array",
	            isRequire:"否",
	            remark: "如[[121,29],[122,32]]. 线和面的经纬度数组"
	        },
	        {   
	            key:"6",
	            code:"obj.heading",
	            name: "角度",
	            type: "number",
	            isRequire:"否",
	            remark: "如是点的图形,则必填"
	        },
	        
		],
		result:""
	},
	{
		code:"addFeatures",
		name:"添加多个目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"objs",
	            name: "feature的模型对象",
	            type: "array",
	            isRequire:"是",
	            remark: "参考前面的接口"
	        },
	        
		],
		result:""
	},
	{
		code:"removeFeature",
		name:"删除一个目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"obj",
	            name: "feature的模型对象",
	            type: "object||string",
	            isRequire:"是",
	            remark: "如果是个字符串,则直接为模型的id,如果是对象必须有个id键值"
	        },
	        
		],
		result:""
	},
	{
		code:"removeFeatures",
		name:"删除多个目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"objs",
	            name: "feature的模型对象",
	            type: "array",
	            isRequire:"是",
	            remark: "参考前面的接口"
	        },
	        
		],
		result:""
	},
	{
		code:"updateFeature",
		name:"更新一个目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"obj",
	            name: "feature的模型对象",
	            type: "object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"obj.id",
	            name: "id",
	            type: "string||number",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"obj.type",
	            name: "类型",
	            type: "string",
	            isRequire:"是",
	            remark: "可选:Point||LineString||Polygon"
	        },
	        {   
	            key:"5",
	            code:"obj.lonlat",
	            name: "经纬度",
	            type: "Array",
	            isRequire:"否",
	            remark: "如[121,29]"
	        },
	        {   
	            key:"6",
	            code:"obj.lonlats",
	            name: "经纬度",
	            type: "Array",
	            isRequire:"否",
	            remark: "如[[121,29],[122,32]]. 线和面的经纬度数组"
	        },
	        {   
	            key:"7",
	            code:"obj.heading",
	            name: "角度",
	            type: "number",
	            isRequire:"否",
	            remark: "如是点的图形,则必填"
	        },
	        
		],
		result:""
	},
	{
		code:"updateFeatures",
		name:"更新多个目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"objs",
	            name: "feature的模型对象",
	            type: "array",
	            isRequire:"是",
	            remark: "参考前面的接口"
	        },
	        
		],
		result:""
	},
	{
		code:"clear",
		name:"清除多有目标",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"startHighlightFeatureonLayer",
		name:"开启鼠标高亮显示",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"stopHighlightFeatureonLayer",
		name:"停止鼠标高亮",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"startSelectFeature",
		name:"开启feature点击",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"eleTempFunc",
	            name: "模板字符串",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"eleTempEvent",
	            name: "自定义dom事件",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        
		],
		result:""
	},
	{
		code:"stopSelectFeature",
		name:"关闭feature点击",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"startCluster",
		name:"开启聚合",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"stopCluster",
		name:"关闭聚合",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"activeTileLayer",
		name:"切换图层",
		param:[
	        {   
	            key:"1",
	            code:"key",
	            name: "瓦片图层的key",
	            type: "string",
	            isRequire:"是",
	            remark: ""
	        }
	        
		],
		result:""
	},
	{
		code:"activeMeasure",
		name:"开启测量",
		param:[
	        {   
	            key:"1",
	            code:"measureType",
	            name: "测量类型",
	            type: "string",
	            isRequire:"是",
	            remark: "测距:LineStrin,测面:Polygon"
	        }
	        
		],
		result:""
	},
	{
		code:"stopMeasure",
		name:"停止测量",
		param:null,
		result:""
	},
	{
		code:"startSearch",
		name:"开启搜索",
		param:[
	        {   
	            key:"1",
	            code:"type",
	            name: "搜索类型",
	            type: "string",
	            isRequire:"是",
	            remark: "type:Rect||Circle||Polygon 对应矩形,圆形,多边形搜索"
	        },
	        {   
	            key:"2",
	            code:"callback",
	            name: "搜索完成事件",
	            type: "function",
	            isRequire:"是",
	            remark: "回调第一个参数包含了所有点,或者中心点和半径"
	        }
	        
		],
		result:""
	},
	{
		code:"stopSearch",
		name:"关闭搜索",
		param:null,
		result:""
	},
	{
		code:"startEditablePolygon",
		name:"开启可编辑的多边形",
		param:[
	        {   
	            key:"1",
	            code:"callback",
	            name: "完成事件和编辑事件",
	            type: "function",
	            isRequire:"是",
	            remark: "第一个参数包含所有点"
	        }
	        
	        
		],
		result:""
	},
	{
		code:"stopEditablePolygon",
		name:"关闭可编辑的多边形",
		param:null,
		result:""
	},
	{
		code:"animate",
		name:"以动画的心态设置",
		param:[
	        {   
	            key:"1",
	            code:"param",
	            name: "参数",
	            type: "object",
	            isRequire:"是",
	            remark: ""
	        },
	        {   
	            key:"2",
	            code:"param.center",
	            name: "中心位置",
	            type: "array",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"3",
	            code:"param.zoom",
	            name: "缩放级别",
	            type: "number",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"4",
	            code:"param.duration",
	            name: "持续时间",
	            type: "number",
	            isRequire:"否",
	            remark: ""
	        },
	        {   
	            key:"5",
	            code:"callback",
	            name: "动画完成后的回调",
	            type: "function",
	            isRequire:"否",
	            remark: ""
	        },
	        
		],
		result:""
	},
	{
		code:"setCenter",
		name:"设置中心点",
		param:[
	        {   
	            key:"1",
	            code:"center",
	            name: "坐标",
	            type: "array",
	            isRequire:"是",
	            remark: ""
	        }
	        
	        
		],
		result:""
	},
	{
		code:"getCenter",
		name:"获得中心点",
		param:null,
		result:"中心点的坐标,如[121,20]"
	},
	{
		code:"setZoom",
		name:"设置缩放级别",
		param:[
	        {   
	            key:"1",
	            code:"zoom",
	            name: "缩放级别",
	            type: "number",
	            isRequire:"是",
	            remark: ""
	        }
	        
	        
		],
		result:""
	},
	{
		code:"getZoom",
		name:"获得缩放级别",
		param:null,
		result:"地图缩放级别"
	},
	{
		code:"on",
		name:"绑定事件",
		param:[
			{
	            key:"1",
	            code:"type",
	            name: "类型",
	            type: "string",
	            isRequire:"是",
	            remark: ""
			},
			{
	            key:"2",
	            code:"callback",
	            name: "回调函数",
	            type: "function",
	            isRequire:"是",
	            remark: ""
			},
		],
		result:"click,dbclick,moveend,pointermove"
	},
	{
		code:"un",
		name:"注销事件",
		param:[
			{
	            key:"1",
	            code:"type",
	            name: "类型",
	            type: "string",
	            isRequire:"是",
	            remark: ""
			},
			{
	            key:"2",
	            code:"callback",
	            name: "函数",
	            type: "function",
	            isRequire:"是",
	            remark: ""
			},
		],
		result:"click,dbclick,moveend,pointermove"
	},
]