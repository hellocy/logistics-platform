<template>
    <div :class="prfClass">
        <common-header></common-header>
       <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <step-list :type="typeNumber"
                       :title="stepTitle"
                       :stepSpace="stepSpace"
                       :stepCount="stepCount"></step-list>
            <div :class="[prfClass + '-form']">
                <div class="info">
                    <h3>计费模式</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_model_info">
                    <el-form-item class="mBottom" prop="is_acceptable">
                        <div class="label-name"><span class="red">*</span>计费重是否接受我司取值</div>
                        <el-radio-group v-model="formData.is_acceptable">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item class="mBottom" prop="is_inc_tariff">
                        <div class="label-name"><span class="red">*</span>是否含关税</div>
                        <el-radio-group v-model="formData.is_inc_tariff">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop="is_inc_vat">
                        <div class="label-name"><span class="red">*</span>是否含增值税</div>
                        <el-radio-group v-model="formData.is_inc_vat">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="billing_weight_type" prop="billing_weight_type">
                        <div class="label-name"><span class="red">*</span>计费重类型</div>
                        <el-select v-model="formData.billing_weight_type" placeholder="请选择" @change="billingWeightType()">
                            <el-option
                                v-for="item in billingWeightTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="volume_coeff_type" prop="volume_coeff_type" v-if="formData.billing_weight_type === 2">
                        <div class="label-name"><span class="red">*</span>体积系数</div>
                        <el-select v-model="formData.volume_coeff_type" placeholder="请选择">
                            <el-option
                                v-for="item in volumeCoeffTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="fpb_rate_type" prop="fpb_rate_type">
                        <div class="label-name"><span class="red">*</span>分泡比</div>
                        <el-select v-model="formData.fpb_rate_type" placeholder="请选择">
                            <el-option
                                v-for="item in fpbRateTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="billing_unit" prop="billing_unit">
                        <div class="label-name"><span class="red">*</span>计费单位</div>
                        <el-select v-model="formData.billing_unit" placeholder="请选择">
                            <el-option
                                v-for="item in billingUnitList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('form_model_info', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button @click="save_draft('form_model_info')" type="primary" class="save" v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" class="last-step" @click="prev()" v-if="status != 5">上一步</el-button>
                        <el-button type="primary" class="next-step" @click="next('form_model_info', 'next')" v-if="status != 5">下一步</el-button>
                        <a class="link-back" @click="back">返回</a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import channelApi from '../../api/channel'
