<template>
    <div class="map-container">
        <el-row>
            <el-col :span="24">
                <div class="map-wrapper" id="my-map-wrapper"></div>
                <div class="map-input-search">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="local" placeholder="请输入地名" >
                                <i slot="suffix" class="el-input__icon el-icon-close" @click="clearInput"></i>
                            </el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="handleSearch" type="primary">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="tag-wrapper">
            <div class="red-tag-wrapper">
                <span class="red-tag"></span>
                <span class="red-text">十分拥堵</span>
            </div>
            <div class="yellow-tag-wrapper">
                <span class="yellow-tag"></span>
                <span class="yellow-text">拥堵</span>
            </div>
            <div class="green-tag-wrapper">
                <span class="green-tag"></span>
                <span class="green-text">通畅</span>
            </div>
        </div>
    </div>
</template>
<script>
    import BMap from 'BMap';
    import {Col,Row,Table,Input,Button} from 'element-ui';
    export default {
        data() {
            return {
                local:'',
                map:null
            }
        },
        mounted () {
            this.initMap();
            this.addMapControl();
            if(!this.getRoadMap) {
                this.$store.dispatch('roadMapGeneral').then((resp) => {
                    if (resp.code=='0') {
                        console.log('roadMap axios successfully');
                        this.roadMapDataFormatter();
                    } else {
                        console.log(resp.msg);
                    }
                })
            }else {
                this.roadMapDataFormatter();
            }
        },
        components:{
            Col,Row,Table,Input,Button
        },
        methods: {
            initMap () {
                // 初始化容器
                 this.map = new BMap.Map("my-map-wrapper");
                // 初始化座标
                let point = new BMap.Point(120.126039,30.285346);
                // 地图級別
                this.map.centerAndZoom(point, 15);
                // 添加地图
                this.map.addControl(new BMap.MapTypeControl());
                // 滚轮
                this.map.enableScrollWheelZoom(true);
                // 双击
                this.map.enableDoubleClickZoom(true);
                // 键盘移动
                this.map.enableKeyboard();
                let marker = new BMap.Marker(point);
                this.map.addOverlay(marker);
            },
            addMapControl () {
                // 缩放控件
                let ctrl_nav =  new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                this.map.addControl(ctrl_nav);
                // 缩略图控件
                let ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
                this.map.addControl(ctrl_ove);
                // 比例尺控件
                let ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                this.map.addControl(ctrl_sca);
            },
            handleSearch () {
                alert('1');
                let local = new BMap.LocalSearch("杭州市", {
                    renderOptions:{map: this.map,autoViewport: true}
                });
                local.searchNearby(this.local);
            },
            clearInput () {
                this.local = '';
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
        },
        computed:{
            getRoadMap () {
                return this.$store.getters['getRoadMap'];
            },

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .map-container{
        width 100%;
        height 100%;
        .tag-wrapper{
            position absolute;
            z-index 100;
            top 12px;
            right 400px;
            height 15px;
            width 360px;
            font-size 0;
            .green-tag-wrapper{
                display inline-block;
                height 15px;
                width 120px;
                .green-tag{
                    display inline-block;
                    width 15px;
                    height 12px;
                    margin-right  10px;
                    background-color green;
                }
                .green-text{
                    display inline-block;
                    height 15px;
                    line-height 15px;
                    font-size 12px;
                }
            }
            .yellow-tag-wrapper{
                display inline-block;
                height 15px;
                width 120px;
                .yellow-tag{
                    display inline-block;
                    width 15px;
                    height 12px;
                    background-color yellow;
                    margin-right  10px;
                }
                .yellow-text{
                    display inline-block;
                    height 15px;
                    line-height 15px;
                    font-size 12px;
                }
            }
            .red-tag-wrapper{
                display inline-block;
                height 15px;
                width 120px;
                .red-tag{
                    display inline-block;
                    width 15px;
                    height 12px;
                    background-color red;
                    margin-right 10px;
                }
                .red-text{
                    display inline-block;
                    height 15px;
                    line-height 15px;
                    font-size 12px;
                }
            }
        }
        .map-wrapper{
            min-height 750px;
            width 100%;
            margin-bottom 20px;
        }
        .map-input-search{
            position absolute;
            top 2px;
            right 200px;
            width 200px;
            height 40px;
            z-index 99;
            .el-button{
                height 40px;
            }
        }
    }
</style>