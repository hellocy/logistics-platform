<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-wraper">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>问题标题：<strong class="fd-title">{{question_title}}</strong></h3>
            <span>反馈日期：{{feedback_date}}</span><span>问题类型：{{question_type}}</span>
            <span class="question-status">状态：{{question_status_txt}}</span>
            <span class="remain-time" v-if="question_status === 3">（剩余时间{{remainTime}}）</span>
        </div>
        <div :class="[prfClass + '-content']">
            <feedback-list :feedback_list="feedbackList"></feedback-list>
        </div>
        <div class="reply-wrapper" v-if="question_status === 1 || question_status === 2">
            <el-input type="textarea" id="replay-box" v-model="formData.content" placeholder="在这里输入回复内容..."></el-input>
            <div class="attachment-box">
                <el-upload ref="uploadAttachs"
                    multiple
                    name="files"
                    class="upload-attachment"
                    :action="uploadUrl"
                    :headers="data"
                    :before-upload="handleBeforeUpload"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :on-remove="uploadRemove"
                    :on-preview="preview"
                    :file-list="formData.attachs"
                    >
                    <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                </el-upload>
            </div>
        </div>
        <div class="footer" v-if="question_status === 1 || question_status === 2">
            <el-button class="btn-send" type="primary" @click="submitForm">发送</el-button>
            <a href="javascript:" class="btn-complete" @click="complete">结束问题</a>
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
            prfClass: 'reply-feedback',
            question_title: '',
            feedback_date: '',
            currentOptTxt: '',
            question_type_arr: {},
            question_type: '',
            type: 0,
            remainTime: '',
            question_status: '',
            question_status_txt: '',
            formData: {
                content: '',
                attachs: [], // 上传附件
                files: []
            },
            statusTextArr: ['申请', '进行中', '待提交', '审核中', '已审核', '已驳回'],
            status: 1,
            feedbackList: [],
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=suggestion', // 上传api
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
        breadcrumbList () {
            return [
                {
                    name: '问题反馈',
                    url: '/feedback_list'
                },
                {
                    name: this.currentOptTxt,
                    url: ''
                }
            ]
        }
    },
    created () {
        this.data.token = util.getCache('company_info', 'local').token // token
        let that = this
        feedbackApi.getQuestionType().then(res => {
            if (res.code === 200) {
                that.question_type_arr = res.data.type_dict
            }
        })

        that.initFeedbackInfo()
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

                    this.currentOptTxt = this.question_status === 1 ? '补充' : '回复'

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

        // 上传附件
        handleBeforeUpload (file) {
            // 限制大小及格式
            let _self = this
            let oName = file.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let isHas = true
            let tipMessage = ''
            let tArr = 'jpg, png, jpeg, gif, pdf, doc, docx, xls, xlsx'

            if (tArr.indexOf(type) === -1) {
                isHas = false
                tipMessage = '附件格式不对'
            } else if (file.size > 5 * 1024 * 1024) {
                isHas = false
                tipMessage = '附件大小不能超过5M'
            }
            if (!isHas) {
                _self.$confirm(tipMessage, '上传失败', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false,
                    center: true,
                    customClass: 'fileCls'
                }).catch(() => {
                })
                return false
            }
        },

        // 文件上传成功
        uploadSuccess (response, file, fileList) {
            let _self = this
            if (response.code === 200) {
                let files = response.data
                _self.formData.attachs = fileList
                _self.formData.files.push(files[0])
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: action => {
                        // _self.$refs[key].clearFiles()
                    }
                })
            }
        },

        // 文件上传失败
        uploadError (response, file, fileList) {
            let _self = this
            if (response.message) {
                let data = JSON.parse(response.message)
                _self.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (response.status === 401) {
                            _self.$router.push({ path: '/login' })
                        }
                    }
                })
            }
        },

        // 文件移除
        uploadRemove (file, fileList) {
            let _self = this
            _self.formData.attachs = fileList
            if (fileList.length === 0) {
            }
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

        submitForm (formName) { // 发送
            let that = this
            if (that.formData.content === '') {
                that.$message.error('请输入回复内容')
                $('#replay-box').focus()
                return
            }
            feedbackApi.replyFeedbackInfo({
                suggestion_id: this.$route.params.id,
                content: that.formData.content,
                attachment: that.formData.files.map(item => {
                    return {
                        origin_name: item.origin_name,
                        save_path: item.save_path
                    }
                })
            }).then((res) => {
                if (res.code === 200) {
                    that.$message.success(res.msg)
                    that.initFeedbackInfo()
                    that.formData.content = ''
                    that.formData.files = []
                    $('#feedback-list-box').animate({
                        scrollTop: $('#feedback-list-box')[0].scrollHeight
                    }, 1500)
                    that.$refs.uploadAttachs.clearFiles()
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        complete (formName) { // 结束问题
            let that = this
            feedbackApi.completeFeedbackInfo({id: this.$route.params.id}).then((res) => {
                if (res.code === 200) {
                    that.$message.success(res.msg)
                    that.$router.push({ path: '/evaluate_feedback/' + that.$route.params.id })
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'reply-feedback';
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
                overflow: hidden;
                text-overflow: ellipsis;
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
                    margin-right:0;
                }
                &.remain-time{
                    color:#E6A23C
                }
            }
        }
        .#{$prfClass}-content{
            width: 852px;
            padding: 36px 0px 20px 40px;
            background-color: #fff;
            margin: 0 auto;
            border:1px solid #e0e0e0;
            border-top:0;
        }
        .reply-wrapper{
            width: 891px;
            margin: 20px auto;
            overflow: hidden;
            background-color: #fff;
            border:1px solid #e0e0e0;
            color:#606266;
            #replay-box{
                width: 891px;
                height:156px;
                border:0;
                padding:10px;
            }
            .attachment-box{
                background: #EBF4FE;
                min-height:20px;
                padding-left:30px;
                padding-bottom:20px;
                .el-button{
                    border:0;
                    color:#429EFD;
                    background: transparent;
                    margin-top:5px;
                }
                .el-upload-list__item{
                    width:386px;
                    background:#fff;
                    border-radius: 0;
                }
            }
            .el-upload-list__item{
                max-width: 390px;
            }
        }
        .footer{
            width: 891px;
            margin: 20px auto;
            .btn-send{
                float:left;
                width:113px;
                height:30px;
                padding:0;
            }
            .btn-complete{
                float:right;
                color:#429EFD;
                text-decoration: underline;
            }
        }
    }
</style>
