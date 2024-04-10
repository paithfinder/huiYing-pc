<template>
  <div class="wrap">
    <div class="chart" ref="trade">
        我是概率图
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    // 获取的请求数据
      data: [['2000-06-05', 116], ['2000-06-06', 129], ['2000-06-07', 135], ['2000-06-08', 86], ['2000-06-09', 73], ['2000-06-10', 85], ['2000-06-11', 73], ['2000-06-12', 68], ['2000-06-13', 92], ['2000-06-14', 130], ['2000-06-15', 245], ['2000-06-16', 139], ['2000-06-17', 115], ['2000-06-18', 111], ['2000-06-19', 309], ['2000-06-20', 206], ['2000-06-21', 137], ['2000-06-22', 128], ['2000-06-23', 85], ['2000-06-24', 94], ['2000-06-25', 71], ['2000-06-26', 106], ['2000-06-27', 84], ['2000-06-28', 93], ['2000-06-29', 85], ['2000-06-30', 73], ['2000-07-01', 83], ['2000-07-02', 125], ['2000-07-03', 107], ['2000-07-04', 82], ['2000-07-05', 44], ['2000-07-06', 72], ['2000-07-07', 106], ['2000-07-08', 107], ['2000-07-09', 66], ['2000-07-10', 91], ['2000-07-11', 92], ['2000-07-12', 113], ['2000-07-13', 107], ['2000-07-14', 131], ['2000-07-15', 111], ['2000-07-16', 64], ['2000-07-17', 69], ['2000-07-18', 88], ['2000-07-19', 77], ['2000-07-20', 83], ['2000-07-21', 111], ['2000-07-22', 57], ['2000-07-23', 55], ['2000-07-24', 60]],
      myChart: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  computed: {
    dataList () {
      return this.data.map(item => item[0])
    },
    valueList () {
      return this.data.map(item => item[1])
    }
  },

  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.trade, 'chalk')
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
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],
        grid: {
          width: '85%',
          height: '75%',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.dateList,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)'
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)'
            }
          }
        },
        series: {
          type: 'line',
          showSymbol: false,
          data: this.valueList

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

<style>

</style>
