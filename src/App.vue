<template>
  <div id="app">
    <Header></Header>

    <router-view></router-view>
    <!-- 在home、search页面时显示，在登录、注册页面时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //性能优化：让数据请求只发送一次
    //通过vuex发送请求，获取三级联动模块的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
