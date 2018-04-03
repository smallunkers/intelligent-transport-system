<template>
  <div :class="className" :style="{height:height,width:width}" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object
    },
    id:{
        type: String,
        default: 'line-chart'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
      this.initChart();
      let option = {
          title: {
              text: '道路负载率统计',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#000000'
              },
              left: '6%'
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
              icon: 'rect',
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ['空闲负载率','平均负载率','高峰期负载率'],
//              data: ['移动', '电信', '联通'],
              right: '4%',
              textStyle: {
                  fontSize: 12,
                  color: '#000000'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              borderColor: '#FFF'
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                  lineStyle: {
                      color: '#57617B'
                  }
              },
              axisTick: {
                  show: false
              },
              splitLine: {
                  show: true,
                  lineStyle: {
                      color: 'rgba(123, 119, 121, 0.3)'
                  }
              },
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sem', 'Oct', 'Nov', 'Dec']
          }],
          yAxis: [{
              show: false,
              type: 'value',
              name: '单位（%）',
              axisTick: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#57617B'
                  },
              },
              axisLabel: {
                  margin: 10,
                  textStyle: {
                      fontSize: 14
                  }
              },
              splitLine: {
                  show: false,
                  lineStyle: {
                      color: '#57617B'
                  }
              }
          }],
          series: [{
              name: '平均负载率',
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
                      borderColor: 'rgba(137,189,2,0.27)',
                      borderWidth: 12

                  }
              },
              data:this.chartData.averageUserRate
//              data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          }, {
              name: '高峰期负载率',
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
                      borderColor: 'rgba(0,136,212,0.2)',
                      borderWidth: 12

                  }
              },
              data: this.chartData.crowdUserRate
//              data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
          }, {
              name: '空闲负载率',
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
                      borderColor: 'rgba(219,50,51,0.2)',
                      borderWidth: 12
                  }
              },
              data: this.chartData.freeUserRate
//              data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
          }]
      }
      this.chart.setOption(option);
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
    }
  }
}
</script>
