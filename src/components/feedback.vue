<template>
    <div class="feedback-list-box" id="feedback-list-box">
        <section class="q-item" v-for="item in feedback_list" :key="item.index">
            <div class="q-top">
                <i class="icon">
                    <img :src="item.icon" width="42" height="36" alt="">
                </i>
                <span class="q-title">{{item.qTitle}}</span>
            </div>
            <div class="q-content">
                {{item.qContent}}
            </div>
            <div class="attachments-list-box" v-if="item.attachments.imgs.length || item.attachments.files.length">
                <a class="attach-item" href="javascript:" v-for="attach in item.attachments.imgs" :key="attach.index">
                    <img :alt="attach.name" :key="attach.index" :src="attach.url" width="50" height="50" @click="preview(attach.url)">
                </a>
                <br>
                <ul>
                    <li v-for="attach in item.attachments.files" :key="attach.index">
                        <a class="attach-item" href="javascript:">
                            <span class="attach-file"  @click="download(attach.url)">{{attach.name}}</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div class="q-date">
                {{item.qDate}}
                <span class="contact" v-if="item.contact_type">{{['QQ', '邮件', '手机', '固话'][item.contact_type - 1] + ': ' + item.contact}}</span>
            </div>
        </section>
        <!-- 图片预览 -->
        <image-preview :src="srcs" v-model="showPreview"></image-preview>
    </div>
</template>

<script>
import ImagePreview from 'commonVueLib/ImagePreview/ImagePreview'
export default{
    components: {
        ImagePreview
    },
    props: {
        feedback_list: {
            type: Array
        }
    },
    data () {
        return {
            // 显示图片预览窗口
            showPreview: false,
            srcs: ''
        }
    },
    methods: {
        // 预览图片附件
        preview (url) {
            let _self = this
            _self.showPreview = true
            _self.srcs = url
        },
        download (url) {
            window.open(url)
        }
    }
}
</script>

<style lang="scss">
    .feedback-list-box{
        max-height: 800px;
        overflow-y: auto;
        transition: all .3s ease-in-out;
        .q-item{
            margin-bottom: 30px;
            padding-bottom:40px;
            border-bottom: 1px solid #EBEEF5;
            color:#606266;
            .q-top{
                margin-bottom: 20px;
                .icon{
                    display: inline-block;
                    width: 42px;
                    height:36px;
                    overflow: hidden;
                    border-radius: 17px;
                    vertical-align: middle;
                }
                .q-title{
                    font-size:14px;
                    margin-left:5px;
                }
            }
            .q-content{
                font-size:16px;
            }
            .attachments-list-box{
                margin: 10px 0;
                background:#fafafa;
                padding:5px 10px;
                .attach-item{
                    display:inline-block;
                    margin-bottom:5px;
                }
                img{
                    margin-right:10px;
                    cursor:pointer;
                }
                .attach-file{
                    color:#429EFD
                }
            }
            .q-date{
                font-size:12px;
                margin-top:10px;
            }
            .contact{
                padding-left:10px;
            }
            &:last-of-type{
                border-bottom: 0;
                padding-bottom:0;
            }
        }
    }
</style>
