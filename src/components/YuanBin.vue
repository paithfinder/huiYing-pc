<template>
  <div class="w">
    <div class="chart" ref="y">

    </div>
    <div style="color:#fff;font-weight: bold;text-align: center;transform: translateY(-0.75rem);" v-if="noYuan">尚未完成过交易,暂无交易品种数据</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['newUrl2'],
  data () {
    return {
      myChart: null,
      data: [{}],
      names: [],
      baseUrl: 'user/tradingSymbol',
      noYuan: false
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  watch: {
    newUrl2 (newValue) {
      this.url = newValue
      this.getData()
      this.noYuan = false
    }
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
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.y, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.url, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data.data.length !== 0) {
          console.log(res.data)
          console.log('1')
          this.names = res.data.data.map(item => item.name)
          this.data = res.data.data
          this.noYuan = false
        } else {
          this.names = []
          this.data = []
          this.noYuan = true
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
        backgroundColor: '#0B1837',
        color: ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05'],
        title: {
          text: '交易品种',
          left: '60',
          top: 0,
          textAlign: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vartical',
          x: 'right',
          top: 'center',
          right: '15',
          // bottom: "0%",
          itemWidth: 10,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: '#A3E2F4',
            fontSize: 12,
            fontWeight: 0
          },
          data: this.names
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: 'category',
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B4A6B',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: '#0B4A6B',
            margin: 8,
            fontSize: 16
          }
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B3E5E',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter: '{value} %',
            show: false,
            padding: [0, 0, 20, 0],
            color: '#0B3E5E',
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: '#0B3E5E',
              width: 2,
              type: 'solid'
            }
          }
        },
        calculable: true,
        series: [{
          type: 'pie',
          radius: ['5%', '10%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          data: [{
            name: '',
            value: 0,
            itemStyle: {
              normal: {
                color: '#0B4A6B'
              }
            }
          }]
        }, {
          type: 'pie',
          radius: ['80%', '85%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          name: '',
          data: [{
            name: '',
            value: 0,
            itemStyle: {
              normal: {
                color: '#0B4A6B'
              }
            }
          }]
        }, {
          stack: 'a',
          type: 'pie',
          radius: ['20%', '60%'],
          roseType: 'area',
          zlevel: 10,
          label: {
            normal: {
              show: true,
              formatter: '{c}',
              textStyle: {
                fontSize: 12
              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 10
            },
            emphasis: {
              show: false
            }
          },
          data: this.data
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
