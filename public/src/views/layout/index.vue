<template>
    <div class="app-wrapper">
        <div class="app-header-wrapper">
            <header-bar></header-bar>
        </div>
        <el-row class="app-main-wrapper" id="app-main" :style="style">
            <el-col :span="3" :offset="0" class="all-height">
                <div class="app-sidebar-wrapper">
                    <side-bar></side-bar>
                </div>
            </el-col>
            <el-col :span="21" class="background-color"  >
                <div class="app-main-container" id="app-main">
                    <app-main></app-main>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import  headerBar from './headerbar.vue';
    import  appMain from './AppMain.vue';
    import  sideBar from './sidebar.vue';
    import {Col,Row} from 'element-ui'
    export default {
        data () {
            return{
                style:{
                    height:''
                },
                exist:true
            }
        },

        components:{
            headerBar,
            appMain,
            sideBar
        },
        mounted(){
            console.log('height is ----' + document.getElementById('app-main').scrollHeight);
            this.style.height = document.getElementById('app-main').scrollHeight + 'px';
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app-wrapper{
        position relative;
        width 100%;
        height 100%;
        .app-header-wrapper{
            height 62px;
            line-height 62px;
            width 100%;
        }
        .app-main-wrapper{
            min-height 100%;
            .all-height{
                height 100%;
                padding 0;
                margin 0;
            }
            .background-color{
                background-color #f0f2f5;
            }
            .app-sidebar-wrapper{
                height 100%;
            }
            .app-main-container{
                height 100%;
            }
        }
    }
</style>