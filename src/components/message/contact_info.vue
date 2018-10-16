<template>
    <div :class="prfClass">
        <div class="phone_bottom">
            <ul>
                <li>
                    <div>职务</div>
                    <div>姓名</div>
                    <div>手机号码</div>
                    <div>固定电话</div>
                    <div>邮箱</div>
                    <div>QQ</div>
                    <div>传真</div>
                </li>
                <li>
                    <div>{{ contact_info.chief_contact.position }}</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.chief_contact.name && contact_info.chief_contact.name != ''"
                            placement="right-end"
                            :content="contact_info.chief_contact.name">
                            <span class="nameCls">{{ contact_info.chief_contact.name }}</span>
                        </el-tooltip>
                    </div>
                    <div>{{contact_info.chief_contact.phone}}</div>
                    <div>{{contact_info.chief_contact.landline}}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                </li>
                <li>
                    <div>业务</div>
                    <div>
                        <el-tooltip
                            placement="right-end"
                            v-if="contact_info.business_contact.name && contact_info.business_contact.name != ''"
                            :content="contact_info.business_contact.name">
                            <span class="nameCls">{{ contact_info.business_contact.name }}</span>
                        </el-tooltip>
                    </div>
                    <div>{{contact_info.business_contact.phone}}</div>
                    <div>{{contact_info.business_contact.landline}}</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.business_contact.email && contact_info.business_contact.email != ''"
                            :content="contact_info.business_contact.email" placement="right-end">
                            <span class="nameCls">{{ contact_info.business_contact.email }}</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.business_contact.qq && contact_info.business_contact.qq != ''"
                            :content="contact_info.business_contact.qq" placement="right-end">
                            <span class="nameCls">{{contact_info.business_contact.qq}}</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.business_contact.fax && contact_info.business_contact.fax != ''"
                            :content="contact_info.business_contact.fax" placement="right-end">
                            <span class="nameCls">{{contact_info.business_contact.fax}}</span>
                        </el-tooltip>
                    </div>
                </li>
                <li>
                    <div>财务</div>
                    <div>
                        <el-tooltip
                            placement="right-end"
                            v-if="contact_info.finance_contact.name && contact_info.finance_contact.name != ''"
                            :content="contact_info.finance_contact.name">
                            <span class="nameCls">{{ contact_info.finance_contact.name }}</span>
                        </el-tooltip>
                    </div>
                    <div>{{contact_info.finance_contact.phone}}</div>
                    <div>{{contact_info.finance_contact.landline}}</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.finance_contact.email && contact_info.finance_contact.email != ''"
                            :content="contact_info.finance_contact.email" placement="right-end">
                            <span class="nameCls">{{ contact_info.finance_contact.email }}</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.finance_contact.qq
                                        && contact_info.finance_contact.qq != ''"
                            :content="contact_info.finance_contact.qq" placement="right-end">
                            <span class="nameCls">{{contact_info.finance_contact.qq}}</span>
                        </el-tooltip>
                    </div>
                    <div></div>
                </li>
                <li>
                    <div>IT</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.it_contact.name && contact_info.it_contact.name != ''"
                            :content="contact_info.it_contact.name" placement="right-end">
                            <span class="nameCls">{{ contact_info.it_contact.name }}</span>
                        </el-tooltip>
                    </div>
                    <div>{{contact_info.it_contact.phone}}</div>
                    <div>{{contact_info.it_contact.landline}}</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.it_contact.email && contact_info.it_contact.email != ''"
                            :content="contact_info.it_contact.email" placement="right-end">
                            <span class="nameCls">{{ contact_info.it_contact.email }}</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.it_contact.qq
                                        && contact_info.it_contact.qq != ''"
                            :content="contact_info.it_contact.qq" placement="right-end">
                            <span class="nameCls">{{contact_info.it_contact.qq}}</span>
                        </el-tooltip>
                    </div>
                    <div></div>
                </li>
                <li>
                    <div>客服</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.cutomer_contact.name && contact_info.cutomer_contact.name != ''"
                            :content="contact_info.cutomer_contact.name" placement="right-end">
                            <span class="nameCls">{{ contact_info.cutomer_contact.name }}</span>
                        </el-tooltip>
                    </div>
                    <div>{{contact_info.cutomer_contact.phone}}</div>
                    <div>{{contact_info.cutomer_contact.landline}}</div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.cutomer_contact.email && contact_info.cutomer_contact.email != ''"
                            :content="contact_info.cutomer_contact.email" placement="right-end">
                            <span class="nameCls">{{ contact_info.cutomer_contact.email }}</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-tooltip
                            v-if="contact_info.cutomer_contact.qq
                                        && contact_info.cutomer_contact.qq != ''"
                            :content="contact_info.cutomer_contact.qq" placement="right-end">
                            <span class="nameCls">{{contact_info.cutomer_contact.qq}}</span>
                        </el-tooltip>
                    </div>
                    <div></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contact_info',
    data () {
        return {
            prfClass: 'contact-info-cont'
        }
    },
    props: {
        contact_info: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style lang="scss">

</style>
