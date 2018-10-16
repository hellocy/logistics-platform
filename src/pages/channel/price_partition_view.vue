<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>报价&分区信息</h3>
            <span v-if="status === 3">通过日期：<span class="sublmit-date">{{formData.checked_time}}</span></span>
            <span v-else-if="status === 4">驳回日期：<span class="sublmit-date">{{formData.checked_time}}</span></span>
            <span v-else-if="status === 2">提交日期：<span class="sublmit-date">{{formData.submit_time}}</span>我司已接收资料， 审核结果将在一个工作日内邮件通知到您。</span>

            <!--<span>通过日期：{{formData.checked_time}}</span>-->
            <span v-if="status !== 0" class="status-sign-img" :class="{passed: status === 3, rejected: status == 4, checking: status == 2}"></span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <div class="account-block">
                    <div class="field-row">
                        <span class="field-title"><span class="red">*</span>渠道名称</span>
                        <span class="field-value">{{formData.channel_name}}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-title"><span class="red">*</span>生效开始时间</span>
                        <span class="field-value">{{formData.begin_time}}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-title"><span class="red">*</span>生效结束时间</span>
                        <span class="field-value">{{formData.end_time}}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-title"><span class="red">*</span>报价&分区附件</span>
                        <span class="field-value">
                            <ul>
                                <li v-for="item in formData.attachs" :key="item.index"><a href="javascript:" @click="preview(item)" class="attach-item">{{item.origin_name}}</a></li>
                            </ul>
                        </span>
                    </div>
                    <div class="field-row">
                        <span class="field-title pl">变更原因</span>
                        <span class="field-value">{{formData.reason}}</span>
                    </div>
                </div>
                <div class="footer">
                    <span class="back" @click="back()">返回列表</span>
                </div>
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
            prfClass: 'price-partition-passed',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                }, {
                    name: '查看',
                    url: ''
                }
            ],
            status: 0, // 当前审核状态：0-审核通过 1-审核中 2-审核驳回
            formData: {
                checked_time: '',
                submit_time: '',
                begin_time: '',
                end_time: '',
                status: 0,
                channel_name: '', // 物流渠道
                price_partition_attachment: [], // 报价&分区附件
                change_reason: '' || '（未填写）' // 变更原因
            },
            price_partition_attachment: false,
            channelArray: [],
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            rules: {
                channel_name: [
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
        let id = this.$route.params.id
        // 获取分区报价信息
        channelApi.getQuotesInfoData({ id: id }).then((res) => {
            if (res.code === 200) {
                that.status = res.data.status
                that.formData.id = res.data.id
                that.formData.checked_time = res.data.check_time
                that.formData.submit_time = res.data.submit_time
                that.formData.channel_name = res.data.channel_name
                that.formData.channel_id = res.data.channel_id
                that.formData.attachs = res.data.attachs
                that.formData.reason = res.data.reason || '（未填写）'
                that.formData.files = res.data.attachs
                that.formData.begin_time = res.data.begin_time
                that.formData.end_time = res.data.end_time
                for (let i = 0; i < res.data.attachs.length; i++) {
                    that.formData.attachs[i].name = res.data.attachs[i].origin_name
                }
            } else {
                that.$alert(res.msg, '错误', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: action => {}
                })
            }
        })
    },
    methods: {
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
            this.$router.push({ path: '/price_partition' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'price-partition-passed';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .breadcrumb-box{
            margin: 10px;
        }
        .top{
            position: relative;
            width: 808px;
            margin: 0 auto;
            padding: 0 42px 17px;
            margin-bottom: 10px;
            overflow: hidden;
            background-color: #fff;
            h3{
                font-size: 16px;
                margin: 20px 0 7px;
                font-weight:bold;
            }
            span{
                color: #429EFD;
                font-size: 12px;
            }
            .sublmit-date{
                padding-right:10px;
            }
            .status-sign-img{
                position: absolute;
                right: 75px;
                top: 13px;
                display: inline-block;
                width: 150px;
                height: 50px;
                background: url('../../assets/my_message_status.png');
                background-position: 0 0px;
                &.checking{
                    background-position: 0 -120px;
                }
                &.passed{
                    background-position: 0 0px;
                }
                &.rejected{
                    background-position: 0 -60px;
                }
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
                display: table;
                table-layout: fixed;
                width:100%;
                border-top:1px solid #EBEEF3;
                border-left:1px solid #EBEEF3;
                .field-row{
                    display:table-row;
                    .field-title, .field-value{
                        display: table-cell;
                        background: #F9FBFE;
                        padding:10px;
                        border-right:1px solid #EBEEF3;
                        border-bottom:1px solid #EBEEF3;
                        width:130px;
                        height:50px;
                        vertical-align: middle;
                    }
                    .pl{
                        padding-left:22px;
                    }
                    .field-value, .el-icon-close, .el-icon-close-tip{
                        background: #fff;
                        width:599px;
                        word-break: break-all;
                        .attach-item{
                            display:inline-block;
                            color:#429EFD;
                            margin-bottom:5px;
                            text-decoration: underline;
                        }
                    }
                }
                .el-upload-list__item-name{
                    color:#409EFF
                }
            }
            .footer{
                margin-top:50px;
                text-align:center;
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
        .red{
            color:red;
            padding:0 2px;
        }
    }
</style>
