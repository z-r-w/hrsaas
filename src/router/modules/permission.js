import layout from '@/layout' // 引入一级路由

export default {
  path: '/permission',
  name: 'permission',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/permission') },
    meta: {
      title: '权限管理'
    }
  }
  ]
}
