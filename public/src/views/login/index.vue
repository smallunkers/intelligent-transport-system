<template>
    <div class="login-container">
        <div class="login-tip">Hello,Welcome Back!</div>
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="login-title-wrapper">
                <span class="login-title">LOGIN YOUR ACCOUNT</span>
            </div>
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
                <i class="icon icon-user-tie"></i>
            </el-form-item>
            <el-form-item>
                <el-input name="password"  @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on" type="password"
                          placeholder="密码"/><i class="icon-eye icon"></i>
            </el-form-item>
            <el-collapse-transition>
                <div class="login-fail-tip" v-show="showObj.showFailTip">很抱歉，您的账号或者密码有误！</div>
            </el-collapse-transition>
                <div class="register-wrapper">
                <span class="forget-pwd clear-a-style" @click="forgetPwd">忘记密码</span>
                <span class="register clear-a-style" @click="goToRegister">还没有账号？注册一个</span>
                <div style="clear: both"></div>
            </div>
            <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>

    </div>
</template>

<script>
    import {Form,FormItem,Input,Button,Collapse,Loading} from 'element-ui';
    export default {
        data () {
            return{
                showObj:{
                  showFailTip:false,
                },
                loginForm:{
                    username:'',
                    password:'',
                },
                loginRules:{
                    username:'',
                    password:''
                },
                loadingOptions:{
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }

            }
        },
        methods: {
            toggleFailTip () {
                this.showObj.showFailTip = !this.showObj.showFailTip
            },
            goToRegister () {
                this.$router.push('/register');
                console.log('register');
            },
            handleLogin () {
                let loadingInstance = Loading.service(this.loadingOptions);
                this.$store.dispatch('userLogin',this.loginForm).then((value)=>{
                    console.log(value)
                    if (value.code =='0') {
                        loadingInstance.close();
                        let date = new Date()
                        date.setTime(date.getTime()+24*60*60*1000)
                        let expires="expires="+date.toGMTString();
                        document.cookie= `userName=${value.data.userInfo.userName};${expires}`
                        this.$router.push('/home/roadInfo');
                    }else{
                        this.toggleFailTip();
                        loadingInstance.close();
                    }
                });
            },
            forgetPwd () {
                this.$router.push('/forgetPwd');
            },
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
    $bg = #2d3a4b;
    $dark_gray = #000000;
    $light_gray = #333333;
    $white = #ffffff;
    $blue = #409EFF;
    $middle_gray = #969696;
    $red = red;
    @import '../../assets/fonts/iconmoon/style.css';
        .login-container {
            @include relative;
            height 100%;
            width 100%;
            background url("../../assets/img/bg.jpg") no-repeat center;
            input:-webkit-autofill {
                -webkit-box-shadow 0 0 0px 1000px #293444 inset !important;
                -webkit-text-fill-color #fff !important;
            }
            input {
                background: transparent;
                border 0;
                -webkit-appearance none;
                border-radius 0px;
                padding 12px 5px 12px 15px;
                color $light_gray;
                height 47px;
            }
            .login-tip{
                font-size 40px;
                position absolute;
                color $white;
                text-align center;
                left 0;
                width 100%;
                top 60px;
                text-shadow 2px 2px 1px $light_gray;
                font-family Verdana
                opacity 0.7;
            }
            .login-title-wrapper {
                width 100%;
                .login-title {
                    width 100%
                    margin 12px auto 20px auto;
                    display inline-block;
                    font-size 20px;
                    color $light_gray
                }
            }
            .login-form {
                position absolute;
                left 0;
                right 0;
                width 320px;
                padding 10px 35px 10px 35px;
                margin 140px auto 0px;
                background-color #fff;
                border-radius 14px;
                opacity 0.9;
                .el-form-item {
                    border 1px solid rgba(255, 255, 255, 0.1);
                    background rgba(0, 0, 0, 0.05);
                    border-radius 5px;
                    color #454545;
                    .el-input {
                        display inline-block;
                        height 47px;
                        width 85%;
                    }
                    .icon {
                        display inline-block;
                        text-align center;
                        font-size 24px;
                        vertical-align top;
                        color $middle_gray;
                        float right;
                        width 47px;
                        height 47px;
                        line-height 47px;
                    }
                }
                .clear-a-style{
                    text-decoration none;
                    color $blue;
                    font-size 10px;
                    display inline-block;
                }
                .login-fail-tip{
                    color $red;
                    font-size 14px;
                    margin-bottom:10px;
                }
                .register-wrapper {
                    width 100%;
                    margin-bottom 10px;
                    .register{
                        float right;
                        padding-right 3px;
                    }
                    .forget-pwd{
                        padding-left 3px;
                        vertical-align top;
                    }
                }
            }
            .el-button{
                width 100%;
                margin-bottom 30px;
            }
            .show-pwd {
                position absolute;
                right 10px;
                top 7px;
                font-size 16px;
                color $dark_gray;
                cursor pointer;
            }
        }
</style>