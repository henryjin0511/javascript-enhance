"use strict";
/**
 * 原生操作cookie
 * author:JM
 * Released on: August 15, 2016
 * */
(function (window,undefined) {
    var cookie = new Object();
    /**
     * 设置cookie
     * @param {String} sname - cookie 名
     * @param {String} svalue - cookie 值
     * @param {String} sdays - cookie 时间 单位：天
     * @param {String} [arguments[3] = ''] - cookie 域 siteDomain(xx.com)
     * @param {String} [arguments[4] = '/'] - cookie 路径 URL默认
     * */
    cookie.set = function(sname,svalue,sdays){
        var date = new Date();
        date.setTime(date.getTime()+sdays*24*60*60*1000);
        var expires = sdays?'expires='+date.toGMTString():'expires=0;';
        var domain = arguments[3] ?'domain='+arguments[3]+';':'';
        var path = arguments[4] ?'path='+arguments[4]+';':'path=/;';
        document.cookie = sname+'='+encodeURIComponent(svalue)+';'+expires+domain+path;
    };
    /**
     * 获取cookie
     * @param {String} gname - cookie 名
     * */
    cookie.get = function(gname){
        var name = gname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return decodeURIComponent(c.substring(name.length, c.length));
        }
        return "";
    };
    /**
     * 清除cookie
     * @param {String} name - cookie 名
     * */
    cookie.clear = function(name){
        this.set(name,'',-1)
    };
    window.cookie = cookie;
})(window);
