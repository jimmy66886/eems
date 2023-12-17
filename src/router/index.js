import VueRouter from "vue-router";
import Vue from 'vue'
import LoginView from "../views/LoginView"
import SltAdmin from "../views/SltAdmin"
import SeAdmin from "../views/SeAdmin"
import TeacherView from "../views/TeacherView"
import StudentView from "../views/StudentView"
import BpprtCheck from "../components/BpprtCheck"
import VaccCheck from "../components/VaccCheck"
Vue.use(VueRouter)

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: LoginView
        },
        {
            path: '/slt',
            component: SltAdmin
        },
        {
            path: '/se',
            component: SeAdmin
        },
        {
            path: '/te',
            component: TeacherView
        },
        {
            path: '/stu',
            component: StudentView
        },
        {
            path: '/bpprt',
            component: BpprtCheck
        },
        {
            path: '/vacc',
            component: VaccCheck
        },
    ],
})