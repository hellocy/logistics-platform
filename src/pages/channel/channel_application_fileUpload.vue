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
                <div class="info">
                    <h3>附件上传</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="rules">
                    <el-form-item prop="quote_attachs" class="attachment">
                        <div class="label-name"><span class="red">*</span>报价附件</div>
                        <el-upload
                            multiple
                            name="files"
                            class="upload-attachment"
                            :uploadName="'quote_attachs'"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.quote_attachs">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="sop_attachs" class="attachment sop">
                        <div class="label-name"><span class="red">*</span>操作SOP</div>
                        <el-upload
                            multiple
                            name="files"
                            class="upload-attachment"
                            :uploadName="'sop_attachs'"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.sop_attachs">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                        <span class="sop-download" @click="downloadSop()">SOP上传模板下载</span>
                    </el-form-item>
                    <el-form-item prop="api_attachs">
                        <div class="label-name">API对接资料</div>
                        <el-upload
                            multiple
                            name="files"
                            class="upload-attachment"
                            :uploadName="'api_attachs'"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.api_attachs">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="mark">
                        <div class="label-name">备注</div>
                        <el-input type="textarea"
                                    :rows="3"
                                    class="remark_textarea"
                                    placeholder=""
                                    v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('rules', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button @click="save_draft('rules')" type="primary" class="save" plain v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" @click="prev()" v-if="status != 5">上一步</el-button>
                        <el-button type="primary" @click="next('rules')" v-if="status != 5">下一步</el-button>
                        <a class="back" @click="back()">返回</a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import util from 'commonVueLib/util/tools'
import breadcrumb from '../../components/breadcrumb'
import channelApi from '../../api/channel'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'channel-fileUpload',
    components: {
        CommonHeader,
        StepList,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-fileUpload',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                quote_attachs: [], // 报价附件
                sop_attachs: [], // 操作sop
                api_attachs: [], // api对接资料
                remark: '', // 备注
                sop_tpl_url: '' // 上传sop模板下载
            },
            rules: {
                quote_attachs: [ // 报价附件
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                sop_attachs: [ // 报价附件
                    { required: true, message: '不能为空', trigger: 'change' }
                ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/files?tag=channel', // 上传api
            typeNumber: 6, // 当前第n步
            stepTitle: '附件上传', // 当前第n步的标题
            stepSpace: 66,
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
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
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '附件上传',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        let _self = this
        $('html,body').animate({scrollTop: '0px'}, 600)
        this.formData.id = this.$route.params.id // 获取本条渠道数据的id
        this.mode_type = this.$route.params.mode_type
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.typeNumber = 7
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
        let lmpChannelApplicationB2b = util.getCache('lmp_channelApplication_data')
        if (lmpChannelApplicationB2b.quote_attach) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.quote_attach
            for (let i = 0; i < this.formData.quote_attachs.length; i++) {
                this.formData.quote_attachs[i].name = this.formData.quote_attachs[i].origin_name
            }
            for (let i = 0; i < this.formData.sop_attachs.length; i++) {
                this.formData.sop_attachs[i].name = this.formData.sop_attachs[i].origin_name
            }
            for (let i = 0; i < this.formData.api_attachs.length; i++) {
                this.formData.api_attachs[i].name = this.formData.api_attachs[i].origin_name
            }
        } else { // 添加从接口取下载链接
            channelApi.getSopAttachment(this.$route.params.id).then(function (res) { // 获取sop的附件下载链接
                if (res.code === 200) {
                    _self.formData.sop_tpl_url = res.data.sop_url
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'quote_attach'
        util.getNextApi(key, this.status)
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
        uploadSuccess (response, file, fileList, key) {
            let _self = this
            if (response.code === 200) {
                _self.formData[key].push(response.data)
                $('.' + key).find('.el-form-item__error').hide() // 样式
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
            // 样式
            $('.' + key).find('.el-form-item__error').hide()
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
                            util.removeCache('company_info', 'local') // 删除企业信息
                            _self.$router.push({ path: '/login' })
                        }
                    }
                })
            }
        },
        // 文件移除
        uploadRemove (file, fileList, key) {
            let _self = this
            _self.formData[key] = fileList
            _self.showAndHideUpload(_self.formData[key], key)
        },
        // 隐藏/显示附件校验
        showAndHideUpload (arr, key) {
            console.log(arr, key)
            // 样式
            if (arr.length === 0) {
                $('.' + key).find('.el-form-item__error').show()
            }
        },
        // 预览上传文件
        previewUpload (file) {
            let _self = this
            // 文件格式
            let oName = file.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(file.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = file.url
            }
        },
        downloadSop () { // sop模板下载
            window.open(this.formData.sop_tpl_url)
        },
        next (formName, save) { // 下一步
            let _self = this
            let pass = true
            _self.$refs[formName].clearValidate()
            if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                delete _self.formData.save_as_draft
            } else {
                _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
            }
            _self.$refs[formName].validateField('quote_attachs', (valid) => {
                if (valid) {
                    pass = false
                }
            })
            _self.$refs[formName].validateField('sop_attachs', (valid) => {
                if (valid) {
                    pass = false
                }
            })
            if (pass) {
                let formData = {}
                let quoteAttachment = []
                let operateSopAttachment = []
                let apiAbutment = []
                let quoteAttachs = _self.formData.quote_attachs
                let sopAttachs = _self.formData.sop_attachs
                let apiAttachs = _self.formData.api_attachs
                if (quoteAttachs) {
                    for (let k in quoteAttachs) {
                        quoteAttachment.push(quoteAttachs[k].id)
                    }
                }
                if (sopAttachs) {
                    for (let k in sopAttachs) {
                        operateSopAttachment.push(sopAttachs[k].id)
                    }
                }
                if (apiAttachs) {
                    for (let k in apiAttachs) {
                        console.log(apiAttachs[k])
                        apiAbutment.push(apiAttachs[k].id)
                    }
                }
                formData = $.extend({}, _self.formData)
                formData.quote_attachs = quoteAttachment
                formData.sop_attachs = operateSopAttachment
                formData.api_attachs = apiAbutment
                channelApi.attach(util.getCache('channelApplication'), formData, _self.$route.params.id).then(function (res) {
                    if (res.code === 200) {
                        _self.$message({
                            showClose: true,
                            message: '保存成功！',
                            type: 'success'
                        })
                        if (res.data.id) {
                            _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                        }
                        _self.status = res.data.status
                        _self.formData.is_done = res.data.is_done
                        let data = util.getCache('lmp_channelApplication_data')
                        data.status = res.data.status // 重新改写缓存中整条数据的状态
                        data.quote_attach = $.extend({}, _self.formData)
                        util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                        util.getNextApi('quote_attach', _self.status) // 修改此条数据的状态
                        if (save !== 'save') {
                            _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                        } else { // 保存跳到资料预览页
                            _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                        }
                    } else {
                        _self.$alert(res.msg, '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                })
            }
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            _self.$refs[formName].clearValidate()
            _self.formData.save_as_draft = 1 // 是否是草稿 1是 2否
            let formData = {}
            let quoteAttachment = []
            let operateSopAttachment = []
            let apiAbutment = []
            let quoteAttachs = _self.formData.quote_attachs
            let sopAttachs = _self.formData.sop_attachs
            let apiAttachs = _self.formData.api_attachs
            if (quoteAttachs) {
                for (let k in quoteAttachs) {
                    quoteAttachment.push(quoteAttachs[k].id)
                }
            }
            if (sopAttachs) {
                for (let k in sopAttachs) {
                    operateSopAttachment.push(sopAttachs[k].id)
                }
            }
            if (apiAttachs) {
                for (let k in apiAttachs) {
                    apiAbutment.push(apiAttachs[k].id)
                }
            }
            formData = $.extend({}, _self.formData)
            formData.quote_attachs = quoteAttachment
            formData.sop_attachs = operateSopAttachment
            formData.api_attachs = apiAbutment
            channelApi.attach(util.getCache('channelApplication'), formData, _self.$route.params.id).then(function (res) {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '保存成功！',
                        type: 'success'
                    })
                    if (res.data.id) {
                        _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                    }
                    _self.status = res.data.status
                    let data = util.getCache('lmp_channelApplication_data')
                    data.status = res.data.status // 重新改写缓存中整条数据的状态
                    data.quote_attach = $.extend({}, _self.formData)
                    util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                    util.getNextApi('quote_attach', _self.status) // 修改此条数据的状态
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        prev () { // 上一步
            this.$router.push({ path: '/channel_application_pricing_model/' + this.$route.params.id + '/' + this.mode_type })
        },
        back () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-fileUpload';
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
        padding-bottom: 38px;
        .red{
            color:red
        }
        .info{
            padding-top: 40px;
            margin: 0px 91px 0px 89px;
            border-bottom: 1px solid #F1F1F7;
            width:720px;
            h3{
                color: #2F3032;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight:bold;
                padding-bottom: 11px;
            }
        }
        .formInfo{
            margin-top: 40px;
            .sop{
                position: relative;
                .sop-download {
                    position: absolute;
                    left: 420px;
                    top: 12px;
                    font-size: 12px;
                    text-decoration: underline;
                    color: #429EFD;
                    cursor: pointer
                }
            }
            .fileUpload{
                width: 100px;
                height: 32px;
                border-radius: 5px;
                color: #429EFD;
                border: 1px solid #B3D7FE;
                font-weight: 400;
            }
            .el-upload-list__item-name{
                color: #409eff;
            }
            .label-name{
                width: 130px;
                text-align: right;
                display: inline-block;
            }
            .upload-attachment{
                display: inline;
                margin-left: 12px;
            }
            .el-upload__tip{
                margin-top: 11px;
                line-height: 2px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #bfc3cb;
                margin-left: 146px;
            }
            .el-form-item__content{
                line-height: 2px !important;
                padding-left: 160px;
                .el-upload-list{
                    margin-left: 142px;
                    width: 350px;
                }
            }
            .el-form-item__error, .error{
                margin-left: 8px;
                display: inline-block;
                position: static;
                font-size: 14px;
                color: #f46b6b;
            }
            .el-textarea{
                margin-left: 12px;
                width: 380px;
                vertical-align: middle;
                resize: none
            }
            .attachment{
                position: relative;
                .el-form-item__error{
                    position: absolute;
                    left: 420px;
                    top: 6px;
                    width: 59px;
                }
            }
            .sop .el-form-item__error{
                left: 520px;
            }
            .footer{
                text-align: center;
                margin-top: 40px;
                .el-form-item__content{
                    padding-left: 0
                }
                button{
                    width: 160px;
                }
                .back{
                    color: #429EFD;
                    font-size: 14px;
                    text-decoration: underline;
                    margin-left: 10px;
                    cursor: pointer;
                }
                .save{
                    background-color: #fff;
                    color: #409EFF;
                }
                .save:hover{
                    color:#3a8ee6
                }
            }
        }
    }
</style>
