<template>
    <my-page title="计数器" :page="page">
        <app-list :data="groups" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '计数',
                        apps: [
                            {
                                name: '计数器',
                                desc: '',
                                icon: '/static/img/counter.svg',
                                to: '/simple'
                            },
                            {
                                name: '批量计数器',
                                desc: '',
                                icon: '/static/img/counter.svg',
                                to: '/multiple'
                            },
                            {
                                name: '自动计数器',
                                desc: '',
                                icon: '/static/img/counter.svg',
                                to: '/auto'
                            }
                        ]
                    },
                    {
                        name: '记分',
                        apps: [
                            {
                                name: '计分',
                                desc: '',
                                icon: '/static/img/counter.svg',
                                to: '/v2'
                            },
                            {
                                name: '篮球计分',
                                desc: '',
                                icon: '/static/img/counter.svg',
                                to: '/v3'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>
