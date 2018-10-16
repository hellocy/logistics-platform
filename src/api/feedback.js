/**
 *  create by chenyi on 2018/9/21
 *  问题反馈api
 *
 **/
import axios from 'axios'

export default {

    getFeedbackTableData: params => { // 获取问题反馈列表数据
        return axios.get('/api/suggest?keyword=' + params.keyword + '&page=' + params.page + '&per_page=' + params.per_page)
    },
    replyFeedbackInfo: params => { // 回复页面提交反馈信息
        return axios.post('/api/suggest/reply', params)
    },
    submitFeedbackInfo: params => { // 回复页面提交反馈信息
        return axios.post('/api/suggest', params)
    },
    getFeedbacksList: params => { // 提交反馈
        return axios.get('/api/suggest/' + params.id)
    },
    completeFeedbackInfo: params => { // 关闭问题
        return axios.delete('/api/suggest/' + params.id)
    },
    evaluate: params => { // 评价反馈信息
        return axios.post('/api/suggest/appraise/' + params.id, params)
    },
    getQuestionType: params => { // 获取问题反馈列表数据
        return axios.get('/api/suggest/create/init')
    }
}
