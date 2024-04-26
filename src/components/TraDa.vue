<template>
  <div class="wrap">
    <div class="chart" ref="date">
        我是交易日期组件
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['valueRili'],
  data () {
    return {
      radio1: '上海',
      // 获取的请求数据
      winData: [],
      dateRange: [],
      myChart: null,
      baseUrl: '/calendarTables/getCalendarTables/',
      n: 'Alexander Pavlenko',
      graphData: [
        ['2017-02-01 08:23:00', -260, 'GPY/USD'],
        ['2017-02-04 08:23:00', -200, 'GPY/USD'],
        ['2017-02-09 08:23:00', -279, 'GPY/USD'],
        ['2017-02-13 08:23:00', -847, 'GPY/USD'],
        ['2017-02-18 08:23:00', -241, 'GPY/USD'],
        ['2017-02-23 08:23:00', -411, 'GPY/USD'],
        ['2017-03-14 08:23:00', -985, 'GPY/USD'],
        ['2017-04-14 08:23:00', -985, 'GPY/USD']
      ],
      doubleData: [
        ['2017-02-03 08:23:00', -260, 'GPY/USD'],
        ['2017-02-06 08:23:00', -200, 'GPY/USD'],
        ['2017-02-09 08:23:00', -279, 'GPY/USD'],
        ['2017-03-13 08:23:00', -847, 'GPY/USD'],
        ['2017-03-18 08:23:00', -241, 'GPY/USD'],
        ['2017-02-23 08:23:00', -411, 'GPY/USD'],
        ['2017-03-14 08:23:00', -985, 'GPY/USD'],
        ['2017-04-14 08:23:00', -985, 'GPY/USD']
      ]
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  watch: {
    valueRili (newValue) {
      this.name = newValue
      this.getData()
    }
  },
  computed: {
    links () {
      return this.graphData.map((item, idx) => {
      // 当到达最后一个元素时，我们不希望target超出数组长度
      // 所以这里需要判断idx是否为最后一个元素的索引
        const target = idx < this.graphData.length - 1 ? idx + 1 : null
        return {
          source: idx,
          target: target
        }
      }).filter(item => item.target !== null) // 过滤掉无效的target
    },
    name: {
      get () {
        return this.n
      },
      set (value) {
        this.n = value
      }
    }
  },
  methods: {
    getVirtualData (year) {
      const date = +this.$echarts.time.parse(year + '-01-01')
      const end = +this.$echarts.time.parse(+year + 1 + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          this.$echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          0
        ])
      }
      return data
    },
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.date, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + this.name)
        if (res.data !== null) {
          console.log(res.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.graphData = res.data.profit.map(item => [
            item.time,
            item.value,
            item.symbol
          ])
          this.doubleData = res.data.loss.map(item => [
            item.time,
            item.value,
            item.symbol
          ])
          this.dateRange = res.data.time
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
        tooltip: {
          confine: true,
          formatter: function (params) {
            // params.data 是当前鼠标悬停的数据项
            if (params.data) {
              // 假设您的 graphData 数组中的每个元素都是一个包含日期和数值的数组
              // 例如：['2017-02-01', 260]
              console.log(params)
              const date = params.data[0] // 日期
              const value = params.data[1] // 数值
              const huobi = params.data[2]
              // 返回您想要在 tooltip 中显示的内容
              return date + '<br>' + huobi + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + value
            }
            return ''
          }
        },
        calendar: {
          top: '21%',
          left: 'center',
          orient: 'horizontal',
          cellSize: 20,
          itemStyle: {
            borderColor: '#00ffff'
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          yearLabel: {
            margin: 40,
            fontSize: 15,
            position: 'top',
            color: '#fff'

          },
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn',
            color: '#00ffff'
          },
          monthLabel: {
            nameMap: 'cn',
            margin: 15,
            fontSize: 12,
            color: '#00ffff'
          },

          range: this.dateRange
        },
        visualMap: {
          pieces: [
            { gt: 0, label: '盈利', color: 'rgba(187, 67, 75)' },
            { lte: 0, label: '亏损', color: 'rgba(80, 208, 94)' }
          ],
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          bottom: 30,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',
            symbolSize: 15,
            calendarIndex: 0,
            itemStyle: {

              shadowBlur: 9,
              shadowOffsetX: 1.5,
              shadowOffsetY: 3,
              shadowColor: '#555'
            },
            lineStyle: {
              color: '#00ffff',
              width: 1,
              opacity: 1
            },
            data: this.graphData,
            z: 20
          },
          {
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',

            symbolSize: 15,
            calendarIndex: 0,
            itemStyle: {

              shadowBlur: 9,
              shadowOffsetX: 1.5,
              shadowOffsetY: 3,
              shadowColor: '#555'
            },
            lineStyle: {
              color: '#e53e31',
              width: 1,
              opacity: 1
            },
            data: this.doubleData,
            z: 20
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.getVirtualData('2017')
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
