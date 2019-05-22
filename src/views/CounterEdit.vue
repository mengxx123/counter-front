<template>
    <my-page title="编辑" :page="page" backable>
        <div class="common-container container">
            功能开发中
        </div>
    </my-page>
</template>

<script>
    const moment = window.moment

    export default {
        data () {
            return {
                logs: [],
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'clear_all',
                        //     click: this.clear,
                        //     title: '清空'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.logs = this.$storage.get('logs', [])
            },
            clear() {
                this.logs = []
                this.$storage.set('logs', [])
            }
        },
        filters: {
            time(value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
</script>

<style lang="scss" scoped>
.record-list {
    width: 100%;
    max-width: 300px;
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }
}
</style>
