import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import tools from '@/components/tools'
import NotFound from '@/components/NotFound'
import MappingData from '@/components/MappingData'
import Multipackage from '@/components/Multipackage'

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
      path: '/tools/:id',
      name: 'tools',
      component: tools
    },
    {
      path: '/mappingdata',
      name: 'MappingData',
      component: MappingData
    },
    {
      path: '/multipackage',
      name: 'Multipackage',
      component: Multipackage
    },
    {
      path:'*',
      name: 'NotFound',
      component: NotFound,
    },
  ]
})
