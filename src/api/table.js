/**
 *  create by houfangfang on 2018/9/4
 **/
import axios from 'axios'

export default {
    // 获取表格数据
    getTableData: (url, params = {}) => {
        return axios.get(url, params)
    }

}
