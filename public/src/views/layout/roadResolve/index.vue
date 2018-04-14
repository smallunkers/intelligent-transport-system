<template>
    <div class="road-resolve-wrapper">
        <div class="road-detail-map-wrapper" v-show="showDetail">
            <el-row>
                <el-col :span="1" :offset="23">
                    <i class="el-icon-close my-icon" @click="toggleDetail"></i>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16" :offset="1">
                    <div class="road-detail-map" id="road-detail-map"></div>
                </el-col>
                <el-col :span="7">
                    <div class="road-detail-text">

                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="mask" v-show="showDetail"></div>
        <div class="road-crowd-table-header">
            道路拥堵情况及解决方案
        </div>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-table height="500" :data="crowdDataFormatter">
                    <el-table-column label="编号" prop="id" min-width="10%"></el-table-column>
                    <el-table-column label="地点" prop="address" min-width="30%"></el-table-column>
                    <el-table-column label="拥挤程度" prop="status" min-width="10%"></el-table-column>
                    <el-table-column label="阈值" prop="threshold" min-width="10%"></el-table-column>
                    <el-table-column label="当前负载" prop="nowHold" min-width="10%"></el-table-column>
                    <el-table-column label="操作" min-width="20%">
                        <template  slot-scope="scope">
                            <el-button type="text" @click="mapDetail(scope.row.lgd,scope.row.lat)">详情</el-button>
                            <el-button type="text">解决方案</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import BMap from 'BMap';
    import Vue from 'vue';
    import {Row,Col,Table,TableColumn,Button} from 'element-ui';
    export default {
        data() {
            return {
               crowdData:[],
                map:null,
                showDetail:false,
                loadMapCount:0
            }
        },
        created () {
            this.$store.dispatch('roadResolveGeneral').then((resp) => {
                if (resp.code=='0') {
                    console.log('roadResolveGeneral success');
                }else {
                    console.log('error msg is----------' + resp.msg);
                }
            })
            this.$store.dispatch('roadCrowdGeneral').then((resp) => {
                if (resp.code=='0') {
                    console.log('roadCrowdGeneral success');
                }else {
                    console.log('error msg is----------' + resp.msg);
                }
            })
        },
        components:{
            Row,Col,Table,TableColumn
        },
        computed:{
            crowdDataFormatter () {
                if (this.getRoadCrowd) {
                    for (let i=0;i < this.getRoadCrowd.roadCrowd.length;i++) {
                        let item = {};
                       item = this.getRoadCrowd.roadCrowd[i];
                       item.status = this.getRoadCrowd.roadCrowd[i].status=='0'?'拥挤':'十分拥挤';
                        this.crowdData.push(item);
                    }
                }
                return this.crowdData;
            },
            getRoadCrowd () {
                return this.$store.getters['getRoadCrowd']
            },
            getResolveItem () {
                return this.$store.getters['getResolveItem']
            },
            getRoadMap () {
                return this.$store.getters['getRoadMap']
            }
        },
        methods:{
            toggleDetail() {
                this.showDetail = !this.showDetail;
            },
            mapDetail (lgd,lat) {
                this.toggleDetail();
               setTimeout(() => {
                    if (this.map) {
                        console.log(lgd);
                        console.log(lat);
                        let dom = document.getElementById('road-detail-map').length;
                        console.log('dom is ---------------' + dom);
                        let point = new BMap.Point(lgd,lat);
                        this.map.setCenter(point);
                        let marker = new BMap.Marker(point);  // 创建标注
                        this.map.addOverlay(marker);
                    }else {
                        const loading = this.$loading({
                            lock: true,
                            text: '地图拼命初始化中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        if(!this.getRoadMap) {
                            this.$store.dispatch('roadMapGeneral').then((resp) => {
                                if (resp.code=='0') {
                                    console.log('roadMap axios successfully');
                                    this.initMap(lgd,lat);
                                } else {
                                    console.log(resp.msg);
                                }
                                loading.close();
                            })
                        }else {
                            this.initMap(lgd,lat);
                            loading.close();
                        }
                    }
                },200)
            },
            initMap (lgd,lat) {
                // 初始化容器
                this.map = new BMap.Map("road-detail-map");
                // 初始化座标
                let point = new BMap.Point(lgd,lat);
                // 地图級別
                this.map.centerAndZoom(point, 18);
                // 添加地图
                this.map.addControl(new BMap.MapTypeControl());
                // 滚轮
                this.map.enableScrollWheelZoom(true);
                let marker = new BMap.Marker(point);  // 创建标注
                this.map.addOverlay(marker);
                this.roadMapDataFormatter();
            },
            roadMapDataFormatter () {
                if (this.getRoadMap) {
                    let data = this.getRoadMap.roadInfo;
                    for (let i=0; i < data.length; i++) {
                        let dataGreen = this.getRoadMap.roadInfo[i].roadGreen,
                            dataYellow = this.getRoadMap.roadInfo[i].roadYellow,
                            dataRed = this.getRoadMap.roadInfo[i].roadRed;
                        for(let j=0; j <dataGreen.length;j++) {
                            let pointStart = new BMap.Point(dataGreen[j].startLgd,dataGreen[j].startLat);
                            let pointEnd = new BMap.Point(dataGreen[j].endLgd,dataGreen[j].endLat);
                            let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"green", strokeWeight:4, strokeOpacity:0.5});
                            this.map.addOverlay(polyline);
                        }
                        for(let a=0; a<dataYellow.length;a++) {
                            let pointStart = new BMap.Point(dataYellow[a].startLgd,dataYellow[a].startLat);
                            let pointEnd = new BMap.Point(dataYellow[a].endLgd,dataYellow[a].endLat);
                            let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"yellow", strokeWeight:4, strokeOpacity:0.6});
                            this.map.addOverlay(polyline);
                        }
                        for (let b = 0; b < dataRed.length; b++) {
                            let pointStart = new BMap.Point(dataRed[b].startLgd,dataRed[b].startLat);
                            let pointEnd = new BMap.Point(dataRed[b].endLgd,dataRed[b].endLat);
                            let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"red", strokeWeight:4, strokeOpacity:0.7});
                            this.map.addOverlay(polyline);
                        }
                    }

                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .road-resolve-wrapper{
        width 100%;
        height 600px;
        position relative;
        .mask{
            background-color black
            opacity 0.45;
            z-index 99;
            position absolute;
            width 100%;
            height 100%;
        }
        .road-detail-map-wrapper{
            position absolute;
            top 80px;
            height 410px;
            width 1000px;
            left 50%;
            margin-left -500px;
            border-radius 15px;
            z-index 100;
            background-color white;
            .my-icon{
                display inline-block;
                font-size 24px;
                height 24px;
                width 24px;
                margin-top 10px;
            }
            .road-detail-map{
                height 350px;
                width 100%;
            }
        }
        .road-crowd-table-header{
            text-align center;
            font-size 16px;
            height 20px;
            line-height 20px;
            color #606266
            padding 15px 0;
        }
    }
</style>