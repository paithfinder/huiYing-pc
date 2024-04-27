<template>
  <div class="wrap">
          <video autoplay loop muted poster="static/img/home/homebg.mp4" id="bgmp" >
        <source src="static/img/home/homebg.mp4" type="video/mp4">
    </video>
    <NavBar id="b"></NavBar>
    <div class="view">
      <div class="top" >
        <div class="table" >
          <div class="text">
            <!-- 左边时间 -->
            <div class="time" style="color:#fff">
              最后更新时间:{{  nowTime }}
            </div>
            <!-- 中间标题 -->
            <h3 style="transform:translateX(-0.6rem);color:#fff">外汇实时波动监控</h3>
            <!-- 右边图标切换 -->
            <div style="display: flex;align-items: center;">
              <!-- <div style="color:red;font-size:0.09rem;font-weight: bold;">切换</div> -->
              <!-- <img src="/static/img/rate/切换.png" alt="" class="change" @click="shift" style="margin-left:0.05rem;"> -->
            </div>
          </div>
          <!-- 表格 -->
          <table
          border="1px" width="100%" height="90%" cellspacing="0"  border-color="#d4d6da"  style="border-collapse:collapse;  table-layout: fixed;">
            <thead >
              <tr >
                <th>货币</th>
                <th>1分钟</th>
                <th>5分钟</th>
                <th>15分钟</th>
                <th>30分钟</th>
                <th>1小时</th>
                <th>4小时</th>
                <th>1天</th>
                <th>1周</th>
                <th>半个月</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in moneyTable" :key="index" style="text-align: center;">
                <td ><div style="font-weight: bold;">{{ item.eng }}</div><div style="font-size:.08rem;">{{ item.chinese }}</div></td>
                <td :class="item.oneMinuteS > 0 ? 'red-cell' : (item.oneMinuteS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.oneMinuteS }}</div><div style="font-size:.08rem;">({{ item.oneMinuteC }})</div></td>
                <td :class="item.fiveMinuteS>0 ? 'red-cell':(item.fiveMinuteS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.fiveMinuteS }}</div><div style="font-size:.08rem;">({{ item.fiveMinuteC }})</div></td>
                <td :class="item.fifteenMinuteS>0 ? 'red-cell':(item.fifteenMinuteS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.fifteenMinuteS }}</div><div style="font-size:.08rem;">({{ item.fifteenMinuteC }})</div></td>
                <td :class="item.thirtyMinuteS>0 ? 'red-cell':(item.thirtyMinuteS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.thirtyMinuteS }}</div><div style="font-size:.08rem;">({{ item.thirtyMinuteC }})</div></td>
                <td :class="item.oneHourS>0 ? 'red-cell':(item.oneHourS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.oneHourS }}</div><div style="font-size:.08rem;">({{ item.oneHourC }})</div></td>
                <td :class="item.fourHourS>0 ? 'red-cell':(item.fourHourS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.fourHourS }}</div><div style="font-size:.08rem;">({{ item.fourHourC }})</div></td>
                                <td :class="item.oneDayS>0 ? 'red-cell':(item.oneDayS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.oneDayS }}</div><div style="font-size:.08rem;">({{ item.oneDayC }})</div></td>
                <td :class="item.oneWeekS>0 ? 'red-cell':(item.oneWeekS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.oneWeekS }}</div><div style="font-size:.08rem;">({{ item.oneWeekC }})</div></td>
                <td :class="item.oneMonthS>0 ? 'red-cell':(item.oneMonthS < 0 ? 'green-cell' : '')"><div style="font-weight: bold;">{{ item.oneMonthS }}</div><div style="font-size:.08rem;">({{ item.oneMonthC}})</div></td>

              </tr>
            </tbody>
          </table>
          <!-- 世界地图 -->
          <!-- <WorldMap v-else ></WorldMap> -->
        </div>
      </div>
      <div class="but" id="a">
          <div class="left" v-show="unfold">
            <div class="top" >
                 <el-table
    :data="coinData"
    height="100%"
    border
    style="width: 100%;border-radius:0.1rem;"
     @row-click="handleRowClick"
  :row-style="enableRowStyle ? rowStyle : null">
    <el-table-column
      prop="symbol"
      label="代码/名称"
      width="110"
      align="center">
      <template slot-scope="scope">
      <div style="text-align: center;font-weight:bold">
        {{ scope.row.symbols }}
      </div>
      <div style="text-align: center!important;font-size:0.07rem;">
        {{ scope.row.chinese }}
      </div>
    </template>
    </el-table-column>
    <el-table-column
      prop="newPrice"
      label="最新价"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="oneMinSpread"
      label="涨跌幅"
      align="center">
      <template slot-scope="scope">
      <div style="text-align: center;">
        {{ scope.row.oneMinSpread }}
      </div>
      <div style="text-align: center!important;font-size:0.07rem;font-weight:bold">(
        {{ scope.row.oneMinChange }})
      </div>
    </template>
    </el-table-column>

    </el-table>
            </div>
            <div class="bottom" >
                <el-descriptions title="盘口数据" style="font-size: 10px;color:#fff" >
                    <el-descriptions-item label="今开" >{{  capData.openToday }}</el-descriptions-item>
                    <el-descriptions-item label="最高" contentStyle="color:red;">{{ capData?.highToday }}</el-descriptions-item>
                    <el-descriptions-item label="最大交易量">{{ capData?.tickVolMax }}</el-descriptions-item>
                    <el-descriptions-item label="昨收">{{ capData?.closeYesterday }}</el-descriptions-item>
                    <el-descriptions-item label="最低">{{ capData?.lowToday }}</el-descriptions-item>
                    <el-descriptions-item label="最大点差">{{ capData?.spreadMax }}</el-descriptions-item>
