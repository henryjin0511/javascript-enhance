'use strict';
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