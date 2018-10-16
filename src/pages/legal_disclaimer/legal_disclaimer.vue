<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
                <section class="breadcrumb-box">
                    <breadcrumb :breadcrumb_list="breadcrumbList" :type="typeNumber"></breadcrumb>
                </section>
            </section>
        <div :class="[prfClass + '-wrap']">
            <div class="main-content-box">
                <div class="main-content">
                    <h2>法律申明</h2>
                    <div class="part_one">
                        在法律允许的范围内，本网站不承担任何明示或默示的担保。我们不保证本网站，服务器或发送的电子邮件没有病毒或其他有害内容。因使用本网站而导致的任何形式的损害，包括但不限于直接、间接、附带、惩罚性和从属损害，本网站所有者及关联公司不承担任何赔偿责任。
                    </div>
                    <div class="part_one">
                        某些适用的法律不允许对某些暗示担保加以限制或对某些特定损害加以排除。如果这些法律适用于您，上述的免责、排除或限制可能不适用于您，并且您可能享有其他权利。
                    </div>
                    <ul class="address">
                        <li>如果您有任何法律上的投诉，请直接发送给法务部门</li>
                        <li>我司法务部电子邮件地址：<a href="mailto:Supply-CS@lida-logistics.com">Supply-CS@lida-logistics.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import breadcrumb from '../../components/breadcrumb'

export default {
    name: 'privacy_policy',
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'privacy-policy',
            breadcrumbList: [ // 面包屑
                {
                    name: '首页',
                    url: '/'
                },
                {
                    name: '隐私政策',
                    url: ''
                }
            ],
            typeNumber: 1 // 面包屑是第一级否是首页 传值的话是首页 不传默认是个人中心
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'privacy-policy';
    .#{$prfClass}{
        .breadcrumb-box{
            margin: 10px 9px;
        }
        .#{$prfClass}-wrap{
            text-align: center;
            .main-content-box{
                background: #fff;
                margin: 0 25px;
                line-height: 28px;
                font-size: 14px;
                color: #2F3032;
                margin-bottom: 60px;
                text-align: left;
                .main-content{
                    width: 1040px;
                    margin: 0 auto;
                    padding: 0 80px 60px;
                }
                .part_one{
                    margin-bottom: 20px;
                    a{
                        color: #429EFD;
                    }
                }
                h2{
                    color: #429EFD;
                    padding: 60px 0;
                    font-weight: bold;
                    font-size: 28px;
                    text-align: center;
                }
                .address{
                    li{
                        line-height: 28px;
                        a{
                            color: #429EFD;
                        }
                    }
                }
            }
        }
    }
</style>
