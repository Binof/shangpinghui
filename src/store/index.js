import Vue from "vue";
//引入插件：
import Vuex from 'vuex'
//vue引用属性use
Vue.use(Vuex);
//#region 
/* //state:数据仓库
const state = {
  count:1
};
//mutations:可以配置方法来改变数据
const mutations = {

};
//actions:可以书写业务逻辑，可以处理异步
const actions = {};
//getters:理解为计算属性，可以方便的获取数据经行操作
const getters = {};*/
//#endregion
//模块化vuex引入模块
import home from './home'
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from './trade'
//创建并暴露vuex.store实例 

export default new Vuex.Store({
  modules: {
    home, search, detail, shopcart, user, trade
  }
})