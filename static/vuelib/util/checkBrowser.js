/**
 *  create by wubinbin on 2018/9/1
 *  浏览器兼容性检测
 **/
var oCheckBrowser = {

    /**
     * 检验PC端浏览器
     */
    getIEVersion:function(){
        var sVersion = 'undefined'
        var uaMatch = ''
        var userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.match(/msie ([\d.]+)/) != null) {
            uaMatch = userAgent.match(/msie ([\d.]+)/) // ie6--ie9
            sVersion =  uaMatch[1]
        } else if (userAgent.match(/(trident)\/([\w.]+)/)) {
            uaMatch = userAgent.match(/trident\/([\w.]+)/)
            switch (uaMatch[1]) {
            case '4.0':
                sVersion = '8'
                break
            case '5.0':
                sVersion = '9'
                break
            case '6.0':
                sVersion = '10'
                break
            case '7.0':
                sVersion = '11'
                break
            default:
                sVersion = 'undefined'
                break
            }
        }
        return sVersion
    }
}

// PC浏览器的判断
if (oCheckBrowser.getIEVersion() != 'undefined') {
    // 跳转到不支持的页面
    if (parseInt(oCheckBrowser.getIEVersion()) < 10) {
        window.location.href = '//www.lida-logistics.com/notSupportBrowser.html?v=' + (new Date()).getTime()
    }
}
