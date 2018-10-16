<template>
    <div :class="prfClass">
        <common-header></common-header>
        <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        <div class="top">
            <h3>收款信息</h3>
            <span>状态：修改</span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="120px" class="demo-formData">
                <ul>
                    <li>
                        <h4>基础信息</h4>
                        <div class="account_div">
                            <el-form-item label="物流渠道" prop="channel_id" ref="chanel-select" >
                                <el-select v-model="formData.channel_id" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in channelList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="派送类型" class="delivery_type" prop="delivery_type">
                                <el-select v-model="formData.delivery_type" placeholder="请选择">
                                    <el-option
                                        v-for="item in deliveryTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="账单币种" prop="bill_currency">
                                <el-select v-model="formData.bill_currency" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billCurrencyList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收款账户" class="receipt_account" prop="receipt_account">
                                <el-select v-model="formData.receipt_account" placeholder="请选择">
                                    <el-option
                                        v-for="item in receiptAccount"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <a href="javascript:" class="link-edit" @click="linkToNewReceiptAccount">新建</a>
                                <a href="javascript:" class="link-modify" @click="editReceiptAccount">修改</a>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <h4>收款信息</h4>
                        <div class="account_div">
                            <el-form-item label="运费账单周期" prop="bill_period">
                                <el-select v-model="formData.bill_period" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billPeriod"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="结算币种" prop="settle_currency">
                                <el-select v-model="formData.settle_currency" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billCurrencyList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="账户性质" prop="account_nature">
                                <el-radio-group v-model="formData.account_nature">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="税点" prop="tax_rate">
                                <el-input v-model="formData.tax_rate" class="tax-rate">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="收款方式" prop="receipt_method">
                                <el-radio-group v-model="formData.receipt_method">
                                    <el-radio :label="1">银行转账</el-radio>
                                    <el-radio :label="2">PayPal</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="收款条件" prop="receipt_cond">
                                <el-radio-group v-model="formData.receipt_cond">
                                    <el-radio :label="1">预付款</el-radio>
                                    <el-radio :label="2">先货后款</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="收款类型" prop="receipt_type">
                                <el-radio-group v-model="formData.receipt_type">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="付款类型" prop="pay_type">
                                <el-radio-group v-model="formData.pay_type">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="备注" class="mark" prop="remark">
                                <el-input type="textarea" v-model="formData.remark"></el-input>
                            </el-form-item>
                        </div>
                    </li>
                    <li class="file-li">
                        <h4>附件</h4>
                        <div>
                            <el-form-item prop="attachs">
                                <div class="label-name">渠道合同附件</div>
                                <el-upload
                                    class="upload-attachment"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-success="receiptSuccess"
                                    :file-list="formData.attachs">
                                    <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                                </el-upload>
                                <span class="red" v-if="attachs">渠道合同附件不能为空</span>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <el-form-item>
                            <el-button type="primary" plain @click="saveToDraft('formData')" class="save">保存草稿</el-button>
                            <el-button type="primary" @click="submitForm('formData')" class="save">保存</el-button>
                            <span class="back" @click="back()">返回列表</span>
                        </el-form-item>
                    </li>
                </ul>
            </el-form>
        </div>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import breadcrumb from '../../components/breadcrumb'
