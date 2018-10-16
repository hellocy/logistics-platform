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
                    <h3>基础信息</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="rules">
                    <el-form-item class="channel_name" prop="channel_name">
                        <div class="label-name"><span class="red">*</span>渠道名称</div>
                        <el-input
                            placeholder=""
                            v-model="formData.channel_name"></el-input>
                    </el-form-item>

                    <el-form-item class="shipping_type" prop="shipping_type">
                        <div class="label-name"><span class="red">*</span>发货类型</div>
                        <el-select v-model="formData.shipping_type" placeholder="请选择">
                            <el-option
                                v-for="item in shipppingTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="biz_type" prop="biz_type">
                        <div class="label-name"><span class="red">*</span>业务类型</div>
                        <el-select v-model="formData.biz_type" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in businessTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="delivery_type" prop="delivery_type">
                        <div class="label-name"><span class="red">*</span>派送类型</div>
                        <el-select v-model="formData.delivery_type" @change="changeDeliveryType()">
                            <el-option
                                v-for="item in sendTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="service_type" class="service_type">
                        <div class="label-name"><span class="red">*</span>服务类型</div>
                        <el-checkbox-group class="serviceList" v-model="formData.service_type">
                            <el-checkbox label="1" :disabled="first_disabled">揽收</el-checkbox>
                            <el-checkbox label="2" :disabled="first_disabled">仓库操作</el-checkbox>
                            <el-checkbox label="3" :disabled="is_disabled">报关</el-checkbox>
                            <el-checkbox label="4" :disabled="is_disabled">过港</el-checkbox>
                            <el-checkbox label="5" :disabled="is_disabled">国际运输</el-checkbox>
                            <el-checkbox label="6" :disabled="is_disabled">清关</el-checkbox>
                            <el-checkbox label="7" :disabled="is_disabled">本地送仓</el-checkbox>
                            <el-checkbox label="8" v-if="(mode_type === 'B2C') && (formData.delivery_type !== 2)" :disabled="last_disabled">尾程派送</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item class="transport_type" prop="transport_type">
                        <div class="label-name"><span class="red">*</span>运输方式</div>
                        <el-select v-model="formData.transport_type" placeholder="请选择">
                            <el-option
                                v-for="item in transportTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="service_region" prop="service_region">
                        <div class="label-name"><span class="red">*</span>服务区域</div>
                        <el-select v-model="formData.service_region" placeholder="请选择">
                            <el-option
                                v-for="item in areaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  class="is_trackable" prop="is_trackable">
                        <div class="label-name"><span class="red">*</span>是否可跟踪</div>
                        <el-radio-group v-model="formData.is_trackable" @change="changeUrl()">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item class="track_url" prop="track_url" v-if="formData.is_trackable === 1">
                        <div class="label-name"><span class="red">*</span>查询网址</div>
                        <el-input
                            placeholder=""
                            v-model="formData.track_url"></el-input>
                    </el-form-item>

                    <el-form-item class="transform_time time_tit">
                        <div class="label-name"><span class="red">*</span>运输时效</div>
                        <el-col :span="9">
                            <el-form-item prop="transport_time_min">
                                <el-input v-model="formData.transport_time_min" style="width: 100%;" @blur="validateTimeBlur('transport_time_max')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="9">
                            <el-form-item prop="transport_time_max">
                                <el-input v-model="formData.transport_time_max" style="width: 100%;" @blur="validateTimeBlur('transport_time_min')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="form-item-tip">
                            工作日
                        </el-col>
                    </el-form-item>

                    <el-form-item class="transport_time_rate" prop="transport_time_rate">
                        <div class="label-name"><span class="red">*</span>运输时效达标率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.transport_time_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item class="online_time time_tit">
                        <div class="label-name"><span class="red">*</span>上网时效</div>
                        <el-col :span="9">
                            <el-form-item prop="online_time_min">
                                <el-input v-model="formData.online_time_min" style="width: 100%;" @blur="validateTimeBlur('online_time_max')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="9">
                            <el-form-item prop="online_time_max">
                                <el-input v-model="formData.online_time_max" style="width: 100%;" @blur="validateTimeBlur('online_time_min')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="form-item-tip">
                            工作日
                        </el-col>
                    </el-form-item>

                    <el-form-item class="online_time_rate" prop="online_time_rate">
                        <div class="label-name"><span class="red">*</span>上网达标率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.online_time_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item class="clearance_time time_tit" v-if="mode_type === 'B2B'">
                        <div class="label-name"><span class="red">*</span>清关时效</div>
                        <el-col :span="9">
                            <el-form-item prop="clearance_time_min">
                                <el-input v-model="formData.clearance_time_min" style="width: 100%;" @blur="validateTimeBlur('clearance_time_max')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="9">
                            <el-form-item prop="clearance_time_max">
                                <el-input v-model="formData.clearance_time_max" style="width: 100%;" @blur="validateTimeBlur('clearance_time_min')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="form-item-tip">
                            工作日
                        </el-col>
                    </el-form-item>
                    <el-form-item class="clearance_time_rate" prop="clearance_time_rate" v-if="mode_type === 'B2B'">
                        <div class="label-name"><span class="red">*</span>清关时效达标率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.clearance_time_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item class="deducation_time_rate" prop="complaint_rate" v-if="mode_type === 'B2C'">
                        <div class="label-name"><span class="red">*</span>投诉率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.complaint_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item class="deducation_time_rate" prop="deducation_time_rate">
                        <div class="label-name"><span class="red">*</span>扣关率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.deducation_time_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item class="pod_return_time time_tit" v-if="mode_type === 'B2B'">
                        <div class="label-name"><span class="red">*</span>POD返回时效</div>
                        <el-col :span="9">
                            <el-form-item prop="pod_back_time_min">
                                <el-input v-model="formData.pod_back_time_min" style="width: 100%;" @blur="validateTimeBlur('pod_back_time_max')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="9">
                            <el-form-item prop="pod_back_time_max">
                                <el-input v-model="formData.pod_back_time_max" style="width: 100%;" @blur="validateTimeBlur('pod_back_time_min')"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="form-item-tip">
                            工作日
                        </el-col>
                    </el-form-item>

                    <el-form-item class="pod_back_time_rate" prop="pod_back_time_rate" v-if="mode_type === 'B2B'">
                        <div class="label-name"><span class="red">*</span>POD返回及时率</div>
                        <el-input
                            placeholder=""
                            v-model="formData.pod_back_time_rate"></el-input>
                        <i class="percent-i">%</i>
                    </el-form-item>

                    <el-form-item  class="is_cod_supported" prop="is_cod_supported">
                        <div class="label-name"><span class="red">*</span>是否支持COD订单</div>
                        <el-radio-group v-model="formData.is_cod_supported">
                            <el-radio :label=1>是</el-radio>
                            <el-radio :label=2>否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item class="pay_precision" prop="pay_precision">
                        <div class="label-name"><span class="red">*</span>付款保留小位数</div>
                        <el-select v-model="formData.precision_type" style="width:200px">
                            <el-option
                                v-for="item in precisionTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder=""
                            v-model="formData.pay_precision" style="width:200px"></el-input>
                    </el-form-item>

                    <el-form-item class="mark" prop="remark">
                        <div class="label-name">备注</div>
                        <el-input type="textarea" v-model="formData.remark"></el-input>
                    </el-form-item>

                    <el-form-item class="footer">
                        <el-button type="primary" @click="next('rules', 'save')" v-if="status == 5 || formData.is_done == 1">保存</el-button>
                        <el-button type="primary" class="save" @click="save_draft('rules')" v-if="status != 5 && formData.is_done == 2">保存草稿</el-button>
                        <el-button type="primary" @click="next('rules')" v-if="status != 5">下一步</el-button>
                        <a class="link-back" @click="linkBack('rules')">返回</a>
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
import channelApi from '../../api/channel'
import util from 'commonVueLib/util/tools'

