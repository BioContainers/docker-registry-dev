import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import NotFound from '@/components/NotFound'
import Containerdetails from '@/components/Containerdetails'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: location.hostname.match(/localhost/)?'':'/registry/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/containerdetails',
      name: 'Containerdetails',
      component: Containerdetails,
    },
    {
      path:'*',
      name: 'NotFound',
      component: NotFound,
    },
    
  ]
})
