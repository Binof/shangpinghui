<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumEndNum.start > 1"
      @click="$emit('getpageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumEndNum.start > 2">···</button>
    <!--  中间部分 -->
    <button
      v-for="(page, index) in startNumEndNum.end"
      :key="index"
      v-show="page >= startNumEndNum.start"
      @click="$emit('getpageNo', page)"
      :class="{ active: page == pageNo }"
    >
      {{ page }}
    </button>

    <button v-if="startNumEndNum.end < endPage - 1">···</button>
    <button
      v-if="startNumEndNum.end < endPage"
      @click="$emit('getpageNo', endPage)"
      :class="{ active: endPage == pageNo }"
    >
      {{ endPage }}
    </button>
    <button
      @click="$emit('getpageNo', pageNo + 1)"
      :disabled="pageNo == endPage"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //页码总数
    endPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    //页面连续部分的起始和结束的数字
    startNumEndNum() {
      let start = 0,
        end = 0;
      //页码不足五页
      if (this.continues > this.endPage) {
        start = 1;
        end = this.endPage;
      } else {
        //设置连续页码的起始和末尾
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        //排除不正常现象之页面出现小于零的情况
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //排除不正常现象之结束页码大于总页码数
        if (end > this.endPage) {
          end = this.endPage;
          start = this.endPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
