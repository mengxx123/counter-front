<template>
    <my-page title="批量计数器" :page="page">
        <ul class="counter-list">
            <li class="item" v-for="counter, index in counters" :key="counter.id">
                <div class="count">{{ counter.count }}</div>
                <ui-icon-button class="icon" slot="right" icon="add" @click="add(index)"/>
                <ui-icon-button class="icon" slot="right" icon="remove" @click="minus(index)"/>
                <ui-icon-menu
                    icon="more_vert"
                    :anchorOrigin="leftTop"
                    :targetOrigin="leftTop"
                    >
                    <ui-menu-item title="重置" @click="reset(index)" />
                    <ui-menu-item title="删除" @click="remove(index)" />
                </ui-icon-menu>
            </li>
        </ul>
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
                counters: [
                    {
                        id: '1',
                        count: 0
                    },
                    {
                        id: '2',
                        count: 0
                    },
                    {
                        id: '3',
                        count: 0
                    }
                ],
                open: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'add',
                            click: this.addCounter,
                            title: '添加计数器'
                        },
                        {
                            type: 'icon',
                            icon: 'clear_all',
                            click: this.resetAll,
                            title: '重置所有'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.counters = this.$storage.get('counters', this.counters)
        },
        methods: {
            add(index) {
                this.counters[index].count++
                this.save()
            },
            minus(index) {
                this.counters[index].count--
                this.save()
            },
            remove(index) {
                this.counters.splice(index, 1)
                this.save()
            },
            addCounter() {
                this.counters.push({
                    id: new Date().getTime(),
                    count: 0
                })
                this.save()
            },
            save() {
                this.$storage.set('counters', this.counters)
            },
            reset(index) {
                this.counters[index].count = 0
                this.save()
            },
            resetAll() {
                for (let counter of this.counters) {
                    counter.count = 0
                }
                this.save()
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
    .counter-list {
        max-width: 320px;
        padding-right: 16px;
        .item {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, .12)
        }
        .count {
            width: 80px;
            font-size: 20px;
        }
    }
    .icon {
        margin-right: 16px;
        color: #333;
    }
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
