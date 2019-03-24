<template>
    <my-page title="自动计数器" :page="page">
        <section class="input-box">
            <div class="count">{{ count }}</div>
            <div class="btns">
                <ui-text-field v-model.number="unit" label="时间间隔（秒）" />
                <br>
                <ui-raised-button label="开始" primary @click="start"/>
            </div>
        </section>
        <div class="op-btn">
            <!-- <ui-raised-button class="btn" label="重置" @click="reset"/> -->
        </div>
        <ui-drawer right :open="open" :docked="false" @close="toggle()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="toggle" />
            </ui-appbar>
            <div class="body">
                <ui-text-field v-model.number="step" label="每次增加" />
            </div>
        </ui-drawer>
        <audio :src="audioSrc" ref="audio"></audio>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                count: 0,
                step: 1,
                unit: 4,
                open: false,
                audioSrc: 'http://appcdn.fanyi.baidu.com/zhdict/mp3/ge3.mp3',
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'settings',
                        //     click: this.setting,
                        //     title: '设置'
                        // },
                        // {
                        //     type: 'icon',
                        //     icon: 'schedule',
                        //     to: '/logs',
                        //     title: '记录'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.count = this.$storage.get('count', 0)
            console.log(this.count)
        },
        destroyed() {
            this.timer && clearInterval(this.timer)
        },
        methods: {
            start() {
                this.startTime = new Date().getTime()
                this.timer = setInterval(() => {
                    this.count = parseInt((new Date().getTime() - this.startTime) / (this.unit * 1000))
                    this.audioSrc = `https://tts.baidu.com/text2audio?idx=1&tex=${this.count}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=4&vol=5&pit=5&per=0`
                    this.playSound()
                }, this.unit * 1000)
            },
            playSound() {
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            },
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
