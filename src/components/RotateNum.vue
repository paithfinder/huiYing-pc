<template>
  <div class="wrap">
    <div class="chart" ref="rotate">

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
      this.myChart = this.$echarts.init(this.$refs.rotate, 'chalk')
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
        series: [
          {
            type: 'gauge',
            center: ['50%', '62%'],
            radius: '90%', // 增加半径以放大表盘
            axisLine: {
              lineStyle: {
                width: 5,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },

            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 15,
              fontSize: 9
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} %',
              color: 'inherit',
              textStyle: {
                fontSize: 20 // 将字体大小调整为较小的值
              }
            },
            data: [
              {
                value: 70
              }
            ]
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
