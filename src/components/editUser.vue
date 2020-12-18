<!--
 * @Description: 编辑用户
 * @Autor: rk
 * @Date: 2020-06-03 14:59:22
--> 
<template>
  <div class="editUser">
    <a-modal
      title="修改商户"
      centered
      :visible="data.isShow"
      okText="确定"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item
          label="名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input v-model="modifyObj.member_name" disabled/>
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-model="modifyObj.telephone"
          />
        </a-form-item>
        <a-form-item
          label="商户余额"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-model="modifyObj.balance"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "editUser",
  props: ["data","modifyObj"],
  data() {
    return {};
  },
  methods: {
    handleOk() {
      let self = this,params = {};
      params = {
        member_id: this.modifyObj.member_id,
        telephone: this.modifyObj.telephone,
        balance: this.modifyObj.balance
      }
      if(self.data.list.indexOf(self.modifyObj.telephone*1) > -1){//则包含该元素
        self.$message.error('该手机号已经登记过了');
        return ;
      }
      self.$axios.post("http://localhost:3000/api/Stu/updateStu", params).then(res => {
        if (res.status == 200) {
          self.$message.success('修改成功');
          self.$parent.getTableData(true);
        } else {
          self.$message.error('系统出错了');
        }
        self.data.isShow = false;
      })
    },
    handleCancel() {
      this.data.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>

</style>