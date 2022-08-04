import layout from '@/layout' // 引入一级路由

export default {
  path: '/setting',
  name: 'setting',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/setting') },
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }
  ]
}
