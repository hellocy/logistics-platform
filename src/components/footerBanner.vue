<template>
    <div id="footerBanner" @mouseenter="mouseenter()"  @mouseleave="mouseleave()">
        <div class="container">
            <div class="image">
                <li v-for="(item, index) in imageList" :key="index">
                    <img :src="item.src" />
                </li>
            </div>
        </div>
        <span :class="['left', 'move-indicators', {'opacity': is_opacity}]" @click="clickLeft()"><i class="el-icon-arrow-left"></i></span>
        <span :class="['right', 'move-indicators', {'opacity': is_opacity}]" @click="clickRight()"><i class="el-icon-arrow-right"></i></span>
    </div>
</template>

<script>

export default {
    name: 'footerBanner',
    data () {
        return {
            prfClass: 'footerBanner',
            imageList: [
                {
                    src: '/static/img/cooperate1.png'
                },
                {
                    src: '/static/img/cooperate3.png'
                },
                {
                    src: '/static/img/cooperate2.png'
                },
                {
                    src: '/static/img/cooperate4.png'
                },
                {
                    src: '/static/img/cooperate5.png'
                }
            ],
            is_opacity: false // 是否显示左右切换按钮
        }
    },
    mounted () {
        // 1.克隆图片层出来
        let img = $('.image').clone(true)
        let size = Object.keys(this.imageList).length // 获取图片的个数
        let width = $('.image').first().find('li').width() + parseInt($('.image').first().find('li').css('padding-left')) * 2 // 一个li的长度
        let imgw = width * size // 计算轮播的总长度
        if (size > 6) { // 图片个数大于6个才需要轮播 不然就居中显示
            img.insertAfter($('.image'))
            img.insertBefore($('.image'))
            $('#footerBanner .container').css('width', imgw * 3) // 给容器设置可以放下三个轮播图的长度
            $('.container').css('margin-left', '-' + imgw + 'px')
        }
    },
    methods: {
        mouseenter () { // 鼠标移入时 显示左右切换按钮
            let size = Object.keys(this.imageList).length // 获取图片的个数
            if (size > 6) { // 图片个数大于6个才需要轮播 不然就居中显示
                this.is_opacity = true
            }
        },
        mouseleave () { // 鼠标移出时 隐藏左右切换按钮
            this.is_opacity = false
        },
        clickLeft () { // 点击左边按钮
            let width = $('.image').first().find('li').width() + parseInt($('.image').first().find('li').css('padding-left')) * 2 // 一个li的长度
            let size = Object.keys(this.imageList).length // 获取图片的个数
            let imgw = width * size // 计算轮播的总长度
            $('.container').css('margin-left', '+=' + width) // 让第一个image层向右移动
            if (parseInt($('.container').css('margin-left')) === 0) { // 判断第一个图片层是否已经全部进入容器，如果已经全部进入，让该层回到初始状态
                $('.container').css('margin-left', '-' + imgw + 'px')
            }
        },
        clickRight () { // 点击右边按钮
            let width = $('.image').first().find('li').width() + parseInt($('.image').first().find('li').css('padding-left')) * 2 // 一个li的长度
            let size = Object.keys(this.imageList).length // 获取图片的个数
            let imgw = width * size // 计算轮播的总长度
            $('.container').css('margin-left', '-=' + width) // 让第一个image层向右移动
            if (parseInt($('.container').css('margin-left')) === parseInt('-' + imgw * 2)) { // 判断第一个图片层是否已经全部进入容器，如果已经全部进入，让该层回到初始状态
                $('.container').css('margin-left', '-' + imgw + 'px')
            }
        }
    }
}
</script>

<style lang="scss">
    #footerBanner{
        width:1200px;
        height:176px;
        overflow:hidden;
        margin: 0 auto;
        position: relative;
        cursor: pointer;
        padding: 0 15px;
        .container{
            display: flex;
            justify-content: center;
        }
        .image{
            float: left;
        }
        li{
            list-style-type:none;
            float:left;
            width: 144px;
            height: 136px;
            padding: 0 28px;
            display:flex;
            align-items: center;
            text-align: center;
            img{
                margin: 0 auto;
            }
        }
        .move-indicators{
            background-color: #e6e6e6;
            width: 30px;
            height: 30px;
            display: inline-block;
            line-height: 30px;
            text-align: center;
            border-radius: 45px;
            font-size: 20px;
            color: #cbcbcb;
            position:absolute;
            top: 53px;
            opacity: 0
        }
        .opacity{
            opacity: 1
        }
        .move-indicators.left{
            left: 0
        }
        .move-indicators.right{
            right: 0
        }
    }
</style>
