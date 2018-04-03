<template>
    <div class="trend-wrapper">
        <el-collapse accordion v-model="activeName" class="my-collapse">
            <el-collapse-item v-for="(item,index) in getRoadEmergency.trend" :key="index" :title="item.title" :name="index">
                <div class="trend-item-content">{{item.content}}</div>
                <div v-if="item.speed" class="trend-item-speed">{{item.speed}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import {Collapse,CollapseItem} from 'element-ui';
    export default {
        data () {
            return{
                activeName:'',
                trendData:[]
            }
        },
        computed:{
            getRoadEmergency () {
                return this.$store.getters['getRoadEmergency'];
            }
        },
        components:{
            Collapse,CollapseItem
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #409eff;
    $dark = #444;
    .trend-wrapper{
        width 90%;
        height 100%;
        padding 20px;
        margin 0 auto;
        border-radius 10px;
        .my-collapse{
            border-radius 10px;
            .trend-item-content{
                font-size 15px;
                color $blue;
                height 40px;
                line-height 20px;
                padding-left 20px;
                margin-bottom 5px;
            }
            .trend-item-speed{
                padding-left 20px;
                color $dark;
                height 30px;
                line-height 30px;
                font-size 13px;
            }
            .el-collapse-item__header{
                padding-left 20px;
                padding-right 20px;
                font-size 14px;
                box-sizing border-box;
            }
        }
    }
</style>