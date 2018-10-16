<template>
    <div :class="prfClass">
        <common-header></common-header>
        <step-list :type="typeNumber"
                   :stepSpace="stepSpace"
                   :title="stepTitle"
                   :stepCount="stepCount"></step-list>
        <div :class="[prfClass + '-form']">
            <h3>联系方式</h3>
            <el-form :model="ruleForm"
                     :inline="true"
                     :inline-message="true"
                     :rules="rules" ref="ruleForm"
                     label-width="100px" class="demo-ruleForm">
                <ul>
                    <li>
                        <h4>
                            <i></i>公司高层联系方式
                        </h4>
                        <el-form-item label="姓名">
                            <el-input v-model="ruleForm.chief_contact.name"></el-input>
                        </el-form-item>
                        <el-form-item label="职务">
                            <el-input v-model="ruleForm.chief_contact.position"></el-input>
                        </el-form-item>
                        <el-form-item label="座机" prop="chief_contact.landline">
                            <el-input v-model="ruleForm.chief_contact.landline"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="chief_contact.phone">
                            <el-input v-model.number="ruleForm.chief_contact.phone"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>
                            <i></i>业务联系方式
                        </h4>
                        <el-form-item label="姓名" prop="business_contact.name">
                            <el-input v-model="ruleForm.business_contact.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="business_contact.phone">
                            <el-input v-model="ruleForm.business_contact.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="business_contact.email">
                            <el-input v-model="ruleForm.business_contact.email"></el-input>
                        </el-form-item>
                        <el-form-item label="固定电话" prop="business_contact.landline">
                            <el-input v-model="ruleForm.business_contact.landline"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="business_contact.qq">
                            <el-input v-model="ruleForm.business_contact.qq"></el-input>
                        </el-form-item>
                        <el-form-item label="传值">
                            <el-input v-model="ruleForm.business_contact.fax"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>
                            <i></i>财务联系方式
                        </h4>
                        <el-form-item label="姓名" prop="finance_contact.name">
                            <el-input v-model="ruleForm.finance_contact.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="finance_contact.phone">
                            <el-input v-model="ruleForm.finance_contact.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="finance_contact.email">
                            <el-input v-model="ruleForm.finance_contact.email"></el-input>
                        </el-form-item>
                        <el-form-item label="固定电话" prop="finance_contact.landline">
                            <el-input v-model="ruleForm.finance_contact.landline"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="finance_contact.qq">
                            <el-input v-model="ruleForm.finance_contact.qq"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>
                            <i></i> IT联系方式
                        </h4>
                        <el-form-item label="姓名" prop="it_contact.name">
                            <el-input v-model="ruleForm.it_contact.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="it_contact.phone">
                            <el-input v-model="ruleForm.it_contact.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="it_contact.email">
                            <el-input v-model="ruleForm.it_contact.email"></el-input>
                        </el-form-item>
                        <el-form-item label="固定电话" prop="it_contact.landline">
                            <el-input v-model="ruleForm.it_contact.landline"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="it_contact.qq">
                            <el-input v-model="ruleForm.it_contact.qq"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <h4>
                            <i></i> 客服联系方式
                        </h4>
                        <el-form-item label="姓名" prop="cutomer_contact.name">
                            <el-input v-model="ruleForm.cutomer_contact.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="cutomer_contact.phone">
                            <el-input v-model="ruleForm.cutomer_contact.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="cutomer_contact.email">
                            <el-input v-model="ruleForm.cutomer_contact.email"></el-input>
                        </el-form-item>
                        <el-form-item label="固定电话" prop="cutomer_contact.landline">
                            <el-input v-model="ruleForm.cutomer_contact.landline"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ" prop="cutomer_contact.qq">
                            <el-input v-model="ruleForm.cutomer_contact.qq"></el-input>
                        </el-form-item>
                        <el-form-item class="submit" v-if="editMessage">
                            <el-button type="primary" @click="next('ruleForm', 'save')">保存</el-button>
                            <el-button type="primary" class="save" @click="cancel">返回</el-button>
                        </el-form-item>
                        <el-form-item class="submit" v-else>
                            <el-button @click="back">上一步</el-button>
                            <el-button type="primary" @click="next('ruleForm', 'next')">下一步</el-button>
                        </el-form-item>

                    </li>
                </ul>
            </el-form>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import api from '../../api/register'
