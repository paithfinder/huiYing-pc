import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      isEnterIn: true
    }
  },
  getters: {
  },
  mutations: {
    changeFlag (state, flag) {
      state.isEnterIn = flag
      console.log(state.isEnterIn)
    }
  },
  actions: {
  },
  modules: {
  }
})
