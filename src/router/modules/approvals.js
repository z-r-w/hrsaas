import layout from '@/layout' // 引入一级路由

export default {
  path: '/approvals',
  name: 'approvals',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/approvals') },
    meta: {
      title: '审批'
    }
  }
  ]
}
