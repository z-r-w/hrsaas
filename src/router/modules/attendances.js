import layout from '@/layout' // 引入一级路由

export default {
  path: '/attendances',
  name: 'attendances',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/attendances') },
    meta: {
      title: '考勤'
    }
  }
  ]
}
