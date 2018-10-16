<template>
    <div :class="prfClass">
        <el-form :model="formData" :rules="rules" :inline-message="true" ref="form-data">
            <ul>
                <li>
                    <h4>主合同框架</h4>
                    <div class="account_div">
                        <el-form-item prop="type">
                            <div class="label-name"><span class="red">*</span>合同框架类型</div>
                            <el-select
                                filterable
                                class="asset_select"
                                v-model="formData.type" placeholder="请选择">
                                <el-option
                                    label="请选择"
                                    value="">
                                </el-option>
                                <el-option
                                    v-for="(item, key, index) in contract_type_list"
                                    :value="index+1"
                                    :label="item"
                                    :key="key">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="main_attach" class="file-li main_attach">
                            <div class="label-name"><span class="red">*</span>框架合同附件</div>
                            <el-upload
                                multiple
                                :limit = 1
                                :on-exceed="exceed"
                                name="files"
                                :headers="data"
                                :uploadName="'main_attach'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.main_attach">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item prop="start_at">
                            <div class="label-name"><span class="red">*</span>合同生效时间</div>
                            <el-date-picker
                                v-model="formData.start_at"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerBeginDateStart"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="end_at">
                            <div class="label-name"><span class="red">*</span>合同截止时间</div>
                            <el-date-picker
                                v-model="formData.end_at"
                                :picker-options="pickerBeginDateEnd"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item>
                            <div class="label-name">备注</div>
                            <el-input type="textarea" class="remark" v-model="formData.remark"></el-input>
                        </el-form-item>
                    </div>
                </li>
                <li>
                    <div class="other-cont">
                        <div class="top">
                            <div class="left">补充协议</div>
                            <a href="javascript:;"
                               @click="dialogProtocol"
                               class="add-protocol"><i class="el-icon-plus"></i>新增补充协议</a>
                        </div>
                        <div class="wrap-table">
                            <div class="table-head">
                                <div class="name"><span class="red">*</span>渠道名称</div>
                                <div class="url">补充协议附件</div>
                                <div class="options">操作</div>
                            </div>
                            <div class="table-no" v-if="formData.other_attach.length == 0">
                                空
                            </div>
                            <div class="table-body" v-else>
                                <ul>
                                    <li v-for="(item, index) in formData.other_attach" :key="index">
                                        <div class="name" :title="item.channel_name">{{ item.channel_name }}</div>
                                        <div class="urlList"
                                             v-if="item.origin_name != ''"
                                             @click="previewUpload(item)"
                                             :title="item.origin_name">
                                            <i class="el-icon-document"></i>
                                            {{ item.origin_name }}
                                        </div>
                                        <div class="url"
                                             v-else
                                             :title="item.origin_name">
                                            {{ item.origin_name }}
                                        </div>
                                        <div class="options" @click="remove(index)"><i class="el-icon-delete"></i></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="btn">
                        <el-button type="primary" @click="submitForm('form-data')" class="save">保存</el-button>
                        <span class="back" @click="back()">返回列表</span>
                    </div>
                </li>
            </ul>
        </el-form>
        <dialog-form
            @dialogFn="dialogFn"
            @dialogSave="dialogSave"
            @preview="previewImg"
            :formProData="formProData"
            :channelList="channel_name_list"
            :dialogProVisable="dialogProVisable"></dialog-form>

        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import dialogForm from '../../components/dialog.vue'
