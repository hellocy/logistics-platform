<style lang="scss">
    $prfClass: 'home';

    .#{$prfClass} {
        background-color: #fff;
        margin: 0 auto;
        min-width: 1200px;
        .enter-process{
            width: 1044px;
            margin: 0 auto;
            text-align:center;
            h3{
                text-align: center;
                color: #060606;
                font-size: 30px;
                margin: 70px 0 60px 0;
            }
            button {
                width: 200px;
                height: 48px;
                line-height: 26px;
                margin: 28px 0 80px 0;
                font-size: 24px;
                i{
                    margin-left: 4px;
                    vertical-align: middle;
                }
            }
        }
        .enter-requirement{
            text-align: center;
            width: 1170px;
            margin: 0 auto;
            h3{
                font-size: 30px;
                color: #060606;
            }
            h4{
                font-size: 14px;
                color: #A5A5A5;
                margin: 15px 0 40px 0;
            }
            ul{
                overflow: hidden;
                li{
                    float: left;
                    width: 350px;
                    margin-right: 60px;
                    &:last-child{
                        margin-right: 0;
                    }
                    .img{
                        position: relative;
                        span{
                            width: 90px;
                            height: 35px;
                            display: inline-block;
                            background-color: #2C89FC;
                            line-height: 35px;
                            color: #fff;
                            border-radius: 2px;
                            position: absolute;
                            left: 20px;
                            bottom: -16px;
                        }
                        img{
                            width: 350px;
                            height: 210px;
                            display: block;
                        }
                    }
                    p{
                        border: 1px #EDEDED solid;
                        border-top: none;
                        padding: 47px 28px 32px 20px;
                        color: #3F3F3F;
                        font-size: 14px;
                        line-height: 22px;
                        text-align: left;
                    }
                }
            }
        }
        .provider-service{
            background: url('../assets/service_bg.jpg') no-repeat;
            width: 100%;
            text-align: center;
            padding-top: 39px;
            margin: 70px 0;
            h2{
                color: #060606;
                font-size: 30px;
            }
            h3{
                color: #A5A5A5;
                margin-top: 9px;
                font-size: 12px;
                margin-bottom: 40px;
            }
            ul{
                width: 790px;
                margin: 0 auto;
                overflow: hidden;
                li{
                    float: left;
                    margin-right: 88px;
                    i{
                        height: 131px;
                        width: 131px;
                        display:inline-block;
                        background: url('../assets/choose_us_icon.png') no-repeat;
                        background-position: -1373px -30px
                    }
                    .channel-apply{
                        background-position: -803px -30px;
                    }
                    .account{
                        background-position: -993px -30px
                    }
                    .account-message{
                        background-position: -1184px -30px
                    }
                    span{
                        margin: 24px 0 40px;
                        color: #3F3F3F;
                        font-size: 16px;
                        display: block;
                    }
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
        .choose-us{
            width: 1196px;
            margin: 0 auto;
            h3{
                font-size: 30px;
                color: #060606;
                margin-bottom: 70px;
                text-align: center;
            }
            ul{
                overflow:hidden;
                li{
                    float:left;
                    width: 547px;
                    height: 285px;
                    color: #3F3F3F;
                    h4{
                        font-size: 24px;
                        margin-bottom: 25px;
                        font-weight: bold;
                        i{
                            color: #429EFD;
                        }
                    }
                    p{
                        font-size: 16px;
                        line-height: 30px;
                        em{
                            border-bottom: 1px #429EFD  solid;
                        }
                    }
                }
                li:nth-of-type(2n){
                    width: 493px;
                    margin-left: 155px;
                }
                .map{
                    margin: 45px 0 0 0;
                    position: relative;
                    img{
                        margin-left: 43px
                    }
                    h5{
                        color: #A5A5A5;
                        font-size: 12px;
                        text-align: center;
                    }
                    .dot-container{
                        width: 100px;
                        height: 100px;
                        position: absolute;
                        top: 106px;
                        left: 156px;
                        .dot{
                            width: 12px;
                            height: 12px;
                            background-color: #1890FF;
                            border-radius: 45px;
                        }
                        p{
                            position: absolute;
                            font-size: 12px;
                            color: #000;
                            left: 22px;
                        }
                    }
                    .poncho{
                        left: 190px;
                        top: 184px;
                        p{
                            left: -41px;
                        }
                    }
                    .europe{
                        left: 299px;
                        top: 90px;
                        p{
                            left: -40px;
                            top: -15px;
                        }
                    }
                    .Africa{
                        left: 323px;
                        top: 178px;
                        p{
                            left: 21px;
                            top: -9px;
                        }
                    }
                    .eastAsia{
                        left: 480px;
                        top: 114px;
                        p{
                            left: 15px;
                            top: -9px;
                        }
                    }
                    .southeastAsia{
                        left: 442px;
                        top: 177px;
                        p{
                            left: -36px;
                            top: 3px
                        }
                    }
                    .australia{
                        left: 481px;
                        top: 214px;
                        p{
                            left: -24px;
                            top: 10px;
                        }
                    }
                }
                .demand{
                    margin-top: 45px;
                }
            }
            .ul{
                li{
                    width: 64px !important;
                    height: 84px;
                    margin-right: 40px;
                    margin-bottom: 30px;
                    margin-left: 0 !important;
                    text-align: center;
                    i{
                        background: url('../assets/choose_us_icon.png') no-repeat;
                        display: inline-block;
                    }
                    div{
                        margin-top: 9px;
                    }
                }
                li.no-margin{
                    margin-right:0
                }
                .clothe{
                    width: 60px;
                    height: 50px;
                    background-position: -131px -11px;
                    margin-top: 10px;
                }
                .electrommunication{
                    width: 36px;
                    height: 60px;
                    background-position: -10px -10px;
                }
                .consumer-electronics{
                    width: 60px;
                    height: 42px;
                    background-position: -211px -11px;
                    margin-top: 18px;
                }
                .fitting{
                    width: 60px;
                    height: 44px;
                    background-position: -291px -10px;
                    margin-top: 16px;
                }
                .computer{
                    width: 60px;
                    height: 40px;
                    background-position: -534px -10px;
                    margin-top: 20px;
                }
                .sport{
                    width: 60px;
                    height: 60px;
                    background-position: -372px -10px;
                }
                .domestic_appliance{
                    width: 44px;
                    height: 60px;
                    background-position: -67px -10px;
                }
                .auto-parts{
                    width: 60px;
                    height: 52px;
                    background-position: -453px -10px;
                    margin-top: 8px;
                }
                .toy{
                    width: 60px;
                    height: 38px;
                    background-position: -615px -10px;
                    margin: 11px 0;
                }
                .safety{
                    width: 64px;
                    height: 40px;
                    background-position: -697px -10px;
                    margin: 10px 0;
                }
            }
            @keyframes warn {
                0% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.0;
                }

                25% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.1;
                }

                50% {
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    opacity: 0.3;
                }

                75% {
                    transform: scale(0.8);
                    -webkit-transform: scale(0.8);
                    opacity: 0.5;
                }

                100% {
                    transform: scale(1);
                    -webkit-transform: scale(1);
                    opacity: 0.0;
                }
            }

            @keyframes warn1 {
                0% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.0;
                }

                25% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.1;
                }

                50% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.3;
                }

                75% {
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    opacity: 0.5;
                }

                100% {
                    transform: scale(0.8);
                    -webkit-transform: scale(0.8);
                    opacity: 0.0;
                }
            }

            @keyframes warn2 {
                0% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.0;
                }

                25% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.1;
                }

                50% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.3;
                }

                75% {
                    transform: scale(0.3);
                    -webkit-transform: scale(0.3);
                    opacity: 0.5;
                }

                100% {
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    opacity: 0.0;
                }
            }
            /* 产生动画（向外扩散变大）的圆圈  */
            .pulse {
                position: absolute;
                width: 100px;
                height: 100px;
                left: -45px;
                top: -45px;
                border: 2px solid #1890FF;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                -webkit-animation: warn 3s ease-out;
                -moz-animation: warn 3s ease-out;
                animation: warn 3s ease-out;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }

            .pulse1 {
                position: absolute;
                width: 100px;
                height: 100px;
                left: -45px;
                top: -45px;
                border: 2px solid #1890FF;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                -webkit-animation: warn1 3s ease-out;
                -moz-animation: warn1 3s ease-out;
                animation: warn1 3s ease-out;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }
            .pulse2 {
                position: absolute;
                width: 100px;
                height: 100px;
                left: -45px;
                top: -45px;
                border: 2px solid #1890FF;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 1;
                opacity: 0;
                -webkit-animation: warn2 3s ease-out;
                -moz-animation: warn2 3s ease-out;
                animation: warn2 3s ease-out;
                -webkit-animation-iteration-count: infinite;
                -moz-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
            }
        }
        .cooperate-logisticsProvider{
            text-align: center;
            margin-top: 82px;
            padding: 40px 0;
            background-color: #FAFAFA;
            width: 100%;
            height: 183px;
            margin-bottom: 60px;
            h3{
                font-size: 30px;
                color: #060606;
                margin-bottom: 9px;
            }
            h4{
                font-size: 12px;
                color: #A5A5A5;
            }
        }
    }
