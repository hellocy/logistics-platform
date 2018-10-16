<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <div class="title">
                <h2>我的合同</h2>
                <h5>提交日期：{{formData.updated_at}}</h5>
            </div>
            <div :class="[prfClass + '-form']">
                <div class="top">
                    <h2><span>合同框架类型：{{formData.type_txt}}</span>
                        框架合同附件名称：
                        <a href="javascript:;"
                            @click="preview(formData.main_attach[0], 'main_attach')"
                            :data-url="formData.main_attach[0] ? formData.main_attach[0].url : ''" class="main_attach">
                            <i class="el-icon-document"></i>
                            {{formData.main_attach[0] ? formData.main_attach[0].origin_name : ''}}
                        </a>
                    </h2>
                    <div class="supplemental_agreement">
                        <em class="left">补充协议操作：</em>
                        <ul class="right" v-if="formData.diff.length !== 0">
                            <li v-for="(item, index) in formData.diff" :key="index">
                                {{ item.type_txt }}
                                <span class="channel_name">{{ item.attach.channel_name }}</span>
                                <a href="javascript:;"
                                    v-if="item.attach.origin_name != ''"
                                    @click="preview(item)"
                                    :data-url="item.attach.url" class="main_attach">
                                    - <i class="el-icon-document"></i>
                                    {{ item.attach.origin_name }}
                                </a>
                            </li>
                        </ul>
                        <ul v-else>
                            <li>无</li>
                        </ul>
                    </div>
                    <h2 v-if="formData.status === 4">您提交的合同信息资料审核被驳回，具体驳回原因如下：</h2>
                    <p v-html='formData.remark' v-if="formData.status === 4" style="word-break: break-all;"></p>
                    <div class="tit" v-if="formData.status === 2">我司已接收资料， 审核结果将在一个工作日内邮件通知到您</div>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="submit_again()" v-if="formData.status === 4">重新提交</el-button>
                    <el-button type="primary" @click="continueAdd()" v-if="formData.status === 2">继续新增</el-button>
                    <a class="link-back" @click="back()">返回列表</a>
                </div>
                <div :class="['status', {'reject': formData.status === 4}]"></div>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/personal'
import breadcrumb from '../../components/breadcrumb'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'contract_reject',
    components: {
        CommonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'contract_reject',
            showPreview: false, // 显示图片预览窗口
            srcs: '',
            formData: {
                status: 2, // 合同状态 4 代表驳回 2代表审核中
                update_at: '', // 提交日期
                submit_date: '2018-08-21', // 提交日期
                type_txt: '', // 合同框架类型
                main_attach: '', // 合同附件名称
                diff: [], // 补充协议操作
                remark: '' // 驳回原因
            },
            breadcrumbList: [ // 面包屑
                {
                    name: '我的合同',
                    url: '/contract_list'
                }, {
                    name: '查看',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        let _self = this
        api.auditContract(this.$route.params.id).then(function (res) { // 获取渠道名称
            if (res.code === 200) {
                _self.formData = res.data
                if (_self.formData.status === 3) { // 审核通过 跳到详情页
                    _self.$router.push({ path: '/contract_view/' + _self.$route.params.id })
                }
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
        })
    },
    methods: {
        submit_again () { // 重新提交 跳转到编辑页面
            let _self = this
            _self.$router.push({ path: '/contract_edit/' + _self.$route.params.id })
        },
        continueAdd () { // 继续新增
            this.$router.push({ path: '/contract_add' })
        },
        back () { // 返回按钮
            this.$router.push({ path: '/contract_list' })
        },
        // 预览图片
        preview (item, name) {
            let _self = this
            // 文件格式
            let oName = ''
            if (name === 'main_attach') {
                oName = item.origin_name
            } else {
                oName = item.attach.origin_name
            }
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                if (name === 'main_attach') {
                    window.open(item.url)
                } else {
                    window.open(item.attach.url)
                }
            } else { // 图片
                _self.showPreview = true
                if (name === 'main_attach') {
                    _self.srcs = item.url
                } else {
                    _self.srcs = item.attach.url
                }
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'contract_reject';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
        .title{
            margin: 34px 0 21px;
            color: #429EFD;
            text-align: center;
            h2,.supplemental_agreement{
                font-size: 28px;
                margin-bottom: 10px;
            }
            h5{
                font-size: 12px;
            }
        }
        .#{$prfClass}-form{
            width: 900px;
            margin: 0 auto 120px;
            background-color: #fff;
            height: auto;
            padding: 40px 0;
            position: relative;
            text-align: center;
            .top{
                padding-left: 125px;
                text-align: left;
            }
            .channel_name{
                padding-left: 4px;
            }
            h2{
                color: #8F9298;
                font-size: 14px;
                margin-bottom: 15px;
                word-break:break-all;
                span{
                    margin-right: 26px;
                }
                a{
                    color: #429EFD
                }
            }
            p{
                font-size: 14px;
                color: #2F3032;
                margin: 35px 0;
                line-height: 34px;
                a{
                    color: #429EFD
                }
            }
            .supplemental_agreement{
                color: #8F9298;
                margin-bottom: 15px;
                li{
                    word-break: break-all;
                }
                .left{
                    float: left;
                }
                .right{
                    margin-left: 99px;
                    margin-bottom: 15px;
                    li{
                        margin-bottom: 7px;
                        a{
                            color: #429EFD;
                            margin-left: 2px;
                        }
                    }
                }
            }
            .tit{
                margin-bottom: 40px;
                margin-top: 26px;
            }
            .footer{
                margin: 0 auto;
                text-align: left;
                padding-left: 283px;
                button {
                    width: 160px;
                    height: 44px;
                }
                a{
                    color: #429EFD;
                    text-decoration: underline;
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
            .status{
                width: 151px;
                height: 50px;
                display: inline-block;
                background: url("../../assets/my_message_status.png");
                background-position: 0px 50px;
                position: absolute;
                top: -34px;
                right: 75px;
                transform: rotate(20deg);
            }
            .reject{
                width: 159px;
                height: 92px;
                background: url("../../assets/contract_reject.png");
                top: -52px;
                right: 75px;
                transform: rotate(0deg);
            }
        }
    }
</style>
