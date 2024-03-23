<template>
<div class="page">
       <img src="/static/img/home/back.png" alt="" class="icon" @click="goBack" >
<NumFo ></NumFo>
</div>
</template>
<script>
import NumFo from '@/components/NumFo'
export default {
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    NumFo
  }
}
</script>
<style lang='less' scoped>
.page{
  display:flex;
  width:100%;
  height:100%;

  .icon{
  width:0.3rem;
  height:0.3rem;
  padding:0.1rem;
  cursor: pointer;
 }

}
</style>
