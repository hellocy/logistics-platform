/**
 *  create by wubinbin on 2018/8/28
 **/
import axios from 'axios'

export default {
    // dictitem
    getDictitem: (params = {}) => {
        return axios.get('api/dictitem', params)
    },

    // 获取审核状态
    getAudit: (params = {}) => {
        return axios.get('api/init', params)
    },

    // 注册
    getRegister: (params = {}) => {
        return axios.post('api/register', params)
    },

    // 获取验证码
    getVerCode: (params = {}) => {
        return axios.post('api/captcha', params)
    },

    // 验证email是否存在
    getVerEmail: (params = {}) => {
        return axios.post('api/email_exist', params)
    },

    // 提交联系方式的数据
    submitPhoneNumber: (params = {}) => {
        return axios.get('api/getVerEmail', params)
    },

    // 验证公司中文名
    getNameCn: (params = {}) => {
        return axios.post('api/logistics_enterprise/check_cn', params)
    },

    // 验证公司英文名
    getNameEn: (params = {}) => {
        return axios.post('api/logistics_enterprise/check_en', params)
    },

    // 获取物流商资料
    getLogistcsProviderMessage: (params = {}) => {
        return axios.get('api/logistics_enterprise/view', params)
    },

    // 保存物流商资料
    saveLogisticsEnterprise: (params = {}) => {
        return axios.post('api/logistics_enterprise/save', params)
    },

    // 提交物流商入驻资料
    submit: (params = {}) => {
        return axios.post('api/logistics_enterprise/submit', params)
    },

    // 上传附件
    upload: (params = {}) => {
        return axios.post('api/upload', params)
    },

    // 获取国家
    getCountry: (params = {}) => {
        return axios.post('api/country', params)
    },

    // 获取州省列表
    getState: (params = {}) => {
        return axios.post('api/state', params)
    }

}
