<template>
    <my-page title="记录" :page="page" backable>
        <div class="common-container container">
            <div v-if="!logs.length">暂无记录</div>
            <ul class="record-list">
                <li class="item" v-for="log, index in logs">
                    <!-- {{ logindex + 1 }}: {{ log.count }} -->
                    <div>{{ log.createTime | time }}</div>
                    <div>{{ log.count }}</div>
                </li>
            </ul>
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
                        {
                            type: 'icon',
                            icon: 'clear_all',
                            click: this.clear,
                            title: '清空'
                        }
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
