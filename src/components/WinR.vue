<template>
  <div class="wrap">
    <div class="chart" ref="win">
        我是胜率组件
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['valueWin'],
  data () {
    return {
    // 获取的请求数据
      winData: [],
      baseUrl: '/winRate/getWinRate/',
      t: '近一周',
      defaultData: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 274, name: 'Union Ads' },
        { value: 235, name: 'Video Ads' },
        { value: 400, name: 'Search Engine' },
        { value: 305, name: 'Direct' },
        { value: 430, name: 'Email' },
        { value: 174, name: 'Union Ads' },
        { value: 285, name: 'Video Ads' },
        { value: 200, name: 'Search Engine' }
      ],
      myChart: null
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()

    this.getData()
  },
  computed: {
    time: {
      get () {
        return this.t
      },
      set (value) {
        this.t = value
      }
    }
  },
  watch: {
    valueWin (newValue) {
      console.log(newValue)
      this.time = newValue
      this.getData()
    }
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.win, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get(this.baseUrl + this.time, {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data.data !== null) {
          console.log(res.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.winData = res.data
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
          this.$nextTick(() => {
            this.updateChart()
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 处理数据并且更新图表
    updateChart () {
      // 处理请求返回的数据

      // 图表的相关配置
      const option = {
        // backgroundColor: '#2c343c',

        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true, // 是否显示工具栏组件
          left: 2, // toolbox的定位位置
          itemSize: 30,
          bottom: '85%'

        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '85%',
            center: ['50%', '50%'],
            data: this.winData.sort(function (a, b) {
              return a.value - b.value
            }).map((item, index) => ({
              value: item.value,
              name: item.name,
              itemStyle: {
                color: [
                  '#aa0000',
                  '#cc6600',
                  '#bbbb00',
                  '#00aa00',
                  '#00aaaa',
                  '#0000aa',
                  '#66009d',
                  '#4682b4'
                ][index % 8] // 示例颜色数组
              }
            })),

            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.7)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
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
