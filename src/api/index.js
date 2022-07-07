//当前这个模块：API经行统一管理
import requests from "./request";
import mockRequests from './mockAjax'
import { get, method } from "lodash";


//三级联动的接口
//http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList get 无参数
//暴露请求的函数
export const reqCategoryList = () => {
  //发送请求：axios发请求返回的时Promise对象
  return requests({ url: '/product/getBaseCategoryList', method: "GET" })
}

//通过mock 获取banner数据
export const reqGetBannerList = () => {
  return mockRequests.get('/banner')
}
//获取floor
export const reqFloorList = () => {
  return mockRequests.get('/floor')
}
//获取搜索模块数据：请求接口：http://gmall-h5-api.atguigu.cn/api/list 请求方式：post
/* 
参数：
{"category3Id": "61","categoryName": "手机","keyword": "小米","order": "1:desc","pageNo": 1,"pageSize": 10,"props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],"trademark": "4:小米}
*/
//当前这个接口，给服务器传递的参数params,至少是个空对象
export const reqGetSearchInfo = (params) => {
  return requests({ url: '/list', method: "POST", data: params },
  )
}
//详情页请求
export const reqDetailInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: "GET" })
}
//加入购物车请求
export const reqAddOrdateShopCart = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
}
//获取购物车数据接口
export const reqCartList = () => {
  return requests({ url: '/cart/cartList', method: "get" })
}
//删除购物产品
export const reqDeleteById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
//修改商品选中状态
export const reqUpdatecheckedById = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "GET" })
}
//用户注册获取验证码接口
export const reqGetCode = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
//注册按钮接口:/api/user/passport/register method:POST phone code ,password
//注册按钮接口:/api/user/passport/register method:POST
export const reqUserRegister = (data) => {
  return requests({ url: '/user/passport/register', data, method: 'post' })
}
//用户登录/api/user/passport/login method:post userName password
export const reqUserLogin = (data) => {
  return requests({ url: 'user/passport/login', data, method: 'post' })
}
//获取用户信息（带着用户的token向服务器要用户信息）
//接口：/user/passport/auth/getUserInfo method：get
export const reqUserInfo = () => {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}
//退出登录
//接口
export const reqlogOut = () => requests({ url: '/user/passport/logout', method: 'get' })
//获取用户地址信息接口
export const reqAddressInfo = () => {
  return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
}
//获取对应用户的商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
//提交订单请求
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
//获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
//获取支付订单状态
export const reqPayStatus = (orderId) => {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}