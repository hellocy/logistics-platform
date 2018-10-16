<template>
    <div :class="prfClass">
        <div class="top">
            <div class="left"><i class="icon"></i>公告列表</div>
            <div class="right">
                <div href="javascript:;" class="new">
                    <i v-if="announcementList.all != 0" class="redCls"></i>
                    <span class="title">未读 ({{ announcementList.all }})</span></div>
            </div>
        </div>
        <div class="wrap">
            <ul v-if="hasList">
                <li :key="index"
                    @click="detail(item.id)"
                    v-for="(item, index) in announcementList.list">
                    <div class="left">
                        <span :class="item.type == 1 ? typeClass : ''">{{ item.name }}</span>
                        <span v-if="item.type == 1" class="redCls"></span>
                    </div>
                    <div class="right">
                        <a href="javascript:;" class="cls">{{ item.created_at }}</a>
                    </div>
                </li>
            </ul>
            <div class="notList" v-else>
                <div class="imgCls"><img src="../../assets/announcement_not.png" /></div>
                <span>暂无公告</span>
            </div>
            <div class="bottom">
                <a href="javascript:;" @click="viewList" class="btnList">查看列表</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'announcement_list',
    data () {
        return {
            prfClass: 'announcement-list',
            typeClass: 'typeCls',
            hasList: false
        }
    },
    props: {
        announcementList: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    watch: {
        announcementList () {
            if (this.announcementList.list.length > 0) {
                this.hasList = true
            } else {
                this.hasList = false
            }
        }
    },
    methods: {
        // 公告列表页
        viewList () {
            this.$router.push({ path: '/announcement' })
        },

        // 公告详情页
        detail (id) {
            this.$router.push({ path: '/announcement/' + id })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'announcement-list';
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
                    color: #F56C6C;
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: relative;
                    padding-right: 20px;
                    color: #2F3032;

                    .redCls{
                        position: absolute;
                        top:4px;
                        right: 0px;
                        width:8px;
                        height:8px;
                        background:#F56C6C;
                        border-radius:50%;
                    }
                }
                .typeCls{
                    min-width: 240px;
                    font-weight:bold;
                }
                .right{
                    min-width: 120px;
                    margin-left: 20px;
                    margin-right: 20px;
                }
                .cls{
                    color: #999999;
                    font-size: 12px;
                }
            }
            .notList{
                display: flex;
                padding-bottom: 24px;
                justify-content: center;
                align-items: center;
                .imgCls{
                    width: 120px;
                    height: 72px;
                    vertical-align: middle;
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
        .redCls{
            display: inline-block;
            width:8px;
            height:8px;
            background:#F56C6C;
            border-radius:50%;
        }
    }
</style>
