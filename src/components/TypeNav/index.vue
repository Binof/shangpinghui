<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派结合编程式导航路由 -->
      <div @mouseleave="enterShow" @mouseenter="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画：标签外层包transition 标签 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: index == currentIndex ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash插件
// import _ from 'lodash'
//按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //用来存储用户鼠标经过的当前列表的索引值
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完成后就请求数据
  mounted() {
    //让三级联动的列表在home时显示在search时隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    //通过...mapState使组件能够拿到请求回来的数据（对象写法）
    //拿到的数据是三维数组嵌套
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    leaveShow() {
      this.show = true;
    },
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
      this.currentIndex = -1;
    },

    //鼠标移动到哪里将对应的索引值赋给数据库里面的属性
    /*     changeIndex(index) {
      //index,鼠标当前所在元素的索引值
      this.currentIndex = index;
    }, */
    //节流写法
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 1000),
    //三级联动的每一项a标签路由
    //事件委派：
    goSearch(event) {
      //编程式导航路由结合事件委派我们会有如下问题需要解决：
      //1.事件委派：不知道点击的是不是a标签，他会委派给所有的子节点标签
      //2.点击a标签的时候，才会进行路由跳转
      //3.点击的是几级标签也需要确定

      //1.把a标签加上自定义标签
      let node = event.target;
      //获取到当前触发这个事件的节点
      //通过dataset属性，可以获取节点的自定义属性与属性值
      //解构赋值获取对应的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      if (categoryname) {
        //判断出该属性后再判断属于几级标签
        //整理路由传参
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          //一级传参
          query.category1Id = category1id;
        } else if (category2id) {
          //二级传参
          query.category2Id = category2id;
        } else if (category3id) {
          //三级传参
          query.category3Id = category3id;
        }

        // console.log(location);
        //路由跳转配置：判断是否存在param参数，有的话一起带着
        if (this.$route.params) {
          //将params一起带着发过去
          location.params = this.$route.params;
          //整理完成后是两对象需要整合
          //对象添加属性
          location.query = query;
          this.$router.push(location);
        } else {
          location.query = query;
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  margin-bottom: 40px;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 500px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>
