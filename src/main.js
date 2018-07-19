// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = 'https://wd1053239395jirkbf.wilddogio.com/'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//全局守卫
// router.beforeEach((to, from, next) => {

//   //console.log(to)
//   // alert('还没有登录，请先登录');
//   // next();

//   //判断store.gettes.isLogin ===false
//   //if(to.path)
  
//   if(to.path == '/login'||to.path == '/register'){
//     next();
//   }else{
//     alert('你还没有登录，请先登录！！');
//     next('/login');
//   }

// })

//后置钩子
// router.afterEach((to,from) => {
//   alert('after Each')
// })










































