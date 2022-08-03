import layout from '@/layout' // 引入一级路由

export default {
  path: '/employees',
  name: 'employees',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/employees') },
    meta: {
      title: '员工'
    }
  }
  ]
}
