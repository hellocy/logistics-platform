<template>
        <div class="account-header">
            
        </div>
</template>

<script>
export default{
    props: {
        account_status: { // 账户状态
            type: Number
        },
        submit_time: { // 提交时间
            type: ''
        },
        passed_time: { // 通过时间
            type: ''
        },
        title: { // 标题
            type: ''
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss">
</style>
