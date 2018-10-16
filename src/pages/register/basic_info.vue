<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <step-list :type="typeNumber"
                       :stepSpace="stepSpace"
                       :title="stepTitle"
                       :stepCount="stepCount"></step-list>
            <div :class="[prfClass + '-form']">
                <div class="info">
                    <h3>基础信息</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_basic_info">
                    <el-form-item class="company_name_cn" prop="company_cn">
                        <div class="label-name">*公司中文名</div>
                        <el-input
                            @input="companyFn()"
                            placeholder="请输入营业执照公司名全称"
                            v-model="formData.company_cn"></el-input>
                        <div class="success" v-show="successCn"><i class="el-icon-check"></i></div>
                        <div class="errorCn" v-show="repeatCn">中文名重复</div>
                    </el-form-item>

                    <el-form-item class="company_name_en" prop="company_en">
                        <div class="label-name">公司英文名</div>
                        <el-input
                            @input="companyEnFn()"
                            placeholder="如无则输入拼音"
                            v-model="formData.company_en"></el-input>
                        <div class="success" v-show="successEn"><i class="el-icon-check"></i></div>
                        <div class="errorEn" v-show="repeatEn">英文名重复</div>
                    </el-form-item>

                    <el-form-item prop="service_type">
                        <div class="label-name">*服务类型</div>
                        <el-checkbox-group class="serviceList" v-model="formData.service_type">
                            <el-checkbox
                                v-for="(item, index) in serviceList"
                                :key="index"
                                :label="index">{{ item }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item prop="company_profile">
                        <div class="label-name">*公司简介</div>
                        <el-input
                            class="company_profile"
                            type="textarea"
                            :rows="3"
                            @keyup.native="textareaNumber"
                            maxlength="500"
                            placeholder="请输入500字符之内的公司介绍"
                            v-model="formData.company_profile">
                        </el-input>
                        <span class="textareaNumber">{{ numberLen }}/500</span>
                    </el-form-item>

                    <el-form-item>
                        <div class="label-name">简介附件</div>
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
                            :on-preview="previewUpload"
                            :file-list="formData.profile_attachment">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <div class="next-form-middle"></div>

                    <el-form-item prop="company_website">
                        <div class="label-name">*公司网站</div>
                        <el-input
                            placeholder="例如：https://globale.com"
                            v-model="formData.company_website"></el-input>
                    </el-form-item>

                    <el-form-item class="business_address" prop="office_addr">
                        <div class="label-name">*办公地址</div>
                        <el-input
                            placeholder="精确到门牌号"
                            v-model="formData.office_addr"></el-input>
                    </el-form-item>

                    <el-form-item class="company_phone" prop="company_phone">
                        <div class="label-name">公司电话</div>
                        <el-input v-model="formData.company_phone"></el-input>
                    </el-form-item>
                    <el-form-item class="nextBtn" v-if="editMessage">
                        <el-button
                            @click="next('form_basic_info', 'save')"
                            type="primary">保存</el-button>
                        <el-button
                            @click="cancel()"
                            type="primary" class="save">返回</el-button>
                    </el-form-item>
                    <el-form-item class="nextBtn" v-else>
                        <el-button
                            @click="next('form_basic_info', 'next')"
                            type="primary" v-if="!editMessage">下一步</el-button>
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
import api from '../../api/register'
import util from 'commonVueLib/util/tools'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'logistics_basic_info',
    components: {
        StepList,
        CommonHeader,
        ImagePreview
    },
    data () {
        // let _self = this
        // let nameCn = (rule, value, callback) => {
        //     if (value !== '') {
        //         if (_self.successCn) {
        //             return callback()
        //         }
        //         _self.getName('cn', callback)
        //     } else {
        //         callback()
        //     }
        // }
        // let nameEn = (rule, value, callback) => {
        //     if (value !== '') {
        //         if (_self.successEn) {
        //             return callback()
        //         }
        //         _self.getName('en', callback)
        //     } else {
        //         callback()
        //     }
        // }

        let websiteValidator = (rule, value, callback) => {
            if (value !== '') {
                if (!/^(https|http)?:\/\//.test(value)) {
                    callback(new Error('格式不对!'))
                } else {
                    callback()
                }
            }
        }

        let phoneValidator = (rule, value, callback) => {
            if (value !== '') {
                if (!/^(([0/+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
                    callback(new Error('格式不对!'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        return {
            prfClass: 'register-basic-info',
            typeNumber: 1,
            formData: {
                company_cn: '', // 公司中文名
                company_en: '', // 公司英文名
                company_website: '', // 公司网站
                service_type: [], // 服务类型
                company_profile: '', // 公司简介
                profile_attachment: [], // 简介附件
                company_phone: '', // 公司电话
                office_addr: '' // 办公地址
            },
            editMessage: false, // 是否是编辑
            rules: {
                company_cn: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                // company_en: [
                //     { required: false, validator: nameEn, trigger: ['blur', 'change'] }
                // ],
                service_type: [
                    { required: true, message: '至少选择一个服务类型', trigger: ['blur', 'change'] }
                ],
                company_profile: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                company_website: [
                    { required: true, message: '请填写物流商官网', trigger: 'blur' },
                    { validator: websiteValidator, trigger: ['blur', 'change'] }
                ],
                office_addr: [
                    { required: true, message: '请输入公司地址', trigger: 'blur' }
                ],
                company_phone: [
                    { required: false, validator: phoneValidator, trigger: 'change' }
                ]
            },
            successCn: false, // 中文名成功
            repeatCn: false, // 中文名重复
            successEn: false,
            repeatEn: false,
            isCn: true, // 用于判断中文
            isEn: true,
            numberLen: 0,
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
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
            serviceList: [], // 服务类型
            stepSpace: 100, // nav中间宽度
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            data: {
                token: ''
            }
        }
    },
    created () {
        if (util.getCache('company_info', 'local') != null) {
            this.data.token = util.getCache('company_info', 'local').token // token
            // 获取状态
            let currentStep = util.getCache('lmp_All_info').current_step
            if (currentStep === 0) {
                this.stepTitle = '公司资料修改'
            }
        }
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        const dictItem = util.getCache('dictItem', 'local')
        if (util.getCache('dictItem', 'local') != null) {
            this.serviceList = dictItem.service_type // 服务类型
        }
        // 如果是从物流商资料进来编辑的
        if (util.getCache('editMessage') !== null && util.getCache('editMessage')) { // 修改资料
            let data = util.getCache('lmp_All_info')
            this.formData = data.basic_info
            this.editMessage = util.getCache('editMessage') // 对应不同按钮
        } else {
            // 填写资料
            if (util.getCache('lmp_All_info') != null) {
                let data = util.getCache('lmp_All_info')
                let localData = data.basic_info
                this.formData = localData
                // 服务类型
                if (this.formData.service_type === null) {
                    this.formData.service_type = []
                }
            }
        }
    },
    watch: {
        'formData.company_profile' () {
            let _self = this
            _self.numberLen = _self.formData.company_profile.length
            if (_self.numberLen >= 100) {
                $('.textareaNumber').css('left', '625px')
            } else if (_self.numberLen < 100 && _self.numberLen >= 10) {
                $('.textareaNumber').css('left', '632px')
            } else {
                $('.textareaNumber').css('left', '640px')
            }
        }
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
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].status === 'success' && fileList[i].response) {
                        fileList[i].url = fileList[i].response.data[0].url
                        fileList[i].ext = fileList[i].response.data[0].ext
                        fileList[i].origin_name = fileList[i].response.data[0].origin_name
                        fileList[i].save_path = fileList[i].response.data[0].save_path
                        delete fileList[i].response
                    }
                }
                _self.formData.profile_attachment = fileList
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定',
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
                            util.removeCache('company_info', 'local') // 删除企业信息
                            _self.$router.push({ path: '/login' })
                        }
                    }
                })
            }
        },

        // 文件移除
        uploadRemove (file, fileList) {
            let _self = this
            _self.formData.profile_attachment = fileList
        },

        // 预览上传文件
        previewUpload (file, files) {
            console.log(file, files)
            let _self = this
            // 文件格式
            let tArr = 'jpg, png, jpeg, gif'
            if (tArr.indexOf(file.ext) === -1) {
                // 其它格式下载
                window.open(file.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = file.url
            }
        },

        // 名字改变重新校验
        nameChange (type) {
            if (type === 'cn') {
                this.successCn = false
            } else if (type === 'en') {
                this.successEn = false
            }
        },

        companyFn: util.debounce(function () {
            let _self = this
            if (_self.formData.company_cn === '') {
                _self.successCn = false
                _self.repeatCn = false
                $('.company_name_cn').find('.el-input__inner').css('border-color', '#DBDEE5') //
                return
            }
            api.getNameCn({ company_cn: _self.formData.company_cn }).then((res) => {
                if (res.code === 200) {
                    if (res.data.result) {
                        _self.successCn = false // 中文名失败
                        _self.repeatCn = true // 显示重复
                        _self.isCn = false
                        $('.company_name_cn').find('.el-input__inner').css('border-color', '#f56c6c')
                    } else {
                        _self.successCn = true
                        _self.repeatCn = false
                        _self.isCn = true
                        $('.company_name_cn').find('.el-input__inner').css('border-color', '#67c23a')
                    }
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            })
        }, 500),

        companyEnFn: util.debounce(function () {
            let _self = this
            if (_self.formData.company_en === '') {
                _self.successEn = false
                _self.repeatEn = false
                _self.isEn = true
                $('.company_name_en').find('.el-input__inner').css('border-color', '#DBDEE5') //
                return
            }
            api.getNameEn({ company_en: _self.formData.company_en }).then((res) => {
                if (res.code === 200) {
                    if (res.data.result) {
                        _self.successEn = false // 英文名失败
                        _self.repeatEn = true // 显示重复
                        _self.isEn = false
                        $('.company_name_en').find('.el-input__inner').css('border-color', '#f56c6c')
                    } else {
                        _self.successEn = true
                        _self.repeatEn = false
                        _self.isEn = true
                        $('.company_name_en').find('.el-input__inner').css('border-color', '#67c23a')
                    }
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            })
        }, 500),

        // 简介
        textareaNumber () {
            let _self = this
            _self.numberLen = _self.formData.company_profile.length
            if (_self.numberLen >= 100) {
                $('.textareaNumber').css('left', '625px')
            } else if (_self.numberLen < 100 && _self.numberLen >= 10) {
                $('.textareaNumber').css('left', '632px')
            } else {
                $('.textareaNumber').css('left', '640px')
            }
        },

        // 下一步
        next (formName, type) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid || !_self.isCn || !_self.isEn) {
                    console.log('error')
                    return false
                } else {
                    _self.formData.current_step = 1 // 流程步骤
                    api.saveLogisticsEnterprise(_self.formData).then((res) => {
                        if (res.code === 200) {
                            let data = util.getCache('lmp_All_info')
                            data.basic_info = $.extend({}, this.formData)
                            util.setCache('lmp_All_info', data) // 当前页数据存储到全局lmp_All_info

                            if (type === 'next') { // 下一步
                                _self.$router.push({ path: '/aptitude' })
                            } else {
                                _self.$router.push({ path: '/affiliate_message' })
                            }
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            })
                        }
                    }).catch(() => {
                        console.log('error')
                    })
                }
            })
        },
        cancel () { // 返回按钮
            this.$router.push({ path: '/affiliate_message' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'register-basic-info';
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 120px;
        background-color: #fff;
        height: auto;
        padding-bottom: 58px;

        .el-form-item__content{
            display: inline-block;

            .el-input{
                width: 380px;
            }

            .label-name{
                color: #2F3032;
                font-family: Microsoft YaHei;
                font-weight:400;
                width: 290px;
                display: inline-block;
                text-align: right;
                font-size: 14px;
                line-height: 36px;
                padding: 0 11px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                vertical-align: top;
            }
            .el-button--primary{
                height:44px;
                width: 160px;
            }
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
            margin-top: 60px;
        }
        .next-form-middle{
            width:720px;
            border-top: 1px solid #F1F1F7;
            padding-top: 40px;
            margin: 40px auto 0;
        }
        .serviceList{
            width: 380px;
            display: inline-block;
            .el-checkbox__label{
                padding-left: 7px;
            }
            .el-checkbox+.el-checkbox{
                margin-left: 29px;
                line-height: 20px;
            }
            .el-checkbox:nth-child(5n){
                margin-left: 0px;
            }
        }
        .company_profile{
            width:380px;
            height:80px;
            border-radius:5px;
        }
        .el-form-item{
            margin-bottom: 16px;
        }

        .upload-attachment{
            display: inline-block;
            width: 380px;
        }
        .el-upload__tip{
            margin-top: 11px;
            line-height: 0px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #bfc3cb;
        }
        .fileUpload{
            width: 100px;
            height: 32px;
            border-radius: 5px;
            color: #429EFD;
            border: 1px solid #B3D7FE;
            font-weight:400;
        }
        .nextBtn{
            margin-top: 24px;
            display: inline-block;
            margin-left: 295px;
            .save{
                color: #429EFD;
                border: 1px solid #B3D7FE;
                background-color: #fff;
            }
            button:first-child{
                margin-right: 12px;
            }
        }
        .textareaNumber{
            position: absolute;
            left: 640px;
            top: 70px;
            color: #606266;
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
        .success {
            display: inline-block;
            margin-left: 6px;
        }
        .errorCn{
            display: inline-block;
            margin-left: 6px;
            color: #f46b6b;
        }
        .errorEn{
            display: inline-block;
            margin-left: 6px;
            color: #f46b6b;
        }
        .el-upload-list__item-name{
            color: #409EFF;
        }
    }
    .fileCls {
        width: 300px;
        .el-message-box__message p{
            font-size: 14px;
        }
    }
</style>
