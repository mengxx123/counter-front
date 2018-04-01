<template>
    <my-page title="计数器" :page="page">
        <section class="input-box">
            <div class="count">{{ count }}</div>
            <div class="btns">
                <ui-raised-button label=" + " primary @click="add"/>
            </div>
        </section>
        <div class="op-btn">
            <ui-raised-button class="btn" label=" - " @click="minus"/>
            <ui-raised-button class="btn" label="重置" @click="reset"/>
            <ui-raised-button class="btn" label="记录" @click="log"/>
        </div>
        <ui-drawer right :open="open" :docked="false" @close="toggle()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="toggle" />
            </ui-appbar>
            <div class="body">
                <ui-text-field v-model.number="step" label="每次增加" />
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                count: 0,
                step: 1,
                open: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'settings',
                            click: this.setting,
                            title: '设置'
                        },
                        {
                            type: 'icon',
                            icon: 'schedule',
                            to: '/logs',
                            title: '记录'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.count = this.$storage.get('count', 0)
            console.log(this.count)
        },
        methods: {
            add() {
                this.count += this.step
                this.$storage.set('count', this.count)
            },
            minus() {
                this.count--
                // if (this.count < 0) {
                //     this.count = 0
                // }
                this.$storage.set('count', this.count)
            },
            reset() {
                this.count = 0
                this.$storage.set('count', this.count)
            },
            log() {
                let logs = this.$storage.get('logs', [])
                logs.unshift({
                    id: '' + new Date().getTime(),
                    count: this.count
                })
                this.$storage.set('logs', logs)
            },
            toggle() {
                this.open = !this.open
            },
            setting() {
                this.open = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input-box {
        .count {
            margin-bottom: 16px;
            color: #666;
            font-size: 80px;
            text-align: center;
        }
        .btns {
            text-align: center;
            margin-bottom: 16px;
        }
        .add-btn {
            font-size: 40px;
            width: 88px;
        }
    }
    .op-btn {
        position: absolute;
        left: 16px;
        bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .body {
        padding: 16px;
    }
</style>
