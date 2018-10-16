<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div :class="[prfClass + '-wrap']">
            <step-list :type="typeNumber"
                       :title="stepTitle"
                       :stepSpace="stepSpace"
                       :stepCount="stepCount"></step-list>
            <div :class="[prfClass + '-form']">
                <div class="info">
                    <h3>数据要求</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_opt_requirement">
                    <el-form-item class="track_no_get_type" prop="track_no_get_type">
                        <div class="label-name"><span class="red">*</span>跟踪号获取方式</div>
                        <el-select v-model="formData.track_no_get_type" placeholder="请选择">
                            <el-option
                                v-for="item in trackNoGetTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  class="track_no_rules" v-for="(track_no_rules, index) in formData.track_no_rules" :key="track_no_rules.key" :prop="'track_no_rules.' + index + '.rule'"
                        :rules="{ required: true, message: '物流跟踪号规则不能为空', trigger: 'blur'}">
                        <div class="label-name"><span class="red">*</span>物流跟踪号规则{{index + 1}}</div>
                        <el-input v-model="track_no_rules.rule" placeholder="#代表字母，*代表数字"></el-input><span @click.prevent="removeTrackNoRules(track_no_rules)" class="remove el-icon-delete" v-if="index>0"></span>
                    </el-form-item>
                    <el-form-item class="addTrackNo">
                        <el-button @click="addTrackNo" type="primary" plain>新增一行</el-button>
                    </el-form-item>
                    <el-form-item class="print_spec" prop="print_spec">
                        <div class="label-name"><span class="red">*</span>邮递标签打印规格</div>
                        <el-select v-model="formData.print_spec" placeholder="请选择">
                            <el-option
                                v-for="item in printSpecList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="couplet_type" prop="couplet_type">
                        <div class="label-name"><span class="red">*</span>邮递标签联数</div>
                        <el-select v-model="formData.couplet_type" placeholder="请选择">
                            <el-option
                                v-for="item in coupletTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('form_opt_requirement', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button @click="save_draft('form_opt_requirement')" type="primary" class="save" v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" @click="prev()" v-if="status != 5">上一步</el-button>
                        <el-button type="primary" @click="next('form_opt_requirement')" v-if="status != 5">下一步</el-button>
                        <a class="link-back" @click="linkBack()">返回</a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import channelApi from '../../api/channel'
