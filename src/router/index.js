/*
 * @Description: 导航
 * @Author: rk
 * @Date: 2020-11-09 11:27:31
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Home.vue'),
    children: [
      {
        path: '/MemberCenter',
        name: 'MemberCenter',
        component: () => import(/* webpackChunkName: "Login" */ '../views/memberCenter.vue'),
        meta: { title: "会员中心", showPage: true, primaryMenuName: "会员管理", parentUrl: "MemberCenter", id: "1-1" }
      },
      {
        path: '/monthReport',
        name: 'monthReport',
        component: () => import(/* webpackChunkName: "Login" */ '../views/monthReport.vue'),
        meta: { title: "月报表", showPage: true, primaryMenuName: "报表中心", parentUrl: "monthReport", id: "2-1" }
      },
    ]
  },
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === null) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
