<template>

<div class="wrap">
    <NavBar></NavBar>
    <video autoplay loop muted poster="static/img/home/homebg.mp4" id="bgmp" >
        <source src="static/img/home/homebg.mp4" type="video/mp4">
    </video>
    <div class="bigBox">
        <div class="head">
        <!-- 头像 -->
        <div class="touxiang">
            <img :src=path alt="">
            <div style="font-size:0.07rem;position:absolute;top:95%;left:50%;transform: translate(-50%,-50%);font-weight: bold;color:#092e6f">{{ name }}</div>
        </div>
        <!-- 文本 -->
        <div class="text">
            <div>
                <div style="color:#fff">资金: {{ fund }} 美元</div>
                <div style="margin-top:0.2rem;color:#fff">交易性格：{{ type }}
                   <el-button type="text" size="mini" @click="openQues" style="background-color: #d5e2fd;padding:0.02rem;font-size:0.06rem;height:0.08rem;color:#b50711;font-weight: bold;">重新测试</el-button>
                </div>
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
                    <li @click="showZhu">我的主页</li>
                    <li @click="showBang">排行榜</li>
                    <li @click="showMsg">社区留言</li>
                </ul>
            </div>
            <div class="chart">
                <div class="zhu" v-if="zhu">
                    <div style="display:flex;background-color: #0b1837;">
                    <div class="zhe">
                        <ZheXian></ZheXian>
                    </div>
                    <div class="yuan">
                        <YuanBin></YuanBin>
                    </div>

                </div>
                <el-table
                        style="width: 100%"
                        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                        >
                        <el-table-column
                          prop="time"
                          label="Time"

                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="type"
                          label="Type"

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

                <div class="bang" v-if="bang">
                  <h3 class="textbang" style="display:flex;color:#FFF;align-items:center">{{ textBang }}排行榜
                    <div style="margin-left:0.1rem;">
                      <el-button type="primary" size="mini" style="display:flex;align-items: center;padding:0.02rem" @click="changeBang">切换
                        <img src="/static/img/个人/切换 .png" alt="" style="width:0.07rem;height:0.07rem;">
                      </el-button>
                    </div>
                  </h3>
                     <el-table
                        :data="zijinData"
                        border
                        style="width:100%;margin:0 auto;"
                        v-if="isZiJin"
                        >
                        <el-table-column
                          fixed
                          prop="place"
                          label="排行"

                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="用户名"

                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="fund"
                          label="资金"

                          align="center">
                        </el-table-column>

                        <el-table-column
                          fixed="right"
                          label="主页"

                          align="center">
                          <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">点击查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                     <el-table
                        :data="shenglvData"
                        border
                        style="width:100%;margin:0 auto;"
                        v-if="isShengLv"
                        >
                        <el-table-column
                          fixed
                          prop="ranking"
                          label="排行"

                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="用户名"

                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="winRate"
                          label="获胜率"

                          align="center">
                        </el-table-column>

                        <el-table-column
                          fixed="right"
                          label="主页"

                          align="center">
                          <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">点击查看</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="msg" v-if="msg">
                    <div class="but">
                        <el-button size="mini" style="margin-left:auto" @click="toMy" v-if="isAll">我的留言</el-button>
                        <el-button size="mini" style="margin-left:auto" @click="toAll" v-if="isMy">返回社区留言</el-button>
                    </div>
                    <div v-if="isAll">
                      <div class="form">
                        <el-form ref="form" :model="form" label-width="80px">
                      <el-form-item label="发布留言" style="color:#fff">
                        <el-input type="textarea" v-model="form.desc" placeholder="我也来说一句吧~" :maxlength="100" show-word-limit></el-input>
                        <el-button type="primary" @click="onSubmit" size="mini">立即发布</el-button>
                      </el-form-item>
                    </el-form>
                    </div>
                    <!-- 留言用ul li li用v-for渲染，数据，当用户点击发布时在那个表后面新增一条数据就是 -->
                    <div class="liu">
                        <ul>

                            <li v-for="(item, index) in msgTable" :key="index">

                                <div class="text">{{  item.data }}</div>
                                <br>
                               <div class="replayArea" style="display:flex;justify-content: space-between;">
                                 <el-input
                                  type="textarea"
                                  autosize
                                  placeholder="我要回复……"
                                  style="width:93%"
                                  :maxlength="100"
                                  show-word-limit
                                  v-model="item.replayContent">
                                </el-input>
                                <el-button size="mini" type="primary" @click="addReplay(item.id,item.replayContent)">确定</el-button>
                               </div>
                               <template >
                                  <ul style="display:none" ref="ulReplay">
                                    <li v-for="(replay) in item.replayList" :key="replay.id"  class="replayText">
                                      <div >{{ replay.name }}:{{ replay.data }}</div>
                                      <div style="margin-top:0.02rem">{{ replay.time }}</div>
                                    </li>
                                  </ul>
                               </template>
                                <div class="flag">
                                    <div style="display:flex;align-items: center;">
                                        <div @click="changeActive(item.id)">
                                          <img :src="item.flag===true ? '/static/img/个人/已赞.png':'/static/img/个人/未赞.png'" alt="" style="width:0.2rem;height:0.2rem">

                                        </div>
                                        <div style="margin-left:0.03rem;">{{ item.support }}</div>
                                    </div>
                                    <div>{{ item.time }}</div>
                                    <div  @click="changeReplay($event,item.replayList,index)" style="display:flex;align-items: center;cursor:pointer" v-if="item.replays===0 ? false :true">
                                      <span  >展开{{item.replayList.length }}条回复</span>
                                      <img :src="replayImg" alt="" style="width:0.1rem;height:0.1rem;margin-left:0.02rem;">
                                    </div>
                                    <div style="display: flex;align-items: center;">
                                        <img :src="item.path" alt="" style="width:0.2rem;height:0.2rem;background-color: #fff;border-radius: 0.02rem;">
                                        <div style="margin-left:0.03rem">{{ item.name }}</div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    </div>
                    <div v-if="isMy">
                      <div class="liu">
                        <ul>
                            <li v-for="(item, index) in myTable" :key="index">
                                <div class="text">{{  item.data }}</div>
                                <div class="flag">
                                    <div style="display:flex;align-items: center;">
                                        <div @click="changeActiveMy(item.id)">
                                          <img :src="item.flag===true ? '/static/img/个人/已赞.png':'/static/img/个人/未赞.png'" alt="" style="width:0.2rem;height:0.2rem">

                                        </div>
                                        <div style="margin-left:0.03rem;">{{ item.support }}</div>
                                    </div>
                                    <div>{{ item.time }}</div>
                                    <div style="display: flex;align-items: center;">
                                        <img :src="path" alt="" style="width:0.2rem;height:0.2rem;background-color: #fff;border-radius: 0.02rem;">
                                        <div style="margin-left:0.03rem">{{ item.name }}</div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
