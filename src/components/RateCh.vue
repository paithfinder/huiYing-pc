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

  data () {
    return {
      upColor: '#00da3c',
      downColor: '#ec0000',
      myChart: null,
      rawData: [],
      categoryData: [],
      values: [],
      volumes: []
    }
  },
  methods: {
    splitData (rawData) {
      // console.log(rawData)
      // 创建一个新的数组来存储处理后的数据
      const newCategoryData = []
      const newValues = []
      const newVolumes = []

      for (let i = 0; i < rawData.length; i++) {
        newCategoryData.push(rawData[i].splice(0, 1)[0])
        newValues.push(rawData[i])
        newVolumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
      }

      // 更新数据属性
      this.categoryData = newCategoryData
      this.values = newValues
      this.volumes = newVolumes
      console.log(this.categoryData)
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
          sum += this.values[i - j][1]
        }
        result.push(+(sum / dayCount).toFixed(3))
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
    getData () {
      // 假设你的数据API是下面这样的URL
      const dataUrl = 'http://localhost:8999/static/rate/stock-DJI.json'
      axios.get(dataUrl).then(response => {
        this.rawData = response.data
        this.splitData(this.rawData)
        this.updateChart()
      })
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
            start: 98,
            end: 100

          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '80%',
            start: 98,
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
            name: 'Volume',
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
