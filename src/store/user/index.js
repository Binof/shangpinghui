import { reqGetCode, reqlogOut, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: ''
}
const mutations = {
  GETCODE(state, code) {
    state.code = code.data
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo || {}
  },
  CLEARINFO(state) {
    //把用户信息清空,本地存储清空
    state.token = '';
    state.userInfo = {},
      removeToken()
  }
}
const actions = {
  async getCode({ commit }, phone) {
    //获取验证码的这个接口，把验证信息返回，后台把验证码发送到用户手机（省钱）
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.status == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册接口调用
  async userReginster({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result);
  },
  //登录业务
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    // console.log(result);
    if (result.status == 200) {

      commit('USERLOGIN', result.data.data.token)
      //持久化存储token
      setToken(result.data.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.status == 200) {
      commit('GETUSERINFO', result.data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //退出登录
  async userLogOut({ commit }) {
    let result = await reqlogOut();
    if (result.status == 200) {
      commit('CLEARINFO')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}

export default {
  state, mutations, actions, getters
}