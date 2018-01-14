<template>
    <my-page title="计数器">
        <section class="input-box">
            <div class="count">{{ count }}</div>
            <div class="btns">
                <ui-raised-button label=" + " primary @click="add"/>
            </div>
            <div class="btns">
                <ui-raised-button label=" - " @click="minus"/>
                <ui-raised-button label="重置" @click="reset"/>
            </div>
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                count: 0
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
            reset: function () {
                this.count = 0
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
</style>
