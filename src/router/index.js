import Vue from 'vue'
import Router from 'vue-router'
import doc from '@/components/docContainer'
import slideshow from '@/components/slideshow'
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
    },
    {
      path: '/slideshow',
      name: 'slideshow',
      component: slideshow
    }
  ]
  const createRouter = new Router({
    routes: [ ...commonRoutes ]
  })
  export default createRouter

