import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
      path: '/',
      name: 'Order',
      component: () => import('../views/nav/Order')
    },
    {
      path: '/rate',
      name: 'Rate',
      component: () => import('../views/nav/Rate')
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('../views/nav/Merchant')
    },
    {
      path: '/Info',
      name: 'Info',
      component: () => import('../views/nav/Info')
    }
  ]
})