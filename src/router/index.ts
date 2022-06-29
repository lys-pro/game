/*
 * @Author: 李延送
 * @Date: 2022-06-15 17:35:20
 * @LastEditTime: 2022-06-29 15:46:24
 * @Description: Do not edithome
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue')
    },
    {
        path: '/gobang',
        name: 'gobang',
        component: () => import('@/views/gobang/index.vue')
    },
    {
        path: '/sokoban',
        name: 'sokoban',
        component: () => import('@/views/sokoban/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/jzchess',
        name: 'jzchess',
        component: () => import('@/views/jzchess/index.vue')
    },
    {
        path: '/stonechess',
        name: 'stonechess',
        component: () => import('@/views/stonechess/index.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
