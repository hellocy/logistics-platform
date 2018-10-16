<template>
    <div :class="prfClass">
        <h3>{{ title }}</h3>
        <div class="wrap">
            <div class="step-item" v-for="(item) in stepCount" :key="item.index" :class="{ active: type >= item.index }">
                <div class="step-square">
                    <span class="block">
                        <span class="step-number">{{item.index}}</span>
                        <span class="corner l-t"></span>
                        <span class="corner r-t"></span>
                        <span class="corner l-b"></span>
                        <span class="corner r-b"></span>
                    </span>
                    <p class="step-title">{{ item.title }}</p>
                </div>
                <div class="h-line" v-if="item.index != stepCount.length" :style="{ width: stepSpace + 'px'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'stepList',
    props: {
        // 选中第几步
        type: {
            type: Number,
            default: 1
        },
        // 导航中间内容
        title: {
            type: String,
            default: ''
        },
        // 步骤所有数据
        stepCount: {
            type: Array,
            default () {
                return []
            }
        },
        // 间距
        stepSpace: {
            type: Number,
            default: 66
        },
        // 页面类型
        pageType: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            prfClass: 'register-step-info'
        }
    },
    mounted () {
        let _type = this.type
        $('.h-line').eq(_type - 1).css('border-color', '#BFC3CB')
    }
}
</script>

<style lang="scss">
    $prfClass: 'register-step-info';
    .#{$prfClass}{
        display: flex;
        justify-content: center;
        flex-direction: column;
        h3{
            display: flex;
            justify-content: center;
            margin-top: 30px;
            font-size: 28px;
            color: #429EFD;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            flex-wrap: wrap;
        }
        .wrap{
            display: flex;
            justify-content: center;
            margin: 30px 0px;
            .step-item{
                .step-square{
                    text-align: center;
                    display: inline-block;
                    vertical-align: top;
                    font-size:0;
                    .block{
                        position: relative;
                        display: inline-block;
                        width:25px;
                        height:25px;
                        background:#BFC3CB;
                        color:#fff;
                        text-align:center;
                        line-height:25px;
                        .step-number{
                            font-size:14px;
                        }
                        .corner{
                            position: absolute;
                            border-color:#F1F1F7;
                            border-style:solid;
                            border-top-width:5px;
                            border-right-width:6px;
                            border-bottom-width:5px;
                            border-left-width:6px;
                            width:0;
                            height:0;
                            display: inline-block;
                            border-bottom-color:transparent;
                            border-right-color:transparent;
                            left:0;
                            top:0;
                        }
                        .l-t{
                            border-top-width: 3px;
                            border-right-width: 6px;
                            border-bottom-width: 3px;
                            border-left-width: 6px;
                        }
                        .r-t{
                            border-top-width: 6px;
                            border-right-width: 3px;
                            border-bottom-width: 6px;
                            border-left-width: 3px;
                            left: 16px;
                            top: -3px;
                            transform: rotate(90deg);

                        }
                        .l-b{
                            border-top-width: 6px;
                            border-right-width: 3px;
                            border-bottom-width: 6px;
                            border-left-width: 3px;
                            left: 3px;
                            top: 16px;
                            transform: rotate(-90deg);
                        }
                        .r-b{
                            border-top-width: 3px;
                            border-right-width: 6px;
                            border-bottom-width: 3px;
                            border-left-width: 6px;
                            left: 13px;
                            top: 19px;
                            transform: rotate(180deg);
                        }
                    }
                    .step-title{
                        margin-top:10px;
                        color:#8F9298;
                        font-size:14px;
                    }
                }
                .h-line{
                    display: inline-block;
                    width: 66px;
                    height: 1px;
                    margin-top: 10px;
                    border-bottom: 1px solid #BFC3CB;
                }
            }
            .active{
                .block{
                    background:#429EFD!important;
                    color:#fff;
                }
                .step-title{
                    color:#429EFD!important;
                }
                .h-line{
                    border-color:#429EFD
                }
            }
        }
    }
</style>
