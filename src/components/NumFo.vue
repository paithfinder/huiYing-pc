<template>
  <div class="wrap">
    <div class="chart" ref="per">
        我是跟随人数组件
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
      this.myChart = this.$echarts.init(this.$refs.per, 'chalk')
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
        polar: {
          radius: [10, '75%']
        },
        angleAxis: {
          max: 4,
          startAngle: 75,
          axisLabel: {
            color: 'rgba(255,255,255,0.7)'
          }
        },

        radiusAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd'],
          axisLabel: {
            color: 'rgba(255,255,255,0.7)'
          }

        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
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
