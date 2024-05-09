<template>
  <div
    class="modelBox"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    @click.stop="clickBox"
  >
    <img src="/static/img/订单.png" alt="" class="icon">
    <div style="font-size:0.07rem;color:#fff">模拟交易</div>
  </div>
</template>

<script>
export default {
  name: 'DraggableBox',
  data () {
    return {
      isDragging: false,
      position: {
        x: 1450, // 初始位置
        y: 500
      },
      start: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    startDrag (event) {
      this.isDragging = true
      this.start.x = event.clientX
      this.start.y = event.clientY
      document.body.style.cursor = 'move'

      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
      document.addEventListener('mouseleave', this.stopDrag)
    },
    clickBox () {
      this.$emit('click') // 触发click事件
    },
    onDrag (event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.start.x
        const deltaY = event.clientY - this.start.y
        this.position.x = this.position.x + deltaX
        this.position.y = this.position.y + deltaY
        this.start.x = event.clientX
        this.start.y = event.clientY
      }
    },
    stopDrag () {
      this.isDragging = false
      document.body.style.cursor = 'default'

      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)
      document.removeEventListener('mouseleave', this.stopDrag)
    }
  },
  beforeDestroy () {
    // 组件销毁前移除事件监听
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.stopDrag)
    document.removeEventListener('mouseleave', this.stopDrag)
  }
}
</script>

<style lang="less" scoped>
.modelBox {
  position: absolute;
  z-index:10000;
  width: 0.4rem;
  height: 0.4rem;
  background-color: #92a7ba;
  border: 1px solid #fff;
  border-radius:50%;
  display:flex;
  flex-direction: column;
  align-items: center;
  .icon{
    width:0.2rem;
    height:0.2rem;
    margin-top:0.03rem;

  }
}
</style>
