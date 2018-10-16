<template>
    <div :class="[prfClass + '-header']">
        <div class="left">
            <a href="javascript:;" @click="logo" class="logo" title="">
                <!--<img src="../assets/lmp_logo.jpg" alt="">-->
            </a>
            <el-menu :default-active="$route.path"
                     router
                     text-color="#2f3034"
                     class="el-menu-demo" mode="horizontal">
                <el-menu-item :index="'/home'">首页</el-menu-item>
                <!--<div class="nav-wrap" >-->
                <!--</div>-->
                <el-menu-item v-show="is_user_success" :index="'/personal'"><a href="javascript:;" @click="personFn">个人中心</a></el-menu-item>
                <el-submenu v-show="is_user_success"
                            :show-timeout="timeout"
                            :hide-timeout="timeout" :default-active="$route.path" :index="'/compony_info'">
                    <template slot="title">我的信息</template>
                    <el-menu-item :index="'/compony_info'">公司资料</el-menu-item>
                    <el-menu-item :index="'/my_message_list'">账户信息</el-menu-item>
                    <el-menu-item :index="'/contract_list'">我的合同</el-menu-item>
                </el-submenu>
                <el-submenu
                    :show-timeout="timeout"
                    :hide-timeout="timeout"
                    v-show="is_user_success" :index="'/channel_list'">
                    <template slot="title">我的渠道</template>
                    <el-menu-item :index="'/channel_list'">渠道管理</el-menu-item>
                    <el-menu-item :index="'/cash_collection_info_list'">收款信息</el-menu-item>
                    <el-menu-item :index="'/price_partition'">报价&分区信息</el-menu-item>
                </el-submenu>
                <el-menu-item :index="'/contact_us'">联系我们</el-menu-item>
            </el-menu>
        </div>
        <div class="right">
            <div class="user-before" v-show="!is_user_success">
                <a href="javascript:;"
                   class="register"
                   @click="register"
                   title="用户注册">注册</a>
                <i>/</i>
                <a href="javascript:;"
                   @click="login" class="login" title="">登录</a>
            </div>
            <!--登录成功-->
            <div class="user-success" v-show="is_user_success">
                <div class="user-info" @click="personFn()">
                    <img src="../assets/user_img.png" v-show="!isHasUserImage" alt="" />
                    <img :src="userImage" v-show="isHasUserImage" alt="" />
                    <span class="name">{{ username }}</span>
                </div>
                <div class="logOut" @click="logOut">注销登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api/api'
import util from 'commonVueLib/util/tools'

export default {
    name: 'commonHeader',
    data () {
        return {
            prfClass: 'lmp',
            username: '',
            userImage: '',
            is_user_success: false, // 是否登录成功
            isHasUserImage: false,
            timeout: 50
        }
    },
    props: {
        active_index: {
            type: [String, Number],
            default () {
                return '1'
            }
        }
    },
    mounted () {
        // 根据存储企业信息，判断是否登录
        if (util.getCache('company_info', 'local') != null) {
            let data = util.getCache('company_info', 'local')
            this.is_user_success = true
            this.username = data.email
        }
    },
    methods: {
        /**
         * logo
         * **/
        logo () {
            this.$router.push({ path: '/home' })
        },
        // 联系我们
        contactUs () {
            this.$router.push({ path: '/contact_us' })
        },
        /**
         * login 登录
         * */
        login () {
            this.$router.push({ path: '/login' })
        },

        /**
         * register 跳转到协议页面
         * **/
        register () {
            this.$router.push({ path: '/protocols' })
        },

        // 登录成功后跳转到个人中心
        personFn () {
            this.$router.push({ path: '/personal' })
        },

        // 首页
        home () {
            this.$router.push({ path: '/home' })
        },
        // 注销登录
        logOut () {
            let _self = this
            api.logOut().then((res) => {
                if (res.code === 200) {
                    util.removeCache('company_info', 'local') // 删除企业信息
                    util.removeCache('dictItem', 'local')
                    util.removeCache('lmp_All_info')
                    util.removeCache('editMessage')
                    util.removeCache('access_authority', 'local') // 删除访问权限判断
                    _self.is_user_success = false

                    _self.$router.push({ path: '/login' }) // 返回首页
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        // 切换
        handleSelect (key) {
            this.activeIndex = key
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'lmp';

    .#{$prfClass}-header{
        margin: 0 auto;
        min-width: 1024px;
        position: relative;
        height: 70px;
        line-height: 70px;
        background-color: #fff;
        .left{
            position: absolute;
            left: 0;
            top: 0;
            width: 65%;
            display: flex;
            flex-flow: row nowrap;
            .logo{
                text-decoration: none;
                font-size: 16px;
                width: 244px;
                height: 32px;
                margin: 18px 0px 0px 24px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .el-menu--horizontal{
                display: flex;
                margin-left: 30px;
                font-size: 16px;
                border-bottom: none;
                .el-menu-item{
                    display: flex;
                    flex-wrap: nowrap;
                    padding: 0px 20px;
                    height: 70px;
                    line-height: 70px;
                    font-size: 16px;
                    color: #2f3032;
                }
                .el-submenu .el-submenu__title{
                    height: 70px;
                    font-size: 16px;
                    line-height: 70px;
                }
            }
        }
        .right{
            position: absolute;
            right: 40px;
            top: 0;
            a{
                color: #303133;
                font-size: 14px;
                font-family:MicrosoftYaHei;
            }
            .user-success{
                display: flex;
                .logOut{
                    cursor: pointer;
                    color:#429EFD;
                }
            }
            .user-info {
                cursor: pointer;
                img {
                    border-radius: 50%;
                    width: 42px;
                    height: 36px;
                    vertical-align: middle;
                }
                .name {
                    color:#2f3034;
                    margin: 0px 36px 0px 4px;
                }
            }
        }
    }
    .el-menu--popup-bottom-start{
        margin-top: 0
    }
    .el-menu--horizontal .el-menu .el-menu-item.is-active{
        color: #409EFF !important;
    }
</style>
