// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import router from './router'
import echarts from 'echarts'

import { Aside, Button, Card, Container, Header, Main, Menu, MenuItem, MenuItemGroup, Submenu, Switch, Table, TableColumn, Tabs, TabPane } from 'element-ui'

Vue.use(Aside)
Vue.use(Button)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})