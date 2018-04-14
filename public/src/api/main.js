import axios from 'axios';

export function roadInfo (data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/main/roadInfo/roadInfoGeneral'
    })
}

export function roadEmergency(data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/main/roadEmergency/roadEmergencyAll'
    })
}

export function roadMap(data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/main/roadMap/roadMapAll'
    })
}

export function roadCrowdTable (data) {
    return axios({
        data:data,
        method: 'post',
        url:'/api/main/roadResolve/roadCrowd'
    })
}

export function roadResolve (data) {
    return axios({
        data:data,
        method:'post',
        url:'/api/main/roadResolve/resolveItem'
    })
}