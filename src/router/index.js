import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import Admin from '@/components/Admin'
import About from '@/components/about/About'
import Login from '@/components/Login'
import Register from '@/components/Register'


//二级路由
import Contact from '@/components/about/Contact'
import Delivery from '@/components/about/Delivery'
import History from '@/components/about/History'
import OrderingGuide from '@/components/about/OrderingGuide'

//三级路由
import Phone from '@/components/about/contact/Phone'
import Personname from '@/components/about/contact//PersonName'


Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // return{
    //   x:0,y:100
    // }
    // return{ selector: '.btn'}
    if (savedPosition) {
      return savedPosition
    }else{
      return{
        x:0,y:0
      }
    }
  },
  routes: [{
      path: '/',
      name: 'homeLink',
      components: {
        default: Home,
        "orderingGuide": OrderingGuide,
        'delivery': Delivery,
        'history': History
      }
    },
    {
      path: '/menu',
      name: 'menuLink',
      component: Menu
    },
    {
      path: '/admin',
      name: 'adminLink',
      component: Admin,
      // beforeEnter:(to,form,next)=>{
      //   alert('非登陆状态不能访问此页面！');
      // }
    }, {
      path: '/about',
      name: 'aboutLink',
      redirect: '/about/contact',
      component: About,
      children: [{
          path: '/about/contact',
          name: 'contactLink',
          redirect: '/personname',
          component: Contact,
          children: [{
              path: '/phone',
              name: 'phoneNumber',
              component: Phone
            },
            {
              path: '/personname',
              name: 'personName',
              component: Personname
            },
          ]
        },
        {
          path: '/about/delivery',
          name: 'deliveryLink',
          component: Delivery
        },
        {
          path: '/about/history',
          name: 'historyLink',
          component: History
        },
        {
          path: '/about/orderingGuide',
          name: 'orderingGuideLink',
          component: OrderingGuide
        }
      ]
    }, {
      path: '/login',
      name: 'loginLink',
      component: Login
    }, {
      path: '/register',
      name: 'registerLink',
      component: Register
    }, {
      path: '*',
      redirect: '/'
    },

  ]
})
