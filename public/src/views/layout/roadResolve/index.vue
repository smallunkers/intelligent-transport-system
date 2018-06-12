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
                        <el-row >
                            <el-col :span="6" :offset="2">
                                <span class="text-title" >地点:</span>
                            </el-col>
                            <el-col :span="15">
                                <span  class="text-value">{{address}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span class="text-title">拥挤程度:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">{{status}}</span>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="6" :offset="2">
                                <span class="text-title">阈值:</span>
                            </el-col>
                            <el-col :span="15" >
                                <span class="text-value">{{threshold}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span class="text-title">当前负载:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">{{nowHold}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span  class="text-title">拥挤长度:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">{{length}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span  class="text-title">当前车速:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">{{speed}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span  class="text-title">主要原因:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value text-red">{{reason}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="road-resolve-map-wrapper" v-show="showResolve">
            <el-row>
                <el-col :span="1" :offset="23">
                    <i class="el-icon-close my-icon" @click="toggleResolve"></i>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="1">
                    <div id="road-resolve-map" class="road-resolve-map"></div>
                </el-col>
                <el-col :span="13">
                    <div class="road-resolve-text">
                        <el-row >
                            <el-col :span="6" :offset="2">
                                <span class="text-title" >地点:</span>
                            </el-col>
                            <el-col :span="15">
                                <span  class="text-value">{{address}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" :offset="2">
                                <span class="text-title">拥堵类型:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">{{crowdType}}</span>
                            </el-col>
                        </el-row>
                        <el-row v-show="!isResolve">
                            <el-col :span="6" :offset="2">
                                <span class="text-title">解决方案:</span>
                            </el-col>
                            <el-col :span="15">
                                <span class="text-value">很遗憾，暂时未能找到替代路线，请耐心等待拥堵结束</span>
                            </el-col>
                        </el-row>
                        <div v-show="isResolve">
                            <div v-if="crowdType=='非十字路口拥堵'">
                                <el-row >
                                    <el-col :span="6" :offset="2">
                                        <span class="text-title">替代路线座标:</span>
                                    </el-col>
                                    <el-col :span="15" >
                                        <span class="text-value text-break-up">{{replaceWay.coordinate}}</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6" :offset="2">
                                        <span class="text-title">替代路线:</span>
                                    </el-col>
                                    <el-col :span="15">
                                        <span class="text-value">{{replaceWay.nodeName}}</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6" :offset="2">
                                        <span  class="text-title">替代路线权值/耗费时间:</span>
                                    </el-col>
                                    <el-col :span="15">
                                        <span class="text-value">{{replaceWay.newDistance}}/约{{replaceWay.newTime}}min</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6" :offset="2">
                                        <span  class="text-title">等待拥堵权值/耗费时间:</span>
                                    </el-col>
                                    <el-col :span="15">
                                        <span class="text-value">{{replaceWay.oldDistance}}/{{replaceWay.oldTime}}min</span>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="crowdType=='十字路口拥堵'">
                                <el-row >
                                    <el-col :span="6" :offset="2">
                                        <span class="text-title">解决方案</span>
                                    </el-col>
                                    <el-col :span="15" >
                                        <span class="text-value">该拥堵属于交通路口拥堵，暂时无法寻找代替路线，建议远程操控红绿灯，根据实时情况调整红绿灯时间，适当延长绿灯放行时间，减缓拥堵。</span>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="mask" v-show="showDetail||showResolve"></div>
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
                            <el-button type="text" @click="mapDetail(scope.row.lgd,scope.row.lat,scope.row)">详情</el-button>
                            <el-button type="text" @click="mapResolve(scope.row.lgd,scope.row.lat,scope.row)">解决方案</el-button>
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
    import {roadResolve} from '../../../api/main'
    export default {
        data() {
            return {
               crowdData:[],
                map:null,
                resolveMap:null,
                showDetail:false,
                showResolve:false,
                isDetail:true,
                isResolve:true,
                crowdType:'',
                loadMapCount:0,
                length:'',
                reason:'',
                threshold:'',
                status:'',
                nowHold:'',
                address:'',
                speed:'',
                replaceWay:{
                   coordinate:'',
                   nodeName:'',
                   newDistance:'',
                   oldDistance:'',
                   newTime:'',
                   oldTime:'',
                    coordinateList:null,
                    latList:null
                }
            }
        },
        created () {
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
                if (this.getRoadCrowd&&this.crowdData.length===0) {
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
            getRoadMap () {
                return this.$store.getters['getRoadMap']
            }
        },
        methods:{
            toggleDetail() {
                this.showDetail = !this.showDetail;
            },
            toggleResolve() {
                this.showResolve = !this.showResolve;
            },
            mapResolve(lgd,lat,row) {
                this.toggleResolve();
                this.isDetail = false;
                this.address = row.address;
                this.crowdType = row.crowdType=='0'?'非十字路口拥堵':'十字路口拥堵'
                let postData = {
                    start: row.start,
                    end:row.end,
                    type: row.crowdType,
                    direction:row.direction
                }
                if(this.crowdType=='十字路口拥堵'){
                    setTimeout(() => {
                        if (this.resolveMap) {
                            let dom = document.getElementById('road-resolve-map').length;
                            console.log('dom is ---------------' + dom);
                            let point = new BMap.Point(lgd,lat);
                            let marker = new BMap.Marker(point);
                            this.resolveMap.setCenter(point);
                            this.resolveMap.clearOverlays(); // 清除所有覆盖物
                            this.resolveMap.addOverlay(marker)
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
                                        this.initResolveMap(lgd,lat);
                                    } else {
                                        console.log(resp.msg);
                                    }
                                    loading.close();
                                })
                            }else {
                                this.initResolveMap(lgd,lat);
                                loading.close();
                            }
                        }
                    },200)
                    return;
                }
                console.log(postData);
                roadResolve(postData).then((res) => {
                    console.log('roaditem is --------')
                    let resp = res.data;
                    if (resp.code == '0') {
                        if(resp.data) {
                            this.isResolve = true;
                            this.replaceWay.coordinate = resp.data.resolve.record
                            this.replaceWay.nodeName = resp.data.resolve.nodeRecord
                            this.replaceWay.newDistance = resp.data.resolve.distance
                            this.replaceWay.oldDistance = resp.data.oldDistance
                            this.replaceWay.newTime = Math.round(resp.data.resolve.distance/1000*60)
                            this.replaceWay.oldTime = Math.round(resp.data.oldDistance/1000*60)
                             this.replaceWay.coordinateList = resp.data.resolve.record.split('|')
                            this.replaceWay.latList = resp.data.latList
                            setTimeout(() => {
                                if (this.resolveMap) {
                                    let dom = document.getElementById('road-resolve-map').length;
                                    console.log('dom is ---------------' + dom);
                                    let point = new BMap.Point(lgd,lat);
                                    this.resolveMap.setCenter(point);
                                    this.resolveMap.clearOverlays(); // 清除所有覆盖物
                                    for(let i=0;i < resp.data.latList.length;i++) {
                                        let point  = new BMap.Point(resp.data.latList[i].lgd,resp.data.latList[i].lat)
                                        let marker = new BMap.Marker(point);  // 创建标注
                                        this.resolveMap.addOverlay(marker);
                                        marker.addEventListener("mouseover",(e) => {
                                            console.log('this.replaceWay.coordinateList is------')
                                            console.log(this.replaceWay.coordinateList)
                                            let label =  new BMap.Label(`座标:${this.replaceWay.coordinateList[i]}`,{offset:new BMap.Size(15,-35)})
                                            label.setStyle({
                                                width: "120px",
                                                color: '#fff',
                                                background: '#000',
                                                opacity:'0.7',
                                                border: '1px solid "#ff8355"',
                                                borderRadius: "5px",
                                                textAlign: "center",
                                                height: "26px",
                                                lineHeight: "26px"
                                            })
                                            marker.setLabel(label);
                                        })
                                        marker.addEventListener("mouseout",function(e) {
                                            let label = marker.getLabel()
                                            label.setContent("");
                                            label.setStyle({border:"none",width:"0px",padding:"0px"});
                                        })
                                    }
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
                                                this.initResolveMap(lgd,lat,this.replaceWay.latList);
                                            } else {
                                                console.log(resp.msg);
                                            }
                                            loading.close();
                                        })
                                    }else {
                                        this.initResolveMap(lgd,lat,this.replaceWay.latList);
                                        loading.close();
                                    }
                                }
                            },200)
                        }else{
                            this.isResolve = false;
                            setTimeout(() => {
                                if (this.resolveMap) {
                                    let dom = document.getElementById('road-resolve-map').length;
                                    console.log('dom is ---------------' + dom);
                                    let point = new BMap.Point(lgd,lat);
                                    let marker = new BMap.Marker(point);
                                    this.resolveMap.setCenter(point);
                                    this.resolveMap.clearOverlays(); // 清除所有覆盖物
                                    this.resolveMap.addOverlay(marker)
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
                                                this.initResolveMap(lgd,lat);
                                            } else {
                                                console.log(resp.msg);
                                            }
                                            loading.close();
                                        })
                                    }else {
                                        this.initResolveMap(lgd,lat);
                                        loading.close();
                                    }
                                }
                            },200)
                        }
                    } else {

                    }
                })
            },
            mapDetail (lgd,lat,row) {
                this.address = row.address;
                this.length = row.length;
                this.reason = row.reason;
                this.threshold = row.threshold;
                this.status = row.status;
                this.nowHold = row.nowHold;
                this.speed = row.speed;
                this.toggleDetail();
                this.isDetail = true;
               setTimeout(() => {
                    if (this.map) {
                        console.log(lgd);
                        console.log(lat);
                        let dom = document.getElementById('road-detail-map').length;
                        console.log('dom is ---------------' + dom);
                        let point = new BMap.Point(lgd,lat);
                        this.map.setCenter(point);
                        this.map.clearOverlays(); // 清除所有覆盖物
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
            initResolveMap(lgd,lat,latList=[]) {
                // 初始化容器
                console.log('initResolveMap')
                this.resolveMap = new BMap.Map("road-resolve-map");
                // 初始化座标
                let point = new BMap.Point(lgd,lat);
                // 地图級別
                this.resolveMap.centerAndZoom(point, 16);
                // 添加地图
                this.resolveMap.addControl(new BMap.MapTypeControl());
                // 滚轮
                this.resolveMap.enableScrollWheelZoom(true);
                if(latList.length==0) {
                    let marker = new BMap.Marker(point);  // 创建标注
                    this.resolveMap.addOverlay(marker);
                }
                for(let i=0;i < latList.length;i++) {
                    let point  = new BMap.Point(latList[i].lgd,latList[i].lat)
                    let marker = new BMap.Marker(point);  // 创建标注
                    this.resolveMap.addOverlay(marker);
                    marker.addEventListener("mouseover",(e)=> {
                        console.log('this.replaceWay.coordinateList is------')
                        console.log(this.replaceWay.coordinateList)
                        let label =  new BMap.Label(`座标:${this.replaceWay.coordinateList[i]}`,{offset:new BMap.Size(15,-35)})
                        label.setStyle({
                            width: "120px",
                            color: '#fff',
                            background: '#000',
                            opacity:'0.7',
                            border: '1px solid "#ff8355"',
                            borderRadius: "5px",
                            textAlign: "center",
                            height: "26px",
                            lineHeight: "26px"
                        })
                        marker.setLabel(label);
                    })
                    marker.addEventListener("mouseout",function(e) {
                        let label = marker.getLabel()
                        label.setContent("");
                        label.setStyle({border:"none",width:"0px",padding:"0px"});
                    })
                }
                this.roadMapDataFormatter(true);
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
                this.roadMapDataFormatter(false);
            },
            roadMapDataFormatter (isResolve) {
                if (this.getRoadMap) {
                    let data = this.getRoadMap.roadInfo;
                    for (let i=0; i < data.length; i++) {
                        let dataGreen = this.getRoadMap.roadInfo[i].roadGreen,
                            dataYellow = this.getRoadMap.roadInfo[i].roadYellow,
                            dataRed = this.getRoadMap.roadInfo[i].roadRed;
                        if(isResolve){
                            for(let j=0; j <dataGreen.length;j++) {
                                let pointStart = new BMap.Point(dataGreen[j].startLgd,dataGreen[j].startLat);
                                let pointEnd = new BMap.Point(dataGreen[j].endLgd,dataGreen[j].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"green", strokeWeight:4, strokeOpacity:0.5});
                                polyline.disableMassClear(); // 绘制的折线禁止清除
                                this.resolveMap.addOverlay(polyline);
                            }
                            for(let a=0; a<dataYellow.length;a++) {
                                let pointStart = new BMap.Point(dataYellow[a].startLgd,dataYellow[a].startLat);
                                let pointEnd = new BMap.Point(dataYellow[a].endLgd,dataYellow[a].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"yellow", strokeWeight:4, strokeOpacity:0.6});
                                polyline.disableMassClear(); // 禁止清除
                                this.resolveMap.addOverlay(polyline);
                            }
                            for (let b = 0; b < dataRed.length; b++) {
                                let pointStart = new BMap.Point(dataRed[b].startLgd,dataRed[b].startLat);
                                let pointEnd = new BMap.Point(dataRed[b].endLgd,dataRed[b].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"red", strokeWeight:4, strokeOpacity:0.7});
                                polyline.disableMassClear(); // 禁止清除
                                this.resolveMap.addOverlay(polyline);
                            }
                        }else {
                            for(let j=0; j <dataGreen.length;j++) {
                                let pointStart = new BMap.Point(dataGreen[j].startLgd,dataGreen[j].startLat);
                                let pointEnd = new BMap.Point(dataGreen[j].endLgd,dataGreen[j].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"green", strokeWeight:4, strokeOpacity:0.5});
                                polyline.disableMassClear(); // 绘制的折线禁止清除
                                this.map.addOverlay(polyline);
                            }
                            for(let a=0; a<dataYellow.length;a++) {
                                let pointStart = new BMap.Point(dataYellow[a].startLgd,dataYellow[a].startLat);
                                let pointEnd = new BMap.Point(dataYellow[a].endLgd,dataYellow[a].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"yellow", strokeWeight:4, strokeOpacity:0.6});
                                polyline.disableMassClear(); // 禁止清除
                                this.map.addOverlay(polyline);
                            }
                            for (let b = 0; b < dataRed.length; b++) {
                                let pointStart = new BMap.Point(dataRed[b].startLgd,dataRed[b].startLat);
                                let pointEnd = new BMap.Point(dataRed[b].endLgd,dataRed[b].endLat);
                                let polyline = new BMap.Polyline([pointStart,pointEnd],{strokeColor:"red", strokeWeight:4, strokeOpacity:0.7});
                                polyline.disableMassClear(); // 禁止清除
                                this.map.addOverlay(polyline);
                            }
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
        .text-break-up{
            word-wrap:break-word
        }
        .road-resolve-map-wrapper{
            position absolute;
            top 40px;
            height 540px;
            width 1100px;
            left 50%;
            margin-left -550px;
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
            .road-resolve-map{
                height 400px;
                width 100%;
            }
            .road-resolve-text{
                .text-title{
                    padding-top 10px;
                    padding-bottom 10px;
                    display inline-block;
                    color #606266;
                }
                .text-value{
                    padding-top 10px;
                    padding-bottom 10px;
                    display inline-block;
                    color #606266;
                    width 100%;
                    text-align center;
                }
            }
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
            .road-detail-text,.road-resolve-text{
                .text-title{
                    padding-top 10px;
                    padding-bottom 10px;
                    display inline-block;
                    color #606266;
                }
                .text-value{
                    padding-top 10px;
                    padding-bottom 10px;
                    display inline-block;
                    color #606266;
                    width 100%;
                    text-align center;
                }
                .text-red {
                    color red;
                }

            }
            .road-resolve-text{

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