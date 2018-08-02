import * as types from './mutation-types'
import axios from 'axios'
import router from '../router';

// 全局请求处理
export const AJAX = ({
  commit,
  dispatch
}, options) => {
  const mutation = options.mutation;
  const toaster = options.toaster;
  const attach = options.attach;
  const actions = options.actions;
  axios({
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.params,
    headers: options.headers,
    auth: options.auth
  }).then(data => {
    switch (+data.code) {
      case 200:
        if (mutation) {
          if (attach) {
            data.data = Object.assign(data.data || {}, attach)
          }
          commit(mutation, data.data, {
            root: true
          })
        }
        if (actions && actions.length > 0) {
          actions.forEach(object => {
            dispatch(object.name, object.data, {
              root: true
            })
          });
        }
        break;
      case 300:
        router.replace({
          path: '/login'
        })
        dispatch('reset_toast_message', data.message);
        return commit('order/' + types.CLEAR_ALL_LISTS, undefined, {
          root: true
        })
      case 901005:
      case 901004:
        data = {
          data: {
            needCode: true
          }
        }
        dispatch('reset_toast_message', '密码输入错误次数过多，请填写验证码')
        commit(mutation, data.data, {
          root: true
        })
        break;
      default:
        dispatch('reset_toast_message', data.message);
    }
    if (toaster) {
      dispatch('reset_toast_message', toaster);
    }
  }).catch(reason => {
    return dispatch('reset_toast_message', reason)
    // 处理请求错误
  })
}
// 更改toast消息 屏幕下方提示语
export const reset_toast_message = ({
  commit
}, message) => {
  console.log('提示语', message)
  return commit(types.SET_TOAST_MESSAGE, message)
}
