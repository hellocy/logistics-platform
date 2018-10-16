<style lang="scss">
    $prfClass: 'company-info';
    .#{$prfClass}{
        padding-bottom: 88px;
        .topCont {
            width: 900px;
            height: 76px;
            background-color: #fff;
            margin: 16px auto 10px;
            position: relative;
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
                font-size:12px;
            }
            .statue-cls{
                position: absolute;
                right: 70px;
                top: 13px;
                width: 150px;
                height: 50px;
                background: url('../../assets/my_message_status.png') no-repeat 0 -120px;
            }
            .statue{
                position: absolute;
                right: 42px;
                top: 18px;
            }
            .edit{
                width: 140px;
                font-size:14px;
                height: 40px;
            }
        }
        .companyDialog .el-dialog__header{
            padding: 0px;
            background-color: #F2F6FC;
            height: 47px;
        }
        .companyDialog .dialog-title{
            line-height: 47px;
            .el-icon-document{
                padding-right: 11px;
            }
        }
        .companyDialog .dialog-title .name{
            padding-left: 27px;
            color: #909399;
            font-size:16px;
            img{
                vertical-align: middle;
            }
        }
        .el-dialog__headerbtn{
            top: 11px;
            font-size: 24px;
        }
        .companyDialog .dialog-footer{
            text-align: center;
            margin-top: 25px;
            .save{
                width:160px;
                height:44px;
                border: 1px solid #429EFD;
                font-size:16px;
            }
        }
        .companyDialog .el-dialog__body{
            padding: 0px;
        }
        .wrapCont{
            margin-top: 41px;
            padding: 0px 55px 0px 47px;
            .tit{
                color: #909399;
                font-size:16px;
                margin-bottom: 31px;
            }
            .cont{
                color:#303133;
                font-size:16px;
                line-height: 26px;
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
                    display: inline-block;
                    margin-left: 60px;
                    color: #2F3032;
                }
                h4{
                    color: #2F3032;
                    font-size: 16px;
                    line-height: 22px;
                    font-weight: bold;
                    padding-left: 10px;
                    border-left: 4px #429EFD solid;
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
            <h4>公司资料</h4>
            <div v-if="statusCode == 1">
                <p>提交日期：{{ updated_at }} 我司已接收资料， 审核结果将在二个工作日内邮件通知到您。</p>
                <div class="statue-cls"></div>
            </div>
            <div v-if="statusCode == 2">
                <p>{{ status }} </p>
                <div class="statue">
                    <el-button type="primary" class="edit" icon="el-icon-edit" @click="edit">申请更改</el-button>
                </div>
            </div>
            <div v-if="statusCode == 4">
                <p>{{ status }} </p>
                <div class="statue">
                    <el-button type="primary" class="edit" icon="el-icon-edit" @click="edit">申请更改</el-button>
                </div>
            </div>
            <div v-if="statusCode == 3">
                <p>通过日期：{{ updated_at }} </p>
                <div class="statue">
                    <el-button type="primary" class="edit" icon="el-icon-edit" @click="edit">申请更改</el-button>
                </div>
            </div>
        </div>
        <div :class="[prfClass + '-content']">
            <ul class="table-ul">
                <li>
                    <div class="top">
                        <div class="left">
                            <h4>基础资料</h4>
                        </div>
                    </div>
                    <basic-info @preview="previewImg" :basic_info="regitserMessage.basic_info"></basic-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <h4>资质证照</h4>
                        </div>
                    </div>
                    <aptitude-info @preview="previewImg"
                                   :currencyData="currencyData"
                                   :quality_info="regitserMessage.quality_info"></aptitude-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <h4>规模与设施</h4>
                        </div>
                    </div>
                    <scale-info @preview="previewImg"
                                :currencyData="currencyData"
                                :scale_facilities="regitserMessage.scale_facilities"></scale-info>
                </li>
                <li>
                    <div class="top">
                        <div class="left">
                            <h4>联系方式</h4>
                        </div>
                    </div>
                    <contact-info
                        :contact_info="regitserMessage.contact_info"></contact-info>
                </li>
            </ul>
            <div class="btn">
                <el-button class="submit" type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>

        <!--弹出内容-->
        <el-dialog width="532px"
                   top="260px"
                   class="companyDialog"
                   :visible.sync="dialogPro">
            <div slot="title" class="dialog-title">
                <div class="name"><img src="../../assets/not_pass.png" /> 审核未通过</div>
            </div>
            <div class="wrapCont">
                <p class="tit">您提交的资料审核未通过，具体驳回原因如下：</p>
                <div class="cont" v-html="remarkInfo"></div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="save" type="primary" @click="edit()">重新提交</el-button>
            </div>
        </el-dialog>

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
    name: 'compony_info',
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
            prfClass: 'company-info',
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
            statusCode: '', // 状态
            status: '', // 状态描述
            updated_at: '',
            dialogPro: false,
            remarkInfo: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        let _self = window.GLOBAL.globalApp
        let type = _self.$store.getters['common/getAuditType']
        let accessType = util.getCache('access_authority', 'local') * 1

        if (type !== 4 || accessType !== 4) {
            // 1:入驻资料 2:审核中 3:审核驳回 4:个人中心
            api.getAudit().then((res) => {
                if (res.code === 200) {
                    let jump = res.data.jump
                    if (jump === 1) { // 入驻资料
                        _self.$router.push({ path: '/affiliate_message' })
                    } else if (jump === 2) { // 审核中
                        _self.$router.push({ path: '/audit_inquiries/2' })
                    } else if (jump === 3) { // 审核驳回
                        _self.$router.push({ path: '/audit_inquiries/3' })
                    } else if (jump === 4) { // 个人中心
                        _self.$store.dispatch('common/auditType', { getAuditType: 4 })
                        // 刷新页面
                        next()
                    }
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        } else {
            next()
        }
    },
    created () {
        let _self = this
        api.getLogistcsProviderMessage().then((res) => {
            if (res.code === 200) {
                // 状态
                _self.statusCode = res.data.status_code
                _self.status = res.data.status

                if (_self.statusCode === 2) { // 驳回，显示弹框
                    _self.dialogPro = true
                    _self.remarkInfo = res.data.audit.remark
                }

                // 日期
                _self.updated_at = res.data.updated_at
                // 基本信息
                _self.regitserMessage.basic_info = res.data.basic_info
                // 资质证照
                _self.regitserMessage.quality_info = $.extend({}, res.data.quality_info)
                // 规模与设施
                _self.regitserMessage.scale_facilities = $.extend({}, res.data.scale_facilities)
                // 联系方式
                _self.regitserMessage.contact_info = res.data.contact_info
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
    },
    methods: {
        // 预览图片
        previewImg (data) {
            let _self = this
            _self.showPreview = data.showPreview
            _self.srcs = data.srcs
        },
        // 返回首页
        back () {
            this.$router.push({ path: '/personal' })
        },
        // 更改跳转到物流商入驻资料
        edit () {
            this.$router.push({ path: '/affiliate_message' })
        }
    }
}
</script>
