import App from '../App.vue'

const routes = [
    {
        path: '/',
        component: App, // 顶层路由，对应index.html
        meta: { title: '' },
        redirect: '/home', // 默认跳转
        children: [
            {
                path: '/home',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/home.vue'))
                    }, 'home')
                },
                name: 'home',
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/privacy_policy',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/legal_disclaimer/privacy_policy.vue'))
                    }, 'privacy_policy')
                },
                name: 'privacy_policy',
                meta: {
                    title: '首页-隐私政策页面'
                }
            },
            {
                path: '/legal_disclaimer',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/legal_disclaimer/legal_disclaimer.vue'))
                    }, 'legal_disclaimer')
                },
                name: 'legal_disclaimer',
                meta: {
                    title: '首页-法律申明页面'
                }
            }
        ]
    },
    // 登录
    {
        path: '/login',
        component: App,
        children: [
            {
                path: '/login',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/login/login.vue'))
                    }, 'login')
                },
                name: 'login',
                meta: {
                    title: '登录'
                }
            }
        ]
    },
    // 注册,物流商入驻
    {
        path: '/register',
        component: App,
        children: [
            {
                path: '/protocols',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/protocols.vue'))
                    }, 'protocols')
                },
                name: 'protocols',
                meta: {
                    title: '物流商入驻协议'
                }
            },
            {
                path: '/register',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/register.vue'))
                    }, 'register')
                },
                name: 'register',
                meta: {
                    title: '注册'
                }
            },
            {
                path: '/logistics_basic_info',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/basic_info.vue'))
                    }, 'logistics_basic_info')
                },
                name: 'logistics_basic_info',
                meta: {
                    isLogin: true, // 是否登录
                    title: '物流商入驻-基本信息'
                }
            },
            {
                path: '/aptitude',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/aptitude_license.vue'))
                    }, 'aptitude_license')
                },
                name: 'aptitude_license',
                meta: {
                    isLogin: true,
                    title: '物流商入驻-资质证照'
                }
            },
            {
                path: '/scale',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/scale_facilities.vue'))
                    }, 'scale_facilities')
                },
                name: 'scale_facilities',
                meta: {
                    isLogin: true,
                    title: '物流商入驻-规模与设施'
                }
            },
            {
                path: '/phone_number',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/phone_number.vue'))
                    }, 'phone_number')
                },
                name: 'phone_number',
                meta: {
                    isLogin: true,
                    title: '物流商入驻-联系方式'
                }
            },
            {
                path: '/audit_inquiries/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/register/audit_inquiries.vue'))
                    }, 'audit_inquiries')
                },
                name: 'audit_inquiries',
                meta: {
                    isLogin: true,
                    title: '物流商入驻-审核查询'
                }
            },
            {
                path: '/affiliate_message',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/affiliate_message/affiliate_message.vue'))
                    }, 'affiliate_message')
                },
                name: 'affiliate_message',
                meta: {
                    isLogin: true,
                    title: '物流商入驻资料'
                }
            }
        ]
    },

    // 我的渠道
    {
        path: '/channel_list',
        component: App,
        children: [
            {
                path: '/channel_application_data/:id/:type/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_data.vue'))
                    }, 'channel_application_data')
                },
                name: 'channel_application_data',
                meta: {
                    isLogin: true,
                    title: '渠道申请-预览'
                }
            },
            {
                path: '/channel_list',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_list.vue'))
                    }, 'channel_list')
                },
                name: 'channel_list',
                meta: {
                    isLogin: true,
                    title: '渠道管理-渠道列表'
                }
            },
            {
                path: '/channel_application_data_select',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_data_select.vue'))
                    }, 'channel_application_data_select')
                },
                name: 'channel_application_data_select',
                meta: {
                    isLogin: true,
                    title: '渠道申请资料-选择'
                }
            },
            {
                path: '/channel_application_basic/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_basic.vue'))
                    }, 'channel_application_basic')
                },
                name: 'channel_application_basic',
                meta: {
                    isLogin: true,
                    title: '渠道申请--基础资料'
                }
            },
            {
                path: '/channel_application_operate_require/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_operate_require.vue'))
                    }, 'channel_application_operate_require')
                },
                name: 'channel_application_operate_require',
                meta: {
                    isLogin: true,
                    title: '渠道申请--数据要求'
                }
            },
            {
                path: '/channel_application_opt_requirement/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_opt_requirement.vue'))
                    }, 'channel_application_opt_requirement')
                },
                name: 'channel_application_opt_requirement',
                meta: {
                    isLogin: true,
                    title: '渠道申请--操作要求'
                }
            },
            {
                path: '/channel_application_ship_requires/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_ship_requires.vue'))
                    }, 'channel_application_ship_requires')
                },
                name: 'channel_application_ship_requires',
                meta: {
                    isLogin: true,
                    title: '渠道申请--发货要求'
                }
            },
            {
                path: '/channel_application_after_service/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_after_service.vue'))
                    }, 'channel_application_after_service')
                },
                name: 'channel_application_after_service',
                meta: {
                    isLogin: true,
                    title: '渠道申请--售后服务'
                }
            },
            {
                path: '/channel_application_pricing_model/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_pricing_model.vue'))
                    }, 'channel_application_pricing_model')
                },
                name: 'channel_application_pricing_model',
                meta: {
                    isLogin: true,
                    title: '渠道申请--计费模式'
                }
            },
            {
                path: '/channel_application_fileUpload/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_application_fileUpload.vue'))
                    }, 'channel_application_fileUpload')
                },
                name: 'channel_application_fileUpload',
                meta: {
                    isLogin: true,
                    title: '渠道申请--附件上传'
                }
            },
            {
                path: '/channel_audit_now/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_audit_now.vue'))
                    }, 'channel_audit_now')
                },
                name: 'channel_audit_now',
                meta: {
                    isLogin: true,
                    title: '渠道申请--审核查询--审核中'
                }
            },
            {
                path: '/channel_audit_reject/:id/:mode_type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_audit_reject.vue'))
                    }, 'channel_audit_reject')
                },
                name: 'channel_audit_reject',
                meta: {
                    isLogin: true,
                    title: '渠道申请--审核查询--审核驳回'
                }
            },
            {
                path: '/cash_collection_info_list',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/cash_collection_info_list.vue'))
                    }, 'cash_collection_info_list')
                },
                name: 'cash_collection_info_list',
                meta: {
                    isLogin: true,
                    title: '渠道申请--收款信息列表'
                }
            },
            {
                path: '/add_edit_cash_collection/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/add_edit_cash_collection.vue'))
                    }, 'add_edit_cash_collection')
                },
                name: 'add_edit_cash_collection',
                meta: {
                    isLogin: true,
                    title: '渠道申请--新增收款信息'
                }
            },
            {
                path: '/view_cash_collection/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/view_cash_collection.vue'))
                    }, 'view_cash_collection')
                },
                name: 'view_cash_collection',
                meta: {
                    isLogin: true,
                    title: '渠道申请--查看收款信息'
                }
            },
            {
                path: '/cash_collection_auditing/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/cash_collection_auditing.vue'))
                    }, 'cash_collection_auditing')
                },
                name: 'cash_collection_auditing',
                meta: {
                    isLogin: true,
                    title: '渠道申请--收款信息--审核中'
                }
            },
            {
                path: '/cash_collection_rejected/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/cash_collection_rejected.vue'))
                    }, 'cash_collection_rejected')
                },
                name: 'cash_collection_rejected',
                meta: {
                    isLogin: true,
                    title: '渠道申请--收款信息--审核驳回'
                }
            },
            {
                path: '/price_partition',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition.vue'))
                    }, 'price_partition')
                },
                name: 'price_partition',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区列表'
                }
            },
            {
                path: '/price_partition_change/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition_change.vue'))
                    }, 'price_partition_change')
                },
                name: 'price_partition_change',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区申请变更'
                }
            },
            {
                path: '/price_partition_edit/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition_edit.vue'))
                    }, 'price_partition_edit')
                },
                name: 'price_partition_edit',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区申请变更-编辑'
                }
            },
            {
                path: '/price_partition_view/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition_view.vue'))
                    }, 'price_partition_view')
                },
                name: 'price_partition_view',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区审核通过'
                }
            },
            {
                path: '/price_partition_auditing/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition_auditing.vue'))
                    }, 'price_partition_auditing')
                },
                name: 'price_partition_auditing',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区审核中'
                }
            },
            {
                path: '/price_partition_rejected/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/price_partition_rejected.vue'))
                    }, 'price_partition_rejected')
                },
                name: 'price_partition_rejected',
                meta: {
                    isLogin: true,
                    title: '渠道申请--报价&分区审核驳回'
                }
            },
            {
                path: '/channel_audit_now',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/channel/channel_audit_now.vue'))
                    }, 'channel_audit_now_search')
                },
                name: 'channel_audit_now_search',
                meta: {
                    isLogin: true,
                    title: '渠道申请--审核查询'
                }
            }
        ]
    },
    // 我的信息模块
    {
        path: '/my_message_list',
        component: App,
        children: [
            {
                path: '/my_message_list',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_message/list.vue'))
                    }, 'my_message_list')
                },
                name: 'my_message_list',
                meta: {
                    isLogin: true,
                    title: '我的信息-列表'
                }
            },
            {
                path: '/edit_account/:id/:info_id/:type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_message/edit.vue'))
                    }, 'edit_account')
                },
                name: 'edit_account',
                meta: {
                    isLogin: true,
                    title: '我的信息-修改'
                }
            },
            {
                path: '/add_account/:id/:type',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_message/add_account.vue'))
                    }, 'add_account')
                },
                name: 'add_account',
                meta: {
                    isLogin: true,
                    title: '我的信息-新增信息资料'
                }
            },
            {
                path: '/view_account/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_message/view_account.vue'))
                    }, 'view_account')
                },
                name: 'view_account',
                meta: {
                    isLogin: true,
                    title: '我的信息-查看信息资料'
                }
            }
        ]
    },

    // 个人中心
    {
        path: '/personal',
        component: App,
        children: [
            {
                path: '/personal',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/personal_center/personal.vue'))
                    }, 'personal')
                },
                name: 'personal',
                meta: {
                    isLogin: true, // 是否登录
                    title: '个人中心'
                }
            },
            {
                path: '/alter_pwd',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/personal_center/alter_pwd.vue'))
                    }, 'alter_pwd')
                },
                name: 'alter_pwd',
                meta: {
                    isLogin: true,
                    title: '修改密码'
                }
            },
            {
                path: '/alter_success',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/personal_center/alter_success.vue'))
                    }, 'alter_success')
                },
                name: 'alter_success',
                meta: {
                    isLogin: true,
                    title: '修改密码成功'
                }
            },
            {
                path: '/alter_email',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/personal_center/alter_email.vue'))
                    }, 'alter_success')
                },
                name: 'alter_email',
                meta: {
                    isLogin: true,
                    title: '修改邮箱'
                }
            },
            {
                path: '/compony_info',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/affiliate_message/company_info.vue'))
                    }, 'compony_info')
                },
                name: 'compony_info',
                meta: {
                    isLogin: true,
                    title: '公司资料'
                }
            }
        ]
    },

    // 问题反馈
    {
        path: '/feedback_list',
        component: App,
        children: [
            {
                path: '/feedback_list',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/feedback/list.vue'))
                    }, 'feedback_list')
                },
                name: 'feedback_list',
                meta: {
                    isLogin: true,
                    title: '问题反馈-列表'
                }
            }
        ]
    },
    {
        path: '/new_feedback',
        component: resolve => {
            require.ensure([], function () {
                resolve(require('../pages/feedback/new_feedback.vue'))
            }, 'new_feedback')
        },
        name: 'new_feedback',
        meta: {
            isLogin: true,
            title: '问题反馈-新增'
        }
    },
    {
        path: '/view_feedback/:id',
        component: resolve => {
            require.ensure([], function () {
                resolve(require('../pages/feedback/view.vue'))
            }, 'view_feedback')
        },
        name: 'view_feedback',
        meta: {
            isLogin: true,
            title: '问题反馈-查看'
        }
    },
    {
        path: '/evaluate_feedback/:id',
        component: resolve => {
            require.ensure([], function () {
                resolve(require('../pages/feedback/evaluate.vue'))
            }, 'evaluate_feedback')
        },
        name: 'evaluate_feedback',
        meta: {
            isLogin: true,
            title: '问题反馈-查看'
        }
    },
    {
        path: '/reply_feedback/:id',
        component: resolve => {
            require.ensure([], function () {
                resolve(require('../pages/feedback/reply.vue'))
            }, 'reply_feedback')
        },
        name: 'reply_feedback',
        meta: {
            isLogin: true,
            title: '问题反馈-查看'
        }
    },
    // 公告
    {
        path: '/announcement',
        component: App,
        children: [
            {
                path: '/announcement',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/announcement/list.vue'))
                    }, 'announcement_list')
                },
                name: 'announcement_list',
                meta: {
                    isLogin: true,
                    title: '公告-列表'
                }
            },
            {
                path: '/announcement/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/announcement/detail.vue'))
                    }, 'announcement_detail')
                },
                name: 'announcement_detail',
                meta: {
                    isLogin: true,
                    title: '公告-详情页'
                }
            }
        ]
    },
    // 我的合同
    {
        path: '/contract_list',
        component: App,
        children: [
            {
                path: '/contract_list',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/list.vue'))
                    }, 'contract_list')
                },
                name: 'contract_list',
                meta: {
                    isLogin: true,
                    title: '我的合同-列表'
                }
            },
            {
                path: '/contract_add',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/add.vue'))
                    }, 'contract_add')
                },
                name: 'contract_add',
                meta: {
                    isLogin: true,
                    title: '我的合同-新增'
                }
            },
            {
                path: '/contract_edit/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/edit.vue'))
                    }, 'contract_edit')
                },
                name: 'contract_edit',
                meta: {
                    isLogin: true,
                    title: '我的合同-编辑'
                }
            },
            {
                path: '/contract_addition/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/addition.vue'))
                    }, 'contract_addition')
                },
                name: 'contract_addition',
                meta: {
                    isLogin: true,
                    title: '我的合同-编辑补充协议'
                }
            },
            {
                path: '/contract_view/:id',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/view.vue'))
                    }, 'contract_view')
                },
                name: 'contract_view',
                meta: {
                    isLogin: true,
                    title: '我的合同-查看'
                }
            },
            {
                path: '/contract_audit/:id/:status',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/my_contract/contract_audit.vue'))
                    }, 'contract_audit')
                },
                name: 'contract_audit',
                meta: {
                    isLogin: true,
                    title: '我的合同-合同审核中以及合同驳回'
                }
            }
        ]
    },
    // 联系我们
    {
        path: '/contact_us',
        component: App,
        children: [
            {
                path: '/contact_us',
                component: resolve => {
                    require.ensure([], function () {
                        resolve(require('../pages/contact_us/contact_us.vue'))
                    }, 'contact_us')
                },
                name: 'contact_us',
                meta: {
                    title: '联系我们'
                }
            }
        ]
    },
    {
        path: '*',
        component: resolve => {
            require.ensure([], function () {
                resolve(require('../components/error404.vue')) // 404页面
            }, 'error404')
        },
        meta: {
            title: 'error404'
        }
    }
]
export default routes
