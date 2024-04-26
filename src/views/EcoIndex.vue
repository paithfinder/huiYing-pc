<template>
  <div class="wrap">
      <NavBar></NavBar>
      <div class="eco">

    <div class="topBox">
      <div class="title">
        <img src="/static/img/eco/图表-仪表盘.png" alt="" style="width:0.2rem;
          height:0.2rem;">
        <h3 style="margin:0">投机情绪指数</h3>
      </div>
      <img src="/static/img/eco/左箭头-.png" alt="" id="left"  @click="pre">
      <img src="/static/img/eco/右箭头.png" alt="" id="right" @click="next">
      <div class="pan" v-if="isNow">
        <EcoBox :name="panData[0].type" :duotou="panData[0].duoTou" :kongtou="panData[0].kongTou" ></EcoBox>
        <EcoBox :name="panData[1].type" :duotou="panData[1].duoTou" :kongtou="panData[1].kongTou" ></EcoBox>
        <EcoBox :name="panData[2].type" :duotou="panData[2].duoTou" :kongtou="panData[2].kongTou" ></EcoBox>
        <EcoBox :name="panData[3].type" :duotou="panData[3].duoTou" :kongtou="panData[3].kongTou" ></EcoBox>
        <EcoBox :name="panData[4].type" :duotou="panData[4].duoTou" :kongtou="panData[4].kongTou" ></EcoBox>
        <EcoBox :name="panData[5].type" :duotou="panData[5].duoTou" :kongtou="panData[5].kongTou" ></EcoBox>
      </div>
      <div class="pan" v-if="isNext">
        <EcoBox :name="panData[6].type" :duotou="panData[6].duoTou" :kongtou="panData[6].kongTou"></EcoBox>
        <EcoBox :name="panData[7].type" :duotou="panData[7].duoTou" :kongtou="panData[7].kongTou"></EcoBox>
        <EcoBox :name="panData[8].type" :duotou="panData[8].duoTou" :kongtou="panData[8].kongTou"></EcoBox>
        <EcoBox :name="panData[9].type" :duotou="panData[9].duoTou" :kongtou="panData[9].kongTou"></EcoBox>
        <EcoBox :name="panData[10].type" :duotou="panData[10].duoTou" :kongtou="panData[10].kongTou"></EcoBox>
        <EcoBox :name="panData[11].type" :duotou="panData[11].duoTou" :kongtou="panData[11].kongTou"></EcoBox>
      </div>
            <div class="pan" v-if="nn">
        <EcoBox :name="panData[7].type" :duotou="panData[7].duoTou" :kongtou="panData[7].kongTou"></EcoBox>
        <EcoBox :name="panData[8].type" :duotou="panData[8].duoTou" :kongtou="panData[8].kongTou"></EcoBox>
        <EcoBox :name="panData[9].type" :duotou="panData[9].duoTou" :kongtou="panData[9].kongTou"></EcoBox>
        <EcoBox :name="panData[10].type" :duotou="panData[10].duoTou" :kongtou="panData[10].kongTou"></EcoBox>
        <EcoBox :name="panData[11].type" :duotou="panData[11].duoTou" :kongtou="panData[11].kongTou"></EcoBox>
        <EcoBox :name="panData[12].type" :duotou="panData[12].duoTou" :kongtou="panData[12].kongTou"></EcoBox>
      </div>
    </div>
    <div class="ecoBox">
        <div class="bar">
          <img src="static/img/eco/chartcolumn.png" alt="">
          <h3>重要经济指标</h3>
           <div class="radio" >
            <ul>
                        <li  v-for="(item) in radioList" :key="item.id" @click="active(item.id)"  :class="{ 'highlighted': item.id === selectedId }">
                            {{ item.name }}
                        </li>

                    </ul>

          </div>
            <span style="margin-left:auto;cursor:pointer" v-show="selectedId === 2 || selectedId=== 3 ? true :false"><button style="background-color: #5a70c4;color:white;border:0" @click="goNext">详情</button></span>
           </div>

        <div class="ecoChart">
          <!-- 各国央行 -->
          <div class="table" v-if="tab">
            <el-table
    :data="tableData"

    border
    style="width: 100%">
    <el-table-column
      prop="type"
      label="央行"
      width="180"
        align="center">
    </el-table-column>
    <el-table-column
      prop="xinLv"
      label="现行利率"
      width="180"
        align="center">
    </el-table-column>
    <el-table-column
      prop="xiaCi"
      label="下次会议"
        align="center">
    </el-table-column>
       <el-table-column
      prop="shangCi"
      label="上次修改"
        align="center">
    </el-table-column>
       <el-table-column
      prop="quShi"
      label="趋势"
        align="center">
    </el-table-column>
  </el-table>
          </div>
          <!-- 非农业就业人口 -->
          <div class="jiuye" v-if="jiuye">

            <ZhuEco></ZhuEco>
          </div>
          <!-- 美国GDP -->
          <div class="gdp" v-if="gdp">
            <GdP></GdP>
          </div>
        </div>
    </div>
      </div>

  </div>