</el-descriptions>

            </div>
        </div>
        <div class="right">
            <div class="chartWrap">
                <div class="chartHead">
                    <div class="one">
                        <h3 >{{ selectedSymbol }} </h3>
                        <div>{{ selectedPrice }}-{{ selectedSpread }}-{{ selectedChange }}</div>
                    </div>
                    <div class="two" style="display:flex;align-items: center;">
                        <div >{{ selectedChinese }}</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div style="color:red;transform:translate(5.5rem,0.1rem);font-weight:bold ">{{  state }} </div>
                    </div>
                    <div class="three">
                        <img v-show="unfold" src="/static/img/rate/折叠.png" alt="" @click="left" >
                        <img  v-show="fold" src="/static/img/rate/展开.png" alt="" @click="right" >
                         <div style="margin-left:0.2rem;">

      <el-radio-group v-model="radio" size="small" >
      <el-radio-button label="近24h" ></el-radio-button>
      <el-radio-button label="近一周"></el-radio-button>
      <el-radio-button label="半个月"></el-radio-button>
      <el-radio-button label="一个月"></el-radio-button>
    </el-radio-group>

  </div>
                    </div>
                </div>
                <div class="chartContent">
                    <RateCh :kData="kData" :state="state" @state="getState" :radio="radio" :selectedSymbol="selectedSymbol"></RateCh>
                </div>
            </div>

        </div>
      </div>

    </div>
     <div class="sidenav" style="z-index:100;position:absolute;">
        <ul>
            <li style="border-bottom: 1px solid #edf1f9;"><a href="#b" @click.prevent="anchor('b')" style="text-decoration: none;" @click="scrollToTop"><span class="bg"></span><span>外汇异动</span></a></li>
            <li><a href="#a" @click.prevent="anchor('a')" style="text-decoration: none;"><span class="bg"></span><span>细节分析</span></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import WorldMap from '@/components/WorldMap'
