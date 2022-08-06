import request from '@/utils/request'
// 查询企业的部门列表
export function getDepartmentData() {
  return request({
    url: '/company/department'
  })
}
// 删除部门列表
export function delDepartmentData(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 新增部门
export function addDepartmentData(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 获取简单员工列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
