
<template>
  <div id="app">

      <draggable-box @click="showModel" v-if="isHome"></draggable-box>
      <ModelBox :show="show" @changeModel="changeModel"></ModelBox>
      <router-view />
    </div>
</template>

<script>
import DraggableBox from './components/DraggableBox.vue'
import ModelBox from './components/ModelBox.vue'
import router from './router' // 确保引入了您的 router 实例
// 入口组件
export default {
  name: 'App',
  components: {
    DraggableBox,
    ModelBox
  },
  data () {
    return {
      show: false,
      isHome: false
    }
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    router.beforeEach((to, from, next) => {
      // 检查即将进入的路由名称或路径
      if (to.path === '/' || to.path === '/Preview' || to.path === '/DengLu' || to.path === '/ZhuChe') {
        // 如果是首页，则显示 DraggableBox
        this.isHome = false
      } else {
        // 如果不是首页，则隐藏 DraggableBox
        this.isHome = true
      }
      next() // 确保要调用 next()
    })
  },
  methods: {
    changeModel (flag) {
      this.show = flag
    },
    showModel () {
      this.show = true
    }

  }

}
</script>
