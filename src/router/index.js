import Vue from 'vue'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'

import store from '../store'

// 修改为按需加载
const helloWorld = () => import('@/components/helloWorld')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'helloWorld',
      component: helloWorld
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
