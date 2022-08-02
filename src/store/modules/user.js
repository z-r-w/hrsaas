import { getToken, setToken, removeToken, setTimestampe } from '@/utils/auth'
import { login, getUserInfo, getUserDetailInfo } from '@/api/user'

// 状态
const state = {
  token: getToken(), // 设置token初始状态   token持久化 => 放到缓存中
  userInfo: {} // 存放用户信息
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  // 获取用户信息
  setUserInfo(state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    if (result) {
      // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
      // 现在有用户token
      // actions 修改state 必须通过mutations
      context.commit('setToken', result)
      setTimestampe()
    }
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailInfo(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return baseResult

    // context.commit('setUserInfo', result)
    // return result
  },
  // 退出登录
  logout(context) {
    context.commit('removeUserInfo')
    context.commit('removeToken')
  }
  // 获取用户详细信息
  // async getUserDetailInfo(context) {
  //   console.log('context', context)
  //   const result = await getUserInfo()
  //   // const baseInfo = await getUserDetailInfo(state.userInfo.userId)
  //   const baseInfo = await getUserDetailInfo(result.userId)
  //   const baseResult = { ...result, ...baseInfo }
  //   context.commit('setUserInfo', baseResult)
  //   return baseResult
  // }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
