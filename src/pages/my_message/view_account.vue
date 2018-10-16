<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="nav">
            <div class="nav">
                <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
            </div>
        </div>
        <ul class="top">
            <h3>账户信息</h3>
            <span v-if="status == 1">添加日期:</span>
            <span v-if="status == 2">提交日期:</span>
            <span v-if="status == 3">通过日期:</span>
            <span style="margin-left: 5px">{{ formData.created_at }}</span>
            <div class="statue-ing" v-if="status == 2"></div>
            <div class="statue-pass" v-if="status == 3"></div>
        </ul>
        <div :class="[prfClass + '-content']">
            <ul class="table-ul">
                <li>
                    <h4>银行账户信息</h4>
                    <div class="bottom">
                        <ul>
                            <li>
                                <div><span class="red">*</span>账户名</div>
                                <div>{{ formData.name }}</div>
                                <div><span class="red">*</span>收款账户</div>
                                <div>{{ formData.number }}</div>
                            </li>
                            <li>
                                <div><span class="red">*</span>账户币种</div>
                                <div>{{ currency_type(formData.currency) }}</div>
                                <div><span class="red">*</span>账户性质</div>
                                <div>{{ property_type(formData.property) }}</div>
                            </li>
                            <li>
                                <div>Swiftcode</div>
                                <div><span v-show="formData.currency == 2">{{ formData.swiftcode }}</span></div>
                                <div>收款公司地址</div>
                                <div><span v-show="formData.currency == 2">{{ formData.company_addr }}</span></div>
                            </li>
                            <li>
                                <div>开户银行</div>
                                <div class="colDiv">
                                    <p>总行：{{ formData.bank_created }}</p>
                                    <p v-show="formData.currency == 1">支行：{{ formData.sub_bank_created }}</p>
                                </div>
                                <div>开户行地址</div>
                                <div class="colDiv">
                                    <p v-show="formData.currency == 2">国家：{{ bank_country(formData.bank_country) }}</p>
                                    <p v-show="formData.currency == 2">地址：{{ formData.bank_addr }}</p>
                                </div>
                            </li>
                            <li>
                                <div><span class="red">*</span>手续费承担方式</div>
                                <div>{{ handling_fee_method(formData.handling_fee_method) }}</div>
                                <div><span class="red">*</span>是否委托收款</div>
                                <div>{{ is_entrusted(formData.is_entrusted) }}</div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                   <h4>附件</h4>
                    <div class="bottom">
                        <ul>
                            <li>
                                <div><span class="red">*</span>账户盖章收款附件</div>
                                <div class="attachCls">
                                    <ul v-show="formData.is_entrusted == 2">
                                        <li :key="index" v-for="(item, index) in formData.stamp_receipt_attachment">
                                            <a href="javascript:;"
                                               @click="preview(item)"
                                               :data-url="item.url">
                                                <i class="el-icon-document"></i>
                                                {{ item.origin_name }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div><span class="red">*</span>账户委托收款附件</div>
                                <div class="attachCls">
                                    <ul v-show="formData.is_entrusted == 1">
                                        <li :key="index" v-for="(item, index) in formData.entrusted_receipt_attachment">
                                            <a href="javascript:;"
                                               @click="preview(item)"
                                               :data-url="item.url">
                                                <i class="el-icon-document"></i>
                                                {{ item.origin_name }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div>账户私对私付款说明附件</div>
                                <div class="attachCls">
                                    <ul v-show="formData.property == 3">
                                        <li :key="index" v-for="(item, index) in formData.private_to_private_attachment">
                                            <a href="javascript:;"
                                               @click="preview(item)"
                                               :data-url="item.url">
                                                <i class="el-icon-document"></i>
                                                {{ item.origin_name }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div></div>
                                <div></div>
                            </li>
                        </ul>
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
import BreadCrumb from '../../components/breadcrumb'
import api from '../../api/myMessage'
import util from 'commonVueLib/util/tools'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'viewAccount',
    components: {
        CommonHeader,
        ImagePreview,
        BreadCrumb
    },
    data () {
        return {
            prfClass: 'view-account',
            add_time: '', // 提交时间
            showPreview: false, // 显示图片预览窗口
            srcs: '',
            formData: {
                created_at: '', // 添加时期
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
                company_addr: '', // 收款公司地址
                bank_created: '', // 开户银行
                sub_bank_created: '', // 开户支行
                bank_country: '', // 开户行国家
                bank_addr: '' // 开户行地址
            },
            status: '', // 状态
            breadcrumb_list: [
                {
                    name: '账户信息',
                    url: '/my_message_list'
                },
                {
                    name: '查看账户信息',
                    url: ''
                }
            ]
        }
    },
    mounted () {
        let _self = this
        let id = _self.$route.params.id

        api.getInfoDetail({id: id}).then((res) => {
            if (res.code === 200) {
                _self.formData = res.data
                _self.status = res.data.status
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
    },
    computed: {
        // 账户币种
        currency_type () {
            return function (val) {
                if (val === 1) {
                    return '人民币账户'
                } else if (val === 2) {
                    return '外币账户'
                }
            }
        },
        // 账户性质
        property_type () {
            return function (val) {
                if (val === 1) {
                    return '私对公'
                } else if (val === 2) {
                    return '公对公'
                } else if (val === 3) {
                    return '私对私'
                }
            }
        },
        // 手续费承担方式
        handling_fee_method () {
            return function (val) {
                switch (val) {
                case 1:
                    return '承运方'
                case 2:
                    return '托运方'
                case 3:
                    return '双方共同承担'
                default:
                    break
                }
            }
        },
        // 是否委托收款
        is_entrusted () {
            return function (val) {
                if (val === 1) {
                    return '是'
                } else if (val === 2) {
                    return '否'
                }
            }
        },

        // 国家
        bank_country () {
            return function (val) {
                let data = util.getCache('dictItem', 'local')['country']
                let nameVal = ''
                data.forEach((item, index) => {
                    if (item.country_acronym_two === val) {
                        nameVal = item.name
                        return nameVal
                    }
                })
                return nameVal
            }
        }
    },
    methods: {
        // 返回列表
        back () {
            this.$router.push({ path: '/my_message_list' })
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
        .statue-ing{
            position: absolute;
            right: 70px;
            top: 13px;
            width: 150px;
            height: 50px;
            background: url('../../assets/my_message_status.png') no-repeat 0 -120px;
        }
        .statue-pass{
            position: absolute;
            right: 70px;
            top: 13px;
            width: 150px;
            height: 50px;
            background: url('../../assets/my_message_status.png') no-repeat 0 0px;
        }
        .#{$prfClass}-content{
            width: 900px;
            margin: 0 auto;
            .table-ul>li:first-child{
                padding: 0 72px 0 98px;
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
                                padding: 16px 8px 16px 11px;
                                text-align: left;
                                min-height: 13px;
                                border-right: 1px #EBEEF3 solid;
                                border-bottom: 1px #EBEEF3 solid;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                line-height: 20px;
                                word-break:break-all;
                                word-wrap:break-word;
                            }
                            .colDiv{
                                width: 130px;
                                color: #2F3032;
                                font-size: 14px;
                                padding: 16px 8px 16px 11px;
                                text-align: left;
                                min-height: 13px;
                                border-right: 1px #EBEEF3 solid;
                                border-bottom: 1px #EBEEF3 solid;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-flow: column wrap;
                                line-height: 20px;
                                word-break:break-all;
                                word-wrap:break-word;
                            }
                            p{
                                text-align: center;
                            }
                            div:nth-child(2n){
                                min-width: 216px;
                            }
                            .introduce{
                                min-width: 205px!important;
                                padding: 16px 20px 16px 12px;
                                line-height: 26px;
                            }
                            div:nth-child(2n+1){
                                background-color: #F9FBFE;
                                align-items: center;
                            }
                        }
                    }
                }
                .attachCls {
                    display: flex;
                    justify-content: center;
                    ul {
                        width: 100% !important;
                        border: none;
                    }
                    li{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: none;
                        a{
                            color: #409EFF;
                            text-decoration: underline;
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
        .red{
            color: red;
            padding-right: 2px;
        }
    }
</style>
