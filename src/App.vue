
<template>
  <div id="app">

      <draggable-box @click="showModel"></draggable-box>
      <ModelBox :show="show" @changeModel="changeModel"></ModelBox>
      <router-view />
    </div>
</template>

<script>
import DraggableBox from './components/DraggableBox.vue'
import ModelBox from './components/ModelBox.vue'
// 入口组件
export default {
  name: 'App',
  components: {
    DraggableBox,
    ModelBox
  },
  data () {
    return {
      show: false
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
