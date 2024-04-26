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
import NowNews from '@/views/NowNews'
import RateTime from '@/views/RateTime.vue'
import EcoIndex from '@/views/EcoIndex'
import BaiKe from '@/views/BaiKe.vue'
import KData from '@/views/KData.vue'
import AgriMei from '@/views/AgriMei.vue'
import GdpMei from '@/views/GdpMei.vue'
import QuesTi from '@/views/QuesTi.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/PreView' // 当用户访问 / 路径时重定向到 /home
  },
  {
    path: '/NavBar',
    component: NavBar
  },
  {
    path: '/EcoIndex',
    component: EcoIndex
  },
  {
    path: '/QuesTi',
    component: QuesTi
  },
  {
    path: '/BaiKe',
    component: BaiKe
  },
  {
    path: '/NowNews',
    component: NowNews
  },
  {
    path: '/NowRate',
    component: NowRate
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
  },
  {
    path: '/RateTime',
    component: RateTime
  },
  {
    path: '/KData',
    component: KData
  },
  {
    path: '/agri',
    component: AgriMei
  },
  {
    path: '/gdp',
    component: GdpMei
  }
]
const router = new VueRouter({
  routes
  // mode: 'history'
})
export default router