</style>
<template>
    <div :class="prfClass">
        <!--公共头部-->
        <common-header ref="CommonHeader"></common-header>
        <banner></banner>
        <div class="enter-process">
            <h3>物流商入驻流程</h3>
            <img src="../assets/enter_process.png" alt="">
            <el-button type="primary" @click="enter()">立即入驻 <i> > </i></el-button>
        </div>
        <div class="enter-requirement">
            <h3>入驻要求</h3>
            <h4>全球满足对应条件的物流商均可入驻</h4>
            <ul>
                <li>
                    <div class="img">
                        <img src="../assets/requirement1.jpg" alt="">
                        <span>中国大陆</span>
                    </div>
                    <p>注册资本达200万或以上， 成立1年以上，提供营业执照原件复印件加盖公章。</p>
                </li>
                <li>
                    <div class="img">
                        <img src="../assets/requirement2.jpg" alt="">
                        <span>中国香港</span>
                    </div>
                    <p>成立2年以上，提供注册证书、商业登记证、法团成立表格/周年申报表原件复印件加盖公章。</p>
                </li>
                <li>
                    <div class="img">
                        <img src="../assets/requirement3.jpg" alt="">
                        <span>其他地区</span>
                    </div>
                    <p>成立2年以上，提供注册证书原件复印件加盖公章。</p>
                </li>
            </ul>
        </div>
        <div class="provider-service">
            <h2>一站式物流商服务</h2>
            <h3>更多功能正在开发中，后期计划支持在线接单等功能</h3>
            <ul>
                <li>
                    <i class="icon"></i>
                    <span>标准化快速入驻</span>
                </li>
                <li>
                    <i class="icon channel-apply"></i>
                    <span>渠道申请</span>
                </li>
                <li>
                    <i class="icon account"></i>
                    <span>账户维护</span>
                </li>
                <li>
                    <i class="icon account-message"></i>
                    <span>收款信息维护</span>
                </li>
            </ul>
        </div>
        <div class="choose-us">
            <h3>为什么选择我们</h3>
            <ul>
                <li>
                    <div id="teacherChart" style="width: 550px;height:250px;margin-top: -4px;"></div>
                </li>
                <li>
                    <h4>货量需求<i>大</i></h4>
                    <p>
                        网站注册用户数量超过1亿人，超过<em>5000个</em>优质供应商合作资源，在线产品SKU超过<em>50万</em>，日均发货量<em>200吨</em>，日发包裹<em>30万</em>！
                    </p>
                </li>
                <li>
                    <h4>产品种类<i>多</i>样</h4>
                    <p>
                        力达物流资源平台承运环球易购主要经营品类。环球易购，汇集了众多网络精英，以独具视角的创意、崭新的理念、卓越的产品品质，
                        始终走在全球电子商务一体化时代的前沿， 如今在多个自建垂直网络销售平台上在线销售的SKU有<em>20万</em>种之多，销往全世界<em>200</em>多个国家，力达物流资源平台的货量和品类能充分满足物流合作伙伴的需求。
                    </p>
                </li>
                <li>
                    <ul class="ul">
                        <li>
                            <i class="icon clothe"></i>
                            <div>服装</div>
                        </li>
                        <li>
                            <i class="icon electrommunication"></i>
                            <div>电子通讯</div>
                        </li>
                        <li>
                            <i class="icon consumer-electronics"></i>
                            <div>消费电子</div>
                        </li>
                        <li>
                            <i class="icon fitting"></i>
                            <div>家居用品</div>
                        </li>
                        <li class="no-margin">
                            <i class="icon computer"></i>
                            <div>电脑办公</div>
                        </li>
                        <li>
                            <i class="icon sport"></i>
                            <div>运动娱乐</div>
                        </li>
                        <li>
                            <i class="icon domestic_appliance"></i>
                            <div>家用电器</div>
                        </li>
                        <li>
                            <i class="icon auto-parts"></i>
                            <div>汽摩配件</div>
                        </li>
                        <li>
                            <i class="icon toy"></i>
                            <div>玩具</div>
                        </li>
                        <li class="no-margin">
                            <i class="icon safety"></i>
                            <div>安全防护</div>
                        </li>
                    </ul>
                </li>
                <li class="map">
                    <img src="../assets/map.png" alt="">
                    <div class="dot-container northAmerica">
                        <p>北美</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container poncho">
                        <p>南美</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container europe">
                        <p>欧洲</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container Africa">
                        <p>非洲</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container eastAsia">
                        <p>东亚</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container southeastAsia">
                        <p>东南亚</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                    <div class="dot-container australia">
                        <p>澳洲</p>
                        <div class="dot"></div>
                        <div class="pulse"></div>
                        <div class="pulse1"></div>
                        <div class="pulse2"></div>
                    </div>
                </li>
                <li class="demand">
                    <h4>需求范围<i>广</i></h4>
                    <p>
                        在全球一体化的时代，我们专注于跨境外贸电子商务，背靠深圳高度集中的电子市场的地利优势，开发海外市场，经过努力，在海外市场建立了广阔的销售网络,
                        用户主要来自欧洲、北美洲、南美洲、大洋洲、非洲以及亚洲。欧美用户占近<em>90%</em>，其中欧洲用户贡献<em>45%</em>左右，北美洲贡献<em>35%</em>左右，南美洲贡献<em>5%</em>左右。
                    </p>
                </li>
            </ul>
        </div>
        <div class="cooperate-logisticsProvider">
            <h3>合作伙伴</h3>
            <h4>Cooperation</h4>
            <footer-banner></footer-banner>
        </div>
        <common-footer @enter="enter()"></common-footer>
    </div>
