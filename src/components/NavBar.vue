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
   <router-link to="/SelfPage" style="text-decoration: none;">      <el-menu-item index="5">
 个人与社区
  </el-menu-item></router-link>
  <router-link to="/BaiKe" style="text-decoration: none;">    <el-menu-item index="6">
汇百科
  </el-menu-item></router-link>

      </el-menu>
      </div>
      <div class="gongao">
        <!-- <span style="font-weight: 100;font-size:0.09rem;cursor: pointer;">公告栏</span> -->
        <el-popover
  placement="bottom"
  width="460"

  trigger="hover">
  <el-table :data="gridData" max-height="250">
    <el-table-column width="160" property="time" label="时间" align="center"></el-table-column>
    <el-table-column width="300" property="things" label="事件" ></el-table-column>
  </el-table>

  <el-button slot="reference" style="background-color: transparent;border:none;color:#fff;font-size:0.08rem">

    公告栏
    <el-tooltip class="item" effect="light" content="近期较重要的经济或政治事件" placement="right">
                   <i class="el-icon-question" style="color:#00bed0;transform: scale(1.2);"></i>
            </el-tooltip>
  </el-button>
</el-popover>
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
import axios from 'axios'
export default {
  data () {
    return {
      nowTime: '',
      activeIndex: '1',
      eastTriangleTimeStr: '',
      gridData: [{
        time: '2016-05-02',
        things: '王小虎'

      }]

    }
  },

  beforeCreate () {
    this.$store.commit('changeFlag', true)
  },
  mounted () {
    this.nowTimes()
    this.getData()
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
      const t = year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + ss
      this.$store.commit('changeLauch', t)
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
    },
    async getData () {
      try {
        const res = await axios.get('/eventNews/getImportantNews')

        if (res.data.data !== null) {
          console.log(res.data)
          this.gridData = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
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
    .gongao{
      position:absolute;
      z-index:4;
      color:#fff;
      height:0.4rem;
      line-height:0.4rem;
      width:10%;
      text-align: center;
      transform: translateX(1.25rem);
      // background-color: red;
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
    transform:translateX(-0.4rem);
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
<style>

.el-table th, .el-table tr, .el-table__expanded-cell{
    background-color: rgba(37, 75, 139) !important;
}
.el-table,.el-table__empty-text{
    color: #55b4f8 !important;
}
.el-table{
  background-color: rgb(54, 86, 150) !important;
}
.el-table th{
  color:#fff !important;
}

.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgb(113, 90, 90) !important;
}
.el-table thead{
    color: #58BAFF !important;
}
.el-table:before{
    background-color: #4094DE !important;
}
.el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #0095F4 !important;
}
.el-descriptions__body {
  background-color: rgba(28, 62, 121) !important;

}
.el-descriptions-item__label{
    color:#fff
  }
  .el-descriptions-item__content{
    color:#fff;
  }
::v-deep .el-table__body tr.current-row > td.el-table__cell {
  background-color: rgba(164, 37, 37, 0.3) !important;
}
</style>