import util from 'commonVueLib/util/tools'
import api from '../../api/personal'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'form_data',
    components: {
        dialogForm,
        ImagePreview
    },
    props: {
        formData: {
            type: Object,
            default () {
                return {}
            }
        },
        type: {
            type: String,
            default () {
                return ''
            }
        }
    },
    data () {
        return {
            prfClass: 'contract-form-info-content',
            rules: {
                start_at: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                end_at: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                main_attach: [
                    { required: true, message: '必填', trigger: 'change' }
                ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            data: {
                token: ''
            },
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            formProData: {
                channel_id: '', // 渠道id
                other_attach: [] // 补充协议附件
            },
            pickerBeginDateStart: {
                disabledDate: (time) => {
                    let beginDateVal = this.formData.end_at
                    if (beginDateVal) {
                        return time.getTime() > new Date(beginDateVal).getTime()
                    }
                }
            },
            pickerBeginDateEnd: {
                disabledDate: (time) => {
                    let beginDateVal = this.formData.start_at
                    let startDate = ''
                    if (beginDateVal !== '' && beginDateVal !== null) {
                        let today = new Date(beginDateVal)
                        let dayMilliSeconds = today.getTime() - (1 * (1000 * 60 * 60 * 24))

                        let lastday = new Date()
                        lastday.setTime(dayMilliSeconds)

                        let strYear = lastday.getFullYear()
                        let strDay = lastday.getDate() >= 10 ? lastday.getDate() : '0' + lastday.getDate()
                        let strMonth = lastday.getMonth() + 1
                        if (strMonth < 10) {
                            strMonth = '0' + strMonth
                        }
                        startDate = strYear + '-' + strMonth + '-' + strDay
                    } else {
                        startDate = beginDateVal
                    }

                    if (beginDateVal) {
                        return time.getTime() < new Date(startDate).getTime()
                    }
                }
            },
            channel_name_list: [], // 渠道名称下拉列表
            contract_type_list: [], // 下拉列表
            dialogProVisable: false // 是否显示协议
        }
    },
    mounted () {
        let _self = this
        if (util.getCache('company_info', 'local') != null) {
            _self.data.token = util.getCache('company_info', 'local').token
        }

        api.contractInit().then((res) => {
            if (res.code === 200) {
                console.log(res)
                _self.contract_type_list = res.data.type_dict
                _self.channel_name_list = res.data.channel_dict
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
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
        exceed () { // 文件超出个数限制时的钩子
            this.$message.error('只能上传一个框架合同附件')
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

        // 弹框预览上传文件
        previewImg (data) {
            this.showPreview = data.showPreview
            this.srcs = data.srcs
        },

        // 新增补充协议
        dialogProtocol () {
            let _self = this
            _self.dialogProVisable = true
            // 初始化
            _self.formProData.channel_id = ''
            _self.formProData.other_attach = []
        },

        dialogFn (data) {
            let _self = this
            _self.dialogProVisable = data
        },

        dialogSave (data) {
            let _self = this
            _self.dialogProVisable = data.dialogProVisable
            let channelId = data.formProData.channel_id
            let channelName = ''
            _self.channel_name_list.forEach((item, index) => {
                if (channelId === item.id) {
                    channelName = item.channel_name
                }
            })
            if (data.formProData.other_attach.length === 0) {
                let oData = {
                    channel_id: channelId,
                    channel_name: channelName,
                    origin_name: '',
                    save_path: '',
                    url: '',
                    ext: ''
                }
                _self.formData.other_attach.push(oData)
            } else {
                for (let i = 0; i < data.formProData.other_attach.length; i++) {
                    let oData = {
                        channel_id: channelId,
                        channel_name: channelName,
                        origin_name: '',
                        save_path: '',
                        url: '',
                        ext: ''
                    }
                    oData.origin_name = data.formProData.other_attach[i].origin_name
                    oData.save_path = data.formProData.other_attach[i].save_path
                    oData.url = data.formProData.other_attach[i].url
                    oData.ext = data.formProData.other_attach[i].ext
                    _self.formData.other_attach.push(oData)
                }
            }
        },
        // 删除补充协议
        remove (index) {
            this.formData.other_attach.splice(index, 1)
        },

        // 返回列表
        back () {
            let _self = this
            _self.$router.push({ path: '/contract_list' })
        },
        // 提交数据
        submitForm (formName) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    // 未添加补充协议
                    if (_self.formData.other_attach.length === 0) {
                        _self.$message.error({
                            message: '未添加补充协议'
                        })
                        return false
                    }
                    // 添加
                    if (_self.type === 'add') {
                        _self.$emit('save', _self.formData)
                    } else if (_self.type === 'edit') { // 编辑
                        _self.$emit('save', _self.formData)
                    } else if (_self.type === 'addition') { // 编辑
                        _self.$emit('save', _self.formData)
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'contract-form-info-content';
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
        .addition h4{
            border-left: 4px #429EFD solid;
            border-bottom: none;
            height: 10px;
            padding-left: 9px;
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
        .el-upload-list__item .el-upload-list__item-name{
            color: #429efd;
        }
        .el-icon-document{
            color: #429efd;
        }
        .property, .handling_fee_method, .is_entrusted{
            margin-bottom: 0px;
        }
        .red{
            color: red;
        }
        .file-li {
            margin-bottom: 0px;
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
            margin: 56px 0px 0px 230px;
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
        .remark{
            width: 380px;
            height: 80px;
            .el-textarea__inner{
                width: 380px;
                height: 80px;
            }
        }
        .other-cont{
            display: flex;
            flex-flow: column wrap;
            .top{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: #2F3032;
                padding: 0px;
                margin: 40px auto 0px;
                width: 720px;
            }
            .top .left{
                font-weight: bold;
            }
            .add-protocol{
                font-weight:bold;
                font-size: 14px;
                color:rgba(66,158,253,1);
            }
            .el-icon-plus{
                font-size: 12px;
                padding-right: 3px;
            }
            .wrap-table{
                display: flex;
                margin-top: 11px;
                border: 1px solid #DBDEE5;
                flex-flow: column wrap;
            }
            .table-head{
                display: flex;
                border-bottom: 1px solid #DBDEE5;
                line-height: 40px;
                height: 40px;
                font-size:14px;
                color: #2F3032;
                font-weight:bold;
            }
            .table-head .name{
                width: 310px;
                padding-left: 14px;
                border-right: 1px solid #DBDEE5;
            }
            .table-head .url{
                width: 310px;
                padding-left: 14px;
                border-right: 1px solid #DBDEE5;
            }
            .table-head .options{
                padding-left: 18px;
            }
            .table-no{
                text-align: center;
                line-height: 40px;
                height: 40px;
                color: #D4D7DC;
                font-size:14px;
            }
            .table-body{
                display: flex;
            }
            .table-body ul{
                display: flex;
                flex-flow: row wrap;
                padding: 0px;
            }
            .table-body ul li{
                display: flex;
                flex-flow: row wrap;
                padding: 0px;
                line-height: 40px;
                height: 40px;
                width: 717px;
                border-bottom: 1px solid #DBDEE5;
            }
            .table-body ul li:last-child{
                border-bottom: none;
            }
            .table-body .name{
                width: 310px;
                padding-left: 14px;
                border-right: 1px solid #DBDEE5;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .table-body .urlList{
                width: 310px;
                padding-left: 14px;
                border-right: 1px solid #DBDEE5;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #429efd;
                cursor: pointer;
            }
            .table-body .url{
                width: 310px;
                padding-left: 14px;
                border-right: 1px solid #DBDEE5;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .table-body .options{
                padding-left: 24px;
                cursor: pointer;
                .el-icon-delete{
                    font-size: 16px;
                }
            }
        }
        .dialog-pro{
            padding-bottom: 0px;
        }
        .dialog-pro .label-name{
            width: 135px;
        }
        .dialog-pro .el-input{
            width: 300px;
        }
        .dialog-pro .upload-attachment{
            width: 320px;
        }
        .el-dialog__body{
            padding: 30px 0px;
        }
        .dialog-footer{
            text-align: center;
            margin-bottom: 15px;
            .close{
                width:160px;
                height:44px;
                border: 1px solid #429EFD;
                font-size:16px;
            }
            .save{
                margin-left: 46px;
                width:160px;
                height:44px;
                border: 1px solid #429EFD;
                font-size:16px;
            }
        }
        .el-dialog__header{
            padding: 0px;
            background-color: #F2F6FC;
            height: 47px;
        }
        .dialog-title{
            line-height: 47px;
            .el-icon-document{
                padding-right: 11px;
            }
        }
        .dialog-title .name{
            padding-left: 27px;
            color: #909399;
            font-size:16px;
            img{
                vertical-align: middle;
                padding-right: 11px;
            }
        }
        .el-dialog__headerbtn{
            top: 11px;
            font-size: 24px;
        }
        .addition-wrap{
            border: 1px solid #DBDEE5;
        }
        .addition-wrap ul{
            display: flex;
            flex-flow: row wrap;
            padding: 0px;
        }
        .addition-wrap ul li{
            display: flex;
            flex-flow: row wrap;
            padding: 0px;
            line-height: 40px;
            height: 40px;
            width: 717px;
            border-bottom: 1px solid #DBDEE5;
        }
        .addition-wrap ul li:last-child{
            border-bottom: none;
        }
        .addition-wrap .left{
            width: 130px;
            padding-left: 14px;
            border-right: 1px solid #DBDEE5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background-color: #F9FBFE;
        }
        .addition-wrap .right{
            width: 599px;
            padding-left: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
