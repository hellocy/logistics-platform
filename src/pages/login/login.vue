<style lang="scss">
    $prfClass: 'login';
    .#{$prfClass}-wrap{
        .red{
            color: red;
        }
        h3{
            display: flex;
            justify-content: center;
            margin-top: 59px;
            margin-bottom: 30px;
            font-size: 28px;
            color: #429EFD;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
        }

        .#{$prfClass}-form{
            margin: 0 auto;
            height: auto;
            background: #fff;
            width: 700px;
        }
        .el-form-item__label{
            color: #2F3032;
            font-family: Microsoft YaHei;
            width: 230px;
            display: inline-block;
        }
        .label-name{
            color: #2F3032;
            font-family: Microsoft YaHei;
            width: 230px;
            display: inline-block;
            text-align: right;
            font-size: 14px;
            line-height: 40px;
            padding: 0 12px 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .el-form-item__content{
            display: inline-block;
        }
        .el-form{
            padding-top: 60px;
            padding-bottom: 60px;
        }
        .el-input__inner{
            width: 300px;
        }
        .el-button--primary{
            margin-left: 235px;
        }
        .yzForm{
            .el-input{
                width: auto;
            }
        }
        .yzForm .el-input__inner{
            width: 191px;
        }
        .el-input{
            width: 300px;
        }
        .getYz{
            display: inline-block;
            width:92px;
            height:40px;
            margin-left: 12px;
            cursor: pointer;
            img{
                width: 92px;
                height: 40px;
                border: none;
            }
        }
        .el-button--primary{
            width: 191px;
            font-size: 16px;
            height: 44px;
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
        .verCodeCls{
            color: #fff;
        }
        .forget{
            display: inline-block;
            font-weight:400;
            text-decoration:underline;
            color:rgba(66,158,253,1);
            line-height:36px;
            margin-left: 8px;
            cursor: pointer;
        }
        .btn{
            text-align: left;
            margin-left: 235px;
            .left{
                font-weight:400;
                text-decoration:underline;
                color:rgba(66,158,253,1);
                line-height:36px;
                cursor: pointer;
            }
        }
        .emailName{
            .el-form-item__error {
                margin-left: 3px;
            }
            .success{
                display: inline-block;
                margin-left: 3px;
            }
        }
    }
    .regCls {
        width: 300px;
        .el-button--primary{
            width: 90px;
            font-size: 14px;
        }
    }
</style>
<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <h3>企业登录</h3>
            <div :class="[prfClass + '-form']">
                <el-form :model="formData" :rules="rules" ref="formLogin">
                    <el-form-item class="emailName" prop="email">
                        <div class="label-name"><span class="red">*</span>邮箱</div>
                        <el-input v-model="formData.email" @change="emailChange" placeholder="请输入邮箱"></el-input>
                        <div class="success" v-if="successEmail"><i class="el-icon-check"></i></div>
                    </el-form-item>

                    <el-form-item prop="password">
                        <div class="label-name"><span class="red">*</span>密码</div>
                        <el-input type="password" v-model="formData.password" placeholder="请输入登录密码"></el-input>
                    </el-form-item>

                    <el-form-item class="yzForm" prop="captcha">
                        <div class="label-name"><span class="red">*</span>验证码</div>
                        <el-input v-model="formData.captcha" placeholder="请输入验证码"></el-input>
                        <div class="getYz" @click="getCaptcha"><img :src="captchaImg"></div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="login('formLogin')">登录</el-button>
                        <!--<div class="forget" @click="forgetPassword">忘记密码</div>-->
                        <div class="btn">
                            <div class="left" @click="register">企业注册</div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/api'
import util from 'commonVueLib/util/tools'

export default {
    name: 'login',
    components: {
        CommonHeader
    },
    data () {
        return {
            prfClass: 'login',
            formData: {
                email: '',
                captcha: '',
                password: ''
            },
            successEmail: false,
            successMsg: '',
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur'] }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' }
                ]
            },
            captchaImg: '' // 验证码图片
        }
    },
    created () {
        let _self = this
        _self.getCaptcha()
    },
    mounted () {
        let _self = this
        document.addEventListener('keyup', _self.keyupLogin)
    },
    destroyed () {
        document.removeEventListener('keyup', this.keyupLogin)
    },
    methods: {
        /**
         * 登录
         * **/
        login (formName) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    api.login(_self.formData).then((res) => {
                        if (res.code === 200) {
                            // 存储企业登录信息
                            util.setCache('company_info', res.data, 'local')
                            _self.getDictItem(res.data.jump)
                        } else {
                            _self.$message.error({
                                message: res.msg
                            })
                        }
                    })
                }
            })
        },

        keyupLogin (e) {
            let _self = this
            if (e.keyCode === 13) {
                _self.login('formLogin')
            }
        },

        // 改变重置
        emailChange () {
            this.successEmail = false
        },

        // 企业注册
        register () {
            this.$router.push({ path: '/protocols' })
        },

        // 忘记密码
        forgetPassword () {
            this.$router.push({ path: '/protocols' })
        },

        getDictItem (jump) {
            let _self = this
            api.getDictitem().then((res) => {
                if (res.code === 200) {
                    util.setCache('dictItem', res.data, 'local')
                    util.setCache('access_authority', JSON.stringify(jump), 'local')

                    if (jump === 1) { // 入驻资料
                        _self.$router.push({ path: '/affiliate_message' })
                    } else if (jump === 2) { // 审核中
                        _self.$store.dispatch('common/auditType', { getAuditType: 1 })
                        _self.$router.push({ path: '/audit_inquiries/2' })
                    } else if (jump === 3) { // 审核驳回
                        _self.$store.dispatch('common/auditType', { getAuditType: 1 })
                        _self.$router.push({ path: '/audit_inquiries/3' })
                    } else if (jump === 4) { // 个人中心
                        _self.$store.dispatch('common/auditType', { getAuditType: 4 })
                        _self.$router.push({ path: '/personal' })
                    }
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        },

        // 获取验证码
        getCaptcha () {
            let _self = this
            api.getCaptchaImg({ type: 0 }).then((res) => {
                console.log(res)
                if (res.code === 200) {
                    _self.captchaImg = res.data.url
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        }

    }
}
</script>
