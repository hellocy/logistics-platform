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
                    <h3>发货要求</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_ship_info">
                    <el-form-item class="is_pobox_supported" prop="is_pobox_supported" v-if="mode_type === 'B2C'">
                        <div class="label-name"><span class="red">*</span>是否支持PO BOX</div>
                        <el-radio-group v-model="formData.is_pobox_supported">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item class="channel_name" prop="decalre_ratio">
                        <div class="label-name"><span class="red">*</span>申报比例（%）</div>
                        <el-input
                            placeholder=""
                            v-model="formData.decalre_ratio"></el-input>
                    </el-form-item>

                    <el-form-item class="business_type" prop="decalre_value_usd_min">
                        <div class="label-name"><span class="red">*</span>最小申报价值（USD）</div>
                        <el-input
                            placeholder=""
                            v-model="formData.decalre_value_usd_min"></el-input><span style="color: #2F3032;"></span>
                    </el-form-item>

                    <el-form-item class="shippping_type" prop="decalre_value_usd_max">
                        <div class="label-name"><span class="red">*</span>最大申报价值（USD）</div>
                        <el-input
                            placeholder=""
                            v-model="formData.decalre_value_usd_max"></el-input><span style="color: #2F3032;"></span>
                    </el-form-item>

                    <div class="next-form-middle"></div>

                    <el-form-item class="has_prohibits" prop="has_prohibits">
                        <div class="label-name"><span class="red">*</span>是否有禁发属性</div>
                        <el-radio-group v-model="formData.has_prohibits" @change="changeProhibits()">
                            <el-radio :label=1>是</el-radio>
                            <el-radio :label=2>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="prohibits_tab" v-if="formData.has_prohibits == 1" prop="prohibited_cates">
                        <div class="prohibits">
                            <div class="left"><span class="red">*</span>禁发属性</div>
                            <div class="right">
                                <ul>
                                    <li :key="index"
                                        v-for="(item, index) in formData.all_prohibites">
                                        <div class="name">{{ item.group_name }}</div>
                                        <el-checkbox-group class="group_list" v-model="formData.prohibited_cates">
                                            <el-checkbox
                                                v-for="(val, idx) in item.products"
                                                :key="idx"
                                                :label="val.id"
                                                class="group_name">
                                                <span v-html=val.name>{{ val.name }}</span>
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-form-item>

                    <div class="next-form-middle"></div>

                    <el-form-item class="mark">
                        <el-input type="textarea"
                                  :rows="3"
                                  class="other_requires"
                                  placeholder="其他规则要求"
                                  v-model="formData.other_requires"></el-input>
                    </el-form-item>

                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('form_ship_info', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button @click="save_draft('form_ship_info', 'draft')" type="primary" class="save" v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" class="last-step" @click="prev()" v-if="status != 5">上一步</el-button>
                        <el-button type="primary" class="next-step" @click="next('form_ship_info', 'next')" v-if="status != 5">下一步</el-button>
                        <a class="link-back" @click="linkBack()">返回</a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import breadcrumb from '../../components/breadcrumb'
import util from 'commonVueLib/util/tools'
import channelApi from '../../api/channel'
export default {
    name: 'channel_application_ship_requires',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        let numRate = (rule, value, callback) => { // 数量输入框 支持四位小数 校验
            let reg = /^\d+(\.\d+)?$/
            if (!reg.test(value)) {
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
            prfClass: 'channel-ship-requires',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                is_pobox_supported: 0, // 是否支持PO BOX
                decalre_ratio: null, // 申报比例
                decalre_value_usd_max: null, // 最大申报价值
                decalre_value_usd_min: null, // 最小申报价值
                has_prohibits: 0, // 是否有禁发属性 1-是，2-否
                prohibited_cates: [], // 禁发属性id列表
                all_prohibites: [], // 所有禁发属性
                other_requires: '' // 其它规则
            },
            rules: {
                is_pobox_supported: [ // 是否支持PO BOX
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                decalre_ratio: [ // 申报比例
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                decalre_value_usd_max: [ // 最大申报价值
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                decalre_value_usd_min: [ // 最小申报价值
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                has_prohibits: [ // 是否有禁发属性
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'blur' }
                ],
                prohibited_cates: [ // 禁发属性不能为空
                    { required: true, message: '禁发属性不能为空', trigger: 'change' }
                ]
            },
            typeNumber: 3, // 当前第n步
            stepSpace: 66,
            stepTitle: '发货要求',
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
                    name: '发货要求',
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
        let _self = this
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.typeNumber = 4
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
        if (lmpChannelApplicationB2b.ship_require) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.ship_require
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'ship_require'
        util.getNextApi(key, this.status)
        if (util.getCache('channelApplication') === 'add') { // 新增时候从接口获取禁发属性的数据
            channelApi.getProhibites().then(function (res) {
                if (res.code === 200) {
                    _self.formData.all_prohibites = res.data
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        }
        console.log(this.formData, '2312')
    },
    methods: {
        prev () { // 上一步
            if (this.mode_type === 'B2C') {
                this.$router.push({ path: '/channel_application_operate_require/' + this.$route.params.id + '/' + this.mode_type })
            } else {
                this.$router.push({ path: '/channel_application_opt_requirement/' + this.$route.params.id + '/' + this.mode_type })
            }
        },
        next (formName, save) { // 下一步
            let _self = this
            let allProhibites = _self.formData.all_prohibites
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                        delete _self.formData.save_as_draft
                    } else {
                        _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
                    }
                    delete _self.formData.all_prohibites
                    channelApi.ship(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
                        if (res.code === 200) {
                            _self.$message({
                                showClose: true,
                                message: '保存成功！',
                                type: 'success'
                            })
                            if (res.data.id) {
                                _self.formData.id = res.data.id // 把后台返回的id替换掉当前的 存起来
                            }
                            _self.status = res.data.status
                            _self.formData.is_done = res.data.is_done
                            util.getNextApi('ship_require', _self.status, 'B2B') // 修改此条数据的状态

                            let data = util.getCache('lmp_channelApplication_data')
                            data.status = res.data.status // 重新改写缓存中整条数据的状态
                            _self.formData.all_prohibites = allProhibites
                            data.ship_require = $.extend({}, _self.formData)
                            util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                            if (save !== 'save') {
                                _self.$router.push({path: '/channel_application_after_service/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                            } else { // 保存跳到资料预览页
                                _self.$router.push({ path: '/channel_application_data/' + _self.$route.params.id + '/edit/' + _self.mode_type })
                            }
                        } else {
                            _self.formData.all_prohibites = allProhibites
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
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            let pass = true
            let decalreRatio = _self.formData.decalre_ratio // 申报比例
            let decalreValueUsdMin = _self.formData.decalre_value_usd_min // 最小申报价值
            let decalreValueUsdMax = _self.formData.decalre_value_usd_max // 最大申报价值
            _self.$refs[formName].clearValidate()
            if (decalreRatio) {
                _self.$refs[formName].validateField('decalre_ratio', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (decalreValueUsdMin) {
                _self.$refs[formName].validateField('decalre_value_usd_min', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (decalreValueUsdMax) {
                _self.$refs[formName].validateField('decalre_value_usd_max', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (pass) {
                _self.formData.save_as_draft = 1 // 1是 2否
                channelApi.ship(util.getCache('channelApplication'), _self.formData, _self.$route.params.id).then(function (res) {
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
                        _self.formData.is_done = res.data.is_done
                        let data = util.getCache('lmp_channelApplication_data')
                        data.status = res.data.status // 重新改写缓存中整条数据的状态
                        data.ship_require = $.extend({}, _self.formData)
                        util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                        util.getNextApi('ship_require', _self.status) // 修改此条数据的状态
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
        },
        linkBack () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        },
        changeProhibits () { // 是否有禁发属性改变时候 清空禁发属性
            this.formData.prohibited_cates = []
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-ship-requires';
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
        .el-form-item__content{
            display: inline-block;

            .el-input{
                width: 380px;
            }

            .label-name{
                color: #2F3032;
                font-family: Microsoft YaHei;
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
            margin-top: 40px;
        }
        .business_type{
            margin-bottom: 30px!important;
        }
        .el-form-item{
            margin-bottom: 16px;
            .el-form-item__label{
                width:290px;
            }
            .form-item-tip{
                text-align: center;
            }
        }
        .prohibits_tab .el-form-item__error{
            margin-left: 183px;
        }
        .el-upload__tip{
            margin-top: 11px;
            line-height: 0px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #bfc3cb;
        }
        .footer{
            margin-top: 30px;
            text-align: center;
            font-family:MicrosoftYaHei;
            .save{
                color: #429EFD;
                background-color: #fff;
                height: 44px;
                border:1px solid rgba(66,158,253,1);
                span{
                    font-size:16px;
                }
            }
            .last-step{
                font-size: 16px;
                margin-left: 12px;
            }
            .next-step{
                font-size: 16px;
                margin-left: 10px;
            }
            .link-back{
                font-size:14px;
                margin-left:10px;
                text-decoration: underline;
                color:#429EFD;
                cursor: pointer;
                &:hover{
                    color:limegreen;
                }
            }
        }
        .mark{
            margin-left: 182px;
        }
        .next-form-middle{
            width:720px;
            border-top: 1px solid #F1F1F7;
            padding-bottom: 30px;
            margin: 0 auto;
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
        .other_requires{
            width:492px;
            height:80px;
            border-radius:5px;
            margin: 0 auto;
        }
        .has_prohibits{
            margin-bottom: 0px;
        }
        .prohibits_tab{
            margin-bottom: 30px;
        }
        // 表格
        .prohibits{
            display: flex;
            width:492px;
            border: 1px solid rgba(219,222,229,1);
            margin-left: 182px;
            align-items: center;
            .left {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
            }
            .right {
                display: flex;
                border-left: 1px solid rgba(219,222,229,1);
                ul {
                    width: 410px;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        display: flex;
                        flex-wrap: nowrap;
                        width: 100%;
                        border-bottom: 1px solid rgba(219,222,229,1);
                        .name{
                            display: flex;
                            width: 60px;
                            justify-content: center;
                            align-items: center;
                            padding: 0px 10px;
                            line-height: 20px;
                            word-break: break-all;
                        }
                        .group_list{
                            display: flex;
                            flex-wrap: wrap;
                            width: 330px;
                            padding: 17px 0px 17px 16px;
                            border-left: 1px solid rgba(219,222,229,1);
                            .el-checkbox{
                                margin-right: 20px;
                            }
                            .el-checkbox+.el-checkbox{
                                margin-left: 0px !important;
                                margin-right: 20px;
                            }
                        }
                    }
                    li:last-child{
                        border: none;
                    }
                }

            }
        }

    }
    .fileCls {
        width: 300px;
        .el-message-box__message p{
            font-size: 14px;
        }
    }
</style>
