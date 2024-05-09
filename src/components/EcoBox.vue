<template>
<div class="littleBox">
    <div class="text">
        <img :src=this.imgUrl alt="">
        <div style="margin-left:0.05rem;">{{ name }}</div>
    </div>
    <div class="tu">
        <div class="chart" ref="circle"></div>

    </div>
</div>
</template>

<script>
export default {
  props: ['name', 'duotou', 'kongtou', 'imgUrl'],

  mounted () {
    // console.log(this.show)
    this.initChart()
    this.getData()
  },
  watch: {
    duotou (newValue) {
      this.updateChart()
    }
  },

  methods: {

    initChart () {
      // 初始化echarts实例对象
      this.myChart = this.$echarts.init(this.$refs.circle, 'chalk')
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          confine: true
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          data: ['多头', '空头'],
          bottom: '10%',
          icon: 'circle',
          itemGap: 50
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            radius: '40%',
            center: ['50%', '35%'],
            label: {
              show: true,
              formatter: '{d}%'
            },
            data: [
              {
                value: this.duotou,
                name: '多头',
                itemStyle: {
                  normal: { color: '#ffc545' },
                  emphasis: { color: '#ffc545' }
                }
              },
              {
                value: this.kongtou,
                name: '空头',
                itemStyle: {
                  normal: { color: '#22cfe0' },
                  emphasis: { color: '#22cfe0' }
                }
              }
            ]
          },
          {
            name: '大环',
            type: 'gauge',
            splitNumber: 30,
            radius: '34%',
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
              show: false
            },
            axisTick: {
              show: true,
              length: 5,
              lineStyle: {
                color: '#1cbdca'
              }
            },
            splitLine: {
              show: false,
              length: 3
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            }
          },
          {
            type: 'pie',
            zlevel: 2,
            silent: true,
            radius: ['56%', '58%'],
            center: ['50%', '35%'],
            startAngle: 85,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this._pie2()
          }
        ]
      }
      this.myChart.setOption(option)
      // 使用箭头函数确保在事件监听器内部能够访问到Vue组件实例的上下文
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    _pie2 () {
      const dataArr = []
      for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: 18,
            itemStyle: {
              normal: {
                color: '#1fbfcd',
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0)'
              }
            }
          })
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: 2,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0)'
              }
            }
          })
        }
      }
      return dataArr
    }

  }
}
</script>

<style scoped lang="less">
.littleBox {
    width:1.55rem;
    height:1.3rem;
    background-color: #fff;

    .text{
        width:1rem;
        height:0.2rem;
        margin:0 auto;
        margin-top:0.05rem;
        display:flex;
        justify-content:center;
        align-items: center;
        img{
            width:0.1rem;
            height:0.1rem;
        }

    }
    .tu{
        margin-top:0.05rem;
        width:1.55rem;
        height:1rem;
        background-color: #f7fdff;
        .chart{
            height:1rem;

        }
    }
}
</style>
