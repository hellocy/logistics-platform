<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <div :class="[prfClass + '-form']">
                <h3>渠道申请资料</h3>
                <p class="application-status">状态：<span>选择业务类型</span></p>
                <section class="main-content">
                    <div class="left"><span class="red">*</span>请选择业务类型</div>
                    <el-button type="primary" @click='B2B()'>B2B</el-button>
                    <el-button type="primary" @click='B2C()'>B2C</el-button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import breadcrumb from '../../components/breadcrumb'

export default {
    name: 'channel_data_select',
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-select-info',
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '渠道申请资料',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
    },
    methods: {
        B2B () { // 跳到B2b模块
            /****
             * params id  0: 代表新增
             * params type 编辑或查看, 默认为edit，查看代表不显示按钮
             * params modeType 代表b2b b2c 类型
             * *****/
            let paths = '/channel_application_data/' + '0/edit/B2B'
            this.$router.push({ path: paths })
        },
        B2C () { // 跳到B2C模块
            let paths = '/channel_application_data/' + '0/edit/B2C'
            this.$router.push({ path: paths })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-select-info';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
    }
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 20px;
        height: auto;
        padding-bottom: 58px;
        font-family: Microsoft YaHei;
        h3{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            padding-top: 20px;
            margin-bottom: 20px;
            font-size: 28px;
            color: #429EFD;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            flex-wrap: wrap;
        }
        .application-status{
            text-align:center;
            font-size:14px;
            font-weight:400;
            margin-bottom: 30px;
        }
        .main-content{
            background-color: #fff;
            width:700px;
            margin:auto;
            padding:60px 82px;
            text-align: center;
            .left{
                display: inline-block;
                margin-right: 8px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:#2F3032;
            }
            .red{
                color:red;
            }
            .el-button{
                width:200px;
                height:80px;
                line-height: 80px;
                padding: 0;
                font-size: 28px;
                background-color: transparent;
                color: #409EFF !important;
                &:hover{
                    background-color:  #409EFF;
                    color: #fff !important;
                }
            }
        }
    }
</style>
