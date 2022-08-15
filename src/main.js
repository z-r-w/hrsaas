import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives' // 自定义指令

import Component from '@/components/index' // 注册全局组件

import * as filters from '@/filters/index' // 过滤器

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(Component)

Vue.config.productionTip = false

// console.log(Object.keys(directives))
Object.keys(directives).forEach(element => {
  console.log(element)
  console.log(directives)
  Vue.directive(element, directives[element])
})

Object.keys(filters).forEach(element => {
  Vue.filter(element, filters[element])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
