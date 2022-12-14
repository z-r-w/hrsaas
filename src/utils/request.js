import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimestampe } from '@/utils/auth'
import router from '@/router'
const timestampe = 3600
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例
service.interceptors.request.use(
  config => {
    // 有token值就执行
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
      // config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  }, error => { return Promise.reject(error) }
) // 请求拦截器
service.interceptors.response.use(
  response => {
    // axios默认加了一层data
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  }, error => {
    if (error.response && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
) // 响应拦截器

// 检测时间戳
function IsCheckTimeOut() {
  const nowTimestampe = Date.now() // 获取当前时间搓
  const oldTimestampe = getTimestampe()
  return (nowTimestampe - oldTimestampe) / 1000 > timestampe
}
export default service // 导出axios实例
