import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Log = resolve => require(['@/views/Log'], resolve)
const V2 = resolve => require(['@/views/V2'], resolve)
const V3 = resolve => require(['@/views/V3'], resolve)
const About = resolve => require(['@/views/About'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/logs',
        component: Log
    },
    {
        path: '/v2',
        component: V2
    },
    {
        path: '/v3',
        component: V3
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/404',
        component: Error404,
        meta: {
            title: '页面找不到了'
        }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
