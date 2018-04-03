import axios from 'axios';
export function login(data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/login/handleLogin'
    });
}
export function forgetPassword (data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/login/forgetPassword'
    });
}

export function register (data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/login/register'
    })
}
export function changePwd (data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/login/changePassword'
    })
}
export function checkUserId (data) {
    return axios({
        data:data,
        methods:'post',
        url:'/api/login/checkUserId'
    })
}