/**
 *  create by wubinbin on 2018/7/20
 **/
import Mock from 'mockjs'

// const bashPath = 'http://lmp.hqygou.com' // build
// const bashPath = ' http://lmp-test.com' // test
const bashPath = 'http://localhost:8081' // dev
const Random = Mock.Random

// 首页banner
Mock.mock(bashPath + '/api/banner', {
    'data|3': [
        {
            'id|+1': 1,
            href: Random.image('1920x500')
        }
    ]
})
// 登录
Mock.mock(bashPath + '/api/login', {
    'data': {
        username: '@name',
        userImage: Random.image('42x36', '#894FC4', '#FFF', 'png', '1')
    }
})

// 注册
Mock.mock(bashPath + '/api/register', {
    'data': {
        code: 200
    }
})

// 获取验证码
Mock.mock(bashPath + '/api/captcha', {
    'data': {
        verificationCode: '123456'
    }
})

// 验证email是否存在
Mock.mock(bashPath + '/api/email_exist', {
    'data': {
        emailName: 'binbin@163.com'
    }
})

// 验证公司中文名是否存在
Mock.mock(bashPath + '/api/logistics_enterprise/check_cn', {
    'data': {
        name: 'aa'
    }
})

// 验证公司英文名是否存在
Mock.mock(bashPath + '/api/getNameEn', {
    'data': {
        name: 'global'
    }
})

// 保存物流商资料
Mock.mock(bashPath + '/api/logistics_enterprise/save', {
    code: 200,
    msg: '',
    data: {
        status: '4' // 审核修改中
    }
})

// 获取物流商入驻资料
Mock.mock(bashPath + '/api/logistics_enterprise/view', {
    code: 200,
    data: {
        basic_info: {
            status: '已填写',
            company_en: 'XXXX YOU XIAN GONG SI',
            company_cn: 'XXXX有限公司',
            service_type: '1,2,3',
            company_profile: '2017 公司成立十周年，营业额突破100亿。2016 新办公楼启用，同时连续三年荣获“供应商信赖的跨境电商平台”奖。2015 国家级电子商务试点单位。2014 通过并购，成功在A股上市(股票代码：SZ002640)。2013 获得供应商信赖的跨境电商平台。2012 建立多个海外仓；获国家多项著作权版权。2011 成立香港全资子公司 获深圳创新投风险投资 推出Excelvan等3个自有品牌',
            profile_attachment: [{
                name: '公司简介.jpg',
                id: '33',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                id: '334',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }],
            company_website: 'http://www.globalegrow.com',
            company_phone: '0755-11111111',
            office_addr: '广东省深圳市南山区永新汇3栋'
        },
        quality_info: {
            area_type: '',
            status: '已填写',
            bs_license_type: '', // 执照类型（是否永久经营）
            bs_license_date: '1997-02-28', // 营业执照有效期
            founding_date: '1997-02-28', // 成立时间
            registed_capital: '20000 CNY', // 注册资本
            annual_report_date: '1997-02-28', // 年报公示日期
            registed_capital_curr: 'USD', // 币种
            bs_license_addr: '广东省深圳市南山区永新汇3栋', // 营业执照地址
            legal_rep: 'sdfasdf', // 法人代表
            legal_id: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 法人身份证
            principal_shareholder: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 主要股东
            signature_card: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 印鉴卡
            other_attachment: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 其他证明材料
            // 香港（资质证照）
            cr: [], // CR
            br: [], // BR
            bs_license: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }],
            incorporation_form: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 周年报/法团成立表
            annual_report: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 年报附件
            // 海外
            registration: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }], // 公司注册证
            regulations: [{
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }, {
                name: '公司简介.pdf',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
            }] // 章程
        },
        scale_facilities: {
            status: '已填写',
            staff_num: '', // 员工人数
            warehouse_space_out: '', // 海外（含香港）仓储面积
            branch_network: '', // 营业网点/分店机构(含海外)
            search_website: '', // 查件网址
            three_year_revenue: [], // 近3年营业收入（万）
            customer_list: [], // 近半年TOP3客户名称
            volume_ratio: [], // 近半年TOP3客户货量占比
            route_distribution: [], // 航线分布
            country_region: [] // 客运往国家和地区
        },
        contact_info: {
            status: '未填写',
            chief_contact: { // 高层
                name: '22', // 姓名
                position: 'sdf', // 职务
                phone: 'sdf', // 手机
                landline: 'asdf' // 座机
            },
            business_contact: { // 业务联系方式
                name: '11', // 姓名
                email: 'asdf', // 邮箱
                phone: 'asdf', // 手机
                landline: 'sdf', // 座机
                qq: 'asdf', // qq
                fax: 'df' // 传真
            },
            finance_contact: { // 财务联系方式
                name: '', // 姓名
                phone: '', // 手机
                email: '', // 邮箱
                qq: '', // qq
                landline: '' // 固话
            },
            it_contact: { // it联系方式
                name: '22', // 姓名
                email: '2@163.com', // 邮箱
                phone: '15858795874', // 手机
                qq: '', // qq
                landline: '' // 固话
            },
            cutomer_contact: { // 高层
                name: '', // 姓名
                email: '', // 邮箱
                phone: '', // 手机
                qq: '', // qq
                landline: '' // 固话
            }
        }
    }
})

