import Vue from 'vue';
import Router from 'vue-router';

console.log(process.env.NODE_ENV);

import Login from '../views/login/index.vue';
import Layout from '../views/layout/index.vue';
import Error404 from '../views/error404/index.vue';
import Register from '../views/login/register.vue';
import ForgetPwd from '../views/login/forgetPwd.vue';
import RoadInfo from'../views/layout/roadInfo/index.vue';
import RoadMap from '../views/layout/roadMap/index.vue';
import RoadResolve from '../views/layout/roadResolve/index.vue';
import Emergency from '../views/layout/roadEmergency/index.vue';
import Trend from '../views/layout/roadEmergency/trend.vue';
import Plan from '../views/layout/roadEmergency/plan.vue';
import Accident from '../views/layout/roadEmergency/accident.vue';


const constantRouterMap = [
    {path:'/login', component: Login},
    {path:'/register', component:Register},
    {path:'/forgetPwd', component: ForgetPwd},
    {
        path: '/home',
        component:Layout,
        children:[
            {
                path: 'roadInfo',
                component: RoadInfo
            },
            {
                path: 'roadMap',
                component: RoadMap
            },
            {
                path:'roadResolve',
                component:RoadResolve
            },
            {
                path:'roadEmergency',
                component:Emergency,
                redirect:'/home/roadEmergency/trend',
                children:[
                    {
                        path:'trend',
                        component: Trend
                    },
                    {
                        path:'accident',
                        component:Accident
                    },
                    {
                        path:'plan',
                        component:Plan
                    }
                ]
            }
        ],
    },
    {path:'/',redirect:'/home/roadInfo'},
    {path: '/404',component:Error404},
    {path:'*',redirect:'/404'}

];
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})