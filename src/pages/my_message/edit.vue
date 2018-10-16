<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="nav">
            <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
        </div>

        <div class="top">
            <h3>账户信息</h3>
            <span>状态:<span style="margin-left: 5px">编辑/修改</span></span>
        </div>
        <div :class="[prfClass + '-content']">
            <form-data ref="formData"
                       @preview="previewImg"
                       :backType="back_type"
                       :editType="edit_type"
                       :formId="edit_id"
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
import api from '../../api/myMessage'
import FormData from './form_data.vue'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    components: {
        commonHeader,
        FormData,
        ImagePreview,
        BreadCrumb
    },
    data () {
        return {
            prfClass: 'edit-account',
            ruleForm: {
                info_id: '', // 收款信息id
                name: '', // 账户名
                number: '', // 收款账户
                currency: '', // 账户币种
                property: '', // 账户性质
                handling_fee_method: '', // 手续费承担方式
                is_entrusted: '', // 是否委托收款
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
            type: 'edit',
            edit_id: '',
            edit_type: '',
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            back_type: '',
            breadcrumb_list: [
                {
                    name: '账户信息',
                    url: '/my_message_list'
                },
                {
                    name: '修改账户信息',
                    url: ''
                }
            ]
        }
    },
    created () {
        let _self = this
        let id = _self.$route.params.id
        let _type = _self.$route.params.type // 其它页面进入
        let _infoId = _self.$route.params.info_id // 其它页面进入

        _self.edit_id = id
        _self.back_type = _type
        _self.edit_type = _infoId

        if (_infoId !== '__new__') {
            _self.ruleForm.info_id = _infoId
        }

        api.getInfoDetail({id: id}).then((res) => {
            if (res.code === 200) {
                _self.ruleForm = res.data
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
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
    $prfClass: 'edit-account';
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
