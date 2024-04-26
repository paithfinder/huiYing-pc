<template>
  <div class="wrap">
    <div class="logo">
        <img src="/static/img/preview/logo透明.png" alt="">
        <div class="main">
            <div class="pro">
                <el-progress :percentage="percentage" :stroke-width="26" :show-text="false" class="gradient-color"></el-progress>
                <i class="el-icon-timer" style="color:#7d86ac;transform: translateX(1.35rem) translateY(-120%)  scale(1.7);"></i>
            </div>
            <div style="color:#fff;font-weight:bold;padding:0.04rem">QUESTION {{ nowTi+1 }} / 5</div>
            <hr>
            <h1 style="color:#fff">{{ titleList[`${nowTi}`].title }}</h1>
            <div>
                <!-- <el-radio v-model="radio" label="1" border>{{ titleList[`${nowTi}`].A }}</el-radio>
                <el-radio v-model="radio" label="2" border>{{ titleList[`${nowTi}`].B }}</el-radio>
                <el-radio v-model="radio" label="3" border>{{ titleList[`${nowTi}`].C }}</el-radio>
                <el-radio v-model="radio" label="4" border>{{ titleList[`${nowTi}`].D }}</el-radio> -->
                  <el-radio-group v-model="radio"  class="radio">
                    <el-radio label="A" border v-model="radio">{{ titleList[`${nowTi}`].A }}</el-radio>
                    <el-radio label="B" border>{{ titleList[`${nowTi}`].B }}</el-radio>
                    <el-radio label="C" border>{{ titleList[`${nowTi}`].C }}</el-radio>
                    <el-radio label="D" border>{{ titleList[`${nowTi}`].D }}</el-radio>
                  </el-radio-group>
            </div>
            <div class="button">
                  <el-button type="info" round v-show="nowTi>0 ? true:false" @click="preTi">上一题</el-button>
                 <el-button type="primary" round @click="changeTi" :plain="true" v-show="nowTi<4 ? true :false">下一题</el-button>
                 <el-button type="danger" round v-show="nowTi===4 ? true :false" @click="notice">查看测试结果</el-button>
            </div>
              <!-- <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group> -->
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      percentage: 20,
      nowTi: 0,
      radio: '',
      sumStr: '',
      type: '',
      baseUrl: '/user/userType/',
      titleList: [
        { id: 1, title: '你进行外汇交易的主要目标是', A: '稳定增长资金', B: '快速获取高额利润', C: '保护资本并规避风险', D: '寻找长期投资机会' },
        { id: 2, title: '你对于止损和止盈的看法是', A: '严格执行，控制风险', B: '灵活设置，根据市场波动调整', C: '尽量避免使用，相信自己的判断力', D: '只在特定情况下使用，保护利润或限制损失' },
        { id: 3, title: '你对于交易中的风险承受能力如何', A: '非常低，只愿意承受极小的损失', B: '低，但可以接受适度的波动', C: '中等，可以接受一定程度的风险', D: '较高，愿意承受较大的波动和损失' },
        { id: 4, title: '你在制定交易策略时更注重', A: '资金管理', B: '市场分析', C: '心态调整', D: '外部因素影响' },
        { id: 5, title: '当市场出现剧烈波动时，你会', A: '立即平仓止损', B: '观望并调整止损点位', C: '加仓或减仓来应对波动', D: '坚持原有策略，相信市场会回归稳定' }
      ]
    }
  },
  methods: {
    changeTi () {
      if (this.radio === '') {
        this.$message.error('选择后才能进入下一题哦')
      } else {
        if (this.nowTi < 4) {
          this.nowTi += 1
          if (this.percentage < 100) {
            this.percentage += 20
            this.radio = ''
          }
        }
      }
    },
    preTi () {
      this.radio = ''

      this.sumStr = this.sumStr.substring(0, this.sumStr.length - 1)

      if (this.nowTi > 0) {
        this.nowTi -= 1

        if (this.percentage > 0) {
          this.percentage -= 20
        }
      }
    },
    notice () {
      if (this.radio === '') {
        this.$message.error('选择后才能进入下一题哦')
      } else {
        this.$alert(this.type, '根据测试结果，你可能是', {
          confirmButtonText: '平台已为您优化推荐模式，点击进入首页',
          customClass: 'msg', // 自定义一个class名
          callback: action => {
            if (action === 'confirm') {
              this.$router.push('/HomePage')
            }
          }
        })
      }
    },
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + this.sumStr)
        if (res.data !== null) {
          console.log(res.data.data)
          console.log(res.data.data.type)
          this.type = res.data.data.type
          this.$store.commit('changeName', res.data.data.name)
          this.$store.commit('changeType', res.data.data.type)
          this.$store.commit('changePath', res.data.data.path)
          this.$store.commit('changeDesc', res.data.data.description)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    radio (newValue) {
      if (newValue !== '') {
        this.sumStr += newValue
        console.log(this.sumStr)
        if (this.sumStr.length === 5) {
          this.getData()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
    background: url("/public/static/img/问卷/问卷.png") no-repeat;
    background-size: 100% 100% ;
    .logo{
        width:100%;
        height:0.5rem;
        img{
            width:0.5rem;
            height:0.5rem;
            transform: scale(2);
            margin-left:0.2rem;
            margin-top:0.1rem;
        }
    }
    .main{
        width:3rem;
        height:3rem;
        margin:0 auto;
        .pro{
            width:100%;
            height:0.25rem;
            text-align: center;
            background-color: #31395c;
            border-radius:0.2rem;

            ::v-deep .el-progress {
                transform:translate(2%,25%);
                .el-progress-bar {
                    width:110%;
                    .el-progress-bar__outer {
                    background:transparent !important;
                    width:2.7rem;
                    }
                    .el-progress-bar__inner {
                    background: linear-gradient(to right, #b64875, #8822b2);
                    // transform:scale(0.8)
                    }
  }
            }

        }
        .radio{
            margin:0 auto;
            width:100%;
            height:1.5rem;
            display:flex;
            flex-direction: column;

            justify-content: space-around;
            .el-radio{
                width:100%;
                color:#fff;
                font-weight: bold;
            }
            .el-radio.is-bordered{
                border-radius:0.21rem solid #214365 !important;
                margin:0
            }
        }
        .button{
            margin-top:0.3rem;
            width:100%;
            display:flex;
            justify-content: space-between;
        }
    }
}

</style>
<style lang="less">
.msg{
  width:50%;
  height:40%;
  background-color: #989cad;
  .el-message-box__header{
    background-color:rgba(49, 57, 92,0.5);
    span{
      color:#fff;
    }
  }
  .el-message-box__content{
    background-color:#31395c;
    height:1.1rem;
    .el-message-box__message{
      text-align: center;
      margin:0.1rem auto;
      // background-color: #fff;
      height:1rem;
      p{
        color:#a15938;
        height:1rem;
        line-height:1rem;
        font-size:0.3rem;
        font-weight:bold;
         overflow: hidden;
            white-space: nowrap;
            letter-spacing: 0.15em;
        animation: siz 2s steps(60) forwards;
      }

    }

  }
  .el-message-box__btns{
    padding:0.1rem 0.05rem;
    .el-button{
      background-color:#31395c;
      border:none;
      transform:translateX(-30%)
    }
  }
}
 @keyframes siz {

            from{width: 0;}
            to{width: 100%;}

        }
</style>
