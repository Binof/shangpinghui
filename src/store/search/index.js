import { reqGetSearchInfo } from "@/api"
//search模块小仓库
const state = {
  searchList:{}
}
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList.data
  }
}
const actions = {
  //
 async getSearchList ({commit},params = {}){
  //调用发起请求的函数必须传参
   let result =  await reqGetSearchInfo(params)
  //  console.log(result);
    if(result.data.code == 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
//计算属性，在项目中，为了简化数据而生
const getters = {
  attrsList(state){
    return state.searchList.attrsList||[]
  },
  goodsList(state){
    return state.searchList.goodsList||[]
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  },
}
export default {
  state,
  mutations,
  actions,
  getters
}