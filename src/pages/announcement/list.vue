<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <div class="nav">
                <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
            </div>
            <div class="content">
                <div class="top">
                    <h4>公告列表</h4>
                    <div class="right">
                        <i v-if="unRead != 0" class="redCls"></i>
                        <span class="title">未读 ({{ unRead }})</span>
                    </div>
                </div>
                <div class="list">
                    <div class="list-div"
                         @click="detail(item.id)"
                         v-if="isHasList"
                         :key="index"
                         v-for="(item, index) in listData">
                        <div class="name">
                            <div class="cont" :class="{unRead: !item.is_read }">
                                <span class="txt">{{ item.title }}</span>
                                <span class="status" v-if="!item.is_read"></span>
                            </div>
                        </div>
                        <div class="time">{{ item.created_at }}</div>
                        <div class="info">{{ item.content }}</div>
                    </div>

                    <div class="notList" v-if="!isHasList">
                        <span class="txt">暂无公告</span>
                    </div>
                </div>

                <div class="page">
                    <el-pagination
                        v-if="isHasList"
                        @current-change="handleCurrentChange"
                        :current-page.sync="current_page"
                        layout="prev, pager, next"
                        :page-size="per_page"
                        :total="totalPage">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import BreadCrumb from '../../components/breadcrumb'
import api from '../../api/api'

export default {
    name: 'announcement_list',
    data () {
        return {
            prfClass: 'announcement-list-wrap',
            unRead: '', // 未读
            isHasList: false,
            listData: [],
            current_page: 1, // 当前页
            per_page: 15, // 每一页的条数，默认为15
            totalPage: 0, // 总页数
            breadcrumb_list: [
                {
                    name: '公告列表',
                    url: ''
                }
            ]
        }
    },
    components: {
        CommonHeader,
        BreadCrumb
    },
    mounted () {
        this.getListInfo()
    },
    methods: {
        // 获取列表信息
        getListInfo () {
            let _self = this
            // 传参
            let jsonData = {
                page: _self.current_page
            }
            api.getAnnouncement(jsonData).then((res) => {
                if (res.code === 200) {
                    _self.unRead = res.data.unread
                    let _list = res.data.list
                    if (_list.data.length > 0) {
                        _self.totalPage = _list.total // 总数量
                        _self.per_page = _list.per_page // 当页显示数量

                        _self.isHasList = true
                        _self.listData = _list.data
                    }
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            })
        },

        // 切换页码
        handleCurrentChange () {
            this.getListInfo()
        },

        // 跳转详情页
        detail (id) {
            this.$router.push({ path: '/announcement/' + id })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'announcement-list-wrap';
    .#{$prfClass}-wrap {
        padding: 0 22px 75px;
        margin: 0 auto;
        .nav {
            margin: 12px 0;
            color: #8F9298;
            font-size: 12px;
            i {
                padding: 0px 6px;
            }
            .localCls {
                color: #429EFD;
            }
        }
        .content{
            display: flex;
            flex-flow: column wrap;
            margin-top: 11px;
            justify-content: center;
            padding: 0px 22px 100px;
            background:#fff;
        }
        .top {
            display: flex;
            margin: 19px 23px 0px 23px;
            position: relative;
            border-bottom: 1px solid #F1F1F7;
            h4{
                font-size:16px;
                font-family:MicrosoftYaHei;
                color: #2F3032;
                font-weight:bold;
                padding-bottom: 19px;
            }
            .right{
                margin-left: 9px;
                margin-top: 2px;
            }
            .title{
                font-size:12px;
                font-weight:400;
                color: #F56C6C;
            }
            .redCls{
                display: inline-block;
                width:8px;
                height:8px;
                background:#F56C6C;
                border-radius:50%;
                margin-right: 2px;
            }
        }
        .list{
            display: flex;
            margin-top: 16px;
            padding: 0px 23px;
            flex-flow: column wrap;
            .notList{
                padding: 27px 0px;
                background-color: #F7F7F7;
                display: flex;
                justify-content: center;
                .txt{
                    color: #999999;
                    font-size:16px;
                }
            }
            .list-div{
                display: flex;
                flex-flow: column wrap;
                cursor: pointer;
                padding: 16px 21px;
                position: relative;
                border-bottom: 1px solid #EDEDED;
                background-color: #F7F7F7;
                .time{
                    position: absolute;
                    right: 24px;
                    top:31px;
                    font-size:12px;
                    color: #999999;
                }
            }
            .list-div:hover{
                background-color: #F0F0F0;
            }
            .name{
                display: flex;
                .cont{
                    font-size:14px;
                    color: #2F3032;
                    font-weight:400;
                    position: relative;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 130px;
                    padding-right: 20px;
                }
                .unRead{
                    font-weight:bold;
                }
                .status{
                    position: absolute;
                    top:4px;
                    right: 0px;
                    width:8px;
                    height:8px;
                    background:#F56C6C;
                    border-radius:50%;
                }
            }
            .info{
                font-size:12px;
                margin-top: 11px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 150px;
                color: #808080;
            }
        }
        .page{
            text-align: right;
            margin-right: 12px;
            .el-pagination{
                display: inline-block;
                text-align: right;
                padding: 10px 0;
            }
        }
    }
</style>
