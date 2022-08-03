import layout from '@/layout' // 引入一级路由

export default {
  path: '/setting',
  name: 'setting',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/setting') },
    meta: {
      title: '公司设置'
    }
  }
  ]
}
