<template>
  <div class="container">
    <div class="view">
      <div class="top" >
        <div class="table" >
          <div class="text">
            <!-- 左边时间 -->
            <div class="time">
              最后更新时间:2024-4-4
            </div>
            <!-- 中间标题 -->
            <h3>外汇实时波动监控</h3>
            <!-- 右边图标切换 -->
            <div style="display: flex;align-items: center;">
              <div style="color:red;font-size:0.09rem;font-weight: bold;">切换</div>
              <img src="/static/img/rate/切换.png" alt="" class="change" @click="shift" style="margin-left:0.05rem;">
            </div>
          </div>
          <!-- 表格 -->
          <table v-if="tabShow"
          border="1px" width="100%" height="90%" cellspacing="0" color="#55647e" border-color="#d4d6da" style="border-collapse:collapse;  table-layout: fixed;">
            <thead style="color:#504c57;">
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
          <WorldMap v-else ></WorldMap>
        </div>
      </div>
      <div class="but" id="a">
          <div class="left" v-show="unfold">
            <div class="top">
                 <el-table
    :data="tableData"
    height="100%"
    border
    highlight-current-row
    style="width: 100%"
     @row-click="handleRowClick">
    <el-table-column
      prop="symbol"
      label="代码/名称"
      width="120">
      <template slot-scope="scope">
      <div style="text-align: center;">
        {{ scope.row.symbols }}
      </div>
      <div style="text-align: center!important">
        {{ scope.row.chinese }}
      </div>
    </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="最新价"
      width="70">
    </el-table-column>
    <el-table-column
      prop="address"
      label="涨跌幅">
    </el-table-column>

    </el-table>
            </div>
            <div class="bottom">
                <el-descriptions title="盘口数据" style="font-size: 10px;" >
    <el-descriptions-item label="今开">1.2786</el-descriptions-item>
    <el-descriptions-item label="最高" contentStyle="color:red;">1.2804</el-descriptions-item>
    <el-descriptions-item label="买入价">1.2661</el-descriptions-item>
    <el-descriptions-item label="昨收">1.2744</el-descriptions-item>
    <el-descriptions-item label="最低">1.2442</el-descriptions-item>
    <el-descriptions-item label="卖出价">1.2744</el-descriptions-item>
</el-descriptions>

            </div>
        </div>
        <div class="right">
            <div class="chartWrap">
                <div class="chartHead">
                    <div class="one">
                        <h3>GBP/CHF </h3>
                        <div>1.266200-0.10124-0.9700%</div>
                    </div>
                    <div class="two">
                        <span>英镑兑瑞士法郎</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>交易中 </span>
                    </div>
                    <div class="three">
                        <img v-show="unfold" src="/static/img/rate/折叠.png" alt="" @click="left" >
                        <img  v-show="fold" src="/static/img/rate/展开.png" alt="" @click="right" >
                         <div style="margin-left:0.2rem;">

      <el-radio-group v-model="radio" size="small" >
      <el-radio-button label="近一周" ></el-radio-button>
      <el-radio-button label="半个月"></el-radio-button>
      <el-radio-button label="一个月"></el-radio-button>
      <el-radio-button label="两个月"></el-radio-button>
    </el-radio-group>

  </div>
                    </div>
                </div>
                <div class="chartContent">
                    <RateCh></RateCh>
                </div>
            </div>

        </div>
      </div>

    </div>
     <div class="sidenav" style="z-index:100;position:absolute;">
        <ul>
            <li style="border-bottom: 1px solid #edf1f9;"><a href="#" style="text-decoration: none;"><span class="bg"></span><span>外汇异动</span></a></li>
            <li><a href="#a" style="text-decoration: none;"><span class="bg"></span><span>细节分析</span></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import WorldMap from '@/components/WorldMap'
import RateCh from '@/components/RateCh.vue'

export default {
  components: {
    RateCh,
    WorldMap

  },

  data () {
    return {
      coinData: [],
      baseUrl: 'currencyExchangeCharts/getCurrencyExchangeChartsData/',
      coinUrl: '',
      defaultParam: '/noTime',
      selecedSymbol: '',
      tabShow: true,
      radio: '分时',
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
  methods: {

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
    handleRowClick (row, event, column) {
      // console.log('我点击了', row.symbols)
      this.selectedSymbol = row.symbols
      console.log(this.selectedSymbol)
    },
    async getTable () {
      try {
        const res = await axios.get('/jinChart/getJinChart')
        console.log(res.data)
        if (res.data !== null) {
          console.log(res.data)
          this.moneyTable = res.data
        }
      } catch (error) {
        console.log(error)
      }
    }
    // async getCoin () {
    //   try {
    //     const res = await axios.get('/currencyExchangeForms/getCurrencyExchangeFormsData')
    //     // console.log(res)
    //     if (res.data.data !== null) {
    //       this.coinData = res.data.data
    //       console.log(this.coinData)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
  mounted () {
    this.getTable()
    // this.getCoin()
  },
  created () {
    if (!localStorage.getItem('visited')) {
      localStorage.setItem('visited', 'true')
      // 用户是第一次访问
      this.coinUrl = this.baseUrl + this.selectedSymbol + this.defaultSymbol
      this.getCoin()
    } else {
    // 用户不是第一次访问
      this.coinUrl = this.baseUrl + this.selectedSymbol
    }
  }
}
</script>

<style lang="less" scoped>
#app{
  background-color:#eceff7;
  .container{
    width:100%;
    background-color:#eceff7;
    .view{
    width:100%;
    height:100vh;
    .top{
      width:100%;
      height:95vh;
      background-color:#eceff7;
      cursor: pointer;
      .table{
        width:98%;
        height:90%;
        background-color:#fff;
        margin:0 auto;
        transform:translateY(2%);
        box-sizing: border-box;
        padding:0.07rem;

        table{
          tr:nth-child(odd) {
  background-color: #edf1f9;
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
      height:90vh;
      background-color:#eceff7;

       .left{
        flex:2;
        box-sizing: border-box;
        .top{
            width:90%;
            height:70%;
            background-color: #fff;
            margin:0 auto;
            border-radius:0.1rem;
        }
        .bottom{
            height:20%;
            width:90%;
            background-color: #fff;
            margin:0 auto;
            margin-top:0.06rem;
            border-radius:0.1rem;
            padding:0.1rem;
            box-sizing:border-box;
            overflow:hidden;
        }
    }
    .right{
        flex:7;
        background-color:#fff;
        border-radius:0.1rem;
        box-sizing:border-box;
        padding:0.2rem;
        height:91%;
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
        background: #92a7ba;
        position: fixed;
        top: 2rem;
        right: 0.2rem;
        width: 0.375rem; /* 将宽度减半 */

        > li {
            list-style: none;
            width: 0.3625rem; /* 将宽度减半 */
            height: 0.375rem; /* 将高度减半 */
            cursor: pointer;

            > a {
                display: block;
                width: 0.175rem; /* 将宽度减半 */
                height: 0.2375rem; /* 将高度减半 */
                font-size: 0.0875rem; /* 根据比例调整字体大小 */
                padding: 0.0625rem 0.1rem; /* 根据比例调整内边距 */
                position: relative;

                > .bg {
                    position: absolute;
                    top: -0.00625rem; /* 根据比例调整背景位置 */
                    bottom: 0.00625rem; /* 根据比例调整背景位置 */
                    left: 0;
                    right: 0;
                    background: transparent;
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
  background-color:#f17f7f
}
.green-cell{
  background-color:#8fc291
}
</style>
