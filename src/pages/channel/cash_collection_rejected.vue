<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>收款信息</h3>
            <span>提交日期：{{submit_date}}</span>
            <span class="status-sign-img" :class="{rejected: status == 2, checking: status == 1}"></span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form label-width="120px" class="demo-formData">
                <div class="field-info-box">
                    <span class="channel-name">渠道名称：{{channel_name}}</span>
                    <span class="attachment-name-box">账户：{{account_name}}</span>
                    <p class="sub-title">
                        您提交的收款信息资料审核被驳回，具体驳回原因如下：
                    </p>
                </div>
                <div class="tip" v-html="tip"> </div>
                <div class="footer">
                    <el-form-item>
                        <el-button type="primary" plain @click="viewInfo(formData)">查看信息</el-button>
                        <el-button type="primary" @click="reSubmit" class="save">重新提交</el-button>
                        <span class="back" @click="back()">返回列表</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import breadcrumb from '../../components/breadcrumb'
import channelApi from '../../api/channel'
export default {
    components: {
        commonHeader,
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
            account_id: 1,
            submit_date: '',
            channel_name: '', // 物流渠道
            account_name: '', // 报价&分区附件
            tip: ''
        }
    },
    created () {
        let that = this
        let id = this.$route.params.id

        channelApi.getAuditingCashCollectionInfoData({id: id}).then((res) => {
            if (res.code === 200) {
                let _data = res.data
                that.channel_name = _data.channel_name
                that.account_name = _data.receipt_account
                that.submit_date = _data.submit_time
                that.status = _data.status - 2
                that.tip = _data.reject_reason
            }
        })
    },
    methods: {
        viewInfo () {
            this.$router.push({ path: '/view_cash_collection/' + this.$route.params.id })
        },
        reSubmit () {
            this.$router.push({ path: '/add_edit_cash_collection/' + this.$route.params.id })
        },
        back () { // 返回列表
            this.$router.push({ path: '/cash_collection_info_list' })
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
            margin:10px;
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
                    padding: 0 5px;
                    color: #429EFD;
                    text-decoration: underline;
                    cursor: pointer;
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
