import 'es6-promise/auto'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import Ajax from 'commonVueLib/Ajax/Ajax'
import util from 'commonVueLib/util/tools'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import './mock/index' // build 注释
import store from './store/store.js' // 公共状态管理
import { Message } from 'element-ui'
// const qs = require('qs')

// 将Promise抛出为全局对象
window.Promise = Promise

// 定义全局变量
const GLOBAL = window.GLOBAL = {}
Vue.config.productionTip = false
Vue.mixin({
    created () {
        this.$GLOABL = {
            Ajax (option) {
                return Ajax.ajax(option)
            }
        }
    }
})
Vue.prototype.$http = axios
// axios 配置
axios.defaults.baseURL = 'http://lmp.gw-ec.com/' // build
Vue.use(VueAxios, axios)

// 请求api
GLOBAL.hostUrl = 'http://lmp.gw-ec.com/' // build
// http request 拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前
        GLOBAL.globalApp.$loading()
        config.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        if (util.getCache('company_info', 'local') != null) { // 添加token
            const dataInfo = util.getCache('company_info', 'local')
            config.headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': dataInfo.token
            }
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        // if (config.method === 'post' || config.method === 'put') {
        //     // config.data = qs.stringify(config.data)
        // }
        return config
    },
    error => {
        Message.error({message: '请求超时!'})
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // 得到响应，关闭loading
        GLOBAL.globalApp.$loading().close()
        if (response.status && response.status === 200) {
            return response.data
        }
        return response.data
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
            case 401:
                util.removeCache('company_info', 'local') // 删除企业信息
                Message.error({ message: error.response.data.msg })
                setTimeout(() => {
                    GLOBAL.globalApp.$router.push({ path: '/login' })
                }, 2000)
                break
            case 404:
                Message.error({message: '请求的资源不存在'})
                break
            case 500:
                Message.error({message: '网络错误，请重试'})
                break
            default:
                Message.error({message: '网络错误，请重试'})
                break
            }
        } else {
            Message.error({ message: '网络错误!' })
        }
        setTimeout(() => {
            GLOBAL.globalApp.$loading().close()
        }, 2000)
        return Promise.reject(error)
    }
)

const vueRouter = new VueRouter({
    routes: router,
    mode: 'history',
    base: '/'
})

// 路由切换
vueRouter.beforeEach((to, from, next) => {
    // GLOBAL.loadingInstance = Loading.service({ fullscreen: true })
    if (to.matched.some(record => record.meta.isLogin)) {
        // 判断是否登录
        if (util.getCache('company_info', 'local') == null) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

vueRouter.afterEach((route) => {
    // GLOBAL.loadingInstance.close()
})

/* eslint-disable no-new */
GLOBAL.globalApp = new Vue({
    el: '#global_app',
    name: 'globalApp',
    router: vueRouter,
    store: store
})
