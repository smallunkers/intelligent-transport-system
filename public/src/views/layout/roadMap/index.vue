<template>
    <div class="map-container">
        <el-row>
            <el-col :span="24">
                <div class="map-wrapper" id="my-map-wrapper"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-table>
                    <!--<el-table-colmun></el-table-colmun>-->
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {Col,Row,Table} from 'element-ui';
    export default {
        data() {
            return {

            }
        },
        mounted () {
            this.initMap();
        },
        methods: {
            initMap () {
                let mp = new BMap.Map("my-map-wrapper");
                let point = new BMap.Point(120.13,30.27);
            },
            createMap () {

            },
            setMapEvent () {

            },
            addMapControl () {

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .map-wrapper{
        height 700px;
        margin-bottom 20px;
    }
</style>