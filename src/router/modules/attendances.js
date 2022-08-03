import layout from '@/layout' // 引入一级路由

export default {
  path: '/attendances',
  name: 'attendances',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/attendances') },
    meta: {
      title: '考勤'
    }
  }
  ]
}
