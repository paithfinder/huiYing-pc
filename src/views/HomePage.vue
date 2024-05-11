<template>
  <div class="wrap">
      <video autoplay loop muted poster="static/img/home/homebg.mp4" id="bgmp" >
        <source src="static/img/home/homebg.mp4" type="video/mp4">
    </video>
      <NavBar></NavBar>
    <section class="main">
      <div class="column">
        <div class="panel date">
            <div class="big">
              <h2>近期交易</h2>
              <el-tooltip class="item" effect="light" content="反映了单个信号源在近几个月的交易情况
           " placement="right" >
                   <i class="el-icon-question" style="color:#00bed0;margin-left:-0.16rem;transform:translateX(-0.55rem) scale(1.2);margin-top:0.03rem;"></i>
            </el-tooltip>
                    <div class="menu" style="width:0.6rem;height:0.15rem;transform: translateX(-32%);">
                             <el-dropdown @command="handleRili" style="height:0.1rem;cursor: pointer;width:1rem;text-align: center">
  <span class="el-dropdown-link" style="font-size:0.08rem;color:aqua">
    {{ valueRili }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="item in itemList" :key="item.id" :command="item" style="height:0.2rem;">{{ item.name }}</el-dropdown-item>

  </el-dropdown-menu>
                    </el-dropdown>
                </div>
              <!-- <i class="el-icon-full-screen" @click="expand(1)"></i> -->
            </div>
         <div class="chart">
            <TraDa :valueRili="valueRili"></TraDa>

          </div>
        </div>
           <div class="panel win">
            <div class="big">
                <h2>盈利占比</h2>
                <el-tooltip class="item" effect="light" content="反映了所有信号源盈利交易占总交易的比例" placement="right">
                   <i class="el-icon-question" style="color:#00bed0;margin-left:-0.2rem;transform: scale(1.2);margin-top:0.02rem;"></i>
            </el-tooltip>
                <div class="menu" style="width:0.6rem;height:0.15rem;transform: translateX(30%);">
                             <el-dropdown @command="handleDate" style="height:0.1rem;">
  <span class="el-dropdown-link" style="font-size:0.08rem;color:aqua">
    {{ valueWin }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="item in date" :key="item.id" :command="item" style="height:0.2rem;">{{ item.value }}</el-dropdown-item>

  </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- <i class="el-icon-full-screen" @click="expand(2)"></i> -->

            </div>
          <div class="chart">
            <WinR :valueWin="valueWin"></WinR>
          </div>
        </div>
      </div>
      <div class="column">
           <div class="panel map">
                <div class="big">

                </div>
                <div class="textBox">

                  <el-dropdown @command="handleCommand" v-if="single">
  <span class="el-dropdown-link" style="font-size:0.1rem">
    {{ selectedValue }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="item in itemList" :key="item.id" :command="item">{{ item.name }}</el-dropdown-item>

  </el-dropdown-menu>
                    </el-dropdown>
                    <span style="color:#00ffff;padding:0.04rem" v-if="double">{{ $store.state.name[0] }} vs {{ $store.state.name[1] }}</span>
                  <span style="color:white;font-size: 0.09rem;font-weight:bold;">出手概率</span>
                  <el-tooltip class="item" effect="light"
                  placement="right">
                  <div slot="content">
                      <p>实时预测信号源此时刻会出手(交易)的概率。</p>
                      <p>每一个信号源只对应一个币种，八个信号源分别对应的币种为：</p>
                      <p>Michaela Kreindl---EURAUD</p>
                      <p>Thien Long Do---EURUSD</p>
                      <p>Sarowar Jahan---GBPCHF</p>
                      <p>Alexander Pavlenko---GBPJPY</p>
                      <p>Tho Minh Cao---USDCAD</p>
                      <p>Anteno Harpa---USDCHF</p>
                      <p>Ady Suyoko---USDJPY</p>

                    </div>
                   <i class="el-icon-question" style="color:#00bed0;transform: scale(1);transform:translate(20%,10%)"></i>
            </el-tooltip>
                  <div class="time" style="margin:0;width:1.2rem;transform: translate(2.4rem,-0.11rem);">最近更新时间:{{ gengxin }}</div>

                  <div class="ku" v-if="single">{{ pinlv }}%</div>
                  <div class="ku" v-if="double">{{ pro1 }} vs {{ pro2 }}</div>
                  <div id="expand">
                    <el-tooltip style="display:flex;transform:translate(3.3rem,-0.45rem);align-items: center;margin-top:0.05rem;" effect="light" content="实时预测信号源此时刻会出手(交易)的概率">
                      <img src="/static/img/home/切换.png" alt="" style="width:0.15rem;height:0.15rem;margin-left:0.03rem" @click="qiehuan">
                    </el-tooltip>
                  </div>
                </div>
                <div class="chart">
            <TradeRate :selectedValue="selectedValue" :gengxin="gengxin" :pinlv="pinlv" @gengpin="handleChild" v-if="single"></TradeRate>
            <DoubleZhe  :gengxin="gengxin" :pro1="pro1" :pro2="pro2" @pro1="handlePro1" @pro2="handlePro2" v-if="double"></DoubleZhe>
          </div>
            <div style="width:100%;height:0.09rem;text-align: center;margin-top:0.03rem"><span style="color:#fff;font-size:0.08rem;">先前预测概率</span></div>
        </div>
           <div class="panel pro">
              <div class="big">
                  <h2>盈亏情况</h2>
                   <el-tooltip class="item" effect="light" content="反映了所有信号源在每个月的盈利金额，亏损金额" placement="right">
                   <i class="el-icon-question" style="color:#00bed0;margin-left:-0.1rem;transform: scale(1);transform:translate(-0.95rem,80%)"></i>
            </el-tooltip>
                           <div class="menu" style="width:0.6rem;height:0.15rem;transform: translateX(30%);">
                    <el-dropdown @command="handleYear" style="margin-top:0.04rem;height:0.08rem;cursor:pointer">
  <span class="el-dropdown-link" style="font-size:0.09rem;color:aqua">
    {{ selectedYear }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="item in yearList" :key="item.id" :command="item" style="height:0.2rem;">{{ item.value }}</el-dropdown-item>

  </el-dropdown-menu>
                    </el-dropdown>
                </div>
                  <!-- <i class="el-icon-full-screen" @click="expand(4)"></i> -->
              </div>
          <div class="chart">
            <MProfit :valuePro="selectedYear"></MProfit>
          </div>
        </div>
      </div>
      <div class="column">
           <div class="panel per">
              <div class="big">
                  <h2>个人风格</h2>
                     <el-tooltip class="item" effect="light" content="反映了用户的潜在交易风格，并推荐适合用户的信号源" placement="right">
                   <i class="el-icon-question" style="color:#00bed0;transform: scale(1.2);transform:translate(0.65rem,-0.13rem)"></i>
            </el-tooltip>
              </div>
          <div class="chart">
            <PerAn></PerAn>
          </div>
        </div>
           <div class="panel num">
              <div class="big">
                  <h2>综合评价</h2>
                    <el-tooltip class="item" effect="light" content="按照多个维度综合评价信号源的风格类型" placement="right">
                   <i class="el-icon-question" style="color:#00bed0;transform: scale(1.2);transform:translate(-0.41rem,0.01rem)"></i>
            </el-tooltip>
                                <div class="menu"  style="width:1rem;height:0.15rem;transform:translateX(20%)">
                    <el-dropdown @command="handleFollow" style="cursor:pointer;height:0.1rem;text-align: center;width:1rem;">
  <span class="el-dropdown-link" style="font-size:0.09rem;color:aqua">
    {{ selectedFollow }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="item in itemList" :key="item.id" :command="item" style="height:0.17rem;">{{ item.name }}</el-dropdown-item>

  </el-dropdown-menu>
                    </el-dropdown>
                </div>
                  <!-- <i class="el-icon-full-screen" @click="expand(5)"></i> -->
              </div>
          <div class="chart">
            <NumFo :selectedFollow="selectedFollow"></NumFo>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import PerAn from '@/components/PerAn'
import TraDa from '@/components/TraDa'
import NumFo from '@/components/NumFo'
import TradeRate from '@/components/TradeRate'
import MProfit from '@/components/MProfit'
import WinR from '@/components/WinR'
import NavBar from '@/components/NavBar.vue'
import DoubleZhe from '@/components/DoubleZhe'
export default {
  components: {
    WinR,
    PerAn,
    TraDa,
    NumFo,
    TradeRate,
    MProfit,
    NavBar,
    DoubleZhe

  },
  data () {
    return {
      myShow: false,
      single: false,
      double: true,
      winData: '',
      valueWin: '近一周',
      valueRili: 'Alexander Pavlenko',
      valueGensui: 'Alexander Pavlenko',
      selectedValue: 'Alexander Pavlenko',
      selectedFollow: 'Alexander Pavlenko',
      selectedYear: '2024年',
      gengxin: '--',
      pinlv: '--',
      hrefList: [
        { id: 1, url: '/DatePage' },
        { id: 2, url: '/WinPage' },
        { id: 3, url: '/RateTime' },
        { id: 4, url: '/ProfitPage' },
        { id: 5, url: '/FollowPage' }
      ],
      date: [
        { value: '近一周', label: '近一周' },
        { value: '近半个月', label: '近半个月' },
        { value: '近一个月', label: '近一个月' }
      ],
      yearList: [
        { value: '2024年', label: '2024年' },
        { value: '2023年', label: '2023年' },
        { value: '2022年', label: '2022年' },
        { value: '2021年', label: '2021年' },
        { value: '2020年', label: '2020年' },
        { value: '2019年', label: '2019年' },
        { value: '2018年', label: '2018年' },
        { value: '2017年', label: '2017年' }
      ],
      nameList: [
        { value: '2024年', label: '2024年' },
        { value: '2023年', label: '2023年' },
        { value: '2022年', label: '2022年' },
        { value: '2021年', label: '2021年' },
        { value: '2020年', label: '2020年' },
        { value: '2019年', label: '2019年' },
        { value: '2018年', label: '2018年' },
        { value: '2017年', label: '2017年' }
      ],
      itemList: [
        { id: 1, name: 'Alexander Pavlenko' },
        { id: 2, name: 'Sarowar Jahan' },
        { id: 3, name: 'Niccolo Tirelli' },
        { id: 4, name: 'Thien Long Do' },
        { id: 5, name: 'Tho Minh Cao' },
        { id: 6, name: 'Anteno Harpa' },
        { id: 7, name: 'Ady Suyoko' },
        { id: 8, name: 'Michaela Kreindl' }
      ],
      pro1: '11',
      pro2: '22'

    }
  },
  mounted () {
    this.valueRili = this.$store.state.name[0]
    this.valueGensui = this.$store.state.name[0]
    this.selectedValue = this.$store.state.name[0]
    this.selectedFollow = this.$store.state.name[0]
  },
  methods: {
    expand (id) {
      const page = this.hrefList.find(item => item.id === id)
      if (page) {
        this.$router.push(page.url)
      } else {
      // 处理未找到对应id的页面逻辑
      }
    },
    qiehuan () {
      this.single = !this.single
      this.double = !this.double
    },
    handleChild (geng, pin) {
      this.gengxin = geng
      this.pinlv = pin
    },
    handlePro1 (geng, pro1) {
      this.gengxin = geng
      this.pro1 = pro1
    },
    handlePro2 (pro2) {
      this.pro2 = pro2
    },
    handleCommand (command) {
      this.selectedValue = command.name
    },
    handleYear (command) {
      this.selectedYear = command.value
    },
    handleDate (command) {
      this.valueWin = command.value
    },
    handleRili (command) {
      this.valueRili = command.name
    },
    handleFollow (command) {
      this.selectedFollow = command.name
    }

  }

}
</script>

<style lang="less" scoped>
.wrap{

    #bgmp{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    }

   .main{
      width: 100%;
      height: 100%;
      display: flex;
      position:absolute;
      z-index: 3;

      .column {
          flex: 4; /* 默认每个 column 占据相同的空间 */
          .panel{
            height:2rem;
              background:url(/public/static/img/home/dp_左上.png)no-repeat center 0;
              background-size: 100% 100%;
              padding:0.12rem;
               .big{
                  width:95%;

                  display:flex;
                  justify-content: space-between;
                  align-items: center;

                  h2{
                    color:white;
                    font-size:0.12rem;
                    margin:0 0 0 0.15rem;
                    padding:0;

                    }
                  .el-icon-full-screen{
                    color:white;
                    cursor: pointer;
                    font-weight: bold;
                  }

                }

              .chart{
                height:85%;
                // background-color:red;
                margin-top:0.05rem;

              }

          }
          // .date{

          //   .chart{

          //   }
          // }
          .win{
              background:url(/public/static/img/home/dp_左下.png) no-repeat center 0;
              height:1.5rem;
              background-size: 100% 100%;

              .menu{
                margin-left:1.1rem;
                 .el-dropdown-link {
                  cursor: pointer;
                  color:#00ffff;

                }
                .el-icon-arrow-down {
                  font-size: 12px;
                }

              }

          }

          .map{
             background:url(/public/static/img/home/d.png) no-repeat center 0 ;
              background-size: 100% 100%;
              height:1.6rem;

              #expand{
                width:95%;
                margin:0 auto;
                height:0.1rem;

                display:flex;
                .el-icon-full-screen{
                  margin-left:auto;
                      color:white;
                    cursor: pointer;
                    font-weight: bold;

              }
              }
              .textBox{

                margin-top:0.1rem;
                  // background-color: rgba(109, 161, 218,0.5);
                // background-color: red;
                .el-dropdown-link {
                  cursor: pointer;
                  color: #00ffff;
                  padding-left:0.15rem;
                  box-sizing: border-box;
                  }
                .el-icon-arrow-down {
                  font-size: 0.1rem;
                }

                .ku{
                  margin:0 auto;
                  // background-color: #d26460;
                  font-size:0.3rem;
                  text-shadow:
                  1px 1px rgba(170, 207, 243, 0.8),
                  2px 2px rgba(170, 207, 243, 0.8),
                  3px 3px rgba(170, 207, 243, 0.8),
                  3px 3px rgba(170, 207, 243, 0.8),
                  3px 3px rgba(170, 207, 243, 0.8),
                  3px 3px rgba(170, 207, 243, 0.8);

                  text-align: center;
                  color:#00ffff;
                  height:0.3rem;

                }
                .time{
                  margin-left:1.3rem;
                  font-size:0.08rem;
                  color:#00ffff
                }
                .shou{
                  margin-left:0.15rem;
                  font-size:0.1rem;
                  color:#00ffff;
                  // background-color:#00ffff;
                  span{
                    font-size:0.12rem;
                    color:#d26460;
                  }
                }
              }
              .chart{
                height:45% !important;

                margin-top:0 !important;

              }
          }
          .pro{
            background:url(/public/static/img/home/pro_k.png) no-repeat center 0 ;
              background-size: 100% 100%;
              height:2rem;
              .big{
                margin-top:0.05rem;
                menu{
                  width:1rem;
                }

               h2{
                margin-top:0.15rem !important;
                margin-left:0.3rem;
              }
              .el-icon-full-screen{
                 margin-top:0.15rem !important;
              }
              }

              .chart{
                margin-left:0.1rem;
                height:1.5rem;

              }

          }
          .per{
               background:url(/public/static/img/home/dp_右上.png) no-repeat center 0 ;;
              background-size: 100% 100%;
              .big{
                display:block !important;
                height:0.15rem;
              }
              .chart{
                height:1.8rem;
              }

          }
          .num{
                 background:url(/public/static/img/home/dp_右下.png) no-repeat center 0 ;;
              background-size: 100% 100%;
              height:1.5rem;
               menu{
                  width:1rem;
                }
              .chart{
                height:1.3rem;

              }

          }
          .date{
            .chart{
              height:1.8rem;
            }
          }

      }

      .column:nth-child(2) {
           flex: 5; /* 第二个 column 占据原来的两倍空间 */
      }
   }
}

</style>
<style>

</style>
