<style lang="scss">
    $prfClass: 'register';
    .#{$prfClass}-wrap{
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
            height: 420px;
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
            border-radius:5px;
            width:92px;
            padding: 12px 0px;
            height:40px;
            border: 1px solid #429EFD;
            color: #429EFD;
            margin-left: 12px;
        }
        .el-button--primary{
            width: 191px;
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
        .login{
            display: inline-block;
            font-family:MicrosoftYaHei;
            font-weight:400;
            text-decoration:underline;
            color:rgba(66,158,253,1);
            line-height:36px;
            margin-left: 12px;
            cursor: pointer;
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
        .red{
            color: red;
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
            <h3>企业账号注册</h3>
            <div :class="[prfClass + '-form']">
                <el-form :model="formData" :rules="rules" ref="formRegister">
                    <el-form-item class="emailName" prop="email">
                        <div class="label-name"><span class="red">*</span>邮箱</div>
                        <el-input v-model="formData.email" @change="emailChange" placeholder="请输入邮箱"></el-input>
                        <div class="success" v-if="successEmail"><i class="el-icon-check"></i></div>
                    </el-form-item>
                    <el-form-item class="yzForm" prop="captcha">
                        <div class="label-name"><span class="red">*</span>验证码</div>
                        <el-input v-model="formData.captcha" placeholder="请输入验证码"></el-input>
                        <el-button plain class="getYz" v-if="!hasTime" >{{ timeVal }}s</el-button>
                        <el-button plain class="getYz" v-if="hasTime" @click="getVerificationCode">
                            {{ getVerName }}
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <div class="label-name"><span class="red">*</span>设置密码</div>
                        <el-input type="password" v-model="formData.password" placeholder="请设置登录密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="sureLoginPassword">
                        <div class="label-name"><span class="red">*</span>确认密码</div>
                        <el-input type="password" v-model="formData.sureLoginPassword" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register('formRegister')">立即注册</el-button>
                        <div class="login" @click="login">企业登录</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/register'
import util from 'commonVueLib/util/tools'

export default {
    name: 'register',
    components: {
        CommonHeader
    },
    data () {
        let _self = this
        let validateLoginPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (_self.formData.sureLoginPassword !== '') {
                    _self.$refs.formRegister.validateField('sureLoginPassword')
                }
                callback()
            }
        }
        let validateSureLoginPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== _self.formData.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }

        // let validateEmail = (rule, value, callback) => {
        //     let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        //     if (reg.test(_self.formData.email)) {
        //         if (_self.successEmail) {
        //             return callback()
        //         }
        //         api.getVerEmail({ email: _self.formData.email }).then((res) => {
        //             if (res.code === 200) {
        //                 if (res.data.is_exist) {
        //                     _self.successEmail = false
        //                     callback(new Error('邮箱已注册!'))
        //                 } else {
        //                     _self.successEmail = true
        //                     _self.getVerificationCode()
        //                     callback()
        //                 }
        //             } else {
        //                 _self.$alert(res.msg, '提示', {
        //                     confirmButtonText: '确定',
        //                     callback: action => {}
        //                 })
        //             }
        //         })
        //     }
        // }

        return {
            prfClass: 'register',
            formData: {
                email: '',
                captcha: '',
                password: '',
                sureLoginPassword: ''
            },
            successEmail: false,
            successMsg: '',
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur'] }
                    // { validator: validateEmail, trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' },
                    { validator: validateLoginPassword, trigger: ['blur', 'change'] }
                ],
                sureLoginPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' },
                    { validator: validateSureLoginPassword, trigger: ['blur', 'change'] }
                ]
            },
            hasTime: true, // 时间倒计时
            timeVal: '60',
            getVerName: '获取验证码'
        }
    },
    created () {
    },

    destroyed () {
        let _self = this
        clearTimeout(_self.timeout) // 销毁倒计时
    },
    methods: {
        /**
         * 注册
         * **/
        register (formName) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                console.log(valid)
                if (!valid) {
                    return false
                } else {
                    let dataJson = _self.formData
                    api.getRegister(dataJson).then((res) => {
                        if (res.code === 200) {
                            // 存储企业信息
                            util.setCache('company_info', res.data, 'local')
                            _self.getDictItem()
                        } else {
                            _self.$message.error({
                                message: res.msg,
                                center: true
                            })
                        }
                    })
                }
            })
        },
        // 改变重置
        emailChange () {
            this.successEmail = false
        },

        // 获取全局
        getDictItem () {
            let _self = this
            api.getDictitem().then((res) => {
                if (res.code === 200) {
                    util.setCache('dictItem', res.data, 'local')
                    this.$confirm('', '注册成功', {
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: true,
                        center: true,
                        customClass: 'regCls'
                    }).then(() => {
                        _self.$router.push({ path: '/affiliate_message' })
                    }).catch(() => {
                        _self.$router.push({ path: '/affiliate_message' })
                    })
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        },

        /***
         * 获取验证码
         * **/
        getVerificationCode () {
            let _self = this
            if (_self.formData.email === '') {
                _self.$message.error({
                    message: '邮箱不能为空!'
                })
                return
            }

            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (reg.test(_self.formData.email)) {
                api.getVerEmail({ email: _self.formData.email }).then((res) => {
                    if (res.code === 200) {
                        if (res.data.is_exist) {
                            _self.$message.error({
                                message: '邮箱已注册!'
                            })
                        } else {
                            api.getVerCode({ email: _self.formData.email, type: 1 }).then((res) => {
                                if (res.code === 200) {
                                    _self.timeVal = '60'
                                    _self.hasTime = false
                                    _self.timeDown(_self.timeVal) // 时间倒计时

                                    _self.$confirm('验证码已发送至您的邮箱（如长时间未收到验证码请检查垃圾箱，验证码15分钟有效！）', '成功', {
                                        type: 'success',
                                        showCancelButton: false,
                                        showConfirmButton: false,
                                        center: true
                                    }).catch(() => {
                                        console.log('close')
                                    })
                                } else {
                                    _self.$message.error({
                                        message: res.msg
                                    })
                                }
                            })
                        }
                    } else {
                        _self.$alert(res.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        })
                    }
                })
            }
        },

        // 时间倒计时
        timeDown (time) {
            let nowTime = parseInt(time)
            let _self = this
            nowTime -= 1
            _self.timeVal = nowTime
            console.log(nowTime)

            _self.timeout = setTimeout(() => {
                if (nowTime <= 0) {
                    _self.getVerName = '重新获取'
                    _self.hasTime = true
                    clearTimeout(_self.timeout)
                    return false
                }
                _self.timeDown(nowTime)
            }, 1000)
        },

        /**
         * 登录
         * **/
        login () {
            this.$router.push({ path: '/login' })
        }

    }
}
</script>
