<template>
    <div class="commonFooter">
        <div class="top">
            <div class="content">
                欢迎您成为我们尊荣的物流供应商<el-button type="primary"  @click="call_enter()">立即入驻 ></el-button>
            </div>
        </div>
        <div class="bottom">
            <div class="content">
                <div class="left">
                    友情链接：<a href="http://www.globalegrow.com/" target="_blank">深圳市环球易购电子商务有限公司</a> <a href="https://www.gw-ec.com/" target="_blank">环球易购供应商系统</a>
                </div>
                <div class="right">
                    <!-- <i>Copyright@2018</i> 利达物流 <i>All Rights Reserved 粤ICP备11103047号-11</i>  -->
                    <a href="./privacy_policy">隐私政策</a> <a href="./legal_disclaimer">法律申明</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'commonFooter',
    data () {
        return {
            prfClass: 'commonFooter'
        }
    },
    mounted () {
        $(window).on('scroll', function () {
            if ($(document).height() === $(window).height() + $(window).scrollTop()) { // 滚动到页面的最底部
                $('.commonFooter .top').css('bottom', '60px')
            } else {
                $('.commonFooter .top').css('bottom', '0px')
            }
        })
    },
    methods: {
        call_enter () { // 调用父组件入驻的方法
            this.$emit('enter', '')
        }
    }
}
</script>

<style lang="scss">
    .commonFooter{
        text-align: center;
        letter-spacing: 1px;
        i{
            letter-spacing: 0px;
        }
        .content{
            width: 1200px;
            height: 60px;
            margin: 0 auto;
            letter-spacing: 0;
            button{
                letter-spacing: 0px;
            }
        }
        .top{
            background-color: rgba(75, 72, 72, 0.9);
            font-size: 16px;
            color: #DFDFDF;
            line-height: 60px;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 99999;
            button{
                width: 110px;
                height: 39px;
                margin-left: 20px;
            }
            .content{
                letter-spacing: 4px;
                button{
                    font-weight: bold;
                }
            }
        }
        .bottom{
            background-color: #363535;
            color: #A5A5A5;
            overflow: hidden;
            height: 60px;
            line-height: 60px;
            a{
                color: #A5A5A5;
            }
            .left{
                float: left;
            }
            .right{
                float: right;
            }
        }
    }
</style>
