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
