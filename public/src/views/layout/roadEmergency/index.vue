<template>
    <div class="road-emergency-wrapper">
        <el-row>
            <el-col :span="24">
                <div class="road-emergency-tab">
                    <el-menu  router mode="horizontal"  :default-active="$route.path" class="el-menu-demo">
                        <el-menu-item index="/home/roadEmergency/trend" >
                            <span >交通动态</span>
                        </el-menu-item>
                        <el-menu-item index="/home/roadEmergency/accident">
                            <span >重大事故</span>
                        </el-menu-item>
                        <el-menu-item index="/home/roadEmergency/plan">
                            <span>道路定制</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" :offset="0">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {Row,Col,Table,Collapse,Tabs,TabPane,Menu,MenuItem} from 'element-ui';
    export  default {
        data() {
            return {
                activeName:'',
                routes:'',
            }
        },
        created () {
            this.$store.dispatch('roadEmergencyGeneral').then((resp) => {
                if (resp.code=='0') {
                    console.log('roadEmergencyGeneral success');
                }else {
                    console.log('error msg is -----' + resp.msg);
                }
            })
        },
        methods: {
            handleOpen () {

            },
            handleClose() {

            }
        },
        computed: {
          routerLink () {
              let routes = window.location.pathname;
              if (routes.indexOf('/home/roadEmergency/trend') > 0) {
                  this.routes = 'trend';
              }else if (routes.indexOf('/home/roadEmergency/accident') > 0) {
                  this.routes = 'accident';
              }else if (routes.indexOf('/home/roadEmergency/plan') > 0) {
                  this.routes = 'plan';
              }
              return this.routes;
          }
        },
        components:{
            Row,Col,Table,Collapse,Tabs,TabPane,Menu,MenuItem
        }
    }
</script>
<style rel="stylesheet/stylus" lang="stylus">
    .road-emergency-wrapper{
        width 100%;
        min-height 100%;
        .clear-a-style{
            text-decoration none;
            font-size 12px;
            display inline-block;
        }
    }
</style>