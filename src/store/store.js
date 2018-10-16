/**
 *  create by wubinbin on 2018/8/23
 **/
import common from './common.js'
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
    modules: {
        common
    },
    strict: debug
})
