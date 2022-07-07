import { reqCategoryList, reqGetBannerList,reqFloorList} from "@/api"
//home模块小仓库

  const state = {
    //请求的数据类型根据请求回的数据决定不要乱写
    categoryList:[],
    bannerlist:[],
    floorlist:[]
  }
  const mutations = {
    CATEGORYLIST(state,categoryList){
      state.categoryList = categoryList.data
    },
    GETBANNERLIST(state,bannerlist){
      state.bannerlist = bannerlist.data
    },
    GETFLOORLIST(state,floorlist){
      state.floorlist = floorlist.data
    }
  }
  const actions = {
    //调用时向服务器发送请求获取数据
    //{commit}解构赋值对应context.commit
   async categoryList({commit}){
      //返回的是一个promise实列//通过语法糖async...await,获取数据
    let result =  await reqCategoryList();
      // console.log(result);
      if (result.status === 200){
        commit('CATEGORYLIST',result.data)
      }
    },
    //向mock发送请求获取banner数据
      async getBannerList(context){
      let result = await reqGetBannerList()
      // console.log(result);
      if(result.status == 200){
        context.commit("GETBANNERLIST",result.data)
      }
    },
    //向mock发送请求获取floor数据
    async getFloorList(context){
      let result = await reqFloorList()
      // console.log(result);
      if(result.status == 200){
        context.commit("GETFLOORLIST",result.data)
      }
    }
  }
  const getters = {}

export default {
  state,mutations,actions,getters
}