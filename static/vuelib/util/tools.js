/**
 *  create by wubinbin on 2018/8/31
 **/
export default {
    /**
     * 缓存
     * @param key 根据当前项目+当前页面名称+字段名 防止key值重复
     * @param type 默认为sessionStorage, 可传入localStorage
     * **/
    setCache (key, val, type) {
        type = type || 'session'
        if (type === 'local') {
            if (typeof val == 'string') {
                localStorage.setItem(key, val)
            }
            if (typeof val == 'object') {
                localStorage.setItem(key, JSON.stringify(val))
            }
        } else if (type === 'session') {
            if (typeof val == 'string') {
                sessionStorage.setItem(key, val)
            }
            if (typeof val == 'object') {
                sessionStorage.setItem(key, JSON.stringify(val))
            }
        }
    },
    // 获取缓存
    getCache (key, type) {
        type = type || 'session'
        let val = null
        if (type === 'session') {
            val = sessionStorage.getItem(key)
        } else if (type === 'local') {
            val = localStorage.getItem(key)
        }
        // 如果是对象就转换类型转换数据
        try {
            val = JSON.parse(val)
        } catch (e) {
            val = val
        }
        return val
    },
    // 清除缓存
    removeCache (key, type) {
        type = type || 'session'
        if (type === 'session') {
            sessionStorage.removeItem(key)
        } else if (type === 'local') {
            localStorage.removeItem(key)
        }
    },

    // 获取下一步接口
    getNextApi (key, type) {
        let formData = this.getCache('lmp_channelApplication_data')
        console.log(formData, key)
        // 状态
        switch (type * 1) {
        case 0:
            this.setCache('channelApplication', 'add') // 新增
            break
        case 3:
        case 4:
        case 5:
            this.setCache('channelApplication', 'edit') // 修改
            break
        case 1:
            if (formData[key] !== null) {
                this.setCache('channelApplication', 'compile') // 编辑
            } else {
                this.setCache('channelApplication', 'add')
            }
            break
        default:
            break
        }
    },

    // 防抖
    debounce (fn, delay = 300) {
        let timer = null
        return function (args) {
            let _this = this
            let _args = args
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(_this, _args)
            }, delay)
        }
    }
}
