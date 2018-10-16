<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <section class="breadcrumb-box">
                <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
            </section>
            <div class="main-content-box">
                <section class="table-top-box">
                    <section class="add-wrap">
                        <el-button type="primary" icon="el-icon-plus" @click="goToNewFeedback">新建问题反馈</el-button>
                        <div class="search-wrap">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="17">
                                    <div class="grid-content bg-purple">
                                        <el-input
                                            placeholder="标题"
                                            v-model="title"
                                            size="small"
                                            clearable>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-button type="primary" size="small" @click="searchTableData">搜索</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </section>
                    <section class="action-box">

                    </section>
                </section>
                <el-table :data="tableData" :height="tableHeight" border stripe :class="prfClass" style="width: 100%;margin-top:-10px;">
                    <el-table-column type="index" fixed width="50" label="序号"></el-table-column>

                    <el-table-column prop="title" align="center" label="标题"></el-table-column>

                    <el-table-column prop="created_at" label="提交时间" align="center"></el-table-column>

                    <el-table-column prop="response_at" label="最后回复时间" align="center"></el-table-column>

                    <el-table-column prop="status_text" label="状态" align="center"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button class="btn-opt" @click="viewFeedback(scope.index, scope.row)" v-if="scope.row.status !== 1 && scope.row.status !== 2" type="text" size="small">查看</el-button>
                            <el-button class="btn-opt" @click="replyFeedback(scope.index, scope.row)" v-if="scope.row.status === 1" type="text" size="small">补充</el-button>
                            <el-button class="btn-opt" type="text" size="mini" v-if="scope.row.status === 2" @click="replyFeedback(scope.$index, scope.row)">回复</el-button>
                            <el-button class="btn-opt" @click="evaluateFeedback(scope.index, scope.row)" v-if="scope.row.status === 3" type="text" size="small">评价</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="per_page"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import breadcrumb from '../../components/breadcrumb'
import feedbackApi from '../../api/feedback'
export default {
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'feedback-list',
            breadcrumbList: [
                {
                    name: '问题反馈',
                    url: '/feedback_list'
                }
            ],
            currentStatus: 0,
            statusTxt: {},
            status: 3,
            tableHeight: 500,
            title: '',
            tableData: [],
            currentPage: 1,
            per_page: 15,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        goToNewFeedback () {
            this.$router.push({path: '/new_feedback'})
        },

        response (res) {
            let that = this
            if (res.code === 200) {
                that.statusTxt = res.data.status_dict
                let _data = res.data.list.data
                for (let i = 0; i < _data.length; i++) {
                    _data[i]['status_text'] = that.statusTxt[_data[i]['status']]
                }
                that.tableData = _data
                that.total = res.data.list.total
            } else {
                that.$alert(res.msg, '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                })
            }
        },

        // 按标题搜索数据
        searchTableData () {
            let that = this
            let tableParams = {
                page: 1,
                per_page: this.per_page,
                keyword: this.title
            }
            feedbackApi.getFeedbackTableData(tableParams).then(function (res) {
                that.response(res)
            })
        },

        getTableData () {
            let that = this
            let tableParams = {
                per_page: that.per_page,
                page: this.currentPage,
                keyword: this.title
            }
            feedbackApi.getFeedbackTableData(tableParams).then(function (res) {
                that.response(res)
            })
        },

        // 每页显示n条数
        handleSizeChange (val) {
            let that = this
            let tableParams = {
                per_page: that.per_page,
                page: this.currentPage,
                keyword: this.title
            }
            this.per_page = val
            feedbackApi.getFeedbackTableData(tableParams).then(function (res) {
                that.response(res)
            })
        },

        // 分页
        handleCurrentChange (val) {
            let that = this
            let tableParams = {
                per_page: this.per_page,
                page: val,
                keyword: this.title
            }
            feedbackApi.getFeedbackTableData(tableParams).then(function (res) {
                that.response(res)
            })
        },

        // 查看问题反馈详情
        viewFeedback (index, row) {
            this.$router.push({ path: '/view_feedback/' + row.id })
        },

        // 补充问题反馈
        supplementFeedback (index, row) {
            this.$router.push({ path: '/price_partition_change/' + row.id })
        },

        // 回复问题反馈
        replyFeedback (index, row) {
            let that = this
            that.$router.push({ path: '/reply_feedback/' + row.id })
        },

        // 评价问题反馈
        evaluateFeedback (index, row) {
            this.$router.push({ path: '/evaluate_feedback/' + row.id })
        }
    },
    created () {
        this.tableHeight = window.innerHeight - 300
        this.getTableData()
    }
}
</script>

<style lang="scss">
    $prfClass: 'feedback-list';
    .#{$prfClass}-wrap{
        margin:0 20px;
        font-family: MicrosoftYaHei;
        .breadcrumb-box{
            margin:10px 0;
        }
        .main-content-box{
            background: #fff;
            padding:20px;
            margin-top:10px;
            .el-table th {
                white-space: nowrap;
                overflow: hidden;
                text-align: left;
                background: #f1f1f7;
                font-weight: bold;
                color:#000
            }
            .el-table .cell{
                text-align: left;
            }
            .sub-title{
                font-size:16px;
                margin-right:10px;
                font-weight: bold;
            }
            .action-box{
                margin:30px 0;
                .el-tag{
                    margin-right: 3px;
                }
            }
            .search-wrap{
                float:right;
                text-align:right;
                margin-top:8px;
            }
            .page{
                text-align: right;
                margin:20px;
            }
            .btn-opt{
                border-bottom: 1px solid #409EFF;
                padding-bottom: 1px;
                padding-left: 1px;
                padding-right: 1px;
                border-radius: 0;
                font-size:14px;
            }
            .el-table__fixed-right-patch{
                background: #f1f1f7;
            }
        }
    }

</style>
