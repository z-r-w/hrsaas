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
