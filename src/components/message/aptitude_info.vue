<template>
    <div :class="prfClass">
        <div class="bottom">
            <!--大陆-->
            <ul v-if="quality_info.area_type == 1">
                <li>
                    <div><span class="red">*</span>所属区域</div>
                    <div>{{ areaType }}</div>
                    <div>
                        <span v-if="quality_info.bs_license_type == 2 ">
                            <span class="red">*</span>营业执照有效期
                        </span>
                    </div>
                    <div>
                        <span v-if="quality_info.bs_license_type == 2 ">
                            {{ quality_info.bs_license_date }}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span><span class="spanCls">执照类型（是否永久经营）</span></div>
                    <div>{{ bsLicenseType }}</div>
                    <div><span class="red">*</span>注册资本</div>
                    <div>{{quality_info.registed_capital}}万 {{ currencyFn(quality_info.registed_capital_curr) }}</div>
                </li>
                <li>
                    <div><span class="red">*</span>成立时间</div>
                    <div>{{quality_info.founding_date}}</div>
                    <div><span class="red">*</span>营业执照地址</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.bs_license_addr}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span>年报公示日期</div>
                    <div>{{quality_info.annual_report_date}}</div>
                    <div><span class="red">*</span>法人代表</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.legal_rep}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span><span class="spanCls">营业执照（副本）</span></div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.bs_license">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>主要股东</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.principal_shareholder">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span>法人身份证</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.legal_id">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>印鉴卡</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.signature_card">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div>其他材料证明</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.other_attachment">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div></div>
                    <div></div>
                </li>
            </ul>
            <!--香港-->
            <ul v-if="quality_info.area_type == 2">
                <li>
                    <div><span class="red">*</span>所属区域</div>
                    <div>{{ areaType }}</div>
                    <div><span class="red">*</span>注册资本</div>
                    <div>{{quality_info.registed_capital}}万 {{ currencyFn(quality_info.registed_capital_curr) }}</div>
                </li>
                <li>
                    <div><span class="red">*</span>CR</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.cr_attachment">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div><span class="red">*</span>BR</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.br_attachment">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span>成立时间</div>
                    <div>{{quality_info.founding_date}}</div>
                    <div><span class="red">*</span>营业执照地址</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.bs_license_addr}}
                        </span>
                    </div>
                </li>
                <li>
                    <div>年报公示日期</div>
                    <div>{{quality_info.annual_report_date}}</div>
                    <div><span class="red">*</span>法人代表</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.legal_rep}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span><span class="spanCls">周年报/法团成立表</span></div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.incorporation_form">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div><span class="red">*</span>法人身份证</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.legal_id">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div>主要股东</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.principal_shareholder">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>年报附件上传</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.annual_report">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div>其他材料证明</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.other_attachment">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>印鉴卡</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.signature_card">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <!--海外-->
            <ul v-if="quality_info.area_type == 3">
                <li>
                    <div><span class="red">*</span>所属区域</div>
                    <div>{{ areaType }}</div>
                    <div><span class="red">*</span>注册资本</div>
                    <div>{{quality_info.registed_capital}}万 {{ currencyFn(quality_info.registed_capital_curr) }}</div>
                </li>
                <li>
                    <div><span class="red">*</span>成立时间</div>
                    <div>{{quality_info.founding_date}}</div>
                    <div><span class="red">*</span>法人代表</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.legal_rep}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span>营业执照地址</div>
                    <div>
                        <span class="showCls">
                            {{quality_info.bs_license_addr}}
                        </span>
                    </div>
                    <div>章程</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.regulations">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span><span>公司注册证</span></div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.registration">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>其他材料证明</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in quality_info.other_attachment">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.save_path">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'aptitude_info',
    data () {
        return {
            prfClass: 'aptitude-info-cont'
        }
    },
    props: {
        quality_info: {
            type: Object,
            default () {
                return {}
            }
        },
        currencyData: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        // 区域类型
        areaType () {
            let _self = this
            let val = ''
            switch (_self.quality_info.area_type * 1) {
            case 1:
                val = '大陆'
                break
            case 2:
                val = '香港'
                break
            case 3:
                val = '台澳及海外'
                break
            default:
                break
            }
            return val
        },

        // 营业执照类型（是否永久经营）：2#否 1#是
        bsLicenseType () {
            let _self = this
            let type = _self.quality_info.bs_license_type
            let val = ''
            switch (type * 1) {
            case 1:
                val = '是'
                break
            case 2:
                val = '否'
                break
            default:
                break
            }
            return val
        },
        // 营收
        currencyFn () {
            let _self = this
            return function (currency) {
                let val = ''
                _self.currencyData.forEach((item, idx) => {
                    if (item.currency === currency) {
                        val = item.name
                        return val
                    }
                })
                return val
            }
        }

    },
    methods: {
        // 预览图片
        preview (item) {
            let _self = this
            // 文件格式
            let oName = item.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(item.url)
            } else { // 图片
                let data = {
                    showPreview: true,
                    srcs: item.url
                }
                _self.$emit('preview', data)
            }
        }
    }
}
</script>

<style lang="scss">

</style>
