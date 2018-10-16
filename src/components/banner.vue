<template>
    <el-carousel :interval="5000" :height="imgHeight">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
            <a href="javascript:;">
                <img ref="imgName" :src=item.img_url>
            </a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import apiHome from '../api/home'

export default {
    name: 'banner',
    data () {
        return {
            prfClass: 'banner',
            imageList: [],
            imgHeight: ''
        }
    },
    watch: {
    },
    mounted () {
        let _self = this
        apiHome.getBanner({}).then((res) => {
            _self.imageList = res.data
            _self.$nextTick(() => {
                if (_self.$refs.imgName) {
                    let img = new Image()
                    img.onload = () => {
                        // 图片加载后以后重新赋值高度
                        _self.imgHeight = `${_self.$refs.imgName['0'].height}px`
                    }
                    img.src = _self.imageList[0].img_url // 等一个图片加载完成后计算图片高度
                }
                _self.scrollFn()
            })
        })
    },
    methods: {
        scrollFn () {
            let _self = this
            $(window).on('resize.setHeight', function () {
                if (_self.$refs.imgName) {
                    _self.imgHeight = `${_self.$refs.imgName['0'].height}px`
                }
            })
        }
    },
    destroyed () {
        $(window).off('resize.setHeight')
    }
}
</script>

<style lang="scss">
    .el-carousel__button{
        width: 40px;
    }
    .el-carousel__item{
        h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            margin: 0;
        }
        a{
            width: 100%;
            height: 100%;
            display: block;
            img{
                width: 100%
            }
        }
    }
    .el-carousel__indicator{
        padding: 40px 12px;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