</template>

<script>
import EcoBox from '@/components/EcoBox.vue'
import ZhuEco from '@/components/ZhuEco.vue'
import GdP from '@/components/GdP.vue'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
  data () {
    return {
      isNow: true,
      isNext: false,
      nn: false,
      nextCount: 0,
      preCount: 0,
      selectedId: 1,
      panData: [
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        },
        {
          id: 0,
          type: '澳元/日元',
          duoTou: '43.81',
          kongTou: '56.19'
        }
      ],
      tab: true,
      jiuye: false,
      gdp: false,
      radioList: [
        { id: 1, name: '各国央行' },
        { id: 2, name: '非农业就业人口' },
        { id: 3, name: '美国GDP' }

      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mounted () {
    this.getPan()
    this.getBank()
  },
  methods: {
    next () {
      this.isNow = false
      this.nextCount += 1
      if (this.nextCount === 1) {
        this.isNext = true
      } else if (this.nextCount === 2) {
        this.isNext = false
        this.nn = true
      } else {
        this.nextCount = 2
      }
    },
    pre () {
      this.preCount += 1
      if (this.nextCount === 1 && this.preCount === 1) {
        this.isNext = false
        this.isNow = true
      }
      if (this.nextCount === 2 && this.preCount === 1) {
        this.nn = false
        this.isNext = true
      }
      if (this.nextCount === 2 && this.preCount === 2) {
        this.nn = false
        this.isNext = false
        this.isNow = true
      }
      if (this.isNow) {
        this.nextCount = 0
        this.preCount = 0
      }
    },
    active (id) {
      // console.log(id)
      this.selectedId = id
    },
    goNext () {
      if (this.selectedId === 2) {
        this.$router.push('/agri')
      } else if (this.selectedId === 3) {
        this.$router.push('/gdp')
      }
    },
    async getPan () {
      try {
        const res = await axios.get('/KongDuo/getKongDuo')
        if (res.data !== null) {
          console.log(res.data.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.panData = res.data.data
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getBank () {
      try {
        const res = await axios.get('/Banks/getBanks')
        if (res.data !== null) {
          console.log(res.data.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.tableData = res.data.data
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    selectedId (newValue) {
      if (newValue === 1) {
        this.tab = true
        this.jiuye = false
        this.gdp = false
      } else if (newValue === 2) {
        this.tab = false
        this.jiuye = true
        this.gdp = false
      } else if (newValue === 3) {
        this.tab = false
        this.jiuye = false
        this.gdp = true
      }
    }
  },
  components: {
    EcoBox,
    ZhuEco,
    GdP,
    NavBar
  }

}
</script>

<style scoped lang="less">
.wrap{
  width:100%;
  overflow-y: scroll;
  background-color: #eceff7;
      position: relative;
      .box{
        position:sticky;
        top:0;
        z-index:100;
      }
      .eco{
        overflow-y:scroll;
          .topBox{
    height:1.5rem;

    transform: translateY(10%);
    .title{

      display:flex;
      align-items: center;
      h3{
        transform:translateX(0.55rem;)
      }
      img{
        transform:translateX(0.52rem;)
      }
    }
    .pan{
      width:100%;
      margin:0 auto;
    display:flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    transform: scale(0.9);

    }

  }
   #left{
      position: absolute;
      top:47%;
      left:1.5%;
      z-index: 2;
      height:0.2rem;
      cursor:pointer
    }
    #right{
      position: absolute;
      top:47%;
      right:1.5%;
      z-index: 2;
      height:0.2rem;
      cursor:pointer
    }
    .ecoBox{

      width:90%;

      margin:0 auto;
           margin-top:0.2rem;

      .bar{
        width:100%;
        height:0.3rem;

        display:flex;
        align-items: center;
        img{
          width:0.2rem;
          height:0.2rem;
        }
        h3{
          margin:0;
          margin-left:0.03rem;
        }
        .radio{
                  width:80%;
        height:0.3rem;

        display:flex;
        align-items: center;
        ul{

          padding:0;
          list-style-type:none;
          display:flex;
          width:2rem;
          margin-left:0.2rem;
          justify-content: space-around;

          li{
            width:0.8rem;
            text-align: center;
            border-radius:0.06rem;

          }
          li:hover{
            cursor:pointer;
          }
          li:first-child{
            width:0.5rem;
          }
            li:last-child{
            width:0.5rem;
          }

        }
        .select-box {
            border-radius:0.05rem;
            padding: 10px;
            margin: 10px;
        }
        .select-box:hover{
          background-color: #5c72c8;
          color:#fff;
        }
        .select-box label {
            cursor: pointer;
            font-size: 16px;
        }
        .select-box input[type="radio"] {
            display: none;
        }
        }

      }
    }
    .ecoChart{

      .jiuye{
        width:100%;
        height:80vh;

      }
      .gdp{
        width:100%;
        height:80vh;

      }

    }
      }

}
.highlighted {
    background-color: #5c72c8; /* 设置高亮样式，可以根据需要修改 */
    color:white!important;
}
</style>