// 删除账户信息
Mock.mock(bashPath + '/api/deleteTable', {
    code: 200,
    msg: '删除失败',
    data: {
    }
})

/* ------ 渠道模块 开始 ------ */

// 渠道申请资料(B2B)预览
Mock.mock(bashPath + '/api/channels/0', {
    code: 200,
    msg: '',
    data: {
        basic_info: {
            id: 1,
            channel_name: '顺丰ss',
            user_id: 1,
            shipping_type: 1,
            biz_type: 1,
            delivery_type: 1,
            service_type: [
                1,
                2,
                3
            ],
            transport_type: 1,
            transport_time_min: null,
            transport_time_max: 2,
            transport_time_rate: '0.9900',
            service_region: 1,
            is_done: 1,
            done_step: 0,
            is_trackable: 1,
            track_url: '',
            online_time_min: 0,
            online_time_max: 0,
            online_time_rate: '0.0000',
            clearance_time_min: 0,
            clearance_time_max: 0,
            clearance_time_rate: '0.0000',
            deducation_time_rate: '0.0000',
            pod_back_time_min: 0,
            pod_back_time_max: 0,
            pod_back_time_rate: '0.0000',
            is_cod_supported: 2,
            is_changed: 0,
            pay_precision: 0,
            remark: '',
            status: 2,
            created_at: '2018-09-05 15:35:23',
            updated_at: '2018-09-05 15:35:23',
            deleted_at: null,
            transport_type_txt: '海运',
            shipping_type_txt: '国内发货',
            biz_type_txt: '2B',
            delivery_type_txt: '全程',
            service_type_txt: '揽收',
            status_txt: ''
        },
        operate_require: {
            id: 1,
            channel_id: 1,
            min_weight: '0.0000',
            max_weight: '0.0000',
            max_length: '0.0000',
            min_length: '0.0000',
            max_width: '0.0000',
            min_width: '0.0000',
            max_height: '0.0000',
            min_height: '0.0000',
            preimeter_coeff_length: '0.0000',
            perimeter_coeff_width: '0.0000',
            perimeter_coeff_height: '0.0000',
            max_perimeter: '0.0000',
            elec_prod_requires: 0,
            is_done: 1,
            created_at: '2018-09-05 17:12:36',
            updated_at: '2018-09-05 17:12:36'
        },
        ship_require: {
            id: 1,
            channel_id: 1,
            is_pobox_supported: 0,
            decalre_ratio: '0.0000',
            decalre_value_usd_min: '0.0000',
            decalre_value_usd_max: '0.0000',
            has_prohibits: 1,
            prohibited_cates: '',
            other_requires: '',
            is_done: 2,
            created_at: '2018-09-05 17:12:28',
            updated_at: '2018-09-05 17:12:28'
        },
        sale_service: {
            id: 1,
            channel_id: 1,
            claim_attachs: '',
            is_accept_query: 0,
            query_condition: 0,
            query_reply_attachs: '',
            remark: '',
            redelivery_times: 0,
            redelivery_fee: '0.000',
            redelivery_fee_currency: '',
            return_address: '',
            return_fee: '0.000',
            return_fee_currency: '',
            destroy_fee: '0.000',
            destroy_fee_currency: '',
            is_done: 2,
            is_compensatable: 1,
            created_at: '2018-09-05 17:12:33',
            updated_at: '2018-09-05 17:12:33'
        },
        billing_mode: {
            id: 1,
            channel_id: 1,
            is_acceptable: 1,
            is_inc_tariff: 1,
            is_inc_vat: 1,
            billing_weight_type: 0,
            volume_coeff_type: 1,
            fpb_rate_type: 1,
            billing_unit: 2,
            is_done: 2,
            created_at: '2018-09-05 17:12:48',
            updated_at: '2018-09-05 17:12:48'
        },
        quote_attach: {
            id: 1,
            channel_id: 1,
            quote_attachs: [
                {
                    id: 1,
                    orig_name: 'abc.jpg',
                    save_path: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
                },
                {
                    id: 1,
                    orig_name: 'abc.jpg',
                    save_path: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
                }
            ],
            sop_attachs: [
                {
                    id: 1,
                    orig_name: 'abc.jpg',
                    save_path: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg'
                }
            ],
            api_attachs: [],
            remark: '',
            is_done: 2,
            created_at: '2018-09-06 10:18:29',
            updated_at: '2018-09-06 10:18:29'
        }
    }
})

