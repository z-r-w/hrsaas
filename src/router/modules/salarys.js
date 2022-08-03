import layout from '@/layout' // 引入一级路由

export default {
  path: '/salarys',
  name: 'salarys',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/salarys') },
    meta: {
      title: '工资'
    }
  }
  ]
}
