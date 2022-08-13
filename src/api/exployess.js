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
// 删除员工接口
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 新增员工的接口
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
// 批量导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
