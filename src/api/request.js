//二次封装axios
import axios from "axios";
//设置进度条同时引入进度条样式

import nprogress from "nprogress";

//引入store仓库需要获取其中存储的token
import store from "@/store"
//
import 'nprogress/nprogress.css'

//nProgress需要用到两个属性：star：进度条开始，done：进度条结束

//1.利用axios对象的方法create去创建一个axios实例
//2.request就是一个axios，不过添加了一些配置+
const requests = axios.create({
  //基础路径
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  //超时的时间
  timeout: 500,
})
//请求拦截器
requests.interceptors.request.use((config) => {
  //引入的store中是否有token
  // console.log(store);
  if (store.state.detail.uuid_token) {
    //给请求头添加一个字段(TempId):后端人员配置
    config.headers.userTempId = store.state.detail.uuid_token
  }

  //检测当前用户是否携带token向服务器发送请求
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  //检测到请求时开始进度条
  nprogress.start()
  //config:配置对象，对象里面有个属性很重要，headers请求头

  return config
})
//响应拦截器
requests.interceptors.request.use((res) => {
  //检测到响应进度条结束
  nprogress.done()

  //响应回来的数据相应拦截器可以检测到，可以做一些事情
  return res
}, (error) => {
  return Promise.reject(error)
})
/* requests.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
},  (error) =>{
  // 对响应错误做点什么
  return Promise.reject(error);
}); */
export default requests