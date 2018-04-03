import Vue from 'vue';
import Vuex from 'vuex';
import login from './login.js';
import module from './main';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        login,
        module
    }
});

export default store
