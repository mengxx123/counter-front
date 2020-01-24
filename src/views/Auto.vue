<template>
    <my-page title="自动计数器" :page="page">
        <div class="common-container container">
            <section class="input-box">
                <div class="count">{{ count }}</div>
                <div class="btns">
                    <div v-if="!isStart">
                        <ui-text-field v-model.number="unit" type="number" label="时间间隔（秒）" />
                        <br>
                        <ui-text-field v-model.number="form.startNum" type="number" label="开始数值" />
                        <br>
                        <ui-text-field v-model.number="form.endNum" type="number" label="结束数值" />
                        <br>
                        <ui-text-field v-model.number="form.addNum" type="number" label="每次增加" />
                        <br>
                        <ui-checkbox v-model="form.sound" label="语音播报" class="demo-checkbox" />
                        <br/>
                        <ui-checkbox v-model="form.simple" label="简单播报" class="demo-checkbox" />
                        <br/>
                        <div class="tip">简单播报模式：只播报个位和十位数，比如 132 播报「三十二」</div>
                        
                    </div>
                    <br>
                    <ui-raised-button class="btn" label="开始" primary @click="start" v-if="!isStart" />
                    <ui-raised-button class="btn" label="重置" @click="reset" v-if="isStart" />
                </div>
            </section>
            <div class="op-btn">
                <!-- <ui-raised-button class="btn" label="重置" @click="reset"/> -->
            </div>
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
    /* eslint-disable */
    function transform(number) {
        number = '' + parseFloat(number).toFixed(2)
        // 分离整数与小数
        let num
        let dig
        if (number.indexOf('.') === -1) {
            num = number
            dig = ''
        } else {
            num = number.substr(0, number.indexOf('.'))
            dig = number.substr(number.indexOf('.') + 1, number.length)
        }
        // 转换整数部分
        let i = 1
        let len = num.length
        let dw2 = ['', '万', '亿'] // 大单位
        let dw1 = ['十', '百', '千'] // 小单位
        let dw = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // 整数部分用
        // let dws = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // 小数部分用
        let k1 = 0 // 计小单位
        let k2 = 0 // 计大单位
        let str = ''
        for (i = 1; i <= len; i++) {
            let n = num.charAt(len - i)
            if (n === '0') {
                if (k1 !== 0) {
                    str = str.substr(1, str.length - 1)
                }

                if (str.substr(0, 1) !== '零' && str.substr(0, 1) !== '万' && str.substr(0, 1) !== '亿') {
                    str = '零' + str
                }
            }

            str = dw[Number(n)].concat(str) // 加数字

            // 在数字范围内
            if (len - i - 1 >= 0) {
                if (k1 !== 3) {
                    // 加小单位
                    str = dw1[k1].concat(str)
                    k1++
                } else {
                    // 不加小单位，加大单位
                    k1 = 0
                    let temp = str.charAt(0)
                    // 若大单位前没有数字则舍去大单位
                    if (temp === '万' || temp === '亿') {
                        str = str.substr(1, str.length - 1)
                    }
                    str = dw2[k2].concat(str)
                }
            }

            // 小单位到千则大单位进一
            if (k1 === 3) {
                k2++
            }
        }
        if (str.substr(str.length - 1, str.length) === '零') {
            str = str.substr(0, str.length - 1)
        }
        // 转换小数部分
        // let strdig = ''
        // if (Number(dig) === 0) {
        //     strdig = '整'
        // } else {
        //     for (i = 0; i < 2; i++) {
        //         let n = dig.charAt(i)
        //         if (i === 1 && Number(n) === 0) {
        //             break
        //         }
        //         if (i === 0 && Number(n) === 0) {
        //             strdig = '零'
        //         } else {
        //             strdig += dws[Number(n)] + (i === 0 ? '角' : '分') // 加数字
        //         }
        //     }
        // }
        // str += '元' + strdig
        return str.replace(new RegExp('一十', 'g'), '十')
    }

    export default {
        data () {
            return {
                form: {
                    startNum: 0,
                    endNum: 9999,
                    addNum: 1,
                    sound: true,
                    simple: false,
                },
                isStart: false,
                count: 0,
                step: 1,
                unit: 4,
                open: false,
                audioSrc: 'http://appcdn.fanyi.baidu.com/zhdict/mp3/ge3.mp3',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/605404d09fa511e99df48144af4c96c0',
                            target: '_blank',
                            title: '帮助'
                        }
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
                this.isStart = true
                this.startTime = new Date().getTime()
                const run = () => {
                    this.count = this.form.startNum + parseInt((new Date().getTime() - this.startTime) / (this.unit * 1000)) * this.form.addNum
                    if (this.count > this.form.endNum) {
                        this.timer && clearInterval(this.timer)
                    }
                    if (this.count !== 0 && this.form.sound) {
                        let readText = transform(this.count)
                        if (this.form.simple && this.count % 100 !== 0) {
                            readText = transform(this.count % 100)
                        }
                        this.audioSrc = `https://tts.baidu.com/text2audio?idx=1&tex=${readText}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=4&vol=5&pit=5&per=0`
                        this.playSound()
                    }
                }
                run()
                this.timer = setInterval(run, this.unit * 1000)
            },
            playSound() {
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            },
            add() {
                this.count += this.step
                this.$storage.set('count_auto', this.count)
            },
            minus() {
                this.count--
                // if (this.count < 0) {
                //     this.count = 0
                // }
                this.$storage.set('count_auto', this.count)
            },
            reset() {
                this.count = 0
                this.isStart = false
                this.timer && clearInterval(this.timer)
                this.$storage.set('count_auto', this.count)
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
