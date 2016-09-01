'use strict';
/**
 * tab切换
 * 依赖 dom-class.js onEvent.js
 * introduce:tab 切换原生JS函数，支持自动运行，且鼠标移入响应容器后会自动停止 跳出重新运行
 * author:JM
 * Released on: August 31, 2016
 * @param {Object} [config.root= document ] - 事件触发节点的根节点 必须为dom对象
 * @param {String} [config.curClass = 'active'] - 触发节点变化class 默认为active
 * @param {Object,String} config.oTriggers - 事件触发节点 可以为对象或者节点的class
 * @param {Object,String} config.oTargets - 事件相应节点 可以为对象或者节点的class
 * @param {String} [config.fnTrigger = 'click'] 事件触发函数 默认为click
 * @param {Function} config.handler 回调处理函数，返回 节点次序 触发节点 响应节点 三个参数
 * @param {Boolean} [config.isReset = true] 是否初始化整个状态
 * @param {String} [config.curIndex = 0] 当isReset为true 此处应填写第一个展示的对象，注意 次序从0开始
 * @param {Boolean} [config.autoPlay = false] 是否自动切换 默认为否
 * @param {Boolean} [config.overPause = true] 鼠标移入容器是否停止自动切换 默认为是
 * @param {playTime} [config.playTime = 3000] 当config.autoPlay = true 此处为自动运行间隔时间
 */
function Tab(config){
	this.root = config.root || document;
	this.curClass = config.curClass || 'active';
	this.oTriggers = typeof config.oTriggers == 'string'?getByClass(this.root,config.oTriggers) : config.oTriggers;
	this.oTargets = typeof config.oTargets == 'string'?getByClass(this.root,config.oTargets) : config.oTargets;
	this.handler = config.handler;
    this.curIndex = typeof config.curIndex == 'undefined'?0:config.curIndex;
    this.timer = null;
    var fnTrigger = config.fnTrigger || 'click';
    var autoPlay = typeof config.autoPlay == 'undefined'? false:config.autoPlay;
    var overPause = typeof config.overPause == 'undefined'? true:config.overPause;
    var playTime = config.playTime || 3000;
    var isReset = typeof config.isReset == 'undefined' ? true:config.isReset;
	var _this = this;
    if(isReset){
        this.showItem(this.curIndex,this.oTriggers[this.curIndex],this.oTargets[this.curIndex]);
    }
	if(autoPlay){
        this.timer = setInterval(function(){_this.autoHandler();},playTime)
	}
	var i;
	for (i=0;i<this.oTriggers.length;i++){
		this.oTriggers[i].index = i;
		onEvent(this.oTriggers[i],fnTrigger,function () {
			_this.showItem(this.index);
			_this.curIndex = this.index;
		});
        if(autoPlay && overPause){
            onEvent(_this.oTargets[i],'mouseover',function () {
                clearInterval(_this.timer);
            });
            onEvent(_this.oTargets[i],'mouseout',function () {
                _this.timer = setInterval(function(){_this.autoHandler();},playTime)
            });
        }
	}
}
Tab.prototype = {
	constructor:Tab,
	showItem:function (n) {
		var i;
        var curTrigger = getByClass(this.root,this.curClass)[0];
        if(curTrigger){
            removeClass(curTrigger,this.curClass);
        }
        addClass(this.oTriggers[n],this.curClass);
		for(i=0;i<this.oTargets.length;i++){
			this.oTargets[i].style.display = 'none';
		}
		this.oTargets[n].style.display = 'block';
		if(this.handler){
			this.handler(n,this.oTriggers[n],this.oTargets[n]);
		}
	},
	autoHandler:function () {
		this.curIndex ++;
		if(this.curIndex >= this.oTriggers.length){
			this.curIndex = 0;
		}
		this.showItem(this.curIndex);
	}
};
/**
 * onEvent.js
 * 原生事件绑定
 * author:JM
 * Released on: August 31, 2016
 * @param {String,Object} node - 绑定事件节点
 * @param {String} event - 绑定事件名(不带 on)
 * @param {Object} handler - 绑定事件函数
 * @param {Object} [scope = node] - 事件触发节点
 */
