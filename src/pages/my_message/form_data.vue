<template>
    <div :class="prfClass">
        <el-form :model="formData" :rules="rules" :inline-message="true" ref="form-data">
            <ul>
                <li>
                    <h4>银行账户信息</h4>
                    <div class="account_div">
                        <el-form-item prop="name">
                            <div class="label-name"><span class="red">*</span>账户名</div>
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>

                        <el-form-item prop="number">
                            <div class="label-name"><span class="red">*</span>收款账户</div>
                            <el-input v-model="formData.number"></el-input>
                        </el-form-item>

                        <el-form-item prop="currency">
                            <div class="label-name"><span class="red">*</span>账户币种</div>
                            <el-radio-group v-model="formData.currency">
                                <el-radio :label="1">人民币账户</el-radio>
                                <el-radio :label="2">外币账户</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item v-if="formData.currency == 2">
                            <div class="label-name">Swiftcode</div>
                            <el-input v-model="formData.swiftcode"></el-input>
                        </el-form-item>

                        <el-form-item v-if="formData.currency == 2">
                            <div class="label-name">收款公司地址</div>
                            <el-input v-model="formData.company_addr"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <div class="label-name">开户银行</div>
                            <div class="right">
                                <div class="bank" v-if="formData.currency == 1">
                                    <el-input placeholder="总行" v-model="formData.bank_created"></el-input>
                                    <el-input class="sub" placeholder="支行" v-model="formData.sub_bank_created"></el-input>
                                </div>
                                <div class="sub-bank" v-if="formData.currency == 2">
                                    <el-input placeholder="总行" v-model="formData.bank_created"></el-input>
                                </div>
                            </div>

                        </el-form-item>

                        <el-form-item v-if="formData.currency == 2">
                            <div class="label-name">开户行地址</div>
                            <div class="right">
                                <div class="bank-country">
                                    <!--<span class="bank-cls">国家</span>-->
                                    <el-select
                                        filterable
                                        class="asset_select"
                                        v-model="formData.bank_country" placeholder="国家">
                                        <el-option
                                            label="请选择"
                                            value="">
                                        </el-option>
                                        <el-option
                                            v-for="(item, index) in countryList"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.country_acronym_two">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="address">
                                    <el-input placeholder="地址" v-model="formData.bank_addr"></el-input>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item class="property" prop="property">
                            <div class="label-name"><span class="red">*</span>账户性质</div>
                            <el-radio-group v-model="formData.property">
                                <el-radio :label="2">公对公</el-radio>
                                <el-radio :label="3">私对私</el-radio>
                                <el-radio :label="1">私对公</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="handling_fee_method" prop="handling_fee_method">
                            <div class="label-name"><span class="red">*</span>手续费承担方式</div>
                            <el-radio-group v-model="formData.handling_fee_method">
                                <el-radio :label="1">承运方</el-radio>
                                <el-radio :label="2">托运方</el-radio>
                                <el-radio :label="3">双方共同承担</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="is_entrusted" prop="is_entrusted">
                            <div class="label-name"><span class="red">*</span>是否委托收款</div>
                            <el-radio-group v-model="formData.is_entrusted">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </li>
                <li class="file-li">
                    <h4>附件</h4>
                    <el-form-item class="stamp_receipt_attachment" v-if="formData.is_entrusted == 2" prop="stamp_receipt_attachment">
                        <div class="label-name"><span class="red">*</span>账户盖章收款附件</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'stamp_receipt_attachment'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.stamp_receipt_attachment">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>

                    </el-form-item>

                    <el-form-item class="entrusted_receipt_attachment" v-if="formData.is_entrusted == 1" prop="entrusted_receipt_attachment">
                        <div class="label-name"><span class="red">*</span>账户委托收款附件</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'entrusted_receipt_attachment'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.entrusted_receipt_attachment">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>

                    </el-form-item>

                    <el-form-item v-show="formData.property == 3">
                        <div class="label-name">账户私对私付款说明附件</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'private_to_private_attachment'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.private_to_private_attachment">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>
                </li>
                <li>
                    <div class="btn">
                        <el-button type="primary" @click="submitForm('form-data')" class="save">保存</el-button>
                        <span class="back" @click="back()">返回</span>
                    </div>
                </li>
            </ul>
        </el-form>
    </div>
</template>

<script>
import util from 'commonVueLib/util/tools'
import api from '../../api/myMessage'

