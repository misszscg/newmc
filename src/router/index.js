import Vue from 'vue'
import Router from 'vue-router'
import doc from '@/components/docContainer'

Vue.use(Router)
const commonRoutes =  [
    {
      path: '/',
      name: 'doc',
      component: doc
    },
    {
      path: '*',
      name: 'doc',
      component: doc
    }
  ]
  const createRouter = new Router({
    routes: [ ...commonRoutes ]
  })
  export default createRouter

