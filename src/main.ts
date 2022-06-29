/*
 * @Author: 李延送
 * @Date: 2022-06-15 17:35:20
 * @LastEditTime: 2022-06-16 14:05:05
 * @Description: Do not edit
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
