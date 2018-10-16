<template>
    <div :class="prfClass">
        <common-header></common-header>
        <div class="bg">
            <div class="bgCont">联系我们</div>
        </div>
        <div class="middle">
            <div class="address">
                <div class="left"><img src="../../assets/address.png" /></div>
                <div class="right">
                    <h4>公司地址</h4>
                    <p>深圳市南山区南光路永新汇</p>
                </div>
            </div>

            <div class="phone">
                <div class="left"><img src="../../assets/phone.png" /></div>
                <div class="right">
                    <h4>服务热线</h4>
                    <p>0755-32902009</p>
                </div>
            </div>

            <div class="email">
                <div class="left"><img src="../../assets/email.png" /></div>
                <div class="right">
                    <h4>公司邮箱</h4>
                    <p><span>Supply-CS@lida-logistics.com</span>（服务中心邮箱）</p>
                    <p><span>Supply-CS@lida-logistics.com</span>（舞弊违纪举报邮箱）</p>
                </div>
            </div>
        </div>
        <!--地图-->
        <div id="allmap"></div>
        <div class="footer">
            <div class="content">
                <div class="left">
                    友情链接：<a href="http://www.globalegrow.com/" target="_blank">深圳市环球易购电子商务有限公司</a> <a target="_blank" href="https://www.gw-ec.com/">环球易购供应商系统</a>
                </div>
                <div class="right">
                    <!--<i>Copyright@2018</i> 利达物流 <i>All Rights Reserved 粤ICP备11103047号-11</i>-->
                    <a href="./privacy_policy">隐私政策</a> <a href="./legal_disclaimer">法律申明</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonHeader from '../../components/commonHeader'
export default {
    name: 'contact_us',
    data () {
        return {
            prfClass: 'contact-us-wrap',
            activeIndex: '2'
        }
    },
    components: {
        CommonHeader
    },
    mounted () {
        // 百度地图API功能
        let map = new BMap.Map('allmap')
        let point = new BMap.Point(113.928005, 22.516315)
        map.centerAndZoom(point, 18)
        map.addControl(new BMap.MapTypeControl())
        map.setCurrentCity('深圳')

        // // 创建地址解析器实例
        let myGeo = new BMap.Geocoder()
        // // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint('深圳市南山区南光路永新汇', function (point) {
            if (point) {
                map.centerAndZoom(point, 18)
                map.addOverlay(new BMap.Marker(point))
            }
        }, '深圳市')
        // let local = new BMap.LocalSearch(map, {
        //     renderOptions: { map: map }
        // })
        // local.searchInBounds('深圳市环球易购电子商务有限公司', map.getBounds())
        // map.addEventListener('dragend', function () {
        //     map.clearOverlays()
        //     local.searchInBounds('深圳市环球易购电子商务有限公司', map.getBounds())
        // })
        map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    }
}
</script>

<style lang="scss">
    $prfClass: 'contact-us-wrap';
    .#{$prfClass} {
        background-color: #fff;
        .bg{
            position: relative;
            width: 100%;
            height:160px;
            background: url("../../assets/c_bj.jpg") no-repeat;
        }
        .bgCont{
            color: #FFFFFF;
            font-size:36px;
            font-weight: bold;
            width: 1200px;
            margin: 0px auto;
            padding-top: 60px;
        }
        .middle{
            background-color: #fff;
            width: 1200px;
            margin: 0 auto;
            display: flex;
            .address, .phone, .email{
                margin: 61px 0px 67px 0px;
                display: flex;
                flex-flow: row nowrap;
                .left{
                    display: flex;
                    width: 72px;
                    height: 72px;
                }
                .right{
                    display: flex;
                    flex-flow: column nowrap;
                    margin-left: 17px;
                }
                .right h4{
                    color: #3F3F3F;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 11px;
                }
                .right p{
                    color: #3F3F3F;
                    font-size:14px;
                    margin-top: 15px;
                }
            }
            .address{
                width: 260px;
            }
            .phone{
                width: 200px;
                margin: 61px 0px 67px 150px;
            }
            .email{
                margin: 61px 0px 67px 150px;
            }
        }

        .footer{
            position: fixed;
            left: 0px;
            bottom: 0px;
            width: 100%;
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
            .content{
                width: 1200px;
                margin: 0 auto;
                text-align: center;
            }
        }
    }
    #allmap {
        width: 100%;
        height: 510px;
        overflow: hidden;
        margin:0;
        font-family:"微软雅黑";
        position: relative;
        left: 0px;
        /*bottom: 20px;*/
    }
</style>