// 渠道申请资料提交审核
Mock.mock(bashPath + '/api/channels/1/submit', {
    code: 200,
    msg: '',
    data: []
})

// 获取渠道列表
Mock.mock('http://lmp.hqygou.com/api/channels', {
    code: 200,
    msg: '获取成功',
    current_page: 1,
    data: [
        {
            id: 1,
            channel_name: '顺丰',
            provider_id: 1,
            shipping_type: 1,
            biz_type: 1,
            delivery_type: 1,
            service_type: 1,
            transport_type: 1,
            transport_time_min: 1,
            transport_time_max: 2,
            transport_time_rate: 0.9900,
            service_region: 1,
            is_done: 2,
            done_step: 0,
            is_trackable: 0,
            track_url: '',
            online_time_min: 0,
            online_time_max: 0,
            online_time_rate: 0.0000,
            clearance_time_min: 0,
            clearance_time_max: 0,
            clearance_time_rate: 0.0000,
            deducation_time_rate: 0.0000,
            pod_back_time_min: 0,
            pod_back_time_max: 0,
            pod_back_time_rate: 0.0000,
            is_cod_supported: 0,
            is_changed: 0,
            pay_precision: 0,
            remark: '',
            status: 1,
            created_at: '2018-09-05 15:35:23',
            updated_at: '2018-09-05 15:35:23',
            deleted_at: null
        }
    ],
    first_page_url: 'http://lmp.geek.io/api/channels?page=1',
    from: 1,
    last_page: 1,
    last_page_url: 'http://lmp.geek.io/api/channels?page=1',
    next_page_url: null,
    path: 'http://lmp.geek.io/api/channels',
    per_page: 15,
    prev_page_url: null,
    to: 1,
    total: 500
})

// 删除渠道
// Mock.mock(bashPath + '/api/channels/1', {
//     code: 200,
//     msg: '删除成功',
//     data: {}
// })

// 获取收款信息列表
Mock.mock(bashPath + '/api/receipts', {
    code: 200,
    msg: '获取成功',
    current_page: 1,
    data: [
        {
            id: 1,
            account_id: 2,
            channel_id: 1,
            channel_name: '渠道名称-001',
            account_name: '账户名',
            receipt_account: '收款账户',
            status: 1,
            created_at: '2018-09-05 15:35:23'
        }
    ],
    first_page_url: 'http://lmp.geek.io/api/channels?page=1',
    from: 1,
    last_page: 1,
    last_page_url: 'http://lmp.geek.io/api/channels?page=1',
    next_page_url: null,
    path: 'http://lmp.geek.io/api/channels',
    per_page: 15,
    prev_page_url: null,
    to: 1,
    total: 500
})

