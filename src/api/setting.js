import request from '@/utils/request'
// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 读取公司信息数据
export function getComponyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
// 删除角色功能
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
