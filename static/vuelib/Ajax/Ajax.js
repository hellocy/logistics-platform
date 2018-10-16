/**
 *  create by wubinbin on 2018/6/13
 *  公共ajax请求
 **/
export default {
    /**
     * 去除特殊字符
     * **/
    getSafe (data) {
        data = data.replace(/<script[^>]*>|<\/script>|onclick\s*=|onerror\s*=|onabort\s*=|onblur\s*=|onchange\s*=|ondblclick\s*=|onfocus\s*=|onkeydown\s*=|onkeypress\s*=|onkeyup\s*=|onload\s*=|onmousedown\s*=|onmousemove\s*=|onmouseout\s*=|onmouseover\s*=|onmouseup\s*=|onreset\s*=|onresize\s*=|onselect\s*=|onsubmit\s*=|onunload\s*=|javascript:|alert\([^\)]*\)/igm,"")
        return data
    },

    /**
     * 格式化ajax
     * **/
    getAjaxFormatData (option) {
        let t = this
        let newData = ''
        if(typeof option === 'string') {
            newData = option
        } else {
            newData = JSON.stringify(option)
        }
        // 去除特殊字符，防xss攻击
        newData = t.getSafe(newData)

        return newData
    },


    /**
     * 公共ajax重写
     * **/
    ajax(option){
        let t = this
        let df = $.Deferred()
        // 请求数据防xss攻击处理
        if (typeof option.contentType !== 'boolean' && option.data) {
            option.data = t.getAjaxFormatData(option.data)
            if(typeof option.data === 'string'){
                option.data = JSON.parse(option.data)
            }
        }

        // //默认参数
        let data = {
            type: 'post',
            dataType: 'json',
            // contentType: "application/json; charset=UTF-8",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                let status = XMLHttpRequest.status
            }
        }
        $.extend(data, option)

        // 重写success，供模块使用
        data.success = function (obj, textStatus, jqXHR) {
            // 返回数据防xss攻击处理
            if (obj) {
                obj = t.getAjaxFormatData(obj);
            }
            obj = JSON.parse(obj);

            // 如果后端返回的错误统一拦截提示
            if (obj.code && obj.code != 200) {
                obj.msg && layer.msg(obj.msg) // 给个错误提示
            }
            typeof option.success == 'function' && option.success(obj, textStatus, jqXHR)
            df.resolve(obj, textStatus, jqXHR)
        }

        $.ajax(data)
        return df
    }
}
