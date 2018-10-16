<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div :class="[prfClass + '-wrap']">
            <div class="nav">
                <bread-crumb :breadcrumb_list="breadcrumb_list"></bread-crumb>
            </div>
            <div class="wrap">
                <div class="top">
                    <h4>{{ formData.title }}</h4>
                    <span class="time">发布日期：{{ formData.created_at }}</span>
                </div>
                <div class="cont"><span class="txt">{{ formData.content }}</span></div>
                <div class="back">
                    <el-button class="submit" type="primary" @click="back">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
import BreadCrumb from '../../components/breadcrumb'
import api from '../../api/api'

export default {
    name: 'detail',
    data () {
        return {
            prfClass: 'announcement-detail-wrap',
            formData: {
                name: '', // 标题
                time: '', // 发布时间
                content: '' // 内容
            },
            breadcrumb_list: [
                {
                    name: '公告列表',
                    url: '/announcement'
                },
                {
                    name: '公告详情',
                    url: ''
                }
            ]
        }
    },
    components: {
        CommonHeader,
        BreadCrumb
    },
    mounted () {
        this.getDetail()
    },
    methods: {
        // 获取列表信息
        getDetail () {
            let _self = this
            // 传参
            let jsonData = {
                id: _self.$route.params.id
            }
            api.getDetail(jsonData).then((res) => {
                if (res.code === 200) {
                    _self.formData = res.data
                } else {
                    _self.$alert(res.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    })
                }
            })
        },

        // 返回
        back () {
            this.$router.push({ path: '/announcement' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'announcement-detail-wrap';
    .#{$prfClass}-wrap{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 0px 22px;
        .nav {
            margin: 12px 0 0px;
            color: #8F9298;
            font-size: 12px;
            i {
                padding: 0px 6px;
            }
            .localCls {
                color: #429EFD;
            }
        }
        .wrap{
            display: flex;
            flex-flow: column wrap;
            margin-top: 11px;
            justify-content: center;
            padding: 0px 22px 150px;
            background:#fff;
        }
        .top{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column wrap;
            padding: 31px 0px 21px 0px;
            h4{
                color: #2F3032;
                font-size:16px;
                font-weight:bold;
            }
            .time{
                margin-top: 14px;
                font-size:12px;
                color: #999999;
            }
        }
        .cont{
            padding: 33px 25px;
            background-color: #F7F7F7;
            color: #808080;
            font-size:14px;
            line-height: 30px;
            .txt{
                padding: 0 32px;
            }
        }
        .back{
            display: flex;
            justify-content: center;
            margin-top: 90px;
            .submit{
                width:160px;
                height:44px;
            }
        }
    }
</style>
