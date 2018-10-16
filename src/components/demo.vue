<style lang="scss">
    $prfClass: 'tableCls';

    .#{$prfClass} {
        width: 98%;
        margin: 30px auto 0;
        .page{
            margin-top: 10px;
        }
    }
</style>
<template>
    <div class="hello" :class="prfClass">
        <div class="exp"></div>
        <el-form :inline="true" :model="formInline" class="form-inline">
            <el-form-item label="操作时间">
                <el-select v-model="formInline.region" placeholder="添加时间">
                    <el-option label="添加时间" value="1"></el-option>
                    <el-option label="最近更新时间" value="2"></el-option>
                    <el-option label="关闭时间" value="3"></el-option>
                </el-select>
                <el-date-picker
                    v-model="dateDefalut"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="操作人">
                <el-select v-model="userDataModel"
                           style="width:300px"
                           filterable
                           multiple
                           placeholder="请选择">
                    <el-option v-for="(item, index) in userData" :value="index" :label="item" :key="index" ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>

        </el-form>

        <el-table
            :data="tableData"
            border
            stripe
            height="600"
            :class="prfClass"
            @selection-change="handleSelection"
            @cell-dblclick="dbhandle"
            style="width: 100%;">
            <el-table-column
                align="center"
                type="selection"
                width="55">
            </el-table-column>

            <el-table-column
                prop="exception_code"
                align="center"
                label="异常单号"
                width="180">
            </el-table-column>

            <el-table-column
                prop="exception_rank"
                label="异常等级(双击修改)"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span class="rank_span">{{ exception_rank[scope.row.exception_rank] }}</span>
                    <div class="rank_div" style="display: none;">
                        <el-select
                            @change="columnSelectChange(scope.row.exception_rank, scope.row, scope.$index)"
                            v-model="scope.row.exception_rank">
                            <el-option
                                v-for="item in optionsRank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="异常类型"
                width="180">
                <template slot-scope="scope">
                    <span>{{ exception_type[scope.row.exception_type] }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="单据类型"
                width="120">
                <template slot-scope="scope">
                    <span>{{ calc_obj[scope.row.order_type] }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="order_code"
                label="业务单号"
                width="180">
            </el-table-column>

            <el-table-column
                prop="business_type"
                label="业务类型"
                width="120">
            </el-table-column>

            <el-table-column
                label="异常描述"
                width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                        <p>{{ scope.row.exception_describe }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.exception_describe }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                prop="create_man"
                label="添加人"
                width="180">
            </el-table-column>

            <el-table-column
                prop="created_at"
                label="添加时间"
                width="160">
            </el-table-column>

            <el-table-column
                prop="update_man"
                label="最近更新人"
                width="120">
            </el-table-column>

            <el-table-column
                prop="updated_at"
                label="最近更新时间"
                width="180">
            </el-table-column>

            <el-table-column
                prop="close_time"
                label="关闭时间"
                width="180">
            </el-table-column>

            <el-table-column
                prop="deal_period"
                label="处理时效(天)"
                width="120">
            </el-table-column>

            <el-table-column
                prop="deal_man"
                label="处理人"
                width="180">
            </el-table-column>

            <el-table-column
                prop="duty_department"
                label="责任部门"
                width="180">
            </el-table-column>

            <el-table-column
                prop="exception_status"
                label="异常状态"
                width="180">
            </el-table-column>

            <el-table-column
                fixed="right"
                width="400"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                        v-for="(val,index) in scope.row.operate_list"
                        :type="val === '查看'? '': 'primary'"
                        size="mini"
                        :key="index"
                        @click="handleEvent(scope.$index, scope.row, val)">{{ val }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizeArr"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import api from '../api/api'
export default {
    name: 'HelloWorld',
    data () {
        return {
            prfClass: 'tableCls',
            fullscreenLoading: false,
            tableData: [],
            currentPage: 1,
            per_page: 10,
            pageSize: 5,
            total: 0,
            pageSizeArr: [10, 15, 25, 35, 50, 100],
            exception_type: '',
            calc_obj: '',
            exception_rank: '',
            multipleSelection: [],
            is_show_exception_rank: 0,
            optionsRank: [{
                value: '1',
                label: '1级'
            }, {
                value: '2',
                label: '2级'
            }, {
                value: '3',
                label: '3级'
            }, {
                value: '4',
                label: '4级'
            }, {
                value: '5',
                label: '5级'
            }],
            valueRank: '',
            formInline: {
                region: '1'
            },
            dateDefalut: '',
            userData: [],
            userDataModel: []
        }
    },
    mounted () {
        this.msg = 'hello,world'
        $('.exp').text('demo table例子')
        let tableParams = {
            per_page: this.per_page,
            page: this.currentPage
        }
        this.getDictItem()
        // 列表所有下拉数据
        api.getResource({}).then(res => {
            this.calc_obj = res.data.data.calc_obj // 单据类型
            this.exception_rank = res.data.data.exception_rank // 异常等级
            // 异常类型
            this.exception_type = res.data.data.exception_type
            this.getTableData(tableParams)
        }).catch(err => {
            this.$message(err.data)
        })
    },
    methods: {
        getTableData (tableParams = {}) {
            let that = this
            api.getException(tableParams).then(res => {
                let data = res.data.data
                that.total = data.total
                that.tableData = data.data
                $('.hello').find('.rank_div').hide()
                $('.hello').find('.rank_span').show()
            }).catch(err => {
                this.$message(err.msg)
            })
        },
        getDictItem () {
            api.getDictItem({}).then(res => {
                if (res.data.code === 200) {
                    this.userData = res.data.data.logistics_way_code_name
                }
            }).catch(err => {
                this.$message(err.msg)
            })
        },
        handleSizeChange (val) {
            let tableParams = {
                per_page: val,
                page: this.currentPage
            }
            this.per_page = val
            this.getTableData(tableParams)
        },
        handleCurrentChange (val) {
            let tableParams = {
                per_page: this.per_page,
                page: val
            }
            this.getTableData(tableParams)
        },
        handleEvent (index, row, val) {
            console.log(index, row, val)
        },
        handleSelection (val) {
            this.multipleSelection = val
            console.log(this.multipleSelection)
        },
        // 双击事件
        dbhandle (row, column, event) {
            if (column.property && column.property === 'exception_rank') {
                row.exception_rank = row.exception_rank + '级'
                $(event).find('.rank_span').hide()
                $(event).find('.rank_div').show()
            }
        },
        columnSelectChange (val, row, $index) {
            let s = 'dd'
            if (s) {

            }
            console.log(s, val, row, $index)
            $('.hello').find('tr.el-table__row').eq($index).find('.rank_span').show()
            $('.hello').find('tr.el-table__row').eq($index).find('.rank_div').hide()
        }
    }
}
</script>
