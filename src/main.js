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
axios.defaults.baseURL = 'http://47.108.168.173:8081/api/'
// ' 替换上面的这个接口，你自己把握一下，需要替换成什么样子 怎么替换
// 然后就是解决跨域问题，你叫姜欢去解决
// 没了
// 就是把握可以访问到服务器就行了 还是 没听懂，哪没听懂？就是把这个换了吗
// 不是单纯的换，你那个默认请求路径不是http://localhost:什么什么吗    关于上面的哪个，我也不是很清楚，你去看下怎么替换就行了应该是这样就行了，你去看看你浏览器发出去的请求是什么样子的现在我可以给你看呀
// 那就ok了，你去叫姜欢解决跨域 他给我说他已经解决了 呜呜呜 解决了m ?
// 他说解决了。你看我本地都没报错 呜呜呜 想不通 你这里没拿到数据？ 我本地拿到了的呀运行在本地没问题
// 但是服务器好像就不行你现在可以去试试 哦哦 我是不是要重新打包给姜欢是的soga 好里六了 拜拜
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
