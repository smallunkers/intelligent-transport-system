<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData:{
        type: Object,
        default: {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      let option = {
          backgroundColor: '#394056',
          title: {
              top: 20,
              text: '杭州各区不同时间段道路平均负载率',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#F1F1F3'
              },
              left: '1%'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  lineStyle: {
                      color: '#57617B'
                  }
              }
          },
          legend: {
              top: 20,
              icon: 'rect',
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ['上城区', '西湖区', '滨江区','拱墅区','萧山区','余杭区','下城区','江干区'],
              right: '4%',
              textStyle: {
                  fontSize: 12,
                  color: '#F1F1F3'
              }
          },
          grid: {
              top: 100,
              left: '3%',
              right: '4%',
              bottom: '2%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                  lineStyle: {
                      color: '#57617B'
                  }
              },
              data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
          }],
          yAxis: [{
              type: 'value',
              name: '(%)',
              min:60,
              max:90,
              axisTick: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#57617B'
                  }
              },
              axisLabel: {
                  margin: 10,
                  textStyle: {
                      fontSize: 14
                  }
              },
              splitLine: {
                  lineStyle: {
                      color: '#57617B'
                  }
              }
          }],
          series: [
              {
                  name: '上城区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(137, 189, 27, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(137, 189, 27, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(137,189,27)',
                          borderColor: 'rgba(137,189,2,0.27)',
                          borderWidth: 12

                      }
                  },
                  data: this.chartData.areaSC
//          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
              }, {
                  name: '西湖区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(0, 136, 212, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(0, 136, 212, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(0,136,212)',
                          borderColor: 'rgba(0,136,212,0.2)',
                          borderWidth: 12

                      }
                  },
                  data: this.chartData.areaXH
//          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
              }, {
                  name: '滨江区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(219, 50, 51, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(219, 50, 51, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(219,50,51)',
                          borderColor: 'rgba(219,50,51,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaBJ
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }, {
                  name: '拱墅区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(190, 190, 190, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(190, 190, 190, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(190, 190, 190)',
                          borderColor: 'rgba(190, 190, 190,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaGS
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }, {
                  name: '萧山区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(0, 255, 127, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(0, 255, 127, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(0, 255, 127)',
                          borderColor: 'rgba(0, 255, 127,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaXS
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }, {
                  name: '余杭区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(192,255,62, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(192,255,62, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(192,255,62)',
                          borderColor: 'rgba(192,255,62,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaYH
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }, {
                  name: '下城区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(224,255,255, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(224,255,255, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(224,255,255)',
                          borderColor: 'rgba(224,255,255,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaXC
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }, {
                  name: '江干区',
                  type: 'line',
                  smooth: true,
                  symbol: 'circle',
                  symbolSize: 5,
                  showSymbol: false,
                  lineStyle: {
                      normal: {
                          width: 1
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(255,215, 0, 0.3)'
                          }, {
                              offset: 0.8,
                              color: 'rgba(255,215, 0, 0)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: 'rgb(255,215,0)',
                          borderColor: 'rgba(255,215,0,0.2)',
                          borderWidth: 12
                      }
                  },
                  data: this.chartData.areaJG
//          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              }
          ]
      }
      this.chart.setOption(option);
    }
  }
}
</script>
