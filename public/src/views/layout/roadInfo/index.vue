<template>
    <div class="road-info-wrapper">
        <ul class="road-info-ul">
            <el-row :gutter="20" class="road-info-list">
                <el-col :span="6" v-for="(item,index) in items" :key="index">
                    <li class="road-info-item">
                        <el-row :gutter="10" class="list-row">
                            <el-col :span="12" class="list-row-col">
                                <i :class="[item.iconClass,'list-icon']"></i>
                            </el-col>
                            <el-col :span="12" class="list-row-col">
                                <div class="list-title">{{item.title}}</div>
                                <div class="list-number">{{item.subtitle}}{{item.data}}{{item.unit}}</div>
                            </el-col>
                        </el-row>
                    </li>
                </el-col>
            </el-row>
        </ul>
        <div class="charts-wrapper">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="pie-charts-wrapper" v-if="roadInfoPieChart.length > 0">
                        <pie-charts :id="'pie-chart'" :chartData="roadInfoPieChart"></pie-charts>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="line-charts-wrapper" v-if="isRoadInfoLineChart">
                        <line-charts :id="'line-chart'" :chartData="roadInfoLineChart"></line-charts>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20" :offset="2">
                    <el-table :data="roadInfoTable.slice((currentPage-1)*pageSize,currentPage*pageSize)" class="my-table">
                        <el-table-column prop="name" label="主干路名称" min-width="13%"></el-table-column>
                        <el-table-column  prop="crowdTime" label="拥堵时间段" min-width="20%"></el-table-column>
                        <el-table-column prop="crowdUtilization" label="高峰期使用率" min-width="13%"></el-table-column>
                        <el-table-column prop="dayUtilization" label="日均使用率" min-width="13%"></el-table-column>
                        <el-table-column prop="trafficFlow" label="日均车流量 /辆" min-width="13%"></el-table-column>
                        <el-table-column prop="illegalMatter" label="违法事件 /起" min-width="14%"></el-table-column>
                        <el-table-column label="交通事故 /起" prop="trafficAccident" min-width="14%"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row class="pagination">
                <el-col :span="6" :offset="9">
                    <el-pagination :total="roadInfoTable.length" layout="prev, pager, next" @size-change="sizeChange" @current-change="currentChange" :page-size="pageSize" :current-page="currentPage"></el-pagination>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="20" :offset="2">
                    <div class="line-maker-wrapper" v-if="isRoadInfoLineMaker">
                        <line-maker :id="'line-maker'" :chartData="roadInfoLineMaker"></line-maker>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import echarts from 'echarts';
    import pieCharts from './PieChart.vue';
    import lineCharts from './LineChart.vue';
    import lineMaker from '../../../components/Charts/lineMarker.vue';
    import{Dropdown,DropdownItem,DropdownMenu,Table,Pagination} from 'element-ui';
    export default {
        data(){
            return{
                items:[
                    {
                        title:'交通事故',
                        subtitle:'发生',
                        iconClass:'icon-truck',
                        data:'',
                        unit:'起'
                    },
                    {
                        title:'主干路段',
                        subtitle:'拥挤所占比例',
                        iconClass:'icon-google-drive',
                        data:'',
                        unit:'%'
                    },
                    {
                        title:'道路拥堵',
                        subtitle:'高峰期为',
                        iconClass:'icon-alarm',
                        data:'',
                        unit:''
                    },
                    {
                        title:'使用率低下',
                        iconClass:'icon-stats-bars',
                        subtitle:'日使用率最高不足40%路段',
                        data:'',
                        unit:'条'
                    }
                ],
                pageSize:8,
                currentPage:1,
                roadInfoLineChart:{
                    averageUserRate:[],
                    crowdUserRate:[],
                    freeUserRate:[],
                    month:[]
                },
                roadInfoPieChart:[],
                roadInfoTable:[],
                roadInfoLineMaker:{
                    areaSC:[],
                    areaXH:[],
                    areaBJ:[],
                    areaGS:[],
                    areaXS:[],
                    areaYH:[],
                    areaXC:[],
                    areaJG:[]
                },
            }
        },
        created() {
            this.$store.dispatch('roadInfoGeneral').then((resp) => {
                console.log("resp is-------");
                console.log(resp);
                if (resp.code =='0') {
                    this.roadInfoFormatter();
                    this.roadInfoLineChartFmt();
                    this.roadInfoPieFmt();
                    this.roadInfoTableFmt();
                    this.roadInfoLineMakerFmt();
                }
            })
        },
        components:{
            pieCharts,Dropdown,DropdownItem,DropdownMenu,Table,lineCharts,lineMaker
        },
        computed:{
            getRoadInfo() {
                return this.$store.getters['getRoadInfo'];
            },
            isRoadInfoLineMaker () {
                let flag = false;
                for(let key in  this.roadInfoLineMaker) {
                    flag = this.roadInfoLineMaker[key].length <=  0 ? false: true;
                }
                return flag;
            },
            isRoadInfoLineChart () {
                let flag = false;
                for(let key in this.roadInfoLineChart){
                     flag = this.roadInfoLineChart[key].length <= 0 ? false : true;
                }
                return flag;

            }
        },
        methods:{
            sizeChange(size) {
                this.pageSize = size;
            },
            currentChange (currentPage){
                this.currentPage = currentPage;
            },
            roadInfoFormatter() {
                let i = 0;
                for(let key in  this.getRoadInfo.roadInfoGeneral) {
                    this.items[i].data = this.getRoadInfo.roadInfoGeneral[key]
                        i++;
                }
            },
            roadInfoLineChartFmt () {
                let itemList = this.getRoadInfo.roadInfoLineChart;
                for(let i=0; i <itemList.length;i++ ) {
                    this.roadInfoLineChart.averageUserRate.push(parseInt(itemList[i].averageUserRate));
                    this.roadInfoLineChart.crowdUserRate.push(parseInt(itemList[i].crowdUserRate));
                    this.roadInfoLineChart.freeUserRate.push(parseInt(itemList[i].freeUserRate));
                    this.roadInfoLineChart.month.push(parseInt(itemList[i].month));
                }
            },
            roadInfoPieFmt () {
                for(let key in  this.getRoadInfo.roadInfoPieChart) {
                    let item = {
                        value:'',
                        name:'',
                    };
                    item.value = this.getRoadInfo.roadInfoPieChart[key];
                    switch (key) {
                        case 'car':
                            item.name = '轿车';
                            break;
                        case 'bus':
                            item.name = '公交车';
                            break;
                        case 'truck':
                            item.name = '货车';
                            break;
                        case 'coach':
                            item.name = '客车';
                            break;
                        case 'else':
                            item.name = '其他';
                            break;
                        case 'minibus':
                            item.name = '面包车';
                            break;
                    }
                    this.roadInfoPieChart.push(item);
                }
            },
            roadInfoTableFmt () {
                this.roadInfoTable = this.getRoadInfo.roadInfoTable;
            },
            roadInfoLineMakerFmt() {
                let itemList = this.getRoadInfo.roadInfoLineMaker;
                for(let i = 0; i < itemList.length; i++) {
                    this.roadInfoLineMaker.areaSC.push(itemList[i].areaSC.roadUserRate);
                    this.roadInfoLineMaker.areaXH.push(itemList[i].areaXH.roadUserRate);
                    this.roadInfoLineMaker.areaBJ.push(itemList[i].areaBJ.roadUserRate);
                    this.roadInfoLineMaker.areaGS.push(itemList[i].areaGS.roadUserRate);
                    this.roadInfoLineMaker.areaXS.push(itemList[i].areaXS.roadUserRate);
                    this.roadInfoLineMaker.areaYH.push(itemList[i].areaYH.roadUserRate);
                    this.roadInfoLineMaker.areaXC.push(itemList[i].areaXC.roadUserRate);
                    this.roadInfoLineMaker.areaJG.push(itemList[i].areaJG.roadUserRate);
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../../assets/fonts/iconmoon/style1.css';
    .road-info-wrapper{
        width 100%;
        .road-info-ul{
            margin-top 0;
            padding-top 20px;
        }
        .road-info-list{
            width 100%;
            height 150px;
            border-radius 5px;
            .road-info-item{
                height 150px;
                list-style  none;
                border-radius 10px;
                background-color white;
                padding-left 10px;
                .list-row{
                    width 100%;
                    height 100%;
                    .list-row-col {
                        height 100%;
                        .list-icon{
                            margin 0 15px;
                            font-size 100px;
                            height 150px;
                            width 100px;
                            line-height 150px;
                            display inline-block;
                        }
                        .list-title{
                            margin-top 20px;
                            margin-bottom 15px;
                            font-weight bold;
                            text-align center;
                            font-size 18px;
                        }
                        .list-number{
                            color darkgray;
                            font-size 14px;
                            text-align center;
                        }
                        .icon-truck{
                            color yellowgreen;
                        }
                        .icon-google-drive{
                            color lightcoral;
                        }
                        .icon-alarm{
                            color cornflowerblue;
                        }
                        .icon-stats-bars{
                            color lightgreen;
                        }
                    }
                }
            }
        }
        .my-table{
            border-radius 10px;
            margin 20px 0;
        }
        .pagination{
            margin-bottom 15px;
        }
    }
</style>