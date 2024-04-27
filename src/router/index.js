import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/PreView' // 当用户访问 / 路径时重定向到 /home
  },
  {
    path: '/NavBar',
    component: (resolve) => require(['@/views/NavBar'], resolve)
  },
  {
    path: '/EcoIndex',
    component: (resolve) => require(['@/views/EcoIndex'], resolve)
  },
  {
    path: '/QuesTi',
    component: resolve => require(['@/views/QuesTi.vue'], resolve)
  },
  {
    path: '/BaiKe',
    component: resolve => require(['@/views/BaiKe.vue'], resolve)
  },
  {
    path: '/NowNews',
    component: resolve => require(['@/views/NowNews'], resolve)
  },
  {
    path: '/NowRate',
    component: resolve => require(['@/views/NowRate'], resolve)
  },
  {
    path: '/PreView',
    component: resolve => require(['@/views/PreView'], resolve)
  },

  {
    path: '/HomePage',
    component: resolve => require(['@/views/HomePage'], resolve)
  },
  {
    path: '/WinPage',
    component: resolve => require(['@/views/WinPage'], resolve)
  },
  {
    path: '/ProfitPage',
    component: resolve => require(['@/views/ProfitPage'], resolve)
  },

  {
    path: '/DatePage',
    component: resolve => require(['@/views/DatePage'], resolve)
  },
  {
    path: '/FollowPage',
    component: resolve => require(['@/views/FollowPage'], resolve)
  },
  {
    path: '/MapPage',
    component: resolve => require(['@/views/MapPage'], resolve)
  },
  {
    path: '/RateTime',
    component: resolve => require(['@/views/RateTime.vue'], resolve)
  },
  {
    path: '/KData',
    component: resolve => require(['@/views/KData.vue'], resolve)
  },
  {
    path: '/agri',
    component: resolve => require(['@/views/AgriMei.vue'], resolve)
  },
  {
    path: '/gdp',
    component: resolve => require(['@/views/GdpMei.vue'], resolve)
  }
]
const router = new VueRouter({
  routes
  // mode: 'history'
})
export default router
