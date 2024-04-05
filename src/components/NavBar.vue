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
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="transparent"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">
      <router-link to="/HomePage" style="text-decoration: none;">首页</router-link>
  </el-menu-item>

  <el-menu-item index="2">
    <router-link to="/NowRate" style="text-decoration: none;">实时汇率</router-link>
  </el-menu-item>
  <el-menu-item index="3">
  <router-link to="/NowNews" style="text-decoration: none;">实时新闻</router-link>
  </el-menu-item>
    <el-menu-item index="4">
  <router-link to="/NowNews" style="text-decoration: none;">汇百科</router-link>
  </el-menu-item>
      </el-menu>
    </div>
    <div class="time">{{ nowTime }}</div>
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
      activeIndex2: '3'
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
      const year = new Date(timeStamp).getFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      const week = new Date(timeStamp).getDay()
      const weeks = ['日', '一', '二', '三', '四', '五', '六']
      const getWeek = '星期' + weeks[week]
      this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss + getWeek
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }

  }
}
</script>

<style lang="less" scoped>
.box{
    width: 100%;
    height:0.4rem;
    box-sizing: border-box;
    position:relative;
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
    margin-left:8rem;
    margin-top:0.15rem;
   }
    }

}
</style>
