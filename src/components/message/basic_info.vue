<template>
    <div :class="prfClass">
        <div class="bottom">
            <ul>
                <li>
                    <div><span class="red">*</span>公司中文名</div>
                    <div>
                        <span class="showCls">{{ basic_info.company_cn }}</span>
                    </div>
                    <div><span class="red">*</span>服务类型</div>
                    <div><span style="width: 180px; line-height: 22px">{{ serviceType }}</span></div>
                </li>
                <li>
                    <div>公司英文名</div>
                    <div>{{basic_info.company_en}}</div>
                    <div>简介附件</div>
                    <div class="attachCls">
                        <ul>
                            <li :key="index" v-for="(item, index) in basic_info.profile_attachment">
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
                    <div><span class="red">*</span>公司简介</div>
                    <div>
                        <span class="showCls">{{ basic_info.company_profile }}</span>
                    </div>
                    <div>公司电话</div>
                    <div>{{basic_info.company_phone}}</div>
                </li>
                <li>
                    <div><span class="red">*</span>公司网站</div>
                    <div>
                        <span class="showCls">{{basic_info.company_website}}</span>
                    </div>
                    <div><span class="red">*</span>办公地址</div>
                    <div>
                        <span class="showCls">{{basic_info.office_addr}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'basic_info_cont',
    data () {
        return {
            prfClass: 'basic-info-cont'
        }
    },
    props: {
        basic_info: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        serviceType () {
            let _self = this
            let arr = _self.basic_info.service_type
            let serviceData = ''
            for (let i in arr) {
                switch (arr[i] * 1) {
                case 1:
                    serviceData += '揽收、'
                    break
                case 2:
                    serviceData += '仓库操作、'
                    break
                case 3:
                    serviceData += '报关、'
                    break
                case 4:
                    serviceData += '国内运输、'
                    break
                case 5:
                    serviceData += '国际运输、'
                    break
                case 6:
                    serviceData += '清关、'
                    break
                case 7:
                    serviceData += '本地送仓、'
                    break
                case 8:
                    serviceData += '尾程派送、'
                    break
                default:
                    break
                }
            }
            serviceData = serviceData.substring(0, serviceData.length - 1)
            return serviceData
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
    $prfClass: 'basic-info-cont';
    .#{$prfClass}{
    }
</style>
