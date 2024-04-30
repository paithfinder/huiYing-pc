<template>
  <div class="box">
     <video autoplay loop muted poster="static/img/preview/back.mp4" id="bg" >
        <source src="static/img/preview/back.mp4" type="video/mp4">
    </video>
    <img src="static/img/preview/logo透明.png" alt="" class="logo">
    <h1 class="title" >欢迎使用<span>汇影镜像交易分析应用平台</span></h1>
    <div class="descri" style="font-family: 楷体;">
      本平台依托大数据分析<br/><br/>
      基于权威的汇率交易数据和行为特征<br/><br/>
      为用户提供专业的交易参考服务<br/><br/>
      使其能够从中受益并做出更明智的交易决策<br/>
    </div>
    <div class="enter" @click="show=true">
      <img src="static/img/preview/next.png" alt="">
      <el-button type="text" @click="open">点我进入</el-button> \
    </div>

</div>
</template>

<script>

export default {

  data () {
    return {
      show: false

    }
  },
  mounted () {
    this.$store.commit('changeFlag', false)
  },
  methods: {
    open () {
      this.$confirm(<div style="color:red;text-align:left;">从事外汇交易有很大的风险，因此,并非所有的投资人都可以做。<br/>在决定踏入外汇交易市场前，请仔细考虑您的投资目的、经验水平以及风险承受能力只要您从事外汇交易，就有可能损失掉您初始投资的一部分或全部。<br/>因此，请不要投资您损失不起的资金您必须对外汇交易可能带来的所有风险有一个清醒的认识，在您有任何疑问的时候，请向独立理财顾问进行咨询。</div>, '声明', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        customClass: 'custom-confirm-dialog' // 添加自定义类名

      }).then(() => {
        this.$router.push('/DengLu')
      }).catch(() => {

      })
    }
  }

}
</script>

<style lang="less" scoped>
.box{
      width: 100%;
      height: 100%;
      position:relative;
  #bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    filter: blur(4px); /* 添加模糊效果 */

  }
  .logo{
    position:absolute;
    top:-0.3rem;
    left:-0.25rem;
    width:1.4rem;
    height:1.4rem;
    // background-color: red;
    // z-index: 1000;
  }
  .title{
    color:white;
    width:4rem;
    height:0.3rem;
    line-height:0.3rem;
    // background-color: red;
    position:absolute;
    text-align: center;
    top:0.7rem;
    left:50%; /* 将 left 改为 50% */
    transform: translateX(-50%); /* 水平居中 */

    span{

      color:#07aeff;
      margin-left:0.2rem;

        color: #fff;
        text-align: center;
         text-shadow:
         1px 1px 1px #045f9f,
         2px 2px 2px #045f9f,
         3px 3px 3px #045f9f,
         4px 4px 4px #045f9f,
         5px 5px 5px #045f9f,
         6px 6px 6px #045f9f;
         animation: fadeIn 3s ease-out;

    }
  }
   @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
  .descri{
        position:absolute;
        color:white;
        left:50%; /* 将 left 改为 50% */
        transform: translateX(-50%); /* 水平居中 */
        top:1.5rem;
        text-align: center;
        font-size:0.150rem;
         text-shadow:
         1px 1px 1px #045f9f,
         1px 1px 1px #045f9f,
         1px 1px 1px #045f9f,
         1px 1px 1px #045f9f,
         1px 1px 1px #045f9f,
         1px 1px 1px #045f9f;

  }
  .enter{
    position:absolute;
    width:1rem;
    height:0.2rem;
    // background-color: red;
    display:flex;
    justify-content: center;
    align-items: center;
    left:50%; /* 将 left 改为 50% */
    transform: translateX(-50%); /* 水平居中 */
    top:3.5rem;
    cursor: pointer;
    img{
      width:0.2rem;
      height:0.2rem;
    }
    .el-button{
      color:white;
      margin-left:0.05rem;

    }
  }

}
.el-message-box{
  .el-message-box-content{
    color:red !important
  }}

</style>
