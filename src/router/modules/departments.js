import layout from '@/layout' // 引入一级路由

export default {
  path: '/departments',
  name: 'departments',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/departments') },
    meta: {
      title: '组织架构'
    }
  }
  ]
}
