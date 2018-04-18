<template>
    <div class="app-wrapper">
        <div class="app-sidebar-wrapper">
            <side-bar></side-bar>
        </div>
        <div class="app-main-wrapper" id="app-main" :style="style">
            <div class="app-header-wrapper">
                <header-bar></header-bar>
            </div>
            <div class="app-main-container background-color">
                <app-main></app-main>
            </div>
        </div>
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
        @include clearfix;
        position relative;
        height 100%;
        width 100%;
        .app-sidebar-wrapper{
            transition width 0.28s;
            width 180px!important;
            height 100%;
            position fixed;
            top 0;
            bottom 0;
            left 0;
            z-index 1001;
        }
        .app-main-wrapper{
            min-height 100%;
            transition margin-left 0.28s;
            margin-left 180px;
            .all-height{
                height 100%;
                padding 0;
                margin 0;
            }
            .background-color{
                background-color #f0f2f5;
            }
            .app-header-wrapper{
                height 62px;
                line-height 62px;
                width 100%;
            }
            .app-main-container{
                height 100%;
                width 100%;
                transition margin-left 0.28s;
            }
        }
    }
</style>