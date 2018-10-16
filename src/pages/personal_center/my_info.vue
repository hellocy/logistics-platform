<template>
    <div :class="prfClass">
        <div class="top">
            <div class="left"><i class="icon"></i>我的信息</div>
            <div :class="statusCls" @click="companyInfo">{{ statusType }}</div>
        </div>
        <div class="wrap">
            <div class="left">
                <img class="logo" src="../../assets/user_img.png">
            </div>
            <div class="right">
                <div class="cn" :title="myInfo.compony_cn">{{ myInfo.compony_cn }}</div>
                <div class="en" :title="myInfo.compony_en">{{ myInfo.compony_en }}</div>
                <div class="edit">
                    <!--<a href="javascript:;" class="email" @click="toAlterEmail">更改邮箱</a>-->
                    <a href="javascript:;" class="password" @click="toAlterPassword">更改密码</a>
                </div>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" class="gs-info" @click="companyInfo"><img class="icon" src="../../assets/icon_5.png" />公司资料</el-button>
            <el-button type="primary" class="zf-info" @click="accountInfo"><img class="icon" src="../../assets/icon_4.png" />账户信息</el-button>
            <el-button type="primary" class="ht-info" @click="myContract"><img class="icon" src="../../assets/icon_6.png" />我的合同</el-button>
        </div>
    </div>
</template>

<script>
import util from 'commonVueLib/util/tools'
export default {
    name: 'my_info',
    data () {
        return {
            prfClass: 'my-info-wrap'
        }
    },
    props: {
        myInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        statusType () {
            let statue = this.myInfo.statue * 1
            let val = util.getCache('dictItem', 'local')['logistics_status'][statue]
            return val
        },
        statusCls () {
            let statue = this.myInfo.statue * 1
            return {
                'right sqCls': statue === 0,
                'right notPass': statue === 1,
                'right isWait': statue === 2,
                'right isPass': statue === 3,
                'right isEdit': statue === 4
            }
        }
    },
    mounted () {
    },
    methods: {
        toAlterPassword () {
            this.$router.push({path: '/alter_pwd'})
        },
        toAlterEmail () {
            this.$router.push({path: '/alter_email'})
        },
        // 账户信息
        accountInfo () {
            this.$router.push({path: '/my_message_list'})
        },
        // 公司资料
        companyInfo () {
            this.$router.push({path: '/compony_info'})
        },
        // 我的合同
        myContract () {
            this.$router.push({path: '/contract_list'})
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'my-info-wrap';
    .#{$prfClass} {
        display: flex;
        width: 100%;
        flex-flow: wrap column;
        .top{
            display: flex;
            padding: 17px 0px;
            flex-flow: wrap row;
            border-bottom: 1px solid #EBEEF5;
            .left{
                margin-left: 19px;
                display: flex;
                height: 14px;
                line-height: 14px;
                margin-top: 3px;
            }
            .icon {
                width: 2px;
                background:rgba(66,158,253,1);
                border: 1px solid #429EFD;
                margin-right: 9px;
            }
            .right{
                vertical-align: middle;
                margin-left: 12px;
                padding: 0px 15px;
                line-height: 18px;
                height:20px;
                border-radius:10px;
                font-size:12px;
                color: #fff;
                cursor: pointer;
            }
            .notPass{
                background:#E5A13E;
            }
            .sqCls{
                background:rgba(244,107,107,1);
            }
            .isPass{
                background:#65C13E;
            }
            .isEdit{
                background:#cccccc;
            }
            .isWait{
                background:#F46B6B;
            }
        }
        .wrap{
            display: flex;
            margin-top: 20px;
            .left{
                display: flex;
                margin-left: 19px;
                margin-right: 9px;
                img{
                    width: 42px;
                    height: 36px;
                }
            }
            .right{
                display: flex;
                flex-flow: wrap column;
            }
            .cn {
                font-family:MicrosoftYaHei;
                color: #2F3032;
                font-size:16px;
                font-weight:bold;
                margin-bottom: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 330px;
            }
            .en {
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                margin-bottom: 9px;
                color:rgba(96,98,102,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 330px;
                line-height: 22px;
            }
            .email, .password{
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                text-decoration:underline;
                color:rgba(66,158,253,1);
            }
            .password{
                /*margin-left: 20px;*/
            }
        }
        .btn{
            display: flex;
            padding: 20px 0px 20px 20px;
            .gs-info, .zf-info, .ht-info{
                padding: 8px 11px;
                .icon{
                    vertical-align: middle;
                    padding-right: 9px;
                }
            }
        }
    }
</style>