import breadcrumb from '../../components/breadcrumb'
import StepList from '../../components/stepList'
import util from 'commonVueLib/util/tools'
export default {
    name: 'operate-require',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        let numRge = (rule, value, callback) => { // 数字必须大于0
            let reg = /^\d+(\.\d+)?$/
            if (reg.test(value) && (value === 0)) {
                callback(new Error('不能为空'))
            } else {
                callback()
            }
        }
        return {
            prfClass: 'operate-require',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                track_no_get_type: 0, // 跟踪号获取方式
                track_no_rules: [{rule: ''}], // 跟踪号规则
                print_spec: 0, // 邮递标签打印规格
                couplet_type: 0 // 邮递标签联数
            },
            trackNoGetTypeList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: 'API获取',
                    value: 1
                },
                {
                    label: '内部用号',
                    value: 2
                },
                {
                    label: '预存',
                    value: 3
                },
                {
                    label: '面单中',
                    value: 4
                },
                {
                    label: '无跟踪号',
                    value: 5
                }
            ],
            printSpecList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: 'A4',
                    value: 1
                },
                {
                    label: '10*10',
                    value: 2
                },
                {
                    label: '10*16.5',
                    value: 3
                },
                {
                    label: '10*20',
                    value: 4
                },
                {
                    label: '23*12.7',
                    value: 5
                }
            ],
            coupletTypeList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: '一联',
                    value: 1
                },
                {
                    label: '二联',
                    value: 2
                },
                {
                    label: '三联',
                    value: 3
                }
            ],
            rules: {
                track_no_get_type: [ // 跟踪号获取方式
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                print_spec: [ // 跟踪号获取方式
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                couplet_type: [ // 跟踪号获取方式
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ]
            },
            typeNumber: 3, // 当前第n步
            stepTitle: '数据要求', // 当前第n步的标题
            stepSpace: 66,
            stepCount: [ // 步骤定义
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '发货要求'
                }, {
                    index: 4,
                    title: '售后服务'
                }, {
                    index: 5,
                    title: '计费模式'
                }, {
                    index: 6,
                    title: '附件上传'
                }, {
                    index: 7,
                    title: '审核查询'
                }
            ],
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '数据要求',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        this.formData.id = this.$route.params.id // 获取本条渠道数据的id
        this.mode_type = this.$route.params.mode_type
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.stepCount = [
                {
                    index: 1,
                    title: '基础资料'
                }, {
                    index: 2,
                    title: '操作要求'
                }, {
                    index: 3,
                    title: '数据要求'
                }, {
                    index: 4,
                    title: '发货要求'
                }, {
                    index: 5,
                    title: '售后服务'
                }, {
                    index: 6,
                    title: '计费模式'
                }, {
                    index: 7,
                    title: '附件上传'
                }, {
                    index: 8,
                    title: '审核查询'
                }
            ]
        }
        let lmpChannelApplicationB2b = util.getCache('lmp_channelApplication_data')
        if (lmpChannelApplicationB2b.data_require) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.data_require
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'data_require'
        util.getNextApi(key, this.status, 'B2B')
        console.log(util.getCache('channelApplication'), 8888888)
    },
    methods: {
        next (formName, save) { // 下一步
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                        delete _self.formData.save_as_draft
                    } else {
                        _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
                    }
                    console.log(_self.formData, 88888888888)
                    channelApi.dataRequire(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
                        if (res.code === 200) {
                            _self.$message({
                                showClose: true,
                                message: '保存成功！',
                                type: 'success'
                            })
                            if (res.data.id) {
                                _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                            }
                            _self.formData.is_done = res.data.is_done
                            _self.status = res.data.status
                            let data = util.getCache('lmp_channelApplication_data')
                            data.status = res.data.status // 重新改写缓存中整条数据的状态
                            data.data_require = $.extend({}, _self.formData)
                            util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                            util.getNextApi('data_require', _self.status) // 修改此条数据的状态
                            if (save !== 'save') {
                                if (_self.mode_type === 'B2B') {
                                    _self.$router.push({path: '/channel_application_ship_requires/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                                } else {
                                    _self.$router.push({path: '/channel_application_ship_requires/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                                }
                            } else { // 保存返回资料预览页
                                _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                            }
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                }
            })
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            _self.formData.save_as_draft = 1 // 1是 2否
            channelApi.dataRequire(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '保存草稿成功！',
                        type: 'success'
                    })
                    if (res.data.id) {
                        _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                    }
                    _self.status = res.data.status
                    let data = util.getCache('lmp_channelApplication_data')
                    data.status = res.data.status // 重新改写缓存中整条数据的状态
                    data.data_require = $.extend({}, _self.formData)
                    util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                    util.getNextApi('data_require', _self.status) // 修改此条数据的状态
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        prev () { // 上一步
            this.$router.push({ path: '/channel_application_opt_requirement/' + this.$route.params.id + '/' + this.mode_type })
        },
        linkBack () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        },
        addTrackNo () { // 新增物流跟踪规则
            this.formData.track_no_rules.push({
                rule: ''
            })
        },
        removeTrackNoRules (item) { // 移除物流跟踪规则
            var index = this.formData.track_no_rules.indexOf(item)
            if (index !== 0) {
                this.formData.track_no_rules.splice(index, 1)
            }
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'operate-require';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
    }
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 120px;
        background-color: #fff;
        height: auto;
        padding-bottom: 58px;
        .info{
            padding-top: 40px;
            margin: 0px 91px 0px 89px;
            border-bottom: 1px solid #F1F1F7;
            width:720px;
            h3{
                color: #2F3032;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight:bold;
                padding-bottom: 11px;
            }
        }
        .formInfo{
            margin-top: 60px;
            .el-form-item{
                margin-bottom: 16px;
                display:inline-block;
                .el-form-item__label{
                    width:290px;
                    color: #2F3032;
                }
                .form-item-tip{
                    text-align: center;
                }
                .el-form-item__content{
                    display: inline-block;
                    .el-input, .el-textarea{
                        width: 380px;
                    }
                    .label-name{
                        font-family: Microsoft YaHei;
                        color: #2F3032;
                        font-weight:400;
                        width: 290px;
                        display: inline-block;
                        text-align: right;
                        font-size: 14px;
                        line-height: 36px;
                        padding: 0 11px 0 0;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        vertical-align: top;
                    }
                    .line{
                        text-align: center;
                    }
                    .el-button--primary{
                        height:44px;
                        width: 160px;
                    }
                }
            }
            .red{
                color:red
            }
            .track_no_rules{
                position: relative;
                input{
                    width: 385px;
                    padding-right: 32px;
                }
                .remove{
                    position: absolute;
                    left: 654px;
                    top: 12px;
                    font-size: 18px;
                    cursor: pointer
                }
            }
            .addTrackNo{
                border-bottom: 1px #F1F1F7 solid;
                width: 720px;
                margin: 0 91px 0 89px;
                margin-bottom: 30px;
                button{
                    display: block;
                    margin-left: 202px;
                    width: 100px !important;
                    height: 32px !important;
                    line-height: 9px;
                    margin-bottom: 30px;
                }
            }
        }
        .footer{
            margin-top: 40px;
            display: inline-block;
            width: 100%;
            text-align: center;
            .save{
                color: #429EFD;
                border: 1px solid #B3D7FE;
                background-color: #fff;
            }
            button:first-child{
                margin-right: 12px;
            }
            .link-back{
                margin-left:10px;
                text-decoration: underline;
                color:#429EFD;
                cursor: pointer;
            }
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
    }
</style>