export default {
    name: 'form_data',
    props: {
        formData: {
            type: Object,
            default () {
                return {}
            }
        },
        formType: {
            type: String,
            default () {
                return ''
            }
        },
        formId: {
            type: [String, Number],
            default: ''
        },
        // 根据状态判断本身进入还是其它页面进入
        backType: {
            type: [String, Number],
            default: 0
        },
        // 其它页面
        editType: {
            type: [String, Number],
            default: 0
        }
    },
    data () {
        return {
            prfClass: 'form-info-content',
            countryList: [], // 国家
            rules: {
                name: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                currency: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                property: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                handling_fee_method: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                is_entrusted: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                stamp_receipt_attachment: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ],
                entrusted_receipt_attachment: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            data: {
                token: ''
            }
        }
    },
    mounted () {
        let _self = this
        if (util.getCache('dictItem', 'local') != null) {
            _self.countryList = util.getCache('dictItem', 'local')['country']
        }
        if (util.getCache('company_info', 'local') != null) {
            _self.data.token = util.getCache('company_info', 'local').token
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
        uploadSuccess (response, file, fileList, key) {
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
                _self.formData[key] = fileList
                // 样式
                $('.' + key).find('.el-form-item__error').hide()
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
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
        uploadRemove (file, fileList, key) {
            let _self = this
            _self.formData[key] = fileList
            _self.showAndHideUpload(_self.formData[key], key)
        },

        // 隐藏/显示附件校验
        showAndHideUpload (arr, key) {
            // 样式
            if (arr.length === 0) {
                $('.' + key).find('.el-form-item__error').show()
            }
        },

        // 预览上传文件
        previewUpload (file) {
            let _self = this
            // 文件格式
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(file.ext) === -1) {
                // 其它格式下载
                window.open(file.url)
            } else { // 图片
                let data = {
                    showPreview: true,
                    srcs: file.url
                }
                _self.$emit('preview', data)
            }
        },
        // 返回列表
        back () {
            let _self = this
            let _back = _self.backType * 1
            let _type = _self.editType

            if (_back === 0) { // 本身
                _self.$router.push({path: '/my_message_list'})
            } else { // 其它页面
                _self.$store.dispatch('common/cashDraftData', { cash_draft_data: true })
                _self.$router.push({path: '/add_edit_cash_collection/' + _type})
            }
        },
        // 提交数据
        submitForm (formName) {
            let _self = this
            let _back = _self.backType * 1

            _self.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    // 添加
                    if (_self.formType === 'add') {
                        api.addReceiptInfo(_self.formData).then((res) => {
                            if (res.code === 200) {
                                if (_back === 0) {
                                    _self.$router.push({path: '/my_message_list'})
                                } else {
                                    _self.$store.dispatch('common/cashDraftData', { cash_draft_data: true })
                                    _self.$router.push({path: '/add_edit_cash_collection/' + _self.editType})
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
                    } else if (_self.formType === 'edit') { // 修改
                        api.editReceiptInfo(_self.formId, _self.formData).then((res) => {
                            if (res.code === 200) {
                                if (_back === 0) {
                                    _self.$router.push({ path: '/my_message_list' })
                                } else {
                                    _self.$store.dispatch('common/cashDraftData', { cash_draft_data: true })
                                    _self.$router.push({ path: '/add_edit_cash_collection/' + _self.editType })
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
                }
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'form-info-content';
    .#{$prfClass}{
        width: 900px;
        background-color: #fff;
        margin: 0 auto;
        .el-form{
            padding-bottom: 62px;
        }
        ul{
            padding: 36px 91px 0px 91px;
        }
        h4{
            font-size: 16px;
            color: #2F3032;
            font-weight: bold;
            line-height: 17px;
            padding-bottom: 11px;
            border-bottom: 1px #F1F1F7 solid;
            margin-bottom: 28px;
        }
        .el-form-item{
            margin-bottom: 16px;
        }
        .el-form-item__content{
            display: inline-block;
            .label-name{
                width: 218px;
                display: inline-block;
                text-align: right;
                font-size: 14px;
                margin-right: 7px;
                vertical-align: top;
            }
            .el-input{
                width: 380px;
            }
        }
        .property, .handling_fee_method, .is_entrusted{
            margin-bottom: 0px;
        }
        .red{
            color: red;
        }
        .file-li {
            margin-top: 50px;
            .upload-attachment{
                display: inline-block;
                width: 380px;
                ul {
                    padding: 0px;
                }
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
            .el-form-item{
                margin-bottom: 0px;
            }
        }
        .right{
            display: inline-block;
            width: 383px;
            .bank, .sub-bank {
                display: inline-block;
            }
            .bank .el-input{
                display: inline-block;
                width: 185px;
            }
            .sub{
                margin-left: 6px;
            }
        }
        .bank-country, .address{
            display: inline-block;
            .el-input{
                display: inline-block;
                width: 170px;
            }
        }
        .address{
            margin-left: 6px;
            .el-input{
                display: inline-block;
                width: 200px;
            }
        }
        .bank-cls{
            color:#606266;
        }

        .btn{
            display: inline-block;
            margin: 10px 0px 0px 230px;
        }
        .save{
            width: 191px;
            height: 44px;
            font-size:16px;
        }
        .back{
            color: #429EFD;
            font-size: 14px;
            text-decoration: underline;
            margin-left: 10px;
            cursor: pointer;
        }
    }
</style>
