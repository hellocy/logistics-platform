<template>
    <div :class="prfClass">
        <div class="top">
            <div class="left"><i class="icon"></i>问题反馈</div>
            <div class="right">
                <a href="javascript:;" class="new" @click="goToNewFeedback"><i class="el-icon-plus"></i><span class="title">新建反馈</span></a>
            </div>
        </div>
        <div class="wrap">
            <ul v-if="hasList">
                <li :key="index"
                    @click="detail(item)"
                    v-for="(item, index) in feedback.list">
                    <div class="left">{{ item.name }}</div>
                    <div class="right">
                        <a href="javascript:;" class="cls">{{ staticDict(item.status) }}</a>
                    </div>
                </li>
            </ul>
            <div class="notList" v-else>
                <div class="imgCls"><img src="../../assets/order_not.png"></div>
                <span>暂无问题</span>
            </div>
            <div class="bottom">
                <a href="javascript:;" class="btnList" @click="goToFeedbackList">查看列表</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feedback',
    data () {
        return {
            prfClass: 'feedback-info',
            hasList: false
        }
    },
    props: {
        feedback: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    watch: {
        feedback () {
            if (this.feedback.list.length > 0) {
                this.hasList = true
            } else {
                this.hasList = false
            }
        }
    },
    computed: {
        staticDict () {
            let _self = this
            return function (val) {
                return _self.feedback.static_dict[val]
            }
        }
    },
    methods: {
        // 跳转到新建问题反馈
        goToNewFeedback () {
            this.$router.push({ path: '/new_feedback' })
        },
        // 跳转到问题反馈列表
        goToFeedbackList () {
            this.$router.push({ path: '/feedback_list' })
        },
        // 详情页
        detail (item) {
            if (item.status === 1 || item.status === 2) {
                this.$router.push({ path: '/reply_feedback/' + item.id }) // 待回复
            }
            if (item.status === 3) {
                this.$router.push({ path: '/evaluate_feedback/' + item.id }) // 待评价
            }
            if (item.status === 4 || item.status === 5) {
                this.$router.push({ path: '/view_feedback/' + item.id }) // 已评价 过期未评价
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'feedback-info';
    .#{$prfClass} {
        display: flex;
        width: 100%;
        flex-flow: wrap column;
        position: relative;
        .top{
            display: flex;
            padding: 17px 0px;
            flex-flow: wrap row;
            border-bottom: 1px solid #EBEEF5;
            justify-content: space-between;
            .left{
                margin-left: 19px;
                display: flex;
                height: 14px;
                line-height: 14px;
            }
            .icon {
                width: 2px;
                background:rgba(66,158,253,1);
                border: 1px solid #429EFD;
                margin-right: 9px;
            }
            .right{
                margin-right: 20px;
                .new{
                    color:#429EFD;
                    font-size:12px;
                }
                .title{
                    margin-left: 5px;
                }
            }
        }
        .wrap{
            display: flex;
            flex-flow: nowrap column;
            margin-top: 25px;
            ul {
                display: flex;
            }
            li {
                display: flex;
                margin-bottom: 18px;
                justify-content: space-between;
                cursor: pointer;
                .left{
                    margin-left: 19px;
                    min-width: 240px;
                    color: #2F3032;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .right{
                    min-width: 90px;
                    margin-left: 20px;
                    margin-right: 20px;
                    text-align: right;
                }
                .cls{
                    color: #65C13E;
                    font-size: 14px;
                }
            }
            .notList{
                display: flex;
                padding-bottom: 24px;
                justify-content: center;
                align-items: center;
                .imgCls{
                    width: 83px;
                    height: 70px;
                    vertical-align: middle;
                    margin-right: 16px;
                }
                span{
                    font-size:16px;
                    font-family:MicrosoftYaHei;
                    font-weight:400;
                    color: #909399;
                }
            }
            .bottom{
                text-align: right;
                margin-top: 4px;
                margin-right: 21px;
                position: absolute;
                right: 0px;
                bottom: 25px;
            }
            .btnList{
                color: #429EFD;
            }
        }
    }
</style>
