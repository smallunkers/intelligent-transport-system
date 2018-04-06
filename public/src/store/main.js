import {roadInfo,roadEmergency,roadMap} from '../api/main';
const main = {
    state:{
        roadInfo:null,
        roadEmergency:null,
        roadMap:null
    },
    mutations:{
        SET_ROAD_INFO : (state,roadInfo) => {
            state.roadInfo = roadInfo;
        },
        SET_ROAD_EMERGENCY: (state,roadEmergency) => {
            state.roadEmergency = roadEmergency;
        },
        SET_ROAD_MAP: (state, roadMap) => {
            state.roadMap = roadMap;
        }
    },
    actions:{
        roadInfoGeneral ({commit},data) {
            return new Promise((resolve,reject) => {
                roadInfo(data).then((resp) => {
                    console.log('resp is----');
                    console.log(resp);
                    if (resp.data.code=='0') {
                        commit('SET_ROAD_INFO', resp.data.data || {});
                    }else {
                        console.log('axios error');
                    }
                    resolve(resp.data);
                }).catch((error)=> {
                    reject(error);
                })
            })
        },
        roadEmergencyGeneral({commit},data) {
            return new Promise((resolve, reject)=> {
                roadEmergency(data).then((resp) => {
                    console.log('roadEmergency is ------');
                    console.log(resp);
                    if (resp.data.code == '0') {
                        commit('SET_ROAD_EMERGENCY', resp.data.data || {});
                    }else {
                        console.log('axios roadEmergency error!');
                    }
                    resolve(resp.data);
                }).catch((error) => {
                    reject(error);
                });
            })
        },
        roadMapGeneral ({commit},data) {
            return new Promise((resolve,reject) =>{
              roadMap(data).then((resp) => {
                  console.log('roadMap is ------');
                  console.log(resp);
                  if (resp.data.code=='0') {
                      commit('SET_ROAD_MAP',resp.data.data || {})
                  }else {
                      console.log('axios roadMap failed');
                  }
                  resolve(resp.data);
              }).catch((error)=> {
                  reject(error);
              })
            })
        }
    },
    getters:{
        getRoadInfo: state => state.roadInfo,
        getRoadEmergency: state => state.roadEmergency,
        getRoadMap: state => state.roadMap
    }
};
export default main;