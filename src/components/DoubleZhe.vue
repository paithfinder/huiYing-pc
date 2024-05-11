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
  props: ['pro1', 'pro2'],
  data () {
    return {
      time: [],
      value1: [250, 300],
      value2: [],
      baseUrl: '/probablity//getProbablity/',
      date: ''

    }
  },
  mounted () {
    this.initChart()
    this.getPro1()
    this.getPro2()
    this.updateChart()
  },

  computed: {

  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.trade, 'chalk')
    },

    // 获取数据
    async getPro1 () {
      try {
        const res = await axios.get(this.baseUrl + this.$store.state.name[0], {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data !== null) {
          console.log(res.data)
          console.log(res.data.data)
          this.time = res.data.data.data.map(item => item.time)
          this.value1 = res.data.data.data.map(item => item.value)
          this.date = res.data.data.time[0]
          this.$emit('pro1', this.date + ' ' + res.data.data.data[9].time, res.data.data.data[9].value)

          console.log(this.time)
          console.log(this.value)
          console.log(this.date)
        }
      } catch (error) {
        console.log(error)
      }
      this.updateChart()
    },
    async getPro2 () {
      try {
        const res = await axios.get(this.baseUrl + this.$store.state.name[1], {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data !== null) {
          console.log(res.data)
          console.log(res.data.data)
          this.value2 = res.data.data.data.map(item => item.value)
          console.log(this.value2)
          console.log('折线图')
          this.$emit('pro2', res.data.data.data[9].value)
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
          trigger: 'axis',
          confine: true
        },
        legend: {
          data: [this.$store.state.name[0], this.$store.state.name[1]],
          top: '0%',

          left: '35%',
          textStyle: { // 设置legend的字体颜色
            color: '#fff',
            fontSize: 8
          }
        },
        grid: {
          top: '20%',
          left: '5%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.time,
          axisLine: { // 隐藏x轴的轴线
            show: false
          },
          axisLabel: { // 设置x轴标签的字体颜色
            color: '#fff',
            fontSize: 8
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { // 设置y轴标签的字体颜色
            color: '#fff',
            fontSize: 8
          },
          splitLine: { // 隐藏y轴的分割线
            show: false
          }
        },
        series: [
          {
            name: this.$store.state.name[0],
            type: 'line',
            stack: 'Total',
            data: this.value1
          },
          {
            name: this.$store.state.name[1],
            type: 'line',
            stack: 'Total',
            data: this.value2
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
