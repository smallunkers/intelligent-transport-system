<template>
    <div class="forget-container">
        <el-form v-if="showObj.showForm" :model="userIdForm" class="forget-form">
            <div class="check-wrapper">
                请输入您的用户唯一id
            </div>
            <el-form-item prop="userId" >
                <el-input v-model="userIdForm.userId" placeholder="验证您的用户标识id"></el-input>
            </el-form-item>
            <el-button @click="holdSubmit" type="primary">提交</el-button>
        </el-form>
        <el-form v-else :model="changePassForm" class="changePass-container">
            <div class="enter-pass">
                请输入您的新密码
            </div>
            <el-form-item prop="password" >
                <el-input v-model="changePassForm.password" placeholder="您的新密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input v-model="changePassForm.confirmPassword" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-button @click="changePassword" type="primary">提交</el-button>
        </el-form>
    </div>
</template>

<script>
    import {Form,FormItem,Button,Input} from 'element-ui';
    import {passwordRule1,confirmPassRule} from '../../utils/validateRule';
    export  default {
        data() {
            return {
                showObj:{
                    showForm: false,
                },
                userIdForm:{
                    userId:''
                },
                changePassForm:{
                    userId:'',
                    password:'',
                    confirmPassword:'',
                },
                changePassRules:{
                    password:[{
                        trigger:'blur',
                        validator:passwordRule1.bind(),
                    }],
                    confirmPassword:[{
                        trigger:'blur',
                        validator:passwordRule1.bind(),
                    },
                        {
                            trigger:'blur',
                            validator:confirmPassRule.bind({
                                newPassword: ()=> this.registerForm.confirmPassword
                            }),
                        }]
                }

            }
        },
        methods:{
            toggleForm() {
                this.showObj.showForm = !this.showObj.showForm;
            },
            holdSubmit () {
                this.$store.dispatch('checkUser',this.userIdForm).then((resp)=>{
                    if(resp.code==0){
                        this.changePassForm.userid = this.userIdForm.userId;
                        this.toggleForm();
                    }else{
                        this.$notify({
                            title:'错误',
                            message:'不存在该id',
                            type:'error',
                        });
                    }
                });
            },
            changePassword () {
                this.$store.dispath('changePassword',this.changePassForm).then((resp)=>{
                    if(resp.code==0){
                        const title = '修改成功';
                        const content = '修改密码成功，即将跳转回登录页面';
                        this.$alert(content,title,{
                            confirmButtonText:'确定',
                            callback: () => {
                                this.$router.push('/login');
                            }
                        })
                    }else{
                        this.$notify({
                            title:'错误',
                            message:'系统出错，请稍微重试',
                            type:'error',
                        });
                    }
                })
            }
        },
        components:{
            Form,FormItem,Button,Input
        }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus">
    .forget-container {
        $light_gray =  #333333;
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
        .forget-form, .changePass-container{
            position absolute;
            left 0;
            right 0;
            width 320px;
            padding 10px 35px 10px 35px;
            margin 140px auto 0px;
            background-color #fff;
            border-radius 14px;
            opacity 0.9;
            .check-wrapper, .enter-pass{
                width 100%
                margin 12px auto 20px auto;
                display inline-block;
                font-size 18px;
                color $light_gray
                height 40px;
                line-height 40px;
            }
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
        }
        .el-button{
            width 100%;
            margin-bottom 30px;
        }
    }
</style>