// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import vuexI18n from 'vuex-i18n'// 国际化插件

import App from './App'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {
  LoadingPlugin // 加载插件
} from 'vux'

import router from './router'
import store from './store'
import './assets/less/main.less'
import './assets/reset.css'
import 'swiper/dist/css/swiper.css'

import Axios from './api/axios'

import { fixed } from './filters/number'

Vue.prototype.$http = Axios

Vue.config.productionTip = false
fastClick.attach(document.body)
// Vue.use(vuexI18n.plugin, store)

// Vue.use(DevicePlugin)
Vue.use(LoadingPlugin)
// 全局注册组件
// Vue.component('x-input', XInput)
// Vue.component('group', Group)
// 过滤器
Vue.filter('fixed', fixed)

Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
