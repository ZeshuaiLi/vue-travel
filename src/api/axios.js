import Axios from 'axios'
import router from '../router'

Axios.interceptors.request.use(
  config => {
    console.log(config)
    const url = config.url
    if (url.indexOf('http') === 0) {
      return config
    }
    config.withCredentials = true;
    config.url = DOMAIN + config.url
    return config
  },
err => {
  return Promise.reject(err)
})
Axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === '300') {
      router.replace({
        path: '/login'
      })
    }
    return response.data
  },
  error => {
    return Promise.reject(error)   // 返回接口返回的错误信息
  })
export default Axios
