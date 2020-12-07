<!--
 * @Description: 充值
 * @Autor: rk
 * @Date: 2020-06-03 14:59:22
--> 
<template>
  <div class="recharge">
    <a-modal
      title="充值"
      centered
      width="700px"
      okText="确定"
      cancelText="取消"
      v-model="data.isShow"
      @cancel="handleCancel"
      @ok="recharge"
    >
      <a-form
        :form="rechargeDialog"
        @submit.native.prevent
        style="margin-top: 40px"
      >
        <a-form-item
          label="充值额度"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入充值额度"
            style="width:300px; margin-right: 10px"
            v-decorator="[
              'recharge_amount',
              {
                rules: [
                  { required: true, message: '请输入充值额度' },
                  {
                    pattern: /^([0-9]{1,8}(\.\d{2})?|100000000(\.[0]{2})?)$/,
                    message: '充值额度必须大于0且小于100000000',
                  },
                ],
              },
            ]"
          />元
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "recharge",
  props: ["data"],
  data() {
    return {
      rechargeDialog: this.$form.createForm(this, {
        name: "rechargeDialog",
      }),
      recharge_amount: ''
    };
  },
  methods: {
    handleCancel() {
      this.data.isShow=false;
      this.rechargeDialog.resetFields();
    },
    recharge() {
      let self=this,params={};
      this.rechargeDialog.validateFields((err,values) => {
        if(!err) {
          self.rechargeDialog.resetFields();
          self.data.isShow=false;
          params = {
            member_id: self.data.member_id,
            recharge_amount: values.recharge_amount
          };
          self.$axios.post("http://localhost:3000/api/Stu/charge", params).then(res => {
            if (res.status == 200) {
              self.$message.success('充值成功');
              self.$parent.getTableData(true);
            } else {
              self.$message.error('系统出错了');
            }
          })
        }
      });

    }
  },
};
</script>