function onEvent(node,event,handler,scope){
	node = typeof node == 'string' ? document.getElementById(node):node;
	scope = scope || node;
	if(document.all){
		node.attachEvent('on'+event,function(){
			handler.call(scope,arguments);
		});
	}else{
		node.addEventListener(event,function () {
			handler.call(scope,arguments);
		},false);
	}
}
/**
 * 通过calss获取DOM元素
 * author:JM
 * Released on: August 11, 2016
 * @param {Object} [arguments[0]=document] - 上级DOM元素
 * @param {String} arguments[1] - 想要获取DOM元素的class
 * */
function getByClass(){
	var oParent = arguments.length == 1?document:arguments[0];
	var sClass = arguments.length == 1?arguments[0]:arguments[1];
	if(document.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aTmp = oParent.getElementsByTagName('*');
		var aRes=[];
		var arr =[];
		for(var i=0;i<aTmp.length;i++){
			arr = aTmp[i].className.split(' ');
			for (var j=0;j<arr.length;j++){
				if(arr[j] == sClass){
					aRes.push(aTmp[i]);
				}
			}
		}
		return aRes;
	}
}
/**
 * DOM元素增加class
 * author:JM
 * Released on: August 12, 2016
 * @param {Object} obj - 想要操作的DOM元素
 * @param {String} class1, class2, ... - 想要添加到DOM元素的class
 * info:并没有添加去重功能，考虑到class去重影响性能且浏览器解析时并无太大影响
 * */
function addClass(obj,class1){
	var aClass = [];
	for(var i=1;i<arguments.length;i++){
		aClass.push(arguments[i]);
	}
	if("classList" in document.documentElement && !(!!window.ActiveXObject || "ActiveXObject" in window)){
		obj.classList.add.apply(obj.classList,aClass);
	}else{
		var sClass = aClass.join(' ');
		obj.className += (obj.className != '')?' '+sClass:sClass;
	}
}
/**
 * DOM元素删除class
 * author:JM
 * Released on: August 12, 2016
 * @param {Object} obj - 想要操作的DOM元素
 * @param {String} class1, class2, ... - 想要删除DOM元素的class
 * */
function removeClass(obj,class1){
	var aClass = [];
	for(var i=1;i<arguments.length;i++){
		aClass.push(arguments[i]);
	}
	if("classList" in document.documentElement && !(!!window.ActiveXObject || "ActiveXObject" in window)){
		obj.classList.remove.apply(obj.classList,aClass);
	}else{
		var sObjClass = ' '+obj.className+' ';

		for(var j=0;j<aClass.length;j++){
			var reg = new RegExp(' '+aClass[j]+' ','g');
			sObjClass = sObjClass.replace(reg,' ');
		}
		sObjClass = sObjClass.replace(/(\s+)/gi, ' ');
		sObjClass = sObjClass.replace(/(^\s+)|(\s+$)/g, '');
		obj.className = sObjClass;
	}
}
/**
 * 判断DOM元素是否存在某个class
 * author:JM
 * Released on: August 12, 2016
 * @param {Object} obj - 想要操作的DOM元素
 * @param {String} sclass - 想要删除DOM元素的class
 * */
function hasClass(obj, sclass){
	if("classList" in document.documentElement){
		return obj.classList.contains(sclass);
	}else{
		var sObjClass = obj.className;
		var aObjClass = sObjClass.split(/\s+/);
		for(var i in aObjClass) {
			if(aObjClass[i] == sclass) {
				return true;
			}
		}
		return false;
	}
}
/**
 * 在元素中切换类名
 * author:JM
 * Released on: August 12, 2016
 * @param {Object} obj - 想要操作的DOM元素
 * @param {String} sclass - 想要删除DOM元素的class
 * */
function toggleClass(obj,sclass){
	if("classList" in document.documentElement){
		return obj.classList.toggle(sclass);
	}else{
		if(hasClass(obj,sclass)){
			removeClass(obj,sclass);
		}else{
			addClass(obj,sclass);
		}
	}
}