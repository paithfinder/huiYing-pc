<template>
  <div class="wrap">
    <div class="chart" ref="pro">
        我是月盈利组件
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    // 获取的请求数据
      winData: [],
      myChart: null
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.pro, 'chalk')
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
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, 'Matcha Latte'],
            [57.1, 78254, 'Milk Tea'],
            [74.4, 41032, 'Cheese Cocoa'],
            [50.1, 12755, 'Cheese Brownie'],
            [89.7, 20145, 'Matcha Cocoa'],
            [68.1, 79146, 'Tea'],
            [19.6, 91852, 'Orange Juice'],
            [10.6, 101852, 'Lemon Juice'],
            [32.7, 20112, 'Walnut Brownie']
          ]
        },
        grid: {
          containLabel: true,
          top: '5%',
          left: '8%',
          right: '15%',
          bottom: '10%'

        },
        toolbox: {
          show: true, // 是否显示工具栏组件
          left: 2, // toolbox的定位位置
          itemSize: 30,
          width: 2,
          itemGap: 0.1,

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
        xAxis: {
          name: 'amount',
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.6)'
            }
          }

        },
        yAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10'

            }
          }

        },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          bottom: '0',

          min: 10,
          max: 100,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          },
          textStyle: {
            color: 'rgba(255,255,255,0.5)',
            fontSize: '10'
          },
          itemWidth: '5%'

        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
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
