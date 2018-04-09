import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Protected from '@/components/Protected'

import security from '@/components/security'

import { sync } from 'vuex-router-sync'

import store from '../store'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/role-protected',
    name: 'RoleProtected',
    component: Protected,
    meta: { requiresAuth: true, roles: [ 'admin' ] }
  },
  {
    path: '/protected',
    name: 'Protected',
    component: Protected,
    meta: { requiresAuth: true }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

sync(store, router)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = store.state.security.auth
    if (!auth.authenticated) {
      security.init(next, to.meta.roles)
    } else {
      if (to.meta.roles) {
        if (security.roles(to.meta.roles[0])) {
          next()
        } else {
          next({ name: 'Unauthorized' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
