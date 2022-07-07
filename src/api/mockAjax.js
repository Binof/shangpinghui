//二次封装axios
import axios from "axios";
//设置进度条同时引入进度条样式

import nProgress from "nprogress";
import 'nprogress/nprogress.css'
//nProgress需要用到两个属性：star：进度条开始，done：进度条结束

//1.利用axios对象的方法create去创建一个axios实例
//2.request就是一个axios，不过添加了一些配置+
const requests = axios.create({
  //基础路径
  baseURL:'/mock',
  //超时的时间
  timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
  //检测到请求时开始进度条
  nProgress.start()
  //config:配置对象，对象里面有个属性很重要，headers请求头
  
  return config
})
//响应拦截器
requests.interceptors.request.use((res)=>{
  //检测到响应进度条结束
  nProgress.done()

  //响应回来的数据相应拦截器可以检测到，可以做一些事情
  return res
},(error)=>{
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