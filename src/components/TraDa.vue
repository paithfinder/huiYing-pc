<template>
  <div class="wrap">

    <div class="chart" ref="date">
        我是交易日期组件
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
      radio1: '上海',
      // 获取的请求数据
      winData: [],

      myChart: null,
      hours: [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ],
      // prettier-ignore
      days: [
        'Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'
      ],
      data: [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    // console.log(this.show)
    this.initChart()
    this.getData()
  },
  computed: {
    processedData () {
      return this.data.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      })
    }

  },
  methods: {

    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.date, 'chalk')
    },
    // 获取数据
    async getData () {
      this.updateChart()
    },
    // 处理数据并且更新图表
    updateChart () {
      // 处理请求返回的数据

      // 图表的相关配置

      const option = {
        tooltip: {
          position: 'inside'

        },
        toolbox: {
          show: true, // 是否显示工具栏组件
          right: 20, // toolbox的定位位置
          itemSize: 30,
          bottom: '85%',

          feature: {
            myTool1: {
              show: true,

              title: '周',
              icon: 'image://static/img/home/trada/周.png',

              onclick: function () {
                alert('myToolHandler1')
              }

            },
            myTool2: {
              show: true,
              title: '返回首页',
              icon: 'image://static/img/home/trada/半个月.png',
              onclick: function () {
                alert('myToolHandler1')
              }
            },
            myTool3: {
              show: true,
              title: '返回首页',
              icon: 'image://static/img/home/trada/月.png',
              onclick: function () {
                alert('myToolHandler1')
              }
            }
          }
        },

        grid: {
          height: '60%',
          width: '75%',
          top: '15%',
          left: '17%'

        },
        xAxis: {
          type: 'category',
          data: this.hours,
          splitArea: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.5)'
            }
          }

        },
        yAxis: {
          type: 'category',
          data: this.days,
          splitArea: {
            show: true
          },
          nameTextStyle: {
            fontSize: 0.5
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.5)'
            }
          }
        },

        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          itemWidth: 10,
          textStyle: {
            color: 'rgba(255,255,255,0.5)'
          }

        },
        series: [
          {
            name: 'Punch Card',
            type: 'heatmap',
            data: this.processedData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
