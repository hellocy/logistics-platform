<template>
    <div :class="prfClass">
        <common-header></common-header>
        <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        <div class="top">
            <h3>报价&分区信息</h3>
            <span>状态：{{statusTextArr[status]}}</span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="0px" class="demo-formData">
                <ul>
                    <li>
                        <div class="account-block">
                            <el-form-item prop="channel_id">
                                <label class="field-label"><span class="red">*</span>渠道名称</label>
                                <el-select v-model="formData.channel_id" filterable placeholder="请选择">
                                    <el-option
                                        v-for="item in channelArray"
                                        :key="item.id"
                                        :label="item.channel_name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item prop="begin_time">
                                <label class="field-label"><span class="red">*</span>生效开始时间</label>
                                <el-date-picker
                                    v-model="formData.begin_time"
                                    value-format="yyyy-MM-dd"
                                    type="date">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item prop="end_time">
                                <label class="field-label"><span class="red">*</span>生效结束时间</label>
                                <el-date-picker
                                    v-model="formData.end_time"
                                    value-format="yyyy-MM-dd"
                                    type="date">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item class="upload-attachment-box" ref="_attahcs">
                                <label class="field-label"><span class="red">*</span>报价&分区附件</label>
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
                                <span class="invalid-tip red" v-if="price_partition_attachment">请上传报价&分区附件</span>
                            </el-form-item>

                            <el-form-item class="chang-reason" prop="change_reason">
                                <label class="field-label">变更原因</label>
                                <el-input type="textarea" v-model="formData.reason"></el-input>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formData')" class="save">提交审核</el-button>
                            <el-button type="primary" plain @click="saveForm('formData')" class="save">保存</el-button>
                            <span class="back" @click="back()">返回列表</span>
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
import channelApi from '../../api/channel'
import util from 'commonVueLib/util/tools'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
export default {
    components: {
        commonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'price-partition-change',
            formData: {
                id: '',
                channel_id: '', // 物流渠道
                begin_time: '', // 生效开始时间
                end_time: '', // 生效结束时间
                attachs: [], // 报价&分区附件
                reason: '', // 变更原因
                files: []
            },
            statusTextArr: ['申请', '编辑', '待提交', '审核中', '重新申请', '已驳回'],
            status: 0,
            channelArray: [],
            uploadUrl: window.GLOBAL.hostUrl + 'api/files?tag=quote', // 上传api
            price_partition_attachment: false,
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
                    name: '报价&分区信息',
                    url: '/price_partition'
                }, {
                    name: this.statusTextArr[this.status],
                    url: ''
                }
            ]
        },
        rules () {
            let that = this
            let limitedLen = (rule, value, callback) => {
                let _value = this.formData.reason
                if (_value === '') {
                    callback()
                } else if (_value.length > 255) {
                    callback(new Error('字符数不能超过255个'))
                } else {
                    callback()
                }
            }
            let notAfter = (rule, value, callback) => {
                let _value = this.formData.begin_time
                let _endTime = this.formData.end_time
                let notValid = new Date(_value).getTime() > new Date(_endTime).getTime()
                if (notValid) {
                    if (_endTime !== '') {
                        that.$refs.formData.validateField('end_time')
                    }
                    callback()
                } else {
                    if (_endTime !== '') {
                        that.$refs.formData.validateField('end_time')
                    }
                    callback()
                }
            }
            let notBefore = (rule, value, callback) => {
                let _value = this.formData.end_time
                let _beginTime = this.formData.begin_time
                let notValid = new Date(_value).getTime() < new Date(_beginTime).getTime()
                if (notValid) {
                    callback(new Error('生效结束时间不能小于生效开始时间'))
                } else {
                    callback()
                }
            }

            return {
                channel_id: [
                    { required: this.isChannelIdRequired, message: '物流渠道不能为空', trigger: 'change' }
                ],
                begin_time: [
                    { required: this.isChannelIdRequired, message: '生效开始时间不能为空', trigger: 'change' },
                    { validator: notAfter, trigger: 'blur' }
                ],
                end_time: [
                    { required: this.isChannelIdRequired, message: '生效结束时间不能为空', trigger: 'change' },
                    { validator: notBefore, trigger: 'blur' }
                ],
                change_reason: [
                    { validator: limitedLen, trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        let that = this
        // 获取渠道
        channelApi.getChannels().then((res) => {
            if (res.code === 200) {
                res.data.unshift(
                    {
                        channel_name: '请选择',
                        id: '',
                        delivery_type: ''
                    }
                )
                that.channelArray = res.data
            }
        })

        that.initFormData()
    },
    created () {
        this.data.token = util.getCache('company_info', 'local').token // token
    },
    methods: {
        // 编辑价格分区信息时，获取初始值
        initFormData () {
            let that = this
            let id = this.$route.params.id
            if (id !== '__new__') {
                // 获取渠道
                channelApi.getQuotesInfoData({ id: id }).then((res) => {
                    if (res.code === 200) {
                        that.status = res.data.status
                        that.formData.id = res.data.id
                        that.formData.channel_id = res.data.channel_id
                        that.formData.begin_time = res.data.begin_time
                        that.formData.end_time = res.data.end_time
                        that.formData.attachs = res.data.attachs
                        that.formData.reason = res.data.reason
                        that.formData.files = res.data.attachs
                        for (let i = 0; i < res.data.attachs.length; i++) {
                            that.formData.attachs[i].name = res.data.attachs[i].origin_name
                        }
                    } else {
                        that.$alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }
                })
            }
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
                _self.formData.files.push(files)
                _self.price_partition_attachment = false
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
                _self.price_partition_attachment = true
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
        // 修改各字段的必填校验属性
        setRequired (isRequired) {
            this.isChannelIdRequired = isRequired
            this.isAttachmentRequired = isRequired
        },
        saveToDraft (formName) { // 保存草稿
            let that = this
            that.setRequired(false)
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (!that.price_partition_attachment && valid) {
                        channelApi.addNewQuotesInfo({
                            channel_id: that.formData.channel_id,
                            begin_time: that.formData.begin_time,
                            end_time: that.formData.end_time,
                            attachs: that.formData.files.map(item => item.id),
                            reason: that.formData.reason
                        }).then((res) => {
                            if (res.code === 200) {
                                that.$message.success(res.msg)
                                that.$router.push({ path: '/price_partition' })
                            } else {
                                that.$message.error(res.msg)
                            }
                        })
                    }
                })
            }, 0)
        },
        saveForm (formName) { // 提交数据
            let that = this
            that.setRequired(true)
            setTimeout(function () {
                that.price_partition_attachment = that.formData.attachs.length === 0
                that.$refs[formName].validate((valid) => {
                    if (!that.price_partition_attachment && valid) {
                        let id = that.$route.params.id
                        let method = id === '__new__' ? 'saveQuotesInfo' : 'editQuotesInfo'
                        channelApi[method]({
                            id: that.formData.id,
                            channel_id: that.formData.channel_id,
                            begin_time: that.formData.begin_time,
                            end_time: that.formData.end_time,
                            attachs: that.formData.files.map(item => item.id),
                            reason: that.formData.reason
                        }).then((res) => {
                            if (res.code === 200) {
                                that.$router.push({ path: '/price_partition' })
                            } else {
                                that.$alert(res.msg, '错误', {
                                    confirmButtonText: '确定',
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            }, 0)
        },
        submitForm (formName) { // 提交数据
            let that = this
            that.setRequired(true)
            setTimeout(function () {
                that.price_partition_attachment = that.formData.attachs.length === 0
                that.$refs[formName].validate((valid) => {
                    if (!that.price_partition_attachment && valid) {
                        channelApi.submitQuotesInfo({
                            id: that.formData.id,
                            channel_id: that.formData.channel_id,
                            begin_time: that.formData.begin_time,
                            end_time: that.formData.end_time,
                            attachs: that.formData.files.map(item => item.id),
                            reason: that.formData.reason
                        }).then((res) => {
                            if (res.code === 200) {
                                that.$router.push({ path: '/price_partition_auditing/' + res.data })
                            } else {
                                that.$message.error(res.msg)
                            }
                        })
                    }
                })
            }, 0)
        },
        back () { // 返回列表
            this.$router.push({ path: '/price_partition' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'price-partition-change';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .breadcrumb-box{
            margin: 10px 20px;
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
            .el-textarea{
                width:auto;
            }
            .account-block{
                padding-left: 8px;
                .el-input__inner, .el-textarea__inner{
                    width: 380px;
                }
                .el-input{
                    width: auto;
                }
                .el-form-item{
                    margin-bottom:16px;
                    .star{
                        position: absolute;
                        left: -118px;
                        top: 3px;
                        color: red;
                    }
                }
            }
            .upload-attachment{
                display: inline-block;
                vertical-align: top;
            }
            .el-upload-list{
                margin-top:20px;
                font-size:12px;
                .el-upload-list__item{
                    max-width: 390px;
                    .el-upload-list__item-name{
                        color: #429EFD;
                    }
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
                display: inline-block;
                margin-left: 79px;
                color:#f56c6c;
                font-size:12px;
            }
            .chang-reason{
                /*margin-top:30px;*/
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
