import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Авторизация',
    meta: {layout: 'auth'},
    component: () => import('../views/Auth/Auth.vue')
  },
  {
    path: '/getinfo',
    name: 'Получение данные',
    meta: {layout: 'auth', auth: true},
    component: () => import('../views/Auth/GetInfo.vue')
  },
  {
    path: '/',
    name: 'Profile',
    meta: {layout: 'main', auth: true, info: true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/houses/:id',
    name: 'HouseId',
    meta: {layout: 'main', auth: true, info: true},
    component: () => import('../views/HousePage.vue')
  },
  {
    path: '/users/:id',
    name: 'UserId',
    meta: {layout: 'main', auth: true, info: true},
    component: () => import('../views/UserPage.vue')
  },
  {
    path: '/admin/projects',
    name: 'Projects',
    meta: {layout: 'main', auth: true, info: true},
    component: () => import('../views/Admin/Projects.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  const requireInfo = to.matched.some(record => record.meta.info)

  if(requireAuth && !currentUser) {
    next('/auth')
  }
  else {
    if(requireInfo) {
      const info = (await firebase.database().ref(`/users/${currentUser.uid}/info`).once('value')).val()
      if( !info ) {
        next('/getinfo')
      }
      else {
        next()
      }
    }
    next()
  }

})

export default router
