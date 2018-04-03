<template>
    <div class="accident-wrapper">
        <el-carousel>
            <el-carousel-item>

            </el-carousel-item>
            <el-carousel-item>

            </el-carousel-item>
            <el-carousel-item>

            </el-carousel-item>
            <el-carousel-item>

            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import {Carousel,CarouselItem,Collapse,CollapseItem } from 'element-ui';
    export default {
        data () {
            return{

            }
        },
        components:{
            Collapse,CollapseItem,Carousel,CarouselItem
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .accident-wrapper{
        width 100%;
        height 100%;
    }
</style>