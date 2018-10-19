import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import ContainerDetails from '@/components/ContainerDetails'
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
      path: '/containerdetails/:id',
      name: 'ContainerDetails',
      component: ContainerDetails
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
