<template>
  <div class="box">
     <video autoplay loop muted poster="static/img/preview/back.mp4" id="bg" >
        <source src="static/img/preview/back.mp4" type="video/mp4">
    </video>
    <img src="static/img/preview/logo透明.png" alt="" class="logo">
    <h1 class="title" >欢迎使用<span>汇影镜像大数据应用平台</span></h1>
    <div class="descri" style="font-family: 楷体;">
      本平台依托机器学习技术<br/><br/>
      基于真实的外汇实时数据和交易历史记录<br/><br/>
      训练模型来拟合信号源的交易行为<br/><br/>
      实时预测信号源的出手概率<br/>
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
      show: false,
      countdown: 6,
      canConfirm: false,
      timer: null

    }
  },
  mounted () {
    this.$store.commit('changeFlag', false)
  },
  methods: {
    open () {
      this.$confirm(<div style="color:red;text-align:left;font-family: 微软雅黑体;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外汇实盘交易是一种合法且成熟的投资方式，它允许投资者直接在银行或其他金融机构提供的交易平台上买卖实际的货币对。这种交易模式在国内外汇市场中被广泛接受，并为投资者提供了参与全球外汇市场的机会。
      <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为您信赖的辅助决策平台，我们致力于提供外汇市场的分析、研究和资讯，帮助您更好地理解市场动态，做出更为明智的投资决策。然而，我们并不直接提供外汇交易服务，也不作为任何交易行为的执行者。
      <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您有意参与外汇实盘交易，我们建议您联系各大银行或其他合法金融机构，以获取更具体的交易途径和服务信息。这些机构通常能够提供专业的交易平台、市场分析工具以及客户支持服务，为您的交易之旅保驾护航。
      <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在探索外汇实盘交易的同时，请务必重视风险管理，了解外汇市场的运作机制，并根据自身情况制定合适的投资策略。记住，投资有风险，交易需谨慎。
      </div>, '声明', {
        confirmButtonText: '请仔细阅读5s',
        showCancelButton: false,
        type: 'warning',
        center: true,
        customClass: 'custom-confirm-dialog',
        beforeClose: (action, instance, done) => {
          const confirmButton = document.querySelector('.el-message-box__btns .el-button--primary')
          if (confirmButton.textContent === '请仔细阅读5s') {
            instance.confirmButtonLoading = true
            done(false)
            this.$message.error('5s后才可以进入哦!', {
              duration: 1000 // 设置显示时间为1秒
            })
            this.canConfirm = false
            confirmButton.disabled = true
          } else if (action === 'confirm' && this.canConfirm) {
            // 跳转到登录页面
            this.$router.push('/DengLu')
            done()
          } else {
            done(false)
          }
        }
      }).then(() => {
        // Start the countdown

      }).catch(() => {
        // Cancelled or timer not finished

      })
      this.startCountdown()
    },
    startCountdown () {
      if (this.timer != null) {
        clearInterval(this.timer)
      }
      this.canConfirm = false
      this.countdown = 6
      this.timer = setInterval(() => {
        this.countdown -= 1
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.canConfirm = true
          // Enable the confirm button and change the text
          this.$nextTick(() => {
            const confirmButton = document.querySelector('.el-message-box__btns .el-button--primary')
            if (this.canConfirm) {
              confirmButton.disabled = false
              confirmButton.textContent = '我已阅读且知晓,确认进入'
            }
          })
        } else {
          // Update the confirm button text with the countdown
          this.$nextTick(() => {
            const confirmButton = document.querySelector('.el-message-box__btns .el-button--primary')
            if (confirmButton) {
              confirmButton.disabled = true
              confirmButton.textContent = `请阅读 (${this.countdown}) s`
            }
          })
        }
      }, 1000)
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

<style lang="less">
.custom-confirm-dialog{
.el-button--small {
    width:100%
}
}
</style>
