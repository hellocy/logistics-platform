<template>
<div :class="prfClass">
    <!--弹出内容-->
    <el-dialog width="532px"
               @close="dialogClose"
               :visible="dialogProVisable">
        <div slot="title" class="dialog-title">
            <div class="name"><img src="../assets/new.png" />新增补充协议</div>
        </div>
        <el-form :model="formProData" :rules="dialogRules" :inline-message="true" ref="formPro" class="dialog-pro">
            <el-form-item prop="channel_id">
                <div class="label-name"><span class="red">*</span>渠道名称</div>
                <el-select
                    filterable
                    class="asset_select"
                    v-model="formProData.channel_id" placeholder="请选择">
                    <el-option
                        label="请选择"
                        value="">
                    </el-option>
                    <el-option
                        v-for="(item, index) in channelList"
                        :value="item.id"
                        :label="item.channel_name"
                        :key="index">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="file-li other_attach">
                <div class="label-name">补充协议附件</div>
                <el-upload
                    multiple
                    name="files"
                    :headers="data"
                    :uploadName="'other_attach'"
                    class="upload-attachment"
                    :action="uploadUrl"
                    :before-upload="handleBeforeUpload"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :on-remove="uploadRemove"
                    :on-preview="previewUpload"
                    :file-list="formProData.other_attach">
                    <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button class="close" @click="dialogClose()">取消</el-button>
            <el-button class="save" type="primary" @click="dialogFormSave()">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import util from 'commonVueLib/util/tools'
export default {
    name: 'dialog-Form',
    props: {
        dialogProVisable: {
            type: Boolean
        },
        formProData: {
            type: Object,
            default () {
                return {}
            }
        },
        channelList: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            prfClass: 'dialog-wrap',
            dialogRules: {
                channel_id: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
                // other_attach: [
                //     { required: true, message: '必填', trigger: 'change' }
                // ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            data: {
                token: ''
            }
        }
    },
    mounted () {
        let _self = this
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
                _self.formProData[key] = fileList
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
            _self.formProData[key] = fileList
            _self.showAndHideUpload(_self.formProData[key], key)
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

        // 关闭
        dialogClose () {
            this.$emit('dialogFn', false)
            this.$refs['formPro'].clearValidate()
        },

        // 保存
        dialogFormSave () {
            let _self = this
            _self.$refs['formPro'].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    let jsonData = {
                        formProData: _self.formProData,
                        dialogProVisable: false
                    }
                    _self.$emit('dialogSave', jsonData)
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>
