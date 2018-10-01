import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: location.hostname.match(/localhost/)?'':'/registry/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
