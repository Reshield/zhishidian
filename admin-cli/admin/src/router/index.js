import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import sharesList from '@/components/sharesList'
import shareInform from '@/components/shareInform'
import shareData from '@/components/shareData'
import shareComment from '@/components/shareComment'
import shareFeedback from '@/components/shareFeedback'
import userList from '@/components/userList'
import userInform from '@/components/userInform'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'HelloWorld',
        //     component: HelloWorld
        // },
        {
            path: '/',
            name: 'home',
            component: home,
            children: [{
                    path: '/sharesList',
                    name: 'sharesList',
                    component: sharesList,
                },
                {
                    path: '/shareInform',
                    name: 'shareInform',
                    component: shareInform,
                },
                {
                    path: '/shareComment',
                    name: 'shareComment',
                    component: shareComment,
                },
                {
                    path: '/shareFeedback',
                    name: 'shareFeedback',
                    component: shareFeedback,
                },
                {
                    path: '/userList',
                    name: 'userList',
                    component: userList,
                },
                {
                    path: '/userInform',
                    name: 'userInform',
                    component: userInform,
                },

            ]
        },
        {
            path: '/sharesList',
            name: 'sharesList',
            component: sharesList
        },
        {
            path: '/shareInform',
            name: 'shareInform',
            component: shareInform,
            children: [{
                    path: '/shareData',
                    name: 'shareData',
                    component: shareData,
                },
                {
                    path: '/shareComment',
                    name: 'shareComment',
                    component: shareComment,
                },
            ]
        },
        {
            path: '/shareData',
            name: 'shareData',
            component: shareData,
        },
        {
            path: '/shareComment',
            name: 'shareComment',
            component: shareComment,
        },
        {
            path: '/shareFeedback',
            name: 'shareFeedback',
            component: shareFeedback,
        },
        {
            path: '/userList',
            name: 'userList',
            component: userList,
        },
        {
            path: '/userInform',
            name: 'userInform',
            component: userInform,
        },
    ]
})