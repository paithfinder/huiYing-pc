<template>
  <div class="wrap">
    <div class="chart" ref="map">
            我是世界地图
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import 'echarts/map/js/world.js'
export default {

  data () {
    return {
      // 获取的请求数据
      winData: [],
      myChart: null,
      // 澳大利亚
      Aus: [{}],
      // 加拿大
      Canada: [{}],
      // 瑞士
      chf: [{}],
      // 欧洲
      Europe: [{}],
      // 英国
      Uk: [{}],
      // 日本
      Japan: [{}],
      // 美国
      American: [{}]

    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    initChart () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.map, 'chalk')
    },
    // 获取数据
    async getData () {
      try {
        const res = await axios.get('/worldMap/getWorldMap')

        if (res.data.data !== null) {
          // console.log(res.data.data)
          const data = res.data.data
          console.log(data)
          this.Aus = data.aud
          this.Canada = data.cad
          this.chf = data.chf
          this.Europe = data.eur
          this.Uk = data.gbp
          this.Japan = data.jpy
          this.American = data.usd
          console.log(this.Aus, this.Canada, this.chf, this.Europe, this.Uk, this.Japan, this.American)
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
      /**
         * 显示点的坐标
         */
      const geoCoordMap = {
        UK: [-0.1276, 51.5074], // 英国的坐标（经度，纬度）
        Japan: [139.6503, 35.6762], // 日本的坐标（经度，纬度）
        USA: [-95.7129, 37.0902], // 美国的坐标（经度，纬度）
        Switzerland: [6.9967, 46.9483], // 瑞士的坐标（经度，纬度）
        Canada: [-106.3468, 56.1304], // 加拿大的坐标（经度，纬度）
        Europe: [2.3522, 48.8566] // 欧洲的坐标（经度，纬度）
      }
      /**
         * 所在点对应数据
         * 上面数据添加修改后务必这里添加修改，value可不用
         */
      const data = [{
        id: 1,
        name: 'Canada'
      }, {
        id: 2,
        name: 'USA'
      }, {
        id: 3,
        name: 'UK'
      },
      {
        id: 4,
        name: 'Japan'
      },
      {
        id: 5,
        name: 'Switzerland'
      },
      {
        id: 6,
        name: 'Europe'
      }]
      //  生成出线方法
      function formtGCData (geoData, data, srcNam, dest) {
        const tGeoDt = []
        if (dest) {
          for (let i = 0; i < data.length; i++) {
            if (srcNam !== data[i].name) {
              tGeoDt.push({
                coords: [geoData[srcNam], geoData[data[i].name]]
              })
            }
          }
        } else {
          for (let j = 0; j < data.length; j++) {
            if (srcNam !== data[j].name) {
              tGeoDt.push({
                coords: [geoData[data[j].name], geoData[srcNam]]
              })
            }
          }
        }
        return tGeoDt
      }
      //  生成进线方法
      function formtVData (geoData, data, srcNam) {
        const tGeoDt = []
        for (let i = 0; i < data.length; i++) {
          const tNam = data[i].name
          if (srcNam !== tNam) {
            tGeoDt.push({
              name: tNam,
              value: geoData[tNam]
            })
          }
        }
        tGeoDt.push({
          name: srcNam,
          value: geoData[srcNam],
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: 'red',
              borderColor: '#000'
            }
          }
        })
        return tGeoDt
      }

      const planePath = 'arrow'
      // 绘制图表
      const option = ({
        title: {
          itemStyle: {
            normal: {
              borderColor: 'rgba(100,149,237,1)',
              borderWidth: 0.5,
              areaStyle: {
                color: '#fff'
              }
            }
          }
        },
        dataRange: {
          show: false, //  调色板显示与否
          min: 0,
          max: 1000000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue'] //  生成地图颜色以及发散点颜色

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params.data)
          }
        },
        geo: {
          map: 'world',
          width: '100%',
          height: '85%',
          label: {
            emphasis: {
              show: false
            }
          },

          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              areaColor: '#37376e',
              borderColor: '#000'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'world',
            zoom: 1,
            width: '100%',
            height: '85%',
            mapLocation: {
            // x: 300,
            // y: 50
            },
            itemStyle: {
              emphasis: { label: { show: true } }
            },
            // 对应生成地图颜色板块数据
            data: [
              { name: 'United Kingdom', value: '' },
              { name: 'Japan', value: '' },
              { name: 'Canada', value: '' },
              { name: 'United States', value: '' },
              { name: 'Switzerland', value: '' },
              { name: 'Europe', value: '' },
              { name: 'Australia', value: '' }

              // { name: 'Afghanistan' },
              // { name: 'Angola', value: 19549.124 },
              // { name: 'Albania', value: 3150.143 },
              // { name: 'United Arab Emirates', value: 8441.537 },
              // { name: 'Argentina', value: 40374.224 },
              // { name: 'Armenia', value: 2963.496 },
              // { name: 'French Southern and Antarctic Lands', value: 268.065 },

              // { name: 'Austria', value: 8401.924 },
              // { name: 'Azerbaijan', value: 9094.718 },
              // { name: 'Burundi', value: 9232.753 },
              // { name: 'Belgium', value: 10941.288 },
              // { name: 'Benin', value: 9509.798 },
              // { name: 'Burkina Faso', value: 15540.284 },
              // { name: 'Bangladesh', value: 151125.475 },
              // { name: 'Bulgaria', value: 7389.175 },
              // { name: 'The Bahamas', value: 66402.316 },
              // { name: 'Bosnia and Herzegovina', value: 3845.929 },
              // { name: 'Belarus', value: 9491.07 },
              // { name: 'Belize', value: 308.595 },
              // { name: 'Bermuda', value: 64.951 },
              // { name: 'Bolivia', value: 716.939 },
              // { name: 'Brazil', value: 195210.154 },
              // { name: 'Brunei', value: 27.223 },
              // { name: 'Bhutan', value: 716.939 },
              // { name: 'Botswana', value: 1969.341 },
              // { name: 'Central African Republic', value: 4349.921 },

              // { name: 'Chile', value: 17150.76 },
              // { name: 'China', value: 1359821.465 },
              // { name: 'Ivory Coast', value: 60508.978 },
              // { name: 'Cameroon', value: 20624.343 },
              // { name: 'Democratic Republic of the Congo', value: 62191.161 },
              // { name: 'Republic of the Congo', value: 3573.024 },
              // { name: 'Colombia', value: 46444.798 },
              // { name: 'Costa Rica', value: 4669.685 },
              // { name: 'Cuba', value: 11281.768 },
              // { name: 'Northern Cyprus', value: 1.468 },
              // { name: 'Cyprus', value: 1103.685 },
              // { name: 'Czech Republic', value: 10553.701 },
              // { name: 'Germany', value: 83017.404 },
              // { name: 'Djibouti', value: 834.036 },
              // { name: 'Denmark', value: 5550.959 },
              // { name: 'Dominican Republic', value: 10016.797 },
              // { name: 'Algeria', value: 37062.82 },
              // { name: 'Ecuador', value: 15001.072 },
              // { name: 'Egypt', value: 78075.705 },
              // { name: 'Eritrea', value: 5741.159 },
              // { name: 'Spain', value: 46182.038 },
              // { name: 'Estonia', value: 1298.533 },
              // { name: 'Ethiopia', value: 87095.281 },
              // { name: 'Finland', value: 5367.693 },
              // { name: 'Fiji', value: 860.559 },
              // { name: 'Falkland Islands', value: 49.581 },
              // { name: 'France', value: 63230.866 },
              // { name: 'Gabon', value: 1556.222 },

              // { name: 'Georgia', value: 4388.674 },
              // { name: 'Ghana', value: 24262.901 },
              // { name: 'Guinea', value: 10876.033 },
              // { name: 'Gambia', value: 1680.64 },
              // { name: 'Guinea Bissau', value: 10876.033 },
              // { name: 'Equatorial Guinea', value: 696.167 },
              // { name: 'Greece', value: 11109.999 },
              // { name: 'Greenland', value: 56.546 },
              // { name: 'Guatemala', value: 14341.576 },
              // { name: 'French Guiana', value: 231.169 },
              // { name: 'Guyana', value: 786.126 },
              // { name: 'Honduras', value: 7621.204 },
              // { name: 'Croatia', value: 4338.027 },
              // { name: 'Haiti', value: 9896.4 },
              // { name: 'Hungary', value: 10014.633 },
              // { name: 'Indonesia', value: 240676.485 },
              // { name: 'India', value: 12054.648 },
              // { name: 'Ireland', value: 4467.561 },
              // { name: 'Iran', value: 240676.485 },
              // { name: 'Iraq', value: 30962.38 },
              // { name: 'Iceland', value: 318.042 },
              // { name: 'Israel', value: 7420.368 },
              // { name: 'Italy', value: 60508.978 },
              // { name: 'Jamaica', value: 2741.485 },
              // { name: 'Jordan', value: 6454.554 },

              // { name: 'Kazakhstan', value: 15921.127 },
              // { name: 'Kenya', value: 40909.194 },
              // { name: 'Kyrgyzstan', value: 5334.223 },
              // { name: 'Cambodia', value: 14364.931 },
              // { name: 'South Korea', value: 51452.352 },
              // { name: 'Kosovo', value: 97.743 },
              // { name: 'Kuwait', value: 2991.58 },
              // { name: 'Laos', value: 6395.713 },
              // { name: 'Lebanon', value: 4341.092 },
              // { name: 'Liberia', value: 3957.99 },
              // { name: 'Libya', value: 6040.612 },
              // { name: 'Sri Lanka', value: 20758.779 },
              // { name: 'Lesotho', value: 2008.921 },
              // { name: 'Lithuania', value: 3068.457 },
              // { name: 'Luxembourg', value: 507.885 },
              // { name: 'Latvia', value: 2090.519 },
              // { name: 'Morocco', value: 31642.36 },
              // { name: 'Moldova', value: 103.619 },
              // { name: 'Madagascar', value: 21079.532 },
              // { name: 'Mexico', value: 117886.404 },
              // { name: 'Macedonia', value: 507.885 },
              // { name: 'Mali', value: 13985.961 },
              // { name: 'Myanmar', value: 51931.231 },
              // { name: 'Montenegro', value: 620.078 },
              // { name: 'Mongolia', value: 2712.738 },
              // { name: 'Mozambique', value: 23967.265 },
              // { name: 'Mauritania', value: 3609.42 },
              // { name: 'Malawi', value: 15013.694 },
              // { name: 'Malaysia', value: 28275.835 },
              // { name: 'Namibia', value: 2178.967 },
              // { name: 'New Caledonia', value: 246.379 },
              // { name: 'Niger', value: 15893.746 },
              // { name: 'Nigeria', value: 159707.78 },
              // { name: 'Nicaragua', value: 5822.209 },
              // { name: 'Netherlands', value: 16615.243 },
              // { name: 'Norway', value: 4891.251 },
              // { name: 'Nepal', value: 26846.016 },
              // { name: 'New Zealand', value: 4368.136 },
              // { name: 'Oman', value: 2802.768 },
              // { name: 'Pakistan', value: 173149.306 },
              // { name: 'Panama', value: 3678.128 },
              // { name: 'Peru', value: 29262.83 },
              // { name: 'Philippines', value: 93444.322 },
              // { name: 'Papua New Guinea', value: 6858.945 },
              // { name: 'Poland', value: 38198.754 },
              // { name: 'Puerto Rico', value: 3709.671 },
              // { name: 'North Korea', value: 1.468 },
              // { name: 'Portugal', value: 10589.792 },
              // { name: 'Paraguay', value: 6459.721 },
              // { name: 'Qatar', value: 1749.713 },
              // { name: 'Romania', value: 21861.476 },
              // { name: 'Russia', value: 21861.476 },
              // { name: 'Rwanda', value: 10836.732 },
              // { name: 'Western Sahara', value: 514.648 },
              // { name: 'Saudi Arabia', value: 27258.387 },
              // { name: 'Sudan', value: 35652.002 },
              // { name: 'South Sudan', value: 9940.929 },
              // { name: 'Senegal', value: 12950.564 },
              // { name: 'Solomon Islands', value: 526.447 },
              // { name: 'Sierra Leone', value: 5751.976 },
              // { name: 'El Salvador', value: 6218.195 },
              // { name: 'Somaliland', value: 9636.173 },
              // { name: 'Somalia', value: 9636.173 },
              // { name: 'Republic of Serbia', value: 3573.024 },
              // { name: 'Suriname', value: 524.96 },
              // { name: 'Slovakia', value: 5433.437 },
              // { name: 'Slovenia', value: 2054.232 },
              // { name: 'Sweden', value: 9382.297 },
              // { name: 'Swaziland', value: 1193.148 },
              // { name: 'Syria', value: 7830.534 },
              // { name: 'Chad', value: 11720.781 },
              // { name: 'Togo', value: 6306.014 },
              // { name: 'Thailand', value: 66402.316 },
              // { name: 'Tajikistan', value: 7627.326 },
              // { name: 'Turkmenistan', value: 5041.995 },
              // { name: 'East Timor', value: 10016.797 },
              // { name: 'Trinidad and Tobago', value: 1328.095 },
              // { name: 'Tunisia', value: 10631.83 },
              // { name: 'Turkey', value: 72137.546 },
              // { name: 'United Republic of Tanzania', value: 44973.33 },
              // { name: 'Uganda', value: 33987.213 },
              // { name: 'Ukraine', value: 46050.22 },
              // { name: 'Uruguay', value: 3371.982 },

              // { name: 'Uzbekistan', value: 27769.27 },
              // { name: 'Venezuela', value: 236.299 },
              // { name: 'Vietnam', value: 89047.397 },
              // { name: 'Vanuatu', value: 236.299 },
              // { name: 'West Bank', value: 13.565 },
              // { name: 'Yemen', value: 22763.008 },
              // { name: 'South Africa', value: 51452.352 },
              // { name: 'Zambia', value: 13216.985 },
              // { name: 'Zimbabwe', value: 13076.978 }
            ]

          }, {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.1,
              color: '#db9982',
              symbol: planePath,
              symbolSize: 8
            },
            lineStyle: {
              normal: {
                color: '#fff',
                width: 1,
                opacity: 0.4,
                curveness: 0.2
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                }
              }
            },
            data: formtGCData(geoCoordMap, data, 'UK', true)
          }, {
            type: 'lines',
            color: '#000',
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.1,
              color: '#000',
              symbol: planePath,
              symbolSize: 8
            },
            lineStyle: {
              normal: {
                color: '#fff',
                width: 1,
                opacity: 0.4,
                curveness: 0.2
              }
            },
            data: formtGCData(geoCoordMap, data, 'UK', false)
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              scale: 10,
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#01335f',
                fontSize: 14,
                fontWeight: 'bold'
              }
            },
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#0D6695',
                borderColor: 'gold'
              }
            },
            data: formtVData(geoCoordMap, data, 'UK')
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              scale: 10,
              brushType: 'stroke'
            },
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#0D6695',
                borderColor: 'gold'
              }
            },
            data: formtVData(geoCoordMap, data, 'Brazil')
          }
        ]
      })
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
