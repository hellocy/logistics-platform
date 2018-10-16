<template>
    <div :class="prfClass">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            prfClass: 'lmsApp'
        }
    }
}
</script>
