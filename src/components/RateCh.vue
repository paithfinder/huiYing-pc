<template>
  <div class="wrap">

    <div class="chart" ref="rate">
        我是汇率组件
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['radio', 'selectedSymbol'],

  data () {
    return {
      upColor: 'rgba(239, 35, 42, 0.4)',
      downColor: 'rgba(20, 177, 67, 0.4)',
      defaultState: '交易中',
      myChart: null,
      rawData: [],
      categoryData: [],
      values: [],
      volumes: [],
      baseUrl: '/currencyExchangeCharts/getCurrencyExchangeChartsData',
      // kUrl: '/currencyExchangeCharts/getCurrencyExchangeChartsData/EURAUD/noTime/近24h',
      defaultName: 'EURAUD',
      defaultBut: '近24h'
    }
  },
  watch: {
    radio (newValue) {
      this.button = newValue
      console.log(this.button)
      this.getData()
      this.updateChart()
    },
    selectedSymbol (newValue) {
      this.name = newValue
      console.log(this.name)
      this.getData()
      this.updateChart()
    }
  },
  computed: {
    state: {
      get () {
        return this.defaultState
      },
      set (value) {
        this.defaultState = value
      }
    },
    name: {
      get () {
        return this.defaultName
      },
      set (value) {
        this.defaultName = value
      }
    },

    button: {
      get () {
        return this.defaultBut
      },
      set (value) {
        this.defaultBut = value
      }
    }
  },
  methods: {
    splitData (rawData) {
    // 创建一个新的数组来存储处理后的数据
      const newCategoryData = []
      const newValues = []
      const newVolumes = []

      // 遍历原始数据
      rawData.forEach(item => {
      // 提取日期作为X轴数据
        newCategoryData.push(item.Time)
        // 提取OHLC数据作为K线图的数据
        newValues.push([item.Open, item.Close, item.Low, item.High])
      })

      for (let i = 0; i < rawData.length; i++) {
        const time = rawData[i].Time
        const tickVolume = rawData[i].Tick_volume
        const spread = rawData[i].Spread
        const isBuy = spread === '1' // 如果Spread是1，则表示买入

        newVolumes.push([time, tickVolume, isBuy ? 1 : -1])
      }
      // 更新数据属性
      this.categoryData = newCategoryData
      this.values = newValues
      this.volumes = newVolumes
      console.log(this.volumes)

      this.updateChart()
    },
    calculateMA (dayCount) {
      const result = []
      for (let i = 0, len = this.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount; j++) {
          sum += +this.values[i - j][1]
        }
        result.push(sum / dayCount)
      }
      return result
    },
    initChart () {
      this.myChart = this.$echarts.init(this.$refs.rate, 'chalk')
      // 设置图表选项
      this.myChart.setOption({
        // ...（这里填写你的ECharts配置）
      })
    },
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + '/' + this.name + '/' + this.button)
        console.log(res.data)
        if (res.data.data !== null) {
          console.log(res.data)
          this.rawData = res.data.data
          this.splitData(this.rawData)
          if (res.data.weekend === true) {
            this.state = '停盘中'
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateChart () {
      const option = {
        animation: false,
        legend: {
          bottom: 20,
          left: 'center',
          data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          },
          position: function (pos, params, el, elRect, size) {
            const obj = {
              top: 10
            }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
            return obj
          }
          // extraCssText: 'width: 170px'
        },
        axisPointer: {

          link: [
            {
              xAxisIndex: 'all'
            }
          ],
          label: {
            backgroundColor: '#777'
          }
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: false
        //     },
        //     brush: {
        //       type: ['lineX', 'clear']
        //     }
        //   }
        // },
        brush: {

          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          }
        },
        visualMap: {

          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [
            {
              value: 1,
              color: this.downColor
            },
            {
              value: -1,
              color: this.upColor
            }
          ]
        },
        grid: [
          {
            left: '5%',
            right: '8%',
            height: '60%',
            top: '5%'
          },
          {
            left: '10%',
            right: '8%',
            top: '70%',
            height: '10%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: this.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              z: 100
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: this.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            min: 'dataMin',
            max: 'dataMax'
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 50,
            end: 100

          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '80%',
            start: 50,
            end: 100

          }
        ],
        series: [
          {
            name: 'Dow-Jones index',
            type: 'candlestick',
            data: this.values,
            itemStyle: {
              color: this.upColor,
              color0: this.downColor,
              borderColor: undefined,
              borderColor0: undefined
            }
          },

          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(30),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'tick-Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.volumes
          }

        ]
      }
      this.myChart.setOption(option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  }

  // watch: {
  //   // 监听数据变化来更新图表
  //   rawData: {
  //     handler (newValue) {
  //       if (newValue.length) {
  //         this.splitData(newValue)
  //         // 更新图表
  //         this.myChart.setOption({
  //           // ...（这里使用处理后的数据更新图表选项）
  //         })
  //       }
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>
/* 在这里添加样式 */
</style>
