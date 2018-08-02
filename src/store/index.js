/**
 * Created by Administrator on 2017/6/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

import {SET_TOAST_MESSAGE} from './mutation-types'
import * as actions from './actions'
import order from './modules/order'
import login from './modules/login'
import test from './modules/test'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    message: false
  },
  actions,
  mutations: {
    [SET_TOAST_MESSAGE](state, message) {
      state.message = message
    }
  },
  modules: {
    login,
    order,
    test,
    i18n: vuexI18n.store
  },
  strict: debug
})
/* 页面切换显示loading https://vux.li/#/zh-CN/README?id=%E9%A1%B5%E9%9D%A2%E5%88%87%E6%8D%A2%E6%98%BE%E7%A4%BAloading */
store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

export default store
