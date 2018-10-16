<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <h3>更改邮箱</h3>
            <div :class="[prfClass + '-form']">
                <el-form :model="formData" :rules="rules" ref="formLogin">
                    <el-form-item class="yzForm" prop="captcha_one">
                        <div class="label-name"><i class="text-start">*</i>旧邮箱验证码</div>
                        <el-input v-model="formData.captcha_one" placeholder="请输入验证码"></el-input>
                        <el-button plain class="getYz" v-if="!hasTime" >{{ timeVal }}s</el-button>
                        <el-button plain class="getYz" v-if="hasTime" @click="getVerificationCode('old')">
                            {{ getVerName }}
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="email">
                        <div class="label-name"><i class="text-start">*</i>新邮箱</div>
                        <el-input v-model="formData.email" placeholder="请输入新的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item class="yzForm" prop="captcha_two">
                        <div class="label-name"><i class="text-start">*</i>新邮箱验证码</div>
                        <el-input v-model="formData.captcha_two" placeholder="请输入验证码"></el-input>
                        <el-button plain class="getYz" v-if="!newHasTime" >{{ timeNewVal }}s</el-button>
                        <el-button plain class="getYz" v-if="newHasTime" @click="getVerificationCode('new')">
                            {{ getNewVerName }}
                        </el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <div class="label-name"><i class="text-start">*</i>密码</div>
                        <el-input type="password" v-model="formData.password" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirm('formLogin')">更改邮箱</el-button>
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
    name: 'alter_email',
    components: {
        CommonHeader
    },
    data () {
        return {
            prfClass: 'alter_email',
            formData: {
                captcha_one: '', // 旧邮箱验证码
                captcha_two: '', // 新邮箱验证码
                email: '', // 新邮箱
                password: '' // 新密码
            },
            hasTime: true, // 时间倒计时
            newHasTime: true,
            timeVal: 60,
            timeNewVal: 60,
            getVerName: '获取验证码',
            getNewVerName: '获取验证码',
            rules: {
                captcha_one: [
                    { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: ['blur'] }
                ],
                captcha_two: [
                    { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在6-30个字符', trigger: 'blur' }
                ]
            }
        }
    },
    destroyed () {
        let _self = this
        clearInterval(_self.timeout) // 销毁倒计时
        clearInterval(_self.timeoutNew)
    },
    methods: {
        /***
         * 获取验证码
         * **/
        getVerificationCode (type) {
            let _self = this
            if (type === 'old') {
                api.getVerCode().then((res) => {
                    if (res.code === 200) {
                        _self.timeVal = 60
                        _self.hasTime = false
                        _self.timeDown(_self.timeVal, type) // 时间倒计时

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
            } else {
                if (_self.formData.email === '') {
                    _self.$message.error({
                        message: '新邮箱不能为空!'
                    })
                    return
                }
                api.getNewVerCode({ email: _self.formData.email, type: 1 }).then((res) => {
                    if (res.code === 200) {
                        _self.timeNewVal = 60
                        _self.newHasTime = false
                        _self.timeDown(_self.timeNewVal, type) // 时间倒计时

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
        },

        // 时间倒计时
        timeDown (time, type) {
            let _self = this
            if (type === 'old') {
                _self.timeout = setInterval(() => {
                    time -= 1
                    _self.timeVal = time
                    if (time <= 0) {
                        _self.getVerName = '重新获取'
                        _self.hasTime = true
                        clearInterval(_self.timeout)
                    }
                }, 1000)
            } else if (type === 'new') {
                _self.timeoutNew = setInterval(() => {
                    time -= 1
                    _self.timeNewVal = time
                    if (time <= 0) {
                        _self.getNewVerName = '重新获取'
                        _self.newHasTime = true
                        clearInterval(_self.timeoutNew)
                    }
                }, 1000)
            }
        },

        /**
         * 修改邮箱
         * */
        confirm (formName) {
            let _this = this
            _this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    api.editEmail(_this.formData).then((res) => {
                        if (res.code === 200) {
                            _this.$router.push({
                                path: '/alter_success',
                                name: 'alter_success',
                                params: {
                                    title: '更改邮箱',
                                    msg: '登录邮箱更改成功，请用新邮箱重新登录'
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
            this.$router.push({
                path: '/personal'
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'alter_email';
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
