<template>
    <my-page title="关于">
        <div class="about-box">
            <img class="logo" src="/static/img/logo.png">
            <div class="version">计数器 v1.1.0</div>
            <div class="copyright">© 2018 <a href="https://yunser.com">云设</a></div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .about-box {
        text-align: center;
        .logo {
            display: block;
            width: 64px;
            margin: 80px auto 16px auto;
        }
        .version {
            margin-bottom: 16px;
            color: #999;
        }
        .copyright {
            text-align: center;
            a {
                color: inherit;
            }
        }
    }
</style>
