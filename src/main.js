import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = window.echarts
// this.$echarts其他组件使用

Vue.use(ElementUI)
// 配置请求的根路径
axios.defaults.baseURL = '/api/'
// 挂载到原型对象之前 先设置拦截器 通过axios请求拦截器添加token，保证拥有获取数据的权限
// axios.interceptors.request.use(config => {
// 在 request 拦截器中， 展示进度条 NProgress.start()
// NProgress.start()
// 为请求头对象添加Token验证的Authorization字段
// config.headers.Authorization = window.sessionStorage.getItem('token')
// 最后都必须 return config
// return config
// })
// 在 response 拦截器中， 隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config => {
// NProgress.done()
// return config
// })

// 将axios挂载到Vue的原型对象上
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
