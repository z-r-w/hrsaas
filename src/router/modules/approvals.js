import layout from '@/layout' // 引入一级路由

export default {
  path: '/approvals',
  name: 'approvals',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/approvals') },
    meta: {
      title: '审批'
    }
  }
  ]
}
