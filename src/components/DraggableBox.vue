<template>
  <div class="modelBox" @click.stop="clickBox">
    <img src="/static/img/订单.png" alt="" class="icon">
    <div style="font-size:0.07rem;color:#fff">模拟交易</div>
  </div>
</template>

<script>
export default {
  name: 'DraggableBox',
  data () {
    return {

    }
  },
  methods: {
    clickBox () {
      this.$emit('click') // 触发click事件
    }
  }
}
</script>

<style lang="less" scoped>
.modelBox {
  position: absolute;
  z-index:10000;
  width: 0.4rem;
  height: 0.4rem;
  top:10%;
  left:95%;
  background-color: rgba(146, 167, 186,0.5);
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
