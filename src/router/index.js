import Vue from 'vue'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'

import store from '../store'

// 修改为按需加载
const Home = () => import('@/pages/home/Home')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
sync(store, router)
/* 切换页面增加loading状态 */
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