Mock.mock(bashPath + '/api/channel', { // 申请渠道
    code: 200,
    msg: '申请成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channel/1', { // 编辑渠道
    code: 200,
    msg: '编辑成功',
    data: {
        status: 1
    }
})

Mock.mock(bashPath + '/api/channels/1/operate', { // 添加操作要求
    code: 200,
    msg: '申请成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channels/1/data', { // 数据要求
    code: 200,
    msg: '编辑成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channels/1/ship', { // 新增发货要求
    code: 200,
    msg: '申请成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channels/1/service', { // 售后服务
    code: 200,
    msg: '编辑成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channels/1/billing', { // 计费模式
    code: 200,
    msg: '编辑成功',
    data: {
        id: 1,
        status: 1
    }
})
Mock.mock(bashPath + '/api/channels/1/attach', { // 附件上传
    code: 200,
    msg: '编辑成功',
    data: {
        id: 1,
        status: 1
    }
})
/* ------ 渠道模块 结束 ------ */

Mock.mock(bashPath + '/api/get_all_person_info', { // 获取个人中心我的信息
    code: 200,
    msg: '',
    data: {
        // 个人信息
        my_info: {
            statue: 3,
            compony_cn: '全酋通物流有限公司',
            compony_en: 'USKY GENERAL TRADING L.L.C'
        },
        // 问题反馈
        feedback_info: {
            list: []
        },
        // 我的渠道
        my_channel: {
            wait_submit: 1, // 待提交
            in_review: 2, // 审核中
            pass_audit: 3, // 审核通过
            edit: 4, // 修改中
            review_reject: 5 // 审核驳回
        },
        // 报价分区
        quote_info: {
            wait_submit: 1, // 待提交
            in_review: 2, // 审核中
            pass_audit: 3, // 审核通过
            edit: 4, // 修改中
            review_reject: 5 // 审核驳回
        },
        // 收款信息
        receipt_info: {
            wait_submit: 1, // 待提交
            in_review: 2, // 审核中
            pass_audit: 3, // 审核通过
            edit: 4, // 修改中
            review_reject: 5 // 审核驳回
        },
        // 公告信息
        announcement_list: {
            all: 30, // 所有未读
            list: [
                {
                    name: '系统与2018年7月23日进行更新',
                    time: '2018-09-03',
                    id: '1',
                    type: 1, // 1 表示未读，2 表示已读
                    content: '我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资'
                },
                {
                    name: '我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资',
                    time: '2018-09-03',
                    id: '2',
                    type: 2,
                    content: '我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资'
                },
                {
                    name: '我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资',
                    time: '2018-09-03',
                    type: 1,
                    id: 3,
                    content: '我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资我的渠道填写表单的时候提交不了资'
                }
            ]
        }
    }
})

// 我的信息
Mock.mock(bashPath + '/api/receipt_info', { // 获取个人中心我的信息
    code: 200,
    msg: '',
    data: {
        total: 50,
        per_page: 20,
        current_page: 1,
        data: [
            {
                id: 1,
                name: '你好', // 账户名
                number: '4521354897942141', // 收款账户
                currency: 2, // 币种：1#人民币账户 2#外币账户
                property: 1, // 账户性质：1#私对公 2#公对公 3#私对私
                handling_fee_method: 1, // 手续费承担方式：1#承运方 2#托远方 3#双方共同承担
                is_entrusted: 1, // 是否委托收款：1#是 0#否
                status: 1, // 状态：1#待审核 2#审核中 3#已完成
                operation: [
                    {
                        name: '查看',
                        type: 'view'
                    },
                    {
                        name: '删除',
                        type: 'delete'
                    },
                    {
                        name: '编辑',
                        type: 'edit'
                    }
                ],
                stamp_receipt_attachment: [], // 账户盖章收款附件
                entrusted_receipt_attachment: [] // 委托收款附件
            },
            {
                id: 2,
                name: '你好', // 账户名
                number: '4521354897942141', // 收款账户
                currency: 2, // 币种：1#人民币账户 2#外币账户
                property: 1, // 账户性质：1#私对公 2#公对公 3#私对私
                handling_fee_method: 1, // 手续费承担方式：1#承运方 2#托远方 3#双方共同承担
                is_entrusted: 1, // 是否委托收款：1#是 0#否
                status: 3, // 状态：1#待审核 2#审核中 3#已完成
                operation: [
                    {
                        name: '查看',
                        type: 'view'
                    }
                ],
                stamp_receipt_attachment: [], // 账户盖章收款附件
                entrusted_receipt_attachment: [] // 委托收款附件
            }
        ]
    }
})

// 删除我的信息
Mock.mock(bashPath + '/api/receipt_info/1', {
    code: 200,
    msg: '',
    data: {}
})

// 获取我的账户
Mock.mock(bashPath + '/api/receipt_info/statistics', {
    code: 200,
    msg: '',
    data: {
        allNumber: 200,
        wait_audit: 33, // 待审核的数量
        audit_now: 33, // 审核中的数量
        already_finish: 2 // 已完成的数量
    }
})

// 获取账户详情
Mock.mock(bashPath + '/api/receipt_info/1', {
    code: 200,
    msg: '',
    data: {
        created_at: '2018-05-04', // 添加时期
        name: '323', // 账户名
        number: '6865468731354562', // 收款账户
        currency: 1, // 账户币种
        property: 1, // 账户性质：1#私对公 2#公对公 3#私对私
        handling_fee_method: 1, // 手续费承担方式：1#承运方 2#托远方 3#双方共同承担
        is_entrusted: 1, // 是否委托收款：1#是 0#否
        stamp_receipt_attachment: [
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            }
        ], // 账户盖章收款附件
        entrusted_receipt_attachment: [
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            },
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            },
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            }
        ], // 账户委托收款附件
        private_to_private_attachment: [
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            },
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            },
            {
                origin_name: 'abc.jpg',
                url: 'https://uidesign.zafcdn.com/ZF/image/banner/20180827_4791/en1240x600.jpg',
                save_path: ''
            }
        ], // 私对私付款说明附件
        swiftcode: 's3qsadf',
        receipt_company_addr: '收款公司地址', // 收款公司地址
        bank_created: '中国人民银行', // 开户银行
        sub_bank_created: '深圳支行', // 开户支行
        bank_country: '中国', // 开户行国家
        bank_addr: '深圳市南山区深圳市南山区深圳市南山区深圳市南山区' // 开户行地址
    }
})

