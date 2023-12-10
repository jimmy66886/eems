import VueRouter from "vue-router";
import Vue from 'vue'
import LoginView from "../views/LoginView"

Vue.use(VueRouter)

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: LoginView
        }
    ],
})