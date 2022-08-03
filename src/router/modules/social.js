import layout from '@/layout' // 引入一级路由

export default {
  path: '/social',
  name: 'social',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保'
    }
  }
  ]
}
