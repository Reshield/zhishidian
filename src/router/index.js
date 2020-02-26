import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import list from '@/components/list'
import testList from '@/components/testList'
import markclass from '@/components/markclass'
import comment from '@/components/comment'
import comList from '@/components/comList'
import danxuanti from '@/components/exam/danxuanti'
import duoxuanti from '@/components/exam/duoxuanti'
import tiankongti from '@/components/exam/tiankongti'
import exercises from '@/components/exam/exercises'
import examClass from '@/components/exam/examClass'
import shareButton from '@/components/exam/shareButton'
import enterShare from '@/components/exam/enterShare'
import complaint from '@/components/complaint'
import addDanxuan from '@/components/add/addDanxuan'
import addDuoxuan from '@/components/add/addDuoxuan'
import addTiankong from '@/components/add/addTiankong'
import addFenxi from '@/components/add/addFenxi'
import addShare from '@/components/add/addShare'
import user from '@/components/user/user'
import userNews from '@/components/user/userNews'
import userInform from '@/components/user/userInform'
import userCollect from '@/components/user/userCollect'
import userAdd from '@/components/user/userAdd'
import userError from '@/components/user/userError'
import userQuestion from '@/components/user/userQuestion'
import store from './../store/store'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            children: [{
                    path: '/',
                    name: 'home',
                    component: home,
                },
                {
                    path: '/home/list',
                    name: 'list',
                    component: list,
                },
                {
                    path: '/home/testList',
                    name: 'testList',
                    component: testList,
                },
                {
                    path: '/home/user',
                    name: 'user',
                    component: user,
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/testList',
            name: 'testList',
            component: testList
        },
        {
            path: '/danxuanti',
            name: 'danxuanti',
            component: danxuanti,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/tiankongti',
            name: 'tiankongti',
            component: tiankongti,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/exercises',
            name: 'exercises',
            component: exercises,
            meta: {
                isLogin: true
            },
            children: [{
                    path: 'danxuanti',
                    name: 'danxuanti',
                    component: danxuanti
                },
                {
                    path: 'duoxuanti',
                    component: duoxuanti
                },
                {
                    path: 'tiankongti',
                    component: tiankongti
                },
            ]
        },
        {
            path: '/markclass',
            name: 'markclass',
            component: markclass,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/comment',
            name: 'comment',
            component: comment,
            meta: {
                isLogin: true
            },
            children: [{
                path: '/comList',
                name: 'comList',
                component: comList
            }]
        },
        {
            path: '/comList',
            name: 'comList',
            component: comList,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/duoxuanti',
            name: 'duoxuanti',
            component: duoxuanti,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/addDanxuan',
            name: 'addDanxuan',
            component: addDanxuan,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/addDuoxuan',
            name: 'addDuoxuan',
            component: addDuoxuan,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/addTiankong',
            name: 'addTiankong',
            component: addTiankong,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/addFenxi',
            name: 'addFenxi',
            component: addFenxi,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/shareButton',
            name: 'shareButton',
            component: shareButton,
            children: [{
                path: '/enterShare',
                name: 'enterShare',
                component: enterShare,
            }],
            meta: {
                isLogin: true
            }
        },
        {
            path: '/enterShare',
            name: 'enterShare',
            component: enterShare,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/complaint',
            name: 'complaint',
            component: complaint,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/examClass',
            name: 'examClass',
            component: examClass,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/addShare',
            name: 'addShare',
            component: addShare,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/userNews',
            name: 'userNews',
            component: userNews,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/userInform',
            name: 'userInform',
            component: userInform,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/userCollect',
            name: 'userCollect',
            component: userCollect,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/userAdd',
            name: 'userAdd',
            component: userAdd,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/userError',
            name: 'userError',
            component: userError,
            meta: {
                isLogin: true
            }
        },
        {
            path: '/userQuestion',
            name: 'userQuestion',
            component: userQuestion,
            meta: {
                isLogin: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => { //to 用户想要进入的页面路径。
    let user = $cookies.get("user")
        // let getFlag = localStorage.getItem("Flag")
    if (user === 'null' || user === null) {
        if (to.meta.isLogin) {
            next({ path: '/login?login=请先登录' })
        } else {
            next()
        }
    } else {
        store.state.isLogin = true
        if (to.fullPath == '/login' || to.fullPath == '/register') {
            next({ path: '/home/user?login=请先退出登录' })
        } else {
            next()
        }
    }

})

export default router