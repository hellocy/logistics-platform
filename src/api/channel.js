/**
 *  create by chenyi on 2018/9/5
 *  渠道api
 *
 **/
import axios from 'axios'

export default {
    // 获取审核状态
    getAudit: (params = {}) => {
        return axios.get('api/init', params)
    },
    getApplicationInfo: params => { // 获取渠道申请资料（b2b）预览信息
        return axios.get('/api/channels/' + params.params.id + '/preview')
    },
    deleteChannel: params => { // 删除渠道
        return axios.delete('/api/channels/' + params.params.id, params)
    },
    submitChannel: params => { // 预览页面提交审核
        return axios.put('/api/channels/' + params + '/submit', params)
    },

    /* 以下是收款信息的接口 */
    getCashTableData: params => { // 获取收款信息列表数据
        return axios.get('/api/receipts?status=' + params.status + '&page=' + params.page + '&per_page=' + params.per_page + '&channel_name=' + params.channel_name)
    },
    getReceiptsStatusTotal: params => { // 获取各状态的总数
        return axios.get('/api/receipts/report/stats')
    },
    submitListCashInfo: params => { // 列表中提交收款信息
        return axios.put('/api/receipts/' + params.id + '/submit')
    },
    deleteCashInfo: params => { // 删除收款信息
        return axios.delete('/api/receipts/' + params.id)
    },
    getChannels: params => { // 获取渠道
        let url = params ? '/api/dict/channels?is_contract_passed=' + params.is_contract_passed : '/api/dict/channels'
        return axios.get(url)
    },
    getAccounts: params => { // 获取收款账户
        return axios.get('/api/dict/accounts')
    },
    addNewCashCollectionInfo: params => { // 添加收款信息
        return axios.post('/api/receipts', params)
    },
    editCashCollectionInfo: params => { // 编辑收款信息
        return axios.put('/api/receipts/' + params.id, params)
    },
    getAuditingCashCollectionInfoData: params => { // 编辑和查看收款信息时，根据id获取数据
        return axios.get('/api/receipts/' + params.id + '/result')
    },
    submitCashCollectionInfo: params => { // 表单提交收款信息
        return axios.post('/api/receipts/audits/submit', params)
    },
    getCashCollectionInfoData: params => { // 编辑和查看收款信息时，根据id获取数据
        return axios.get('/api/receipts/' + params.id)
    },
    /* 以上是收款信息的接口 */

    /* 以下是分区报价的接口 */
    getQuotesTableData: params => { // 获取分区报价列表数据
        return axios.get('/api/quotes?status=' + params.status + '&page=' + params.page + '&per_page=' + params.per_page + '&channel_name=' + params.channel_name)
    },
    getQuotesStatusTotal: params => { // 获取各状态的总数
        return axios.get('/api/quotes/report/stats')
    },
    deleteQuotesInfo: params => { // 删除分区报价
        return axios.delete('/api/quotes/' + params.id)
    },
    editQuotesInfo: params => { // 编辑时保存分区报价
        return axios.put('/api/quotes/' + params.id, params)
    },
    submitListPriceInfo: params => { // 列表中提交收款信息
        return axios.put('/api/quotes/' + params.id + '/submit')
    },
    saveQuotesInfo: params => { // 新增时保存分区报价
        return axios.post('/api/quotes', params)
    },
    submitQuotesInfo: params => { // 表单提交分区报价
        return axios.post('/api/quotes/audits/submit', params)
    },
    getQuotesInfoData: params => { // 编辑和查看分区报价时，根据id获取数据
        return axios.get('/api/quotes/' + params.id)
    },
    getRejectedPriceInfoData: params => { // 编辑和查看收款信息时，根据id获取数据
        return axios.get('/api/quotes/' + params.id + '/result')
    },
    /* 以上是分区报价的接口 */

    /* 渠道管理的所有接口 */
    getStatus: params => { // 渠道列表所有状态
        return axios.get('/api/channels/report/stats', params)
    },
    submitBasicInfo: params => { // 申请渠道提交数据
        return axios.post('/api/channels', params)
    },
    basicInfo: (type, params) => { // 基础资料模块 测试时候是channel 实际是channels
        if (type === 'add') { // 新增
            return axios.post('/api/channels', params)
        } else if (type === 'compile') { // 编辑
            return axios.put('/api/channels/' + params.id, params)
        } else { // 修改
            return axios.put('/api/channels/' + params.id + '/modify', params)
        }
    },
    operate: (type, params, paramsId) => { // 操作要求
        if (type === 'add') { // 新增
            return axios.post('/api/channels/' + paramsId + '/operate', params)
        } else if (type === 'compile') { // 编辑
            return axios.put('/api/channels/' + paramsId + '/operate', params)
        } else { // 修改
            return axios.put('/api/channels/' + paramsId + '/operate/modify', params)
        }
    },
    dataRequire: (type, params, paramsId) => { // 数据要求
        if (type === 'add') { // 新增
            return axios.post('/api/channels/' + paramsId + '/data', params)
        } else if (type === 'compile') { // 编辑
            return axios.put('/api/channels/' + paramsId + '/data', params)
        } else { // 修改
            return axios.put('/api/channels/' + paramsId + '/data/modify', params)
        }
    },
    ship: (type, params, paramsId) => { // 发货要求
        if (type === 'add') { // 新增
            return axios.post('/api/channels/' + paramsId + '/ship', params)
        } else if (type === 'compile') { // 编辑
            return axios.put('/api/channels/' + paramsId + '/ship', params)
        } else { // 修改
            return axios.put('/api/channels/' + paramsId + '/ship/modify', params)
        }
    },
    getProhibites: () => { // 发货要求获取禁发属性
        return axios.get('/api/prohibits')
    },
    afterService: (type, params, paramsId) => { // 售后服务
        if (type === 'add') { // 新增
            return axios.post('/api/channels/' + paramsId + '/service', params)
        } else if (type === 'compile') { // 编辑
            return axios.put('/api/channels/' + paramsId + '/service', params)
        } else { // 修改
            return axios.put('/api/channels/' + paramsId + '/service/modify', params)
        }
    },
    priceMode: (type, params, paramsId) => { // 计费模式
        if (type === 'add') {
            return axios.post('/api/channels/' + paramsId + '/billing', params)
        } else if (type === 'compile') {
            return axios.put('/api/channels/' + paramsId + '/billing', params)
        } else {
            return axios.put('/api/channels/' + paramsId + '/billing/modify', params)
        }
    },
    attach: (type, params, paramsId) => { // 附件上传
        if (type === 'add') {
            return axios.post('/api/channels/' + paramsId + '/attach', params)
        } else if (type === 'compile') {
            return axios.put('/api/channels/' + paramsId + '/attach', params)
        } else {
            return axios.put('/api/channels/' + paramsId + '/attach/modify', params)
        }
    },
    getSopAttachment: (params) => { // 获取sop附件
        return axios.get('/api/channels/' + params + '/attach/url')
    },
    channelResult: (params) => { // 审核获取渠道名称
        console.log(params, 9999)
        return axios.get('/api/channels/' + params + '/result')
    }
}