import ZheXian from '@/components/ZheXian.vue'
import YuanBin from '@/components/YuanBin.vue'
import $http from '@/utils/request'
export default {
  data () {
    return {
      currentPage: 1, // 当前页 刷新后默认显示第一页
      pageSize: 5, // 每一页显示的数据量 此处每页显示5条数据
      fund: '',
      fundRank: '',
      win: '',
      name: '',
      winRank: '',
      type: '',
      path: '',

      activeId: '',
      textBang: '资金',
      replayImg: '/static/img/个人/展开.png',
      likeType: '',
      isZiJin: true,
      isShengLv: false,
      unLikeType: '',
      msgData: '',
      zhu: true,
      bang: false,
      msg: false,
      unfold: true,
      fold: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        Time: '2024.05.03 16:35',
        Type: 'Sell',
        Volume: '5023',
        Symbol: 'EURUSD',
        Profit: '324'
      }, {
        Time: '2024.04.27 14:40',
        Type: 'Sell',
        Volume: '7374',
        Symbol: 'GBPUSD',
        Profit: '-243'
      }, {
        Time: '2024.04.20 8:35',
        Type: 'Sell',
        Volume: '6732',
        Symbol: 'EURUSD',
        Profit: '632'
      }, {
        Time: '2024.04.18 9:30',
        Type: 'Buy',
        Volume: '5322',
        Symbol: 'GBPUSD',
        Profit: '-324'
      }, {
        Time: '2024.04.15 19:14',
        Type: 'Buy',
        Volume: '8363',
        Symbol: 'EURUSD',
        Profit: '734'
      }],
      replayData: [{}],
      zijinData: [{
        date: '1',
        name: '王小虎',
        province: '200320',
        city: '普陀区'

      }, {
        date: '2',
        name: '李小海',
        province: '148232',
        city: '普陀区'

      }, {
        date: '3',
        name: '锅大妹',
        province: '124312',
        city: '普陀区'

      }, {
        date: '4',
        name: '数签签',
        province: '104421',
        city: '普陀区'

      }],
      bangData: [{}],
      msgTable: [{}],
      myTable: [{}],
      wei: true,
      yi: false,
      isAll: true,
      isMy: false,
      replayAllUrl: '',
      showReplay: false
    }
  },
  components: {
    YuanBin,
    NavBar,
    ZheXian
  },
  methods: {
    async getData () {
      try {
        const res = await axios.get('user/getPersonalInformation', {
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
        const res = await axios.get('user/getHistoryTransactions', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log(3)
          this.tableData = res.data.data
        } else {
          this.tableData = ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getPai () {
      try {
        const res = await axios.get('user/ranking', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log(5)
          this.zijinData = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getPai2 () {
      try {
        const res = await axios.get('user/rankingWithWinRate', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log(888)
          this.shenglvData = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllMsg () {
      try {
        const res = await axios.get('user/getAllMessage', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log(777)
          this.msgTable = res.data.data.map(obj => {
            return { ...obj, replayContent: '' }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAddMsg () {
      // 发送POST请求
      try {
        const response = await $http.post('/api/user/addMessage', {
          data: this.msgData
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8', // 设置Content-Type为application/json
            Authourization: this.$store.state.token
          }
        })

        // 处理成功情况
        console.log(response)
        this.getAllMsg()
      } catch (error) {
        // 处理错误情况
        console.error(error)
      }
    },
    async addReplay (id, replayContent) {
      // 发送POST请求

      try {
        const response = await $http.post('/api/user/addReplayToMessage', {
          replay: replayContent,
          id: id
        }, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8', // 设置Content-Type为application/json
            Authourization: this.$store.state.token
          }
        })

        // 处理成功情况
        console.log(response)
        console.log('新增回复')
        this.getAllMsg()
      } catch (error) {
        // 处理错误情况
        console.error(error)
      }
    },
    async getMymsg () {
      try {
        const res = await axios.get('user/getMyMessage', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log(999)
          this.myTable = res.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async thumbUp () {
      try {
        const res = await axios.get(`user//thumbsUp/${this.activeId}`, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data.data !== null) {
          console.log(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async thumbDown () {
      try {
        const res = await axios.get(`user/thumbsUpOff/${this.activeId}`, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data.data !== null) {
          console.log(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 点击按钮切换页面
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage // 每次点击分页按钮，当前页发生变化
      // console.log(this.currentPage);
    },
    changeBang () {
      if (this.textBang === '资金') {
        this.textBang = '胜率'
      } else {
        this.textBang = '资金'
      }
      this.isZiJin = !this.isZiJin
      this.isShengLv = !this.isShengLv
    },
    changeReplay (event, replayList, index) {
      const clickDiv = event.currentTarget // 获取绑定事件的整个 <div> 元素
      const clickImg = clickDiv.querySelector('img') // 获取 <div> 元素下的图片元素
      const clickText = clickDiv.querySelector('span') // 获取 <div> 元素下的文本元素

      const targetSrc = clickImg.getAttribute('src')
      const newSrc = targetSrc === 'static/img/个人/展开.png' ? 'static/img/个人/收起.png' : 'static/img/个人/展开.png'
      clickImg.setAttribute('src', newSrc) // 更新图片的 src 属性

      const text = clickText.innerHTML
      clickText.innerHTML = text !== '收起' ? '收起' : `展开${replayList.length}条回复`
      this.replayAllUrl = 'user/getAllReplayById/' + index
      if (text === `展开${replayList.length}条回复`) {
        console.log(this.$refs.ulReplay)
        console.log(index)
        this.$refs.ulReplay[index].style.display = 'block'
      }
      if (text === '收起') {
        this.$refs.ulReplay[index].style.display = 'none'
      }
    },
    onSubmit () {
      console.log('submit!')
      console.log(this.form.desc)
      this.msgData = this.form.desc

      const newMsg = {
        id: this.msgData[0].id + 1,
        time: this.$store.state.lauchTime,
        flag: false,
        data: this.form.desc,
        path: this.path,
        support: 0,
        userId: this.msgData[0].userId,
        name: this.name
      }
      this.msgTable.unshift(newMsg)
      this.form.desc = ''
      this.getAddMsg()
    },
    changeActive (index) {
      console.log(index)
      this.activeId = index
      // 找到对应 id 的项目并更新它的 unLiked 属性
      const item = this.msgTable.find(item => item.id === index)
      if (item.flag === false) {
      // 如果当前是未赞状态，改为已赞，并增加 support
        this.$set(item, 'flag', true)
        this.$set(item, 'support', item.support + 1)

        this.thumbUp()
      } else {
      // 如果当前是已赞状态，改为未赞，并减少 support
        this.$set(item, 'flag', false)
        this.$set(item, 'support', item.support - 1)

        this.thumbDown()
      }
    },
    changeActiveMy (index) {
      console.log(index)
      this.activeId = index
      // 找到对应 id 的项目并更新它的 unLiked 属性
      const item = this.myTable.find(item => item.id === index)
      if (item.flag === false) {
      // 如果当前是未赞状态，改为已赞，并增加 support
        this.$set(item, 'flag', true)
        this.$set(item, 'support', item.support + 1)

        this.thumbUp()
      } else {
      // 如果当前是已赞状态，改为未赞，并减少 support
        this.$set(item, 'flag', false)
        this.$set(item, 'support', item.support - 1)

        this.thumbDown()
      }
    },
    showZhu () {
      this.bang = false
      this.msg = false
      this.zhu = true
    },
    showBang () {
      this.zhu = false
      this.msg = false
      this.bang = true
    },
    showMsg () {
      this.zhu = false
      this.bang = false
      this.msg = true
    },
    handleClick (row) {
      console.log(row.name)
      this.$store.commit('changeSelectedName', row.name)

      this.$router.push('/PaiHang')
    },
    openQues () {
      this.$router.push('/ReQues')
    },
    toMy () {
      this.isAll = false
      this.isMy = true
      this.getMymsg()
    },
    toAll () {
      this.isAll = true
      this.isMy = false
    }
  },
  mounted () {
    this.getData()
    this.getable()
    this.getPai()
    this.getPai2()
    this.getAllMsg()
    this.getAddMsg()
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
                width:45%;
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
                // background-color: #323a5e;
                .msg{
                  width:100%;
                  background-color:#092e6f;
                }
                .zhu{
                    .zhe{
                    width:45%;
                    height:30vh;
                }
                .yuan{
                    width:55%;
                    height:30vh;

                }
                }

                .but{
                    width:98%;
                    background-color: transparent ;
                    display:flex;
                }
                .form{
                    width:80%;
                }
                .liu{
                    margin-top:0.2rem;
                    width:95%;
                    margin:0 auto;
                    ul{
                        list-style-type: none;
                        padding:0;
                        li{
                            color:#fff;
                            margin-top:0.15rem;
                            background-color: #4d61aa;
                            border:3px solid #4686c6;
                            border-radius:6px;
                            padding:0.1rem;
                            .flag{
                                display:flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-top:0.1rem;
                            }
                            .replayText{

                              margin:0 auto;
                              background-color: rgba(255, 255, 255,0.2);
                              // padding:0.02rem;
                              box-sizing: border-box;
                              margin-top:0.05rem;
                              ul{
                                padding:0;
                                margin:0
                              }

                            }

                        }
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
