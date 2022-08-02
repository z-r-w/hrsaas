import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取员工基本信息
export function getUserDetailInfo(userId) {
  return request({
    url: `/sys/user/${userId}`
  })
}
export function logout() {
}
