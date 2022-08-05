import request from '@/utils/request'
// 查询企业的部门列表
export function getDepartmentData() {
  return request({
    url: '/company/department'
  })
}
