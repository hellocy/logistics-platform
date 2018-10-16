<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="top">
            <h3>我的合同</h3>
            <span>状态:<span style="margin-left: 5px">{{ruleForm.status_txt}}</span></span>
        </div>
        <div :class="[prfClass + '-content']">
            <form-data ref="formData"
                       @preview="previewImg"
                       @save="save"
                       :type="type"
                       :formData="ruleForm"></form-data>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import commonHeader from '../../components/commonHeader.vue'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import breadcrumb from '../../components/breadcrumb'
import FormData from './form_data.vue'
import api from '../../api/personal'

export default {
    components: {
        commonHeader,
        FormData,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'contract-edit',
            ruleForm: {
                status_txt: '', // 状态
                type: '', // 合同框架类型
                main_attach: [], // 框架合同附件
                start_at: '', // 合同生效时间
                end_at: '', // 合同截止时间
                remark: '', // 备注
                other_attach: [] // 补充协议
            },
            type: 'add',
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            type_dict: {},
            breadcrumbList: [ // 面包屑
                {
                    name: '我的合同',
                    url: '/contract_list'
                }, {
                    name: '编辑合同',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 获取合同详情
        let id = this.$route.params.id
        let _self = this
        api.contractView({ id: id }).then((res) => {
            if (res.code === 200) {
                _self.ruleForm = res.data.info
                // 处理type
                _self.type_dict = res.data.type_dict
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
        },
        save (data) {
            let _self = this
            let id = _self.$route.params.id
            let jsonData = {
                type: data.type,
                main_attach: data.main_attach,
                start_at: data.start_at,
                end_at: data.end_at,
                remark: data.remark,
                other_attach: data.other_attach
            }

            api.contractEdit(id, jsonData).then((res) => {
                if (res.code === 200) {
                    _self.$router.push({ path: '/contract_list' })
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            }).catch(() => {
                console.log('error')
            })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'contract-edit';
    .#{$prfClass}{
        padding-bottom: 80px;
        .breadcrumb-box{
            margin:10px;
        }
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
