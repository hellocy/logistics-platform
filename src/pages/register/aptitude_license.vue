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
                    <h3>资质证照</h3>
                </div>
                <el-form v-if="lmp_register_area_type != 3" class="formInfo" :model="modelData" :rules="rules" ref="form_aptitude_info">
                    <el-form-item class="company_area">
                        <div class="label-name">*所属区域</div>
                        <el-select @change="areaChange" v-model="formData.area_type" placeholder="请选择">
                            <el-option
                                v-for="item in areaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="area_txt">请选择公司注册所在区域</span>
                    </el-form-item>
                    <!-- 大陆 -->
                    <div v-if="lmp_register_area_type == 1">
                        <el-form-item class="license_type" prop="bs_license_type">
                            <div class="label-name">*执照类型(是否永久经营)</div>
                            <el-radio-group v-model="formData.cn.bs_license_type">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item class="founding_time" prop="founding_date">
                            <div class="label-name">*成立时间</div>
                            <el-date-picker
                                v-model="formData.cn.founding_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item class="license_term" prop="bs_license_date" v-if="formData.cn.bs_license_type == 2">
                            <div class="label-name">*营业执照有效期</div>
                            <el-date-picker
                                v-model="formData.cn.bs_license_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <div class="asset-form">
                            <el-form-item class="asset_injection" prop="registed_capital">
                                <div class="label-name">*注册资本</div>
                                <el-input
                                    class="asset_input"
                                    v-model="formData.cn.registed_capital" ></el-input>
                                <span>万</span>
                            </el-form-item>

                            <el-form-item class="registed_capital_curr" prop="registed_capital_curr">
                                <el-select
                                    filterable
                                    class="asset_select"
                                    v-model="formData.cn.registed_capital_curr" placeholder="请选择">
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
                            </el-form-item>
                            <div class="capital_txt">企业注册登记的资本，必须与营业执照一致（若分公司无注册资本，请填总公司注册资本）</div>
                        </div>

                        <el-form-item prop="annual_report_date">
                            <div class="label-name">*年报公示日期</div>
                            <el-date-picker
                                v-model="formData.cn.annual_report_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="bs_license_addr">
                            <div class="label-name">*营业执照地址</div>
                            <el-input
                                placeholder="请填写与营业执照一致的地址"
                                v-model="formData.cn.bs_license_addr" ></el-input>
                        </el-form-item>

                        <el-form-item class="fileBottom bs_license" prop="bs_license">
                            <div class="label-name">*营业执照</div>
                            <el-upload
                                multiple
                                ref="bs_license"
                                name="files"
                                :headers="data"
                                :uploadName="'bs_license'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.cn.bs_license">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <div class="next-form-middle"></div>

                        <el-form-item prop="legal_rep">
                            <div class="label-name">*法人代表</div>
                            <el-input
                                placeholder="必须与营业执照上的企业法人代表一致"
                                v-model="formData.cn.legal_rep"></el-input>
                        </el-form-item>

                        <el-form-item class="fileBottom legal_id" prop="legal_id">
                            <div class="label-name">*法人身份证</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                class="upload-attachment"
                                :uploadName="'legal_id'"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.cn.legal_id">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom principal_shareholder">
                            <div class="label-name">主要股东</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'principal_shareholder'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.cn.principal_shareholder">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom signature_card">
                            <div class="label-name">印鉴卡</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'signature_card'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.cn.signature_card">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item>
                            <div class="label-name">其他证明材料</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'other_attachment'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.cn.other_attachment">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <!-- 香港 -->
                    <div v-if="lmp_register_area_type == 2">
                        <el-form-item class="fileBottom cr cr_attachment" prop="cr_attachment">
                            <div class="label-name">*CR</div>
                            <el-upload
                                multiple
                                :headers="data"
                                name="files"
                                :uploadName="'cr_attachment'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.cr_attachment">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom br_attachment" prop="br_attachment">
                            <div class="label-name">*BR</div>
                            <el-upload
                                multiple
                                :headers="data"
                                name="files"
                                :uploadName="'br_attachment'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.br_attachment">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <div class="asset-form">
                            <el-form-item class="asset_injection" prop="registed_capital">
                                <div class="label-name">*注册资本</div>
                                <el-input
                                    class="asset_input"
                                    v-model="formData.hk.registed_capital" ></el-input>
                                <span>万</span>
                            </el-form-item>

                            <el-form-item class="registed_capital_curr" prop="registed_capital_curr">
                                <el-select
                                    filterable
                                    class="asset_select"
                                    v-model="formData.hk.registed_capital_curr" placeholder="请选择">
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
                            </el-form-item>
                            <div class="capital_txt">企业注册登记的资本，必须与营业执照一致（若分公司无注册资本，请填总公司注册资本）</div>
                        </div>

                        <el-form-item class="founding_time" prop="founding_date">
                            <div class="label-name">*成立时间</div>
                            <el-date-picker
                                v-model="formData.hk.founding_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item>
                            <div class="label-name">年报公示日期</div>
                            <el-date-picker
                                v-model="formData.hk.annual_report_date"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="年 / 月 / 日">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="bs_license_addr">
                            <div class="label-name">*营业执照地址</div>
                            <el-input
                                placeholder="请填写与营业执照一致的地址"
                                v-model="formData.hk.bs_license_addr" ></el-input>
                        </el-form-item>

                        <el-form-item prop="legal_rep">
                            <div class="label-name">*法人代表</div>
                            <el-input
                                placeholder="必须与营业执照上的企业法人代表一致"
                                v-model="formData.hk.legal_rep"></el-input>
                        </el-form-item>

                        <el-form-item class="fileBottom legal_id" prop="legal_id">
                            <div class="label-name">*法人身份证</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                class="upload-attachment"
                                :uploadName="'legal_id'"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.legal_id">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom incorporation_form" prop="incorporation_form">
                            <div class="label-name">*周年报/法团成立表</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'incorporation_form'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.incorporation_form">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom">
                            <div class="label-name">年报附件上传</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'annual_report'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.annual_report">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom">
                            <div class="label-name">其他证明材料</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'other_attachment'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.other_attachment">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <div class="next-form-middle"></div>

                        <el-form-item class="fileBottom">
                            <div class="label-name">主要股东</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'principal_shareholder'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.principal_shareholder">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>

                        <el-form-item class="fileBottom">
                            <div class="label-name">印鉴卡</div>
                            <el-upload
                                multiple
                                name="files"
                                :headers="data"
                                :uploadName="'signature_card'"
                                class="upload-attachment"
                                :action="uploadUrl"
                                :before-upload="handleBeforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-remove="uploadRemove"
                                :on-preview="previewUpload"
                                :file-list="formData.hk.signature_card">
                                <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                            </el-upload>
                        </el-form-item>
                    </div>

                    <!-- 按钮 -->
                    <el-form-item class="nextBtn" v-if="editMessage">
                        <el-button
                            @click="next('form_aptitude_info', 'save')"
                            type="primary">保存</el-button>
                        <el-button
                            @click="cancel()"
                            type="primary" class="save">返回</el-button>
                    </el-form-item>
                    <el-form-item class="nextBtn" v-else>
                        <el-button
                            class="back"
                            @click="back"
                            plain>上一步</el-button>
                        <el-button
                            @click="next('form_aptitude_info', 'next')"
                            type="primary">下一步</el-button>
                    </el-form-item>
                </el-form>

                <!--海外-->
                <el-form v-show="lmp_register_area_type == 3" class="formInfo" :model="modelData" :rules="rules" ref="form_hw_info">
                    <el-form-item class="company_area">
                        <div class="label-name">*所属区域</div>
                        <el-select @change="areaChange" v-model="formData.area_type" placeholder="请选择">
                            <el-option
                                v-for="item in areaList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="area_txt">请选择公司注册所在区域</span>
                    </el-form-item>

                    <el-form-item class="founding_time" prop="founding_date">
                        <div class="label-name">*成立时间</div>
                        <el-date-picker
                            v-model="formData.hw.founding_date"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="年 / 月 / 日">
                        </el-date-picker>
                    </el-form-item>

                    <div class="asset-form">
                        <el-form-item class="asset_injection" prop="registed_capital">
                            <div class="label-name">*注册资本</div>
                            <el-input
                                class="asset_input"
                                v-model="formData.hw.registed_capital" ></el-input>
                            <span>万</span>
                        </el-form-item>

                        <el-form-item class="registed_capital_curr" prop="registed_capital_curr">
                            <el-select
                                filterable
                                class="asset_select"
                                v-model="formData.hw.registed_capital_curr" placeholder="请选择">
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
                        </el-form-item>
                        <div class="capital_txt">企业注册登记的资本，必须与营业执照一致（若分公司无注册资本，请填总公司注册资本）</div>
                    </div>

                    <el-form-item prop="bs_license_addr">
                        <div class="label-name">*营业执照地址</div>
                        <el-input
                            v-model="formData.hw.bs_license_addr" placeholder="请填写与营业执照一致的地址"></el-input>
                    </el-form-item>

                    <el-form-item prop="legal_rep">
                        <div class="label-name">*法人代表</div>
                        <el-input
                            placeholder="必须与营业执照上的企业法人代表一致"
                            v-model="formData.hw.legal_rep"></el-input>
                    </el-form-item>

                    <el-form-item class="registration" prop="registration">
                        <div class="label-name">*公司注册证</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'registration'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.hw.registration">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item prop="regulations">
                        <div class="label-name">章程</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'regulations'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.hw.regulations">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <div class="label-name">其他证明材料</div>
                        <el-upload
                            multiple
                            name="files"
                            :headers="data"
                            :uploadName="'other_attachment'"
                            class="upload-attachment"
                            :action="uploadUrl"
                            :before-upload="handleBeforeUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="uploadRemove"
                            :on-preview="previewUpload"
                            :file-list="formData.hw.other_attachment">
                            <el-button size="small" class="fileUpload" plain icon="el-icon-plus">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">小于5M,格式为jpg/png/jpeg/gif/pdf/doc/docx/xls/xlsx</div>
                        </el-upload>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="nextBtn" v-if="editMessage">
                        <el-button
                            @click="next('form_hw_info', 'save')"
                            type="primary">保存</el-button>
                        <el-button
                            @click="cancel()"
                            type="primary" class="save">返回</el-button>
                    </el-form-item>
                    <el-form-item class="nextBtn" v-else>
                        <el-button
                            class="back"
                            @click="back"
                            plain>上一步</el-button>
                        <el-button
                            @click="next('form_hw_info', 'next')"
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
    name: 'aptitude_license',
    components: {
        StepList,
        CommonHeader,
        ImagePreview
    },
    data () {
        let CheckNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('必填'))
            } else if (!/^\+?[1-9][0-9]*$/.test(value)) {
                callback(new Error('格式不对'))
            } else {
                callback()
            }
        }

        return {
            prfClass: 'aptitude-info',
            typeNumber: 2, // 第2步
            lmp_register_area_type: 1, // 默认区域为大陆
            formData: {
                area_type: '1', // 所属区域 默认为大陆
                cn: {
                    bs_license_type: '1', // 营业执照类型（是否永久经营）
                    founding_date: '', // 成立时间
                    bs_license_date: '', // 执照有效期
                    registed_capital: '', // 注册资本
                    registed_capital_curr: '', // 币种
                    annual_report_date: '', // 年报公示日期
                    bs_license_addr: '', // 营业执照地址
                    bs_license: [], // 营业执照
                    legal_rep: '', // 法人代表
                    legal_id: [], // 法人身份证
                    principal_shareholder: [], // 主要股东
                    signature_card: [], // 印鉴卡
                    other_attachment: [] // 其他证明材料
                },
                // 香港
                hk: {
                    cr_attachment: [], // cr
                    br_attachment: [], // br
                    founding_date: '', // 成立时间
                    registed_capital: '', // 注册资本
                    registed_capital_curr: '', // 币种
                    annual_report_date: '', // 年报公示日期
                    bs_license_addr: '', // 营业执照地址
                    incorporation_form: [], // 周年报/法团成立表
                    annual_report: [], // 年报附件上传
                    other_attachment: [], // 其他证明材料
                    legal_rep: '', // 法人代表
                    legal_id: [], // 法人身份证
                    principal_shareholder: [], // 主要股东
                    signature_card: [] // 印鉴卡
                },
                hw: {
                    founding_date: '', // 成立时间
                    registed_capital: '', // 注册资本
                    registed_capital_curr: '', // 币种
                    bs_license_addr: '', // 营业执照地址
                    legal_rep: '', // 法人代表
                    registration: [], // 公司注册证
                    regulations: [], // 章程
                    other_attachment: [] // 其他证明材料
                }
            },
            modelData: {},
            editMessage: false, // 是否是编辑
            uploadUrl: window.GLOBAL.hostUrl + 'api/upload?tag=logistics_enterprise', // 上传api
            // 默认区域
            currencyList: [],
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
            areaList: [
                {
                    value: '1',
                    label: '大陆'
                },
                {
                    value: '2',
                    label: '香港'
                },
                {
                    value: '3',
                    label: '台、澳及海外'
                }
            ],
            rules: {
                area_type: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                legal_rep: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bs_license_type: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                founding_date: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bs_license_date: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                registed_capital: [
                    { required: true, message: '必填', trigger: 'blur' },
                    { validator: CheckNumber, trigger: ['blur', 'change'] }
                ],
                registed_capital_curr: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ],
                annual_report_date: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bs_license_addr: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ],
                bs_license: [
                    { required: true, message: '必填', trigger: ['blur', 'change'] }
                ],
                legal_id: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                cr_attachment: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                br_attachment: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                registration: [
                    { required: true, message: '必填', trigger: 'change' }
                ],
                incorporation_form: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            },
            data: {}
        }
    },
    created () {
        if (util.getCache('company_info', 'local') != null) {
            // 获取状态
            let currentStep = util.getCache('lmp_All_info').current_step
            if (currentStep === 0) {
                this.stepTitle = '公司资料修改'
            }
        }
    },
    mounted () {
        // 判断是否登录
        if (util.getCache('company_info', 'local') != null) {
            this.data.token = util.getCache('company_info', 'local').token
        } else {
            this.$router.push({ path: '/login' })
        }
        this.modelData = this.formData.cn // 默认为大陆
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)

        this.dictItem = util.getCache('dictItem', 'local')
        this.currencyList = this.dictItem.currency // 币种
        // 如果是从物流商资料进来编辑的
        if (util.getCache('editMessage') !== null && util.getCache('editMessage')) {
            let data = util.getCache('lmp_All_info')
            this.formRecode(data.quality_info) // 资质
        } else {
            if (util.getCache('lmp_All_info') != null) {
                let data = util.getCache('lmp_All_info')
                let localData = data.quality_info
                this.formRecode(localData)
            }
        }
        this.$nextTick(function () {
            if (this.lmp_register_area_type === 3) {
                this.$refs['form_hw_info'].clearValidate()
            } else {
                this.$refs['form_aptitude_info'].clearValidate()
            }
        })
    },
    watch: {
        'formData.area_type' () {
            switch (this.formData.area_type * 1) {
            case 1:
                this.lmp_register_area_type = 1 // 大陆
                this.modelData = this.formData.cn
                break
            case 2:
                this.lmp_register_area_type = 2 // 香港
                this.modelData = this.formData.hk
                break
            case 3:
                this.lmp_register_area_type = 3 // 海外
                this.modelData = this.formData.hw
                break
            default:
                break
            }
        }
    },
    methods: {
        // 表单重新赋值
        formRecode (data) {
            this.formData.area_type = data.area_type === '' ? '1' : data.area_type.toString()
            let areaType = this.formData.area_type * 1

            if (areaType === 1) { // 大陆
                this.formData.cn = $.extend({}, data)
                this.modelData = this.formData.cn
                this.lmp_register_area_type = 1 // 大陆
            } else if (areaType === 2) { // 香港
                this.lmp_register_area_type = 2 // 香港
                this.formData.hk = $.extend({}, data)
                this.modelData = this.formData.hk
            } else if (areaType === 3) { // 海外
                this.lmp_register_area_type = 3 // 香港
                this.formData.hw = $.extend({}, data)
                this.modelData = this.formData.hw
            }
            this.editMessage = util.getCache('editMessage')
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
                let areaType = _self.formData.area_type * 1

                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i].status === 'success' && fileList[i].response) {
                        fileList[i].url = fileList[i].response.data[0].url
                        fileList[i].ext = fileList[i].response.data[0].ext
                        fileList[i].origin_name = fileList[i].response.data[0].origin_name
                        fileList[i].save_path = fileList[i].response.data[0].save_path
                        delete fileList[i].response
                    }
                }
                if (areaType === 1) { // 大陆
                    _self.formData.cn[key] = fileList
                } else if (areaType === 2) { // 香港
                    _self.formData.hk[key] = fileList
                } else if (areaType === 3) { // 海外
                    _self.formData.hw[key] = fileList
                }
                // 样式
                $('.' + key).find('.el-form-item__error').hide()
            } else {
                _self.$alert(response.msg, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
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
            let areaType = _self.formData.area_type * 1
            if (areaType === 1) { // 大陆
                _self.formData.cn[key] = fileList
                _self.showAndHideUpload(_self.formData.cn[key], key)
            } else if (areaType === 2) { // 香港
                _self.formData.hk[key] = fileList
                _self.showAndHideUpload(_self.formData.hk[key], key)
            } else if (areaType === 3) { // 海外
                _self.formData.hw[key] = fileList
                _self.showAndHideUpload(_self.formData.hw[key], key)
            }
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
        // 改变区域
        areaChange (val) {
            let _self = this
            let areaType = val * 1
            this.lmp_register_area_type = val

            let allData = util.getCache('lmp_All_info')
            if (areaType === 1) { // 大陆
                _self.formData.cn = allData.areaData.cn
                _self.$nextTick(function () {
                    this.$refs['form_aptitude_info'].clearValidate()
                })
            } else if (areaType === 2) { // 香港
                _self.formData.hk = allData.areaData.hk
                _self.$nextTick(function () {
                    this.$refs['form_aptitude_info'].clearValidate()
                })
            } else if (areaType === 3) { // 海外
                _self.formData.hw = allData.areaData.hw

                _self.$nextTick(function () {
                    this.$refs['form_hw_info'].clearValidate()
                })
            }
        },

        // 上一步
        back () {
            let _self = this
            let jsonData = {
                current_step: 2, // 流程步骤
                area_type: _self.formData.area_type * 1
            }
            let data = util.getCache('lmp_All_info')
            let areaType = _self.formData.area_type * 1
            if (areaType === 1) { // 大陆
                jsonData = $.extend(jsonData, _self.formData.cn)
                data.areaData.cn = $.extend({}, _self.formData.cn)
            } else if (areaType === 2) { // 香港
                jsonData = $.extend(jsonData, _self.formData.hk)
                data.areaData.hk = $.extend({}, _self.formData.hk)
            } else if (areaType === 3) { // 海外
                jsonData = $.extend(jsonData, _self.formData.hw)
                data.areaData.hw = $.extend({}, _self.formData.hw)
            }
            data.quality_info = $.extend({}, jsonData)
            util.setCache('lmp_All_info', data) // 当前页数据存储到全局lmp_All_info

            this.$router.push({ path: '/logistics_basic_info' })
        },

        // 下一步
        next (formName, type) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    let jsonData = {
                        current_step: 2, // 流程步骤
                        area_type: _self.formData.area_type * 1
                    }
                    let areaType = _self.formData.area_type * 1
                    if (areaType === 1) { // 大陆
                        jsonData = $.extend(jsonData, _self.formData.cn)
                    } else if (areaType === 2) { // 香港
                        jsonData = $.extend(jsonData, _self.formData.hk)
                    } else if (areaType === 3) { // 海外
                        jsonData = $.extend(jsonData, _self.formData.hw)
                    }

                    api.saveLogisticsEnterprise(jsonData).then((res) => {
                        if (res.code === 200) {
                            let data = util.getCache('lmp_All_info')
                            data.quality_info = $.extend({}, jsonData)
                            util.setCache('lmp_All_info', data) // 当前页数据存储到全局lmp_All_info

                            if (type === 'save') { // 保存按钮回到查看资料页面
                                _self.$router.push({ path: '/affiliate_message' })
                            } else {
                                _self.$router.push({ path: '/scale' })
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
    $prfClass: 'aptitude-info';
    .#{$prfClass}-form{
        width: 900px;
        margin: 0 auto 120px;
        background-color: #fff;
        height: auto;
        padding-bottom: 58px;

        .area_txt{
            color: #bfc3cb;
            padding-left: 6px;
            font-size: 12px;
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
        .serviceList{
            width: 380px;
            display: inline-block;
            .el-checkbox__label{
                padding-left: 7px;
            }
            .el-checkbox+.el-checkbox{
                margin-left: 29px;
                line-height: 20px;
            }
            .el-checkbox:nth-child(5n){
                margin-left: 0px;
            }
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
            margin-top: 15px;
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
        .el-upload__tip{
            margin-top: 11px;
            line-height: 0px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #bfc3cb;
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
        .fileBottom{
            margin-bottom: 16px;
            .el-form-item__content{
                line-height: 24px;
            }
        }
        .el-form-item__error, .error{
            margin-left: 8px;
            display: inline-block;
            position: static;
            font-size: 14px;
            color: #f46b6b;
        }
        .asset_injection {
            display: inline-block;
            margin-bottom: 6px;
            .asset_input{
                width:227px;
            }
            .asset_select{
                margin-left: 10px;
                width:121px;
                height:40px;
                .el-input{
                    width:121px;
                }
            }
            .el-form-item__error, .error{
                margin-left: 8px;
                position: absolute;
                font-size: 14px;
                color: #f46b6b;
                left: 672px;
                width: 100px;
                top: 15px;
                padding-top: 0px;
            }
        }
        .registed_capital_curr {
            display: inline-block;
            width:121px;
            margin-bottom: 0px;
            .asset_select{
                margin-left: 10px;
                height:40px;
                .el-input{
                    width:121px;
                }
            }
            .el-form-item__error, .error{
                margin-left: 8px;
                position: absolute;
                font-size: 14px;
                color: #f46b6b;
                left: 4px;
                padding-top: 0px;
            }
        }
        .el-upload-list__item-name{
            color: #409EFF;
        }
        .capital_txt{
            margin-left: 290px;
            color: #bfc3cb;
            font-size: 12px;
            margin-bottom: 16px;
        }

    }
</style>
