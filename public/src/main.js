import Vue from 'vue';
import ElementUi from 'element-ui';
import router from './router/index';
import store from './store/index';
import vueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUi);
Vue.use(vueRouter);
// Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
    el:'#app',
    components: {App},
    template:'<App/>',
    router,
    store
});