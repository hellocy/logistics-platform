<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-wrapper">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>问题标题：<strong class="fd-title">{{question_title}}</strong></h3>
            <span>反馈日期：{{feedback_date}}</span><span>问题类型：{{question_type}}</span><span class="question-status">状态：{{question_status_txt}}</span>
        </div>
        <div :class="[prfClass + '-content']">
            <feedback-list :feedback_list="feedbackList"></feedback-list>
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
            prfClass: 'view-feedback',
            breadcrumbList: [
                {
                    name: '问题反馈',
                    url: '/feedback_list'
                },
                {
                    name: '查看',
                    url: ''
                }
            ],
            question_title: '',
            feedback_date: '',
            question_type_obj: {},
            question_type: '',
            question_status: '',
            question_status_txt: '',
            formData: {
                title: '',
                question_type: '',
                content: '',
                attachs: [], // 上传附件
                connect_way: '',
                connect_way_value: '',
                files: []
            },
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

        back () { // 返回列表
            this.$router.push({ path: '/feedback_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'view-feedback';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .breadcrumb-wrapper{
            margin: 10px 20px;
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
                    color:#909399
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
    }
</style>
