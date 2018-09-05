import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/main',
            name: 'main',
            component: require('@/pages/main').default
        },
        {
            path: '/',
            name: 'login',
            component: () => import('@/pages/login.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
