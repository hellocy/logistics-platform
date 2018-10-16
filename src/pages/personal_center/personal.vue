<template>
<div :class="prfClass">
    <common-header></common-header>
    <div :class="[prfClass + '-wrap']">
        <ul>
            <li>
                <!--我的信息-->
                <div class="my-info">
                    <my-info :myInfo="pageData.my_info"></my-info>
                </div>

                <!--我的渠道-->
                <div class="my-channel">
                    <my-channel :channelData="pageData.my_channel"></my-channel>
                </div>
            </li>
            <li>
                <!--问题反馈-->
                <div class="feedback">
                    <feed-back :feedback="pageData.feedback_info"></feed-back>
                </div>

                <!--收款信息-->
                <div class="receipt-info">
                    <receipt-info :receiptInfo="pageData.receipt_info"></receipt-info>
                </div>
            </li>
            <li>
                <!--公告列表-->
                <div class="announcement-info">
                    <announcement-list :announcementList="pageData.announcement_list"></announcement-list>
                </div>

                <!--报价&分区信息-->
                <div class="quote-info">
                    <quote-info :quoteInfo="pageData.quote_info"></quote-info>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import MyInfo from './my_info'
import FeedBack from './feedback'
import MyChannel from './my_channel'
import QuoteInfo from './quote_info'
import ReceiptInfo from './receipt_info'
import AnnouncementList from './announcement_list'
import api from '../../api/personal'
import util from 'commonVueLib/util/tools'

export default {
    name: 'personal',
    data () {
        return {
            prfClass: 'personal-center',
            pageData: {
                my_info: {}, // 个人信息
                feedback_info: {}, // 问题反馈
                my_channel: {}, // 我的渠道
                quote_info: {}, // 报价分区
                receipt_info: {}, // 收款信息
                announcement_list: {} // 公告信息
            }
        }
    },
    components: {
        CommonHeader,
        MyInfo,
        FeedBack,
        MyChannel,
        QuoteInfo,
        ReceiptInfo,
        AnnouncementList
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
    mounted () {
        let _self = this
        api.getMyInfo().then((res) => {
            if (res.code === 200) {
                console.log(res)
                _self.pageData.my_info = res.data.my_info // 个人信息
                _self.pageData.my_channel = res.data.my_channel // 我的渠道
                _self.pageData.feedback_info = res.data.feedback_info // 问题反馈
                _self.pageData.quote_info = res.data.quote_info // 报价分区
                _self.pageData.receipt_info = res.data.receipt_info // 收款信息
                _self.pageData.announcement_list = res.data.announcement_list // 公告信息
            } else {
                _self.$alert(res.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
            }
        })
    }
}
</script>

<style lang="scss">
    $prfClass: 'personal-center';
    .#{$prfClass}-wrap{
        display: flex;
        justify-content: center;
        padding: 20px 19px;
        ul{
            display: flex;
            width: 100%;
            justify-content: center;
            flex-flow: wrap column;
            li{
                display: flex;
                margin-bottom: 20px;
                .my-info{
                    display: flex;
                    flex: 1;
                    min-width:388px;
                    height:auto;
                    background: #fff;
                    border-radius:4px;
                    border: 1px solid #EBEEF5;
                }
                .my-channel{
                    display: flex;
                    margin-left: 20px;
                    flex: 2;
                    min-width:578px;
                    height: auto;
                    border: 1px solid #EBEEF5;
                    border-radius:4px;
                    background-color: #fff;
                }
                .feedback{
                    display: flex;
                    flex: 1;
                    min-width:388px;
                    height:auto;
                    background: #fff;
                    border-radius:4px;
                    border: 1px solid #EBEEF5;
                }
                .receipt-info{
                    display: flex;
                    margin-left: 20px;
                    flex: 2;
                    min-width:578px;
                    border: 1px solid #EBEEF5;
                    border-radius:4px;
                    background-color: #fff;
                }
                .announcement-info{
                    display: flex;
                    flex: 1;
                    min-width:388px;
                    height:auto;
                    background: #fff;
                    border-radius:4px;
                    border: 1px solid #EBEEF5;
                }
                .quote-info{
                    display: flex;
                    margin-left: 20px;
                    flex: 2;
                    min-width:578px;
                    border: 1px solid #EBEEF5;
                    border-radius:4px;
                    background-color: #fff;
                }
            }
        }
    }
</style>
