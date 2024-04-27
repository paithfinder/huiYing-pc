<template>
  <div class="box">
    <div class="top">
            <div class="head">
        <div class="title">
            汇影镜像交易分析应用平台
    </div>
    </div>
    <div class="nav">
      <el-menu
  :default-active="$store.state.activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="transparent"
  style="display:flex;"
  text-color="#fff"
  active-text-color="#ffd04b">
  <router-link to="/HomePage" style="text-decoration: none;">
      <el-menu-item index="1">
      首页
  </el-menu-item>
</router-link>
<router-link to="/NowRate" style="text-decoration: none;"><el-menu-item index="2">
    实时汇率
  </el-menu-item></router-link>
<router-link to="/NowNews" style="text-decoration: none;">  <el-menu-item index="3">
  实时新闻
  </el-menu-item></router-link>
 <router-link to="/EcoIndex" style="text-decoration: none;">      <el-menu-item index="4">
 风向指标
  </el-menu-item></router-link>
  <router-link to="/BaiKe" style="text-decoration: none;">    <el-menu-item index="5">
汇百科
  </el-menu-item></router-link>

      </el-menu>
    </div>
    <div class="time">
      <div class="zhong">北京时间GMT-8:{{ nowTime }}</div>

      <div class="dong">北美东部时间GMT-3:{{ eastTriangleTimeStr }}</div>
    </div>
    </div>
    <div class="buttom">
      <router-view></router-view>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: '',
      activeIndex: '1',
      eastTriangleTimeStr: ''

    }
  },

  beforeCreate () {
    this.$store.commit('changeFlag', true)
  },
  mounted () {
    this.nowTimes()
  },

  beforeDestroy () {
    this.clear()
  },
  methods: {
    timeFormate (timeStamp) {
      // 调整时间戳以获取东三角时间
      const eastTriangleTimestamp = new Date(timeStamp - 5 * 60 * 60 * 1000)

      // 计算东三角时间的年、月、日、小时、分钟和秒
      const yearET = eastTriangleTimestamp.getFullYear()
      const monthET = eastTriangleTimestamp.getMonth() + 1 < 10 ? '0' + (eastTriangleTimestamp.getMonth() + 1) : eastTriangleTimestamp.getMonth() + 1
      const dateET = eastTriangleTimestamp.getDate() < 10 ? '0' + eastTriangleTimestamp.getDate() : eastTriangleTimestamp.getDate()
      const hhET = eastTriangleTimestamp.getHours() < 10 ? '0' + eastTriangleTimestamp.getHours() : eastTriangleTimestamp.getHours()
      const mmET = eastTriangleTimestamp.getMinutes() < 10 ? '0' + eastTriangleTimestamp.getMinutes() : eastTriangleTimestamp.getMinutes()
      const ssET = eastTriangleTimestamp.getSeconds() < 10 ? '0' + eastTriangleTimestamp.getSeconds() : eastTriangleTimestamp.getSeconds()
      const weekET = eastTriangleTimestamp.getDay()
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      const getWeekET = '星期' + weeks[weekET]

      // 格式化东三角时间
      this.eastTriangleTimeStr = yearET + '年' + monthET + '月' + dateET + '日' + ' ' + hhET + ':' + mmET + ':' + ssET + ' ' + getWeekET

      // 计算北京时间
      const year = new Date(timeStamp).getFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      const week = new Date(timeStamp).getDay()
      const getWeek = '星期' + weeks[week]

      // 格式化北京时间
      this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss + ' ' + getWeek
    }, // 实时刷新当前时间，格式化
    nowTimes () {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 1000)
      this.clear()
    },
    clear () {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },
    handleSelect (index, indexPath) {
      console.log(index)
      this.$store.dispatch('indexChange', index)
    }

  }

}
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height:0.4rem;
    box-sizing: border-box;
    // position:relative;
    background-color: rgba(1, 51, 95);

    .top{
      width:100%;
      height:0.4rem;
      .head{
        height:0.4rem;
        width:100%;
        position:absolute;
        z-index: 2;
        .title{
        height:0.4rem;
        line-height: 0.4rem;
        margin-left:0.2rem;

        color:white;
        font-size:0.105rem;
        font-weight: bold;

    }
    }
    .nav{
      position:absolute;
      z-index:4;
      display:flex;
      justify-content: center;
      width:100%;
      .el-menu-item{
        width:1rem;
        text-align: center;

      }
      .el-submenu{
        width:1rem;
        text-align: center;

      }

   }
   .time{
    position:absolute;
    z-index: 4;
    color:white;
    margin-left:8.5rem;
    margin-top:0.08rem;
    width:2rem;
    height:0.3rem;
    font-size:0.07rem;
    transform:translateX(-0.7rem);
    .dong{
      margin-top:0.03rem;
    }
    .zhong{
      margin-left:0.14rem;
    }
   }
    }

}
</style>
