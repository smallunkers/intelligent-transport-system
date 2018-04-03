<template>
  <div :class="className" :style="{height:height,width:width}" :id="id"></div>
</template>

<script>
import echarts from 'echarts'
import {mapGetters} from 'vuex';
require('echarts/theme/macarons') // echarts theme
//import { debounce } from '@/utils'

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
      default: '300px'
    },
    id:{
      type: String,
      default: 'pie-chart'
    },
      chartData: Array
  },
  data() {
    return {
        chart: null,
        options :{
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                bottom: '10',
//          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                data: ['轿车', '公交车', '货车', '客车', '面包车', '其他']
            },
            calculable: true,
            series: [
                {
//            name: 'WEEKLY WRITE ARTICLES',
                    name: '各类车辆占车流量比率',
                    type: 'pie',
                    roseType: 'radius',
                    radius: [15, 95],
                    center: ['50%', '38%'],
//            data: [
//              { value: 320, name: 'Industries' },
//              { value: 240, name: 'Technology' },
//              { value: 149, name: 'Forex' },
//              { value: 100, name: 'Gold' },
//              { value: 59, name: 'Forecasts' }
//            ],
                    data: [],
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600
                }
            ]
        },
    }
  },
    computed:{
        getRoadInfo() {
            return this.$store.getters['getRoadInfo'];
        }
    },
  mounted() {
      this.initChart();
  },
  beforeDestroy() {
      if (!this.chart) {
          return
      }
      this.chart.dispose();
      this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.options.series[0].data = this.chartData;
      this.chart.setOption(this.options);
    },
  }
}
</script>
