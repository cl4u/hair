<!--
 * @Description: 分页组件
 * @Autor: WangDebiao
 * @Date: 2020-06-03 14:59:22
--> 
<template>
  <div class="paginationPage">
    <a-row type="flex" justify="end" align="middle">
      <a-pagination
        v-model="currentPage"
        :total="totalCount"
        style="display: inline-flex"
        :current="currentPage"
        :page-size="pageSize"
        @change="currentChange"
      ></a-pagination>
    </a-row>
  </div>
</template>
<script>
export default {
  name: "paginationPage",
  props: ["totalCount", "pageSize", "tableView", "defaultData"],
  data() {
    return {
      tableData: [],
      currentPage: 1,
    };
  },
  watch: {
    defaultData(newValue) {
      //数据已经被更新
      this.currentChange(1);
    },
  },
  methods: {
    currentChange(val) {
      console.log(val);
      //为什么必须不是1 呢 因为点击1是返回初始数据
      if (val != 1) {
        val = (val - 1) * this.pageSize; //比如点击是2，并且pageSize是10的时候 那么数据下标是 10开始就是10
      } else {
        val = 0;
      }
      let number = this.tableView.length;
      // 当点击2的时候如果第二页是最后一页进入else全部展示
      if (number > val + this.pageSize) {
        this.tableData = this.tableView.slice(val, val + this.pageSize);
      } else {
        this.tableData = this.tableView.slice(val, this.tableView.length);
      }
      this.$emit("tables", this.tableData);
    },
  },
};
</script>
<style lang="scss" scoped>
.paginationPage {
  .totalsBox {
    margin-right: 15px;
    line-height: 32px;
    .totalsNum {
      color: #1890ff;
    }
  }
}
</style>