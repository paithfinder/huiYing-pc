<template>
  <div class="modal" v-if="show">
                            <div class="modal-content" >
                              <div class="main" v-if="istrade">
                                <div style="display:flex;justify-content: space-between;align-items: center;">
                                <span style="font-size:0.08rem;color:red;font-weight: bold;background-color: #fff;padding:0.02rem;border-radius:0.03rem;cursor:pointer;" @click="showDing">
                                   <img src="/static/img/查看.png" alt="" style="width:0.05rem;height:0.05rem;transform:scale(2);padding:0 0.03rem;">
                                    <span>查看订单</span>

                                </span>

                                <span class="close" @click="closeModal" style="margin-left:0.06rem;">&times;</span>
                              </div>

                              <div style="width:100%">

                                <h3 style="color:#edf1f9;margin:0 auto">模拟交易</h3>
                                <div style="color:red;font-size:0.08rem;font-weight: bold;margin-top:0.02rem" v-if="isWeek">(停盘中,交易截止)</div>
                              </div>
                              <div class="formBox" >
                                  <!-- 交易量 -->
                                  <div class='shuru' style="display:flex;align-items: center;">
                                    <div style="color:#fff;width:0.5rem;font-size:0.08rem;">交易品种:</div>
                                  <el-select size="mini" v-model="value" placeholder="请选择" style="width:80%">
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                  </el-select>
                                  </div>
                                  <div class='shuru' style="display:flex;align-items: center;">
                                    <div style="color:#fff;width:0.5rem;font-size:0.08rem;">交易量:</div>
                                    <el-input-number size="mini" v-model="num" :min="5000" style="width:80%"></el-input-number>
                                  </div>
                                  <div class='shuru' style="display:flex;align-items: center;">
                                    <div style="display:flex;align-items: center;">
                                      <div style="color:#fff;width:0.4rem;font-size:0.08rem;">止损:</div>
                                      <el-input size="mini" v-model="form.sun" style="width:60%"></el-input>
                                    </div>
                                    <div style="display:flex;align-items: center;">
                                      <div style="color:#fff;width:0.5rem;font-size:0.08rem;">止盈:</div>
                                      <el-input size="mini" v-model="form.ying" style="width:60%"></el-input>
                                    </div>
                                  </div>
                                  <div class="dibu">
                                    <div style="display:flex;justify-content: space-between;">
                                      <el-button @click="type1" type="danger" style="width:40%">卖出</el-button>
                                      <el-button @click="type2" type="primary" style="width:40%">买入</el-button>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div class="dingdan" v-if="isDing" >
                                        <div style="display:flex;justify-content: space-between;align-items: center;">
                                          <span style="font-size:0.08rem;color:red;font-weight: bold;background-color: #fff;padding:0.02rem;border-radius:0.03rem;cursor:pointer;" @click="showTrade">
                                            <img src="/static/img/返回.png" alt="" style="width:0.05rem;height:0.05rem;transform:scale(2);padding:0 0.03rem;">
                                            返回交易
                                          </span>
                                          <span class="close" @click="closeModal">&times;</span>

                                        </div>
                                        <div style="display:flex;width:100%">
                                          <h3 style="color:#edf1f9;margin:0 auto">订单</h3>

                                        </div>
                                        <div style="color:#fff;text-align: left;margin-top:0.03rem;font-size:0.08rem;font-weight: bold">正在进行交易的订单：</div>
                                        <el-table
                                            :data="weiData"
                                            v-loading="weiLoading"
                                            max-height="140"
                                            style="width: 100%;font-size:0.06rem;margin-top:0.03rem">
                                            <el-table-column
                                              fixed
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
                                              prop="money"
                                              label="Volume"

                                              align="center">
                                            </el-table-column>
                                            <el-table-column
                                              prop="transaction"
                                              label="Symbol"

                                              align="center">
                                            </el-table-column>

                                            <el-table-column
                                              fixed="right"
                                              label="操作"
                                              width="80"
                                              align="center">
                                              <template slot-scope="scope">
                                                <el-button @click="handleWei(scope.row)" type="danger" size="mini" style="transform:scale(0.8)">平仓</el-button>

                                              </template>
                                            </el-table-column>
                                         </el-table>
                                         <div style="color:#fff;text-align: left;margin-top:0.15rem;font-size:0.08rem;font-weight: bold">已结束订单：</div>
                                        <el-table
                                            :data="yiData"
                                            v-loading="yiLoading"
                                            max-height="150"
                                            style="width: 100%;font-size:0.06rem;margin-top:0.03rem;">
                                            <el-table-column
                                              fixed
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
                                              prop="money"
                                              label="Volume"

                                              align="center">
                                            </el-table-column>
                                            <el-table-column
                                              prop="transaction"
                                              label="Symbol"

                                              align="center">
                                            </el-table-column>
                                            <el-table-column
                                              prop="profit"
                                              label="profit"

                                              align="center">
                                            </el-table-column>

                                         </el-table>
                                         <br><br>
                              </div>
                            </div>

      </div>
</template>

