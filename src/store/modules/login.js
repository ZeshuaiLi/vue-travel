import * as types from '../mutation-types'
import router from '../../router';

import { SSet, SGet, SRemove, LSet, LGet, LRemove } from '../../api/storage'

const state = (() => {
  const login = SGet('user_login');
  const info = SGet('user_info');
  const state = {
    // 手机号或者邮箱
    account: '',
    // token
    token: '',
    // 用户ID
    userId: '',
    // 是否需要图片验证码
    needCode: false,
    // 用户信息接口数据
    tags: '',
    // 身份标签
    type: '',
    // 身份类型 个人/企业
    id: '',
    // 店铺名称
    shop_name: '',
    // 用户手机号
    phone: ''
  };
  return Object.assign(state, login, info);
})()
// 获取用户信息
const getters = {}
const actions = {
  // 登录
  login ({ dispatch, commit }, data) {
    // console.log(data)
    const body = {
      autoLogin: true,
      mobile: data.account,
      password: data.password
    };
    if (data.needCode) {
      body.imageAuthCode = data.code
      body.imageAuthCodeId = data.codeId
    }
    console.log(body);
    // 调用顶级action
    dispatch('AJAX', {
      method: 'post',
      url: '/api/login',
      mutation: 'login/' + types.LOGIN_IN_SUCCESS,
      data: body
    }, {
      root: true
    })
  },
  // 登出
  logout ({ commit, state, dispatch }) {
    commit('order/' + types.CLEAR_ALL_LISTS, undefined, {
      root: true
    })
    dispatch('AJAX', {
      method: 'get',
      url: '/api/logout',
      mutation: 'login/' + types.LOGOUT_IN_SUCCESS
    }, {
      root: true
    })
  },
  // 获取用户信息
  getUserInfo ({ commit, state, dispatch }) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/spinfo',
      mutation: 'login/' + types.GET_USER_INFO_SUCCESS
    }, {
      root: true
    })
  },
  // 绑定手机号
  bindPhone ({ dispatch }, data) {
    dispatch('AJAX', {
      method: 'get',
      url: '/api/bindphone',
      mutation: 'login/' + types.BIND_USER_PHONE_SUCCESS,
      params: data
    }, {
      root: true
    })
  },
  // 短信验证码
  sendCode ({ dispatch }, data) {
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
  [types.LOGIN_IN_SUCCESS] (state, result) {
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
  [types.LOGOUT_IN_SUCCESS] (state, result) {
    state.account = undefined;
    state.token = undefined;
    state.userId = undefined;
    SRemove('user_login')
    router.push('login');
  },
  [types.GET_USER_INFO_SUCCESS] (state, result) {
    Object.assign(state, {
      tags: result.companyName,
      type: result.companyNaturename,
      id: result.id,
      shop_name: result.name,
      phone: result.userMobile
    });
  },
  [types.BIND_USER_PHONE_SUCCESS] (state, result) {
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
