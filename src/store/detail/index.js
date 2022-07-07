import { reqDetailInfo } from "@/api"
import { reqAddOrdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
//search模块小仓库
const state = {
  goodInfo: {},
  //用户游客身份的token值
  uuid_token: getUUID()

}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo.data
  }
}
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqDetailInfo(skuId)
    // console.log(result);
    if (result.status == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  //将产品添加到购物车中时发送的请求
  async addOrdateShopCart({ commit }, { skuId, skuNum }) {

    //加入购物车返回的解构
    //加入购物车以后（发请求），前台将数据带给服务器
    //服务器写入成功，并没有返回数据，只是返回了状态码
    //所以我们不需要存仓  
    let result = await reqAddOrdateShopCart(skuId, skuNum)
    // console.log(result);
    //这里我们判断请求成功返回promise.resolve,失败之后promise.reject
    //我们组件需要通过返回的值来确定是否进行路由跳转
    if (result.data.code == 200) {
      //成功之后返回一个不是promise失败方法或者手写的失败回调即可
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }

  }
}
//计算属性，在项目中，为了简化数据而生
const getters = {
  //
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {}
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}