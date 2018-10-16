<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <step-list :type="typeNumber"
                       :title="stepTitle"
                       :stepSpace="stepSpace"
                       :stepCount="stepCount"></step-list>
            <div :class="[prfClass + '-form']">
                <div class="top">
                    <h2>渠道名称: {{formData.channel_name}}</h2>
                    <p>我司已接收资料，审核结果将在一个工作日内邮件通知到您</p>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="read_message()" plain>查看信息</el-button>
                    <el-button type="primary" @click="add()">继续新增</el-button>
                    <a class="link-back" @click="back">返 回</a>
                </div>
                <div class="status"></div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import breadcrumb from '../../components/breadcrumb'
import channelApi from '../../api/channel'

export default {
    name: 'channel-audit-now',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-audit-now',
            typeNumber: 7, // 当前第n步
            stepTitle: '渠道申请资料(B2B)', // 当前第n步的标题
            stepSpace: 66,
            stepCount: [ // 步骤定义
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '发货要求'
                }, {
                    index: 4,
                    title: '售后服务'
                }, {
                    index: 5,
                    title: '计费模式'
                }, {
                    index: 6,
                    title: '附件上传'
                }, {
                    index: 7,
                    title: '审核查询'
                }
            ],
            formData: {
                channel_name: '顺丰陆运'
            },
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '查看',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        let _self = this
        this.formData.id = this.$route.params.id // 获取本条渠道数据的id
        this.mode_type = this.$route.params.mode_type
        channelApi.channelResult(this.$route.params.id).then(function (res) { // 获取渠道名称
            if (res.code === 200) {
                _self.formData.channel_name = res.data.channel_name
                if (res.data.status === 3) { // 如果是审核通过 就跳到资料页
                    _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/view' + '/' + _self.$route.params.mode_type })
                } else if (res.data.status === 4) { // 驳回 跳到审核驳回页面
                    _self.$router.push({ path: '/channel_audit_reject/' + _self.$route.params.id + '/' + _self.$route.params.mode_type })
                }
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
        })
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.typeNumber = 8
            this.stepTitle = 'B2C'
            this.stepCount = [
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '数据要求'
                }, {
                    index: 4,
                    title: '发货要求'
                }, {
                    index: 5,
                    title: '售后服务'
                }, {
                    index: 6,
                    title: '计费模式'
                }, {
                    index: 7,
                    title: '附件上传'
                }, {
                    index: 8,
                    title: '审核查询'
                }
            ]
        }
    },
    methods: {
        read_message () { // 查看信息
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/view/' + this.$route.params.mode_type })
        },
        add () { // 继续新增
            this.$router.push({ path: '/channel_application_data_select' })
        },
        back () { // 返回按钮
            this.$router.push({ path: '/channel_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-audit-now';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
    }
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 120px;
        background-color: #fff;
        height: auto;
        padding-bottom: 60px;
        position: relative;
        text-align: center;
        .top{
            padding-left: 125px;
            text-align: left;
        }
        h2{
            color: #8F9298;
            font-size: 14px;
            padding-top:60px;
            word-break:break-all
        }
        p{
            font-size: 14px;
            color: #2F3032;
            margin: 15px 0 39px;
        }
        .footer{
            margin: 0 auto;
            button {
                width: 160px;
                height: 44px;
                &:first-child{
                    background-color:transparent !important;
                    color:#409EFF !important;
                }
            }
            a{
                color: #429EFD;
                text-decoration: underline;
                margin-left: 11px;
                cursor: pointer;
            }
        }
        .status{
            width: 151px;
            height: 50px;
            display: inline-block;
            background: url("../../assets/my_message_status.png");
            background-position: 0px 50px;
            position: absolute;
            top: 0;
            right: 75px;
            transform: rotate(20deg);
        }
    }
</style>
