import Vue from 'vue'
import VueRouter from 'vue-router'
import WinPage from '@/views/WinPage'
import ProfitPage from '@/views/ProfitPage'

import DatePage from '@/views/DatePage'
import FollowPage from '@/views/FollowPage'
import MapPage from '@/views/MapPage'
import HomePage from '@/views/HomePage'
import PreView from '@/views/PreView'
import NowRate from '@/views/NowRate'
import NavBar from '@/views/NavBar'

Vue.use(VueRouter)
const routes = [

  {
    path: '/',
    redirect: '/HomePage' // 当用户访问 / 路径时重定向到 /home
  },
  {
    path: '/NavBar',
    component: NavBar,
    children: [
      {
        path: '/NowRate',
        component: NowRate
      }
    ]
  },
  {
    path: '/PreView',
    component: PreView
  },

  {
    path: '/HomePage',
    component: HomePage
  },
  {
    path: '/WinPage',
    component: WinPage
  },
  {
    path: '/ProfitPage',
    component: ProfitPage
  },

  {
    path: '/DatePage',
    component: DatePage
  },
  {
    path: '/FollowPage',
    component: FollowPage
  },
  {
    path: '/MapPage',
    component: MapPage
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
