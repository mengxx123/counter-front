<template>
    <my-page title="记录" backable>
        <div v-if="!logs.length">暂无记录</div>
        <ul class="mu-list">
            <li class="mu-item" v-for="log in logs">
                {{ log.count }}
            </li>
        </ul>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                logs: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.logs = this.$storage.get('logs', [])
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
