<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <!--<section class="breadcrumb-box">-->
                <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
            <!--</section>-->
            <div class="main-content-box">
                <section class="table-top-box">
                    <section class="add-wrap">
                        <span class="sub-title">收款信息</span>
                        <el-button type="primary" icon="el-icon-plus" @click="goToNewCashCollectionInfo">新增收款信息</el-button>
                    </section>
                    <section class="action-box">
                        <el-button size="small" :plain = 'currentStatus !== 0' type="primary" @click="filtTableData(0)">所有( <span>{{status.total}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 1' type="primary" @click="filtTableData(1)">待提交( <span>{{status.wait_submit}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 2' type="warning" @click="filtTableData(2)">审核中( <span>{{status.checking}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 3' type="success" @click="filtTableData(3)">审核通过( <span>{{status.check_agree}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 4' type="danger" @click="filtTableData(4)">审核驳回( <span>{{status.check_reject}}</span> )</el-button>
                        <el-button size="small" :plain = 'currentStatus !== 5' type="primary" @click="filtTableData(5)">修改中( <span>{{status.modify}}</span> )</el-button>

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

                    <el-table-column type="index" width="60" label="序号"></el-table-column>

                    <!--<el-table-column align="center" type="selection"></el-table-column>-->

                    <el-table-column prop="channel_name" align="center" label="渠道名称"></el-table-column>

                    <el-table-column prop="account_name" label="账户名" align="center"></el-table-column>

                    <el-table-column prop="receipt_account" label="收款账户" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>

                    <el-table-column prop="status_text" label="状态" align="center"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button class="btn-opt" @click="viewCashInfo(scope.$index, scope.row)" v-if="scope.row.status !== 1 && scope.row.status !== 5" type="text" size="small">查看</el-button>
                            <el-button class="btn-opt" @click="editCashInfo(scope.$index, scope.row)" v-if="scope.row.status === 1" type="text" size="small">编辑</el-button>
                            <el-button class="btn-opt" @click="submitCashInfo(scope.$index, scope.row)" v-if="scope.row.status === 1 || scope.row.status === 5" type="text" size="small">提交审核</el-button>
                            <el-button class="btn-opt" @click="modifyCashInfo(scope.$index, scope.row)" v-if="scope.row.status === 3 || scope.row.status === 5" type="text" size="small">修改</el-button>
                            <el-button class="btn-opt" @click="editCashInfo(scope.$index, scope.row)" v-if="scope.row.status === 4" type="text" size="small">重新申请</el-button>
                            <el-button class="btn-opt" type="text" size="mini" v-if="scope.row.status == 1" @click="deleteCashInfo(scope.$index, scope.row)">删除</el-button>
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
            prfClass: 'cash_collection_info_list',
            breadcrumbList: [
                {
                    name: '收款信息',
                    url: ''
                }
            ],
            status: {
                total: 0,
                wait_submit: 0,
                checking: 0,
                check_agree: 0,
                check_reject: 0,
                modify: 0
            },
            tableHeight: 500,
            currentStatus: 0,
            statusTxtArr: ['待提交', '审核中', '审核通过', '审核驳回', '修改中'],
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
            this.$router.push({path: '/add_edit_cash_collection/__new__'})
        },

        // 过滤不同状态的数据
        filtTableData (status) {
            this.currentStatus = status
            this.$store.dispatch('common/receiptStatue', { receipt_statue: status }) // 缓存当前选择的状态

            let tableParams = {
                per_page: this.per_page,
                page: 1,
                status: status,
                channel_name: ''
            }
            this.getTableData(tableParams)
        },

        // 按渠道搜索数据
        searchTableData () {
            let that = this
            let tableParams = {
                per_page: this.per_page,
                page: 1,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            channelApi.getCashTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = _data[i]['is_locked'] === 1 ? '锁定' : that.statusTxtArr[_data[i]['status'] - 1]
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

        getTableData (tableParams) {
            let that = this
            channelApi.getCashTableData(tableParams).then(function (res) {
                if (res.code === 200) {
                    let _data = res.data.data
                    // _data.status = _data.status[util.getCache('dictItem')['status']]
                    for (let i = 0; i < _data.length; i++) {
                        _data[i]['status_text'] = _data[i]['is_locked'] === 1 ? '锁定' : that.statusTxtArr[_data[i]['status'] - 1]
                    }
                    that.tableData = _data
                    that.total = res.data.total
                    that.per_page = res.data.per_page
                } else {
                    that.$alert(res.msg, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                }
            })
        },

        renderTable () {
            let that = this
            let tableParams = {
                per_page: that.per_page,
                page: this.currentPage,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            this.getTableData(tableParams)
        },

        // 每页显示n条数
        handleSizeChange (val) {
            let tableParams = {
                per_page: val,
                page: this.currentPage,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            this.per_page = val
            this.getTableData(tableParams)
        },

        // 分页
        handleCurrentChange (val) {
            let tableParams = {
                per_page: this.per_page,
                page: val,
                status: this.currentStatus,
                channel_name: this.channelName
            }
            this.getTableData(tableParams)
        },

        // 查看收款信息详情
        viewCashInfo (index, row) {
            let url = ['view_cash_collection', 'view_cash_collection', 'cash_collection_rejected'][row.status - 2]
            this.$router.push({ path: url + '/' + row.id })
        },

        // 编辑收款信息
        editCashInfo (index, row) {
            this.$router.push({ path: '/add_edit_cash_collection/' + row.id })
        },

        // 提交收款信息
        submitCashInfo (index, row) {
            let that = this
            that.$confirm('确定要提交该收款信息吗？', '确认信息', {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                channelApi.submitListCashInfo({id: row.id}).then((res) => {
                    if (res.code === 200) {
                        that.$message.success('提交成功！')
                        this.$router.push({ path: 'cash_collection_auditing/' + row.id })
                    } else {
                        that.$alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }
                })
            })
        },

        // 修改收款信息
        modifyCashInfo (index, row) {
            this.$router.push({ path: '/add_edit_cash_collection/' + row.id })
        },

        // 删除收款信息
        deleteCashInfo (index, row) {
            let that = this
            that.$confirm('确定要删除该收款信息吗？', '确认信息', {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                channelApi.deleteCashInfo({id: row.id}).then((res) => {
                    if (res.code === 200) {
                        that.$message.success('删除成功！')
                        that.renderTable()
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

        // 优先加载列表数据
        this.renderTable()

        this.tableHeight = window.innerHeight - 400

        // 来自个人中心的跳转，获取当前查询状态
        that.currentStatus = this.$store.getters['common/getReceiptStatue']

        channelApi.getReceiptsStatusTotal().then(function (res) {
            if (res.code === 200) {
                let data = res.data
                console.log(data, 888888)
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
    $prfClass: 'cash_collection_info_list';
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
                text-align: right;
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
