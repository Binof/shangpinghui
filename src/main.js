import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入vuex
import store from '@/store'
//将三级联动注册全局组件\将轮播如注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from "@/components/Carousel"
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'


//引入mock模拟数据的文件执行一次
import "@/mock/mockServe"
//引入轮播图样式
import 'swiper/css/swiper.min.css'
//引入icon图标样式
import './assets/iconfont/iconfont.css'
//测试axios请求
/*import {reqCategoryList} from "@/api"
reqCategoryList(); */
//全局组件的名字，哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
//注册组件的挂在原型上面的写法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入所有请求接口的函数
import * as API from "@/api"
new Vue({
  //注册路由之后所有组件身上将多两个属性：$route/$router
  router,
  //注册vuex仓库之后所有组件实例上面将多一个属性$store
  store,
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    //将api的请求函数添加到Vue实例的原型属性上
    Vue.prototype.$API = API
  },
}).$mount('#app')
