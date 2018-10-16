<template>
    <div :class="prfClass">
        <div class="bottom">
            <ul>
                <li>
                    <div><span class="red">*</span>员工人数</div>
                    <div>{{ staff_num }}</div>
                    <div><span class="spanCls">海外（含香港）仓储面积（m³）</span></div>
                    <div>{{ scale_facilities.warehouse_space_out == 0 ? '' : scale_facilities.warehouse_space_out}}</div>
                </li>
                <li>
                    <div><span class="spanCls">营业网点/分店机构（含海外）</span></div>
                    <div class="network">
                        <ul>
                            <li :key="index" v-for="(item, index) in scale_facilities.branch_network">
                                <a href="javascript:;" class="threeCls">
                                    {{ item.country_name + '/' + item.province_name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>查件网址</div>
                    <div>
                        <span class="showCls">
                            {{scale_facilities.search_website}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="red">*</span><span class="spanCls">近3年营业收入（万）</span></div>
                    <div class="network">
                        <ul>
                            <li :key="index" v-for="(item, index) in scale_facilities.three_year_revenue">
                                <a href="javascript:;" class="threeCls">
                                    {{ item.year + '年-' + item.income + ' ' + currencyFn(item.currency) }}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div><span class="spanCls">近半年TOP3客户名称</span></div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in scale_facilities.customer_list">
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
                    <div><span class="spanCls">近半年TOP3客户货量占比</span></div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in scale_facilities.volume_ratio">
                                <a href="javascript:;"
                                   @click="preview(item)"
                                   :data-url="item.url">
                                    <i class="el-icon-document"></i>
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>航线分布</div>
                    <div>
                        <span class="showCls">
                            {{scale_facilities.route_distribution}}
                        </span>
                    </div>
                </li>
                <li>
                    <div><span class="spanCls">客运往国家和地区</span></div>
                    <div>
                        <span class="showCls">
                            {{scale_facilities.country_region}}
                        </span>
                    </div>
                    <div>清关口岸</div>
                    <div>
                        <span class="showCls">
                            {{scale_facilities.clearance_port}}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'scale_info',
    data () {
        return {
            prfClass: 'scale-info-cont'
        }
    },
    props: {
        scale_facilities: {
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
        staff_num () {
            let val = ''
            let type = this.scale_facilities.staff_num * 1
            switch (type) {
            case 1:
                val = '50以下'
                break
            case 2:
                val = '100~300'
                break
            case 3:
                val = '300~500'
                break
            case 4:
                val = '500~1000'
                break
            case 5:
                val = '1000以上'
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

<style scoped>

</style>
