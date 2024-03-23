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
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象上
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
