<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-wraper">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>问题标题：<strong class="fd-title">{{question_title}}</strong></h3>
            <span>反馈日期：{{feedback_date}}</span><span>问题类型：{{question_type}}</span><span class="question-status">状态：{{question_status_txt}}<span class="remain-time" v-if="question_status === 3">（剩余时间{{remain_time}}）</span></span>
        </div>
        <div :class="[prfClass + '-content']">
            <feedback-list :feedback_list="feedbackList"></feedback-list>
        </div>
        <div class="envleate" v-if="question_status === 3">
            <p class="tip">此次服务体验怎么样？</p>
            <div class="stars-wrapper">
                <i class="el-icon-star-on" :class="{'selected': stars < 1}" @click="select_service_level(1)"></i>
                <i class="el-icon-star-on" :class="{'selected': stars < 2}" @click="select_service_level(2)"></i>
                <i class="el-icon-star-on" :class="{'selected': stars < 3}" @click="select_service_level(3)"></i>
                <i class="el-icon-star-on" :class="{'selected': stars < 4}" @click="select_service_level(4)"></i>
                <i class="el-icon-star-on last" :class="{'selected': stars < 5}" @click="select_service_level(5)"></i>
                <span class="service-level">{{service_level}}</span>
            </div>
        </div>
        <div class="completed" v-if="question_status === 4">
            完成，感谢您的评价 !
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import breadcrumb from '../../components/breadcrumb'
import util from 'commonVueLib/util/tools'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import FeedbackList from '../../components/feedback.vue'
import feedbackApi from '../../api/feedback'
export default {
    components: {
        commonHeader,
        ImagePreview,
        FeedbackList,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'evaluate-feedback',
            breadcrumbList: [
                {
                    name: '问题反馈',
                    url: '/feedback_list'
                },
                {
                    name: '评价',
                    url: ''
                }
            ],
            question_title: '',
            feedback_date: '',
            question_type: '',
            question_status: '',
            question_status_txt: '',
            question_status_text_arr: ['待回复', '进行中', '待评价', '已评价', '过期未评价'],
            remain_time: '0天00小时00分00秒',
            stars: 3,
            formData: {
                title: '',
                question_type: '',
                content: '',
                attachs: [], // 上传附件
                connect_way: '',
                connect_way_value: '',
                files: []
            },
            statusTextArr: ['申请', '待提交', '审核中', '已审核', '已驳回'],
            status: 1,
            feedbackList: [],
            uploadUrl: window.GLOBAL.hostUrl + 'api/files?tag=logistics_enterprise', // 上传api
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            isChannelIdRequired: true,
            isAttachmentRequired: true,
            data: {
                token: ''
            }
        }
    },
    computed: {
        service_level () {
            return ['很不满意', '不满意', '满意', '比较满意', '相当满意'][this.stars - 1]
        }
    },
    created () {
        let that = this
        that.initFeedbackInfo()
        this.data.token = util.getCache('company_info', 'local').token // token
    },
    methods: {

        formatAttachData (attachArr) {
            let attachObj = {
                imgs: [],
                files: []
            }
            let tArr = 'jpg, png, jpeg, gif'
            for (let i = 0; i < attachArr.length; i++) {
                let name = attachArr[i].origin_name
                let url = attachArr[i].url
                let type = name.substring(name.lastIndexOf('.') + 1, name.length)
                let _attr = ''
                if (tArr.indexOf(type) === -1) {
                    _attr = 'files'
                } else {
                    _attr = 'imgs'
                }
                attachObj[_attr].push({
                    url: url,
                    name: name
                })
            }
            return attachObj
        },

        initFeedbackInfo () {
            // 获取问题反馈的所有信息
            let that = this
            feedbackApi.getFeedbacksList({id: this.$route.params.id}).then((res) => {
                if (res.code === 200) {
                    let _arr = []
                    let info = res.data.info
                    this.question_title = info.title
                    this.feedback_date = info.created_at
                    this.question_status = info.status
                    this.question_status_txt = info.status_txt
                    this.type = info.type

                    that.runTime(info.closed_at)

                    feedbackApi.getQuestionType().then(res => {
                        if (res.code === 200) {
                            that.question_type = res.data.type_dict[that.type]
                        }
                    })

                    let fb = res.data.list.data
                    for (let i = 0; i < fb.length; i++) {
                        _arr.push({
                            icon: require('../../assets/user_img.png'), // fb[i].icon,
                            qTitle: fb[i].creater_name,
                            qContent: fb[i].content,
                            qDate: fb[i].created_at,
                            attachments: that.formatAttachData(fb[i].attachment),
                            contact_type: fb[i].contact_type,
                            contact: fb[i].contact
                        })
                    }
                    this.feedbackList = _arr

                    this.feedbackList.unshift({
                        icon: require('../../assets/user_img.png'), // info.icon,
                        qTitle: info.creater_name,
                        qContent: info.content,
                        qDate: info.created_at,
                        attachments: that.formatAttachData(info.attachment),
                        contact_type: info.contact_type,
                        contact: info.contact
                    })
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        runTime (closedAt) {
            let that = this
            let _closeAt = new Date(closedAt).getTime()

            let timer = setInterval(function () {
                let disTime = 3 * 24 * 3600 * 1000 - (new Date().getTime() - _closeAt)

                if (disTime <= 0) {
                    clearInterval(timer)
                    return
                }
                // 计算出相差天数
                let days = Math.floor(disTime / (24 * 3600 * 1000))

                // 计算出相差小时数
                let leave1 = disTime % (24 * 3600 * 1000)
                let hours = Math.floor(leave1 / (3600 * 1000))

                // 计算相差分钟数
                let leave2 = leave1 % (3600 * 1000)
                let minutes = Math.floor(leave2 / (60 * 1000))

                // 计算相差秒数
                let leave3 = leave2 % (60 * 1000)
                let seconds = Math.round(leave3 / 1000)
                hours = hours < 10 ? '0' + hours : hours
                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds
                that.remain_time = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
            }, 1000)
        },

        // 预览图片
        preview (item) {
            let _self = this
            // 文件格式
            let oName = item.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(item.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = item.url
            }
        },

        select_service_level (level) { // 提交评价信息
            let that = this
            that.stars = level

            feedbackApi.evaluate({
                id: this.$route.params.id,
                appraise: that.stars
            }).then((res) => {
                if (res.code === 200) {
                    that.$message.success(res.msg)
                    that.question_status_txt = '已评价'
                    that.question_status = 4
                } else {
                    that.$message.error(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'evaluate-feedback';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .breadcrumb-wraper{
            margin: 12px 0 22px 20px;
        }
        .top{
            width: 808px;
            margin: 0 auto;
            padding: 0 42px 17px;
            overflow: hidden;
            background-color: #EBF4FE;
            border:1px solid #e0e0e0;
            border-bottom:0;
            h3{
                font-size: 16px;
                margin: 20px 0 7px;
                font-weight:bold;
                .fd-title{
                    width:710px;
                    display:inline-block;
                }
            }
            span{
                color: #429EFD;
                font-size: 12px;
                margin-right:30px;
                &.question-status{
                    color:#E6A23C;
                }
                &.remain-time{
                    color:#E6A23C;
                }
            }
        }
        .#{$prfClass}-content{
            width: 852px;
            padding: 36px 0 20px 40px;
            background-color: #fff;
            margin: 0 auto;
            border:1px solid #e0e0e0;
            border-top:0;
        }
        .envleate{
            width: 808px;
            height: 165px;
            margin: 20px auto;
            padding: 0 42px 17px;
            overflow: hidden;
            background-color: #fff;
            border:1px solid #e0e0e0;
            text-align: center;
            color:#606266;
            .tip{
                margin-top: 50px;
                margin-bottom: 22px;
                font-size:14px;
            }
            .stars-wrapper{
                i{
                    font-size:26px;
                    margin-right:20px;
                    cursor:pointer;
                    vertical-align: middle;
                    &.el-icon-star-on{
                        color:#F7BA2A;
                        &.selected{
                            color:#E4E7ED
                        }
                        &.last{
                            margin-right:10px;
                        }
                    }
                }
                .service-level{
                    display: inline-block;
                    width:80px;
                    text-align: left;
                }
            }
        }
        .completed{
            width: 808px;
            height: 165px;
            margin: 20px auto;
            padding: 0 42px 17px;
            overflow: hidden;
            background-color: #fff;
            border:1px solid #e0e0e0;
            text-align: center;
            line-height:165px;
            color:#606266;
            font-size:14px;
        }
    }
</style>
