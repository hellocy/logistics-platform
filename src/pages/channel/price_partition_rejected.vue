<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>报价&分区信息</h3>
            <span>提交日期：{{formData.submit_time}}</span>
            <span class="status-sign-img" :class="{rejected: status == 2, checking: status == 1}"></span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <div class="field-info-box">
                    <span class="channel-name">渠道名称：{{formData.channel_name}}</span>
                    <span class="attachment-name-box">附件名称：
                        <a href="javascript:" class="attachment-name" v-for="attachment in formData.attachments" :key="attachment.name" @click="preview(attachment)">{{attachment.name}}</a>
                    </span>
                    <p class="sub-title">
                        您提交的报价&分区资料审核被驳回，具体驳回原因如下：
                    </p>
                </div>
                <div class="tip" v-html="formData.reject_reason"></div>
                <div class="footer">
                    <el-form-item>
                        <el-button type="primary" plain @click="viewInfo(formData)">查看信息</el-button>
                        <el-button type="primary" @click="goToNew" class="save">重新提交</el-button>
                        <span class="back" @click="back()">返回列表</span>
                    </el-form-item>
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
            prfClass: 'price-partition-rejected',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                }, {
                    name: '查看',
                    url: ''
                }
            ],
            status: 2, // 当前审核状态：0-审核通过 1-审核中 2-审核驳回
            formData: {
                submit_time: '',
                status: 2,
                channel_name: '', // 物流渠道
                attachments: [], // 报价&分区附件
                reject_reason: '' // 变更原因
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
                channel_name: [
                    { required: true, message: '物流渠道不能为空', trigger: 'blur' }
                ],
                price_partition_attachment: [
                    { required: true, message: '报价&分区附件不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        let that = this
        let id = this.$route.params.id

        channelApi.getRejectedPriceInfoData({id: id}).then((res) => {
            if (res.code === 200) {
                let _data = res.data
                that.formData.channel_name = _data.channel_name
                that.formData.submit_time = _data.submit_time
                that.formData.attachments = _data.attachs.map(item => {
                    return {
                        name: item.origin_name,
                        url: item.url
                    }
                })
                that.formData.status = _data.status - 2
                that.formData.reject_reason = _data.reject_reason
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
        viewInfo () {
            this.$router.push({ path: '/price_partition_view/' + this.$route.params.id })
        },
        goToNew () {
            this.$router.push({ path: '/price_partition_change/' + this.$route.params.id })
        },
        back () { // 返回列表
            this.$router.push({ path: '/price_partition' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'price-partition-rejected';
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
            text-align:center;
            h3{
                font-size: 28px;
                margin: 20px 0 7px;
                font-weight:bold;
                color: #429EFD;
            }
            span{
                color: #429EFD;
                font-size: 12px;
            }
            .status-sign-img{
                position: absolute;
                right: 75px;
                top: 40px;
                display: inline-block;
                width: 150px;
                height: 50px;
                background: url('../../assets/my_message_status.png');
                background-position: 0 0px;
                transform: rotate(20deg);
                &.rejected{
                    background-position: 0 -60px;
                }
                &.checking{
                    background-position: 0 -120px;
                }
            }
        }
        .#{$prfClass}-content{
            width: 800px;
            padding: 36px 91px 20px 81px;
            background-color: #fff;
            margin: 0 auto;
            .field-info-box{
                margin-bottom: 20px;
                color:#8F9298;
                padding-left:100px;
                .channel-name{
                    margin-right: 20px;
                }
                .attachment-name{
                    display: inline-block;
                    padding-right: 10px;
                    color: #429EFD;
                    cursor: pointer;
                    margin-bottom: 5px;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .sub-title{
                margin-top:10px;
            }
            .tip{
                text-align: left;
                padding-left:100px;
                font-size:14px;
                font-weight:bold;
                margin-top:40px;
                p{
                    margin-top:10px;
                }
                .link-ref{
                    color:#429EFD;
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
    }
</style>
