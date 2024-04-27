<template>
  <div class="wrap">
        <NavBar id="a"></NavBar>
       <div class="cal">
            <div class="title">
                <h3>财经日历</h3>
                  <el-button type="primary" round size="mini" @click="backNow">回到今日</el-button>
            </div>
            <hr class="hr">
            <div class="select">
                <div class="last alter" @click="pre" >
                    <img src="/static/img/news/上周.png" alt="">
                    <div >上周</div>
                </div>
                <div class="week">
                    <ul>
                        <li  v-for="(item) in weekList" :key="item.id" @click="active(item.dateName,item.wkName)"  :class="{ 'highlighted': item.dateName === selectedName }">
                            {{ item.wkName }} {{ item.dateName }}
                        </li>

                    </ul>
                </div>
                <div class="next alter" @click="next" >
                    <div >下周</div>
                    <img src="/static/img/news/下周.png" alt="">

                </div>
            </div>
       </div>
       <div class="data">
            <div class="head">
                <h3>经济数据</h3>

            </div>
            <div class="table">
                <el-table
      :data="ecoTable"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="时间"
        width="180"
        align="center">
        <template slot-scope="scope">
      <div :style="{ color: scope.row.star >= 3 ? 'red' : '' }">
        {{ scope.row.time }}
      </div>
    </template>
      </el-table-column>
      <el-table-column
        prop="dataIn"
        label="数据"
        width="400"
          align="left">
              <template slot-scope="scope">
      <div style="display:flex;align-items: center">

        <!-- 图片 -->
        <img :src="scope.row.src" alt="图片" style="width: 0.1rem; height: 0.1rem;margin-right:0.05rem">
              <!-- 数据值 -->
             <div :style="{ color: scope.row.star >= 3 ? 'red' : '' }">
       {{ scope.row.dataIn }}
      </div>
      </div>
    </template>
      </el-table-column>
      <el-table-column
        prop="star"
        label="重要性"
          align="center">
             <template slot-scope="scope">
        <div>
         <img v-for="n in 5" :key="n" :src="n <= scope.row.star ? `/static/img/news/星星/${scope.row.color}.png` : '/static/img/news/星星/灰.png'" alt="星星" style="width: 0.08rem; height: 0.08rem;padding:0.01rem;">
        </div>
      </template>
      </el-table-column>
            <el-table-column
        prop="qian"
        label="前值"
          align="center">
          <template slot-scope="scope">
      <div :style="{ color: scope.row.star >= 3 ? 'red' : '' }">
        {{ scope.row.qian }}
      </div>
    </template>
      </el-table-column>
            <el-table-column
        prop="pre"
        label="预测值"
          align="center">
          <template slot-scope="scope">
      <div :style="{ color: scope.row.star >= 3 ? 'red' : '' }">
        {{ scope.row.pre }}
      </div>
    </template>
      </el-table-column>
            <el-table-column
        prop="gongBu"
        label="公布值"
          align="center">
          <template slot-scope="scope">
      <div :style="{ color: scope.row.star >= 3 ? 'red' : '' }">
        {{ scope.row.gongu }}
      </div>
    </template>
      </el-table-column>
    </el-table>
            </div>
       </div>
       <div class="event" id="b">
        <h3>事件</h3>
        <div class="eventTable">
             <el-table
      :data="eventTable"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="时间"
        width="180"
          align="center">
          <template slot-scope="scope">
      <div :style="{ color: scope.row.count >= 3 ? 'red' : '' }">
        {{ scope.row.time }}
      </div>
    </template>
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家"
        width="180">
              <template slot-scope="scope">
      <div style="display:flex;align-items: center">

        <!-- 图片 -->
        <img :src="scope.row.src ? scope.row.src : '\static\img\news\各个国家的图片\无.png'" alt="图片" style="width: 0.1rem; height: 0.1rem;margin-right:0.05rem">
              <!-- 数据值 -->
                    <div :style="{ color: scope.row.count >= 3 ? 'red' : '' }">
        {{ scope.row.country }}
      </div>

      </div>
    </template>
      </el-table-column>
      <el-table-column
        prop="count"
        label="重要性"
          align="center"
          >
          <template slot-scope="scope">
        <div >
         <img v-for="n in 5" :key="n" :src="n <= scope.row.count ? `/static/img/news/星星/${scope.row.color}.png` : '/static/img/news/星星/灰.png'" alt="星星" style="width: 0.08rem; height: 0.08rem;padding:0.01rem;">
        </div>
      </template>
      </el-table-column>
            <el-table-column
        prop="things"
        label="事件">
              <template slot-scope="scope">
      <div :style="{ color: scope.row.count >= 3 ? 'red' : '' }">
        {{ scope.row.things }}
      </div>
    </template>
      </el-table-column>

    </el-table>
        </div>
       </div>
            <div v-if="chang" class="sidenav" style="z-index:100;position:absolute;">
        <ul>
            <li><a href="#a" @click.prevent="anchor('a')" style="text-decoration: none;border-bottom: 1px solid #edf1f9;" @click="scrollToTop"><span class="bg"></span><span>经济数据</span></a></li>
            <li><a href="#b" @click.prevent="anchor('b')" style="text-decoration: none;"><span class="bg"></span><span>事件数据</span></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      value1: false,
      value2: false,
      chang: false,
      // 本周日历信息
      weekList: [
        { id: 1, wkName: '周一', dateName: '03/18' },
        { id: 2, wkName: '周二', dateName: '03/19' },
        { id: 3, wkName: '周三', dateName: '03/20' },
        { id: 4, wkName: '周四', dateName: '03/21' },
        { id: 5, wkName: '周五', dateName: '03/22' },
        { id: 6, wkName: '周六', dateName: '03/23' },
        { id: 7, wkName: '周日', dateName: '03/24' }
      ],
      // lastWeekList: [],
      // nextWeekList: [],
      ecoTable: [],
      eventTable: [],
      selectedName: this.$store.getters.date,
      canGoNext: true, // 控制是否可以点击下周按钮
      canGoPre: true, // 控制是否可以点击上周按钮
      selectedWkName: this.$store.getters.weekDay,
      viewedWeeks: 1,
      baseUrl: 'economyNews/getEconomyNews',
      baseUrl2: 'eventNews/getEventNews'

    }
  },
  watch: {
    ecoTable (newValue) {
      if (newValue && newValue.length > 8) {
        this.chang = true
      } else {
        this.chang = false
      }
    }
  },
  computed: {
    ecoUrl: {
      get () {
        return this.baseUrl + '/' + this.selectedWkName + ' ' + this.selectedName
      },
      set (value) {
        this.selectedWkName = value[0]
        this.selectedName = value[1]
      }
    },
    eventUrl: {
      get () {
        return this.baseUrl2 + '/' + this.selectedWkName + ' ' + this.selectedName
      },
      set (value) {
        this.selectedWkName = value[0]
        this.selectedName = value[1]
      }

    },
    selectedItem () {
      const formattedDate = this.$store.state.nowDate.substring(5).replace(/-/g, '/') // 从索引为5开始截取，并将 "-" 替换为 "/"
      console.log(formattedDate) // 输出 "05/12"
      return formattedDate
    }

  },
  created () {
    this.getEvent()
    this.getEco()
    this.selectedId = this.findName()
    console.log(this.ecoUrl)
  },
  mounted () {

  },
  methods: {
    anchor (anchorName) {
    /* 找到锚点 */
      const anchorElement = document.getElementById(anchorName)
      /* 如果对应id的锚点存在，就跳转到锚点 */
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    },
    scrollToTop () {
      const parent = document.querySelector('.wrap')
      parent.scrollTop = 0
    },
    active (dateName, wkName) {
      this.selectedName = dateName
      const str = [wkName, dateName]
      this.ecoUrl = str
      this.eventUrl = str
      this.getEco()
      this.getEvent()
    },
    backNow () {
      this.selectedName = this.$store.getters.date
      this.active(this.$store.getters.date, this.$store.getters.weekDay)
      this.findName()
    },
    pre () {
      if (this.canGoPre && this.viewedWeeks > 0) {
      // 执行上周操作
        this.canGoNext = true
        this.weekList = this.updateLast()
        this.viewedWeeks--
        if (this.viewedWeeks === 0) {
        // 如果已经回到第一周，将canGoPre设置为false，无法再点击上周按钮
          this.canGoPre = false
        }
        // 重置canGoNext，确保连续点击两次下周按钮时，可以再次点击上周按钮
        this.canGoNext = true
      }
    },
    next () {
      if (this.canGoNext && this.viewedWeeks < 2) {
      // 执行下周操作
        this.canGoPre = true
        this.weekList = this.updateNext()
        this.viewedWeeks++
        if (this.viewedWeeks === 2) {
        // 如果已经查看了两周，将canGoNext设置为false，无法再点击下周按钮
          this.canGoNext = false
        }
        // 重置canGoPre，确保连续点击两次上周按钮时，可以再次点击下周按钮
        this.canGoPre = true
      }
    },
    findName () {
      const item = this.weekList.find(item => item.wkName === this.selectedWkName)
      item.dateName = this.$store.getters.date
      this.updateDate()
      return item ? item.id : null
    },
    updateDate () {
      const one = this.weekList.find(item => item.wkName === this.selectedWkName)
      // 更新selected前面的
      for (let i = 0; i < one.id - 1; i++) {
        // console.log(this.weekList[i].dateName)
        const baseDate = this.weekList[one.id - 1].dateName.split('/') // 选中日期的前一天
        const newDay = parseInt(baseDate[1], 10) - (one.id - 1 - i)
        const newDate = `${baseDate[0]}/${newDay < 10 ? '0' + newDay : newDay}` // 递减日期
        this.weekList[i].dateName = newDate
      }
      // 更新selected后面的
      for (let i = one.id; i < this.weekList.length; i++) {
        // console.log(this.weekList[i].dateName)
        const baseDate = this.weekList[one.id - 1].dateName.split('/') // 选中日期
        const newDay = parseInt(baseDate[1], 10) + (i - one.id + 1)
        const newDate = `${baseDate[0]}/${newDay < 10 ? '0' + newDay : newDay}` // 递增日期
        this.weekList[i].dateName = newDate
      }
      this.updateLast()
      this.updateNext()
    },
    updateLast () {
      const lastWeekList = []
      for (let i = 0; i < this.weekList.length; i++) {
        const currentDate = this.weekList[i].dateName
        const [month, day] = currentDate.split('/').map(Number)
        const lastWeekDay = day - 7
        let lastMonth = month
        let lastDay = lastWeekDay
        if (lastWeekDay < 1) {
          lastMonth -= 1
          lastDay += 31 // 假设上个月有31天
        }
        lastWeekList.push({
          id: this.weekList[i].id,
          wkName: this.weekList[i].wkName,
          dateName: `${lastMonth.toString().padStart(2, '0')}/${lastDay.toString().padStart(2, '0')}`
        })
      }
      console.log(lastWeekList)
      // 返回上周的日历信息
      return lastWeekList
    },
    updateNext () {
      const nextWeekList = []
      for (let i = 0; i < this.weekList.length; i++) {
        const currentDate = this.weekList[i].dateName
        const [month, day] = currentDate.split('/').map(Number)
        const nextWeekDay = day + 7
        let nextMonth = month
        let nextDay = nextWeekDay
        // 假设每个月最多31天，超过31天则进入下个月
        if (nextWeekDay > 31) {
          nextMonth += 1
          nextDay -= 31
        }
        nextWeekList.push({
          id: this.weekList[i].id,
          wkName: this.weekList[i].wkName,
          dateName: `${nextMonth.toString().padStart(2, '0')}/${nextDay.toString().padStart(2, '0')}`
        })
      }
      console.log(nextWeekList)
      return nextWeekList
    },

    async getEco () {
      try {
        const res = await axios.get(this.ecoUrl)
        console.log(res.data.data)
        if (res.data.data !== null) {
          console.log(res.data.data)
          this.ecoTable = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getEvent () {
      try {
        const res = await axios.get(this.eventUrl)
        // console.log(res)
        if (res.data.data !== null) {
          console.log(res.data.data)
          this.eventTable = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    }

  },
  components: {

    NavBar

  }
}
</script>

<style lang="less" scoped>
.wrap{
    width:100%;
    overflow-y:scroll;
    background-color: #eceff7;
    .box{
      position:sticky;
      top:0;
      z-index:100;
    }

    .cal{
        width:95%;
        height:15vh;
        background-color: white;
        margin:0 auto;
        transform: translateY(5%);

        .title{
            width:97%;
            height:40%;
            margin:0 auto;
            display:flex;
            align-items: center;
            .el-button{
                margin-left:auto;
            }

        }
        .hr{
            border: none; /* 首先移除默认的边框样式 */
            border-top: 1px solid #f4f5f9; /* 设置上边框为灰色，可以根据需要调整粗细和颜色 */
        }
        .select{
            width:97%;
            height:40%;
            margin:0 auto;
            display:flex;
            align-items: center;

            .alter{
                width:0.6rem;
                height:0.3rem;

                box-sizing: border-box;
                padding:0.01rem;
                display:flex;
                justify-content: center;
                align-items: center;
                cursor:pointer;

                img{
                    width:0.2rem;
                    height:0.2rem;

                }
                div{
                    color:#756c6c;
                }
            }
            .last{
                border-right:1px solid #ccc;
            }
            .next{
                margin-left:auto;
                border-left:1px solid #ccc;
            }
            .week{

                width:8rem;
                height:0.4rem;
                ul{
                    width:8rem;
                    height:0.4rem;
                    display:flex;
                    list-style-type: none; /* 去掉小圆点 */
                    justify-content: space-evenly;
                    padding:0;
                    margin:0;
                    align-items: center;

                    li{
                        color:#756c6c;

                        width:1rem;
                        text-align: center;
                        height:0.3rem;
                        line-height:0.3rem;
                        border-radius: 10px;

                    }
                    li:hover{
                        color:white;
                        background-color: #4777f4;
                        cursor: pointer;
                    }

                }
            }
        }

    }
    .data{
        width:95%;
        // height:50vh;
        background-color: white;
        margin:0 auto;
        margin-top:0.1rem;

        .head{
            width:97%;

            margin:0 auto;
            padding-top:0.1rem;
            box-sizing: border-box;
            display:flex;
            h3{
                margin:0;
                padding:0;
                width:10%;
                height:4vh;
                margin-bottom:0.1rem;

            }

        }
        .table{
            width:97%;

            margin:0 auto;

        }
    }
    .event{
        width:95%;
        // height:100vh;
        background-color: white;
        margin:0 auto;
        margin-top:0.1rem;
        padding:0.13rem;
        box-sizing: border-box;
        h3{
            padding:0;
            margin:0;
            margin-bottom:0.1rem;
        }
        .evTable{
            width:97%;

            margin:0 auto;
        }
    }

}
.highlighted {
    background-color: #4777f4; /* 设置高亮样式，可以根据需要修改 */
    color:white!important;
}
ul, li {
    margin: 0;
    padding: 0;
}

.sidenav {
    position: relative;

    > ul {
        background: #ccc;
        position: fixed;
        top: 2rem;
        right: 0.2rem;
        width: 0.375rem; /* 将宽度减半 */

        > li {
            list-style: none;
            width: 0.3625rem; /* 将宽度减半 */
            height: 0.375rem; /* 将高度减半 */
            cursor: pointer;
            // background-color:red;

            > a {
                display: block;
                width: 0.175rem; /* 将宽度减半 */
                height: 0.2375rem; /* 将高度减半 */
                font-size: 0.0875rem; /* 根据比例调整字体大小 */
                padding: 0.0625rem 0.1rem; /* 根据比例调整内边距 */
                position: relative;

                > .bg {
                    position: absolute;
                    top: -0.008rem; /* 根据比例调整背景位置 */
                    bottom: 0.00625rem; /* 根据比例调整背景位置 */
                    left: 0;
                    right: 0;
                    background: #92a7ba;
                    z-index: 2;
                }

                &:hover > .bg {
                    background: #0094ff;
                }

                > img {
                    display: block;
                    width: 0.1125rem; /* 将图像宽度减半 */
                    height: 0.1rem; /* 将图像高度减半 */
                    margin: 0 auto;
                    position: relative;
                    z-index: 3;
                }

                > span:last-child {
                    position: relative;
                    z-index: 3;
                }
            }
        }
    }
}
</style>
