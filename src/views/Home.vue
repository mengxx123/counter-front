<template>
    <my-page title="计数器" :page="page">
        <div class="common-container container">
            <app-list :data="groups" />
        </div>
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
                            icon: 'search',
                            href: 'https://search.yunser.com/?utm_source=counter',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/?utm_source=counter',
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
