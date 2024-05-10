<template>
  <div class="w">
    <div class="chart" ref="zhe"  >

    </div>
    <div style="color:#fff;font-weight: bold;text-align: center;transform: translateY(-0.75rem);" v-if="noData">尚未完成过交易,暂无资金曲线数据</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['newUrl'],
  data () {
    return {
      myChart: null,
      time: [],
      profit: [],
      baseUrl: 'user/simulatedTradingProfitCurves',
      noData: false
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  computed: {
    url: {
      get () {
        return this.baseUrl
      },
      set (value) {
        this.baseUrl = value
      }
    }
  },
  watch: {
    newUrl (newValue) {
      this.url = newValue
      this.noData = false
      this.getData()
    }
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.zhe, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.url, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })

        if (res.data.data.time.length !== 0) {
          console.log(res.data.data)
          this.time = res.data.data.time
          this.profit = res.data.data.profit
          this.noData = false
        } else {
          this.time = []
          this.profit = []
          this.noData = true
        }
      } catch (error) {
        console.log(error)
      }

      this.updateChart()
    },
    // 处理数据并且更新图表
    updateChart () {
      // 处理请求返回的数据

      // 图表的相关配置
      const option = {
        // backgroundColor: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //   offset: 0,
        //   color: '#c86589'
        // },
        // {
        //   offset: 1,
        //   color: '#06a7ff'
        // }
        // ], false),
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        title: {
          text: '资金变化曲线',
          left: '2%',
          top: '2%',
          textStyle: {
            color: '#fff',
            fontSize: 13
          }
        },
        grid: {
          top: '30%',
          left: '15%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.time,
          axisLabel: {
            margin: 30,
            color: '#ffffff63',
            fontSize: 10

          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            length: 25,
            lineStyle: {
              color: '#ffffff1f'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ffffff1f'
            }
          }
        },
        yAxis: [{
          type: 'value',
          position: 'right',
          axisLabel: {
            margin: 30,
            color: '#fff',
            fontSize: 10
          },

          axisTick: {
            show: true,
            length: 15,
            lineStyle: {
              color: '#ffffff1f'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ffffff1f'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 2
            }
          }
        }],
        series: [{
          name: '注册总量',
          type: 'line',
          smooth: true, // 是否平滑曲线显示
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: '#f8d097' // 线条颜色
            }
          },
          label: {
            show: true,
            position: 'bottom',
            textStyle: {
              color: '#fff',
              fontSize: 9
            }
          },
          itemStyle: {
            color: 'red',
            borderColor: '#fff',
            borderWidth: 3
          },

          areaStyle: {
            // normal: {
            //   color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //     offset: 0,
            //     color: '#eb64fb'
            //   },
            //   {
            //     offset: 1,
            //     color: '#3fbbff0d'
            //   }
            //   ], false)
            // }
          },
          data: this.profit
        }]
      }
      this.myChart.setOption(option)
      // 使用箭头函数确保在事件监听器内部能够访问到Vue组件实例的上下文
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }

  }

}
</script>

<style lang="less" scoped>
.w{
    width:100%;
    height:100%;

}
</style>
