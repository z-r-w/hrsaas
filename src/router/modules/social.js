import layout from '@/layout' // 引入一级路由

export default {
  path: '/social   ',
  name: 'social   ',
  components: layout,
  children: [{
    path: '',
    components: () => { return import('@/views/social') },
    meta: {
      title: '社保'
    }
  }
  ]
}