/* ------ 以下为【问题反馈】模块的接口 -------- */
// 评价反馈信息
Mock.mock(bashPath + '/api/evaluate/1', {
    code: 200,
    msg: '',
    data: {}
})

// 公告
Mock.mock(bashPath + '/api/announcement', {
    code: 200,
    msg: '',
    data: {
        total: 10,
        per_page: 15,
        current_page: 1,
        data: [
            {
                name: '接入网关远程重启接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能网关远程重启功能',
                time: '2018-09-03',
                id: 1,
                type: 1, // 1 表示未读，2 表示已读
                content: '接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能'
            },
            {
                name: '接入网关远',
                time: '2018-09-03',
                id: 2,
                type: 1, // 1 表示未读，2 表示已读
                content: '接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能'
            },
            {
                name: '接入网关远程',
                time: '2018-09-03',
                id: 3,
                type: 2, // 1 表示未读，2 表示已读
                content: '接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能网关远程重启功能'
            }
        ]
    }
})

// 公告详情
Mock.mock(bashPath + '/api/announcement_detail', {
    code: 200,
    msg: '',
    data: {
        name: '跨境通主动战略调整收效显著 上半年报营收增七成破98亿',
        time: '2018-10-21',
        content: '8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%。8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%。8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%。8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%。8月28日，跨境通（002640）发布2018年上半年业绩报告。报告期内公司主营业务整体业绩保持快速增长，经营质量进一步提升。公司实现营业收入987，482.14万元，同比增长77.23%；实现归属于上市公司股东净利润50，699.11万元，同比增长61%'
    }
})

// 我的合同列表
Mock.mock(bashPath + '/api/contract_list', {
    code: 200,
    msg: '',
    data: {
        list: {
            total: 10,
            per_page: 15,
            current_page: 1,
            data: [
                {
                    id: 1,
                    type_txt: 'B2B空运',
                    main_attach:[
                        {
                            channel_id: 1,
                            origin_name: '1.png',
                            save_path: '',
                            url: ''
                        }
                    ],
                    start_at: '2018-09-03',
                    end_at: '2018-09-03',
                    remark: '接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能接入网关远程重启功能',
                    operation: [
                        {
                            name: '查看',
                            type: 'view'
                        },
                        {
                            name: '编辑',
                            type: 'edit'
                        },
                        {
                            name: '删除',
                            type: 'delete'
                        },
                        {
                            name: '提交',
                            type: 'submit'
                        },
                        {
                            name: '编辑补充协议',
                            type: 'edit'
                        },
                        {
                            name: '重新申请',
                            type: 'edit'
                        },
                    ]
                }
            ]
        },
        status_dict: {
            1: '待提交',
            2: '审核中',
            3: '审核通过',
            4: '审核驳回'
        }

    }
})

export default Mock
