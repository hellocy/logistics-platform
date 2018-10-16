<style lang="scss">
    $prfClass: 'affiliate-message';
    .#{$prfClass}{
        padding-bottom: 88px;
        .topCont {
            width: 900px;
            height: 76px;
            background-color: #fff;
            margin: 16px auto 10px;
            h4 {
                font-family:MicrosoftYaHei;
                padding: 19px 0px 8px 54px;
                font-size:16px;
                font-weight:bold;
                color:rgba(47,48,50,1);
            }
            p {
                padding-left: 54px;
                color:rgba(66,158,253,1);
            }
        }
    }
    .#{$prfClass}-content{
        width: 826px;
        padding: 40px 37px 60px;
        background-color: #fff;
        margin:  0 auto;
        .table-ul>li{
            margin-bottom: 10px;
        }
        .table-ul{
            .top{
                position: relative;
                .left{
                    .goon{
                        color: #E5A13E
                    }
                    .not{
                        color: #F46B6B;
                    }
                    .el-icon-success{
                        color: #65C13E;
                        font-size: 38px;
                        vertical-align: top;
                        margin-top: -1px;
                    }
                    .el-icon-goon{
                        background: url("../../assets/resigter_check.png");
                        width: 38px;
                        height: 38px;
                        display:inline-block;
                        background-position: -4px -104px;
                    }
                    .el-icon-not{
                        width: 38px;
                        height: 38px;
                        display:inline-block;
                        border-radius: 45px;
                        color: #fff;
                        font-size: 28px;
                        background-color: #429EFD;
                        line-height: 38px;
                        vertical-align: middle;
                        margin-top: -32px;
                        text-align: center;
                    }
                    div{
                        display: inline-block;
                        margin-left:20px;
                        color: #2F3032;
                        h4{
                            font-size: 16px;
                            margin-bottom: 10px;
                            font-weight: bold;
                        }
                        p{
                            font-size: 14px;
                            span{
                                color: #65C13E;
                            }
                        }
                    }
                }
                .right{
                    position: absolute;
                    right: 26px;
                    color: #429EFD;
                    font-size: 14px;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
            .red{
                color: #F46B6B;
                vertical-align: middle;
                margin-top: 2px;
                display: inline-block;
                margin-right: 2px;
            }
            .threeCls{
                cursor: default;
                display: flex;
                justify-content: center;
            }
            .bottom{
                padding: 10px 0 30px 40px;
                border-left: 1px #EBEEF3 dotted;
                margin: 14px 0 0 19px;
                ul{
                    width: 738px;
                    border: 1px #EBEEF3 solid;
                    border-bottom: none;
                    border-right: none;
                    li{
                        overflow: hidden;
                        display: flex;
                        div{
                            width: 130px;
                            color: #2F3032;
                            font-size: 14px;
                            padding: 16px 0;
                            text-align: center;
                            min-height: 13px;
                            border-right: 1px #EBEEF3 solid;
                            border-bottom: 1px #EBEEF3 solid;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            word-break:break-all;
                            word-wrap:break-word;
                        }
                        a{
                            width: 100%;
                            display: flex;
                            color: #2F3032;
                            justify-content: center;
                            margin-bottom: 10px;
                        }
                        div:nth-child(2n){
                            min-width: 237px;
                            align-items: center;
                            display: flex;
                            flex-wrap: wrap;
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
                        .list{
                            width: 130px;
                            background-color:#fff!important;
                            color: #2F3032;
                            font-size: 14px;
                            padding: 10px 0 16px;
                            text-align: center;
                            border: none;
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                        }
                        .attachCls {
                            ul {
                                width: 100% !important;
                                border: none;
                                li{
                                    border: none;
                                    a{
                                        color: #409EFF;
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                        .network{
                            ul {
                                width: 100% !important;
                                border: none;
                                li{
                                    border: none;
                                }
                            }
                        }
                        .el-icon-document{
                            padding-right: 5px;
                        }
                    }
                }
            }
            .phone_bottom{
                padding: 10px 0 30px 40px;
                margin: 14px 0 0 19px;
                ul{
                    border: 1px #EBEEF3 solid;
                    border-bottom: none;
                    width: 739px;
                    border-right: none;
                    li{
                        overflow: hidden;
                        display: flex;
                        &:first-child {
                            div{
                                background-color: #F9FBFE;
                            }
                        }
                        div{
                            width: 105px;
                            color: #2F3032;
                            font-size: 14px;
                            padding: 16px 0;
                            text-align: center;
                            min-height: 13px;
                            border-right: 1px #EBEEF3 solid;
                            border-bottom: 1px #EBEEF3 solid;
                            float: left;
                            display: flex;
                            justify-content: center;
                        }
                    }
                }
            }
        }
        .btn{
            text-align: center;
            .submit{
                width:160px;
                height:44px;
            }
            .back {
                color: #429EFD;
                text-decoration: underline;
            }
            .submit{
                font-size: 16px;
                margin-right: 12px;
            }
        }
        .nameCls{
            width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .showCls{
            width: 200px;
            line-height: 22px;
        }
        .spanCls{
            width: 110px;
            line-height: 22px;
        }
    }
</style>
<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="topCont">
            <h4>物流商入驻资料</h4>
            <p>
                <span>状态:</span>
                <span>{{ statusType }}</span>
            </p>
        </div>
        <div :class="[prfClass + '-content']">
            <ul class="table-ul">
                <li>
                    <div class="top">
                        <div class="left">
                            <i class="el-icon-success" v-if="regitserMessage.basic_info.status == '已填写'"></i>
                            <i class="el-icon-not" v-else>1</i>
                            <div>
                                <h4>基础资料</h4>
                                <p>
                                    状态:
                                    <span v-if="regitserMessage.basic_info.status == '已填写'">{{regitserMessage.basic_info.status}}</span>
                                    <span class="not" v-else>{{ regitserMessage.basic_info.status }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="regitserMessage.basic_info.status == '已填写'" @click="edit_basic_info('edit')">修改资料</span>
                            <span v-if="regitserMessage.basic_info.status == '未填写'" @click="edit_basic_info('add')">填写资料</span>
                        </div>
                    </div>
                    <basic-info @preview="previewImg" :basic_info="regitserMessage.basic_info"></basic-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <i class="el-icon-success" v-if="regitserMessage.quality_info.status == '已填写'"></i>
                            <i class="el-icon-not" v-else>2</i>
                            <div>
                                <h4>资质证照</h4>
                                <p>
                                    状态:
                                    <span v-if="regitserMessage.quality_info.status == '已填写'">{{regitserMessage.quality_info.status}}</span>
                                    <span class="not" v-else>{{regitserMessage.quality_info.status}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="regitserMessage.quality_info.status == '已填写'" @click="edit_quality_info('edit')">修改资料</span>
                            <span v-if="regitserMessage.quality_info.status == '未填写' && statusOjb.aptSatue " @click="edit_quality_info('add')">填写资料</span>
                        </div>
                    </div>
                    <aptitude-info @preview="previewImg"
                                   :currencyData="currencyData"
                                   :quality_info="regitserMessage.quality_info"></aptitude-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <i class="el-icon-success" v-if="regitserMessage.scale_facilities.status == '已填写'"></i>
                            <i class="el-icon-not" v-else>3</i>
                            <div>
                                <h4>规模与设施</h4>
                                <p>
                                    状态:
                                    <span v-if="regitserMessage.scale_facilities.status == '已填写'">{{regitserMessage.scale_facilities.status}}</span>
                                    <span class="not" v-else>{{regitserMessage.scale_facilities.status}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="regitserMessage.scale_facilities.status == '已填写'" @click="edit_scale_facilities('edit')">修改资料</span>
                            <span v-if="regitserMessage.scale_facilities.status == '未填写' && statusOjb.scaleStatus " @click="edit_scale_facilities('add')">填写资料</span>
                        </div>
                    </div>
                    <scale-info @preview="previewImg"
                                :currencyData="currencyData"
                                :scale_facilities="regitserMessage.scale_facilities"></scale-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <i class="el-icon-success" v-if="regitserMessage.contact_info.status == '已填写'"></i>
                            <i class="el-icon-not" v-else>4</i>
                            <div>
                                <h4>联系方式</h4>
                                <p>
                                    状态:
                                    <span v-if="regitserMessage.contact_info.status == '已填写'">{{regitserMessage.contact_info.status}}</span>
                                    <span class="not" v-else>{{regitserMessage.contact_info.status}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <span v-if="regitserMessage.contact_info.status == '已填写'" @click="edit_phoneNumber('edit')">修改资料</span>
                            <span v-if="regitserMessage.contact_info.status == '未填写' && statusOjb.contactInfoStatus "
                                  @click="edit_phoneNumber('add')">填写资料</span>
                        </div>
                    </div>
                    <contact-info
                        :contact_info="regitserMessage.contact_info"></contact-info>
                </li>
            </ul>
            <div class="btn">
                <el-button class="submit" type="primary" @click="submit">提交审核</el-button>
                <a href="javascript:;" @click="back" class="back" plain>返回首页</a>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/register'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import util from 'commonVueLib/util/tools'
import BasicInfo from '../../components/message/basic_info'
import AptitudeInfo from '../../components/message/aptitude_info'
import ScaleInfo from '../../components/message/scale_info'
import ContactInfo from '../../components/message/contact_info'

export default {
    name: 'affiliate_message',
    components: {
        CommonHeader,
        ImagePreview,
        BasicInfo,
        AptitudeInfo,
        ScaleInfo,
        ContactInfo
    },
    data () {
        return {
            prfClass: 'affiliate-message',
            regitserMessage: {
                basic_info: {
                    status: '已填写',
                    area_type: '', // 区域类型
                    company_en: '', // 公司英文名
                    company_cn: '', // 公司中文名
                    service_type: '', // 服务类型
                    company_profile: '', // 公司简介
                    profile_attachment: [], // 附件
                    company_website: '', // 公司网站
                    company_phone: '', // 公司电话
                    office_addr: '' // 办公地址
                },
                quality_info: {
                    status: '已填写',
                    bs_license_type: '', // 执照类型（是否永久经营）
                    bs_license_date: '', // 营业执照有效期
                    founding_date: '', // 成立时间
                    registed_capital: '', // 注册资本
                    annual_report_date: '', // 年报公示日期
                    bs_license_addr: '', // 营业执照地址
                    bs_license: '', // 营业执照（副本）
                    legal_rep: '', // 法人代表
                    legal_id: [], // 法人身份证
                    principal_shareholder: [], // 主要股东
                    signature_card: [], // 印鉴卡
                    other_attachment: [], // 其他证明材料
                    // 香港（资质证照）
                    cr_attachment: '', // CR
                    br_attachment: '', // BR
                    incorporation_form: [], // 周年报/法团成立表
                    annual_report: [], // 年报附件
                    // 海外
                    registration: [], // 公司注册证
                    regulations: [] // 章程
                },
                scale_facilities: {
                    status: '未填写',
                    staff_num: '', // 员工人数
                    warehouse_space_out: '', // 海外（含香港）仓储面积
                    branch_network: '', // 营业网点/分店机构
                    search_website: '', // 查件网址
                    three_year_revenue: '', // 近3年营业收入（万）
                    customer_list: '', // 近半年TOP3客户名称
                    volume_ratio: '', // 近半年TOP3客户货量占比
                    route_distribution: '', // 航线分布
                    country_region: '', // 客运往国家和地区
                    clearance_port: '' // 清关口岸
                },
                contact_info: {
                    status: '未填写',
                    chief_contact: { // 高层
                        name: '', // 姓名
                        position: '', // 职务
                        phone: '', // 手机
                        landline: '' // 座机
                    },
                    business_contact: { // 业务联系方式
                        name: '', // 姓名
                        email: '', // 邮箱
                        phone: '', // 手机
                        landline: '', // 座机
                        qq: '', // qq
                        fax: '' // 传真
                    },
                    finance_contact: { // 财务联系方式
                        name: '', // 姓名
                        phone: '', // 手机
                        email: '', // 邮箱
                        qq: '', // qq
                        landline: '' // 固话
                    },
                    it_contact: { // it联系方式
                        name: '', // 姓名
                        email: '', // 邮箱
                        phone: '', // 手机
                        qq: '', // qq
                        landline: '' // 固话
                    },
                    cutomer_contact: { // 高层
                        name: '', // 姓名
                        email: '', // 邮箱
                        phone: '', // 手机
                        qq: '', // qq
                        landline: '' // 固话
                    }
                }
            },
            statusOjb: {
                aptSatue: true,
                scaleStatus: true,
                contactInfoStatus: true
            },
            currencyData: util.getCache('dictItem', 'local')['currency'],
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            statusType: '' // 状态
        }
    },
    created () {
        let _self = this

        api.getLogistcsProviderMessage().then((res) => {
            if (res.code === 200) {
                _self.id = res.data.id
                // 状态
                _self.statusType = res.data.status
                let allData = {
                    areaData: {
                        cn: {},
                        hk: {},
                        hw: {}
                    }
                }
                // 判断区域
                if (res.data.quality_info.area_type === 1) {
                    allData.areaData.cn = $.extend({}, res.data.quality_info)
                } else if (res.data.quality_info.area_type === 2) {
                    allData.areaData.hk = $.extend({}, res.data.quality_info)
                } else if (res.data.quality_info.area_type === 3) {
                    allData.areaData.hw = $.extend({}, res.data.quality_info)
                }
                // 存储所有数据
                util.setCache('lmp_All_info', $.extend(allData, res.data))
                // 基本信息
                _self.regitserMessage.basic_info = res.data.basic_info
                // 资质证照
                _self.regitserMessage.quality_info = $.extend({}, res.data.quality_info)
                // 规模与设施
                _self.regitserMessage.scale_facilities = $.extend({}, res.data.scale_facilities)
                // 联系方式
                _self.regitserMessage.contact_info = res.data.contact_info

                // 针对显示填写资料
                if (_self.regitserMessage.basic_info.status === '未填写') {
                    _self.statusOjb.aptSatue = false
                    _self.statusOjb.scaleStatus = false
                    _self.statusOjb.contactInfoStatus = false
                } else if (_self.regitserMessage.quality_info.status === '未填写') {
                    _self.statusOjb.scaleStatus = false
                    _self.statusOjb.contactInfoStatus = false
                } else if (_self.regitserMessage.scale_facilities.status === '未填写') {
                    _self.statusOjb.contactInfoStatus = false
                }
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
    },
    methods: {
        edit_basic_info (type) { // 编辑基础资料
            if (type === 'edit') { // 修改资料
                util.setCache('editMessage', 'true')
            } else {
                util.setCache('editMessage', 'false') // 填写资料
            }
            this.$router.push({ path: '/logistics_basic_info' })
        },
        edit_quality_info (type) { // 编辑资质证照
            if (type === 'edit') {
                util.setCache('editMessage', 'true')
            } else {
                util.setCache('editMessage', 'false')
            }
            this.$router.push({ path: '/aptitude' })
        },
        edit_scale_facilities (type) { // 编辑规模与设施
            if (type === 'edit') {
                util.setCache('editMessage', 'true')
            } else {
                util.setCache('editMessage', 'false')
            }
            this.$router.push({ path: '/scale' })
        },
        edit_phoneNumber (type) { // 编辑联系方式
            if (type === 'edit') {
                util.setCache('editMessage', 'true')
            } else {
                util.setCache('editMessage', 'false')
            }
            this.$router.push({ path: '/phone_number' })
        },
        // 预览图片
        previewImg (data) {
            let _self = this
            _self.showPreview = data.showPreview
            _self.srcs = data.srcs
        },

        // 返回首页
        back () {
            this.$router.push({ path: '/home' })
        },

        /***
         * 提交
         *  0: 申请 1:入驻资料 2:审核中 3:审核驳回 4:个人中心
         */
        submit () {
            let _self = this
            api.submit(_self.id).then((res) => {
                if (res.code === 200) {
                    let jump = res.data.jump

                    // 更改企业信息里jump状态
                    let infoData = util.getCache('company_info', 'local')
                    infoData.jump = jump
                    util.setCache('company_info', infoData, 'local')

                    _self.$store.dispatch('common/auditType', { getAuditType: 1 })
                    _self.$router.push({ path: '/audit_inquiries/2' }) // 审核中
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            })
        }

    }
}
</script>
