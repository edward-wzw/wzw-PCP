import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/unSubmitCase'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/unSubmitCase',
                    component: resolve => require(['../components/page/unSubmitCase.vue'], resolve),
                    meta: { title: '待提交病例' }
                },
                {
                    path: '/unDiagnoseCase',
                    component: resolve => require(['../components/page/unDiagnoseCase.vue'], resolve),
                    meta: { title: '待诊断病例' }
                },
                {
                    path: '/hasDiagnosedCase',
                    component: resolve => require(['../components/page/hasDiagnosedCase.vue'], resolve),
                    meta: { title: '已诊断病例' }
                },
                {
                    path: '/hasCancelledCase',
                    component: resolve => require(['../components/page/hasCancelledCase.vue'], resolve),
                    meta: { title: '已退回/已取消病例' }
                },
                {
                    path: '/frozenAppointment',
                    component: resolve => require(['../components/page/frozenAppointment.vue'], resolve),
                    meta: { title: '冰冻预约申请' }
                },
                {
                    path: '/caseStatistics',
                    component: resolve => require(['../components/page/caseStatistics.vue'], resolve),
                    meta: { title: '病例综合统计' }
                },
                {
                    path: '/broadcast',
                    component: resolve => require(['../components/page/broadcast.vue'], resolve),
                    meta: { title: '视频预约' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/admin',
                    component: resolve => require(['../components/page/admin.vue'], resolve),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '用户信息' }
                },
                // {
                //     path: '/usermanager',
                //     component: resolve => require(['../components/page/sysmanager/usermanager.vue'], resolve),
                //     meta: { title: '用户管理' }
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
