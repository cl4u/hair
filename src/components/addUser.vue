<!--
 * @Description: 添加用户
 * @Autor: rk
 * @Date: 2020-06-03 14:59:22
--> 
<template>
  <div class="addUser">
    <a-modal
      title="添加商户"
      centered
      :visible="data.isShow"
      okText="确定"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="addProxyForm">
        <a-form-item
          label="名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="请输入名称"
            v-decorator="[
              'member_name',
              { rules: [{ required: true, message: '请输入名称' }] },
            ]"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="请输入联系电话"
            :maxLength="11"
            v-decorator="[
              'telephone',
              {
                rules: [
                  { required: true, message: '请输入联系电话' },
                  {
                    pattern: '^\\d[-\\d]{10}',
                    message: '请输入正确的联系方式',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          label="商户余额"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            placeholder="请输入商户余额"
            v-decorator="[
              'balance',
              { rules: [{ required: true, message: '请输入商户余额' }] },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "addUser",
  props: ["data"],
  data() {
    return {
      addProxyForm: this.$form.createForm(this, { name: "addProxyForm" }),
    };
  },
  methods: {
    handleOk() {
      let self = this,params = {},list = this.data.list;
      this.addProxyForm.validateFields((err, values) => {
        if (!err) {
          params = values;
          for (let i = 0;i<list.length;i++) {
            if (list[i] == values.telephone) {
              self.$message.error('该手机号已经添加');
              return false;
            }
          }
          self.$axios.post("http://localhost:3000/api/Stu/addMember", params).then(res => {
            console.log(res);
            if (res.status == 200) {
              self.$message.success('添加成功');
              self.$parent.getTableData(true);
            } else {
              self.$message.error('系统出错了');
            }
            self.data.isShow = false;
            self.addProxyForm.resetFields();
          })
        }
      });
    },
    handleCancel() {
      this.addProxyForm.resetFields();
      this.data.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>