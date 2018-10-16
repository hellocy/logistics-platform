/**
 *  create by wubinbin on 2018/9/14
 **/
import axios from 'axios'

const api = {
    // 登录
    getMyInfo: (params = {}) => {
        return axios.get('api/center', params)
    },

    // 获取审核状态
    getAudit: (params = {}) => {
        return axios.get('api/init', params)
    },

    // 获取旧验证码
    getVerCode: (params = {}) => {
        return axios.get('api/auth/captcha', params)
    },
    // 获取新验证码
    getNewVerCode: (params = {}) => {
        return axios.post('api/captcha', params)
    },

    // 修改邮箱
    editEmail: (params = {}) => {
        return axios.put('api/auth/change_email', params)
    },

    // 修改密码
    editPass: (params = {}) => {
        return axios.put('api/auth/forget', params)
    },

    // 获取合同渠道初始化
    contractInit: (params = {}) => {
        return axios.get('api/contract/create', params)
    },

    // 新增合同
    contractAdd: (params = {}) => {
        return axios.post('api/contract', params)
    },

    // 修改合同
    contractEdit: (id, params = {}) => {
        return axios.put('api/contract/' + id, params)
    },

    // 查看合同
    contractView: (params = {}) => {
        return axios.get('api/contract/' + params.id, params)
    },

    // 获取合同统计信息
    getStatistics: (params = {}) => {
        return axios.get('api/contract/statistics/count', params)
    },
    // 获取合同审核状态
    getContractStatus: (params = {}) => {
        return axios.get('api/receipt_info/getContractStatus', params)
    },
    deleteContract: (params = {}) => { // 删除合同
        return axios.delete('api/contract/' + params)
    },
    submitContract: (params = {}) => { // 提交合同
        return axios.get('api/contract/apply/' + params)
    },
    viewContract: (params = {}) => { // 查看合同
        return axios.get('api/contract/' + params)
    },
    auditContract: (params = {}) => { // 合同审核结果
        return axios.get('api/contract/audit/' + params)
    }
}

export default api
