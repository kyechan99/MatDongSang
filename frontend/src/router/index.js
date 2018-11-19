import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.component('vue-multiselect', window.VueMultiselect.default)

import Index from 'components/IndexPage'
// import Show from 'components/ShowPage'
import Dev from 'components/DevelopPage'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/d',
      name: 'dev',
      component: Dev
    }
  ]
})
