<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <h3>{{title}}</h3>
            <div class="alter-info">
                <div class="info-wrap">
                    <div class="el-icon-circle-check"></div>
                    <div class="info-text">
                        <span>{{msg}}</span>
                        <div class="angin-login" @click="toLogin">重新登录<span class="second">({{second}}s)</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import util from 'commonVueLib/util/tools'

export default {
    name: 'alter_success',
    components: {
        CommonHeader
    },
    data () {
        return {
            prfClass: 'alter_success',
            second: 15,
            interval: '',
            title: '',
            msg: ''
        }
    },
    mounted () {
        // 接受路由传过来的参数
        let _this = this
        let params = _this.$route.params
        if (params) {
            _this.title = params.title
            _this.msg = params.msg
        }

        // 监听浏览器的返回按钮清空定时器
        window.addEventListener('popstate', function () {
            clearInterval(_this.interval)
        })

        this.countdown()
    },
    destroyed () {
        let _self = this
        clearInterval(_self.interval) // 销毁倒计时
    },
    methods: {
        toLogin () {
            clearInterval(this.interval)
            // 须清空企业信息，重新登录
            util.removeCache('company_info', 'local') // 删除企业信息
            this.$router.push({path: '/login'})
        },
        /**
         * 倒计时
         * */
        countdown () {
            let _this = this
            let timesRun = _this.second
            _this.interval = setInterval(function () {
                timesRun -= 1
                if (timesRun <= 9 && timesRun >= 1) {
                    _this.second = '0' + timesRun
                } else if (timesRun >= 9) {
                    _this.second = timesRun
                } else if (timesRun <= 0) {
                    _this.second = timesRun
                    clearInterval(_this.interval)
                    util.removeCache('company_info', 'local') // 删除企业信息
                    _this.$router.push({path: '/login'})
                }
            }, 1000)
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'alter_success';
    .#{$prfClass}-wrap {
        h3 {
            display: flex;
            justify-content: center;
            margin-top: 59px;
            margin-bottom: 30px;
            font-size: 28px;
            color: #429EFD;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
        }
        .alter-info {
            height: 412px;
            width: 700px;
            background: #FFF;
            margin: 0 auto;
            .info-wrap{
                padding-left: 154px;
                padding-top: 54px;
            }
            .info-text{
                float: left;
                color: #2F3032;
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                padding-left: 30px;
                padding-top: 20px;
            }
            .angin-login{
                color: #409EFF;
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                padding-top: 16px;
                cursor: pointer;
                span{
                    padding-left: 4px;
                }
            }
            .el-icon-circle-check{
                float: left;
                font-size: 80px;
                color: #409EFF;
            }
        }
    }
</style>
