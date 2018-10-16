/**
 *  create by wubinbin on 2018/8/27
 *  首页api
 *
 **/
import axios from 'axios'

export default {
    // banner
    getBanner: params => { // 获取banner的图片
        return axios.get('api/cms/banner?type=1', params)
    },
    // login
    getLogin: (params = {}) => {
        return axios.get('api/login', params)
    },
    getEchartsData: (params = {}) => { // 获取echart的数据
        return axios.get('api/cms/cargo', params)
    }
}
