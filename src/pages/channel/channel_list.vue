<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <section class="breadcrumb-box">
                <section class="breadcrumb-box">
                    <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
                </section>
            </section>
            <div class="main-content-box">
                <section class="table-top-box">
                    <section class="add-wrap">
                        <span class="sub-title">渠道管理</span>
                        <el-button type="primary" icon="el-icon-plus" @click="goToNewChannl" style="width:140px;">渠道申请</el-button>
                    </section>
                    <section class="action-box">
                        <el-button type="primary" :plain = 'is_plain !== 0' @click="changeStatus(0)">所有( <span>{{status.total}}</span> )</el-button>
                        <el-button type="primary" :plain = 'is_plain !== 1' @click="changeStatus(1)">待提交( <span>{{status.wait_submit}}</span> )</el-button>
                        <el-button type="warning" :plain = 'is_plain !== 2' @click="changeStatus(2)">审核中( <span>{{status.checking}}</span> )</el-button>
                        <el-button type="success" :plain = 'is_plain !== 3' @click="changeStatus(3)">审核通过( <span>{{status.check_agree}}</span> )</el-button>
                        <el-button type="danger" :plain = 'is_plain !== 4' @click="changeStatus(4)">审核驳回( <span>{{status.check_reject}}</span> )</el-button>
                        <el-button type="primary" :plain = 'is_plain !== 5' @click="changeStatus(5)">修改中( <span>{{status.modify}}</span> )</el-button>
                        <div class="search-wrap">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="17">
                                    <div class="grid-content bg-purple name-select">
                                        <el-input
                                            placeholder="渠道名称"
                                            v-model="formInline.name"
                                            size="small"
                                            clearable>
                                        </el-input>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-button type="primary" size="small" @click="searchTableData" style="width:70px;">搜索</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </section>
                </section>
                <el-table :data="tableData" border stripe :class="prfClass" :height="tableHeight" style="width: 100%;">
                    <el-table-column type="index" width="60" fixed header-align="center" align="center" label="序号">
                        </el-table-column>
                    <el-table-column prop="channel_name" align="center" label="渠道名称"></el-table-column>
                    <el-table-column prop="transport_type" label="运输方式" align="center">
                        <template slot-scope="scope">{{transport_type_text[scope.row.transport_type]}}</template>
                    </el-table-column>
                    <el-table-column prop="shipping_type" label="发货类型" align="center">
                        <template slot-scope="scope">{{scope.row.shipping_type==1 ? '国内发货' : scope.row.shipping_type==2 ? '海外仓发货' : ''}}</template>
                    </el-table-column>
                    <el-table-column prop="biz_type" label="业务类型" align="center">
                        <template slot-scope="scope">{{scope.row.biz_type==1 ? 'B2B' : 'B2C'}}</template>
                    </el-table-column>
                    <el-table-column prop="delivery_type" label="派送类型" align="center">
                        <template slot-scope="scope">{{dictItem.delivery_type[scope.row.delivery_type]}}</template>
                    </el-table-column>
                    <el-table-column prop="service_type" label="服务类型" align="center">
                        <template slot-scope="scope">{{service_type(scope.row.service_type)}}</template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag
                            :type="status_array[scope.row.status]"
                            disable-transitions>{{status_array_text[scope.row.status]}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button @click="viewChannel(scope.row)" type="text" size="small" v-if="scope.row.status === 2 || scope.row.status === 3 || scope.row.status === 4">查看</el-button>
                            <el-button @click="editChannel(scope.row)" type="text" size="small" v-if="scope.row.status === 1">编辑</el-button>
                            <el-button @click="editChannel(scope.row)" type="text" size="small" v-if="scope.row.status === 3 ||scope.row.status === 5">修改</el-button>
                            <el-button @click="editChannel(scope.row)" type="text" size="small" v-if="scope.row.status === 4">重新申请</el-button>
                            <el-button @click="submitChannel(scope.row)" type="text" size="small" v-if="scope.row.status === 1 ||scope.row.status === 5">提交审核</el-button>
                            <el-button type="text" size="mini" @click="deleteChannel(scope.$index, scope.row)" v-if="scope.row.status === 1">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="formInline.page"
                        layout="prev, pager, next"
                        :page-size="per_page"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import channelApi from '../../api/channel'
import breadcrumb from '../../components/breadcrumb'
import tableApi from '../../api/table'
import util from 'commonVueLib/util/tools'

export default {
    components: {
        CommonHeader,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-list',
            fullscreenLoading: false,
            per_page: 15, // 每一页多少条数据
            total: 0,
            is_plain: 0, // 按钮选中 默认是所有
            dictItem: {}, // 所有的下拉
            status_array: { // 状态 0 所有 1-待提交 2-审核中 3-审核通过 4-审核驳回 5-修改中
                '1': 'primary',
                '2': 'warning',
                '3': 'success',
                '4': 'danger',
                '5': 'info'
            },
            status_array_text: { // 状态 1-待提交 2-审核中 3-审核通过 4-审核驳回 5-修改中
                '1': '待提交',
                '2': '审核中',
                '3': '审核通过',
                '4': '审核驳回',
                '5': '修改中'
            },
            transport_type_text: { // 发货类型 1-空运 2-海运 3-铁运 4-汽运&卡车
                '1': '空运',
                '2': '海运',
                '3': '铁运',
                '4': '汽运&卡车'
            },
            current_status: 0, // 当前的状态 0-所有 1-待提交 2-审核中 3-审核通过 4-审核驳回 5-修改中
            status: {
                total: 0, // 总数量
                modify: 0, // 修改中数量
                checking: 0, // 审核中数量
                check_agree: 0, // 审核通过数量
                check_reject: 0, // 审核驳回数量
                wait_submit: 0 // 待提交数量
            },
            formInline: { // 搜索条件
                name: '',
                page: 1 // 当前页
            },
            tableData: [],
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
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
    created () {
        let _self = this
        let statue = _self.$store.getters['common/getChannelSearchStatue']
        _self.current_status = statue
        _self.is_plain = statue

        channelApi.getStatus().then((res) => { // 渠道列表所有状态获取
            if (res.code === 200) {
                _self.status = res.data
            } else {
                _self.$alert(res.data.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
        })
        tableApi.getTableData('api/channels?status=' + _self.current_status, {'params': _self.formInline}).then((res) => { // 请求渠道列表的数据
            if (res.code === 200 || res.status === 200) {
                _self.tableData = res.data.data
                _self.total = res.data.total
                _self.per_page = res.data.per_page
            } else {
                _self.$alert(res.data.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
        })
        this.dictItem = util.getCache('dictItem', 'local')
        this.tableHeight = window.innerHeight - 400
    },
    methods: {
        goToNewChannl () { // 渠道申请
            this.$router.push({path: '/channel_application_data_select'})
        },
        viewChannel (row) {
            if (row.status === 2) { // 审核中 跳到审核中页面
                this.$router.push({ path: '/channel_audit_now/' + row.id + '/' + this.dictItem.biz_type[row.biz_type] })
            } else if (row.status === 3) { // 审核通过 跳到资料预览页
                this.$router.push({ path: '/channel_application_data/' + row.id + '/view' + '/' + this.dictItem.biz_type[row.biz_type] })
            } else if (row.status === 4) { // 驳回 跳到审核驳回页面
                this.$router.push({ path: '/channel_audit_reject/' + row.id + '/' + this.dictItem.biz_type[row.biz_type] })
            }
        },
        editChannel (row) { // 编辑 跳到资料预览页
            this.$router.push({ path: '/channel_application_data/' + row.id + '/edit' + '/' + this.dictItem.biz_type[row.biz_type] })
        },
        deleteChannel (index, row) { // 删除数据
            let _self = this
            channelApi.deleteChannel({'params': {'id': row.id}}).then((res) => {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '删除成功！',
                        type: 'success'
                    })
                    tableApi.getTableData('api/channels?status=' + _self.current_status, {'params': _self.formInline}).then((res) => { // 请求渠道列表的数据
                        if (res.code === 200) {
                            _self.tableData = res.data.data
                            _self.total = res.data.total
                            _self.per_page = res.data.per_page
                        } else {
                            _self.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                } else {
                    _self.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        submitChannel (row) { // 提交数据
            let _self = this
            channelApi.submitChannel(row.id).then(function (res) {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '提交成功！',
                        type: 'success'
                    })
                    _self.$router.push({ path: '/channel_audit_now/' + row.id + '/' + _self.dictItem.biz_type[row.biz_type] }) // 提交成功之后跳转审核提示页面
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        searchTableData () { // 搜索
            let _self = this
            _self.formInline.page = 1
            tableApi.getTableData('api/channels?status=' + _self.current_status, {'params': _self.formInline}).then((res) => { // 请求渠道列表的数据
                if (res.code === 200) {
                    _self.tableData = res.data.data
                    _self.total = res.data.total
                    _self.per_page = res.data.per_page
                } else {
                    _self.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        handleCurrentChange (val) { // 分页
            let _self = this
            tableApi.getTableData('api/channels?status=' + _self.current_status, {'params': _self.formInline}).then((res) => { // 请求渠道列表的数据
                if (res.code === 200) {
                    _self.tableData = res.data.data
                    _self.total = res.data.total
                    _self.per_page = res.data.per_page
                } else {
                    _self.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        changeStatus (val) { // 针对状态的搜索
            let _self = this
            _self.formInline.page = 1
            _self.is_plain = val

            this.$store.dispatch('common/updataChannelSearch', { channel_search_statue: val }) // 缓存当前选择的状态

            tableApi.getTableData('api/channels?status=' + val, {'params': _self.formInline}).then((res) => { // 请求渠道列表的数据
                if (res.code === 200) {
                    _self.tableData = res.data.data
                    _self.total = res.data.total
                    _self.per_page = res.data.per_page
                    _self.current_status = val
                } else {
                    _self.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        service_type (val) { // 清关类型转换
            let service = []
            let _self = this
            for (let i = 0; i < val.length; i++) {
                service.push(_self.dictItem.service_type[val[i]])
            }
            return service.join(',')
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-list';
    .#{$prfClass}-wrap{
        margin:0 20px;
        font-family: MicrosoftYaHei;
        .breadcrumb-box{
            margin-top: 10px;
        }
        .main-content-box{
            background: #fff;
            padding:20px;
            margin-top:10px;
            table th{
                color: #2F3032;
                font-weight: bold;
                background-color:#f1f1f7 !important;
                font-size: 14px;
                padding: 16px 0px;
            }
            .name-select{
                width: 200px;
                margin-right: 15px;
                input{
                    height: 34px;
                    line-height: 34px;
                }
            }
            .action-box button{
                width: 100px;
                height: 34px;
                line-height: 11px;
                padding: 0;
                font-size: 12px;
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

            }
            .action-box{
                margin:30px 0;
                .el-tag{
                    margin-right: 3px;
                }
            }
            .search-wrap{
                float:right;
            }
            .page{
                text-align: right;
                margin:20px;
            }
            table{
                .el-tag{
                    border: none;
                    background-color: transparent;
                    font-size: 14px;
                }
                .el-button--text{
                    text-decoration: underline;
                    font-size: 14px;
                }
            }
        }
    }

</style>
