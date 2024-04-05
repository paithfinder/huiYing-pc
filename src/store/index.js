import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const myPlugin = (store) => {
  // 在插件中调用 updateDate 方法
  store.dispatch('updateDate')
}
export default new Vuex.Store({
  state () {
    return {
      isEnterIn: true,
      nowDate: ''

    }
  },
  getters: {
    date: state => {
      return state.nowDate
        .substring(5)
        .replace(/-/g, '/') // 从索引为5开始截取，并将 "-" 替换为 "/"
    },
    weekDay: state => {
      const date = new Date(state.nowDate)
      const day = date.getDay()
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return week[day]
    }
  },
  mutations: {
    changeFlag (state, flag) {
      state.isEnterIn = flag
      console.log(state.isEnterIn)
    },
    changeDate (state, day) {
      state.nowDate = day
    }
  },
  actions: {
    async updateDate (context) {
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth() + 1).toString().padStart(2, '0') // 月份补零
      const day = today.getDate().toString().padStart(2, '0') // 日期补零
      const formattedDate = `${year}-${month}-${day}`
      context.commit('changeDate', formattedDate)
      console.log(context.state.nowDate)
    }
  },
  modules: {},
  plugins: [myPlugin]
})
