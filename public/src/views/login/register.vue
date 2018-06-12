<template>
    <div class="register-container">
        <el-form class="register-form" :model="registerForm" autoComplete="on" :rules="registerRules"  label-position="left">
            <div class="register-title-wrapper">
                <span class="register-title">REGISTER YOUR ACCOUNT</span>
            </div>
            <el-form-item prop="username">
                <el-input  v-model="registerForm.username" autoComplete="on" placeholder="账户，6-26位，包含大小写字母和数字"></el-input>
            </el-form-item>
            <el-form-item prop="password" >
                <el-input v-model="registerForm.password" autoComplete="on" placeholder="密码，6-16位，包含大小写字母和数字"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword" class="last-input">
                <el-input v-model="registerForm.confirmPassword" placeholder="确认密码"></el-input>
            </el-form-item>
            <div class="back-login"><span  @click="backLogin" class="clear-a-style">已有账号，返回登录</span></div>
            <el-button type="primary" @click="register">注册</el-button>
        </el-form>
    </div>
</template>

<script>
    import {FormItem,Form,Button,Input} from 'element-ui';
    import {accountRule,passwordRule1,confirmPassRule} from '../../utils/validateRule'
    export default {
        data() {
            return {
                registerForm:{
                    username:'',
                    password:'',
                    confirmPassword:''
                },
                registerRules:{
                    username:[{
                        trigger:'blur',
                        validator:accountRule.bind(),
                    }],
                    password:[{
                        trigger:'blur',
                        validator:passwordRule1.bind(),
                    }],
                    confirmPassword:[
                        {
                            trigger:'blur',
                            validator:passwordRule1.bind(),
                        },
                        {
                            trigger:'blur',
                            validator:confirmPassRule.bind({
                                newPassword: ()=> this.registerForm.confirmPassword
                            }),
                        }
                    ]
                }
            }
        },
        methods: {
            backLogin () {
                this.$router.push('/login');
            },
            register () {
                const title = '注册成功！';
                this.$store.dispatch('userRegister',this.registerForm).then((resp) => {
                    if(resp.code=='0') {
                        let content = '您的唯一用户标识为' + resp.data.userId + ',请记住您的标识，切勿泄露他人！';
                        this.$alert(content,title,{
                            confirmButtonText:'确认',
                            callback: () => {
                                this.$router.push('/home');
                            }
                        });
                    }else if(resp.code == '16001'){
                        this.$notify({
                            title:'错误',
                            message:'该用户名已经被注册',
                            type:'error',
                        });
                    }else {
                        this.$notify({
                            title:'错误',
                            message:'系统出现错误，请重试',
                            type:'error',
                        });
                    }
                });
            }
        },
        components:{
            FormItem,Form,Button,Input
        }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus" >
    $light_gray = #333333;
    $blue = #409EFF;
    .register-container{
        @include relative;
        position relative;
        background-size cover;
        height 100%;
        width 100%;
        background url("../../assets/img/bg.jpg") no-repeat center 0;
        input:-webkit-autofill {
            -webkit-box-shadow 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color #fff !important;
        }
        input {
            background transparent;
            border 0;
            -webkit-appearance none;
            border-radius 0px;
            padding 12px 5px 12px 15px;
            color $light_gray;
            height 47px;
        }
        .register-form{
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
            }
            .last-input{
                margin-bottom 10px
            }
            .register-title-wrapper{
                width 100%
                .register-title{
                    width 100%
                    margin 12px auto 20px auto;
                    display inline-block;
                    font-size 20px;
                    color $light_gray;
                }
            }
            .back-login{
                margin-bottom 15px;
                width 100%;
                padding-left 3px;
                .clear-a-style{
                    text-decoration none;
                    color $blue;
                    font-size 10px;
                    display inline-block;
                }
            }
            .el-button{
                width 100%;
                margin-bottom 30px;
            }
        }
    }
</style>