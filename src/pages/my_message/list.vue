<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-content']">
            <div class="nav">
                <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
            </div>
            <div class="table-content">
                <ul class="top">
                    <li>
                        <div class="left">
                            <h4>账户信息</h4>
                            <el-button type="primary" @click="addAccount()">
                                <i class="el-icon-plus"></i><span class="add-info">添加账户信息</span>
                            </el-button>
                        </div>
                        <div class="right">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item class="account-cls">
                                    <el-input v-model="account" placeholder="收款账户"></el-input>
                                </el-form-item>
                                <el-form-item class="search">
                                    <el-button type="primary" size="small" @click="search('keyword')">搜索</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </li>
                    <li style="display: none;">
                        <div class="left">
                            <el-button type="primary" @click="search(0)" class="all" size="small" :plain = 'is_plain !== 0'>所有
                                (<span class="num">{{allNumber}}</span>)
                            </el-button>
                            <el-button type="warning" @click="search(1)" class="wait" size="small" :plain = 'is_plain !== 1'>待审核
                                (<span class="num">{{wait_audit}}</span>)
                            </el-button>
                            <el-button type="warning" @click="search(2)" class="audit_now" size="small" :plain = 'is_plain !== 2'>审核中
                                (<span class="num">{{audit_now}}</span>)
                            </el-button>
                            <el-button type="success" @click="search(3)" size="small" :plain = 'is_plain !== 3'>已完成
                                (<span class="num">{{already_finish}}</span>)
                            </el-button>
                        </div>
                    </li>
                </ul>
                <div class="table-div">
                    <el-table ref="singleTable"
                              border
                              :data="tableData"
                              :height="tableHeight"
                              highlight-current-row
                              style="width: 100%">
                        <el-table-column type="index" fixed width="50" label="序号"></el-table-column>

                        <el-table-column
                            prop="name"
                            label="账户名">
                        </el-table-column>

                        <el-table-column
                            prop="number"
                            min-width="160"
                            label="收款账户">
                        </el-table-column>

                        <el-table-column
                            prop="currency"
                            label="账户币种">
                            <template slot-scope="scope">
                                <span>{{ currency_type(scope.row.currency) }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="property"
                            label="账户性质">
                            <template slot-scope="scope">
                                <span>{{ property_type(scope.row.property) }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="handling_fee_method"
                            min-width="120"
                            label="手续费承担方式">
                            <template slot-scope="scope">
                                <span>{{ handling_fee_method(scope.row.handling_fee_method) }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="is_entrusted"
                            min-width="120"
                            label="是否委托收款">
                            <template slot-scope="scope">
                                <span>{{ is_entrusted(scope.row.is_entrusted) }}</span>
                            </template>
                        </el-table-column>

                        <!--<el-table-column prop="status"-->
                                         <!--label="账户状态">-->
                            <!--<template slot-scope="scope">-->
                                <!--<span :class="scope.row.status === 3 ? 'cls-1' : 'cls-2'">{{ status_type(scope.row.status) }}</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->

                        <el-table-column
                            fixed="right"
                            prop="operation"
                            label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button class="editCls"
                                           :key="index"
                                           v-for="(item, index) in scope.row.operation"
                                           @click.stop="operationAccount(scope.row, item.type)"
                                           type="text"
                                           size="small">{{ item.name }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="formInline.page"
                        layout="prev, pager, next"
                        :page-size="per_page"
                        :total="totalPage">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import BreadCrumb from '../../components/breadcrumb'
import api from '../../api/myMessage'
import tableApi from '../../api/table'
import util from 'commonVueLib/util/tools'

export default{
    components: {
        CommonHeader,
        BreadCrumb
    },
    data () {
        return {
            prfClass: 'myMessage-List',
            btn_array: ['info', 'warning', 'success'],
            formInline: {
                status: 0, // 状态
                page: 1
            }, // 搜索条件
            is_plain: 0, // 按钮选中 默认是所有
            account: '', // keyword
            per_page: 15, // 每一页的条数，默认为15
            totalPage: 0, // 总页数
            allNumber: 0, // 所有数量
            wait_audit: 0, // 待审核的数量
            audit_now: 0, // 审核中的数量
            already_finish: 0, // 已完成的数量
            tableData: [],
            breadcrumb_list: [
                {
                    name: '账户信息',
                    url: ''
                }
            ],
            tableHeight: 500 // 表格的高度
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
        this.tableHeight = window.innerHeight - 370
    },
    mounted () {
        let _self = this
        _self.getStatistics()
        _self.initTable() // 初始化表格
    },
    computed: {
        // 账户币种
        currency_type () {
            return function (val) {
                if (val === 1) {
                    return '人民币账户'
                } else if (val === 2) {
                    return '外币账户'
                }
            }
        },
        // 账户性质
        property_type () {
            return function (val) {
                if (val === 1) {
                    return '私对公'
                } else if (val === 2) {
                    return '公对公'
                } else if (val === 3) {
                    return '私对私'
                }
            }
        },
        // 手续费承担方式
        handling_fee_method () {
            return function (val) {
                switch (val) {
                case 1:
                    return '承运方'
                case 2:
                    return '托运方'
                case 3:
                    return '双方共同承担'
                default:
                    break
                }
            }
        },
        // 是否委托收款
        is_entrusted () {
            return function (val) {
                if (val === 1) {
                    return '是'
                } else if (val === 2) {
                    return '否'
                }
            }
        },
        // 状态
        status_type () {
            return function (val) {
                if (val === 1) {
                    return '待审核'
                } else if (val === 2) {
                    return '审核中'
                } else if (val === 3) {
                    return '已完成'
                }
            }
        }

    },
    methods: {
        initTable () {
            let _self = this
            tableApi.getTableData('api/receipt_info', { params: _self.formInline }).then((res) => {
                if (res.code === 200) {
                    // 初始化
                    _self.totalPage = res.data.total
                    _self.per_page = res.data.per_page

                    _self.tableData = res.data.data
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(() => {
            })
        },

        // 获取账户统计信息
        getStatistics () {
            let _self = this
            api.getStatistics().then((res) => {
                if (res.code === 200) {
                    let data = res.data
                    data.forEach((val, index) => {
                        // 全部
                        if (val.status === 0) {
                            _self.allNumber = val.count ? val.count : '0'
                        } else if (val.status === 1) { // 待审核
                            _self.wait_audit = val.count ? val.count : '0'
                        } else if (val.status === 2) { // 审核中
                            _self.audit_now = val.count ? val.count : '0'
                        } else if (val.status === 3) { // 已完成
                            _self.already_finish = val.count ? val.count : '0'
                        }
                    })
                } else {
                    _self.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },

        // 添加账户信息
        addAccount () {
            this.$router.push({ path: '/add_account/0/0' })
        },

        // 我的信息
        operationAccount (row, type) {
            let _self = this
            if (type === 'view') { // 查看
                _self.$router.push({ path: '/view_account/' + row.id })
            } else if (type === 'edit') {
                _self.$router.push({ path: '/edit_account/' + row.id + '/0/0' })
            } else if (type === 'delete') { // 删除
                _self.$confirm('是否确认删除该账户信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteAccount({ id: row.id }).then((res) => {
                        if (res.code === 200) {
                            _self.$message({
                                showClose: true,
                                message: '删除成功！',
                                type: 'success'
                            })
                            _self.getStatistics()
                            _self.initTable()
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            })
                        }
                    })
                }).catch(() => {
                    console.log('error')
                })
            }
        },
        search (type) { // 表格搜索
            let _self = this
            let jsonData = {}
            jsonData.page = 1 // 第一页

            if (type === 'keyword') {
                jsonData.keyword = _self.account
            } else {
                _self.formInline.status = type
                jsonData.status = type
                _self.is_plain = type
            }

            tableApi.getTableData('api/receipt_info', {'params': jsonData}).then((res) => {
                // 请求列表的数据
                if (res.code === 200) {
                    _self.totalPage = res.data.total
                    _self.per_page = res.data.per_page

                    _self.formInline.page = res.data.current_page

                    _self.tableData = res.data.data
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },

        // 切换页码
        handleCurrentChange () {
            this.initTable()
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'myMessage-List';
    .#{$prfClass}-content{
        padding: 0 22px 75px;
        margin: 0 auto;
        .nav{
            margin: 10px 0;
            color: #8F9298;
            font-size: 12px;
            i{
                padding:0px 6px;
            }
            .localCls{
                color:#429EFD;
            }
        }
        .table-content{
            background-color: #fff;
            padding: 0 30px;
            .top{
                li{
                    &:first-child{
                        padding: 40px 0 12px 0;
                        /*border-bottom: 1px #F1F1F7 solid;*/
                        display: flex;
                        flex-flow: wrap row;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        .el-button--primary{
                            padding: 12px 17px;
                        }
                    }
                    &:last-child{
                        display: flex;
                        flex-flow: wrap row;
                        padding: 32px 0;
                        overflow: hidden;
                    }
                    h4{
                        display: inline-block;
                        font-size: 16px;
                        color: #2F3032;
                        font-weight:bold;
                        margin: 0 12px 0 0;
                    }
                }
                .add-info{
                    margin-left: 9px;
                    font-size: 14px;
                }
                .left{
                    .el-button+.el-button{
                        margin-left: 8px;
                    }
                    .el-button--primary, .el-button--success{
                        padding: 10px 23px;
                    }
                    .el-button--success{
                        /*border: 1px solid #E5A13E;*/
                    }
                    .num{
                        padding: 0 2px;
                    }
                }
                .right{
                    .account-cls{
                        height: 34px;
                        .el-form-item__content{
                            line-height: 34px;
                        }
                        .el-input__inner{
                            width: 200px;
                            line-height: 34px;
                            height: 34px;
                            vertical-align: middle;
                        }
                    }
                    .el-form-item{
                        vertical-align: middle;
                        margin-left: 8px;
                        margin-right: 0px;
                        margin-bottom: 0px;
                    }
                    .search{
                        .el-button--primary{
                            font-size:14px;
                            padding: 8px 20px;
                        }
                    }
                }
            }
            .table-div{
                .block{
                    text-align: right;
                    .el-pagination{
                        display: inline-block;
                        text-align: right;
                        padding: 10px 0;
                    }
                }
                .el-table .cell span{
                    border: none;
                    /*background-color: #fff;*/
                }
                .editCls span{
                    font-size:14px;
                    color: #429EFD;
                }
                .el-table .cell .cls-1{
                    color: #65C13E;
                }
                .el-table .cell .cls-2{
                    color: #E5A13E;
                }
                .el-button span{
                    text-decoration: underline;
                }
                .el-table__header-wrapper{
                    th,td{
                        color: #2F3032;
                    }
                    th{
                        font-weight: bold
                    }
                }
            }
            .wait, .audit_now{
                .el-button--success{
                    color: #E5A13E;
                }
            }
        }
        .el-table th{
            background:#f1f1f7 !important;
            font-size:14px;
            padding: 16px 0px;
            color:#2F3032;
            font-weight:bold;
        }
        .el-table__fixed-right-patch{
            background-color: #f1f1f7 !important;
        }
    }
</style>
