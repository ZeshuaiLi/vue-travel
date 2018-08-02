import * as types from '../mutation-types'
import router from '../../router';

import {SSet, SGet, SRemove, LSet, LGet, LRemove} from '../../api/storage'

const state = (() => {
  const state = {
    data1: '1',
    data2: '2'
  };
  return Object.assign(state);
})()
// 获取用户信息
const getters = {}
const actions = {
  // 获取用户信息
  getDataInfo({commit, state, dispatch}) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/getdata1',
      mutation: 'test/' + types.GET_TEST_DATA
    }, {
      root: true
    })
  },
  // 短信验证码
  sendCode({dispatch}, data) {
    dispatch('AJAX', {
      method: 'get',
      url: '/authCode/getSMSCode',
      params: {
        mobile: data,
        pageType: 2
      },
      toaster: '发送成功'
    }, {
      root: true
    })
  }
}

const mutations = {
  [types.LOGIN_IN_SUCCESS](state, result) {
    state.account = result.account;
    state.token = result.token;
    state.userId = result.userId;
    state.needCode = result.needCode;
    try {
      SSet('user_login', result)
    } catch (e) {
      console.log(e)
    }
    if (!result.needCode) {
      router.push('index');
    }
  },
  [types.LOGOUT_IN_SUCCESS](state, result) {
    state.account = undefined;
    state.token = undefined;
    state.userId = undefined;
    SRemove('user_login')
    router.push('login');
  },
  [types.GET_USER_INFO_SUCCESS](state, result) {
    Object.assign(state, {
      tags: result.companyName,
      type: result.companyNaturename,
      id: result.id,
      shop_name: result.name,
      phone: result.userMobile
    });
  },
  [types.GET_TEST_DATA](state, result) {
    Object.assign(state, {
      data1: result.data1,
      data2: result.data2
    })
  },
  [types.BIND_USER_PHONE_SUCCESS](state, result) {
    router.push('index');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
