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
                    <h3>售后服务</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_service_info">
                    <div class="b2c_show" v-if="mode_type === 'B2C'">
                        <el-form-item class="redelivery_times" prop="redelivery_times">
                            <div class="label-name"><span class="red">*</span>重派送次数</div>
                            <el-input
                                placeholder=""
                                v-model="formData.redelivery_times"></el-input>
                        </el-form-item>
                        <el-form-item class="redelivery_fee" prop="redelivery_fee">
                            <div class="label-name"><span class="red">*</span>重派费用</div>
                            <el-input
                                placeholder=""
                                v-model="formData.redelivery_fee"></el-input>
                        </el-form-item>
                        <el-form-item class="redelivery_fee redelivery_fee_currency" prop="redelivery_fee_currency">
                            <el-select v-model="formData.redelivery_fee_currency" filterable placeholder="请选择">
                                <el-option
                                    v-for="item in currencyList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="return_address" prop="return_address">
                            <div class="label-name"><span class="red">*</span>退件地址</div>
                            <el-input
                                placeholder=""
                                v-model="formData.return_address"></el-input>
                        </el-form-item>
                        <el-form-item class="return_fee" prop="return_fee">
                            <div class="label-name"><span class="red">*</span>退件费用</div>
                            <el-input
                                placeholder=""
                                v-model="formData.return_fee"></el-input>
                        </el-form-item>
                        <el-form-item class="return_fee return_fee_currency" prop="return_fee_currency">
                            <el-select v-model="formData.return_fee_currency" filterable>
                                <el-option
                                    v-for="item in currencyList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="destroy_fee" prop="destroy_fee">
                            <div class="label-name"><span class="red">*</span>销毁费用</div>
                            <el-input
                                placeholder=""
                                v-model="formData.destroy_fee"></el-input>
                        </el-form-item>
                        <el-form-item class="destroy_fee destroy_fee_currency" prop="destroy_fee_currency">
                            <el-select v-model="formData.destroy_fee_currency" filterable>
                                <el-option
                                    v-for="item in currencyList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="is_compensatable" prop="is_compensatable">
                            <div class="label-name"><span class="red">*</span>是否接受赔偿</div>
                            <el-select v-model="formData.is_compensatable">
                                <el-option
                                    v-for="item in isCompensatableList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item class="is_accept_query" prop="is_accept_query">
                        <div class="label-name"><span class="red">*</span>是否接受开查</div>
                        <el-radio-group v-model="formData.is_accept_query" @change="changeAcceptQuery()">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <div class="queryCls" v-if="formData.is_accept_query === 1">
                        <el-form-item class="query_condition" prop="query_condition">
                            <div class="label-name"><span class="red">*</span>受理开查的条件</div>
                            <el-input
                                placeholder=""
                                v-model="formData.query_condition" v-if="formData.is_accept_query === 1" maxlength=100></el-input>
                        </el-form-item>

                        <el-form-item class="query_reply_attachs fileBottom" prop="query_reply_attachs">
                            <div class="label-name"><span class="red">*</span>开查回复时效</div>
                            <el-upload
                                multiple
                                name="files"
                                :uploadName="'query_reply_attachs'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.query_reply_attachs" v-if="formData.is_accept_query === 1">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="mark">
                            <div class="label-name">备注</div>
                            <el-input type="textarea"
                                      :rows="3"
                                      class="remark_textarea"
                                      placeholder=""
                                      v-model="formData.remark"></el-input>
                        </el-form-item>
                    </div>

                    <div class="next-form-middle"></div>

                    <el-form-item class="claim_attachs fileBottom" prop="claim_attachs" v-if="mode_type === 'B2B' || (formData.is_compensatable === 1 && mode_type === 'B2C')">
                        <div class="label-name"><span class="red">*</span>索赔所需资料</div>
                        <el-upload
                            multiple
                            name="files"
                            :uploadName="'claim_attachs'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.claim_attachs">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <!--1-延迟赔付 2-未上网赔付 3-丢失赔付 4-运输破损 5-扣关赔付-->
                    <div class="compensate" :key="idx" v-for="(item, idx) in formData.compensation_rules" v-if="mode_type === 'B2B' || (formData.is_compensatable === 1 && mode_type === 'B2C')">
                        <div class="name" v-if="item.compensate_type == 1"><span>延迟赔付</span></div>
                        <div class="name" v-if="item.compensate_type == 2"><span>未上网赔付</span></div>
                        <div class="name" v-if="item.compensate_type == 3"><span>丢失赔付</span></div>
                        <div class="name" v-if="item.compensate_type == 4"><span>运输破损</span></div>
                        <div class="name" v-if="item.compensate_type == 5"><span>扣关赔付</span></div>
                        <ul>
                            <li>
                                <span class="left"><span class="red">*</span>赔偿标准</span>
                                <el-form-item prop="compensation_rules[0].compensate_standard" v-if="item.compensate_type == 1">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_standard"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[1].compensate_standard" v-else-if="item.compensate_type == 2">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_standard"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[2].compensate_standard" v-else-if="item.compensate_type == 3">
                                     <el-input
                                    placeholder=""
                                    v-model="item.compensate_standard"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[3].compensate_standard" v-else-if="item.compensate_type == 4">
                                     <el-input
                                    placeholder=""
                                    v-model="item.compensate_standard"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[4].compensate_standard" v-else-if="item.compensate_type == 5">
                                     <el-input
                                    placeholder=""
                                    v-model="item.compensate_standard"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <span class="left"><span class="red">*</span>受理期限</span>
                                <el-form-item prop="compensation_rules[0].reception_deadline" v-if="item.compensate_type == 1">
                                    <el-input
                                    placeholder=""
                                    v-model="item.reception_deadline"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[1].reception_deadline" v-else-if="item.compensate_type == 2">
                                    <el-input
                                    placeholder=""
                                    v-model="item.reception_deadline"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[2].reception_deadline" v-else-if="item.compensate_type == 3">
                                    <el-input
                                    placeholder=""
                                    v-model="item.reception_deadline"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[3].reception_deadline" v-else-if="item.compensate_type == 4">
                                    <el-input
                                    placeholder=""
                                    v-model="item.reception_deadline"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[4].reception_deadline" v-else-if="item.compensate_type == 5">
                                    <el-input
                                    placeholder=""
                                    v-model="item.reception_deadline"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <span class="left"><span class="red">*</span>赔偿时效</span>
                                <el-form-item prop="compensation_rules[0].compensate_time" v-if="item.compensate_type == 1">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_time"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[1].compensate_time" v-else-if="item.compensate_type == 2">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_time"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[2].compensate_time" v-else-if="item.compensate_type == 3">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_time"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[3].compensate_time" v-else-if="item.compensate_type == 4">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_time"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[4].compensate_time" v-else-if="item.compensate_type == 5">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_time"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <span class="left"><span class="red">*</span>赔偿方式</span>
                                <el-form-item prop="compensation_rules[0].compensate_method" v-if="item.compensate_type == 1">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_method"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[1].compensate_method" v-if="item.compensate_type == 2">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_method"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[2].compensate_method" v-if="item.compensate_type == 3">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_method"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[3].compensate_method" v-if="item.compensate_type == 4">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_method"></el-input>
                                </el-form-item>
                                <el-form-item prop="compensation_rules[4].compensate_method" v-if="item.compensate_type == 5">
                                    <el-input
                                    placeholder=""
                                    v-model="item.compensate_method"></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </div>

                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('form_service_info', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button @click="save_draft('form_service_info')" type="primary" class="save" v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" class="last-step" @click="prev()" v-if="status != 5">上一步</el-button>
                        <el-button type="primary" class="next-step" @click="next('form_service_info', 'next')" v-if="status != 5">下一步</el-button>
                        <a class="link-back" @click="back">返回</a>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import StepList from '../../components/stepList'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import breadcrumb from '../../components/breadcrumb'
import util from 'commonVueLib/util/tools'
import channelApi from '../../api/channel'
export default {
    name: 'channel_application_after_service',
    components: {
        CommonHeader,
        StepList,
        ImagePreview,
        breadcrumb
    },
    data () {
        let numRate = (rule, value, callback) => { // 数量输入框 支持四位小数 校验
            let reg = /^\d+(\.\d+)?$/
            if (!reg.test(value)) {
                callback(new Error('请输入数字！'))
            } else if (((String(value).length - String(value).indexOf('.') - 1) > 3) && (String(value).indexOf('.') > 0)) {
                callback(new Error('最多为3位小数'))
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
            prfClass: 'channel-after-service',
            mode_type: '', // 类型 B2B B2C
            status: '', // 该条数据的状态
            dictItem: {}, // 所有的下拉
            formData: {
                id: '', // 该条渠道数据的id
                is_done: 2, // 是否已完成 1是 2否
                redelivery_times: null, // 重派次数
                redelivery_fee: null, // 重派费用
                redelivery_fee_currency: '', // 重派费币种用
                return_address: '', // 退件地址
                return_fee: null, // 退件费用
                return_fee_currency: '', // 退件费用币种
                destroy_fee: null, // 销毁费用
                destroy_fee_currency: '', // 销毁费用币种
                is_compensatable: 0, // 是否接受赔偿
                is_accept_query: 0, // 是否接受开查
                query_condition: '', // 受理开查的条件
                query_reply_attachs: [], // 开查回复时效
                remark: '', // 备注
                claim_attachs: [], // 索赔所需资料
                compensation_rules: [ // 1-延迟赔付 2-未上网赔付 3-丢失赔付 4-运输破损 5-扣关赔付
                    {
                        compensate_type: 1,
                        compensate_standard: '',
                        reception_deadline: '',
                        compensate_time: '',
                        compensate_method: ''
                    },
                    {
                        compensate_type: 2,
                        compensate_standard: '',
                        reception_deadline: '',
                        compensate_time: '',
                        compensate_method: ''
                    },
                    {
                        compensate_type: 3,
                        compensate_standard: '',
                        reception_deadline: '',
                        compensate_time: '',
                        compensate_method: ''
                    },
                    {
                        compensate_type: 4,
                        compensate_standard: '',
                        reception_deadline: '',
                        compensate_time: '',
                        compensate_method: ''
                    },
                    {
                        compensate_type: 5,
                        compensate_standard: '',
                        reception_deadline: '',
                        compensate_time: '',
                        compensate_method: ''
                    }
                ]
            },
            // 开查条件数据
            conditionList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '发货后多长时间异常件可提交开查'
                },
                {
                    value: 2,
                    label: '发货后超多长时间后异常件不可开查'
                }
            ],
            currencyList: [],
            isCompensatableList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '是'
                },
                {
                    value: 2,
                    label: '否'
                }
            ],
            rules: {
                redelivery_times: [ // 重派次数
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                redelivery_fee: [ // 重派费用
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                redelivery_fee_currency: [ // 重派费币种用
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                return_address: [ // 退件地址
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                return_fee: [ // 退件费用
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                return_fee_currency: [ // 退件费用币种
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                destroy_fee: [ // 销毁费用
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                destroy_fee_currency: [ // 销毁费用币种
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                is_compensatable: [ // 是否接受赔偿
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                is_accept_query: [ // 是否接受开查
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                query_condition: [ // 受理开查的条件
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                claim_attachs: [ // 索赔所需资料
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                query_reply_attachs: [ // 索赔所需资料
                    { required: true, message: '不能为空', trigger: 'change' }
                ],
                'compensation_rules[0].compensate_standard': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[1].compensate_standard': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[2].compensate_standard': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[3].compensate_standard': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[4].compensate_standard': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[0].reception_deadline': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[1].reception_deadline': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[2].reception_deadline': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[3].reception_deadline': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[4].reception_deadline': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[0].compensate_time': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[1].compensate_time': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[2].compensate_time': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[3].compensate_time': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[4].compensate_time': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[0].compensate_method': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[1].compensate_method': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[2].compensate_method': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[3].compensate_method': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                'compensation_rules[4].compensate_method': [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/files?tag=channel', // 上传api
            typeNumber: 4, // 当前第n步
            stepSpace: 66,
            stepTitle: '售后服务',
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
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
            dataList: {},
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '售后服务',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        let _self = this
        this.formData.id = this.$route.params.id // 获取本条渠道数据的id
        this.mode_type = this.$route.params.mode_type
        // 导航步骤
        if (this.mode_type === 'B2C') { // B2C 有8个步骤
            this.stepSpace = 45
            this.typeNumber = 5
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
        if (lmpChannelApplicationB2b.sale_service) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.sale_service
            for (let i = 0; i < this.formData.query_reply_attachs.length; i++) {
                this.formData.query_reply_attachs[i].name = this.formData.query_reply_attachs[i].origin_name
            }
            for (let i = 0; i < this.formData.claim_attachs.length; i++) {
                this.formData.claim_attachs[i].name = this.formData.claim_attachs[i].origin_name
            }
        }
        this.status = lmpChannelApplicationB2b.status
        // 获取下一步接口判断
        let key = 'sale_service'
        util.getNextApi(key, this.status)
        this.dictItem = util.getCache('dictItem', 'local')
        let currency = this.dictItem.currency
        for (let i = 0; i < currency.length; i++) {
            _self.currencyList.push({
                label: currency[i].name,
                value: currency[i].currency
            })
        }
    },
    methods: {
        // 上传附件
        handleBeforeUpload (file) {
            // 限制大小及格式
            let _self = this
            let oName = file.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let isHas = true
            let tipMessage = ''
            let tArr = 'jpg, png, jpeg, gif, pdf, doc, docx, xls, xlsx'

            if (tArr.indexOf(type) === -1) {
                isHas = false
                tipMessage = '附件格式不对'
            } else if (file.size > 5 * 1024 * 1024) {
                isHas = false
                tipMessage = '附件大小不能超过5M'
            }
            if (!isHas) {
                _self.$confirm(tipMessage, '上传失败', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false,
                    center: true,
                    customClass: 'fileCls'
                }).catch(() => {
                })
                return false
            }
        },
        // 文件上传成功
        uploadSuccess (response, file, fileList, key) {
            let _self = this
            if (response.code === 200) {
                _self.formData[key].push(response.data)
                $('.' + key).find('.el-form-item__error').hide() // 样式
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定'
                })
            }
            // 样式
            $('.' + key).find('.el-form-item__error').hide()
        },
        // 文件上传失败
        uploadError (response, file, fileList) {
            let _self = this
            if (response.message) {
                let data = JSON.parse(response.message)
                _self.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (response.status === 401) {
                            util.removeCache('company_info', 'local') // 删除企业信息
                            _self.$router.push({ path: '/login' })
                        }
                    }
                })
            }
        },
        // 文件移除
        uploadRemove (file, fileList, key) {
            let _self = this
            _self.formData[key] = fileList
            _self.showAndHideUpload(_self.formData[key], key)
        },
        // 隐藏/显示附件校验
        showAndHideUpload (arr, key) {
            console.log(arr, key)
            // 样式
            if (arr.length === 0) {
                $('.' + key).find('.el-form-item__error').show()
            }
        },
        // 预览上传文件
        previewUpload (file) {
            let _self = this
            // 文件格式
            let oName = file.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(file.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = file.url
            }
        },
        changeAcceptQuery () { // 是否接受开查改变时 清空下面的值
            this.formData.query_condition = ''
            this.formData.remark = ''
            this.formData.query_reply_attachs = []
            let _self = this
            setTimeout(function () {
                _self.$refs['form_service_info'].clearValidate('query_condition')
            }, 0)
        },
        next (formName, save) { // 下一步
            let _self = this
            if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                delete _self.formData.save_as_draft
            } else {
                _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
            }
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    let formData = {}
                    let queryReplyAttachs = []
                    let claimAttachsForm = []
                    let ReplyAttachs = _self.formData.query_reply_attachs
                    let claimAttachs = _self.formData.claim_attachs
                    if (ReplyAttachs) {
                        for (let k in ReplyAttachs) {
                            queryReplyAttachs.push(ReplyAttachs[k].id)
                        }
                    }
                    if (claimAttachs.length > 0) {
                        for (let k in claimAttachs) {
                            claimAttachsForm.push(claimAttachs[k].id)
                        }
                    }
                    formData = $.extend({}, _self.formData)
                    formData.query_reply_attachs = queryReplyAttachs
                    formData.claim_attachs = claimAttachsForm
                    channelApi.afterService(util.getCache('channelApplication'), formData, _self.$route.params.id).then(function (res) {
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
                            let data = util.getCache('lmp_channelApplication_data')
                            data.status = res.data.status // 重新改写缓存中整条数据的状态
                            data.sale_service = $.extend({}, _self.formData)
                            util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                            util.getNextApi('sale_service', _self.status) // 修改此条数据的状态
                            if (save !== 'save') {
                                _self.$router.push({path: '/channel_application_pricing_model/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
                            } else { // 保存返回资料预览页
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
        },
        save_draft (formName) { // 保存草稿
            let _self = this
            let pass = true
            _self.$refs[formName].clearValidate()
            _self.formData.save_as_draft = 1 // 是否是草稿 1是 2否
            if (this.formData.redelivery_fee) { // 重派费用不为空时校验
                _self.$refs[formName].validateField('redelivery_fee', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (this.formData.return_fee) { // 退费费用不为空时校验
                _self.$refs[formName].validateField('return_fee', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (this.formData.destroy_fee) { // 销毁费用不为空时校验
                _self.$refs[formName].validateField('destroy_fee', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            let formData = {}
            if (pass) {
                let queryReplyAttachs = []
                let claimAttachsForm = []
                let ReplyAttachs = _self.formData.query_reply_attachs
                let claimAttachs = _self.formData.claim_attachs
                if (ReplyAttachs) {
                    for (let k in ReplyAttachs) {
                        queryReplyAttachs.push(ReplyAttachs[k].id)
                    }
                }
                if (claimAttachs.length > 0) {
                    for (let k in claimAttachs) {
                        claimAttachsForm.push(claimAttachs[k].id)
                    }
                }
                formData = $.extend({}, _self.formData)
                formData.query_reply_attachs = queryReplyAttachs
                formData.claim_attachs = claimAttachsForm
                channelApi.afterService(util.getCache('channelApplication'), formData, _self.$route.params.id).then(function (res) {
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
                        let data = util.getCache('lmp_channelApplication_data')
                        data.status = res.data.status // 重新改写缓存中整条数据的状态
                        data.sale_service = $.extend({}, _self.formData)
                        util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                        util.getNextApi('sale_service', _self.status) // 修改此条数据的状态
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
        prev () { // 上一步
            this.$router.push({ path: '/channel_application_ship_requires/' + this.$route.params.id + '/' + this.mode_type })
        },
        back () { // 返回按钮
            this.$router.push({ path: '/channel_application_data/' + this.$route.params.id + '/edit/' + this.mode_type })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-after-service';
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
        .return_fee,.redelivery_fee,.destroy_fee{
            .el-form-item__error{
                position:absolute;
                left: 235px;
                top: 37px;
            }
        }
        .return_fee_currency,.redelivery_fee_currency,.destroy_fee_currency{
            .el-form-item__error{
                left: 0px;
            }
        }
        .el-upload-list__item-name{
            color: #409eff;
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
                width: 236px;
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
            .el-upload-list{
                width:350px;
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
        .compensate{
            .el-form-item{
                display: inline-block;
            }
            .el-input__inner{
                border: 1px #DBDEE5 solid
            }
        }
        .redelivery_fee,.return_fee,.destroy_fee{
            display: inline-block;
            input,.el-input{
                width:247px;
            }
            .el-select{
                input,.el-input{
                    width: 121px;
                    margin-left: 4px;
                }
            }
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
        .fileBottom{
            margin-bottom: 16px;
            .el-form-item__content{
                line-height: 24px;
            }
        }
        .is_accept_query{
            margin-bottom: 0px;
        }

        // 条件
        .queryCls{
            margin-left: 140px;
            margin-top: 0px;
            margin-bottom: 30px;
            width:619px;
            border:1px solid rgba(219,222,229,1);
            .label-name{
                width: 120px;
                text-align: right;
            }
            .el-input{
                width: 350px;
            }
            .query_condition{
                margin-left: 18px;
                margin-top: 21px;
            }
            .query_reply_attachs, .mark{
                margin-left: 18px;
            }
            .remark_textarea{
                width: 350px;
            }
        }
        .upload-attachment{
            display: inline-block;
        }
        // 表格
        .compensate{
            width:619px;
            border:1px solid rgba(219,222,229,1);
            margin-left: 140px;
            margin-bottom: 8px;
            .name{
                height:40px;
                background:rgba(248,249,250,1);
                border-bottom:1px solid rgba(219,222,229,1);
                font-family:MicrosoftYaHei;
                font-weight:bold;
                color:rgba(47,48,50,1);
                line-height:36px;
                span{
                    padding-left: 34px;
                }
            }
            ul{
                padding-bottom:15px;
                li{
                    height: 40px;
                    line-height: 36px;
                    margin-top:15px;
                    .left{
                        padding-left: 70px;
                        padding-right: 13px;
                        height: 40px;
                        font-size:14px;
                        font-weight:400;
                        color:rgba(47,48,50,1);
                        display: inline-block;
                    }
                }
                li:last-child{
                    border: none;
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