export default {
    name: 'channel-manage',
    components: {
        CommonHeader,
        StepList,
        breadcrumb
    },
    data () {
        let validateTime = (rule, value, callback) => { // 运输时效的校验
            let reg = /^-?\d+$/
            if (!reg.test(value)) {
                callback(new Error('请输入整数！'))
            } else if (((rule.field === 'transport_time_min') || (rule.field === 'transport_time_max')) && (parseInt(this.formData.transport_time_min) > parseInt(this.formData.transport_time_max))) {
                callback(new Error('开始时效不能大于结束时效'))
            } else if (((rule.field === 'clearance_time_min') || (rule.field === 'clearance_time_max')) && (parseInt(this.formData.clearance_time_min) > parseInt(this.formData.clearance_time_max))) {
                callback(new Error('开始时效不能大于结束时效'))
            } else if (((rule.field === 'online_time_min') || (rule.field === 'online_time_max')) && (parseInt(this.formData.online_time_min) > parseInt(this.formData.online_time_max))) {
                callback(new Error('开始时效不能大于结束时效'))
            } else if (((rule.field === 'pod_back_time_min') || (rule.field === 'pod_back_time_max')) && (parseInt(this.formData.pod_back_time_min) > parseInt(this.formData.pod_back_time_max))) {
                callback(new Error('开始时效不能大于结束时效'))
            } else {
                callback()
            }
        }

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

        let websiteValidator = (rule, value, callback) => { // 查询网址校验
            if (value !== '') {
                if (!/^(https|http)?:\/\//.test(value)) {
                    callback(new Error('格式不对!'))
                } else {
                    callback()
                }
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
        let payPrecisionRge = (rule, value, callback) => { // 数字必须小于等于4
            let reg = /^[0-9]+$/
            if (!reg.test(value) || (value > 4)) {
                callback(new Error('保留小数位必须是0-4的整数'))
            } else {
                callback()
            }
        }
        return {
            prfClass: 'channel-manage',
            mode_type: 'B2B',
            dictItem: {}, // 所有的下拉
            status: '', // 该条数据的状态
            first_disabled: false, // 揽收以及仓库操作是否可点击
            is_disabled: false, // 服务类型是否可点击
            last_disabled: false, // 是否勾选尾程派送
            formData: {
                channel_name: '', // 渠道名称
                shipping_type: 0, // 发货类型
                biz_type: 1, // 业务类型
                delivery_type: 0, // 派送类型
                service_type: [], // 服务类型
                transport_type: 0, // 运输方式
                service_region: 0, // 服务区域
                is_trackable: 0, // 是否可跟踪
                track_url: '', // 查询网址
                transport_time_min: null, // 运输时效上限
                transport_time_max: null, // 运输时效下限
                transport_time_rate: null, // 运输达标率
                online_time_min: null, // 上网时效
                online_time_max: null, // 上网时效
                online_time_rate: null, // 上网达标率
                clearance_time_min: null, // 清关时效上限
                clearance_time_max: null, // 清关时效下限
                clearance_time_rate: null, // 清关达标率
                complaint_rate: null, // 投诉率
                deducation_time_rate: null, // 扣关率
                pod_back_time_min: null, // POD返回时效上限
                pod_back_time_max: null, // POD返回时效下限
                pod_back_time_rate: null, // POD返回及时率
                is_cod_supported: 0, // 是否支持COD
                pay_precision: null, // 付款保留小位数
                precision_type: 1,
                remark: '', // 备注
                save_as_draft: '', // 是否保存为草稿
                id: '', // 编辑时候有id 新增为空
                is_done: 2 // 是否已完成 1是 2否
            },
            shipppingTypeList: [
                {
                    label: '请选择',
                    value: 0
                },
                {
                    label: '国内发货',
                    value: 1
                },
                {
                    label: '海外仓发货',
                    value: 2
                }
            ],
            businessTypeList: [
                {
                    value: 1,
                    label: 'B2B'
                }
            ],
            sendTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '全程'
                },
                {
                    value: 2,
                    label: '中转'
                },
                {
                    value: 3,
                    label: '尾程'
                }
            ],
            numberLen: 4,
            transportTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '空运'
                },
                {
                    value: 2,
                    label: '海运'
                },
                {
                    value: 3,
                    label: '铁运'
                },
                {
                    value: 4,
                    label: '汽运&卡车'
                }
            ],
            service_type_list: [], // 临时存放服务类型
            areaList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '北美'
                },
                {
                    value: 2,
                    label: '南美'
                },
                {
                    value: 3,
                    label: '中东'
                },
                {
                    value: 4,
                    label: '欧洲'
                },
                {
                    value: 5,
                    label: '非洲'
                },
                {
                    value: 6,
                    label: '东南亚'
                },
                {
                    value: 7,
                    label: '独联体'
                },
                {
                    value: 8,
                    label: '其他'
                }
            ], // 默认区域
            precisionTypeList: [
                {
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '四舍五入'
                },
                {
                    value: 2,
                    label: '进一'
                },
                {
                    value: 3,
                    label: '去尾'
                }
            ],
            rules: {
                channel_name: [ // 渠道名称
                    { required: true, message: '请输入渠道名称', trigger: 'blur' }
                ],
                shipping_type: [ // 发货类型
                    { required: true, message: '请选择发货类型', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                biz_type: [ // 业务类型
                    { required: true, message: '请选择业务类型', trigger: 'change' }
                ],
                delivery_type: [ // 派送类型
                    { required: true, message: '请选择派送类型', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                service_type: [ // 服务类型
                    { type: 'array', required: true, message: '请至少选择一个服务类型', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                transport_type: [ // 运输方式
                    { required: true, message: '请选择运输方式', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                service_region: [ // 服务区域
                    { required: true, message: '请选择服务区域', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                is_trackable: [ // 是否可跟踪
                    { required: true, message: '是否可跟踪不能为空', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                track_url: [ // 查询网址
                    { required: true, message: '请输入查询网址', trigger: 'blur' },
                    { validator: websiteValidator, trigger: 'blur' }
                ],
                transport_time_min: [ // 运输时效下限
                    { required: true, message: '请输入运输时效下限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                transport_time_max: [ // 运输时效上限
                    { required: true, message: '请输入运输时效上限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                transport_time_rate: [ // 运输达标率
                    { required: true, message: '请输入运输达标率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                online_time_min: [ // 上网时效下限
                    { required: true, message: '请输入网时效下限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                online_time_max: [ // 上网时效上限
                    { required: true, message: '请输入网时效上限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                online_time_rate: [ // 上网达标率
                    { required: true, message: '请输入上网达标率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                clearance_time_min: [ // 上清关时效下限
                    { required: true, message: '请输入清关时效下限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                clearance_time_max: [ // 清关时效上限
                    { required: true, message: '请输入清关时效上限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                clearance_time_rate: [ // 清关达标率
                    { required: true, message: '请输入清关达标率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                complaint_rate: [ // 投诉率
                    { required: true, message: '请输入投诉率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                deducation_time_rate: [ // 扣关率
                    { required: true, message: '请输入扣关率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                pod_back_time_min: [ // POD返回时效下限
                    { required: true, message: '请输入POD返回时效下限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                pod_back_time_max: [ // POD返回时效上限
                    { required: true, message: '请输入POD返回时效上限', trigger: 'blur' },
                    { validator: validateTime, trigger: 'blur' }
                ],
                pod_back_time_rate: [ // POD返回及时率
                    { required: true, message: '请输入POD返回及时率', trigger: 'blur' },
                    { validator: numRate, trigger: 'blur' }
                ],
                is_cod_supported: [ // 是否支持COD
                    { required: true, message: '是否支持COD订单', trigger: 'change' },
                    { validator: numRge, trigger: 'change' }
                ],
                pay_precision: [ // 付款保留小位数
                    { validator: payPrecisionRge, trigger: 'blur' }
                ],
                remark: '' // 备注
            },
            typeNumber: 1, // 当前第n步
            stepSpace: 66,
            stepTitle: '申请渠道', // 当前第n步的标题
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
                    name: '基础资料',
                    url: ''
                }
            ]
        }
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        // 从dictiem中获取所有下拉的值
        this.mode_type = this.$route.params.mode_type
        this.formData.id = this.$route.params.id // 0代表新增 其他数字代表编辑
        this.dictItem = util.getCache('dictItem', 'local') // 获取dictItem中所有的下拉
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
            this.formData.biz_type = 2
            this.businessTypeList = [
                {
                    value: 2,
                    label: 'B2C'
                }
            ]
        }
        let lmpChannelApplicationB2b = util.getCache('lmp_channelApplication_data')
        if (lmpChannelApplicationB2b.basic_info) { // 如果缓存有值 就从缓存中拿
            this.formData = lmpChannelApplicationB2b.basic_info
        }
        this.status = lmpChannelApplicationB2b.status
        console.log(this.formData.service_type, '9999999')
        // 获取下一步接口判断
        let key = 'basic_info'
        util.getNextApi(key, this.status)
        let service = []
        for (let i = 0; i < this.formData.service_type.length; i++) {
            service.push(this.formData.service_type[i].toString())
        }
        this.formData.service_type = service

        // 全程 中转 尾程的默认选中
        let _self = this
        if (_self.formData.delivery_type === 1) { // 全程
            if (_self.$route.params.mode_type === 'B2C') {
                _self.last_disabled = 'disabled'
            }
            _self.is_disabled = 'disabled'
            _self.first_disabled = 'disabled'
        } else if (_self.formData.delivery_type === 2) { // 中转
            _self.is_disabled = false
            _self.first_disabled = false
        } else if (_self.formData.delivery_type === 3) { // 尾程
            if (_self.$route.params.mode_type === 'B2C') {
                _self.last_disabled = 'disabled'
            }
            _self.is_disabled = false
            _self.first_disabled = false
        }
    },
    methods: {
        changeDeliveryType () { // 派送类型如果是全程 除揽收、仓库操作外 其他都勾选 并且不可点击 中转没有尾程 尾程默认勾选尾程
            let _self = this
            if (_self.formData.delivery_type === 1) { // 全程
                if (_self.$route.params.mode_type === 'B2B') {
                    _self.$set(_self.formData, 'service_type', ['3', '4', '5', '6', '7'])
                } else {
                    _self.$set(_self.formData, 'service_type', ['3', '4', '5', '6', '7', '8'])
                    _self.last_disabled = 'disabled'
                }
                _self.is_disabled = 'disabled'
                _self.first_disabled = 'disabled'
            } else if (_self.formData.delivery_type === 2) { // 中转
                _self.$set(_self.formData, 'service_type', [])
                _self.is_disabled = false
                _self.first_disabled = false
            } else if (_self.formData.delivery_type === 3) { // 尾程
                if (_self.$route.params.mode_type === 'B2C') {
                    _self.$set(_self.formData, 'service_type', ['8'])
                    _self.last_disabled = 'disabled'
                } else {
                    _self.$set(_self.formData, 'service_type', [])
                }
                _self.is_disabled = false
                _self.first_disabled = false
            }
            setTimeout(function () {
                _self.$refs['rules'].clearValidate('service_type')
            }, 0)
        },
        changeUrl () {
            if (this.formData.is_trackable === 2) {
                this.formData.track_url = ''
            }
        },
        validateTimeBlur (val) {
            console.log(this.formData[val], val)
            if (this.formData[val]) {
                this.$refs['rules'].validateField(val, (valid) => {})
            }
        },
        next (formName, save) { // 下一步
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    if (util.getCache('channelApplication') === 'edit') { // 修改的时候不需要保存草稿的字段
                        delete _self.formData.save_as_draft
                    } else {
                        _self.formData.save_as_draft = 2 // 是否是草稿  1是 2否
                    }
                    channelApi.basicInfo(util.getCache('channelApplication'), _self.formData).then(function (res) {
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
                            data.basic_info = $.extend({}, _self.formData)
                            util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_data
                            util.getNextApi('basic_info', _self.status) // 修改此条数据的状态
                            if (save === 'save') { // 保存返回到资料预览页
                                _self.$router.push({ path: '/channel_application_data/' + _self.formData.id + '/edit/' + _self.mode_type })
                            } else {
                                _self.$router.push({path: '/channel_application_opt_requirement/' + _self.formData.id + '/' + _self.mode_type}) // 下一步跳到发货要求页面
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
            let trackUrl = _self.formData.track_url // 查询网址
            let transportTimeMin = _self.formData.transport_time_min // 运输时效上限
            let transportTimeMax = _self.formData.transport_time_max // 运输时效下限
            let transportTimeRate = _self.formData.transport_time_rate // 运输达标率
            let onlineTimeMin = _self.formData.online_time_min // 上网时效上限
            let onlineTimeMax = _self.formData.online_time_max // 上网时效下限
            let onlineRate = _self.formData.online_time_rate // 上网达标率
            let complainRate = _self.formData.complaint_rate // 投诉率
            let deducationTimeRate = _self.formData.deducation_time_rate // 扣关率
            let clearanceTimeMin = _self.formData.clearance_time_min // 清关时效上限
            let clearanceTimeMax = _self.formData.clearance_time_max // 清关时效下限
            let clearanceTimeRate = _self.formData.clearance_time_rate // 清关时效达标率
            let podBackTimeMin = _self.formData.pod_back_time_min // pod时效上限
            let podBackTimeMax = _self.formData.pod_back_time_max // pod时效下限
            let podBackTimeRate = _self.formData.pod_back_time_rate // pad返回及时率
            let payPrecision = _self.formData.pay_precision // 付款保留小位数
            _self.$refs['rules'].clearValidate()
            if (trackUrl) { // 查询网址不为空时进行校验
                _self.$refs[formName].validateField('track_url', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (transportTimeRate) { // 扣关率不为空时进行校验
                _self.$refs[formName].validateField('transport_time_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (onlineRate) { // 上网达标率不为空时进行校验
                _self.$refs[formName].validateField('online_time_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (deducationTimeRate) { // 扣关率不为空时进行校验
                _self.$refs[formName].validateField('deducation_time_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (complainRate) { // 投诉率不为空时进行校验
                _self.$refs[formName].validateField('complaint_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (clearanceTimeRate) { // 清关时效达标率不为空时进行校验
                _self.$refs[formName].validateField('clearance_time_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (podBackTimeRate) { // pad返回及时率不为空时进行校验
                _self.$refs[formName].validateField('pod_back_time_rate', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (transportTimeMin) { // 运输时效上限不为空时进行校验
                _self.$refs[formName].validateField('transport_time_min', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (transportTimeMax) { // 运输时效下限不为空时进行校验
                _self.$refs[formName].validateField('transport_time_max', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (onlineTimeMin) { // 上网时效上限不为空时进行校验
                _self.$refs[formName].validateField('online_time_min', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (onlineTimeMax) { // 上网时效下限不为空时进行校验
                _self.$refs[formName].validateField('online_time_max', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (clearanceTimeMin) { // 清关时效上限不为空时进行校验
                _self.$refs[formName].validateField('clearance_time_min', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (clearanceTimeMax) { // 清关时效下限不为空时进行校验
                _self.$refs[formName].validateField('clearance_time_max', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (podBackTimeMin) { // pod时效上限不为空时进行校验
                _self.$refs[formName].validateField('pod_back_time_min', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (podBackTimeMax) { // pod时效下限不为空时进行校验
                _self.$refs[formName].validateField('pod_back_time_max', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (payPrecision) { // 付款保留小位数不为空时进行校验
                _self.$refs[formName].validateField('pay_precision', (valid) => {
                    if (valid) {
                        pass = false
                    }
                })
            }
            if (pass) {
                _self.formData.save_as_draft = 1 // 1是 2否
                channelApi.basicInfo(util.getCache('channelApplication'), _self.formData).then(function (res) {
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
                        data.basic_info = $.extend({}, _self.formData)
                        util.setCache('lmp_channelApplication_data', data) // 当前页数据存储到全局lmp_channelApplication_b2b
                        util.getNextApi('basic_info', _self.status) // 修改此条数据的状态
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
        linkBack () { // 返回渠道资料
            this.$router.push({ path: '/channel_application_data/' + this.formData.id + '/edit/' + this.mode_type })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-manage';
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
        input.el-input__inner{
            padding: 0 33px 0 15px;
        }
        .pay_precision {
            .el-select{
                margin-right: 10px;
                .el-input__inner{
                    border: 1px solid #dcdfe6 !important
                }
            }
            .el-input{
                width: 205px !important
            }
        }
        .el-form-item__content{
            display: inline-block;
            .el-input, .el-textarea{
                width: 420px;
            }
            .percent-i{
                position: absolute;
                left: 689px;
                top: 1px;
                color: #2F3032;
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
        .transform_time, .online_time, .pod_return_time, .clearance_time{
            margin-bottom: 0 !important;
            .el-form-item__label{
                margin-right: 4px;
            }
            .el-col-9{
                width: 171px;
            }
            .el-col-5{
                width: 53px;
                text-align: right !important;
            }
            .el-col-1{
                width: 13px;
            }
            .el-form-item__content{
                width: 741px;
                .el-form-item__content{
                    width: auto;
                }
            }
            .el-col{
                float: none;
                display: inline-block;
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
        .el-form-item{
            margin-bottom: 16px;
            .el-form-item__label{
                width:290px;
                color: #2F3032;
            }
            .form-item-tip{
                text-align: center;
            }
        }
        .time_tit .el-form-item__error{
            position: absolute;
            padding-top:0
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
                &:hover{
                    color:limegreen;
                }
            }
        }
        .textareaNumber{
            position: absolute;
            left: 675px;
            top: 63px;
            color: #606266;
        }
        .el-form-item__error, .error{
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
