import layout from '@/layout' // 引入一级路由

export default {
  path: '/permission',
  name: 'permissions',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/permission') },
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }
  ]
}
