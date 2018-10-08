import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'


import ContainerDetails from '@/components/Containerdetails'
import NotFound from '@/components/NotFound'
import MappingData from '@/components/Mappingdata'

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
      name: 'ContainerDetails',
      component: ContainerDetails,
    },
    {
      path:'/mappingdata',
      name: 'MappingData',
      component: MappingData,
    },
    {
      path:'*',
      name: 'NotFound',
      component: NotFound,
    },
    
  ]
})
