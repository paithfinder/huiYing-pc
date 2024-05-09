import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/PreView' // 当用户访问 / 路径时重定向到 /home
  },

  {
    path: '/EcoIndex',
    component: (resolve) => require(['@/views/EcoIndex'], resolve)
  },
  {
    path: '/DengLu',
    component: (resolve) => require(['@/views/DengLu.vue'], resolve)
  },
  {
    path: '/ZhuChe',
    component: (resolve) => require(['@/views/ZhuChe.vue'], resolve)
  },
  {
    path: '/BaiKe',
    component: (resolve) => require(['@/views/BaiKe.vue'], resolve)
  },
  {
    path: '/NowNews',
    component: (resolve) => require(['@/views/NowNews'], resolve)
  },
  {
    path: '/ReQues',
    component: (resolve) => require(['@/views/ReQues'], resolve)
  },
  {
    path: '/NowRate',
    component: (resolve) => require(['@/views/NowRate'], resolve)
  },
  {
    path: '/PaiHang',
    component: (resolve) => require(['@/views/PaiHang'], resolve)
  },
  {
    path: '/PreView',
    component: (resolve) => require(['@/views/PreView'], resolve)
  },

  {
    path: '/HomePage',
    component: (resolve) => require(['@/views/HomePage'], resolve)
  },
  {
    path: '/WinPage',
    component: (resolve) => require(['@/views/WinPage'], resolve)
  },
  {
    path: '/ProfitPage',
    component: (resolve) => require(['@/views/ProfitPage'], resolve)
  },

  {
    path: '/DatePage',
    component: (resolve) => require(['@/views/DatePage'], resolve)
  },
  {
    path: '/SelfPage',
    component: (resolve) => require(['@/views/SelfPage'], resolve)
  },
  {
    path: '/FollowPage',
    component: (resolve) => require(['@/views/FollowPage'], resolve)
  },
  {
    path: '/MapPage',
    component: (resolve) => require(['@/views/MapPage'], resolve)
  },
  {
    path: '/RateTime',
    component: (resolve) => require(['@/views/RateTime.vue'], resolve)
  },
  {
    path: '/KData',
    component: (resolve) => require(['@/views/KData.vue'], resolve)
  },
  {
    path: '/agri',
    component: (resolve) => require(['@/views/AgriMei.vue'], resolve)
  },
  {
    path: '/gdp',
    component: (resolve) => require(['@/views/GdpMei.vue'], resolve)
  }
]
const router = new VueRouter({
  routes
  // mode: 'history'
})
export default router
