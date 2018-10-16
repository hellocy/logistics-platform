<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <h3>更改密码</h3>
            <div :class="[prfClass + '-form']">
                <el-form :model="formData" :rules="rules" ref="formLogin">
                    <el-form-item class="yzForm" prop="captcha">
                        <div class="label-name"><i class="text-start">*</i>邮箱验证码</div>
                        <el-input v-model="formData.captcha" placeholder="请输入验证码"></el-input>
                        <el-button plain class="getYz" v-if="!hasTime" >{{ timeVal }}s</el-button>
                        <el-button plain class="getYz" v-if="hasTime" @click="getVerificationCode()">
                            {{ getVerName }}
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="password_old">
                        <div class="label-name"><i class="text-start">*</i>旧密码</div>
                        <el-input type="password" v-model="formData.password_old" placeholder="请设置旧登录密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password_new">
                        <div class="label-name"><i class="text-start">*</i>新密码</div>
                        <el-input type="password" v-model="formData.password_new" placeholder="请设置新登录密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <div class="label-name"><i class="text-start">*</i>确认新密码</div>
                        <el-input type="password" v-model="formData.confirmPassword" placeholder="确认新登录密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirm('formLogin')">修改密码</el-button>
                        <div class="abort-alter" @click="abortAlter">放弃修改</div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/personal'

export default {
    name: 'alter_pwd',
    components: {
        CommonHeader
    },
    data () {
        let _self = this
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (_self.formData.confirmPassword !== '') {
                    _self.$refs.formLogin.validateField('confirmPassword')
                }
                callback()
            }
        }
        let validateSureLoginPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== _self.formData.password_new) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            prfClass: 'alter_pwd',
            formData: {
                captcha: '',
                password_old: '',
                password_new: '',
                confirmPassword: ''
            },
            hasTime: true, // 时间倒计时
            timeVal: 60,
            getVerName: '获取验证码',
            rules: {
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password_old: [
                    { required: true, message: '请输入旧登录密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' }
                ],
                password_new: [
                    { required: true, message: '请输入新登录密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' },
                    { validator: validatePassword, trigger: ['blur', 'change'] }
                ],
                confirmPassword: [
                    { required: true, message: '请确认新登录密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' },
                    { validator: validateSureLoginPassword, trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    destroyed () {
        let _self = this
        clearInterval(_self.timeout) // 销毁倒计时
    },
    methods: {
        /***
         * 获取验证码
         * **/
        getVerificationCode () {
            let _self = this
            api.getVerCode().then((res) => {
                if (res.code === 200) {
                    _self.timeVal = 60
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
        },

        // 时间倒计时
        timeDown (time) {
            let _self = this
            _self.timeout = setInterval(() => {
                time -= 1
                _self.timeVal = time
                if (time <= 0) {
                    _self.getVerName = '重新获取'
                    _self.hasTime = true
                    clearInterval(_self.timeout)
                }
            }, 1000)
        },
        /**
         * 修改密码
         * */
        confirm (formName) {
            let _this = this
            _this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    delete _this.formData.confirmPassword
                    api.editPass(_this.formData).then((res) => {
                        if (res.code === 200) {
                            _this.$router.push({
                                path: '/alter_success',
                                name: 'alter_success',
                                params: {
                                    title: '更改密码',
                                    msg: '登录密码修改成功，请用新密码重新登录'
                                }
                            })
                        } else {
                            _this.$message.error({
                                message: res.msg
                            })
                        }
                    })
                }
            })
        },
        /**
         * 放弃修改
         * */
        abortAlter () {
            this.$router.push({path: '/personal'})
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'alter_pwd';
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
        .abort-alter{
            display: inline-block;
            font-weight:400;
            text-decoration:underline;
            color:rgba(66,158,253,1);
            line-height:36px;
            margin-left: 8px;
            cursor: pointer;
        }
        .text-start {
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
