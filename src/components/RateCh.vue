<template>
  <div class="wrap">

    <div class="chart" ref="rate">
        我是汇率组件
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
      data: [],
      now: new Date(1997, 9, 3),
      oneDay: 24 * 3600 * 1000,
      value: Math.random() * 1000
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    // console.log(this.show)
    this.push()
    this.initChart()
    this.getData()
  },
  created () {
    this.randomData()

    // 在 Vue 的 created 钩子中调用 updateChartData 函数
    this.updateChartData()
  },
  computed: {

  },
  methods: {
    updateChartData () {
      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          this.data.shift()
          this.data.push(this.randomData())
        }
        this.myChart.setOption({
          series: [
            {
              data: this.data
            }
          ]
        })
      }, 1000)
    },
    randomData () {
      this.now = new Date(+this.now + this.oneDay)
      this.value = this.value + Math.random() * 21 - 10
      return {
        name: this.now.toString(),
        value: [
          [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
          Math.round(this.value)
        ]
      }
    },
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.rate, 'chalk')
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
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            const date = new Date(params.name)
            return (
              date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
            )
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        grid: {
          left: '5%',
          right: '5%'
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: this.data
          }
        ]
      }
      this.myChart.setOption(option)
      // 使用箭头函数确保在事件监听器内部能够访问到Vue组件实例的上下文
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },

    push () {
      for (let i = 0; i < 1000; i++) {
        this.data.push(this.randomData())
      }
    }

  }

}
</script>

<style lang="less" scoped>

</style>
