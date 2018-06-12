import {register,forgetPassword,login,changePwd,checkUserId} from '../api/login';

const user = {
    state:{
        user:{
            loginErrorMsg:'',
        },
        userInfo: {

        },
        forgetPwdMsg:null,
        userRegister:{},
        forgetPwd:{}

    },
    mutations:{
        SET_LOGIN_ERROR_MSG:(state, message) =>{
            state.user.loginErrorMsg = message;
        },
        SET_LOGIN_USER_INFO:(state, message) => {
            state.userInfo = message;
        },
        SET_FORGET_PWD:(state, message) => {
            state.forgetPwd = message
        },
        SET_USER_REGISTER:(state, message) => {
            state.userRegister = message
        }
    },
    actions: {
        userLogin({commit}, data) {
            return  new Promise((resolve,reject)=> {
                 login(data).then((res) => {
                     let resp = res.data
                    if (resp.code == 0) {
                        console.log(resp)
                        commit('SET_LOGIN_USER_INFO', resp.data.userInfo);
                    } else {
                        commit('SET_LOGIN_ERROR_MSG', resp.msg);
                    }
                    resolve(resp);
                }).catch(error=>{
                    reject(error);
                 });
            });
        },
        userForgetPwd({commit}, data) {
            return new Promise((resolve,reject)=> {
                forgetPassword(data).then((res) => {
                    let resp = res.data
                    if(resp.code == 0) {
                       commit('SET_FORGET_PWD',resp.data)

                    }else {
                        console.log(resp.msg)
                    }
                    resolve(resp);
                }).catch((error)=>{
                    reject(error);
                })
            });
        },
        changePassword({commit},data) {
            return new Promise((resolve,reject)=> {
                changePwd(data).then((resp)=>{
                    if (resp.code==0) {

                    } else {

                    }
                    resolve(resp)
                }).catch((error)=>{
                    reject(error);
                })
            });
        },
        userRegister ({commit},data) {
            return new Promise((resolve,reject) => {
                register(data).then((res) => {
                    let resp = res.data
                    if (resp.code==0){
                        commit('SET_USER_REGISTER',resp.data)
                    }else {
                        console.log(resp.msg)
                    }
                    resolve(resp);
                }).catch(error=>{
                    reject(error);
                });
            });
        }
    },
    getters:{
        user: state => state.user,
        userInfo:state => state.userInfo,
    }
};

export  default  user;