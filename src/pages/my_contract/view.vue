<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <ul class="top">
            <h3>我的合同</h3>
            <span>{{formData.status === 3 ? '通过日期:' : '提交日期:'}}</span>
            <span style="margin-left: 5px">{{ formData.updated_at }}</span>
            <div :class="{'statue-audit': formData.status === 2, 'statue-pass': formData.status === 3}"></div>
        </ul>
        <div :class="[prfClass + '-content']">
            <ul class="table-ul">
                <li>
                    <h4>主合同框架</h4>
                    <div class="bottom">
                        <ul>
                            <li>
                                <div>框架合同类型</div>
                                <div>{{ type_dict[formData.type] }}</div>
                            </li>
                            <li>
                                <div>框架合同附件</div>
                                <div>
                                    <a href="javascript:;"
                                        @click="preview(formData.main_attach[0], 'main_attach')"
                                        :data-url="formData.main_attach[0] ? formData.main_attach[0].url : ''" class="main_attach">
                                        <i class="el-icon-document"></i>
                                        {{formData.main_attach[0] ? formData.main_attach[0].origin_name : ''}}
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div>合同生效时间</div>
                                <div>{{ formData.start_at }}</div>
                            </li>
                            <li>
                                <div>合同截止时间</div>
                                <div>{{ formData.end_at }}</div>
                            </li>
                            <li>
                                <div>备注</div>
                                <div style="word-break: break-all;">{{ formData.remark }}</div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                   <h4>补充协议</h4>
                    <div class="bottom other_attach">
                        <div class="top flex">渠道名称</div><div class="top flex">补充协议附件</div>
                        <div class="attachCls" :key="index" v-for="(item, index) in formData.other_attach">
                            <div class="flex">{{ item.channel_name }}</div>
                            <div class="flex">
                                <a href="javascript:;"
                                   v-if="item.origin_name != ''"
                                    @click="preview(item)"
                                    class="main_attach">
                                    <i class="el-icon-document"></i>
                                    {{ item.origin_name }}
                                </a>
                                <a href="javascript:;"
                                   v-else
                                   class="main_attach">
                                    {{ item.origin_name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="footer">
                <span class="back" @click="back()">返回列表</span>
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
    name: 'viewAccount',
    components: {
        CommonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'view-account',
            add_time: '', // 提交时间
            showPreview: false, // 显示图片预览窗口
            srcs: '',
            type_dict: '', // 框架合同类型转
            formData: {
                status: 3, // 状态 2 审核中 3 审核通过
                updated_at: '', // 通过日期
                type: '', // 框架合同类型
                main_attach: [], // 框架合同附件
                other_attach: [], // 补充协议附件
                start_at: '', // 合同生效时间
                end_at: '', // 合同截止时间
                remark: '' // 备注
            },
            breadcrumbList: [ // 面包屑
                {
                    name: '我的合同',
                    url: '/contract_list'
                }, {
                    name: '查看合同信息',
                    url: ''
                }
            ]
        }
    },
    mounted () {
        let _self = this
        let id = _self.$route.params.id

        api.viewContract(id).then((res) => {
            if (res.code === 200) {
                _self.formData = res.data.info
                _self.type_dict = res.data.type_dict
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
    },
    computed: {
    },
    methods: {
        // 返回列表
        back () {
            this.$router.push({ path: '/contract_list' })
        },
        // 预览图片
        preview (item) {
            let _self = this
            // 文件格式
            let oName = item.origin_name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(item.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = item.url
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'view-account';
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
            font-family:MicrosoftYaHei;
            width: 816px;
            margin: 0 auto 10px;
            padding: 0 42px 17px;
            overflow: hidden;
            background-color: #fff;
            position: relative;
            h3{
                font-size: 16px;
                color: #2F3032;
                font-weight: bold;
                margin: 20px 0 7px;
            }
            span{
                color: #429EFD;
                font-size: 12px;
            }
        }
        .statue-pass{
            position: absolute;
            right: 70px;
            top: 13px;
            width: 150px;
            height: 50px;
            background: url('../../assets/my_message_status.png') no-repeat 0 0px;
        }
        .statue-audit{
            position: absolute;
            right: 70px;
            top: 13px;
            width: 150px;
            height: 50px;
            background: url('../../assets/my_message_status.png') no-repeat 0px -120px;
        }
        .#{$prfClass}-content{
            width: 900px;
            margin: 0 auto;
            .table-ul>li:first-child{
                padding: 0 86px 0 86px;
                margin-bottom: 37px;
            }
            .table-ul>li{
                padding-left:98px;
            }
            .table-ul{
                background-color: #fff;
                padding-top: 37px;
                h4{
                    color: #2F3032;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 22px;
                    padding-left: 9px;
                    border-left: 4px #429EFD solid;
                    margin: 0 0 18px;
                }
                .bottom{
                    padding: 10px 0 0px 0px;
                    margin: 14px 0 0 0px;
                    .main_attach{
                        color: #429EFD;
                    }
                    ul{
                        width: 738px;
                        border: 1px #EBEEF3 solid;
                        border-bottom: none;
                        border-right: none;
                        li{
                            overflow: hidden;
                            display: flex;
                            ul{
                                border: none
                            }
                            div{
                                width: 130px;
                                color: #2F3032;
                                font-size: 14px;
                                padding: 16px 8px 16px 13px;
                                text-align: left;
                                min-height: 13px;
                                border-right: 1px #EBEEF3 solid;
                                border-bottom: 1px #EBEEF3 solid;
                                display: flex;
                                align-items: center;
                                line-height: 20px;
                                word-break:break-all;
                                word-wrap:break-word;
                                &:last-child{
                                    width: 600px;
                                }
                            }
                            p{
                                text-align: center;
                            }
                            div:nth-child(2n){
                                min-width: 216px;
                            }
                            div:nth-child(2n+1){
                                background-color: #F9FBFE;
                                align-items: center;
                            }
                        }
                    }
                }
                .other_attach{
                    border: 1px #DBDEE5 solid;
                    padding-top: 0;
                    width: 725px;
                    border-bottom: none;
                    .top{
                        line-height: 40px !important;
                    }
                    .flex{
                        width: 348px;
                        background-color: #F8F9FA;
                        min-height: 40px;
                        line-height:20px;
                        padding: 0;
                        display: inline-block;
                        border-bottom: 1px #DBDEE5 solid;
                        padding-left: 14px;
                        margin: 0;
                        word-break: break-all;
                        &:first-child{
                            border-right: 1px #DBDEE5 solid
                        }
                    }
                    .attachCls {
                        display: flex;
                        justify-content: center;
                        div{
                            width: 100% !important;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: #fff;
                            a{
                                color: #409EFF;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
            .footer{
                padding: 40px 0 60px 0;
                background-color: #fff;
                text-align: center;
                .save{
                    width: 191px;
                }
                .back{
                    color: #429EFD;
                    font-size: 14px;
                    text-decoration: underline;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
