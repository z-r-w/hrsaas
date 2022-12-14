import layout from '@/layout' // 引入一级路由

export default {
  path: '/departments',
  name: 'departments',
  component: layout,
  children: [{
    path: '',
    name: 'departments',
    component: () => { return import('@/views/departments') },
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }
  ]
}
