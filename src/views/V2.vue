<template>
    <my-page title="记分">
        <div class="all">
            <section class="input-box">
                <div class="digital">
                    <div class="digital-bg">88</div>
                    <div class="digital-content">{{ count }}</div>
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label=" + " primary @click="add"/>
                    <ui-raised-button class="btn" label=" - " @click="minus"/>
                </div>
            </section>
            <div class="ratio">:</div>
            <section class="input-box">
                <div class="digital">
                    <div class="digital-bg">88</div>
                    <div class="digital-content">{{ count2 }}</div>
                </div>
                <div class="btns">
                    <ui-raised-button class="btn" label=" + " primary @click="add2"/>
                    <ui-raised-button class="btn" label=" - " @click="minus2"/>
                </div>
            </section>
            <div class="common-btns">
                <ui-raised-button label="重置" @click="reset"/>
            </div>
        </div>

    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                count: 0,
                count2: 0
            }
        },
        methods: {
            add: function () {
                this.count++
            },
            minus: function () {
                this.count--
                if (this.count < 0) {
                    this.count = 0
                }
            },
            add2: function () {
                this.count2++
            },
            minus2: function () {
                this.count2--
                if (this.count2 < 0) {
                    this.count2 = 0
                }
            },
            reset: function () {
                this.count = this.count2 = 0
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
    .btn {
        display: block;
        margin-bottom: 16px;
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
        text-align: center;
    }
</style>
