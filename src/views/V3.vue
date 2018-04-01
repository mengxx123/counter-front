<template>
    <my-page title="篮球记分">
        <div class="all">
            <section class="input-box">
                <div class="digital">
                    <div class="digital-bg">88</div>
                    <div class="digital-content">{{ count }}</div>
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label=" +3 " @click="add(3)"/>
                    <ui-raised-button class="btn" label=" +2 " @click="add(2)"/>
                    <ui-raised-button class="btn" label=" +1 " @click="add(1)"/>
                </div>
            </section>
            <div class="ratio">:</div>
            <section class="input-box">
                <div class="digital">
                    <div class="digital-bg">88</div>
                    <div class="digital-content">{{ count2 }}</div>
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label=" +3 " @click="add2(3)"/>
                    <ui-raised-button class="btn" label=" +2 " @click="add2(2)"/>
                    <ui-raised-button class="btn" label=" +1 " @click="add2(1)"/>
                </div>
            </section>
            <div class="common-btns">
                <ui-raised-button class="btn" label="重置" @click="reset"/>
                <ui-raised-button class="btn" label="交换" @click="exchange"/>
                <ui-raised-button class="btn" label="撤销" @click="undo" :disabled="!op"/>
            </div>
        </div>

    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                count: 0,
                count2: 0,
                op: null
            }
        },
        methods: {
            add(num) {
                this.count += num
                this.op = {
                    type: 'left',
                    number: num
                }
            },
            minus() {
                this.count--
                if (this.count < 0) {
                    this.count = 0
                }
            },
            add2(num) {
                this.count2 += num
                this.op = {
                    type: 'right',
                    number: num
                }
            },
            minus2() {
                this.count2--
                if (this.count2 < 0) {
                    this.count2 = 0
                }
            },
            exchange() {
                let tmp = this.count
                this.count = this.count2
                this.count2 = tmp
            },
            reset() {
                this.count = this.count2 = 0
            },
            undo() {
                if (this.op) {
                    if (this.op.type === 'left') {
                        this.count -= this.op.number
                    } else {
                        this.count2 -= this.op.number
                    }
                    this.op = null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";
    @font-face{
        font-family: 'digital';
        src:url('/static/ttf/digital7-mono.ttf');
    }
    .ratio {
        float: left;
        margin: 0 24px;
        font-family: 'digital';
        color: #f66;
        font-size: 72px;
        line-height: 1;
    }
    .all {
        width: 258px;
        margin: 0 auto;
        @include clearfix;
    }
    .digital {
        display: inline-block;
        position: relative;
        font-size: 80px;
        font-family: 'digital';
        text-align: right;
        width: 72px;
        height: 72px;
        margin-bottom: 16px;
        line-height: 1;
        .digital-content,
        .digital-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
        .digital-content {
            color: #f66;
        }
        .digital-bg {
            color: #eee;
        }
    }
    .btns {
        .btn {
            display: block;
            margin-bottom: 16px;
        }
    }
    .time {
        font-weight: 100;
        font-family: 'digital';
        color: #f66;
        text-align: center;
    }
    .asd {
        font-weight: 100;
        font-family: 'digital';;
        color: #f66;
        font-size: 100px;
        text-align: center;
    }
    .input-box {
        float: left;
        .count {
            margin-bottom: 16px;
            color: #f66;
            font-size: 80px;
            font-family: 'digital';
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
    .common-btns {
        position: absolute;
        left: 16px;
        bottom: 16px;
        text-align: center;
        .btn {
            margin-right: 8px;
        }
    }
</style>
