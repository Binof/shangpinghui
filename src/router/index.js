//路由配置
import Vue from "vue";
import VueRouter from "vue-router";
//路由组件配置
import routes from './routes'
//引入store
import store from '@/store'
//使用路由插件
Vue.use(VueRouter)

//解决多次点击同一个路由时报错问题
//先把原版保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写一个push|replace
//第一个参数：告诉原来的跳转（传递那些参数？）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {

    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
//replace重写
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {

    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

let router = new VueRouter({
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
//全局路由前置守卫(路由跳转之前判断是否进行路由)
router.beforeEach(async (to, from, next) => {
  //to:目标组件
  //from:出发组件的信息
  //next:放行函数 next('path')放行到指定组件

  // next();
  //从store中获取token信息
  let token = store.state.user.token
  //从store中获取用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    //如果存在token说明已经登录,判断是不是去登录页
    if (to.path == '/login' || to.path == '/reginter') {
      //重定向到首页
      next('/home')

    } else {
      //登录了不是去登录页
      //跳转其他页的时候判断有没有用户信息
      if (name) {
        next()

      } else {
        //没有用户信息,派发action获取用户信息
        try {
          await store.dispatch('getUserInfo');
          next()
        } catch (error) {
          //执行这里说明很多问题导致用户信息失效了
          //派发action使用户退出登录,需要重新登录
          await store.dispatch('userLogOut')
          next('/login')

        }
      }

    }
  } else {
    //执行这说明未登录,后期还有逻辑需要处理
    next()
  }

})
//暴露路由
export default router