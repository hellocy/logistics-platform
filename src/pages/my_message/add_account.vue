<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="nav">
            <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
        </div>

        <div class="top">
            <h3>账户信息</h3>
            <span>状态:<span style="margin-left: 5px">添加</span></span>
        </div>
        <div :class="[prfClass + '-content']">
            <form-data ref="formData"
                       @preview="previewImg"
                       :backType="id"
                       :editType="edit_type"
                       :formType="type"
                       :formData="ruleForm"></form-data>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import BreadCrumb from '../../components/breadcrumb'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import FormData from './form_data.vue'

export default {
    components: {
        commonHeader,
        FormData,
        ImagePreview,
        BreadCrumb
    },
    data () {
        return {
            prfClass: 'add-account',
            ruleForm: {
                info_id: '', // 收款信息id
                name: '', // 账户名
                number: '', // 收款账户
                currency: 1, // 账户币种
                property: 2, // 账户性质
                handling_fee_method: '', // 手续费承担方式
                is_entrusted: 2, // 是否委托收款, 默认为否
                stamp_receipt_attachment: [], // 账户盖章收款附件
                entrusted_receipt_attachment: [], // 账户委托收款附件
                private_to_private_attachment: [], // 私对私付款说明附件
                swiftcode: '',
                receipt_company_addr: '', // 收款公司地址
                bank_created: '', // 开户银行
                sub_bank_created: '', // 开户支行
                bank_country: '', // 开户行国家
                bank_addr: '' // 开户行地址
            },
            type: 'add',
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            id: '',
            edit_type: '',
            breadcrumb_list: [
                {
                    name: '账户信息',
                    url: '/my_message_list'
                },
                {
                    name: '添加账户信息',
                    url: ''
                }
            ]
        }
    },
    created () {
        this.id = this.$route.params.id
        this.edit_type = this.$route.params.type
    },
    methods: {
        previewImg (data) {
            this.showPreview = data.showPreview
            this.srcs = data.srcs
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'add-account';
    .#{$prfClass}{
        padding-bottom: 80px;
        .nav{
            margin: 12px 0 22px 21px;
            color: #8F9298;
            font-size: 12px;
            i{
                padding:0px 6px;
            }
            .localCls{
                color:#429EFD;
            }
        }
        .top{
            width: 816px;
            margin: 0 auto 10px;
            padding: 0 42px 17px;
            overflow: hidden;
            background-color: #fff;
            h3{
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0 7px;
            }
            span{
                color: #429EFD;
                font-size: 12px;
            }
        }

    }
</style>
