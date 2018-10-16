<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
            <div class="main-content-box">
                <section class="table-top-box">
                    <section class="add-wrap">
                        <span class="sub-title">报价&分区信息</span>
                        <el-button type="primary" @click="goToNewCashCollectionInfo">申请变更</el-button>
                    </section>
                    <section class="action-box">
                        <el-button size="small" :plain = 'currentStatus !== 0' type="primary" @click="filtTableData(0)">所有( <span>{{status.total}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 1' type="primary" @click="filtTableData(1)">待提交( <span>{{status.wait_submit}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 2' type="warning" @click="filtTableData(2)">审核中( <span>{{status.checking}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 3' type="success" @click="filtTableData(3)">审核通过( <span>{{status.check_agree}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 4' type="danger" @click="filtTableData(4)">审核驳回( <span>{{status.check_reject}}</span> )</el-button>
                        <div class="search-wrap">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="17">
                                    <div class="grid-content bg-purple">
                                        <el-input
                                            placeholder="渠道名称"
                                            v-model="channelName"
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
                </section>
                <el-table :data="tableData" :height="tableHeight" border stripe :class="prfClass" style="width: 100%;">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>

                    <el-table-column prop="channel_name" align="center" label="渠道名称"></el-table-column>

                    <el-table-column prop="attach_name" label="附件名称" align="center"></el-table-column>

                    <el-table-column prop="begin_time" label="生效开始时间" align="center"></el-table-column>

                    <el-table-column prop="end_time" label="生效结束时间" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>

                    <el-table-column prop="status_text" label="状态" align="center"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button class="btn-opt" @click="viewPriceInfo(scope.index, scope.row)" v-if="scope.row.status !== 1" type="text" size="small">查看</el-button>
                            <el-button class="btn-opt" @click="editPriceInfo(scope.index, scope.row)" v-if="scope.row.status === 1" type="text" size="small">编辑</el-button>
                            <el-button class="btn-opt" type="text" size="mini" v-if="scope.row.status == 1" @click="deleteQuotesInfo(scope.$index, scope.row)">删除</el-button>
                            <el-button class="btn-opt" @click="submitPricePartitionInfo(scope.index, scope.row)" v-if="scope.row.status === 1" type="text" size="small">提交审核</el-button>
                            <el-button class="btn-opt" @click="editPriceInfo(scope.index, scope.row)" v-if="scope.row.status === 4" type="text" size="small">重新申请</el-button>
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
import channelApi from '../../api/channel'
import util from 'commonVueLib/util/tools'
export default {
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-list',
            breadcrumbList: [
                {
                    name: '报价&分区信息',
                    url: '/price_partition'
                }
            ],
            currentStatus: 0,
            statusTxtArr: ['待提交', '审核中', '审核通过', '审核驳回'],
            status: {
                total: 0,
                wait_submit: 0,
                checking: 0,
                check_agree: 0,
                check_reject: 0,
                modify: 0
            },
            tableHeight: 500,
            channelName: '',
            tableData: [],
            currentPage: 1,
            per_page: 15,
            pageSize: 10,
            total: 0
        }
    },
    beforeRouteEnter (to, from, next) {
        let _self = window.GLOBAL.globalApp
        let type = _self.$store.getters['common/getAuditType']
        let accessType = util.getCache('access_authority', 'local') * 1

        if (type !== 4 || accessType !== 4) {
            // 1:入驻资料 2:审核中 3:审核驳回 4:个人中心
            channelApi.getAudit().then((res) => {
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
    methods: {
        goToNewCashCollectionInfo () {
            this.$router.push({path: '/price_partition_change/__new__'})
        },

        // 过滤不同状态的数据
        filtTableData (status) {
            let that = this
            this.currentStatus = status
            let tableParams = {
                page: 1,
                per_page: this.per_page,
                status: status,
                channel_name: this.channelName
            }
            this.$store.dispatch('common/priceStatue', { price_statue: status }) // 缓存当前选择的状态
            channelApi.getQuotesTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        // 按渠道搜索数据
        searchTableData () {
            let that = this
            let tableParams = {
                page: 1,
                per_page: this.per_page,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            channelApi.getQuotesTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        getTableData () {
            let that = this
            let tableParams = {
                per_page: that.per_page,
                page: this.currentPage,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            channelApi.getQuotesTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        // 每页显示n条数
        handleSizeChange (val) {
            let that = this
            let tableParams = {
                per_page: val,
                page: this.currentPage,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            this.per_page = val
            channelApi.getQuotesTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        // 分页
        handleCurrentChange (val) {
            let that = this
            let tableParams = {
                per_page: this.per_page,
                page: val,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            channelApi.getQuotesTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        // 查看报价&分区信息详情
        viewPriceInfo (index, row) {
            let url = ['price_partition_view', 'price_partition_view', 'price_partition_rejected'][row.status - 2]
            this.$router.push({ path: url + '/' + row.id })
        },

        // 编辑报价&分区信息
        editPriceInfo (index, row) {
            this.$router.push({ path: '/price_partition_change/' + row.id })
        },

        // 删除报价&分区信息
        deleteQuotesInfo (index, row) {
            let that = this
            that.$confirm('确定要删除该报价&分区信息吗？', '确认信息', {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                channelApi.deleteQuotesInfo({id: row.id}).then((res) => {
                    if (res.code === 200) {
                        that.$message.success('删除成功！')
                        that.getTableData()
                    } else {
                        that.$alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }
                })
            })
        },

        // 提交分区报价信息
        submitPricePartitionInfo (index, row) {
            let that = this
            that.$confirm('确定要提交该报价&分区信息吗？', '确认信息', {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                channelApi.submitListPriceInfo({id: row.id}).then((res) => {
                    if (res.code === 200) {
                        this.$router.push({ path: 'price_partition_auditing/' + row.id })
                        // that.getTableData()
                    } else {
                        that.$alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }
                })
            })
        }
    },
    created () {
        let that = this

        this.getTableData()

        that.currentStatus = that.$store.getters['common/getPriceStatue']
        this.tableHeight = window.innerHeight - 400

        channelApi.getQuotesStatusTotal().then(function (res) {
            if (res.code === 200) {
                let data = res.data
                that.status = {
                    total: data.total,
                    wait_submit: data.wait_submit,
                    checking: data.checking,
                    check_agree: data.check_agree,
                    check_reject: data.check_reject,
                    modify: data.modify
                }
            }
        })
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-list';
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
            .add-wrap{
                border-bottom: 1px solid #F1F1F7;
                margin-top:20px;
                margin-bottom:10px;
                padding-bottom:10px;
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
