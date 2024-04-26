<template>
  <div class="wrap">
    <div class="title">
      <div style="font-size:0.07rem;color:white;margin-left:0.2rem;font-weight: bold;">你的风格是：</div>
      <h1 style="font-size:0.1rem;color:#00ffff;margin-left:1rem;">{{ $store.state.type }}</h1>
    </div>
    <div class="desc">
      <div class="img">
        <img :src=$store.state.path alt="" style="background-color: transparent;">
      </div>

      <div class="speci">
        <h4 style="color:white;margin:0;padding:0;">你的特点:</h4><br><br>
        <div style="color:white;font-size: 0.08rem;margin-top:-0.15rem;">{{ $store.state.desc }}</div>
      </div>
    </div>
    <div class="tuijian">
      <div style="color:#00ffff"><span style="font-weight: bold;">向你推荐:</span> {{ $store.state.name[0] }} , {{ $store.state.name[1] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      return: {

      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.wrap{
  width:100%;
  height:2.2rem;

  .title{
    height:0.1rem;

    display:flex;
    align-items: center;

  }
  .desc{
    height:1.3rem;

    display:flex;
    margin-top:0.2rem;
    .img{
      width:1rem;
      height:1rem;
      border-radius:50%;
      background-color: aqua;
      margin-left:0.1rem;
      overflow: hidden;
      img{
        width:100%;
        height:110%;
        border-radius:50%;
      }
    }
  }
  .speci{
    width:1.3rem;
    padding:0 0.1rem;
    height:1rem;
    margin:0 auto;
  }
  .tuijian{
    width:2rem;
    height:0.1rem;
    text-align: center;
    margin:0 auto;
    transform:translateY(-0.1rem)
  }
}
</style>
