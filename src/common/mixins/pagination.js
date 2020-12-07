/*
 * @Description: 分页
 * @Autor: WangDebiao
 * @Date: 2020-08-15 14:39:00
 */

export default {
  data() {
      return {
          pagination: {
              current_page: 1, //当前页
              page_size: 50, //每页数据条数
              totals: 0, //数据总数
              changePaginationName: "changePagination", //分页改变调用的方法
              showTotalsDesc: true, //是否显示分页总数描述
              totalsDesc: { leftWord: "共", rightWord: "条数据" }, //分页总数描述
          },
      }
  },
  methods: {
      // 分页组件更新数据方法
      changePagination(pagination, flag) {
          this.pagination = pagination;
          this.getTableData(flag);
      },
  }
}