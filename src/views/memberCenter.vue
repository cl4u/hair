<!--
 * @Description: 
 * @Author: rk
 * @Date: 2020-11-09 14:55:41
-->
<template>
  <div class="memberCenter">
    <a-form layout="inline">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-form-item>
            <a-input
              style="width: 200px"
              placeholder="可通过手机号进行搜索"
              v-model.trim="telephone"
              allowClear
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="getTableData(false)"
              >搜索</a-button
            >
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item>
            <a-button type="primary" @click="add">添加用户</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      bordered
      :dataSource="tableData"
      :columns="tableColumns"
      :loading="pageTableLoading"
      :pagination="false"
      style="margin: 15px 0"
      :scroll="{ x: tableScrollWidth, y: tableScrollHeight }"
      size="small"
    >
      <template slot-scope="text, record" slot="operation">
        <a-button
          type="primary"
          size="small"
          @click="recharge(record.member_id)"
          >充值</a-button
        >
        <a-button
          type="primary"
          size="small"
          style="margin: 0 15px"
          @click="chargeback(record)"
          >扣款</a-button
        >
        <a-button type="success" size="small" @click="edit(record)" style="margin-right: 15px"
          >编辑</a-button
        >
        <a-button type="danger" size="small" @click="del(record.member_id)"
          >删除</a-button
        >
      </template>
    </a-table>
    <pagination
      :totalCount="totalCount"
      :pageSize="pageSize"
      :tableView="tableView"
      :defaultData="defaultData"
      @tables="tables"
    ></pagination>
    <addUser :data="addDialog"></addUser>
    <editUser :data="editDialog" :modifyObj="modifyObj"></editUser>
    <recharge :data="rechargeDialog"></recharge>
    <chargeback :data="chargebackDialog"></chargeback>
  </div>
</template>
<script>
// 常量
import constant from "@/constant/memberCenter.js";
// 组件
import addUser from "@/components/addUser.vue";
import editUser from "@/components/editUser.vue";
import recharge from "@/components/recharge.vue";
import chargeback from "@/components/chargeback.vue";
import pagination from '../components/pagination.vue';
export default {
  name: "memberCenter",
  components: { addUser, editUser, recharge, chargeback,pagination },
  data() {
    return {
      totalCount: 0, // totalCount 这是传递给 分页组件的 total 从而显示多少页数
      pageSize: 15, // 这是每页表格最多显示多少条
      tableView: [], //这个是给表格显示的数据
      defaultData: false, //例如用户在第5页，增加后请求数据肯定子啊第1页面那么需要重置组件
      telephone: "",
      tableData: [], //表格数据
      tableColumns: constant.pageTableColumns, //表格表头
      pageTableLoading: false, //表格loading
      addDialog: {
        isShow: false,
      },
      editDialog: {
        isShow: false,
      },
      rechargeDialog: {
        isShow: false,
      },
      chargebackDialog: {
        isShow: false,
      },
      modifyObj: {},
      merchant_text: ["洗发", "剪发", "染发", "烫发"],
      memberList: [],
      teleList: []
    };
  },
  mounted() {
    this.getTableData(false);
  },
  computed: {
    //表格宽度
    tableScrollWidth() {
      let length = 0;
      for (let j = 0; j < this.tableColumns.length; j++) {
        length += this.tableColumns[j].width;
      }
      return length;
    },
    // 表格高度
    tableScrollHeight() {
      let clientHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      return clientHeight - 280;
    },
  },
  methods: {
    tables(table) {
      this.tableData = table;
    },
    // 获取表格数据
    getTableData(paginationFlag) {
      let self = this,
        params = { telephone: this.telephone };
      this.pageTableLoading = true;
      this.tableData = [];
      this.teleList = [];
      this.$axios
        .post("http://localhost:3000/api/Stu/search", params)
        .then((res) => {
          self.pageTableLoading = false;
          if (res.status == 200) {
            if (res.data && res.data.length > 0) {
              self.defaultData = true
              for (let i = 0; i < res.data.length; i++) {
                self.tableView = res.data;
                const element = res.data[i];
                self.teleList.push(element.telephone);
                element.key = (i + 1).toString();
                element.merchant_type = self.merchant_text[element.type - 1];
                element.date = element.date
                  ? self.formatDateTime(element.date)
                  : "";
                self.memberList.push(element.telephone);
              }
              self.totalCount = res.data.length;
              if (res.data.length >= self.pageSize) {
                for (let i = 0; i < self.pageSize; i++) {
                  self.tableData.push(res.data[i]);
                }
              } else {
                self.tableData = res.data;
              }
            }
          }
        });
    },
    formatDateTime(date) {
      date = new Date(date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    recharge(id) {
      this.rechargeDialog = {
        isShow: true,
        member_id: id,
      };
    },
    chargeback(data) {
      this.chargebackDialog = {
        isShow: true,
        member_id: data.member_id,
        type: data.type,
        money: data.balance,
      };
    },
    add() {
      this.addDialog = {
        isShow: true,
        list: this.memberList,
      };
    },
    edit(data) {
      this.editDialog = {
        isShow: true,
        list: this.teleList
      };
      this.modifyObj = JSON.parse(JSON.stringify(data));
    },
    del(id) {
      let self = this,params = {};
      params = {
        member_id: id
      }
      self.$confirm({
        title: "确定要删除此条信息？",
        onOk() {
          self.$axios
          .post("http://localhost:3000/api/Stu/delStu", params)
          .then((res) => {
              if (res.status == 200) {
                self.$message.success('删除成功');
                self.getTableData(true);
              } else {
                self.$message.error('系统出错了');
              }
            });
        },
        okText: "确定",
        cancelText: "取消",
        centered: true,
      });
    }
  },
};
</script>
<style lang="scss" scoped='scoped'>
.memberCenter {
  background-color: #ffffff;
  padding: 20px;
}
</style>