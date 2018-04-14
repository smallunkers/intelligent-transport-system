import {roadInfo,roadEmergency,roadMap,roadResolve,roadCrowdTable} from '../api/main';
const main = {
    state:{
        roadInfo:null,
        roadEmergency:null,
        roadMap:null,
        roadCrowd:null,
        resolveItem:null
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
        },
        SET_ROAD_CROWD: (state, roadCrowd) => {
            state.roadCrowd = roadCrowd;
        },
        SET_RESOLVE_ITEM:(state, resolveItem) => {
            state.resolveItem = resolveItem;
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
        },
        roadResolveGeneral ({commit},data) {
            return new Promise((resolve,reject) => {
                roadResolve(data).then((resp)=> {
                    console.log('roadResolve is --------');
                    console.log(resp);
                    if (resp.data.code == '0') {
                        commit('SET_RESOLVE_ITEM',resp.data.data || {});
                    } else {
                        console.log('roadResolve error!');
                    }
                    resolve(resp.data);
                }).catch((error)=> {
                  reject(error);
                })
            })
        },
        roadCrowdGeneral ({commit},data) {
            return new Promise((resolve, reject)=> {
                roadCrowdTable(data).then((resp) => {
                    console.log('roadCrowd is ---------');
                    console.log(resp);
                    if (resp.data.code=='0') {
                        commit('SET_ROAD_CROWD',resp.data.data || {});
                    }
                }).catch((error)=>{
                    reject(error);
                })
            })
        }
    },
    getters:{
        getRoadInfo: state => state.roadInfo,
        getRoadEmergency: state => state.roadEmergency,
        getRoadMap: state => state.roadMap,
        getRoadCrowd: state => state.roadCrowd,
        getResolveItem: state => state.resolveItem
    }
};
export default main;