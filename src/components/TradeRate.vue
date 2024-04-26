<template>
  <div class="wrap">
    <div class="chart" ref="trade">
        我是概率图
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['selectedValue', 'gengpin'],
  data () {
    return {
      time: [],
      value: [],
      baseUrl: '/probablity//getProbablity/',
      date: '',
      ren: 'Alexander Pavlenko'

    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },

  watch: {
    selectedValue (newValue) {
      this.person = newValue
      this.getData()
    }
  },
  computed: {
    person: {
      get () {
        return this.ren
      },
      set (value) {
        this.ren = value
      }
    }
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.trade, 'chalk')
    },

    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + this.ren)
        if (res.data !== null) {
          console.log(res.data.data)
          this.time = res.data.data.data.map(item => item.time)
          this.value = res.data.data.data.map(item => item.value)
          this.date = res.data.data.time[0]
          this.$emit('gengpin', this.date + ' ' + res.data.data.data[9].time, res.data.data.data[9].value)

          console.log(this.time)
          console.log(this.value)
          console.log(this.date)
          // console.log(this.gengxin)
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
        grid: {
          top: 5,
          bottom: 20,
          right: '10%',
          left: '15%'

        },
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        xAxis: {
          type: 'category',
          data: this.time,
          axisLabel: {
            offset: 200, // 往右移动10像素
            textStyle: {
              color: 'rgba(255, 255, 255,0.7)' // 设置文字颜色为白色

            }
          },
          axisLine: {
            lineStyle: {
              color: 'white' // 设置轴线颜色为白色
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false // 设置为false，不显示y轴的网格线
          },
          axisLabel: {

            textStyle: {
              color: 'rgba(255, 255, 255,0.7)', // 设置文字颜色为白色
              fontSize: 8
            }
          }
        },
        series: [
          {
            data: this.value,
            type: 'line',
            smooth: true
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

<style>

</style>
