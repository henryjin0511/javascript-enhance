/**
 * 通过calss获取DOM元素
 * author:JM
 * Released on: August 11, 2016
 * @param {Object} [arguments[0]=document] - 上级DOM元素
 * @param {String} arguments[1] - 想要获取的ID
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
                if(arr[j] == sClass)
                {
                    aRes.push(aTmp[i]);
                }
            }
        }
        return aRes;
    }
}
