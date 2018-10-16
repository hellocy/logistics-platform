<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>收款信息</h3>
            <span v-if="formData.status === 3">通过日期：<span class="sublmit-date">{{formData.submit_time}}</span></span>
            <span v-else-if="formData.status === 4">驳回日期：<span class="sublmit-date">{{formData.check_time}}</span></span>
            <span v-else>提交日期：<span class="sublmit-date">{{formData.submit_time}}</span>我司已接收资料， 审核结果将在一个工作日内邮件通知到您。</span>
            <span v-if="formData.status !== 0" class="status-sign-img" :class="{passed: formData.status === 3, rejected: formData.status == 4, checking: formData.status == 2}"></span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <ul>
                    <li>
                        <h4 class="title">基础信息</h4>
                        <div class="account-block">
                            <div class="field-row">
                                <span class="field-title">物流渠道</span>
                                <span class="field-value">{{formData.channel_name}}</span>
                                <span class="field-title">派送类型</span>
                                <span class="field-value">{{deliveryTypeList[formData.delivery_type]}}</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">托运方签约主体</span>
                                <span class="field-value">{{formData.contract_subject}}</span>
                                <span class="field-title">账单币种</span>
                                <span class="field-value">{{formData.bill_currency_text}}</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">收款账户</span>
                                <span class="field-value">{{formData.receipt_account}}</span>
                                <span class="field-title"></span>
                                <span class="field-value"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <h4 class="title">收款信息</h4>
                        <div class="account-block">
                            <div class="field-row">
                                <span class="field-title">运费账单周期</span>
                                <span class="field-value">{{billPeriod[formData.bill_period]}}</span>
                                <span class="field-title">结算币种</span>
                                <span class="field-value">{{formData.settle_currency_text}}</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">账户性质</span>
                                <span class="field-value">{{['含税', '不含税'][formData.account_nature - 1]}}</span>
                                <span class="field-title">税点</span>
                                <span class="field-value">{{formData.tax_rate}} %</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">收款方式</span>
                                <span class="field-value">{{['银行转账', 'PayPal'][formData.receipt_method - 1]}}</span>
                                <span class="field-title">收款条件</span>
                                <span class="field-value">{{['预付款', '先货后款'][formData.receipt_cond - 1]}}</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">收款类型</span>
                                <span class="field-value">{{['含税', '不含税'][formData.receipt_type - 1]}}</span>
                                <span class="field-title">付款类型</span>
                                <span class="field-value">{{['含税', '不含税'][formData.pay_type - 1]}}</span>
                            </div>
                            <div class="field-row">
                                <span class="field-title">备注</span>
                                <span class="field-value">{{formData.remark}}</span>
                                <span class="field-title"></span>
                                <span class="field-value"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="back">
                            <el-form-item>
                                <el-button type="primary" plain @click="back()">返回列表</el-button>
                            </el-form-item>
                        </div>
                    </li>
                </ul>
            </el-form>
        </div>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import breadcrumb from '../../components/breadcrumb'
import channelApi from '../../api/channel'
import util from 'commonVueLib/util/tools'
export default {
    components: {
        commonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'view-cash-collection',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                }, {
                    name: '查看',
                    url: ''
                }
            ],
            formData: {
                submit_time: '2018-08-24',
                channel_name: '', // 物流渠道
                account_id: '',
                delivery_type: '', // 派送类型
                bill_currency: '',
                bill_currency_text: '',
                settle_currency: '',
                settle_currency_text: '',
                contract_subject: '', // 托运方签约主体
                receipt_account: '', // 收款账户
                bill_period: '', // 运费账单周期
                account_nature: '', // 账户性质
                tax_rate: '', // 税点
                receipt_method: '', // 收款方式
                receipt_cond: '', // 收款条件
                receipt_type: '', // 收款类型taxRule
                pay_type: '', // 付款类型
                remark: '', // 备注,
                status: 0 // 当前审核状态：1-待提交 2-审核中 3-审核通过 4-审核驳回 5-修改中
            },

            deliveryTypeList: {
                '': '',
                '1': '全程',
                '2': '中转',
                '3': '尾程'
            },
            billCurrencyList: {
                '': '',
                '1': 'USD-美元',
                '2': 'CNY-人民币'
            },
            billPeriod: []
        }
    },
    mounted () {
        let that = this
        let id = that.$route.params.id
        let currencyArr = util.getCache('dictItem', 'local')['currency']

        that.billPeriod = util.getCache('dictItem', 'local')['bill_period']

        // 获取收款信息
        channelApi.getCashCollectionInfoData({ id: id }).then((res) => {
            if (res.code === 200) {
                for (let k in res.data) {
                    that.formData[k] = res.data[k]
                    // that.formData.status = 3
                }

                for (let i = 0; i < currencyArr.length; i++) {
                    if (currencyArr[i].currency === that.formData.bill_currency) {
                        that.formData.bill_currency_text = currencyArr[i].name
                    }
                    if (currencyArr[i].currency === that.formData.settle_currency) {
                        that.formData.settle_currency_text = currencyArr[i].name
                    }
                }
            }
        })
    },
    methods: {
        saveToDraft (formName) { // 保存草稿
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.show_stamp_receipt_attachment && (this.formData.stamp_receipt_attachment.length === 0)) { // 渠道合同附件显示时 必填
                        this.channel_contract_attachment = true
                        return false
                    } else {
                        this.channel_contract_attachment = false
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        submitForm (formName) { // 提交数据
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.channel_contract_attachment && (this.formData.channel_contract_attachment.length === 0)) { // 渠道合同附件显示时 必填
                        this.channel_contract_attachment = true
                        return false
                    } else {
                        this.channel_contract_attachment = false
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        back () { // 返回列表
            this.$router.push({ path: '/cash_collection_info_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'view-cash-collection';
    .#{$prfClass}{
        padding-bottom: 80px;
        .breadcrumb-box{
            margin:10px;
        }
        .top{
            position: relative;
            width: 990px;
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
            width: 900px;
            padding: 36px 91px 20px 81px;
            background-color: #fff;
            margin: 0 auto;
            h4{
                font-size: 16px;
                line-height: 17px;
                margin-bottom: 28px;
                &.title{
                    border-left:4px solid #429EFD;
                    padding: 3px 10px;
                    font-size:16px;
                    font-weight:bold;
                }
            }
            .account-block{
                display: table;
                border-top:1px solid #EBEEF3;
                border-left:1px solid #EBEEF3;
                margin-bottom: 40px;
                .field-row{
                    display: table-row;
                    .field-title, .field-value{
                        display: table-cell;
                        width: 130px;
                        height:46px;
                        padding-left:10px;
                        vertical-align: middle;
                        background: #F9FBFE;
                        border-right:1px solid #EBEEF3;
                        border-bottom:1px solid #EBEEF3;
                    }
                    .field-value{
                        height:30px;
                        padding: 10px;
                        width: 297px;
                        background-color: #fff;
                        word-break: break-all;
                    }
                }
            }
           .back{
               color: #429EFD;
               font-size: 14px;
               text-align: center;
               text-decoration: underline;
               cursor: pointer;
               .el-form-item__content{
                   margin-left: 0 !important;
               }
           }
        }
    }
</style>
