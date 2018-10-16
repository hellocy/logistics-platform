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
                    <h3>操作要求</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_opt_requirement">
                    <el-form-item class="min_weight" prop="min_weight">
                        <div class="label-name"><span class="red">*</span>单票最小重量（KG）</div>
                        <el-input placeholder="" v-model="formData.min_weight"></el-input>
                    </el-form-item>
                    <el-form-item class="min_weight" prop="max_weight">
                        <div class="label-name"><span class="red">*</span>单票最大重量（KG）</div>
                        <el-input placeholder="" v-model="formData.max_weight"></el-input>
                    </el-form-item>
                    <el-form-item class="signal-order-min-size">
                        <div class="label-name"><span class="red">*</span>单票最小尺寸（CM）</div>
                        <el-col :span="8">
                            <el-form-item prop="min_length">长:<el-input placeholder="" v-model="formData.min_length"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="min_width">宽:<el-input placeholder="" v-model="formData.min_width"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="min_height">高:<el-input placeholder="" v-model="formData.min_height"></el-input></el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="signal-order-max-size">
                        <div class="label-name"><span class="red">*</span>单票最大尺寸（CM）</div>
                        <el-col :span="8">
                             <el-form-item prop="max_length">长:<el-input placeholder="" v-model="formData.max_length"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="8">
                             <el-form-item prop="max_width">宽:<el-input placeholder="" v-model="formData.max_width"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="8">
                             <el-form-item prop="max_height">高:<el-input placeholder="" v-model="formData.max_height"></el-input></el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="perimeter-calc-formula">
                        <div class="label-name"><span class="red">*</span>周长计算公式</div>
                        <el-form-item prop="perimeter_coeff_length"><el-input placeholder="" v-model="formData.perimeter_coeff_length"></el-input><span>*</span>长 +</el-form-item>
                        <el-form-item prop="perimeter_coeff_width"><el-input placeholder="" v-model="formData.perimeter_coeff_width"></el-input><span>*</span>宽 +</el-form-item>
                        <el-form-item prop="perimeter_coeff_height"><el-input placeholder="" v-model="formData.perimeter_coeff_height"></el-input><span>*</span>高</el-form-item>
                    </el-form-item>
                    <el-form-item class="signal_order_min_weight" prop="max_perimeter">
                        <div class="label-name"><span class="red">*</span>最大周长（CM）</div>
                        <el-input placeholder="" v-model="formData.max_perimeter"></el-input>
                    </el-form-item>
                    <el-form-item class="shipping_type" prop="elec_prod_requires" ref="elecProdRequires">
                        <div class="label-name"><span class="red">*</span>带电产品发货要求</div>
                        <el-select v-model="formData.elec_prod_requires" placeholder="请选择">
                            <el-option
                                v-for="item in elecProdRequiresList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="separate_requires" prop="separate_requires"  v-if="mode_type === 'B2C'">
                        <div class="label-name"><span class="red">*</span>分货要求</div>
                        <el-select v-model="formData.separate_requires" placeholder="请选择">
                            <el-option
                                v-for="item in separateRequiresList"
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
    name: 'form-opt-requirement',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'form-opt-requirement',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            validate: true, // 是否需要校验必填
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                min_weight: null, // 单票最小重量
                max_weight: null, // 单票最大重量
                min_length: null, // 单票最小长度
                min_width: null, // 单票最小宽度
                min_height: null, // 单票最小高
                max_length: null, // 单票最大长度
                max_width: null, // 单票最大宽度
                max_height: null, // 单票最大高
                perimeter_coeff_length: null, // 周长计算公式的长系数
                perimeter_coeff_width: null, // 周长计算公式的宽系数
                perimeter_coeff_height: null, // 周长计算公式的高系数
                max_perimeter: null, // 最大周长
                elec_prod_requires: 0, // 带电产品发货要求
                separate_requires: 0 // 分货要求
            },
            elecProdRequiresList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: '带电不带电混装',
                    value: 1
                },
                {
                    label: '带电不带电分开装箱',
                    value: 2
                },
                {
                    label: '配套电池分开装箱',
                    value: 3
                },
                {
                    label: '纯电池分开装箱',
                    value: 4
                },
                {
                    label: '不同类型都需要分开装箱',
                    value: 5
                }
            ],
            separateRequiresList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: '按产品分货',
                    value: 1
                },
                {
                    label: '按国家分货',
                    value: 2
                },
                {
                    label: '按分区分货',
                    value: 3
                }
            ],
            typeNumber: 2, // 当前第n步
            stepSpace: 66,
            stepTitle: '操作要求', // 当前第n步的标题
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
                    name: '操作要求',
                    url: ''
                }
            ]
        }
    },
    computed: {
        rules () {
            let numRate = (rule, value, callback) => { // 数量输入框 支持四位小数 校验
                let reg = /^\d+(\.\d+)?$/
                if (!reg.test(value) && value) {
                    callback(new Error('请输入数字！'))
                } else if (((String(value).length - String(value).indexOf('.') - 1) > 4) && (String(value).indexOf('.') > 0)) {
                    callback(new Error('最多为4位小数'))
                } else {
                    callback()
                }
            }
            let numRge = (rule, value, callback) => { // 数字必须大于0
                let reg = /^\d+(\.\d+)?$/
                if (reg.test(value) && (value === 0)) {
                    callback(new Error('不能为空'))
                } else {
                    callback()
                }
            }
            return {
                min_weight: [ // 单票最小重量
                    { required: this.validate, message: '请输入单票最小重量', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                max_weight: [ // 单票最大重量
                    { required: this.validate, message: '请输入单票最大重量', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                min_length: [ // 单票最小长度
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                min_width: [ // 单票最小宽度
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                min_height: [ // 单票最小高
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                max_length: [ // 单票最大长度
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                max_width: [ // 单票最大宽度
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                max_height: [ // 单票最大高
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                perimeter_coeff_length: [ // 周长计算公式的长系数
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                perimeter_coeff_width: [ // 周长计算公式的宽系数
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                perimeter_coeff_height: [ // 周长计算公式的高系数
                    { required: this.validate, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                max_perimeter: [ // 最大周长
                    { required: this.validate, message: '请输入最大周长', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                elec_prod_requires: [ // 带电产品发货要求
                    { required: this.validate, message: '请输入带电产品发货要求', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                separate_requires: [ // 按分区分货
                    { required: this.validate, message: '请输入按分区分货', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ]
            }
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
        if (lmpChannelApplicationB2b.operate_require) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.operate_require
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'operate_require'
        util.getNextApi(key, this.status)
        console.log(util.getCache('channelApplication'), 8888888)
    },
    methods: {
        next (formName, save) { // 下一步
            let _self = this
            this.validate = true // 所有的校验必填
            setTimeout(function () {
                _self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                            delete _self.formData.save_as_draft
                        } else {
                            _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
                        }
                        channelApi.operate(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
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
                                data.operate_require = $.extend({}, _self.formData)
                                util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                                util.getNextApi('operate_require', _self.status) // 修改此条数据的状态
                                if (save !== 'save') {
                                    if (_self.mode_type === 'B2B') {
                                        _self.$router.push({path: '/channel_application_ship_requires/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                                    } else { // B2C是跳到操作要求页面
                                        _self.$router.push({path: '/channel_application_operate_require/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                                    }
                                } else { // 保存跳到资料预览页
                                    _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                                }
                            } else {
                                let msgTit = res.msg.split(';')
                                let msgTitle = ''
                                for (let k = 0; k < msgTit.length; k++) {
                                    msgTitle += '<p>' + msgTit[k] + '</p>'
                                }
                                _self.$alert(msgTitle, '提示', {
                                    dangerouslyUseHTMLString: true
                                })
                            }
                        })
                    }
                })
            }, 0)
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            this.validate = false // 所有的校验不需要必填
            setTimeout(function () {
                _self.$refs[formName].validate((valid, object) => {
                    if (((Object.keys(object).length === 1) && object.elec_prod_requires) || valid) { // 判断是不是所有的校验都通过 或者 只有带电产品发货要求校验不通过
                        _self.formData.save_as_draft = 1 // 1是 2否
                        channelApi.operate(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
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
                                data.operate_require = $.extend({}, _self.formData)
                                util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                                util.getNextApi('operate_require', _self.status) // 修改此条数据的状态
                            } else {
                                let msgTit = res.msg.split(';')
                                let msgTitle = ''
                                for (let k = 0; k < msgTit.length; k++) {
                                    msgTitle += '<p>' + msgTit[k] + '</p>'
                                }
                                _self.$alert(msgTitle, '提示', {
                                    dangerouslyUseHTMLString: true
                                })
                            }
                        })
                    }
                })
                _self.$refs['elecProdRequires'].clearValidate() // 去除电产品发货要求的校验
            }, 0)
        },
        prev () { // 上一步
            this.$router.push({ path: '/channel_application_basic/' + this.$route.params.id + '/' + this.mode_type })
        },
        linkBack () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'form-opt-requirement';
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
        .red{
            color:red
        }
        .el-form-item__label{
            color: #2F3032;
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
        .signal-order-min-size, .signal-order-max-size{
            .el-form-item__content{
                .el-form-item__content{
                    width: 132px;
                }
            }
            .el-col{
                float: none;
                display: inline-block;
                width: 126px;
            }
            .el-input{
                width: 96px;
                margin-right:11px;
                margin-left: 7px;
            }
        }
        .perimeter-calc-formula{
            .el-input{
                width: 89px;
                margin-right: 3px;
                margin-left: 3px
            }
        }
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
        }
        .next-form-middle{
            width:720px;
            border-top: 1px solid #F1F1F7;
            padding-top: 40px;
            margin: 40px auto 0;
        }
        .serviceList{
            width: 420px;
            display: inline-block;
            .el-checkbox__label{
                padding-left: 7px;
            }
            .el-checkbox{
                margin-left: 0;
                margin-right: 30px;
                line-height: 20px;
            }
            /*.el-checkbox:nth-child(5n){*/
                /*margin-left: 0px;*/
            /*}*/
        }
        .company_profile{
            width:420px;
            height:80px;
            border-radius:5px;
        }
        .signal-order-min-size .el-form-item__error,.signal-order-max-size .el-form-item__error,.perimeter-calc-formula .el-form-item__error{
            position: absolute;
            margin-left: 45px;
        }
        .perimeter-calc-formula .el-form-item__error{
            margin-left: 22px;
        }
        .el-form-item{
            margin-bottom: 16px;
            display:inline-block;
            .el-form-item__label{
                width:290px;
            }
            .form-item-tip{
                text-align: center;
            }
        }

        .upload-attachment{
            display: inline-block;
            width: 420px;
        }
        .el-upload__tip{
            margin-top: 11px;
            line-height: 0px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #bfc3cb;
        }
        .fileUpload{
            width: 100px;
            height: 32px;
            border-radius: 5px;
            color: #429EFD;
            border: 1px solid #B3D7FE;
            font-weight:400;
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
        .textareaNumber{
            position: absolute;
            left: 675px;
            top: 63px;
            color: #606266;
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
    }
    .fileCls {
        width: 300px;
        .el-message-box__message p{
            font-size: 14px;
        }
    }
</style>
