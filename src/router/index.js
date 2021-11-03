import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api'
import Store from '@/store'


import Home from '@/views/home/Home.vue'
import Detail from '@/views/detail/detail.vue'
import Space from '@/views/user-space/space.vue'
import Login from '@/views/user-login/index.vue'
import Create from '@/views/create/create.vue'
import Recipe from '@/views/recipe/recipe.vue'


import MenuList from '@/views/user-space/menu-list.vue'
import Fans from '@/views/user-space/fans'
import Edit from '@/views/user-space/edit'


import Car from '@/views/car/car.vue'


const router = new Router({
    mode:"history",
    routes:[{
        path:'/',
        name:"Home",
        component:Home
    },
    {
        path:'/detail',
        name:"detail",//菜品详情
        component:Detail
    },{
        path:'/space',
        name:"space",//个人空间
        component:Space,
        redirect:{
            name:'works'
        },
        meta:{
            login:true
        },
        children:[
            {
                path:'works',
                name:'works',
                title:'作品',
                component:MenuList,
                meta:{
                    login:true
                },
            },{
                path:'fans',
                name:'fans',
                title:'我的粉丝',
                component:Fans,
                meta:{
                    login:true
                },
            },{
                path:'following',
                name:'following',
                title:'我的关注',
                component:Fans,
                meta:{
                    login:true
                },
            },{
                path:'collection',
                name:'collection',
                title:'我的收藏',
                component:MenuList,
                meta:{
                    login:true
                },
            }
        ]
    },{
        path:'/login',
        name:"login",//登录注册
        component:Login,
        meda:{
            login:true
        }
    },{
        path:'/create',
        name:"create",//发布菜谱
        component:Create,
        meta:{
            login:true
        }
    },{
        path:'/recipe',
        name:"recipe",//菜谱大全
        component:Recipe
    },{
        path:'/edit',
        name:"edit",//编辑个人资料
        component:Edit,
        meta:{
            login:true
        }
    },{
        path:'/car',
        name:"car",//购物车
        component:Car,
        meta:{
            login:true
        }
    }]
});


const isLogin=true;
router.beforeEach(async (to,from,next)=>{


    const token = localStorage.getItem('token');
   const isLogin = !!token;
   //进入路由的时候，需要向后端发送token，验证是否合法
   const data = await userInfo();
   Store.commit('chageUserInfo',data.data);
   if(to.matched.some(itme => itme.meta.login)){   //需要登录
    // console.log('需要登录')
    
    if(isLogin){ //已经登录的 直接通过
        if(data.error===400){
            next({name:'home'});
            localStorage.removeItem('token');
            return;
         }
        if(to.name === 'login'){
            next({name:'home'});
        }else{
            next();
        }
        return
    }
    if(!isLogin && to.name ==='login'){  //未登录，但是要去登录页
        next()
    }
    console.log(to.name);
    if(!isLogin && to.name !== 'login'){ //未登录，去的也不是登录页
        next({name:'login'});
    }
   }else{
       next()
   }
})


export default router;
