<template>
  <div class="wrap">
    <div class="chart" ref="win">
        我是胜率组件
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
      this.myChart = this.$echarts.init(this.$refs.win, 'chalk')
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
        // backgroundColor: '#2c343c',
        title: {

          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true, // 是否显示工具栏组件
          left: 2, // toolbox的定位位置
          itemSize: 30,
          bottom: '85%',

          feature: {
            myTool1: {
              show: true,

              title: '周',
              icon: 'image://static/img/home/trada/周.png',

              onclick: function () {
                alert('myToolHandler1')
              }

            },
            myTool2: {
              show: true,
              title: '返回首页',
              icon: 'image://static/img/home/trada/半个月.png',
              onclick: function () {
                alert('myToolHandler1')
              }
            },
            myTool3: {
              show: true,
              title: '返回首页',
              icon: 'image://static/img/home/trada/月.png',
              onclick: function () {
                alert('myToolHandler1')
              }
            }
          }
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
            data: [
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
            ].sort(function (a, b) {
              return a.value - b.value
            }),
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
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
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
