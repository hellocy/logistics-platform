<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="bg-404">
            <img src="../assets/404.jpg" />
            <div class="error_des">哎呀！您访问的页面出错了...</div>
            <div class="back"><a href="javascript:history.go(-1)">上一页</a></div>
            <a class="back-home" @click="home" href="javascript:;">返回首页</a>
        </div>
    </div>
</template>

<script>
import CommonHeader from './commonHeader'

export default {
    name: 'error404',
    data () {
        return {
            prfClass: 'error-cls'
        }
    },
    components: {
        CommonHeader
    },
    mounted () {
        $(window).on('resize.errorHeight', function () {
            setTimeout(() => {
                if (_self.$refs.imgName) {
                    $('.bg-404').css('height', document.body.clientHeight - $('.lmp-header').height())
                }
            }, 500)
        })
        $('.bg-404').css('height', document.body.clientHeight - $('.lmp-header').height())
    },
    destroyed () {
        $(window).off('resize.errorHeight')
    },
    methods: {
        home () {
            this.$router.push({ path: '/home' })
        }
    }
}
</script>

<style lang="scss">
    $prfClass: 'error-cls';
    .#{$prfClass}{
        background-color: #F7F8FC;
        .bg-404 {
            background-color: #F7F8FC;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
            .error_des{
                font-size:16px;
                color: #2F3032;
            }
            .back{
                margin-top: 23px;
                text-align: center;
                width:160px;
                height:44px;
                background:rgba(66,158,253,1);
                border-radius:5px;
                color: #fff;
                font-size:16px;
                line-height: 44px;
                a{
                    color: #fff;
                }
            }
            .back-home{
                margin-top: 21px;
                font-size:16px;
                color:rgba(66,158,253,1);
                text-decoration: underline;
            }
        }
    }
</style>
