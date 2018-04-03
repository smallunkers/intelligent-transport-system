<template>
    <div class="accident-wrapper">
        <el-row>
            <el-col :span="20" :offset="2">
                <el-carousel :interval="4000" trigger="click" type="card" v-if="getRoadEmergency.accident" @change="handleChange">
                    <el-carousel-item v-for="(item,index) in getRoadEmergency.accident.carouselData" :key=index>
                        <div class="carousel-img-wrapper" v-html="imgFormatter">

                        </div>
                        <div class="carousel-content-wrapper" v-show=" activeIndex == index ? true: false">
                            <span class="carousel-content">{{item.content}}</span>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="20">
                <div class="table-header">杭州市近几日交通事故汇总</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="20">
                <el-table :data="tableDataFormatter" height="250" border>
                    <el-table-column label="时间" prop="time" min-width="15%">

                    </el-table-column>
                    <el-table-column label="地点" prop="address" min-width="15%">

                    </el-table-column>
                    <el-table-column label="概要" prop="content" min-width="40%">

                    </el-table-column>
                    <el-table-column label="伤亡人数" prop="casualty" min-width="15%">

                    </el-table-column>
                    <el-table-column label="状态" prop="manage" min-width="15%">

                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {Carousel,CarouselItem,Collapse,CollapseItem,Table,TableColumn,Row,Col } from 'element-ui';
    export default {
        data () {
            return{
                carouselData:[
                    {
                        title:'',
                    }
                ],
                tableData:[],
                activeIndex:'',
                img1:require('../../../assets/img/carousel_img1.jpg'),
                img2:require('../../../assets/img/carousel_img2.jpg'),
                img3:require('../../../assets/img/carousel_img3.jpg'),
                html:''
            }
        },
        methods:{
            handleChange(nowIndex) {
//                console.log('the now Index is-----' + nowIndex)
                this.activeIndex = nowIndex;
            }
        },
        components:{
            Collapse,CollapseItem,Carousel,CarouselItem
        },
        computed:{
            getRoadEmergency () {
                return this.$store.getters['getRoadEmergency'];
            },
            imgFormatter () {
                if(this.getRoadEmergency.accident) {
                    let data = this.getRoadEmergency.accident.carouselData
                    for (let i=0;i < data.length; i++) {
                        if(data[i].url.indexOf('1') > 0) {
                            this.html = `<img src="${this.img1}" class=""/>`
                        }else if (data[i].url.indexOf('2') > 0) {
                            this.html = `<img src="${this.img2}" class=""/>`
                        }else if (data[i].url.indexOf('3')){
                            this.html = `<img src="${this.img3}" class=""/>`
                        }
                    }
                }
                return this.html;
            },
            tableDataFormatter () {
                if(this.getRoadEmergency.accident.accidentAllData) {
                    let data = this.getRoadEmergency.accident.accidentAllData;
                    for(let i=0;i < data.length; i++) {
                        let item = {},
                            death= '',
                            injured = '';
                        item.time = data[i].time;
                        item.address = data[i].address;
                        death = data[i].casualty.split('/')[0];
                        injured = data[i].casualty.split('/')[1];
                        item.casualty = `死亡${death}人，受伤${injured}人`;
                        item.content = data[i].content;
                        item.manage = data[i].manage=='0'?'已处理':'未处理';
                        this.tableData.push(item);
                    }
                }
               return this.tableData;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .accident-wrapper{
        width 100%;
        min-height 100%;
        .carousel-img-wrapper{
            width 100%;
            height 200px;
        }
        .table-header{
            text-align center;
            font-size 16px;
            font-weight bold;
            color #606266;
            margin 15px 0;
        }
        .carousel-content-wrapper{
            background black;
            line-height 20px;
            padding 0 10px;
            color white;
            opacity 0.6;
            font-size 14px;
            margin-top 20px;
        }
    }
</style>