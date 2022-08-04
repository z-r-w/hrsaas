import layout from '@/layout' // 引入一级路由

export default {
  path: '/salarys',
  name: 'salarys',
  component: layout,
  children: [{
    path: '',
    component: () => { return import('@/views/salarys') },
    meta: {
      title: '工资',
      icon: 'money'
    }
  }
  ]
}