<script>
import $http from '@/utils/request'
import axios from 'axios'
export default {
  props: ['show', 'changeModel'],
  data () {
    return {
      istrade: true,
      isDing: false,
      type: '',
      num: 5000,
      weiLoading: false,
      yiLoading: false,
      mai: false,
      value: '',
      weiData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      yiData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      form: {
        name: '',
        sun: '',
        ying: ''

      },
      options: [{
        value: 'USDJPY',
        label: 'USDJPY'
      }, {
        value: 'USDCHF',
        label: 'USDCHF'
      }, {
        value: 'USDCAD',
        label: 'USDCAD'
      }, {
        value: 'GBPUSD',
        label: 'GBPUSD'
      }, {
        value: 'EURUSD',
        label: 'EURUSD'
      }],
      selectId: '',
      isWeek: false
    }
  },
  methods: {
    isWeekend () {
      // 获取当前日期
      const now = new Date()

      // 获取当前星期几（0 表示周日，1 表示周一，依此类推）
      const dayOfWeek = now.getDay()

      // 判断是否是周末
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // 周末的操作
        this.isWeek = true
      } else {
        // 工作日的操作
        this.isWeek = false
      }
    },
    async getHaving () {
      try {
        const res = await axios.get('user/ordersTradingWithOne', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log('正在交易')

          this.weiData = res.data.data
            .sort((a, b) => {
              // 注意：这里使用字符串比较，所以不需要转换为日期对象
              return b.time.localeCompare(a.time)
            })
        } else {
          this.weiData = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getYi () {
      try {
        const res = await axios.get('user/ordersTradingWithTwo', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        console.log(res)
        if (res.data.data !== null) {
          console.log(res.data.data)
          console.log('已结束')
          this.yiData = res.data.data.sort((a, b) => {
            // 注意：这里使用字符串比较，所以不需要转换为日期对象
            return b.time.localeCompare(a.time)
          })
        } else {
          this.yiData = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    async overTrade () {
      try {
        const res = await axios.get(`user/closeDeal/${this.selectId}`, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        this.getYi()
        this.getHaving()
        this.$nextTick(function () {
        // DOM 更新后的操作
          this.weiLoading = false
        })
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'error',
            duration: 1000 // 设置显示时间为1秒
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    type1 () {
      this.mai = true
      sessionStorage.setItem('mai', JSON.stringify(this.mai))
      this.type = 1
      this.getModel()
      this.$message({
        message: '创建订单成功！',
        type: 'success',
        duration: 1000 // 设置显示时间为1秒
      })

      this.getYi()
      this.getHaving()
    },
    type2 () {
      this.mai = true
      sessionStorage.setItem('mai', JSON.stringify(this.mai))
      this.type = 2
      this.getModel()
      this.$message({
        message: '创建订单成功！',
        type: 'success',
        duration: 1000 // 设置显示时间为1秒
      })

      this.getYi()
      this.getHaving()
    },
    showDing () {
      this.istrade = false
      this.isDing = true
      this.getYi()
      this.getHaving()
    },
    showTrade () {
      this.istrade = true
      this.isDing = false
    },
    getModel () {
      console.log(this.type)
      $http.post('/api/user/trade', {
        type: this.type,
        money: this.num,
        heigh: this.form.ying,
        low: this.form.sun,
        transaction: this.value
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
        }
      })
        .then(function (response) {
          // 处理成功情况
          console.log(response)
          console.log('模拟交易')
          if (response.success === true) {
            console.log('成功')
          } else {
            console.log(response.errorMsg)
          }
        })
    },
    closeModal () {
      this.$emit('changeModel', false)
    },
    handleWei (row) {
      console.log(row.id)
      this.selectId = row.id
      this.weiLoading = true
      this.overTrade()
    }
  },
  watch: {
    value (newValue) {
      console.log(newValue)
    }
  },
  mounted () {
    this.getHaving()
    this.getYi()
    this.isWeekend()
  }
}
</script>

<style lang="less" scoped>
 .modal {
                      position: fixed;
                      z-index: 100;
                      left: 0;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      background-color: rgba(0,0,0,0.5);
                      .modal-content {
                        background-color: #fefefe;
                        position: absolute;
                        top: 20%;
                        left: 50%;
                        transform: translate(-50%, -50%); /* 水平垂直居中 */
                        border-radius:0.1rem;
                        margin: 15% auto;
                        padding: 20px;
                        border: 1px solid #888;
                        width: 30%;
                        text-align: center;
                       background-image: linear-gradient(to bottom, #7a87a2, #01335f);

                          .formBox{
                          .shuru{
                            margin-top:0.05rem;
                            background-color: rgba(110, 199, 192, 0.408);
                            height:0.3rem;
                            border-radius:0.03rem;
                          }
                          .dibu{
                            margin-top:0.3rem;
                          }
                        }
                        h2{
                          color:#01335f
                        }
                        .close {
                            color: #aaa;
                            float: right;
                            font-size: 28px;
                            font-weight: bold;
                          }
                          .close:hover,
                          .close:focus {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                          }

                        }
                    }
</style>
