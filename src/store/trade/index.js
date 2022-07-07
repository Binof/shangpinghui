import { reqAddressInfo, reqOrderInfo } from "@/api"
//trade模块小仓库

const state = {
  userAddress: [],
  orderInfo: {}
}
const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.status == 200) {
      commit('GETUSERADDRESS', result.data.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();

    if (result.status == 200) {
      commit('GETORDERINFO', result.data.data)
    }
  }
}
const getters = {}

export default {
  state, mutations, actions, getters
}