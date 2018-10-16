/**
 *  create by houfangfang on 2018/9/4
 **/
import axios from 'axios'

export default {
    // 获取审核状态
    getAudit: (params = {}) => {
        return axios.get('api/init', params)
    },
    // 我的信息页面
    deleteAccount: (params = {}) => {
        return axios.delete('api/receipt_info/' + params.id, params)
    },

    // 添加账户信息
    addReceiptInfo: (params = {}) => {
        return axios.post('api/receipt_info', params)
    },

    // 修改账户信息
    editReceiptInfo: (id, params = {}) => {
        return axios.put('api/receipt_info/' + id, params)
    },

    // 获取账户统计信息
    getStatistics: (params = {}) => {
        return axios.get('api/receipt_info/statistics', params)
    },

    // 获取账户信息详情
    getInfoDetail: (params = {}) => {
        return axios.get('api/receipt_info/' + params.id, params)
    }
}
