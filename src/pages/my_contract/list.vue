<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-content']">
            <div class="table-content">
                <ul class="top">
                    <li>
                        <h4>我的合同</h4>
                        <el-button type="primary" @click="add()" class="add-info">上传合同
                        </el-button>
                    </li>
                    <li>
                        <div class="left">
                            <el-button type="primary" @click="search(0)" class="all" size="small" :plain = 'is_plain !== 0'>所有
                                (<span class="num">{{allNumber}}</span>)
                            </el-button>
                            <el-button type="primary" @click="search(1)" class="wait" size="small" :plain = 'is_plain !== 1'>待提交
                                (<span class="num">{{wait_submit}}</span>)
                            </el-button>
                            <el-button type="warning" @click="search(2)" size="small" :plain = 'is_plain !== 2'>审核中
                                (<span class="num">{{audit_now}}</span>)
                            </el-button>
                            <el-button type="success" @click="search(3)" size="small" :plain = 'is_plain !== 3'>审核通过
                                (<span class="num">{{already_finish}}</span>)
                            </el-button>
                            <el-button type="danger" @click="search(4)" size="small" :plain = 'is_plain !== 4'>审核驳回
                                (<span class="num">{{check_reject}}</span>)
                            </el-button>
                        </div>
                        <div class="right">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item class="account-cls">
                                    <el-input v-model="formInline.channel_name" placeholder="渠道名称"></el-input>
                                </el-form-item>
                                <el-form-item class="search">
                                    <el-button type="primary" size="small" @click="search()">搜索</el-button>
                                </el-form-item>
                            </el-form>
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
                        <el-table-column type="index" fixed width="80" label="序号"></el-table-column>

                        <el-table-column
                            prop="type_txt"
                            label="合同框架类型">
                            <template slot-scope="scope">
                                <span>{{ scope.row.type_txt }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="main_attach"
                            min-width="160"
                            label="框架合同附件名称">
                            <template slot-scope="scope">
                                <a href="javascript:;"
                                    @click="preview(scope.row.main_attach[0], 'main_attach')"
                                    :data-url="scope.row.main_attach[0] ? scope.row.main_attach[0].url : ''" class="main_attach">
                                    <i class="el-icon-document"></i>
                                    {{scope.row.main_attach[0] ? scope.row.main_attach[0].origin_name : ''}}
                                </a>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="start_at"
                            label="合同生效时间">
                        </el-table-column>

                        <el-table-column
                            prop="end_at"
                            label="合同截止时间">
                        </el-table-column>

                        <el-table-column
                            prop="status"
                            label="状态"
                            >
                            <template slot-scope="scope" >
                                <span :class="status_class[scope.row.status-1]">{{ status_dict[scope.row.status] }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            fixed="right"
                            prop="operations"
                            label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button class="editCls"
                                           :key="index"
                                           v-for="(item, index) in scope.row.operations"
                                           @click.stop="operationContract(scope.row, item.type)"
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
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import api from '../../api/personal'
import tableApi from '../../api/table'
import breadcrumb from '../../components/breadcrumb'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import util from 'commonVueLib/util/tools'

export default{
    components: {
        CommonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'contract-list',
            showPreview: false, // 显示图片预览窗口
            srcs: '',
            formInline: {
                status: 0, // 状态
                channel_name: '', // 渠道名称
                page: 1
            }, // 搜索条件
            is_plain: 0, // 按钮选中 默认是所有
            per_page: 15, // 每一页的条数，默认为15
            totalPage: 0, // 总页数
            allNumber: 0, // 所有数量
            wait_submit: 0, // 待提交的数量
            audit_now: 0, // 审核中的数量
            already_finish: 0, // 审核通过数量
            check_reject: 0, // 审核驳回数量
            tableData: [],
            status_dict: [], // 状态
            status_class: ['', 'audit_now', 'already_finish', 'check_reject'], // 状态对应的class 来控制不同的颜色
            breadcrumbList: [ // 面包屑
                {
                    name: '我的合同',
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
    mounted () {
        let _self = this
        _self.getStatistics()
        _self.initTable() // 初始化表格
    },
    computed: {
    },
    created () {
        this.tableHeight = window.innerHeight - 370
    },
    methods: {
        initTable () {
            let _self = this
            tableApi.getTableData('api/contract', { params: _self.formInline }).then((res) => {
                if (res.code === 200) {
                    // 初始化
                    _self.totalPage = res.data.list.total
                    _self.per_page = res.data.list.per_page
                    _self.tableData = res.data.list.data
                    _self.status_dict = res.data.status_dict
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

        // 获取合同统计信息
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
                            _self.wait_submit = val.count ? val.count : '0'
                        } else if (val.status === 2) { // 审核中
                            _self.audit_now = val.count ? val.count : '0'
                        } else if (val.status === 3) { // 审核通过
                            _self.already_finish = val.count ? val.count : '0'
                        } else if (val.status === 4) { // 审核驳回
                            _self.check_reject = val.count ? val.count : '0'
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

        // 添加我的合同
        add () {
            this.$router.push({ path: '/contract_add' })
        },

        // 操作
        operationContract (row, type) {
            let _self = this
            if (type === 'view') { // 查看
                if (row.status === 4) { // 审核驳回 跳审核驳回页面
                    _self.$router.push({path: '/contract_audit/' + row.id + '/' + row.status})
                } else if (row.status === 2 || row.status === 3) { // 审核中 审核通过 跳转到详情页
                    _self.$router.push({ path: '/contract_view/' + row.id })
                }
            } else if (type === 'edit') {
                _self.$router.push({ path: '/contract_edit/' + row.id })
            } else if (type === 'addition') {
                _self.$router.push({ path: '/contract_addition/' + row.id })
            } else if (type === 'delete') { // 删除
                _self.$confirm('是否确认删除该合同?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteContract(row.id).then((res) => {
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
            } else if (type === 'submit') { // 提交
                api.submitContract(row.id).then((res) => {
                    if (res.code === 200) {
                        _self.$message({
                            showClose: true,
                            message: '提交成功！',
                            type: 'success'
                        })
                        _self.$router.push({path: '/contract_audit/' + row.id + '/' + row.status}) // 提交成功之后跳转到审核中页面
                    } else {
                        _self.$alert(res.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        })
                    }
                })
            }
        },
        search (type) { // 表格搜索
            let _self = this
            _self.formInline.page = 1 // 第一页
            if (type !== undefined) {
                _self.formInline.status = type
                _self.is_plain = type
            }
            tableApi.getTableData('api/contract', {'params': _self.formInline}).then((res) => {
                // 请求列表的数据
                if (res.code === 200) {
                    _self.totalPage = res.data.list.total
                    _self.per_page = res.data.list.per_page
                    _self.tableData = res.data.list.data
                    _self.formInline.page = res.data.list.current_page
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
        },
        // 预览图片
        preview (item) {
            let _self = this
            // 文件格式
            let oName = item.origin_name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(item.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = item.url
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'contract-list';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px 12px;
        }
    }
    .#{$prfClass}-content{
        padding: 0 22px 75px;
        margin: 0 auto;
        .nav{
            margin: 12px 0;
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
                        border-bottom: 1px #F1F1F7 solid;
                        .el-button--primary{
                            padding: 12px 17px;
                        }
                    }
                    &:last-child{
                        display: flex;
                        flex-flow: wrap row;
                        justify-content:space-between;
                        padding: 32px 0;
                        overflow: hidden;
                    }
                    h4{
                        display: inline-block;
                        font-size: 16px;
                        color: #2F3032;
                        font-weight:bold;
                    }
                }
                .add-info{
                    margin-left: 13px;
                    font-size: 14px;
                    width: 108px;
                }
                .left{
                    .el-button+.el-button{
                        margin-left: 8px;
                    }
                    .el-button--primary, .el-button--success{
                        padding: 10px 23px;
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
                .main_attach{
                    color: #429EFD;
                }
                .audit_now{
                    color: #E5A13E;
                }
                .already_finish{
                    color: #5daf34;
                }
                .check_reject{
                    color: #f56c6c
                }
                .el-table .cell span{
                    border: none;
                    /*background-color: #fff;*/
                }
                .editCls span{
                    font-size:14px;
                    color: #429EFD;
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
