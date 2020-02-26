// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import axios from 'axios'
import { Input, Rate, Select, Option, Upload } from 'element-ui'
import {
    Button,
    Card,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    Dialog,
    Field,
    Icon,
    List,
    Loading,
    NavBar,
    Panel,
    Popup,
    RadioGroup,
    Radio,
    Row,
    Swipe,
    SwipeItem,
    Tabbar,
    TabbarItem,
    Toast,
    TreeSelect
} from 'vant'

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000'
    // axios.defaults.withCredentials = true

import store from './store/store'

//element
Vue.use(Input)
Vue.use(Rate)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)

//vant
Vue.use(Button);
Vue.use(Card);
Vue.use(Cell).use(CellGroup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Circle);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Icon);
Vue.use(List);
Vue.use(Loading);
Vue.use(NavBar);
Vue.use(Panel);
Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Row);
Vue.use(Row).use(Col);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tabbar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Toast);
Vue.use(TreeSelect);
Vue.config.productionTip = false
Vue.use(VueCookies)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})