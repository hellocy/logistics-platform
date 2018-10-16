<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-wraper">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>问题反馈</h3>
            <span>状态：新建</span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="0px" class="demo-formData">
                <ul>
                    <li>
                        <div class="account-block">
                            <el-form-item prop="title">
                                <label class="field-label"><span class="red">*</span>反馈标题</label>
                                <el-input v-model="formData.title" class="contract-subject">
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="question_type">
                                <label class="field-label"><span class="red">*</span>问题类型</label>
                                <el-select v-model="formData.question_type" placeholder="请选择">
                                    <el-option
                                        v-for="item in questionTypeArray"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item class="feedback-content" prop="content">
                                <label class="field-label"><span class="red">*</span>反馈内容</label>
                                <el-input type="textarea" v-model="formData.content"></el-input>
                            </el-form-item>

                            <el-form-item class="upload-attachment-box" ref="_attahcs">
                                <label class="field-label">上传附件</label>
                                <el-upload
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
                                    <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                                </el-upload>
                            </el-form-item>

                            <el-form-item class="connect-way" prop="connect_type">
                                <label class="field-label" style="float:left;padding-right:10px;">联系方式</label>
                                <el-col :span="7">
                                    <el-select v-model="formData.connect_type" placeholder="请选择">
                                        <el-option
                                            v-for="item in connectWayArray"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="formData.connect_type_value" class="connect-way-value"></el-input>
                                </el-col>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formData')" class="save">提交</el-button>
                            <span class="back" @click="back()">放弃</span>
                        </el-form-item>
                    </li>
                </ul>
            </el-form>
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
import feedbackApi from '../../api/feedback'
export default {
    components: {
        commonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'new-feedback',
            breadcrumbList: [
                {
                    name: '问题反馈',
                    url: '/feedback_list'
                },
                {
                    name: '新建',
                    url: ''
                }
            ],
            formData: {
                title: '',
                question_type: '',
                content: '',
                attachs: [], // 上传附件
                connect_type: '',
                connect_type_value: '',
                files: []
            },
            status: 1,
            questionTypeArray: [
                {
                    label: '请选择',
                    id: ''
                }
            ],
            connectWayArray: [
                {
                    label: '请选择',
                    id: ''
                }
            ],
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
        rules () {
            return {
                title: [
                    { required: this.isChannelIdRequired, message: '反馈标题不能为空', trigger: 'blur' }
                ],
                question_type: [
                    { required: this.isChannelIdRequired, message: '请选择问题类型', trigger: 'change' }
                ],
                content: [
                    { required: this.isChannelIdRequired, message: '反馈内容不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.data.token = util.getCache('company_info', 'local').token // token
        let that = this
        feedbackApi.getQuestionType().then(res => {
            if (res.code === 200) {
                for (let i in res.data.type_dict) {
                    that.questionTypeArray.push({
                        id: i,
                        label: res.data.type_dict[i]
                    })
                }

                for (let i in res.data.contact_type_dict) {
                    that.connectWayArray.push({
                        id: i,
                        label: res.data.contact_type_dict[i]
                    })
                }
            }
        })
    },
    methods: {

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
                console.log(files[0], _self.formData.files, 90797)
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

        submitForm (formName) { // 提交数据
            let that = this
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        feedbackApi.submitFeedbackInfo({
                            title: that.formData.title,
                            type: that.formData.question_type,
                            content: that.formData.content,
                            attachment: that.formData.files.map(item => {
                                return {
                                    origin_name: item.origin_name,
                                    save_path: item.save_path
                                }
                            }),
                            contact_type: that.formData.connect_type,
                            contact: that.formData.connect_type_value
                        }).then((res) => {
                            if (res.code === 200) {
                                that.$router.push({ path: '/feedback_list' })
                            } else {
                                that.$message.error(res.msg)
                            }
                        })
                    }
                })
            }, 0)
        },
        back () { // 返回列表
            this.$router.push({ path: '/feedback_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'new-feedback';
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
            margin-bottom: 10px;
            overflow: hidden;
            background-color: #fff;
            h3{
                font-size: 16px;
                margin: 20px 0 7px;
            }
            span{
                color: #429EFD;
                font-size: 12px;
            }
        }
        .#{$prfClass}-content{
            width: 720px;
            padding: 36px 91px 20px 81px;
            background-color: #fff;
            margin: 0 auto;
            h4{
                font-size: 16px;
                line-height: 17px;
                padding-bottom: 11px;
                border-bottom: 1px #F1F1F7 solid;
                margin-bottom: 28px;
            }
            .field-label{
                display: inline-block;
                padding: 0 5px;
                color: #606266;
                width: 115px;
                text-align: right;
                .red{
                    color:red;
                    padding: 0 5px;
                }
            }
            .account-block{
                padding-left: 80px;
                .el-form-item{
                    margin-bottom: 16px;
                }
                .el-textarea{
                    width:auto;
                    vertical-align: middle;
                }
                .el-input__inner, .el-textarea__inner{
                    width: 380px;
                }
                .el-input{
                    width: auto;
                }
                .connect-way{
                    .el-input__inner{
                        width: 100%;
                    }
                }
                .connect-way-value{
                    margin-left:18px;
                    .el-input__inner{
                        width: 180px;
                    }
                }
                .feedback-content{
                    .el-textarea__inner{
                        height: 120px;
                    }
                }
            }
            .upload-attachment{
                display: inline-block;
                vertical-align: middle;
            }
            .el-upload-list{
                margin-top:20px;
                font-size:12px;
                .el-upload-list__item{
                    max-width: 390px;
                }
                .el-upload-list__item-name{
                    color: #429EFD;
                    text-decoration: underline;
                }
            }
            .el-upload__tip{
                margin-top: 11px;
                line-height: 2px;
                font-size: 12px;
                font-weight: 400;
                color: #BFC3CB;
            }
            .invalid-tip {
                color:#f56c6c;
                font-size:12px;
            }
            .chang-reason{
                margin-top:30px;
            }
            li:last-child{
                .el-form-item__content{
                    margin-left: 220px !important;
                }
                .el-form-item{
                    margin-top: 42px;
                }
            }
            .save{
                width: 160px;
            }
            .back{
                color: #429EFD;
                font-size: 14px;
                text-decoration: underline;
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
</style>
