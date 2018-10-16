<template>
    <div :class="prfClass">
        <common-header></common-header>
        <step-list :type="typeNumber"
                   :stepSpace="stepSpace"
                   :title="stepTitle"
                   :stepCount="stepCount"></step-list>
        <div :class="[prfClass + '-content']">
            <div class="audit-status wait" v-if="status === 2"></div>
            <div class="audit-status unpass" v-if="status === 3"></div>
            <ul>
                <li v-if="status === 2">
                    <i class="icon"></i>
                    <p>我司已接收资料， 审核结果会以邮件通知您，<br>也可二个工作日后登陆系统查询。</p>
                    <span @click="turnBack()" class="turnBack">返回首页</span>
                </li>
                <li class="unpass" v-if="status === 3">
                    <i class="icon"></i>
                    <ul>
                        <li>
                            <h4>您申请的信息<span class="red">未审核通过！</span>具体驳回原因如下</h4>
                        </li>
                        <li v-html="info"></li>
                    </ul>
                    <el-button type="primary" @click="submitAgain()" class="submitAgain">重新提交</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import api from '../../api/api'
import util from 'commonVueLib/util/tools'

export default {
    name: 'auditInquiries',
    components: {
        CommonHeader,
        StepList
    },
    data () {
        return {
            prfClass: 'audit-inquiries',
            typeNumber: 5,
            stepTitle: '欢迎物流商入驻',
            stepCount: [
                {
                    index: 1,
                    title: '基础信息'
                },
                {
                    index: 2,
                    title: '资质证照'
                },
                {
                    index: 3,
                    title: '规模与设施'
                },
                {
                    index: 4,
                    title: '联系方式'
                },
                {
                    index: 5,
                    title: '审核查询'
                }
            ],
            stepSpace: 100, // nav中间宽度
            status: 0,
            info: ''
        }
    },
    created () {
        let _self = this
        // 1:入驻资料 2:审核中 3:审核驳回 4:个人中心
        _self.status = this.$route.params.id * 1

        let type = _self.$store.getters['common/getAuditType']
        if (type === 0 || _self.status === 2 || _self.status === 3) { // 重新获取审核状态
            api.getAudit().then((res) => {
                if (res.code === 200) {
                    _self.info = res.data.info ? res.data.info : ''
                    _self.status = res.data.jump

                    // 更改企业信息里jump状态
                    let infoData = util.getCache('company_info', 'local')
                    infoData.jump = res.data.jump
                    util.setCache('company_info', infoData, 'local')

                    _self.changeType()
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        }
    },
    methods: {
        turnBack () { // 返回首页
            this.$router.push({ path: '/home' })
        },
        submitAgain () { // 重新提交, 跳转到入驻资料
            let _self = this
            _self.$router.push({ path: '/affiliate_message' })
        },
        changeType () {
            let _self = this
            if (_self.status === 1) { // 入驻资料
                _self.$router.push({ path: '/affiliate_message' })
            } else if (_self.status === 4) { // 个人中心
                _self.$store.dispatch('common/auditType', { getAuditType: 4 })
                _self.$router.push({ path: '/personal' })
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'audit-inquiries';
    .#{$prfClass}-content{
        width: 900px;
        background-color: #fff;
        text-align: center;
        margin: 0 auto;
        padding-bottom: 103px;
        position: relative;
        .audit-status{
            position: absolute;
            right: 37px;
            top: 30px;
            width: 150px;
            height: 50px;
            background: url('../../assets/my_message_status.png') no-repeat;
            transform: rotate(15deg);
            &.wait{
                background-position: 0 -120px;
            }
            &.success{
                background-position: 0px 0px;
            }
            &.unpass{
                background-position: 0 -60px;
            }
        }
        .icon{
            background: url("../../assets/resigter_check.png") -94px 0px;
            width: 105px;
            height: 88px;
            margin-top: 80px;
            margin-bottom: 28px;
            display: inline-block;
        }
        p{
            font-size: 14px;
            color: #2F3032;
            line-height: 28px;
            font-weight: 400
        }
        span{
            text-decoration: underline;
            color: #429EFD;
            font-size: 14px;
            margin-top: 28px;
            display: inline-block;
            cursor:pointer;
        }
        .unpass{
            .icon{
                background-position: 0px 0px;
                width: 84px;
                margin-bottom: 35px;
                margin-top: 60px;
            }
            li{
                line-height: 34px;
                color: #2F3032;
                font-size: 14px;
                text-align: left;
                margin-left:136px;
                span{
                    color: #F46B6B;
                    margin-top: 0;
                }
            }
            .submitAgain{
                width: 191px;
                height: 44px;
                margin-top: 36px;
                span{
                    margin: 0;
                    color: #fff;
                    text-decoration: none;
                }
            }
        }
    }
</style>
