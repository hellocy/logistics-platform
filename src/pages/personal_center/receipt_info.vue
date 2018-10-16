<template>
    <div :class="prfClass">
        <div class="top">
            <div class="left"><i class="icon"></i>收款信息</div>
        </div>
        <div class="wrap">
            <div class="left" @click="receiptFn">
                <img class="logo" src="../../assets/icon_1.png" />
                <span class="title">收款信息</span>
            </div>
            <div class="right">
                <ul>
                    <li>
                        <div class="list_submit" @click="statue('submit')" >
                            <i class="icon"></i>
                            <a class="btn" href="javascript:;">待提交</a>
                            <span class="title">{{ receiptInfo.wait_submit }}</span>
                        </div>
                        <div class="list_reject" @click="statue('reject')">
                            <i class="icon"></i>
                            <a class="btn" href="javascript:;">审核驳回</a>
                            <span class="title">{{ receiptInfo.review_reject }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="list_audit" @click="statue('in_review')" >
                            <i class="icon"></i>
                            <a class="btn" href="javascript:;">审核中</a>
                            <span class="title">{{ receiptInfo.in_review }}</span>
                        </div>
                        <div class="list_edit" @click="statue('edit')" >
                            <i class="icon"></i>
                            <a class="btn" href="javascript:;">修改中</a>
                            <span class="title">{{ receiptInfo.edit }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="list_success" @click="statue('pass')">
                            <i class="icon"></i>
                            <a class="btn" href="javascript:;">审核通过</a>
                            <span class="title">{{ receiptInfo.pass_audit }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'receipt_info',
    data () {
        return {
            prfClass: 'receipt-info-wrap'
        }
    },
    props: {
        receiptInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    methods: {
        // 跳转到收款信息
        receiptFn () {
            this.$router.push({ path: '/cash_collection_info_list' })
        },
        // 状态跳转
        statue (type) {
            switch (type) {
            case 'submit':
                this.$store.dispatch('common/receiptStatue', { receipt_statue: 1 }) // 待提交
                break
            case 'in_review':
                this.$store.dispatch('common/receiptStatue', { receipt_statue: 2 }) // 审核中
                break
            case 'pass':
                this.$store.dispatch('common/receiptStatue', { receipt_statue: 3 }) // 审核通过
                break
            case 'reject':
                this.$store.dispatch('common/receiptStatue', { receipt_statue: 4 }) // 审核驳回
                break
            case 'edit':
                this.$store.dispatch('common/receiptStatue', { receipt_statue: 5 }) // 修改中
                break
            default:
                break
            }

            this.$router.push({ path: '/cash_collection_info_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'receipt-info-wrap';
    .#{$prfClass} {
        display: flex;
        width: 100%;
        flex-flow: wrap column;
        .top{
            display: flex;
            padding: 18px 0px;
            flex-flow: wrap row;
            border-bottom: 1px solid #EBEEF5;
            .left{
                margin-left: 19px;
                display: flex;
                height: 14px;
                line-height: 14px;
                margin-top: 3px;
            }
            .icon {
                width: 2px;
                background:rgba(66,158,253,1);
                border: 1px solid #429EFD;
                margin-right: 9px;
            }
            .right{
                vertical-align: middle;
                margin-left: 12px;
                padding: 0px 15px;
                line-height: 18px;
                height:20px;
                background:rgba(244,107,107,1);
                border-radius:10px;
                font-size:12px;
                color: #fff;
            }
        }
        .wrap{
            display: flex;
            margin: 20px;
            background:#F7F7F7;
            border: 1px solid #EBEEF5;
            .left{
                display: flex;
                border: 1px solid #F7F7F7;
                margin: 21px 12px;
                padding: 16px 0px 16px 20px;
                height: auto;
                align-items: center;
                cursor: pointer;
                img{
                    width: 40px;
                    height: 40px;
                    margin-right: 13px;
                    vertical-align: middle;
                }
                .title{
                    font-size:20px;
                    vertical-align: top;
                    font-family:MicrosoftYaHeiUI-Bold;
                    font-weight:bold;
                    color:rgba(47,48,50,1);
                    padding-right: 91px;
                }
            }
            .left:hover{
                border-radius:5px;
                background-color: #EAF3FD;
                border: 1px solid #B5D7FD;
            }
        }
        .right:before{
            content: '';
            height: 48px;
            border-left: 1px solid #DCDFE6;
            padding-right: 37px;
            margin-top: 15px;
        }
        .right{
            margin: 21px 0px;
            display: flex;
        }
        ul{
            display: flex;
            li{
                width: 100%;
                list-style: none;
                line-height: 22px;
                margin-bottom: 4px;
            }
            li:last-child{
                margin-bottom: 0px;
            }
            .title{
                display: inline-block;
                width:50px;
            }
        }
        .list_submit{
            display: flex;
            line-height: 22px;
            cursor: pointer;
            .icon {
                display: flex;
                width:12px;
                height:12px;
                margin-top: 4px;
                background:rgba(144,147,153,1);
                border-radius:50%;
                border: 1px solid #B8B8B8;
            }
            .btn{
                display: flex;
                margin-left: 5px;
                margin-right: 32px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                font-weight:400;
                color: #909399;
            }
            .title{
                color: #909399;
            }
        }
        .list_reject{
            margin-left: 4px;
            display: flex;
            line-height: 22px;
            cursor: pointer;
            .icon {
                display: flex;
                width:12px;
                height:12px;
                margin-top: 4px;
                background:rgba(244,107,107,1);
                border-radius:50%;
                border: 1px solid #F46B6B;
            }
            .btn{
                display: flex;
                margin-left: 5px;
                margin-right: 12px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                font-weight:400;
                color: #F46B6B;
            }
            .title{
                color: #F46B6B;
            }
        }

        .list_audit{
            display: flex;
            line-height: 22px;
            cursor: pointer;
            .icon {
                display: flex;
                width:12px;
                height:12px;
                margin-top: 4px;
                background:#E5A13E;
                border-radius:50%;
                border: 1px solid #E5A13E;
            }
            .btn{
                display: flex;
                margin-left: 5px;
                margin-right: 32px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                font-weight:400;
                color: #E5A13E;
            }
            .title{
                color: #E5A13E;
            }
        }

        .list_edit{
            margin-left: 4px;
            display: flex;
            line-height: 22px;
            cursor: pointer;
            .icon {
                display: flex;
                width:12px;
                height:12px;
                margin-top: 4px;
                background:#909399;
                border-radius:50%;
                border: 1px solid #909399;
            }
            .btn{
                display: flex;
                margin-left: 5px;
                margin-right: 26px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                font-weight:400;
                color: #909399;
            }
            .title{
                color: #909399;
            }
        }

        .list_success{
            display: flex;
            line-height: 22px;
            cursor: pointer;
            .icon {
                display: flex;
                width:12px;
                height:12px;
                margin-top: 4px;
                background: #65C13E;
                border-radius:50%;
                border: 1px solid #65C13E;
            }
            .btn{
                display: flex;
                margin-left: 5px;
                margin-right: 18px;
                font-size:14px;
                font-family:MicrosoftYaHeiUI;
                font-weight:400;
                color: #65C13E;
            }
            .title{
                color: #65C13E;
            }
        }
    }
</style>