import util from 'commonVueLib/util/tools'

export default {
    name: 'phoneNumber',
    components: {
        StepList,
        CommonHeader
    },
    data () {
        let areaType = util.getCache('lmp_All_info').quality_info.area_type // 区域
        let CheckPhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号码不能为空'))
            } else if (!/^\+?[1-9][0-9]*$/.test(value)) {
                if (areaType === 1) {
                    callback(new Error('手机号码必须是数字'))
                } else {
                    callback()
                }
            } else if (value.toString().length !== 11) {
                if (areaType === 1) {
                    callback(new Error('手机号码格式不对'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        let phoneValidator = (rule, value, callback) => {
            if (value !== '') {
                if (!/^(([0/+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
                    if (areaType === 1) {
                        callback(new Error('格式不对!'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        let checkQQ = (rule, value, callback) => {
            if (value !== '') {
                if (!/^\+?[1-9][0-9]*$/.test(value)) {
                    callback(new Error('必须是数字'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        return {
            prfClass: 'phone-number',
            typeNumber: 4,
            stepTitle: '欢迎物流商入驻',
            stepCount: [
                {
                    index: 1,
                    title: '基础信息'
                },
                {
                    index: 2,
                    title: '资质证照'
                },
                {
                    index: 3,
                    title: '规模与设施'
                },
                {
                    index: 4,
                    title: '联系方式'
                },
                {
                    index: 5,
                    title: '审核查询'
                }
            ],
            stepSpace: 100, // nav中间宽度
            ruleForm: {
                chief_contact: { // 高层联系信息
                    name: '', // 姓名
                    position: '', // 职务
                    phone: '', // 手机
                    landline: '' // 座机号
                },
                business_contact: { // 业务联系信息
                    name: '', // 姓名
                    phone: '', // 手机
                    landline: '', // 座机号
                    email: '', // 邮箱
                    qq: '', // qq
                    fax: '' // 传真号
                },
                finance_contact: { // 财务联系信息
                    name: '', // 姓名
                    phone: '', // 手机
                    email: '', // 邮箱
                    qq: '', // qq
                    landline: '' // 固话
                },
                it_contact: { // it联系信息
                    name: '', // 姓名
                    phone: '', // 手机
                    email: '', // 邮箱
                    qq: '', // qq
                    landline: '' // 固话
                },
                cutomer_contact: { // 客服联系信息
                    name: '', // 姓名
                    phone: '', // 手机
                    email: '', // 邮箱
                    qq: '', // qq
                    landline: '' // 固话
                }
            },
            editMessage: false, // 是否是编辑
            rules: {
                'chief_contact.phone': [
                    {
                        required: false,
                        validator: (rule, value, callback) => {
                            if (value !== '') {
                                if (!/^\+?[1-9][0-9]*$/.test(value)) {
                                    if (areaType === 1) {
                                        callback(new Error('手机号码必须是数字'))
                                    } else {
                                        callback()
                                    }
                                } else if (value.toString().length !== 11) {
                                    if (areaType === 1) {
                                        callback(new Error('手机号码格式不对'))
                                    } else {
                                        callback()
                                    }
                                } else {
                                    callback()
                                }
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change'
                    }
                ],
                'chief_contact.landline': [
                    { required: false, validator: phoneValidator, trigger: 'change' }
                ],
                'business_contact.phone': [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    { validator: CheckPhone, trigger: ['blur', 'change'] }
                ],
                'business_contact.landline': [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('固定电话不能为空'))
                            } else if (value !== '') {
                                if (!/^(([0/+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
                                    if (areaType === 1) {
                                        callback(new Error('格式不对!'))
                                    } else {
                                        callback()
                                    }
                                } else {
                                    callback()
                                }
                            } else {
                                callback()
                            }
                        },
                        trigger: ['blur', 'change']
                    }
                ],
                'business_contact.name': [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                'business_contact.email': [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                'business_contact.qq': [
                    { required: false, validator: checkQQ, trigger: ['blur', 'change'] }
                ],
                'finance_contact.phone': [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    { validator: CheckPhone, trigger: ['blur', 'change'] }
                ],
                'finance_contact.landline': [
                    { required: false, validator: phoneValidator, trigger: 'change' }
                ],
                'finance_contact.name': [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                'finance_contact.email': [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                'finance_contact.qq': [
                    { required: false, validator: checkQQ, trigger: 'change' }
                ],
                'it_contact.phone': [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    { validator: CheckPhone, trigger: ['blur', 'change'] }
                ],
                'it_contact.landline': [
                    { required: false, validator: phoneValidator, trigger: 'change' }
                ],
                'it_contact.name': [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                'it_contact.email': [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                'it_contact.qq': [
                    { required: false, validator: checkQQ, trigger: 'change' }
                ],
                'cutomer_contact.phone': [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    { validator: CheckPhone, trigger: ['blur', 'change'] }
                ],
                'cutomer_contact.landline': [
                    { required: false, validator: phoneValidator, trigger: 'change' }
                ],
                'cutomer_contact.name': [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                'cutomer_contact.email': [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
                ],
                'cutomer_contact.qq': [
                    { required: false, validator: checkQQ, trigger: 'change' }
                ]
            }
        }
    },
    created () {
        if (util.getCache('company_info', 'local') != null) {
            // 获取状态
            let currentStep = util.getCache('lmp_All_info').current_step
            if (currentStep === 0) {
                this.stepTitle = '公司资料修改'
            }
        }
    },
    mounted () {
        /// 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        // 如果是从物流商资料进来编辑的
        if (util.getCache('editMessage') !== null && util.getCache('editMessage')) { // 修改资料
            let data = util.getCache('lmp_All_info')
            this.ruleForm = $.extend({}, data.contact_info)
            this.editMessage = util.getCache('editMessage')
        } else {
            if (util.getCache('lmp_All_info') != null) {
                let data = util.getCache('lmp_All_info')
                let localData = data.contact_info
                this.formData = localData
            }
        }
    },
    methods: {
        back () { // 上一步
            let data = util.getCache('lmp_All_info')
            data.contact_info = this.formData
            // 存储当前页数据
            util.setCache('lmp_All_info', data)
            this.$router.push({ path: '/scale' })
        },
        // 下一步
        next (formName, type) {
            let _self = this
            console.log(formName)
            _self.$refs[formName].validate((valid) => {
                console.log(valid)
                if (!valid) {
                    return false
                } else {
                    _self.ruleForm.current_step = 4 // 流程步骤

                    api.saveLogisticsEnterprise(_self.ruleForm).then((res) => {
                        if (res.code === 200) {
                            let data = util.getCache('lmp_All_info')
                            if (data != null) {
                                data.contact_info = _self.ruleForm
                                util.setCache('lmp_All_info', data) // 存储当前页数据
                            }
                            _self.$router.push({ path: '/affiliate_message' })
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            })
                        }
                    }).catch(() => {
                        console.log('error')
                    })
                }
            })
        },
        // 返回按钮
        cancel () {
            this.$router.push({ path: '/affiliate_message' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'phone-number';
    .#{$prfClass}{
        h3{
            line-height: 17px;
            color: #2F3032;
            font-size: 16px;
            padding-bottom: 12px;
            border-bottom: 1px #F1F1F7 solid;
        }
        .#{$prfClass}-form{
            width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 39px 50px 58px;
            border-top: 1px #F1F1F7 solid;
            li{
                padding-left: 22px;
                padding-bottom: 15px;
                border-bottom: 1px #F1F1F7 solid;
                &:last-child{
                   border-bottom: none;
                }
                .el-form-item{
                    margin-bottom: 16px;
                }
                .el-form-item:nth-of-type(2n+1){
                    width: 364px;
                    .el-form-item__label{
                        width: 56px !important;
                    }
                }
                .el-input{
                    width: 160px;
                    .el-input__inner{
                        width: 160px;
                        height: 40px;
                    }
                }
                h4{
                    margin: 30px 0;
                    color: #2F3032;
                    font-size: 14px;
                    i{
                        width: 3px;
                        height: 12px;
                        background-color: #429EFD;
                        display: inline-block;
                        margin-right: 8px;
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                }
                .submit{
                    display: block;
                    margin-left: 57px;
                    button{
                        width: 160px;
                        height: 44px;
                        margin-top: 24px;
                        margin-right: 20px;
                        &:last-child{
                            margin-right: 0px;
                        }
                    }
                    .save{
                        color: #429EFD;
                        border: 1px solid #B3D7FE;
                        background-color: #fff;
                    }
                }
            }
        }

    }
</style>