export default {
    components: {
        commonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'add-receipt',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                },{
                    name: '编辑',
                    url: ''
                }
            ],
            formData: {
                channel_id: '', // 物流渠道
                delivery_type: '', // 派送类型
                bill_currency: '', // 账单币种（基础信息）
                receipt_account: '', // 收款账户
                bill_period: '', // 运费账单周期
                settle_currency: '', // 结算币种（收款信息）
                account_nature: '', // 账户性质
                tax_rate: '', // 税点
                receipt_method: '', // 收款方式
                receipt_cond: '', // 收款条件
                receipt_type: '', // 收款类型
                pay_type: '', // 付款类型
                receipt_attachment: [],
                remark: '' // 备注
            },
            attachs: false,
            channelList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '中通快递',
                    value: 'ZTexpress'
                },
                {
                    label: '顺丰速运',
                    value: 'SFExpress'
                },
                {
                    label: '联邦快递',
                    value: 'fedex'
                }
            ],
            deliveryTypeList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '全程',
                    value: '1'
                },
                {
                    label: '中转',
                    value: '2'
                },
                {
                    label: '尾程',
                    value: '3'
                }
            ],
            billCurrencyList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: 'USD-美元',
                    value: '1'
                },
                {
                    label: 'CNY-人民币',
                    value: '2'
                }
            ],
            receiptAccount: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '1111',
                    value: '5555'
                }
            ],
            billPeriod: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '季节',
                    value: '1'
                },
                {
                    label: '月结',
                    value: '2'
                },
                {
                    label: '半月结',
                    value: '3'
                },
                {
                    label: '周结',
                    value: '4'
                },
                {
                    label: '日结',
                    value: '5'
                },
                {
                    label: '其他',
                    value: '6'
                }
            ],
            isChannelRequired: true
        }
    },
    computed: {
        rules () {
            let taxRule = (rule, value, callback) => {
                let regExp = /^\d+(\.\d{1,4})?$/
                if (regExp.test(value) === false) {
                    callback(new Error('请输入数字，最多保留四位小数'))
                } else {
                    callback()
                }
            }
            return {
                channel_id: [
                    { required: this.isChannelRequired, message: '物流渠道不能为空', trigger: 'blur' }
                ],
                delivery_type: [
                    { required: true, message: '派送类型不能为空', trigger: 'blur' }
                ],
                bill_currency: [
                    { required: true, message: '账单币种不能为空', trigger: 'change' }
                ],
                receipt_account: [
                    { required: true, message: '收款账户不能为空', trigger: 'change' }
                ],
                bill_period: [
                    { required: true, message: '运费账单周期不能为空', trigger: 'change' }
                ],
                settle_currency: [
                    { required: true, message: '结算币种不能为空', trigger: 'change' }
                ],
                account_nature: [
                    { required: true, message: '账户性质不能为空', trigger: 'change' }
                ],
                tax_rate: [
                    { required: true, message: '税点不能为空', trigger: 'change' },
                    { validator: taxRule, trigger: 'blur' }
                ],
                receipt_method: [
                    { required: true, message: '收款方式不能为空', trigger: 'blur' }
                ],
                receipt_cond: [
                    { required: true, message: '收款条件不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        receiptSuccess (response, file, fileList) { // 账户盖章附件上传成功
            this.formData.receipt_attachment.push({
                'name': file.name,
                'url': file.url
            })
        },
        linkToNewReceiptAccount () {
            this.$router.push({ path: '/add_account' })
        },
        editReceiptAccount () {
            this.$router.push({ path: '/add_account/' + this.formData.receipt_account })
        },
        saveToDraft (formName) { // 保存草稿
            var that = this
            this.isChannelRequired = false
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$notify.success({
                            title: '验证成功！',
                            message: '表单验证成功！'
                        })
                        console.log(that.formData, 88888)
                    } else {
                        that.$notify.error({
                            title: '验证失败',
                            message: '请检查表单数据'
                        })
                        return false
                    }
                })
            }, 0)
        },
        submitForm (formName) { // 提交数据
            var that = this
            this.isChannelRequired = true
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$notify.success({
                            title: '验证成功！',
                            message: '表单验证成功！'
                        })
                    } else {
                        that.$notify.error({
                            title: '验证失败',
                            message: '请检查表单数据'
                        })
                        return false
                    }
                })
            }, 0)
        },
        back () { // 返回列表
            this.$router.push({ path: '/cash_collection_info_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'add-receipt';
    .#{$prfClass}{
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
            .account_div{
                padding-left: 110px;
                .el-input__inner, .el-textarea__inner{
                   width: 380px;
                }
                .tax-rate{
                    .el-input__inner{
                        width: 324px;
                    }
                }
                .el-form-item{
                    margin-bottom: 16px;
                }
                .el-input{
                    width: auto;
                }
            }
           .link-edit, .link-modify{
               margin-left: 10px;
               color: #429EFD;
               text-decoration: underline;
           }
           .el-upload-list{
               margin-left:137px;
           }
           .file-li {
               .fileUpload{
                   width: 100px;
                   height: 32px;
                   border-radius: 5px;
                   color: #429EFD;
                   border: 1px solid #B3D7FE;
                   font-weight: 400;
               }
               .label-name{
                   width: 130px;
                   text-align: right;
                   display: inline-block;
               }
               .upload-attachment{
                   display: inline;
                   margin-left: 12px;
               }
               .el-upload__tip{
                   margin-top: 11px;
                   line-height: 2px;
                   font-size: 12px;
                   font-family: MicrosoftYaHei;
                   font-weight: 400;
                   color: #bfc3cb;
                   margin-left: 146px;
               }
               .el-form-item__content{
                   margin-left: 105px !important;
                   line-height: 2px !important;
               }
               .red{
                   float: right;
                   margin-top: -30px;
                   color: #f56c6c;
                   margin-right: 194px;
               }
               .last{
                   margin-right: 251px;
               }
           }
           li:last-child{
               .el-form-item__content{
                   margin-left: 250px !important;
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
