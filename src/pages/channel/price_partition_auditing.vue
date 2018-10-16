<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-wrapper">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>报价&分区信息</h3>
            <span>提交日期：{{formData.submit_date}}</span>
            <span class="status-sign-img" :class="{checking: status == 2, passed: status == 3, rejected: status == 4}"></span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <div class="field-info-box">
                    <span class="channel-name">渠道名称：{{formData.channel_name}}</span>
                    <span class="attachment-name-box">附件名称：
                        <!--<a href="javascript:" class="attachment-name" v-for="attachment in formData.attachments" :key="attachment.name" @click="preview(attachment)">{{attachment.name}}</a>-->
                        <a class="attachment-name" v-for="attachment in formData.attachments" :key="attachment.name" @click="preview(attachment)">{{attachment.name}}</a>
                    </span>
                </div>
                <div class="tip">
                    我司已接收资料， 审核结果将在一个工作日内邮件通知到您
                </div>
                <div class="footer">
                    <el-form-item>
                        <el-button type="primary" plain @click="viewInfo('formData')" class="save">查看信息</el-button>
                        <el-button type="primary" @click="goToNew('formData')" class="save">继续新增</el-button>
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
            prfClass: 'price-partition-auditing',
            breadcrumbList: [
                {
                    name: '报价&分区信息',
                    url: '/price_partition'
                }, {
                    name: '查看',
                    url: ''
                }
            ],
            status: 1, // 当前审核状态：0-审核通过 1-审核中 2-审核驳回
            formData: {
                submit_date: '',
                status: 2,
                channel_name: '', // 物流渠道
                attachments: [], // 报价&分区附件
                change_reason: '' || '（未填写）' // 变更原因
            },
            price_partition_attachment: false,
            // 显示图片预览窗口
            showPreview: false,
            srcs: ''
        }
    },
    mounted () {
        let that = this
        let id = this.$route.params.id
        // 获取分区报价信息
        channelApi.getQuotesInfoData({ id: id }).then((res) => {
            if (res.code === 200) {
                that.formData.id = res.data.id
                that.formData.submit_date = res.data.created_at
                that.formData.channel_name = res.data.channel_name
                that.formData.channel_id = res.data.channel_id
                that.status = res.data.status
                that.formData.attachments = res.data.attachs.map(item => {
                    return {
                        name: item.origin_name,
                        url: item.url
                    }
                })
                that.formData.reason = res.data.reason || '（未填写）'

                if (that.status === 3) {
                    this.$router.push({ path: '/price_partition_view/' + this.$route.params.id })
                } else if (that.status === 4) {
                    this.$router.push({ path: '/price_partition_rejected/' + this.$route.params.id })
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
        viewInfo () {
            this.$router.push({path: '/price_partition_view/' + this.$route.params.id})
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
        goToNew () { // 返回列表
            this.$router.push({ path: '/price_partition_change/__new__' })
        },
        back () { // 返回列表
            this.$router.push({ path: '/price_partition' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'price-partition-auditing';
    .#{$prfClass}{
        font-family: MicrosoftYaHei;
        padding-bottom: 80px;
        .breadcrumb-wrapper{
            margin: 10px 20px;
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
            width: 720px;
            padding: 36px 91px 20px 81px;
            background-color: #fff;
            margin: 0 auto;
            text-align: center;
            .field-info-box{
                margin-bottom: 20px;
                color:#8F9298;
                .channel-name{
                    margin-right: 20px;
                }
                .attachment-name{
                    padding: 0 5px;
                    color: #429EFD;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
            .tip{
                font-size:14px;
                font-weight:bold
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
