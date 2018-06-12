<template>
    <div class="header-wrapper">
        <div  class="header-bar" :default-active="activeIndex" mode="horizontal"  text-color="#fff" @select="handleSelect" active-text-color="#ffd04b">
            <el-row class="header-bar-el-row">
                <el-col :span="20">
                    <i class="el-icon-location icon"></i>
                    <span class="area">管理区域：>>>  杭州市</span>
                    <span class="greeting-tip">hello , welcome back! Today is {{date}}, good luck!</span>
                </el-col>
                <el-col :offset="14" :span="2" class="head-nav-user">
                    <el-dropdown class="avatar-container"  @command="handleLogout">
                        <div class="avatar-wrapper">
                            <img class="user-avatar" src="../../assets/img/avatar.gif" width="45" height="45"/>
                            <i class="el-icon-caret-bottom"></i>
                        </div>
                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item command="a">{{userName}}</el-dropdown-item>
                    <el-dropdown-item command="b">登出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {Row,Col,Dropdown,DropdownMenu, DropdownItem} from 'element-ui';
    import {formatDate} from '../../utils/dateUtil.js';
    export default {
        data(){
            return {
                activeIndex:'1',
                date:'',
                userName:''
            }
        },
        components: {
            Row,Col,Dropdown, DropdownMenu, DropdownItem
        },
        created() {
            let locale = 'en';
            this.date = formatDate(locale);
            // cookie 检验
            let cookie = document.cookie.split(';')
            let userName=null;
            for(let i=0;i < cookie.length;i++) {
               let co =  cookie[i]
                if(co.indexOf('userName') >= 0){
                   userName = co.split('=')[1]
                    console.log(userName)
                }
            }
            if(userName) {
                this.userName = userName
            }else{
                this.$router.push('/login');
            }
        },
        methods:{
            handleSelect (key,keyPath) {

            },
            handleLogout (command) {
                if(command =='b') {
                    alert('1')
                    console.log('handleLogout')
                    let d = new Date();
                    d.setTime(d.getTime() + ((-1)*24*60*60*1000));
                    let expires = "expires="+d.toUTCString();
                    let value = '';
                    document.cookie = `userName=${value};${expires}`
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus">
    @font-face{
        font-family Rufbrush
        src url('../../assets/fonts/font1007/rufbrush.ttf');
    }
    .header-wrapper{
        height 100%;
        border-bottom 1px solid #d8dce5
        box-shadow 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
        margin-bottom 5px;
        .header-bar{
            height 100%;
            .header-bar-el-row{
                height 100%;
                .area{
                    font-size 18px;
                    line-height 62px;
                    height 62px;
                    display inline-block;
                    color #606266;
                    margin-right:50px;
                }
                .icon{
                    display inline-block;
                    padding 0 10px;
                    font-size 20px;
                    color cornflowerblue;
                }
                .greeting-tip{
                    font-family Rufbrush;
                    font-size 18px;
                    line-height 62px;
                    height 62px;
                    display inline-block;
                    color #606266;
                    padding 0 15px;
                    /*margin-left 500px;*/
                }
                .head-nav-user{
                    .avatar-container {
                        height 50px;
                        display inline-block;
                        position absolute;
                        right 35px;
                        top 0;
                        padding 0 0;
                        .avatar-wrapper {
                            cursor pointer;
                            margin-top 5px;
                            position relative;
                            .user-avatar {
                                width 40px;
                                height 40px;
                                border-radius 10px;
                            }
                            .el-icon-caret-bottom {
                                position absolute;
                                right -20px;
                                top 25px;
                                font-size 12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>