import breadcrumb from '../../components/breadcrumb'
import util from 'commonVueLib/util/tools'
export default {
    name: 'channel_application_pricing_model',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        let numRge = (rule, value, callback) => { // 数字必须大于0
            let reg = /^\d+(\.\d+)?$/
            if (reg.test(value) && (value === 0)) {
                callback(new Error('不能为空'))
            } else {
                callback()
            }
        }
        return {
            prfClass: 'channel-pricing-model',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                is_acceptable: 0, // 计费重是否接受我司取值
                is_inc_tariff: 0, // 是否含关税
                is_inc_vat: 0, // 是否含增值税
                billing_weight_type: 0, // 计费重类型
                volume_coeff_type: 0, // 体积系数
                fpb_rate_type: 0, // 分泡比
                billing_unit: 0 // 计费单位
            },
            billingWeightTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '实重'
                },
                {
                    value: 2,
                    label: '实重与体积重大者'
                }
            ],
            volumeCoeffTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '4000'
                },
                {
                    value: 2,
                    label: '5000'
                },
                {
                    value: 3,
                    label: '6000'
                },
                {
                    value: 4,
                    label: '7000'
                },
                {
                    value: 5,
                    label: '8000'
                }
            ],
            fpbRateTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '不分泡'
                },
                {
                    value: 2,
                    label: '分1/3泡'
                },
                {
                    value: 3,
                    label: '分半泡'
                },
                {
                    value: 4,
                    label: '分2/3泡'
                }
            ],
            billingUnitList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: 'KG'
                },
                {
                    value: 2,
                    label: 'm³'
                },
                {
                    value: 3,
                    label: 'oz'
                },
                {
                    value: 4,
                    label: 'pcs'
                },
                {
                    value: 5,
                    label: 'g'
                },
                {
                    value: 6,
                    label: 'lb'
                },
                {
                    value: 7,
                    label: '百分比'
                },
                {
                    value: 8,
                    label: 'in'
                },
                {
                    value: 9,
                    label: 'cm'
                },
                {
                    value: 10,
                    label: 't '
                },
                {
                    value: 11,
                    label: '箱'
                }
            ],
            rules: {
                is_acceptable: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                is_inc_tariff: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                is_inc_vat: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                billing_weight_type: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                volume_coeff_type: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                fpb_rate_type: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                billing_unit: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ]
            },
            typeNumber: 5, // 当前第n步
            stepSpace: 66,
            stepTitle: '计费模式',
            stepCount: [ // 步骤定义
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '发货要求'
                }, {
                    index: 4,
                    title: '售后服务'
                }, {
                    index: 5,
                    title: '计费模式'
                }, {
                    index: 6,
                    title: '附件上传'
                }, {
                    index: 7,
                    title: '审核查询'
                }
            ],
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '计费模式',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        this.formData.id = this.$route.params.id // 获取本条渠道数据的id
        this.mode_type = this.$route.params.mode_type
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.typeNumber = 6
            this.stepCount = [
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '数据要求'
                }, {
                    index: 4,
                    title: '发货要求'
                }, {
                    index: 5,
                    title: '售后服务'
                }, {
                    index: 6,
                    title: '计费模式'
                }, {
                    index: 7,
                    title: '附件上传'
                }, {
                    index: 8,
                    title: '审核查询'
                }
            ]
        }
        let lmpChannelApplicationB2b = util.getCache('lmp_channelApplication_data')
        if (lmpChannelApplicationB2b.billing_mode) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.billing_mode
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'billing_mode'
        util.getNextApi(key, this.status)
    },
    methods: {
        billingWeightType () { // 计费重类型改变时 体系系数清空
            if (this.formData.billing_weight_type !== 2) {
                this.formData.volume_coeff_type = 0
            }
        },
        prev () { // 上一步
            this.$router.push({ path: '/channel_application_after_service/' + this.$route.params.id + '/' + this.mode_type })
        },
        next (formName, save) { // 下一步
            let _self = this
            _self.formData.save_as_draft = 2 // 是否是草稿 1是 2否
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    channelApi.priceMode(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
                        if (res.code === 200) {
                            _self.$message({
                                showClose: true,
                                message: '保存成功！',
                                type: 'success'
                            })
                            if (res.data.id) {
                                _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                            }
                            _self.status = res.data.status
                            _self.formData.is_done = res.data.is_done
                            let data = util.getCache('lmp_channelApplication_data')
                            data.status = res.data.status // 重新改写缓存中整条数据的状态
                            data.billing_mode = $.extend({}, _self.formData)
                            util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                            util.getNextApi('billing_mode', _self.status) // 修改此条数据的状态
                            if (save !== 'save') {
                                _self.$router.push({path: '/channel_application_fileUpload/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                            } else { // 保存跳到资料预览页
                                _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                            }
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                }
            })
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            _self.$refs[formName].clearValidate()
            _self.formData.save_as_draft = 1 // 是否是草稿 1是 2否
            channelApi.priceMode(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '保存草稿成功！',
                        type: 'success'
                    })
                    if (res.data.id) {
                        _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                    }
                    _self.status = res.data.status
                    let data = util.getCache('lmp_channelApplication_data')
                    data.status = res.data.status // 重新改写缓存中整条数据的状态
                    data.billing_mode = $.extend({}, _self.formData)
                    util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                    util.getNextApi('billing_mode', _self.status) // 修改此条数据的状态
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        back () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-pricing-model';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
    }
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 120px;
        background-color: #fff;
        height: auto;
        padding-bottom: 58px;
        .red{
            color:red
        }
        .el-form-item__content{
            display: inline-block;

            .el-input{
                width: 380px;
            }

            .label-name{
                color: #2F3032;
                font-family: Microsoft YaHei;
                font-weight:400;
                width: 290px;
                display: inline-block;
                text-align: right;
                font-size: 14px;
                line-height: 36px;
                padding: 0 11px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                vertical-align: top;
            }
            .line{
                text-align: center;
            }
            .el-button--primary{
                height:44px;
                width: 160px;
            }
        }
        .info{
            padding-top: 40px;
            margin: 0px 91px 0px 89px;
            border-bottom: 1px solid #F1F1F7;
            width:720px;
            h3{
                color: #2F3032;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight:bold;
                padding-bottom: 11px;
            }
        }
        .formInfo{
            margin-top: 40px;
        }
        .business_type{
            margin-bottom: 30px!important;
        }
        .el-form-item{
            margin-bottom: 16px;
            .el-form-item__label{
                width:290px;
            }
            .form-item-tip{
                text-align: center;
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
        .footer{
            margin-top: 40px;
            text-align: center;
            font-family:MicrosoftYaHei;
            .save{
                color: #429EFD;
                background-color: #fff;
                height: 44px;
                border:1px solid rgba(66,158,253,1);
                span{
                    font-size:16px;
                }
            }
            .last-step{
                font-size: 16px;
                margin-left: 12px;
            }
            .next-step{
                font-size: 16px;
                margin-left: 10px;
            }
            .link-back{
                font-size:14px;
                margin-left:10px;
                text-decoration: underline;
                color:#429EFD;
                cursor: pointer;
                &:hover{
                    color:limegreen;
                }
            }
        }
        .mBottom{
            margin-bottom: 0px;
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }

    }
    .fileCls {
        width: 300px;
        .el-message-box__message p{
            font-size: 14px;
        }
    }
</style>
