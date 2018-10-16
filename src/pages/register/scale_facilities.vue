<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <step-list :type="typeNumber"
                       :stepSpace="stepSpace"
                       :title="stepTitle"
                       :stepCount="stepCount"></step-list>
            <div :class="[prfClass + '-form']">
                <div class="info">
                    <h3>规模与设施</h3>
                </div>
                <el-form class="formInfo" :model="formData" :rules="rules" ref="form_scale_info">

                    <el-form-item prop="staff_num">
                        <div class="label-name">*员工人数</div>
                        <el-select
                            v-model="formData.staff_num" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in employeeList"
                                :key="index"
                                :label="item"
                                :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="warehouse_space" prop="warehouse_space_out">
                        <div class="label-name">海外（含香港）仓储面积（㎡）</div>
                        <el-input
                            v-model="formData.warehouse_space_out"></el-input>
                    </el-form-item>

                    <el-form-item class="sales_network">
                        <div class="label-name">营业网点/分店机构（含海外）</div>
                        <div
                            v-for="(val, idx) in formData.branch_network"
                            :key="idx"
                            :class="[ idx == 0 ? 'listFirst' : 'list']">
                            <el-select
                                filterable
                                class="sales_country"
                                @change="countryChange($event, idx)"
                                v-model="val.country" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in countryList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.country_acronym_two">
                                </el-option>
                            </el-select>
                            <el-select
                                :popper-class="'network' + idx"
                                filterable
                                class="sales_city"
                                v-model="val.province" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in val.provinceList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <div v-if="idx != 0" @click="removeBranchNetwork(val)" class="el-icon-delete delete"></div>
                        </div>
                        <el-button type="primary" @click="addBranch" class="add-branch-network" icon="el-icon-plus">增加一行</el-button>
                    </el-form-item>

                    <el-form-item class="search_website" prop="search_website">
                        <div class="label-name">查件网址</div>
                        <el-input
                            v-model="formData.search_website"></el-input>
                    </el-form-item>

                    <div class="next-form-middle"></div>

                    <el-form-item class="operation_revenue three_year_revenue"
                                  :key="index"
                                  v-for="(val, index) in formData.three_year_revenue"
                                  :prop="'three_year_revenue.' + index + '.income'"
                                  :rules="[
                                    {required: true, message: '不能为空', trigger: ['blur', 'change']},
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value !== '') {
                                                let _val = value.toString()
                                                if (!/^\d+(\.\d+)?$/.test(value)) {
                                                    callback('必须是数字')
                                                } else if (_val.lastIndexOf('.') !== -1) {
                                                    let len = _val.lastIndexOf('.') + 1
                                                    if (_val.substring(len, _val.length).length > 4) {
                                                        callback('格式不对')
                                                    } else {
                                                        callback()
                                                    }
                                                } else {
                                                    callback()
                                                }
                                            } else {
                                                callback()
                                            }
                                        },
                                        trigger: ['blur', 'change']
                                    }
                                  ]">
                        <div class="label-name" v-if="index == 0">*近3年营业收入（万）</div>
                        <div :class="[ index == 0 ? 'listFirst' : 'list']">
                            <span v-if="index === 0">{{ localYear - 1 + '年' }}</span>
                            <el-input
                                class="revenue"
                                v-if="index === 0"
                                placeholder="无营业收入填0"
                                v-model="val.income"></el-input>
                            <span v-if="index === 1">{{ localYear - 2 + '年' }}</span>
                            <el-input
                                class="revenue"
                                v-if="index == 1"
                                placeholder="无营业收入填0"
                                v-model="val.income"></el-input>
                            <span v-if="index === 2">{{ localYear - 3 + '年' }}</span>
                            <el-input
                                class="revenue"
                                placeholder="无营业收入填0"
                                v-if="index == 2"
                                v-model="val.income"></el-input>
                            <el-select
                                class="revenue_r"
                                filterable
                                v-model="val.currency"
                                placeholder="请选择">
                                <el-option
                                    label="请选择"
                                    value="">
                                </el-option>
                                <el-option
                                    v-for="(item, index) in currencyList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.currency">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>

                    <el-form-item class="fileBottom">
                        <div class="label-name">近半年TOP3客户名称</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'customer_list'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.customer_list">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item class="fileBottom">
                        <div class="label-name">近半年TOP3客户货量占比</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'volume_ratio'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.volume_ratio">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item class="fileBottom">
                        <div class="label-name">航线分布</div>
                        <el-input
                            v-model="formData.route_distribution"></el-input>
                    </el-form-item>

                    <el-form-item class="fileBottom">
                        <div class="label-name">客运往国家和地区</div>
                        <el-input
                            v-model="formData.country_region"></el-input>
                    </el-form-item>

                    <el-form-item class="fileBottom">
                        <div class="label-name">清关口岸</div>
                        <el-input
                            v-model="formData.clearance_port"></el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="nextBtn" v-if="editMessage">
                        <el-button
                            @click="next('form_scale_info', 'save')"
                            type="primary">保存</el-button>
                        <el-button
                            class="save"
                            @click="cancel()"
                            type="primary">返回</el-button>
                    </el-form-item>
                    <el-form-item class="nextBtn" v-else>
                        <el-button
                            class="back"
                            @click="back"
                            plain>上一步</el-button>
                        <el-button
                            @click="next('form_scale_info', 'next')"
                            type="primary">下一步</el-button>
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
import api from '../../api/register'
import util from 'commonVueLib/util/tools'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'