import RateCh from '@/components/RateCh.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    RateCh,
    // WorldMap,
    NavBar

  },

  data () {
    return {
      nowTime: '',
      coinData: [],
      kData: [],
      mapData: [],
      state: '交易中',
      enableRowStyle: true,
      capData: {
        openToday: '-',
        highToday: '-',
        lowToday: '-',
        closeYesterday: '-',
        spreadMax: '-',
        tickVolMax: '-'

      },
      radio: '近24h',
      baseUrl: 'currencyExchangeCharts/getCurrencyExchangeChartsData/',
      kUrl: '/currencyExchangeCharts/getCurrencyExchangeChartsData/EURAUD/noTime/近24h',
      defaultCoin: 'EURAUD',
      selectedSymbol: 'EURAUD',
      selectedChinese: '欧元/澳元',
      selectedPrice: '1.64353',
      selectedSpread: '1.1',
      selectedChange: '0.01%',
      tabShow: true,
      unfold: true,
      fold: false,
      tableData: [{
        symbols: '0',
        name: '1.1377',
        chinese: '阿爸阿爸·',
        address: '⬆0.3100%'
      }, {
        symbols: '1',
        name: '1.1377',
        chinese: '阿爸阿爸·',
        address: '⬆0.3100%'
      }, {
        symbols: '2',
        name: '1.1377',
        chinese: '阿爸阿爸·',
        address: '⬆0.3100%'
      }, {
        symbols: '3',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        symbols: '英',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        symbols: '4',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        symbols: '5',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        symbols: '6',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        symbols: '7',
        chinese: '阿爸阿爸·',
        name: '1.1377',
        address: '⬆0.3100%'
      }],
      moneyTable: [
        { symbol: 'EURAUD', chinese_name: '欧元/澳元' },
        { symbol: 'EURUSD', chinese_name: '欧元/美元' },
        { symbol: 'GBPCHF', chinese_name: '英镑/瑞士法郎' },
        { symbol: 'GBPJPY', chinese_name: '英镑/日元' },
        { symbol: 'GBPUSD', chinese_name: '英镑/美元' },
        { symbol: 'USDCAD', chinese_name: '美元/加元' },
        { symbol: 'USDCHF', chinese_name: '美元/瑞士法郎' },
        { symbol: 'USDJPY', chinese_name: '美元/日元' }
      ]
    }
  },
  computed: {
    panUrl: {
      get () {
        return '/handicapData/getHandicapData/' + this.defaultCoin
      },
      set (value) {
        this.defaultCoin = value
      }
    }

  },
  watch: {
    selectedSymbol (newValue) {
      const item = this.coinData.find(item => item.symbols === newValue)
      this.selectedChinese = item.chinese
    }
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
    left () {
      this.unfold = false
      this.fold = true
    },
    right () {
      this.unfold = true
      this.fold = false
    },
    shift () {
      this.tabShow = !this.tabShow
    },
    rowStyle ({ row, rowIndex }) {
    // 根据 isFirstRow 属性决定第一行的样式
      if (row.rowStyle) {
        return { backgroundColor: 'red' } // 第一行红色背景，白色字体
      } else {
        return {} // 其他行无特殊样式
      }
    },
    handleRowClick (row, event, column) {
      // console.log('我点击了', row.symbols)
      this.selectedSymbol = row.symbols
      this.selectedPrice = row.newPrice
      this.selectedSpread = row.oneMinSpread
      this.selectedChange = row.oneMinChange
      this.enableRowStyle = false
      this.panUrl = row.symbols
      this.getCap()
    },

    getNowTime (time) {
      const hh = new Date(time).getHours() < 10 ? '0' + new Date(time).getHours() : new Date(time).getHours()
      const mm = new Date(time).getMinutes() < 10 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes()
      const ss = new Date(time).getSeconds() < 10 ? '0' + new Date(time).getSeconds() : new Date(time).getSeco()
      const nowTime = hh + ':' + mm + ':' + ss
      return nowTime
    },
    // 上方的表
    async getTable () {
      try {
        const res = await axios.get('/jinChart/getJinChart')
        console.log(res.data)
        console.log('aababb')
        if (res.data.data !== null) {
          // console.log(res.data)
          this.moneyTable = res.data.data
          this.nowTime = res.data.time
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 左上角表
    async getCoin () {
      try {
        const res = await axios.get('/currencyExchangeForms/getCurrencyExchangeFormsData')
        // console.log(res)
        if (res.data !== null) {
          res.data[0].rowStyle = { isFirstRow: true }
          console.log(res.data)
          this.coinData = res.data
          this.selectedChinese = res.data[0].chinese
          this.selectedPrice = res.data[0].newPrice
          this.selectedSpread = res.data[0].oneMinSpread
          this.selectedChange = res.data[0].oneMinChange
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 盘口数据
    async getCap () {
      try {
        const res = await axios.get(this.panUrl)
        console.log(res.data)
        if (res.data.data !== null) {
          // console.log(res.data.data)
          this.capData = res.data.data
          console.log(this.capData)
          console.log(this.capData.openToday)
        }
      } catch (error) {
        console.log(error)
      }
    },
    getState (state) {
      this.state = state
    }
  },
  mounted () {
    this.getTable()
    this.getCoin()
  },
  created () {
    this.getCap()
  }
}
</script>

<style lang="less" scoped>
#app{
  background-color:#eceff7;
  .wrap{
    width:100%;
    overflow-y:scroll;
    background-color:#eceff7;
    #bgmp{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    }
    .box{
      position:sticky;
      top:0;
      z-index:100;
    }
    .view{
    width:100%;
    .top{
      width:100%;
      height:95vh;
      background-color:rgba(71, 100, 157,0.5);
      cursor: pointer;
      .table{
        width:98%;
        height:90%;
        background-color:rgba(71, 100, 157,0.5);
        margin:0 auto;
        transform:translateY(2%);
        box-sizing: border-box;
        padding:0.07rem;

        table{
          tr:nth-child(odd) {
             background-color: rgba(255,255,255,0.5);
          }
          tr:nth-child(even) {
             background-color: rgba(255,255,255,0.5);
          }
        }
        .text{
          display:flex;
          justify-content: space-between;
          align-items: center;
          width:100%;
          height:0.2rem;
          margin-bottom:0.1rem;

          h3{
            padding:0;
            margin:0;
          }
          img{
            width:0.15rem;
            height:0.15rem;
          }

        }

      }
    }
    .but{
      display:flex;
      width:100%;
      height:100vh;
      background-color:transparent ;

       .left{
        flex:2;
        height:91%;
        box-sizing: border-box;

        .top{
            width:90%;
            height:80%;
            background-color:#25447e;
            margin:0 auto;
            border-radius:0.1rem;

        }
        .bottom{
            height:16%;
            width:19.5%;
            background-color: rgba(28, 62, 121);
            margin:0 auto;
            margin-top:0.1rem;
            margin-left:0.1rem;
            border-radius:0.1rem;
            padding:0.1rem;
            box-sizing:border-box;
            overflow:hidden;
            position:absolute;
            z-index: 3;
        }
    }
    .right{
        flex:7;
        border-radius:0.1rem;
        box-sizing:border-box;
        padding:0.2rem;
        height:91%;
        z-index:5;
        //    background: url(/public/static/img/rate/背景.png) no-repeat;
        // background-size: cover;
        background-color: #fff;
        .chartWrap{
            width:95%;
            margin:0 auto;

            .chartHead{
                .one{
                    display:flex;
                    align-items: center;
                    h3{
                        padding:0;
                        margin:0;
                    }
                    div{
                        margin-left:0.1rem;
                        color:aqua;
                    }
                }
                .two{
                    margin-top:0.02rem;
                    color:grey;
                }
                .three{
                    width:100%;
                    display:flex;
                    align-items: center;
                     margin-top:0.06rem;
                    img{
                        width:0.2rem;
                        height:0.2rem;
                        margin-left:-0.02rem;
                        cursor: pointer;
                    }

                }
            }
            .chartContent{
                width:100%;
                height:65vh;

                .wrap{
                  overflow:hidden;
                  background-color: transparent;
                }
            }

        }

    }

    }
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

}
}
.red-cell{
  background-color:rgb(210, 116, 116)
}
.green-cell{
  background-color:rgb(83, 229, 88)
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
