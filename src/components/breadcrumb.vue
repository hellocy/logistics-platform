<template>
    <div class="breadcrumb-box" id="breadcrumb-box">
        <span class="" v-if="type === 0">
            <span class="bc-name" @click="jump(-1, home)">{{home.name}}</span>
            <span class="xg">/</span>
        </span>
        <span v-for="(item, index) in breadcrumb_list" :key="index" @click="jump(index, item)">
            <span class="bc-name">{{item.name}}</span>
            <span class="xg" v-if="index !== breadcrumb_list.length - 1">/</span>
        </span>
    </div>
</template>

<script>
export default{
    components: {},
    props: {
        breadcrumb_list: {
            type: Array
        },
        type: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            home: {
                name: '个人中心',
                url: '/personal'
            }
        }
    },
    methods: {
        jump (index, item) {
            if (index !== this.breadcrumb_list.length - 1) {
                this.$router.push({ path: item.url })
            }
        }
    }
}
</script>

<style lang="scss">
    .breadcrumb-box{
        font-size: 12px;
        color: #8F9298;
        .xg{
            display: inline-block;
            margin: 0 9px;
            color: #c0c4cc
        }
        .bc-name{
            cursor:pointer;
            &:last-child{
                color: #429EFD;
                cursor:default;
                font-weight:normal;
            }
            &:hover{
                color: #429EFD;
            }
        }
    }
</style>
