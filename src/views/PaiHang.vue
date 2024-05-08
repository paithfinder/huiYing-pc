<template>

<div class="wrap">
    <div>
        <img src="/static/img/个人/返回.png" alt="" style="width:0.2rem;height:0.2rem;padding:0.06rem;position:absolute;z-index:4;cursor: pointer;" @click="goBack">
    </div>
    <video autoplay loop muted poster="static/img/home/homebg.mp4" id="bgmp" >
        <source src="static/img/home/homebg.mp4" type="video/mp4">
    </video>
    <div class="bigBox">
        <div class="head">
        <!-- 头像 -->
        <div class="touxiang">
            <img :src=path alt="">
            <div style="transform: translate(0.3rem,0.71rem);font-size:0.07rem;">{{ name }}</div>
        </div>
        <!-- 文本 -->
        <div class="text">
            <div>
                <div style="color:#fff">资金: {{ fund }} 美元</div>
                <div style="margin-top:0.2rem;color:#fff">交易性格：{{ type }}</div>
            </div>
            <div>
                <div style="color:#fff">获胜率: {{ win }}</div>
                <div style="margin-top:0.2rem;color:#fff">社区排行 资金 / 获胜率: {{ fundRank }} / {{ winRank }}</div>
            </div>
        </div>
        <!-- 插画 -->
        <div class="hua">
            <img src="/static/img/个人/个人插图.png" alt="">
        </div>
        </div>
        <div class="body">
            <div class="nav">
                <ul>
                    <li >我的主页</li>
                </ul>
            </div>
            <div class="chart">
                <div class="zhu">
                    <div style="display:flex;background-color: #0b1837;">
                    <div class="zhe">
                        <ZheXian :newUrl="newUrl"></ZheXian>
                    </div>
                    <div class="yuan">
                        <YuanBin :newUrl2="newUrl2"></YuanBin>
                    </div>

                </div>
                <el-table
                        style="width: 100%"
                        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                        >
                        <el-table-column
                          prop="time"
                          label="Time"
                          width="180"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="type"
                          label="Type"
                          width="180"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="volume"
                          label="Volume"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="symbol"
                          label="Symbol"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="profit"
                          label="Profit"
                          align="center">
                        </el-table-column>
                </el-table>
                <el-pagination
              background
              layout="prev, pager, next,jumper, ->, total, slot"
              :total="tableData.length"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              style="text-align: center;color:#fff;margin-top:0.2rem;">
                </el-pagination>
                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import ZheXian from '@/components/ZheXian.vue'
import YuanBin from '@/components/YuanBin.vue'
export default {
  data () {
    return {
      currentPage: 1, // 当前页 刷新后默认显示第一页
      pageSize: 5, // 每一页显示的数据量 此处每页显示5条数据
      fund: '',
      fundRank: '',
      name: '',
      win: '',
      winRank: '',
      type: '',
      path: '',
      newUrl: '',
      newUrl2: '',
      tableData: [{
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
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]

    }
  },
  components: {
    YuanBin,
    ZheXian
  },
  methods: {

    // 点击按钮切换页面
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage // 每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    },
    onSubmit () {
      console.log('submit!')
    },
    handleClick (row) {
      console.log(row)
    },
    goBack () {
      this.$router.go(-1)
    },
    async getData () {
      try {
        const res = await axios.get(`user/getPersonalInformationByName/${this.$store.state.selectName}`, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          const person = res.data.data
          this.fund = person.fund
          this.fundRank = person.fundingRanking
          this.win = person.winRate
          this.winRank = person.winRateRanking
          this.type = person.type
          this.path = person.path
          this.name = person.name
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getable () {
      try {
        const res = await axios.get(`user/getHistoryTransactionsByName/${this.$store.state.selectName}`, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          this.tableData = res.data.data
        } else {
          this.tableData = []
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.newUrl = `user/simulatedTradingProfitCurvesByName/${this.$store.state.selectName}`
    this.newUrl2 = `user/tradingSymbolByName/${this.$store.state.selectName}`
    this.getData()
    this.getable()
  }
}
</script>

<style lang="less" scoped>
.wrap{
    width:100%;
    overflow-y: scroll;
    .bigBox{
        width:70%;

        background-color: #092e6f;
        position:absolute;
        margin:0 auto;
        left:1.5rem;
        .head{
            height:1rem;

            display:flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dotted #00153e;
            .touxiang{
                width:0.8rem;
                height:0.8rem;
                background-color: #d8d8d8;
                margin-left:0.2rem;
                 position: relative;
                img{
                    width:0.6rem;
                    height:0.6rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #001741;

                }
            }
            .hua{
                img{
                    width:2.5rem;
                    height:0.9rem;
                }
            }
            .text{
                width:40%;
                height:1rem;
                display:flex;
                justify-content: space-between;
                align-items: center;

            }
        }
        .body{

            width:100%;

            display:flex;
            justify-content: space-between;
            .nav{
                height:60vh;
                ul{
                    padding:0;
                    list-style-type:none;
                    padding-left:0.3rem;
                    li{
                        margin-top:0.3rem;
                        color:#fff;
                        cursor: pointer;
                    }
                    li:nth-child(1){
                        margin:0
                    }
                }
            }
            .chart{

                width:85%;

                .zhu{
                    .zhe{
                    width:50%;
                    height:30vh;
                }
                .yuan{
                    width:50%;
                    height:30vh;

                }
                }

            }
        }

    }
    #bgmp{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    }
}
</style>
<style >
.el-pagination__jump {

    color: #fff !important;
}
.el-pagination__total {
    color: #fff !important;
}
.el-form-item__label {

    color: #fff;

}
</style>
