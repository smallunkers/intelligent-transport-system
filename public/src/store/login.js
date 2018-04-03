import {register,forgetPassword,login,changePwd,checkUserId} from '../api/login';

const user = {
    state:{
        user:{
            loginErrorMsg:'',
        },
        userInfo: {

        }
    },
    mutations:{
        SET_LOGIN_ERROR_MSG:(state, message) =>{
            state.user.loginErrorMsg = message;
        },
        SET_LOGIN_USER_INFO:(state, message) => {
            state.userInfo = message;
        }
    },
    actions: {
        userLogin({commit}, data) {
            return  new Promise((resolve,reject)=> {
                 login(data).then((resp) => {
                    if (resp.code == 0) {
                        commit('SET_LOGIN_USER_INFO', resp.data.userInfo);
                        location.href = '/';
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
                forgetPassword({data}).then((resp) => {
                    if(resp.code == 0) {

                    }else {

                    }
                    resolve(resp);
                }).catch((error)=>{
                    reject(error);
                })
            });
        },
        checkUser ({commit},data) {
            return new Promise((resolve,reject) => {
                checkUserId(data).then((resp)=>{
                    if (resp.code==0) {

                    }else{

                    }
                    resolve(resp);
                }).catch((error)=>{
                    reject(error);
                })
            })
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
                register(data).then((resp) => {
                    if (resp.code==0){

                    }else {

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