<template>
    <my-page title="批量计数器" :page="page">
        <div class="common-container container">
            <div class="empty" v-if="!counters.length">没有计数器</div>
            <ul class="counter-list">
                <li class="item" v-for="counter, index in counters" :key="counter.id">
                    <div class="name">{{ counter.name }}</div>
                    <div class="content">
                        <!-- <div class="name">{{ counter.name }}</div> -->
                        <div class="count">{{ counter.count }}</div>
                        <ui-icon-button class="icon" slot="right" icon="add" @click="add(index)"/>
                        <ui-icon-button class="icon" slot="right" icon="remove" @click="minus(index)"/>
                        <ui-icon-menu
                            icon="more_vert"
                            :anchorOrigin="leftTop"
                            :targetOrigin="leftTop"
                            >
                            <ui-menu-item title="编辑" @click="edit(counter, index)" />
                            <ui-menu-item title="重置" @click="reset(index)" />
                            <ui-menu-item title="删除" @click="remove(index)" />
                            <ui-menu-item title="复制" @click="copyItem(counter, index)" />
                        </ui-icon-menu>
                    </div>
                </li>
            </ul>
            <div class="total">总数：{{ totalCount }}</div>
        
        </div>
        <ui-float-button class="float-button" icon="add" secondary @click="addCounter" />

        <ui-drawer right :open="open" :docked="false" @close="toggle()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="toggle" />
            </ui-appbar>
            <div class="body">
                <ui-text-field v-model.number="step" label="每次增加" />
            </div>
        </ui-drawer>
        <button id="auto-copy" class="btn-copy-2" data-clipboard-text="item.text2" style="display: none">呵呵</button>
    </my-page>
</template>

<script>
    const Clipboard = window.Clipboard

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
                        // {
                        //     type: 'icon',
                        //     icon: 'add',
                        //     click: this.addCounter,
                        //     title: '添加计数器'
                        // },
                        {
                            type: 'icon',
                            icon: 'file_copy',
                            click: this.copy,
                            title: '重置所有'
                        },
                        {
                            type: 'icon',
                            icon: 'clear_all',
                            click: this.resetAll,
                            title: '重置所有'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/3cedd2f09fa511e99df48144af4c96c0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        computed: {
            totalCount() {
                let total = 0
                for (let item of this.counters) {
                    total += item.count
                }
                this.totalCache = total
                return total
            }
        },
        mounted() {
            this.counters = this.$storage.get('counters', this.counters)

            this.clipboard2 = new Clipboard('.btn-copy-2', {
                text: trigger => {
                    return this.copyText
                }
            })
            this.clipboard2.on('success', e => {
                console.info('Action:', e.action)
                console.info('Text:', e.text)
                console.info('Trigger:', e.trigger)
                e.clearSelection()

                this.$message({
                    type: 'success',
                    text: '已复制'
                })
            })
        },
        destroyed() {
             this.clipboard2.destroy()
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
                let name = window.prompt('请输入计数器名称（可选）')
                this.counters.push({
                    id: new Date().getTime(),
                    name,
                    count: 0
                })
                this.save()
            },
            save() {
                this.$storage.set('counters', this.counters)
            },
            edit(counter, index) {
                this.$router.push('/counters/' + counter.id)
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
                this.$message({
                    type: 'success',
                    text: '已全部重置'
                })
            },
            toggle() {
                this.open = !this.open
            },
            setting() {
                this.open = true
            },
            copy() {
                this.copyText = this.counters.map(counter => {
                    return '* ' + (counter.name ? (counter.name + ': ') : '') + counter.count
                }).join('\n') + `\n\n总数：${this.totalCache}`
                document.getElementById('auto-copy').click()
            },
            copyItem(counter, index) {
                console.log(counter)
                this.copyText = '' + (counter.name ? (counter.name + ': ') : '') + counter.count
                document.getElementById('auto-copy').click()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .total {
        margin-top: 16px;
        color: #999;
    }
    .empty {
        text-align: center;
        padding: 80px 0;
        color: #999;
    }
    .float-button {
        position: fixed;
        right: 24px;
        bottom: 24px;
    }
    .counter-list {
        max-width: 320px;
        padding-right: 16px;
        .item {
            padding: 8px 0;
            border-bottom: 1px solid rgba(0, 0, 0, .12)
        }
        .content {
            display: flex;
            align-items: center;
        }
        .count {
            width: 80px;
            font-size: 20px;
        }
        .name {
            // font-weight: bold;
            color: #999;
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
