/**
 *  create by wubinbin on 2018/8/23
 **/
export default {
    // 启用命名空间
    namespaced: true,
    state: {
        // 入驻流程-基本信息
        basicInfo: {},
        // 资质证照
        licenseInfo: {},
        // 规模与设施
        scaleInfo: {},
        // 获取审核状态
        getAuditType: 0,
        // 我的渠道查询状态
        channel_search_statue: 0,
        // 收款信息状态
        receipt_statue: 0,
        // 报价分区状态
        price_statue: 0,
        // 新建收款信息草稿数据
        cash_draft_data: false
    },

    actions: {
        basicInfo ({commit, state, dispatch}, data) {
            commit('setBasicInfo', { key: 'basicInfo', value: data })
        },
        auditType ({commit, state, dispatch}, data) {
            commit('setAuditType', { key: 'getAuditType', value: data.getAuditType })
        },
        updataChannelSearch ({commit, state, dispatch}, data) {
            commit('setChannelSearch', { key: 'channel_search_statue', value: data.channel_search_statue })
        },
        receiptStatue ({commit, state, dispatch}, data) {
            commit('setReceiptStatue', { key: 'receipt_statue', value: data.receipt_statue })
        },
        priceStatue ({commit, state, dispatch}, data) {
            commit('setPriceStatue', { key: 'price_statue', value: data.price_statue })
        },
        cashDraftData ({commit, state, dispatch}, data) {
            commit('setCashDraftData', { key: 'cash_draft_data', value: data.cash_draft_data })
        }
    },

    mutations: {
        setBasicInfo (state, { key, value }) {
            state[key] = value
        },
        setAuditType (state, { key, value }) {
            state[key] = value
        },
        setChannelSearch (state, { key, value }) {
            state[key] = value
        },
        setReceiptStatue (state, { key, value }) {
            state[key] = value
        },
        setPriceStatue (state, { key, value }) {
            state[key] = value
        },
        setCashDraftData (state, { key, value }) {
            state[key] = value
        }
    },

    getters: {
        getBasicInfo (state) {
            return state.basicInfo
        },
        getAuditType (state) {
            return state.getAuditType
        },
        getChannelSearchStatue (state) {
            return state.channel_search_statue
        },
        getReceiptStatue (state) {
            return state.receipt_statue
        },
        getPriceStatue (state) {
            return state.price_statue
        },
        getCashDraftData (state) {
            return state.cash_draft_data
        }
    }
}
