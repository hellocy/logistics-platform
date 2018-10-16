/**
 *  create by wubinbin on 2018/7/20
 *  登录
 **/
import axios from 'axios'

const api = {
    // 登录
    login: (params = {}) => {
        return axios.post('api/login', params)
    },
    // 验证email是否注册
    getVerEmail: (params = {}) => {
        return axios.post('api/email_exist', params)
    },

    // dictitem
    getDictitem: (params = {}) => {
        return axios.get('api/dictitem', params)
    },

    // 注销登录
    logOut: (params = {}) => {
        return axios.get('api/logout', params)
    },

    // 获取审核状态
    getAudit: (params = {}) => {
        return axios.get('api/init', params)
    },

    // 公告api
    getAnnouncement: (params = {}) => {
        return axios.get('api/announce', params)
    },

    getDetail: (params = {}) => {
        return axios.get('api/announce/' + params.id, params)
    },

    // 获取验证码图片
    getCaptchaImg: (params = {}) => {
        return axios.post('api/captcha', params)
    }
}

export default api
