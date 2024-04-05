<template>
  <div class="container">
      <video autoplay loop muted poster="static/img/home/homebg.mp4" id="bgmp" >
        <source src="static/img/home/homebg.mp4" type="video/mp4">
    </video>
      <NavBar></NavBar>
    <section class="main">
      <div class="column">
        <div class="panel date">
            <div class="big">
              <h2>人物交易频率</h2>
              <i class="el-icon-full-screen" @click="expand(1)"></i>
            </div>
          <div class="chart">
            <TraDa ></TraDa>

          </div>
        </div>
           <div class="panel win">
            <div class="big">
                <h2>人物获胜率</h2>
                <i class="el-icon-full-screen" @click="expand(2)"></i>
            </div>
          <div class="chart">
            <WinR></WinR>
          </div>
        </div>
      </div>
      <div class="column">
           <div class="panel map">
                <div class="big">
                  <h2>汇率流通图</h2>
                  <i class="el-icon-full-screen" @click="expand(3)"></i>
                </div>
          <div class="chart">
            <WorldMap></WorldMap>
          </div>
        </div>
           <div class="panel pro">
              <div class="big">
                  <h2>人物盈利率</h2>
                  <i class="el-icon-full-screen" @click="expand(4)"></i>
              </div>
          <div class="chart">
            <MProfit></MProfit>
          </div>
        </div>
      </div>
      <div class="column">
           <div class="panel per">
              <div class="big">
                  <h2>人物描述</h2>

              </div>
          <div class="chart">
            <PerAn></PerAn>
          </div>
        </div>
           <div class="panel num">
              <div class="big">
                  <h2>跟随人数</h2>
                  <i class="el-icon-full-screen" @click="expand(5)"></i>
              </div>
          <div class="chart">
            <NumFo></NumFo>
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
import WorldMap from '@/components/WorldMap'
import MProfit from '@/components/MProfit'
import WinR from '@/components/WinR'
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    WinR,
    PerAn,
    TraDa,
    NumFo,
    WorldMap,
    MProfit,
    NavBar
  },
  data () {
    return {
      myShow: false,
      hrefList: [
        { id: 1, url: '/DatePage' },
        { id: 2, url: '/WinPage' },
        { id: 3, url: '/MapPage' },
        { id: 4, url: '/ProfitPage' },
        { id: 5, url: '/FollowPage' }
      ]
    }
  },
  methods: {
    expand (id) {
      const page = this.hrefList.find(item => item.id === id)
      if (page) {
        this.$router.push(page.url)
      } else {
      // 处理未找到对应id的页面逻辑
      }
    }

  }

}
</script>

<style lang="less" scoped>
.container{

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

          }
          .map{
             background:url(/public/static/img/home/map_k.png) no-repeat center 0 ;
              background-size: 100% 100%;
          }
          .pro{
            background:url(/public/static/img/home/pro_k.png) no-repeat center 0 ;
              background-size: 100% 100%;

              height:1.6rem;
              .chart{
                margin-left:0.1rem;
                height:1.25rem;
                margin-top:0rem !important;
              }
              h2{
                margin-top:0.15rem !important;
                margin-left:0.3rem;
              }
              .el-icon-full-screen{
                 margin-top:0.15rem !important;
              }

          }
          .per{
               background:url(/public/static/img/home/dp_右上.png) no-repeat center 0 ;;
              background-size: 100% 100%;
          }
          .num{
                 background:url(/public/static/img/home/dp_右下.png) no-repeat center 0 ;;
              background-size: 100% 100%;
              height:1.5rem;
              .chart{
                height:1.3rem;

              }

          }
      }

      .column:nth-child(2) {
           flex: 5; /* 第二个 column 占据原来的两倍空间 */
      }
   }
}

</style>
