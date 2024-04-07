<template>
  <div class="page">
        <img src="/static/img/home/back.png" alt="" class="icon" @click="goBack" style="width:0.3rem;height:0.3rem;padding:0.1rem;cursor: pointer;">
    <TradeRate></TradeRate>
  </div>
</template>

<script>
import TradeRate from '@/components/TradeRate'
export default {
  data () {
    return {}
  },
  components: {

    TradeRate

  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.page{
  display:flex;
  width:100%;
  height:100%;

}