</template>

<script>
import CommonHeader from '../components/commonHeader'
import Banner from '../components/banner'
import commonFooter from '../components/commonFooter'
import footerBanner from '../components/footerBanner'
import apiHome from '../api/home'
import api from '../api/api'
import util from 'commonVueLib/util/tools'

export default {
    name: 'home',
    components: {
        CommonHeader,
        Banner,
        commonFooter,
        footerBanner
    },
    data () {
        return {
            prfClass: 'home'
        }
    },
    mounted () {
        this.drawLine()
    },
    created () {
        // 滚动到顶部
        $('html,body').animate({scrollTop: '0px'}, 600)
    },
    methods: {
        enter () { // 立即入驻
            let _self = this

            // 如果未登录，无须请求接口，直接跳转到登录页面
            if (util.getCache('company_info', 'local') === null) { // 根据是否存在企业信息
                _self.$router.push({ path: '/login' })
                return false
            }

            // 1:入驻资料 2:审核中 3:审核驳回 4:个人中心
            api.getAudit().then((res) => {
                if (res.code === 200) {
                    let jump = res.data.jump
                    if (jump === 1) { // 入驻资料
                        _self.$router.push({ path: '/affiliate_message' })
                    } else if (jump === 2) { // 审核中
                        _self.$store.dispatch('common/auditType', { getAuditType: 1 })
                        _self.$router.push({ path: '/audit_inquiries/2' })
                    } else if (jump === 3) { // 审核驳回
                        _self.$store.dispatch('common/auditType', { getAuditType: 1 })
                        _self.$router.push({ path: '/audit_inquiries/3' })
                    } else if (jump === 4) { // 个人中心
                        _self.$router.push({ path: '/personal' })
                    }
                } else {
                    _self.$message.error({
                        message: res.msg
                    })
                }
            })
        },
        drawLine () {
            // 基于准备好的dom，初始化echarts实例
            let dom = document.getElementById('teacherChart')
            let myChart = echarts.init(dom)
            apiHome.getEchartsData().then((res) => {
                let chartData = res.data
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['B2B', 'B2C']
                    },
                    calculable: true,
                    grid: {
                        x: 70
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: chartData.label,
                            axisLabel: {
                                textStyle: {
                                    color: '#A5A5A5',
                                    fontSize: 12
                                },
                                interval: 0,
                                rotate: -30
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#dedede'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#A5A5A5'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#dedede'
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: [ '#fff' ]
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dotted'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'B2B',
                            type: 'line',
                            data: chartData.b2b_data,
                            smooth: true,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            itemStyle: {
                                normal: {
                                    color: '#0C79FF',
                                    lineStyle: {
                                        color: '#0C79FF'
                                    }
                                }
                            }
                        },
                        {
                            name: 'B2C',
                            type: 'line',
                            smooth: true,
                            data: chartData.b2c_data,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            itemStyle: {
                                normal: {
                                    color: '#1CB343',
                                    lineStyle: {
                                        color: '#1CB343'
                                    }
                                }
                            }
                        }
                    ]
                })
            })
        }
    }
}
</script>
