<template>
  <div class="wrap">
    <div class="chart" ref="per">
        我是跟随人数组件
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['selectedFollow'],
  data () {
    return {
    // 获取的请求数据
      carefull: [],
      jack: [],
      jimi: [],
      linda: [],
      nightprofit: [],
      sara: [],
      seafly: [],
      tony: [],

      myChart: null
    }
  },
  // 由于初始化echarts实例对象需要使用到dom元素,因此必须要放到mounted中, 而不是created
  mounted () {
    this.initChart()
    this.getData()
  },
  computed: {
    selectedList: {
      get () {
        return this.carefull
      },
      set (value) {
        this.carefull = value
      }
    }
  },
  watch: {
    selectedFollow (newValue) {
      switch (newValue) {
        case ' Alexander Pavlenko':
          this.selectedList = this.carefull
          this.updateChart()
          break
        case 'Sarowar Jahan':
          this.selectedList = this.jack
          this.updateChart()
          break
        case 'Niccolo Tirelli':
          this.selectedList = this.jimi
          this.updateChart()
          break
        case 'Thien Long Do':
          this.selectedList = this.linda
          this.updateChart()
          break
        case 'Tho Minh Cao':
          this.selectedList = this.nightprofit
          this.updateChart()
          break
        case 'Anteno Harpa':
          this.selectedList = this.sara
          this.updateChart()
          break
        case 'Ady Suyoko ':
          this.selectedList = this.seafly
          this.updateChart()
          break
        case 'Michaela Kreindl':
          this.selectedList = this.tony
          this.updateChart()
          break
      }
    }
  },
  methods: {
    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.per, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get('/followers/getFollowers')
        if (res.data !== null) {
          console.log(res.data.data)
          const data = res.data.data
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          const obj1 = data[0]
          const obj2 = data[1]
          const obj3 = data[2]
          const obj4 = data[3]
          const obj5 = data[4]
          const obj6 = data[5]
          const obj7 = data[6]
          const obj8 = data[7]
          this.carefull = Object.keys(obj1).map(key => obj1[key]).slice(1)
          this.jack = Object.keys(obj2).map(key => obj2[key]).slice(1)
          this.jimi = Object.keys(obj3).map(key => obj3[key]).slice(1)
          this.linda = Object.keys(obj4).map(key => obj4[key]).slice(1)
          this.nightprofit = Object.keys(obj5).map(key => obj5[key]).slice(1)
          this.sara = Object.keys(obj6).map(key => obj6[key]).slice(1)
          this.seafly = Object.keys(obj7).map(key => obj7[key]).slice(1)
          this.tony = Object.keys(obj8).map(key => obj8[key]).slice(1)
          console.log(this.carefull)
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
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
        backgroundColor: 'transparent',
        normal: {
          top: 200,
          left: 300,
          width: 500,
          height: 400,
          zIndex: 6,
          backgroundColor: ''
        },
        color: ['rgba(245, 166, 35, 1)', 'rgba(19, 173, 255, 1)'],

        tooltip: {
          show: true,
          trigger: 'item',

          confine: true
        },
        legend: {
          show: true,
          icon: 'circle',
          left: '35%',
          top: '90%',
          orient: 'horizontal',
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },
          data: ['高一(1)班', '高一(2)班']
        },
        radar: {
          center: ['50%', '50%'],
          radius: '70%',
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          splitArea: {
            areaStyle: {
              color: ['transparent']
            }
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white'//
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'white'//
            }
          },
          indicator: [{
            name: '跟随人数'

          }, {
            name: '活跃度'

          }, {
            name: '稳定性'

          }, {
            name: '经验'

          }, {
            name: '金额'

          }]
        },
        series: [
          {
            name: this.selectedFollow,
            type: 'radar',
            symbol: 'circle',
            symbolSize: 10,
            areaStyle: {
              normal: {
                color: 'rgba(19, 173, 255, 0.9)'
              }
            },
            itemStyle: {
              color: 'rgba(19, 173, 255, 1)',
              borderColor: 'rgba(19, 173, 255, 0.3)',
              borderWidth: 10
            },
            lineStyle: {
              normal: {
                type: 'dashed',

                color: 'rgba(19, 173, 255, 1)',
                width: 2
              }
            },
            data: [this.selectedList]
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

<style lang="less" scoped>

</style>
