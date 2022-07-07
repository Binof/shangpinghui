
//组件路由配置在这，让主文件看起来更简洁
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
//配置路由
export default [
  //支付成功
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  },
  //交易支付界面
  {
    path: '/pay',
    component: Pay,
    meta: { show: true }
  },
  //交易订单界面
  {
    path: '/trade',
    component: Trade,
    meta: { show: true }
  },
  //购物车路由配置
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  //购物车加入成功页
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true }
  },
  //详情页路由配置
  {
    path: '/detail/:skuid'
    , component: Detail,
    meta: { show: true },
  },
  //主页路由配置
  {
    path: '/home'
    , component: Home,
    meta: { show: true },

  },
  //登录页路由配置
  {
    path: '/login'
    , component: Login,
    meta: { show: false }
  },
  //搜索页路由配置
  {
    /* params传参需要占位/:keyword */
    name: 'search',
    path: '/search/:keyword?'
    , component: Search,
    meta: { show: true },
    //路由组件可以传递props参数：
    //方法1：props属性配置为true（这个只能传递params参数）
    // props:true
    //对象形式
    /* props:{a:'123',b:'b'} */
    //函数形式
    props: ($route) => ({
      keyword: $route.params.keyword, k: $route.query.k
    })
  },
  //注册页路由配置
  {
    path: '/register'
    , component: Register,
    meta: { show: false }
  },
  {
    //重定向  当用户访问 / 时回到home主页
    path: '/',
    redirect: '/home'
  }
]
