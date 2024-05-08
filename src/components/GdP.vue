<template>
  <div class="w">
    <div class="chart" ref="GDP">
        我是概率图
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      return () {
        this.timeData = []
        this.nowData = []
        this.pre = []
        this.qian = []
      }
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },

  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.GDP, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get('/GDP/getGDP', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data !== null) {
          console.log(res.data.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.timeData = res.data.data.map(item => item.time).reverse()
          this.nowData = res.data.data.map(item => item.now).reverse()
          this.pre = res.data.data.map(item => item.pre).reverse()
          this.qian = res.data.data.map(item => item.qian).reverse()
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
        backgroundColor: '#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: ['今值', '预测值', '前值'],
          right: 10,
          top: 12,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10
        // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: this.timeData,
          axisLine: {
            lineStyle: {
              color: 'white'

            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        },

        yAxis: {
          type: 'value',
          scale: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: 'white'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
          axisLabel: {}
        },
        dataZoom: [{
          show: true,
          height: 12,
          xAxisIndex: [
            0
          ],
          bottom: '8%',
          start: 94,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: { color: '#fff' },
          borderColor: '#90979c'
        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '今值',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fccb05'
              }, {
                offset: 1,
                color: '#f5804d'
              }]),
              barBorderRadius: 12
            }
          },
          data: this.nowData
        },
        {
          name: '预测值',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
              }, {
                offset: 1,
                color: '#09bcb7'
              }]),
              barBorderRadius: 11
            }

          },
          data: this.pre
        },
        {
          name: '前值',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#248ff7'
              }, {
                offset: 1,
                color: '#6851f1'
              }]),
              barBorderRadius: 11
            }
          },
          data: this.qian
        }]
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
.w{
  width:100%;
  height:100%
}
</style>
