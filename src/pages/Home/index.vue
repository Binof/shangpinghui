<template>
  <div>
    <!-- 使用三级联动组件,已经注册为全局不需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorlist"
      :key="floor.id"
      :list="floor"
    ></Floor>

    <Brand></Brand>
  </div>
</template>

<script>
//引入listcontainer
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
/* import { mapMutations, mapState } from "vuex"; */
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState(
      //对象写法
      {
        floorlist: (state) => state.home.floorlist,
      }
    ),
  },
  mounted() {
    //挂载完毕之后发起请求获取数据
    this.$store.dispatch("getFloorList");
    //获取用户信息设置到路由守卫了
  },
};
</script>

<style></style>
