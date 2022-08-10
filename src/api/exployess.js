import request from '@/utils/request'
// 获取员工列表
export function getExployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 员工基本信息
export function getExployees(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
