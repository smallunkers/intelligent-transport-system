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