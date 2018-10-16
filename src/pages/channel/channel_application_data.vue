<template>
    <div :class="prfClass">
        <common-header></common-header>
        <section class="breadcrumb-box">
            <breadcrumb :breadcrumb_list="breadcrumbList"></breadcrumb>
        </section>
        <div class="topCont">
            <h3>渠道申请资料({{ mode_type }})</h3>
            <p class="application-status">状态：<span>{{channel_status}}</span></p>
        </div>
        <div :class="[prfClass + '-wrap']">
            <div :class="[prfClass + '-form']">
                <div>
                    <div class="form-box">
                        <ul class="table-ul">
                            <!-- 基础信息 -->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.basic_info.is_done == 1"></i>
                                        <i class="el-icon-not" v-else>1</i>
                                        <div>
                                            <h4>基础信息</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.basic_info.is_done != 1}">{{ fields.basic_info.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.basic_info.is_done == 1" @click="edit_bascicInfo('edit')">修改资料</span>
                                        <span v-if="fields.basic_info.is_done == 2" @click="edit_bascicInfo('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span>渠道名称</div>
                                            <div style="word-break: break-all;">{{fields.basic_info.channel_name}}</div>
                                            <div><span class="red">*</span>发货类型</div>
                                            <div>
                                                <span v-if="fields.basic_info.shipping_type != ''">{{ fields.basic_info.shipping_type == 1 ? '国内发货': '海外仓发货' }}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>业务类型</div>
                                            <div>
                                                <span v-if="fields.basic_info.biz_type != '' ">
                                                    {{ fields.basic_info.biz_type == 1 ? 'B2B': 'B2C' }}
                                                </span>
                                            </div>
                                            <div><span class="red">*</span>派送类型</div>
                                            <div>{{delivery_type}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>服务类型</div>
                                            <div>{{service_type}}</div>
                                            <div><span class="red">*</span>运输方式</div>
                                            <div>{{transport_type}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>服务区域</div>
                                            <div>{{service_region}}</div>
                                            <div><span class="red">*</span>是否可跟踪</div>
                                            <div>
                                                <span v-if="fields.basic_info.is_trackable != '' ">
                                                    {{ fields.basic_info.is_trackable == 1 ? '是': '否' }}
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>查询网址</div>
                                            <div style="word-break: break-all;">{{fields.basic_info.track_url}}</div>
                                            <div><span class="red">*</span>运输时效</div>
                                            <div>{{fields.basic_info.transport_time_min === null ? '' : fields.basic_info.transport_time_min}} - {{fields.basic_info.transport_time_max === null ? '' : fields.basic_info.transport_time_max}} 工作日</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>运输时效达标率</div>
                                            <div>{{fields.basic_info.transport_time_rate}} %</div>
                                            <div><span class="red">*</span>上网时效</div>
                                            <div>{{fields.basic_info.online_time_min === null ? '' : fields.basic_info.online_time_min}} - {{fields.basic_info.online_time_max === null ? '' : fields.basic_info.online_time_max}} 工作日</div>
                                        </li>
                                        <li v-if="mode_type == 'B2B' ">
                                            <div><span class="red">*</span>清关时效</div>
                                            <div>{{fields.basic_info.clearance_time_min === null ? '' : fields.basic_info.clearance_time_min}} - {{fields.basic_info.clearance_time_max === null ? '' : fields.basic_info.clearance_time_max}} 工作日</div>
                                            <div><span class="red">*</span>清关时效达标率</div>
                                            <div>{{fields.basic_info.clearance_time_rate}} %</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>上网达标率</div>
                                            <div>{{fields.basic_info.online_time_rate}} %</div>
                                            <div><span class="red">*</span>投诉率</div>
                                            <div>{{fields.basic_info.complaint_rate}} %</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>扣关率</div>
                                            <div>{{fields.basic_info.deducation_time_rate}} %</div>
                                            <div><span class="red">*</span>是否支持COD订单</div>
                                            <div>
                                                <span v-if="fields.basic_info.is_cod_supported != ''">
                                                    {{ fields.basic_info.is_cod_supported == 1 ? '是': '否' }}
                                                </span>
                                            </div>
                                        </li>
                                        <li v-if="mode_type === 'B2B'">
                                            <div><span class="red">*</span>POD返回及时率</div>
                                            <div>{{fields.basic_info.pod_back_time_rate}} %</div>
                                            <div><span class="red">*</span>POD返回时效</div>
                                            <div>{{fields.basic_info.pod_back_time_min === null ? '' : fields.basic_info.pod_back_time_min}} - {{fields.basic_info.pod_back_time_max === null ? '' : fields.basic_info.pod_back_time_max}} 工作日</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>付款保留小数位</div>
                                            <div><span>{{precisionType[fields.basic_info.precision_type - 1]}} {{fields.basic_info.pay_precision}}</span></div>
                                            <div>备注</div>
                                            <div style="word-break: break-all;">{{fields.basic_info.remark}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!-- 操作要求 -->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.operate_require.is_done == 1"></i>
                                        <i class="el-icon-not" v-else>2</i>
                                        <div>
                                            <h4>操作要求</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.operate_require.is_done == 2}">{{ fields.operate_require.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.operate_require.is_done == 1" @click="edit_operateRequire('edit')">修改资料</span>
                                        <span v-if="fields.basic_info.is_done == 1 && fields.operate_require.is_done == 2" @click="edit_operateRequire('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">单票最小重量（KG）</span></div>
                                            <div>{{fields.operate_require.min_weight}}</div>
                                            <div><span class="red">*</span><span style="width: 90px">单票最大重量（KG）</span></div>
                                            <div>{{fields.operate_require.max_weight}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">单票最小尺寸（CM）</span></div>
                                            <div>
                                                <span>长:{{fields.operate_require.min_length}}</span>
                                                <span>宽:{{fields.operate_require.min_width}}</span>
                                                <span>高:{{fields.operate_require.min_height}}</span>
                                            </div>
                                            <div><span class="red">*</span><span style="width: 90px">单票最大尺寸（CM）</span></div>
                                            <div>
                                                <span>长:{{fields.operate_require.max_length}}</span>
                                                <span>宽:{{fields.operate_require.max_width}}</span>
                                                <span>高:{{fields.operate_require.max_height}}</span></div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>周长计算公式</div>
                                            <div>{{fields.operate_require.perimeter_coeff_length}}*长 + {{fields.operate_require.perimeter_coeff_width}}*宽 + {{fields.operate_require.perimeter_coeff_height}}*高</div>
                                            <div><span class="red">*</span>最大周长（CM）</div>
                                            <div>{{fields.operate_require.max_perimeter}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">带电产品发货要求</span></div>
                                            <div>{{ elec_prod_requires }}</div>
                                            <div>
                                                <span v-if="mode_type == 'B2C'"><span class="red">*</span>分货要求</span>
                                            </div>
                                            <div>
                                                <span v-if="mode_type == 'B2C'">{{ separate_requires }}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!--数据要求-->
                            <li v-if="mode_type == 'B2C'">
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.data_require.is_done == 1"></i>
                                        <i class="el-icon-not" v-else>3</i>
                                        <div>
                                            <h4>数据要求</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.data_require.is_done == 2}">{{ fields.data_require.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.data_require.is_done == 1" @click="edit_dataRequire('edit')">修改资料</span>
                                        <span v-if="fields.operate_require.is_done == 1 && fields.data_require.is_done == 2" @click="edit_dataRequire('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">跟踪号获取方式</span></div>
                                            <div>{{track_no_get_type}}</div>
                                            <div><span class="red">*</span><span style="width: 90px">物流跟踪号规则</span></div>
                                            <div class="track_no_rules">{{track_no_rules}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">邮递标签打印规格</span></div>
                                            <div>{{print_spec}}</div>
                                            <div><span class="red">*</span><span style="width: 90px">邮递标签联数</span></div>
                                            <div>{{fields.data_require.couplet_type === 1 ? '一联': fields.data_require.couplet_type === 2 ? '二联' : fields.data_require.couplet_type === 3 ? '三联' : ''}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!--发货要求-->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.ship_require.is_done == 1"></i>
                                        <i class="el-icon-not" v-if="fields.ship_require.is_done == 2 && mode_type == 'B2B'">3</i>
                                        <i class="el-icon-not" v-if="fields.ship_require.is_done == 2 && mode_type == 'B2C'">4</i>
                                        <div>
                                            <h4>发货要求</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.ship_require.is_done == 2}">{{ fields.ship_require.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.ship_require.is_done == 1" @click="edit_shipRequire('edit')">修改资料</span>
                                        <span v-if="fields.operate_require.is_done == 1 && fields.ship_require.is_done == 2 && mode_type == 'B2B'" @click="edit_shipRequire('add')">填写资料</span>
                                        <span v-if="fields.data_require.is_done == 1 && fields.ship_require.is_done == 2 && mode_type == 'B2C'" @click="edit_shipRequire('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span>申报比例（%）</div>
                                            <div>{{fields.ship_require.decalre_ratio}}</div>
                                            <div><span class="red">*</span><span style="width: 90px">最大申报价值（USD）</span></div>
                                            <div>{{fields.ship_require.decalre_value_usd_max}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">最小申报价值（USD）</span></div>
                                            <div>{{fields.ship_require.decalre_value_usd_min}}</div>
                                            <div><span class="red">*</span>是否有禁发属性</div>
                                            <div>{{ fields.ship_require.has_prohibits == 1 ? '是': fields.ship_require.has_prohibits == 2 ? '否': '' }}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>禁发属性</div>
                                            <div>{{prohibited_cates}}</div>
                                            <div>其他规则要求</div>
                                            <div style="word-break: break-all;">{{fields.ship_require.other_requires}}</div>
                                        </li>
                                        <li v-if="mode_type == 'B2C'">
                                            <div><span class="red">*</span>是否支持PO BOX</div>
                                            <div>{{ fields.ship_require.is_pobox_supported == 1 ? '是': fields.ship_require.is_pobox_supported == 2 ? '否': '' }}</div>
                                            <div></div>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!--售后服务-->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.sale_service.is_done == 1"></i>
                                        <i class="el-icon-not" v-if="fields.sale_service.is_done == 2 && mode_type == 'B2B'">4</i>
                                        <i class="el-icon-not" v-if="fields.sale_service.is_done == 2 && mode_type == 'B2C'">5</i>
                                        <div>
                                            <h4>售后服务</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.sale_service.is_done == 2}">{{ fields.sale_service.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.sale_service.is_done == 1" @click="edit_saleService('edit')">修改资料</span>
                                        <span v-if="fields.ship_require.is_done == 1 && fields.sale_service.is_done == 2" @click="edit_saleService('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li v-if="mode_type == 'B2C'">
                                            <div><span class="red">*</span>重派次数</div>
                                            <div>{{fields.sale_service.redelivery_times}}</div>
                                            <div><span class="red">*</span>重派费用</div>
                                            <div>{{ fields.sale_service.redelivery_fee}}</div>
                                        </li>
                                        <li v-if="mode_type == 'B2C'">
                                            <div style="word-break: break-all;"><span class="red">*</span>退件地址</div>
                                            <div>{{ fields.sale_service.return_address}}</div>
                                            <div><span class="red">*</span>退件费用</div>
                                            <div>{{ fields.sale_service.return_fee}}</div>
                                        </li>
                                        <li v-if="mode_type == 'B2C'">
                                            <div><span class="red">*</span>销毁费用</div>
                                            <div>{{ fields.sale_service.destroy_fee}}</div>
                                            <div></div>
                                            <div></div>
                                        </li>
                                        <li class="is-compensatable-li">
                                            <div><span class="red">*</span><span style="width: 90px">是否接受赔偿（以及赔偿细节）</span></div>
                                            <div style="width:585px;">
                                                <p class="div" style="text-align:center">{{ fields.sale_service.is_compensatable == 1 ? '是': fields.sale_service.is_compensatable == 2 ? '否': '' }}</p>
                                                <p class="div" v-html=compensationRules v-if="fields.sale_service.is_compensatable == 1" style="word-break: break-all;">{{compensationRules}}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>索赔所需资料</div>
                                            <div>
                                                <ul class="attachment">
                                                    <li :key="index" v-for="(item, index) in fields.sale_service.claim_attachs">
                                                        <a href="javascript:;"
                                                        @click="preview(item)"
                                                        :data-url="item.url">
                                                            <i class="el-icon-document"></i>
                                                            {{ item.origin_name }}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div><span class="red">*</span>是否接受开查</div>
                                            <div>{{ fields.sale_service.is_accept_query == 1 ? '是': fields.sale_service.is_accept_query == 2 ? '否': '' }}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>受理开查的条件</div>
                                            <div>{{ fields.sale_service.query_condition}}
                                            </div>
                                            <div><span class="red">*</span>开查回复时效</div>
                                            <div>
                                                <ul class="attachment">
                                                    <li :key="index" v-for="(item, index) in fields.sale_service.query_reply_attachs">
                                                        <a href="javascript:;"
                                                        @click="preview(item)"
                                                        :data-url="item.url">
                                                            <i class="el-icon-document"></i>
                                                            {{ item.origin_name }}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <div>备注</div>
                                            <div style="word-break: break-all;">{{fields.sale_service.remark}}</div>
                                            <div></div>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                             <!--计费模式-->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.billing_mode.is_done == 1"></i>
                                        <i class="el-icon-not" v-if="fields.billing_mode.is_done == 2 && mode_type == 'B2B'">5</i>
                                        <i class="el-icon-not" v-if="fields.billing_mode.is_done == 2 && mode_type == 'B2C'">6</i>
                                        <div>
                                            <h4>计费模式</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.billing_mode.is_done == 2}">{{ fields.billing_mode.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.billing_mode.is_done == 1" @click="edit_billingMode('edit')">修改资料</span>
                                        <span v-if="fields.sale_service.is_done == 1 && fields.billing_mode.is_done == 2" @click="edit_billingMode('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span><span style="width: 90px">计费重是否接受我司取值</span></div>
                                            <div>{{ fields.billing_mode.is_acceptable == 1 ? '是': fields.billing_mode.is_acceptable == 2 ? '否': '' }}</div>
                                            <div><span class="red">*</span>是否含关税</div>
                                            <div>{{ fields.billing_mode.is_inc_tariff == 1 ? '是': fields.billing_mode.is_inc_tariff == 2 ? '否': '' }}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>是否含增值税</div>
                                            <div>{{ fields.billing_mode.is_inc_vat == 1 ? '是': fields.billing_mode.is_inc_vat == 2 ? '否': '' }}</div>
                                            <div><span class="red">*</span>计费重类型</div>
                                            <div>{{ fields.billing_mode.billing_weight_type == 1 ? '实重': fields.billing_mode.billing_weight_type == 2 ? '实重与体积重大者': '' }}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>体积系数</div>
                                            <div>{{volume_coeff_type}}</div>
                                            <div><span class="red">*</span>分泡比</div>
                                            <div>{{fpb_rate_type}}</div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>计费单位</div>
                                            <div>{{billing_unit}}</div>
                                            <div></div>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <!--附件上传-->
                            <li>
                                <div class="top">
                                    <div class="left">
                                        <i class="el-icon-success" v-if="fields.quote_attach.is_done == 1"></i>
                                        <i class="el-icon-not" v-if="fields.quote_attach.is_done == 2 && mode_type == 'B2B'">6</i>
                                        <i class="el-icon-not" v-if="fields.quote_attach.is_done == 2 && mode_type == 'B2C'">7</i>
                                        <div>
                                            <h4>附件上传</h4>
                                            <p>
                                                状态:
                                                <span :class="{not: fields.quote_attach.is_done == 2}">{{ fields.quote_attach.is_done == 1 ? '已填写': '未填写' }}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right" v-if="is_edit_channel">
                                        <span v-if="fields.quote_attach.is_done == 1" @click="edit_quoteAttach('edit')">修改资料</span>
                                        <span v-if="fields.billing_mode.is_done == 1 && fields.quote_attach.is_done == 2" @click="edit_quoteAttach('add')">填写资料</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <ul>
                                        <li>
                                            <div><span class="red">*</span>报价附件</div>
                                            <div style="width:585px;">
                                                <ul class="attachment">
                                                    <li :key="index" v-for="(item, index) in fields.quote_attach.quote_attachs">
                                                        <a href="javascript:;"
                                                        @click="preview(item)"
                                                        :data-url="item.url">
                                                            <i class="el-icon-document"></i>
                                                            {{ item.origin_name }}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <div><span class="red">*</span>操作SOP</div>
                                            <div>
                                                <ul class="attachment">
                                                    <li :key="index" v-for="(item, index) in fields.quote_attach.sop_attachs">
                                                        <a href="javascript:;"
                                                        @click="preview(item)"
                                                        :data-url="item.url">
                                                            <i class="el-icon-document"></i>
                                                            {{ item.origin_name }}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>API对接资料</div>
                                            <div>
                                                <ul class="attachment">
                                                    <li :key="index" v-for="(item, index) in fields.quote_attach.api_attachs">
                                                        <a href="javascript:;"
                                                        @click="preview(item)"
                                                        :data-url="item.url">
                                                            <i class="el-icon-document"></i>
                                                            {{ item.origin_name }}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <div>备注</div>
                                            <div style="word-break: break-all;">{{fields.quote_attach.remark}}</div>
                                            <div></div>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div class="footer">
                            <el-button  v-if="is_submit" type="primary" class="btn-submit" @click="submitForm()">提交审核</el-button>
                            <a href="javascript:" class="link-back" @click="back()">返回列表</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import channelApi from '../../api/channel'
import breadcrumb from '../../components/breadcrumb'
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
import util from 'commonVueLib/util/tools'

export default {
    name: 'channel_application_data',
    components: {
        CommonHeader,
        ImagePreview,
        breadcrumb
    },
    data () {
        return {
            prfClass: 'channel-data-info',
            is_edit_channel: false,
            is_add_channel: true,
            precisionType: ['四舍五入', '进一', '去尾'], // 付款保留小数位
            is_submit: false, // 是否可以提交
            fields: {
                status: '0', // 本条数据的状态 默认为申请
                basic_info: { // 基础信息部分
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
                operate_require: { // 操作要求
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
                data_require: { // 数据要求
                    id: '', // 该条渠道数据的id
                    is_done: 2, // 是否已完成 1是 2否
                    track_no_get_type: 0, // 跟踪号获取方式 1-api获取，2-内部用号，3-预存，4-面单中，5-无跟踪号
                    track_no_rules: [{rule: ''}], // 跟踪号规则
                    print_spec: 0, // 邮递标签打印规格 1-A4 2-1010 3-1016.5 4-1020 5-2312.7
                    couplet_type: 0 // 邮递标签联数 1#一联 2#二联 3#个性化
                },
                ship_require: {
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
                sale_service: {
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
                    is_accept_query: 1, // 是否接受开查
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
                billing_mode: {
                    id: '', // 该条渠道数据的id
                    is_done: 2, // 是否已完成 1是 2否
                    is_acceptable: 0, // 计费重是否接受我司取值
                    is_inc_tariff: 0, // 是否含关税
                    is_inc_vat: 0, // 是否含增值税
                    billing_weight_type: 0, // 计费重类型
                    volume_coeff_type: 0, // 体积系数
                    fpb_rate_type: 0, // 分泡比
                    billing_unit: 0 // 计费单位
                },
                quote_attach: {
                    id: '', // 该条渠道数据的id
                    is_done: 2, // 是否已完成 1是 2否
                    quote_attachs: [], // 报价附件
                    sop_attachs: [], // 操作sop
                    api_attachs: [], // api对接资料
                    remark: '' // 备注
                }
            },
            showPreview: false, // 显示图片预览窗口
            srcs: '',
            mode_type: 'B2B',
            breadcrumbList: [ // 面包屑
                {
                    name: '渠道管理',
                    url: '/channel_list'
                }, {
                    name: '渠道申请资料',
                    url: ''
                }
            ]
        }
    },
    computed: {
        channel_status () { // 渠道的当前申请状态 1、待提交 2、审核中 3、审核通过 4、审核驳回 5、修改中
            let status = this.fields.status
            let val = ''
            switch (status * 1) { // 将status转成数字类型
            case 0:
                val = '申请'
                break
            case 1:
                val = '待提交'
                break
            case 2:
                val = '审核中'
                break
            case 3:
                val = '审核通过'
                break
            case 4:
                val = '审核驳回'
                break
            case 5:
                val = '修改中'
                break
            default:
                break
            }
            return val
        },
        delivery_type () { // 派送类型
            let status = this.fields.basic_info.delivery_type
            switch (status * 1) {
            case 1:
                return '全程'
            case 2:
                return '中转'
            case 3:
                return '尾程'
            default:
                break
            }
        },
        service_type () { // 业务类型
            let _self = this
            let arr = _self.fields.basic_info.service_type
            let serviceData = ''
            for (let i = 0; i < arr.length; i++) {
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
            return serviceData.substring(0, serviceData.length - 1)
        },
        transport_type () { // 运输方式
            let status = this.fields.basic_info.transport_type
            switch (status * 1) {
            case 1:
                return '空运'
            case 2:
                return '海运'
            case 3:
                return '铁运'
            case 4:
                return '汽运&卡车'
            default:
                break
            }
        },
        volume_coeff_type () { // 体积系数
            let status = this.fields.billing_mode.volume_coeff_type
            switch (status * 1) {
            case 1:
                return '4000'
            case 2:
                return '5000'
            case 3:
                return '6000'
            case 4:
                return '7000'
            case 5:
                return '8000'
            default:
                break
            }
        },
        fpb_rate_type () { // 分泡比
            let status = this.fields.billing_mode.fpb_rate_type
            switch (status * 1) {
            case 1:
                return '不分泡'
            case 2:
                return '分1/3泡'
            case 3:
                return '分半泡'
            case 4:
                return '分2/3泡'
            default:
                break
            }
        },
        billing_unit () { // 计费单位
            let status = this.fields.billing_mode.billing_unit
            switch (status * 1) {
            case 1:
                return 'KG'
            case 2:
                return 'm³'
            case 3:
                return 'oz'
            case 4:
                return 'pcs'
            case 5:
                return 'g'
            case 6:
                return 'lb'
            case 7:
                return '百分比'
            case 8:
                return 'in'
            case 9:
                return 'cm'
            case 10:
                return 't'
            case 11:
                return '箱'
            default:
                break
            }
        },
        elec_prod_requires () {
            let status = this.fields.operate_require.elec_prod_requires
            switch (status * 1) {
            case 1:
                return '带电不带电混装'
            case 2:
                return '带电不带电分开装箱'
            case 3:
                return '配套电池分开装箱'
            case 4:
                return '纯电池分开装箱'
            case 5:
                return '不同类型都需要分开装箱'
            default:
                break
            }
        },
        separate_requires () {
            let status = this.fields.operate_require.separate_requires
            switch (status * 1) {
            case 1:
                return '按产品分货'
            case 2:
                return '按国家分货'
            case 3:
                return '按分区分货'
            default:
                break
            }
        },
        track_no_get_type () {
            let status = this.fields.data_require.track_no_get_type
            switch (status * 1) {
            case 1:
                return 'api获取'
            case 2:
                return '内部用号'
            case 3:
                return '预存'
            case 4:
                return '面单中'
            case 5:
                return '无跟踪号'
            default:
                break
            }
        },
        print_spec () {
            let status = this.fields.data_require.print_spec
            switch (status * 1) {
            case 1:
                return 'A4'
            case 2:
                return '10*10'
            case 3:
                return '10*16.5'
            case 4:
                return '10*20'
            case 5:
                return '23*12.7'
            default:
                break
            }
        },
        service_region () {
            let status = this.fields.basic_info.service_region
            switch (status * 1) {
            case 1:
                return '北美'
            case 2:
                return '南美'
            case 3:
                return '中东'
            case 4:
                return '欧洲'
            case 5:
                return '非洲'
            case 6:
                return '东南亚'
            case 7:
                return '独联体'
            case 8:
                return '其他'
            default:
                break
            }
        },
        prohibited_cates () { // 禁发属性
            let allProhibites = this.fields.ship_require.all_prohibites
            let prohibitedCates = []
            let prohibitedCatesId = this.fields.ship_require.prohibited_cates
            if (allProhibites) {
                for (let k = 0; k < prohibitedCatesId.length; k++) {
                    for (let i = 0; i < allProhibites.length; i++) {
                        for (let j = 0; j < allProhibites[i].products.length; j++) {
                            if (allProhibites[i].products[j].id === prohibitedCatesId[k]) {
                                prohibitedCates.push(allProhibites[i].products[j].name)
                            }
                        }
                    }
                }
                prohibitedCates = prohibitedCates.join(',')
                return prohibitedCates
            }
        },
        track_no_rules () { // 物流跟踪号规则转换
            let trackNoRules = this.fields.data_require.track_no_rules
            let trackNoRulesArray = []
            for (let i = 0; i < trackNoRules.length; i++) {
                trackNoRulesArray.push(trackNoRules[i].rule)
            }
            return trackNoRulesArray.join(',')
        },
        compensationRules () { // 赔偿细节
            let compensationRule = this.fields.sale_service.compensation_rules
            let compensationRules = ''
            let compensationTitele = ['延迟赔付', '未上网赔付', '丢失赔付', '运输破损', '扣关赔付']
            if (compensationRule) {
                for (let i = 0; i < compensationRule.length; i++) {
                    compensationRules += '<span>' + compensationTitele[i] + ':' + '赔偿标准(' + compensationRule[i].compensate_standard + ') ' +
                                        '受理期限(' + compensationRule[i].reception_deadline + ') ' +
                                        '赔偿时效(' + compensationRule[i].compensate_time + ') ' +
                                        '赔偿方式(' + compensationRule[i].compensate_method + ')</span>'
                }
                return compensationRules
            }
        }
    },
    created () {
        let that = this
        let id = that.$route.params.id * 1 // 从列表页跳进来的 并且有id
        let type = that.$route.params.type // 是查看还是编辑
        that.mode_type = that.$route.params.mode_type // 渠道类型
        if (type === 'edit') {
            that.is_edit_channel = true
        } else {
            that.is_edit_channel = false
        }
        if (that.$route.params.mode_type === 'B2B') {
            that.fields.basic_info.biz_type = 1
        } else {
            that.fields.basic_info.biz_type = 2
        }
        if (id !== 0) { // 编辑 修改 查看 从后台请求数据
            // 获取初始数据
            that.is_add_channel = false
            channelApi.getApplicationInfo({'params': {'id': id}}).then(function (res) {
                if (res.code === 200) {
                    that.fields.status = res.data.status
                    that.fields.basic_info.is_done = 1
                    if (res.data.basic_info) {
                        that.fields.basic_info = res.data.basic_info
                    }
                    if (res.data.operate_require) {
                        that.fields.operate_require = res.data.operate_require
                    }
                    if (res.data.data_require) {
                        that.fields.data_require = res.data.data_require
                    }
                    if (res.data.ship_require) {
                        that.fields.ship_require = res.data.ship_require
                    }
                    if (res.data.sale_service) {
                        that.fields.sale_service = res.data.sale_service
                    }
                    if (res.data.billing_mode) {
                        that.fields.billing_mode = res.data.billing_mode
                    }
                    if (res.data.quote_attach) {
                        that.fields.quote_attach = res.data.quote_attach
                    }
                    // 把渠道信息缓存
                    util.setCache('lmp_channelApplication_data', res.data)
                    if (res.data.basic_info.is_all_done === 1 && (res.data.status === 1 || res.data.status === 5)) { // is_all_done是1 代表所有步骤已经填完
                        that.is_submit = true
                    }
                } else {
                    that.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.fields.basic_info.is_done = ''
                        }
                    })
                }
            })
        } else {
            let fieldsObj = { // 如果是新增 先将各部分字段存入缓存 以便后期修改缓存
                status: '0', // 本条数据的状态 默认为申请
                basic_info: null,
                operate_require: null,
                data_require: null,
                ship_require: null,
                sale_service: null,
                billing_mode: null,
                quote_attach: null
            }
            // 把渠道信息缓存
            util.setCache('lmp_channelApplication_data', fieldsObj)
        }
    },
    methods: {
        edit_bascicInfo () { // 基础信息
            this.$router.push({ path: '/channel_application_basic/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_operateRequire (type) { // 操作要求
            this.$router.push({ path: '/channel_application_opt_requirement/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_dataRequire (type) { // 数据要求
            this.$router.push({ path: '/channel_application_operate_require/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_shipRequire (type) { // 发货要求
            this.$router.push({ path: '/channel_application_ship_requires/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_saleService (type) { // 售后服务
            this.$router.push({ path: '/channel_application_after_service/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_billingMode (type) { // 计费模式
            this.$router.push({ path: '/channel_application_pricing_model/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        edit_quoteAttach (type) { // 附件上传
            this.$router.push({ path: '/channel_application_fileUpload/' + this.$route.params.id + '/' + this.$route.params.mode_type })
        },
        preview (item) { // 预览图片
            let _self = this
            // 文件格式
            let oName = item.name
            let type = oName.substring(oName.lastIndexOf('.') + 1, oName.length)
            let tArr = 'jpg, png, jpeg, gif'

            if (tArr.indexOf(type) === -1) {
                // 其它格式下载
                window.open(item.url)
            } else { // 图片
                _self.showPreview = true
                _self.srcs = item.url
            }
        },
        submitForm () { // 提交数据
            let _self = this
            let id = this.$route.params.id // 从列表页跳进来的 并且有id
            channelApi.submitChannel(id).then(function (res) {
                if (res.code === 200) {
                    _self.$message({
                        showClose: true,
                        message: '提交成功！',
                        type: 'success'
                    })
                    _self.$router.push({ path: '/channel_audit_now/' + _self.$route.params.id + '/' + _self.$route.params.mode_type }) // 提交成功之后跳转审核提示页面
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        back () { // 返回列表
            this.$router.push({ path: '/channel_list' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'channel-data-info';
    .#{$prfClass}{
        .breadcrumb-box{
            margin:10px;
        }
        .topCont {
            width: 900px;
            height: 76px;
            background-color: #fff;
            margin: 16px auto 10px;
            h3 {
                font-family:MicrosoftYaHei;
                padding: 19px 0px 8px 54px;
                font-size:16px;
                font-weight:bold;
                color:rgba(47,48,50,1);
            }
            p {
                padding-left: 54px;
                color:rgba(66,158,253,1);
            }
        }
    }
    .#{$prfClass}-form{
        width: 860px;
        padding: 40px 20px 60px;
        background-color: #fff;
        height: auto;
        margin:  0 auto;
        font-family: Microsoft YaHei;
        h3{
            display: flex;
            justify-content: center;
            margin-top: 20px;
            padding-top: 20px;
            margin-bottom: 20px;
            font-size: 28px;
            color: #429EFD;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            flex-wrap: wrap;
        }
        .application-status{
            text-align:center;
            font-size:14px;
            margin-bottom: 30px;
        }
        li:last-child .form-table{
            border-left: none;
        }
        .top{
            position: relative;
            .left{
                .goon{
                    color: #E5A13E
                }
                .not{
                    color: #429EFD;
                }
                .el-icon-success{
                    color: #65C13E;
                    font-size: 38px;
                    vertical-align: top;
                    margin-top: -1px;
                }
                .el-icon-goon{
                    background: url("../../assets/resigter_check.png");
                    width: 38px;
                    height: 38px;
                    display:inline-block;
                    background-position: -4px -104px;
                }
                .el-icon-not{
                    width: 38px;
                    height: 38px;
                    display:inline-block;
                    border-radius: 45px;
                    color: #fff;
                    font-size: 28px;
                    background-color: #429EFD;
                    line-height: 38px;
                    vertical-align: middle;
                    margin-top: -32px;
                    text-align: center;
                }
                div{
                    display: inline-block;
                    margin-left:20px;
                    color: #2F3032;
                    h4{
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: bold;
                    }
                    p{
                        font-size: 14px;
                        span{
                            color: #65C13E;
                        }
                    }
                }
            }
            .right{
                position: absolute;
                right: 26px;
                color: #429EFD;
                font-size: 14px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .form-box{
            display:inline-block;
            width:800px;
            /*height:500px;*/
            margin-left:30px;
            vertical-align: top;
            .step-wrap{
                margin-bottom:30px;
            }
            h2{
                font-size: 16px;
                font-weight:bold;
            }
            .step-status{
                margin-top: 10px;
            }
            .step-opt-link{
                text-align: right;
                text-decoration: underline;
                width:742px;
                a{
                    color: #429EFD
                }
            }
            .form-table{
                padding: 10px 0 30px 40px;
                border-left: 1px #EBEEF3 dotted;
                margin: 14px 0 0 19px
            }
            .bottom{
                padding: 10px 0 30px 40px;
                border-left: 1px #EBEEF3 dotted;
                margin: 14px 0 0 19px;
                ul{
                    width: 738px;
                    border: 1px #EBEEF3 solid;
                    border-bottom: none;
                    border-right: none;
                    .is-compensatable-li .div{
                        display: block;
                        width: 100%;
                        line-height: 25px;
                        &:last-child{
                            text-align: left;
                            span{
                                display: block;
                                padding: 0 17px;
                            }
                        }
                    }
                    li{
                        overflow: hidden;
                        display: flex;
                        ul {
                            border: none
                        }
                        div{
                            float: left;
                            width: 130px;
                            color: #2F3032;
                            font-size: 14px;
                            padding: 16px 0;
                            text-align: center;
                            min-height: 13px;
                            border-right: 1px #EBEEF3 solid;
                            border-bottom: 1px #EBEEF3 solid;
                            display: flex;
                            justify-content: center;
                            word-break: break-all;
                            line-height: 20px;
                        }
                        .track_no_rules{
                            line-height: 17px;
                            word-break: break-all;
                        }
                        a{
                            width: 100%;
                            display: flex;
                            color: #2F3032;
                            justify-content: center;
                            margin-bottom: 10px;
                        }
                        div:nth-child(2n){
                            min-width: 217px;
                            align-items: center;
                            display: flex;
                            flex-wrap: wrap;
                            padding: 16px 10px;
                        }
                        .introduce{
                            min-width: 205px!important;
                            padding: 16px 20px 16px 12px;
                            line-height: 26px;
                        }
                        div:nth-child(2n+1){
                            background-color: #F9FBFE;
                            align-items: center;
                        }
                        .list{
                            width: 130px;
                            background-color:#fff!important;
                            color: #2F3032;
                            font-size: 14px;
                            padding: 10px 0 16px;
                            text-align: center;
                            border: none;
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                        }
                        .attachCls {
                            ul {
                                width: 100% !important;
                                border: none;
                                li{
                                    border: none;
                                }
                            }
                        }
                        .el-icon-document{
                            padding-right: 5px;
                        }
                        .attachment a{
                            word-break: break-all;
                            width: 200px;
                            margin-left: 17px;
                            color: #429EFD;
                        }
                    }
                }
            }
            .red{
                color: #F46B6B;
                vertical-align: middle;
                margin-top: 2px;
                display: inline-block;
                margin-right: 2px;
            }
            .completed{
                color: #67c23a;
            }
            .footer{
                text-align: center;
                .btn-submit{
                    width:191px;
                    height:44px;
                    font-size: 16px;
                }
                .link-back{
                    margin-left:20px;
                    text-decoration: underline;
                    color:#429EFD;
                    font-size:14px;
                }
            }
        }
    }
</style>
