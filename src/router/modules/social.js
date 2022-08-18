import layout from '@/layout' // 引入一级路由

export default {
  path: '/social',
  name: 'social_securitys',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }
  ]
}
