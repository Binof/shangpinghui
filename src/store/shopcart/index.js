import { reqCartList, reqDeleteById, reqUpdatecheckedById } from "@/api"
const state = {
  cartList: {},
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.status == 200) {
      commit('GETCARTLIST', result.data.data[0])
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteById(skuId);
    if (result.data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //改变产品状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdatecheckedById(skuId, isChecked)
    if (result.data.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //删除勾选产品
  deleteAllCheckCart({ dispatch, getters }) {
    //获取购物车中的全部产品
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      //遍历之后返回的是promise实例
      let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //将每一次返回的promise添加到数组
      PromiseAll.push(result)
    });
    //只要全部成功，返回结果为成功
    Promise.all(PromiseAll)
  },
  //全选按钮改变商品选框状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {

    let PromiseAll = [];
    state.cartList.cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    //返回结果
    return Promise.all(PromiseAll)
  }

}
const mutations = {
  //将请求回来的数据存入state中
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  //将数据简单的处理后返回，
  cartList(state) {
    return state.cartList.cartInfoList || []
  }

}
export default
  { state, actions, mutations, getters }
