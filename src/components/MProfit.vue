<template>
  <div class="wrap">
    <div class="chart" ref="pro">
        我是月盈利组件
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['valuePro'],
  data () {
    return {
    // 获取的请求数据
      proData: [],
      t: '2024年',
      baseUrl: '/winRate/getWinProfit/',
      myChart: null,
      labelRight: {
        position: 'right'
      },
      defaultData: [
        -0.07,
        -0.09,
        0.2,
        0.44,
        -0.23,
        0.08,
        -0.17,
        0.47,
        -0.36,
        0.18
      ],
      myData: ['Alexander Pavlenko', 'Sarowar Jahan', 'Niccolo Tirelli', 'Thien Long Do', 'Tho Minh Cao', 'Anteno Harpa', 'Ady Suyoko', 'Michaela Kreindl'],
      databeast: {
        1: [389, 259, 262, 324, 232, 176, 196, 214, 133, 370, 268, 360, 185, 392, 392, 153],
        2: [111, 315, 139, 375, 204, 352, 163, 258, 385, 209, 209, 243, 204, 352, 163, 258],
        3: [227, 210, 328, 292, 241, 110, 130, 185, 392, 392, 153, 187, 150, 200, 250, 300]

      },
      databeauty: {
        1: [121, 388, 233, 309, 133, 308, 297, 283, 349, 273, 229, 238, 224, 291, 185, 203],
        2: [200, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
        3: [380, 129, 173, 101, 310, 393, 386, 296, 366, 268, 208, 149, 356, 239, 208, 330],
        4: [363, 396, 388, 108, 325, 120, 180, 292, 200, 309, 223, 236, 209, 271, 215, 216],
        5: [300, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
        6: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
        7: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163],
        8: [389, 259, 262, 324, 232, 176, 196, 214, 133, 370, 268, 360, 185, 392, 392, 153],
        9: [111, 315, 139, 375, 204, 352, 163, 258, 385, 209, 209, 243, 204, 352, 163, 258],
        10: [227, 210, 328, 292, 241, 110, 130, 185, 392, 392, 153, 187, 150, 200, 250, 300],
        11: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
        12: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 263, 302, 372, 163]
      },
      timeLineData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  computed: {
    time: {
      get () {
        return this.t
      },
      set (value) {
        this.t = value
      }
    }
  },
  watch: {
    valuePro (newValue) {
      console.log(newValue)
      this.time = newValue
      this.getData()
    }
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.pro, 'chalk')
    },

    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + this.time)
        if (res.data !== null) {
          console.log(res.data)
          const data = res.data
          const loss = data.loss
          const profit = data.profit
          this.databeast = loss
          this.databeauty = profit
          // console.log(this.databeast)
          // console.log(this.databeauty)
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
          this.$nextTick(() => {
            this.updateChart()
          })
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
        baseOption: {
          backgroundColor: 'transparent',
          timeline: {
            show: true,
            axisType: 'category',

            tooltip: {
              show: true,
              formatter: function (params) {
                console.log(params)
                return params.name + '月份数据统计'
              }
            },

            controlStyle: {
              showPlayBtn: false
            },

            autoPlay: false,
            currentIndex: 3,
            // playInterval: 1000,
            label: {
              normal: {
                show: true,
                interval: '',
                formatter: '{value}月',

                fontSize: 9
              },
              emphasis: {
                fontSize: 9,
                color: '#fff'
              }

            },
            data: []
          },

          legend: {
            data: ['亏损', '盈利'],
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: '{b}<br/>{a}: {c}美元',
            axisPointer: {
              type: 'shadow'
            }
          },

          toolbox: {
            right: 10,
            showTitle: false,
            itemSize: 17,
            iconStyle: {
              color: '#ccc',
              borderWidth: 0
            },
            feature: {

              magicType: {
                type: ['line', 'bar']

              }

              // brush: {},
            }
          },

          grid: [{
            show: false,
            left: '2%',
            top: 30,
            bottom: 50,

            containLabel: true,
            width: '40%'

          }, {
            show: false,
            left: '50.5%',
            top: 50,
            bottom: 40,
            width: '0%'
          }, {
            show: false,
            right: '2%',
            top: 30,
            bottom: 50,
            containLabel: true,
            width: '40%'

          }],

          xAxis: [
            {
              type: 'value',
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#fff',
                  width: 1,
                  type: 'solid'
                }
              }
            }, {
              gridIndex: 1,
              show: false
            }, {
              gridIndex: 2,
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#fff',
                  width: 1,
                  type: 'solid'
                }
              }
            }],
          yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 8,
              textStyle: {
                color: '#fff',
                fontSize: 12
              }

            },
            data: this.myData
          }, {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,0.8)',
                fontSize: 10
              }

            },
            data: this.myData.map(function (value) {
              return {
                value: value,
                textStyle: {
                  align: 'center'
                }
              }
            })
          }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: '#9D9EA0',
                fontSize: 12
              }

            },
            data: this.myData
          }],
          series: []

        },

        options: []

      }
      for (let i = 0; i < this.timeLineData.length; i++) {
        option.baseOption.timeline.data.push(this.timeLineData[i])
        option.options.push({

          series: [
            {
              name: '亏损',
              type: 'bar',
              barGap: 20,
              barWidth: 10,

              label: {
                normal: {
                  show: false,
                  fontSize: 9
                },
                emphasis: {
                  show: true,
                  position: 'left',
                  offset: [0, 0],
                  textStyle: {
                    color: '#fff',
                    fontSize: 10
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#659F83'

                },
                emphasis: {
                  color: '#08C7AE'

                }
              },
              data: this.databeast[this.timeLineData[i]]
            },

            {
              name: '盈利',
              type: 'bar',
              barGap: 20,
              barWidth: 10,
              xAxisIndex: 2,
              yAxisIndex: 2,
              label: {
                normal: {
                  show: false,
                  fontSize: 9
                },
                emphasis: {
                  show: true,
                  position: 'right',
                  offset: [0, 0],
                  textStyle: {
                    color: '#fff',
                    fontSize: 10
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F68989'
                },
                emphasis: {
                  color: '#F94646'
                }
              },
              data: this.databeauty[this.timeLineData[i]]
            }
          ]
        })
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

</style>