export default {
    name: 'scale_facilities',
    components: {
        StepList,
        CommonHeader,
        ImagePreview
    },
    data () {
        let date = new Date()
        let years = ''
        let months = date.getMonth() + 1
        if (months > 4) {
            years = date.getFullYear()
        } else {
            years = date.getFullYear() - 1
        }

        let websiteValidator = (rule, value, callback) => {
            if (value !== '') {
                if (!/^(https|http)?:\/\//.test(value)) {
                    callback(new Error('格式不对!'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        let numberValidator = (rule, value, callback) => {
            if (value !== '') {
                if ((/[^/.\d]/g).test(value)) {
                    callback(new Error('格式不对!'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }

        return {
            prfClass: 'scale-info',
            typeNumber: 3, // 第3步
            localYear: years,
            formData: {
                staff_num: '', // 员工人数
                warehouse_space_out: '', // 海外（含香港）仓储面积
                branch_network: [
                    {
                        country: '',
                        province: '',
                        provinceList: []
                    }
                ], // 营业网点/分店机构(含海外)
                search_website: '', // 查件网址
                three_year_revenue: [
                    {
                        year: '',
                        income: '',
                        currency: ''
                    },
                    {
                        year: '',
                        income: '',
                        currency: ''
                    },
                    {
                        year: '',
                        income: '',
                        currency: ''
                    }
                ], // 近3年营业收入（万）
                customer_list: [], // 近半年TOP3客户名称
                volume_ratio: [], // 近半年TOP3客户货量占比
                route_distribution: '', // 航线分布
                country_region: '', // 客运往国家和地区
                clearance_port: '' // 清关口岸
            },
            currency: '', // 币种
            editMessage: false, // 是否是编辑
            // 显示图片预览窗口
            showPreview: false,
            srcs: '',
            stepTitle: '欢迎物流商入驻',
            stepCount: [
                {
                    index: 1,
                    title: '基础信息'
                },
                {
                    index: 2,
                    title: '资质证照'
                },
                {
                    index: 3,
                    title: '规模与设施'
                },
                {
                    index: 4,
                    title: '联系方式'
                },
                {
                    index: 5,
                    title: '审核查询'
                }
            ],
            stepSpace: 100, // nav中间宽度
            // 默认区域
            employeeList: [],
            countryList: [],
            // 币种
            currencyList: [],
            // 城市
            cityList: [],
            rules: {
                staff_num: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ],
                search_website: [
                    { validator: websiteValidator, trigger: ['blur', 'change'] }
                ],
                warehouse_space_out: [
                    { required: false, validator: numberValidator, trigger: ['blur', 'change'] }
                ]
            },
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            data: {}
        }
    },
    watch: {
        'formData.branch_network' () {
            console.log(this.formData.branch_network)
        }
    },
    created () {
        if (util.getCache('company_info', 'local') != null) {
            this.data.token = util.getCache('company_info', 'local').token
            // 获取状态
            let currentStep = util.getCache('lmp_All_info').current_step
            if (currentStep === 0) {
                this.stepTitle = '公司资料修改'
            }
        }
    },
    mounted () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
        this.dictItem = util.getCache('dictItem', 'local')
        if (this.dictItem != null) {
            this.employeeList = this.dictItem.staff_num // 员工人数
            this.currencyList = this.dictItem.currency // 币种
        }

        const getPromise = Promise.all([this.getCountry()])
        getPromise.then(() => {
            // 如果是从物流商资料进来编辑的
            if (util.getCache('editMessage') !== null && util.getCache('editMessage')) {
                let data = util.getCache('lmp_All_info')
                this.formData = data.scale_facilities // 规模与设施
                this.editMessage = util.getCache('editMessage')
            } else {
                if (util.getCache('lmp_All_info') != null) {
                    // 从缓存取
                    let data = util.getCache('lmp_All_info')
                    let localData = data.scale_facilities
                    this.formData = localData
                    console.log(localData)

                    // 针对员工人数默认值
                    this.formData.staff_num = localData.staff_num === '' ? '1' : localData.staff_num.toString()

                    // 针对营业网点/分店机构（含海外）
                    if (localData.branch_network.length === 0) {
                        this.formData.branch_network = [
                            {
                                country: '',
                                province: '',
                                provinceList: []
                            }
                        ]
                    }

                    // 近3年营业收入（万）
                    if (localData.three_year_revenue.length === 0) {
                        this.formData.three_year_revenue = [
                            {
                                year: '',
                                income: '',
                                currency: ''
                            },
                            {
                                year: '',
                                income: '',
                                currency: ''
                            },
                            {
                                year: '',
                                income: '',
                                currency: ''
                            }
                        ]
                    }
                }
            }
        })
    },
    computed: {
    },
    methods: {
        yearName (i) {
            let t = this
            if (i === 0) {
                return t.localYear - 1 + '年-'
            } else if (i === 1) {
                return t.localYear - 2 + '年-'
            } else if (i === 2) {
                return t.localYear - 3 + '年-'
            }
        },
        // 获取国家列表
        getCountry () {
            const _self = this
            let promise = new Promise((resolve, reject) => {
                api.getCountry().then((res) => {
                    if (res.code === 200) {
                        _self.countryList = res.data
                        resolve()
                    } else {
                        _self.$alert(res.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        })
                    }
                }).catch(() => {
                    console.log('error')
                })
            })
            return promise
        },

        // 国家改变联动
        countryChange (value, idx) {
            let _self = this
            // 更改branch_network
            _self.formData.branch_network[idx].country = value
            _self.formData.branch_network[idx].provinceList = []
            api.getState({country_acronym_two: value}).then((res) => {
                if (res.code === 200) {
                    _self.formData.branch_network[idx].province = ''
                    _self.formData.branch_network[idx].provinceList = res.data
                    _self.$set(_self.formData.branch_network, idx, _self.formData.branch_network[idx])
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            }).catch(() => {
                console.log('error')
            })
        },

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
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].status === 'success' && fileList[i].response) {
                        fileList[i].url = fileList[i].response.data[0].url
                        fileList[i].ext = fileList[i].response.data[0].ext
                        fileList[i].origin_name = fileList[i].response.data[0].origin_name
                        fileList[i].save_path = fileList[i].response.data[0].save_path
                        delete fileList[i].response
                    }
                }
                _self.formData[key] = fileList
                // 样式
                $('.' + key).find('.el-form-item__error').hide()
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        // _self.$refs[key].clearFiles()
                    }
                })
            }
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
            // 样式
            if (arr.length === 0) {
                $('.' + key).find('.el-form-item__error').show()
            }
        },

        // 预览上传文件
        previewUpload (file) {
            let _self = this
            // 文件格式
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(file.ext) === -1) {
                // 其它格式下载
                window.open(file.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = file.url
            }
        },

        // 删除营业网点
        removeBranchNetwork (item) {
            let index = this.formData.branch_network.indexOf(item)
            if (index !== -1) {
                this.formData.branch_network.splice(index, 1)
            }
        },

        // 增加营业网点
        addBranch () {
            this.formData.branch_network.push({
                country: '',
                province: '',
                provinceList: []
            })
        },

        // 上一步
        back () {
            let data = util.getCache('lmp_All_info')
            data.scale_facilities = $.extend({}, this.formData)
            util.setCache('lmp_All_info', data) // 当前页数据存储到全局lmp_All_info
            this.$router.push({ path: '/aptitude' })
        },

        // 下一步
        next (formName, type) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid) {
                    console.log('error')
                    return false
                } else {
                    console.log('success')
                    _self.formData.current_step = 3 // 流程步骤

                    // 拼接近三年营业收入
                    let threeYearRevenueArr = []
                    for (let i = 0; i < _self.formData.three_year_revenue.length; i++) {
                        let obj = {
                            year: '',
                            income: '',
                            currency: ''
                        }
                        let income = _self.formData.three_year_revenue[i].income
                        let currency = _self.formData.three_year_revenue[i].currency
                        if (i === 0) {
                            obj.year = _self.localYear - 1
                            obj.income = income
                            obj.currency = currency
                            threeYearRevenueArr.push(obj)
                        } else if (i === 1) {
                            obj.year = _self.localYear - 2
                            obj.income = income
                            obj.currency = currency
                            threeYearRevenueArr.push(obj)
                        } else if (i === 2) {
                            obj.year = _self.localYear - 3
                            obj.income = income
                            obj.currency = currency
                            threeYearRevenueArr.push(obj)
                        }
                    }
                    console.log(threeYearRevenueArr)
                    let jsonData = _self.formData
                    jsonData.three_year_revenue = threeYearRevenueArr
                    api.saveLogisticsEnterprise(jsonData).then((res) => {
                        if (res.code === 200) {
                            let data = util.getCache('lmp_All_info')
                            data.scale_facilities = $.extend({}, this.formData)
                            util.setCache('lmp_All_info', data) // 当前页数据存储到全局lmp_All_info

                            if (type === 'save') { // 保存按钮回到查看资料页面
                                _self.$router.push({ path: '/affiliate_message' })
                            } else {
                                _self.$router.push({ path: '/phone_number' })
                            }
                        } else {
                            _self.$alert(res.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            })
                        }
                    }).catch(() => {
                        console.log('error')
                    })
                }
            })
        },
        // 返回按钮
        cancel () {
            this.$router.push({ path: '/affiliate_message' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'scale-info';
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto;
        background-color: #fff;
        height: auto;
        padding-bottom: 58px;
        margin-bottom: 120px;

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
                float: left;
                font-size: 14px;
                line-height: 36px;
                padding: 0 11px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
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
            margin-top: 60px;
        }
        .next-form-middle{
            width:720px;
            border-top: 1px solid #F1F1F7;
            padding-top: 40px;
            margin: 40px auto 0;
        }
        .company_profile{
            width:380px;
            height:80px;
            border-radius:5px;
        }
        .el-form-item{
            margin-bottom: 16px;
        }

        .upload-attachment{
            display: inline-block;
            width: 380px;
        }
        .fileUpload{
            width: 100px;
            height: 32px;
            border-radius: 5px;
            color: #429EFD;
            border: 1px solid #B3D7FE;
            font-weight:400;
        }
        .nextBtn{
            margin-top: 40px;
            display: inline-block;
            margin-left: 290px;
            .save{
                color: #429EFD;
                border: 1px solid #B3D7FE;
                background-color: #fff;
            }
            button:first-child{
                margin-right: 12px;
            }
        }
        .attachText{
            margin-left: 8px;
            width:231px;
            height:15px;
            font-size:12px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(191,195,203,1);
            line-height:36px;
        }
        .back{
            display: inline-block;
            width:160px;
            height:44px;
            border:1px solid rgba(66,158,253,1);
            border-radius:5px;
            color: #429EFD;
        }
        .sales_country, .sales_city{
            width: 182px;
            .el-input{
                width: 182px;
            }
        }
        .sales_city{
            margin-left: 12px;
        }
        .operation_revenue{
            .list{
                display: inline-block;
                margin-left: 290px;
                width: 382px;
            }
            .list:last-child{
                margin-bottom: 0px;
            }
            .listFirst{
                display: inline-block;
                width: 382px;
                margin-left: 0px !important;
            }
            .revenue, .revenue_r{
                width: 145px;
                .el-input{
                    width: 169px;
                }
            }
            .revenue_r{
                margin-left: 12px;
            }
        }
        .sales_network{
            .list{
                display: inline-block;
                margin-left: 290px;
                margin-top: 16px;
            }
            .list:last-child{
                margin-bottom: 0px;
            }
            .listFirst{
                display: inline-block;
                margin-left: 0px !important;
            }
            .revenue, .revenue_r{
                width: 169px;
                .el-input{
                    width: 169px;
                }
            }
            .revenue_r{
                margin-left: 12px;
            }
        }

        .fileBottom{
            margin-bottom: 16px;
            .el-form-item__content{
                line-height: 24px;
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
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
        .delete{
            cursor: pointer;
            font-size: 18px;
            margin-left: 6px;
        }
        .el-icon-plus{
            color: #429EFD;
            font-size: 12px;
        }
        .add-branch-network{
            display: block !important;
            margin-left: 290px;
            background:rgba(235,244,254,1);
            border: 1px solid #B3D7FE;
            width: 100px !important;
            height: 32px !important;
            line-height: 32px;
            padding: 0;
            margin-top: 16px;
            border-radius:5px;
            span {
                font-size:12px;
                color: #429EFD;
            }
        }
        .el-upload-list__item-name{
            color: #409EFF;
        }
    }
</style>
