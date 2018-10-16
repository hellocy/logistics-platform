<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>收款信息</h3>
            <span>状态：{{status_text}}</span>
        </div>
        <div :class="[prfClass + '-content']">
            <el-form :model="formData" :rules="rules" :inline-message="true" ref="formData" label-width="0px" class="demo-formData">
                <ul>
                    <li>
                        <h4>基础信息</h4>
                        <div class="account_div">
                            <el-form-item prop="channel_id" ref="chanel-select">
                                <label class="field-label"><span class="red">*</span>物流渠道</label>
                                <el-select v-model="formData.channel_id" placeholder="请选择" filterable @change="onChannelChanged">
                                    <el-option
                                        v-for="item in channelList"
                                        :key="item.id"
                                        :label="item.channel_name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="delivery_type" prop="delivery_type">
                                <label class="field-label"><span class="red">*</span>派送类型</label>
                                <el-select v-model="formData.delivery_type" placeholder="请选择" :disabled="deliveryTypeReadonly">
                                    <el-option
                                        v-for="item in deliveryTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="contract_subject">
                                <label class="field-label"><span class="red">*</span>托运方签约主体</label>
                                <el-input v-model="formData.contract_subject" class="contract-subject">
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="bill_currency">
                                <label class="field-label"><span class="red">*</span>账单币种</label>
                                <el-select v-model="formData.bill_currency" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billCurrencyList"
                                        :key="item.currency"
                                        :label="item.name"
                                        :value="item.currency">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="account_id" prop="account_id">
                                <label class="field-label"><span class="red">*</span>收款账户</label>
                                <el-select v-model="formData.account_id" placeholder="请选择" @change="onAccountChanged">
                                    <el-option
                                        v-for="item in receiptAccount"
                                        :key="item.id"
                                        :label="item.name + ' - ' + item.number + ' （' + item.status + '）'"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <a href="javascript:" class="link-edit" @click="linkToNewReceiptAccount">新建</a>
                                <a v-if="accountStatus === 1 || accountStatus === 3 " href="javascript:" class="link-modify" @click="editReceiptAccount">修改</a>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <h4>收款信息</h4>
                        <div class="account_div">
                            <el-form-item prop="bill_period">
                                <label class="field-label"><span class="red">*</span>运费账单周期</label>
                                <el-select v-model="formData.bill_period" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billPeriod"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="settle_currency">
                                <label class="field-label"><span class="red">*</span>结算币种</label>
                                <el-select v-model="formData.settle_currency" placeholder="请选择" filterable>
                                    <el-option
                                        v-for="item in billCurrencyList"
                                        :key="item.currency"
                                        :label="item.name"
                                        :value="item.currency">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="account_nature">
                                <label class="field-label"><span class="red">*</span>账户性质</label>
                                <el-radio-group v-model="formData.account_nature">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="tax_rate">
                                <label class="field-label"><span class="red">*</span>税点</label>
                                <el-input v-model="formData.tax_rate" class="tax-rate">
                                    <el-button slot="append">%</el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="receipt_method">
                                <label class="field-label"><span class="red">*</span>收款方式</label>
                                <el-radio-group v-model="formData.receipt_method">
                                    <el-radio :label="1">银行转账</el-radio>
                                    <el-radio :label="2">PayPal</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="receipt_cond">
                                <label class="field-label"><span class="red">*</span>收款条件</label>
                                <el-radio-group v-model="formData.receipt_cond">
                                    <el-radio :label="1">预付款</el-radio>
                                    <el-radio :label="2">先货后款</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="receipt_type">
                                <label class="field-label">收款类型</label>
                                <el-radio-group v-model="formData.receipt_type">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="pay_type">
                                <label class="field-label">付款类型</label>
                                <el-radio-group v-model="formData.pay_type">
                                    <el-radio :label="1">含税</el-radio>
                                    <el-radio :label="2">不含税</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item class="mark" prop="remark">
                                <label class="field-label">备注</label>
                                <el-input type="textarea" v-model="formData.remark"></el-input>
                            </el-form-item>
                        </div>
                    </li>
                    <li>
                        <el-form-item>
                            <el-button v-if="status !== 2" type="primary" plain @click="save('formData')" class="save">保存</el-button>
                            <el-button v-if="status !== 2" type="primary" @click="submitForm('formData')" class="save">提交审核</el-button>
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
import channelApi from '../../api/channel'
import util from 'commonVueLib/util/tools'
export default {
    components: {
        commonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'add-receipt',
            status: 0,
            accountStatus: 0,
            isFromAccount: false,
            formData: {
                id: '',
                channel_id: '', // 物流渠道
                delivery_type: '', // 派送类型
                contract_subject: '', // 托运方签约主体
                bill_currency: '', // 账单币种（基础信息）
                account_id: '', // 收款账户
                bill_period: '', // 运费账单周期
                settle_currency: '', // 结算币种（收款信息）
                account_nature: '', // 账户性质
                tax_rate: '', // 税点
                receipt_method: '', // 收款方式
                receipt_cond: '', // 收款条件
                receipt_type: '', // 收款类型
                pay_type: '', // 付款类型
                remark: '' // 备注
            },
            deliveryTypeReadonly: true,
            channelList: [],
            deliveryTypeList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: '全程',
                    value: 1
                },
                {
                    label: '中转',
                    value: 2
                },
                {
                    label: '尾程',
                    value: 3
                }
            ],
            billCurrencyList: [
                {
                    label: '请选择',
                    value: ''
                },
                {
                    label: 'USD-美元',
                    value: 1
                },
                {
                    label: 'CNY-人民币',
                    value: 2
                }
            ],
            receiptAccount: [],
            accountStatusArr: [],
            billPeriod: [],
            isRequired: true,
            info_id: '' // 收款信息ID
        }
    },
    computed: {
        breadcrumbList () {
            let _status = this.status
            let _statusText = ''
            if (_status === 1) {
                _statusText = '编辑'
            } else if (_status === 3 || _status === 5) {
                _statusText = '修改'
            } else if (_status === 4) {
                _statusText = '重新申请'
            } else {
                _statusText = '申请'
            }
            return [
                {
                    name: '收款信息',
                    url: '/cash_collection_info_list'
                }, {
                    name: _statusText,
                    url: ''
                }
            ]
        },
        status_text () {
            let _status = this.status
            if (_status === 1) {
                return '编辑'
            } else if (_status === 3 || _status === 5) {
                return '修改'
            } else if (_status === 4) {
                return '重新申请'
            } else {
                return '申请'
            }
        },
        rules () {
            let taxRule = (rule, value, callback) => {
                let regExp = /^\d+(\.\d{1,4})?$/
                if (value === '') {
                    callback()
                }
                if (regExp.test(value) === false) {
                    callback(new Error('请输入数字，最多保留四位小数'))
                } else {
                    callback()
                }
            }
            return {
                channel_id: [
                    { required: this.isRequired, message: '物流渠道不能为空', trigger: 'change' }
                ],
                delivery_type: [
                    { required: this.isRequired, message: '派送类型不能为空', trigger: 'change' }
                ],
                contract_subject: [
                    { required: this.isRequired, message: '托运方签约主体不能为空', trigger: 'blur' }
                ],
                bill_currency: [
                    { required: this.isRequired, message: '账单币种不能为空', trigger: 'change' }
                ],
                account_id: [
                    { required: this.isRequired, message: '收款账户不能为空', trigger: 'change' }
                ],
                bill_period: [
                    { required: this.isRequired, message: '运费账单周期不能为空', trigger: 'change' }
                ],
                settle_currency: [
                    { required: this.isRequired, message: '结算币种不能为空', trigger: 'change' }
                ],
                account_nature: [
                    { required: this.isRequired, message: '账户性质不能为空', trigger: 'change' }
                ],
                tax_rate: [
                    { required: this.isRequired, message: '税点不能为空', trigger: 'change' },
                    { validator: taxRule, trigger: 'blur' }
                ],
                receipt_method: [
                    { required: this.isRequired, message: '收款方式不能为空', trigger: 'change' }
                ],
                receipt_cond: [
                    { required: this.isRequired, message: '收款条件不能为空', trigger: 'change' }
                ]
            }
        }
    },
    mounted () {
        let that = this
        this.info_id = that.$route.params.id
        // 获取渠道
        channelApi.getChannels({
            is_contract_passed: 1
        }).then((res) => {
            if (res.code === 200) {
                res.data.unshift(
                    {
                        channel_name: '请选择',
                        delivery_type: '',
                        id: ''
                    }
                )
                that.channelList = res.data
                console.log(that.channelList, 999999)
            }
        })

        this.billCurrencyList = util.getCache('dictItem', 'local')['currency']
        let billPeriodObj = util.getCache('dictItem', 'local')['bill_period']
        for (let j in billPeriodObj) {
            this.billPeriod.push({
                label: billPeriodObj[j],
                value: j
            })
        }
        // 获取收款账户
        channelApi.getAccounts().then((res) => {
            if (res.code === 200) {
                let _data = res.data
                that.accountStatusArr = res.data
                that.receiptAccount = res.data
                let statusTxtArr = ['待审核', '审核中', '已完成']
                for (let i = 0; i < _data.length; i++) {
                    that.receiptAccount = res.data.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            number: item.number,
                            status: statusTxtArr[item.status - 1]
                        }
                    })
                }
                this.initFormData()
            }
        })
    },
    methods: {
        // 编辑收款账户信息时，获取初始值
        initFormData () {
            let that = this
            let id = this.$route.params.id
            that.isFromAccount = that.$store.getters['common/getCashDraftData']
            console.log(that.isFromAccount)
            if (id !== '__new__') {
                channelApi.getCashCollectionInfoData({ id: id }).then((res) => {
                    if (res.code === 200) {
                        that.status = res.data.status

                        for (let i in that.formData) {
                            that.formData[i] = res.data[i]
                        }

                        that.formData.bill_period = that.formData.bill_period.toString()

                        let _status = 0
                        let _accountArr = that.accountStatusArr
                        for (let i = 0; i < _accountArr.length; i++) {
                            if (_accountArr[i].id === that.formData.account_id) {
                                _status = _accountArr[i].status
                                break
                            }
                        }
                        that.accountStatus = _status
                    } else {
                        that.$alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }
                })
            } else if (that.isFromAccount && util.getCache('cash_collection_draft_data')) {
                that.formData = util.getCache('cash_collection_draft_data')
                that.$store.dispatch('common/cashDraftData', { cash_draft_data: false })
            }
        },

        onChannelChanged () {
            let that = this
            for (let i = 0; i < that.channelList.length; i++) {
                let channelId = that.channelList[i].id
                if (channelId === this.formData.channel_id) {
                    if (that.channelList[i].delivery_type) {
                        this.formData.delivery_type = parseInt(that.channelList[i].delivery_type)
                    }
                }
            }
        },
        onAccountChanged () {
            let that = this
            let _status = 0
            let _accountArr = that.accountStatusArr
            for (let i = 0; i < _accountArr.length; i++) {
                if (_accountArr[i].id === that.formData.account_id) {
                    _status = _accountArr[i].status
                    break
                }
            }
            that.accountStatus = _status
        },

        linkToNewReceiptAccount () {
            util.setCache('cash_collection_draft_data', this.formData)
            this.$router.push({ path: '/add_account/1/' + this.info_id })
        },
        editReceiptAccount () {
            if (this.formData.account_id === '') {
                this.$message({
                    showClose: true,
                    message: '请选择收款账户',
                    type: 'error'
                })
                return false
            }
            util.setCache('cash_collection_draft_data', this.formData)
            this.$router.push({ path: '/edit_account/' + this.formData.account_id + '/' + this.info_id + '/1' })
        },
        saveDraft (formName) { // 保存草稿
            let that = this
            // 修改各字段的必填校验属性
            that.isRequired = false
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        channelApi.addNewCashCollectionInfo(that.formData).then((res) => {
                            // if (res.code === 200) {
                            //     that.$message.success(res.msg)
                            //     that.$router.push({ path: '/cash_collection_info_list' })
                            // } else {
                            //     that.$message.error(res.msg)
                            // }
                        })
                    }
                })
            }, 0)
        },
        save (formName) { // 保存
            let that = this
            // 修改各字段的必填校验属性
            that.isRequired = true
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        // that.$message.success('表单验证成功')
                        let id = that.$route.params.id
                        let method = id === '__new__' ? 'addNewCashCollectionInfo' : 'editCashCollectionInfo'
                        channelApi[method](that.formData).then((res) => {
                            if (res.code === 200) {
                                // that.$message.success(res.msg)
                                that.$router.push({ path: '/cash_collection_info_list' })
                            } else {
                                that.$alert(res.msg, '错误', {
                                    confirmButtonText: '确定',
                                    type: 'error'
                                })
                            }
                        })
                    }
                })
            }, 0)
        },
        submitForm (formName) { // 提交数据
            let that = this
            that.isRequired = true
            setTimeout(function () {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        channelApi.submitCashCollectionInfo(that.formData).then((res) => {
                            if (res.code === 200) {
                                that.$message.success('提交成功')
                                that.$router.push({ path: '/cash_collection_auditing/' + res.data })
                            } else {
                                that.$alert(res.msg, '错误', {
                                    confirmButtonText: '确定',
                                    type: 'error'
                                })
                            }
                        })
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
        .breadcrumb-box{
            margin:10px;
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
            .field-label{
                display: inline-block;
                padding: 0 5px;
                color: #606266;
                width: 115px;
                text-align: right;
                .red{
                    color:red;
                    padding: 0 5px;
                }
            }
            .account_div{
                padding-left: 55px;
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
                .el-textarea{
                    width:auto;
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
