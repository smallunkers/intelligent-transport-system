<template>
    <div class="side-bar-wrapper">
        <el-menu  mode="vertical"  :default-active="routerLink" class="el-menu-vertical-demo side-bar" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <router-link to="/home/roadInfo" class="clear-a-style">
                <el-menu-item index="roadInfo" >
                    <i class="el-icon-menu"></i>
                    <span >交通概况</span>
                </el-menu-item>
            </router-link>
            <router-link to="/home/roadMap" class="clear-a-style">
                <el-menu-item index="roadMap">
                    <i class="el-icon-document"></i>
                    <span >城市地图</span>
                </el-menu-item>
            </router-link>
            <router-link to="/home/roadResolve" class="clear-a-style">
                <el-menu-item index="roadResolve" >
                    <i class="el-icon-setting"></i>
                    <span>解决方案</span>
                </el-menu-item>
            </router-link>
            <router-link to="/home/roadEmergency" class="clear-a-style">
                <el-menu-item index="roadEmergency" >
                    <i class="el-icon-location"></i>
                    <span>紧急事件</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script>
    import {Menu,MenuItem} from 'element-ui';
    export default {
        data() {
            return{
                routes: '',
            }
        },
        methods:{
            handleOpen () {

            },
            handleClose() {

            }
        },
        computed:{
            routerLink () {
                let routes = window.location.pathname;
                this.routes = '';
                if(routes.indexOf('/roadInfo') > 0) {
                    this.routes =  'roadInfo';
                }else if (routes.indexOf('/roadMap') > 0) {
                    this.routes = 'roadMap';
                }else if (routes.indexOf('/roadResolve') > 0) {
                    this.routes = 'roadResolve';
                }else if (routes.indexOf('/roadEmergency') > 0) {
                    this.routes = 'roadEmergency';
                }
                return  this.routes;
            }
        }
    }
</script>
<style rel="stylesheet/stylus" lang="stylus">
    .side-bar-wrapper{
        height 100%;
        .side-bar{
            height 100%;
            .clear-a-style{
                text-decoration none;
                color $blue;
                font-size 10px;
                display inline-block;
            }
        }
    }
</style>