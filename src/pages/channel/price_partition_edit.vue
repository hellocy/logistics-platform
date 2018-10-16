<template>
    <div :class="prfClass">
        <common-header></common-header>
        <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        <div class="top">
            <h3>报价&分区信息</h3>
            <span>状态：{{statusTextArr[status - 1]}}</span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <ul>
                    <li>
                        <div class="account-block">
                            <el-form-item label="渠道名称" prop="channel_id">
                                <el-select v-model="formData.channel_id" placeholder="请选择">
                                    <el-option
                                        v-for="item in channelArray"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item prop="begin_time">
                                <label class="field-label"><span class="red">*</span>生效开始时间</label>
                                <el-date-picker
                                    v-model="formData.begin_time"
                                    type="date">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item prop="end_time">
                                <label class="field-label"><span class="red">*</span>生效结束时间</label>
                                <el-date-picker
                                    v-model="formData.end_time"
                                    type="date">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="渠道合同附件">
                                <el-upload
                                    class="upload-attachment"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-change="attachmentChanged"
                                    :on-success="attachmentUploadSuccess"
                                    :on-preview="preview"
                                    :on-remove="attachmentRemoved"
                                    :file-list="formData.attachs"
                                    list-type="picture">
                                    <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                                </el-upload>
                                <span class="invalid-tip red" v-if="price_partition_attachment">报价&分区附件不能为空</span>
                            </el-form-item>

                            <el-form-item label="变更原因" class="chang-reason" prop="reason">
                                <el-input type="textarea" v-model="formData.reason"></el-input>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formData')" class="save">提交</el-button>
                            <el-button type="primary" plain @click="saveToDraft('formData')" class="save">保存草稿</el-button>
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
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
export default {
    components: {
        commonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'price-partition-edit',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                }, {
                    name: '编辑',
                    url: ''
                }
            ],
            status: 2,
            statusTextArr: ['申请', '待提交', '审核中', '已审核', '已驳回'],
            formData: {
                channel_id: '', // 物流渠道
                begin_time: '',
                end_time: '',
                attachs: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}], // 报价&分区附件
                reason: '' // 变更原因
            },
            price_partition_attachment: false,
            channelArray: [
                {
                    label: '渠道-001',
                    value: 1
                },
                {
                    label: '渠道-002',
                    value: 2
                }
            ],
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            rules: {
                channel_id: [
                    { required: true, message: '物流渠道不能为空', trigger: 'blur' }
                ],
                price_partition_attachment: [
                    { required: true, message: '报价&分区附件不能为空', trigger: 'blur' }
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
                        label: '请选择',
                        value: ''
                    }
                )
                that.channelArray = res.data
            }
        })

        that.initFormData()
    },
    methods: {
        // 编辑报价&分区信息时，获取初始值
        initFormData () {
            let that = this
            let id = this.$route.params.id
            if (id !== '__new__') {
                // 获取渠道
                channelApi.getQuotesInfoData({ id: id }).then((res) => {
                    if (res.code === 200) {
                        let _data = res.data
                        let _attachs = _data.attachs
                        that.formData.channel_id = _data.channel_id
                        that.formData.reason = _data.reason
                        for (let i = 0; i < _attachs.length; i++) {
                            that.formData.attachs.push({
                                name: _attachs[i].orig_name,
                                url: _attachs[i].file_url,
                                id: _attachs[i].id
                            })
                        }
                    }
                })
            }
        },
        attachmentChanged (response, file, fileList) {
            this.price_partition_attachment = false
        },
        attachmentUploadSuccess (response, file, fileList) {
            this.price_partition_attachment = false
            this.formData.attachs.push({
                name: file.name,
                url: file.url,
                id: response.id
            })
        },
        attachmentRemoved (file, fileList) {
            if (fileList.length === 0) {
                console.log(fileList)
                this.price_partition_attachment = true
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
        saveToDraft (formName) { // 保存草稿
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.formData.attachs.length === 0) { // 必填
                        this.price_partition_attachment = true
                        return false
                    } else {
                        this.price_partition_attachment = false
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        submitForm (formName) { // 提交数据
            let that = this
            this.$refs[formName].validate((valid) => {
                console.log(this.formData, 88888)
                if (this.formData.attachs.length === 0) { // 必填
                    this.price_partition_attachment = true
                    return false
                } else {
                    this.price_partition_attachment = false
                }
                if (valid) {
                    channelApi.editQuotesInfo(that.formData).then((res) => {

                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        back () { // 返回列表
            this.$router.push({ path: '/price_partition' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'price-partition-edit';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .el-breadcrumb{
            margin: 12px 0 22px 21px;
            font-size: 12px;
            span{
                color: #8F9298;
            }
            .el-breadcrumb__item:last-child .el-breadcrumb__inner{
                color:#429EFD
            }
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
            .account-block{
                padding-left: 110px;
                .el-input__inner, .el-textarea__inner{
                    width: 380px;
                }
                .el-input{
                    width: auto;
                }
            }
            .upload-attachment{
                display: inline-block;
                vertical-align: middle;
            }
            .el-upload-list{
                margin-top:20px;
                font-size:12px;
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
