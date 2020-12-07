<!--
 * @Description: 扣款
 * @Autor: rk
 * @Date: 2020-06-03 14:59:22
--> 
<template>
  <div class="chargeback">
    <a-modal
      title="扣款"
      centered
      width="700px"
      okText="确定"
      cancelText="取消"
      v-model="data.isShow"
      @cancel="handleCancel"
      @ok="recharge"
    >
      <a-form
        @submit.native.prevent
        style="margin-top: 40px"
      >
        <a-form-item
          label="项目类型"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-select v-model="merchant_type" style="width:300px; margin-right: 10px">
            <a-select-option value="1">洗发</a-select-option>
            <a-select-option value="2">剪发</a-select-option>
            <a-select-option value="3">染发</a-select-option>
            <a-select-option value="4">烫发</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="扣款额度"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-input
            placeholder="请输入扣款额度"
            style="width:300px; margin-right: 10px"
            v-model="amount"
          />元
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "chargeback",
  props: ["data"],
  data() {
    return {
      amount: '',
      merchant_type: "1"
    };
  },
  watch: {
    data(val) {
      this.merchant_type = val.type || "1"
    }
  },
  methods: {
    handleCancel() {
      this.amount = "";
      this.data.isShow = false;
    },
    recharge() {
      if (this.amount*1 > this.data.money*1) {
        this.$message.error("扣款金额不能小于商户余额");
        return false;
      } else if (this.amount*1 <= 0) {
        this.$message.error("扣款金额不能小于等于0");
        return false;
      }
      let self = this;
      let obj = {
        type: this.merchant_type,
        deductibles: this.amount,
        member_id: this.data.member_id,
        date: new Date().getTime()
      }
      self.$axios.post("http://localhost:3000/api/Stu/deductibles", obj).then(res => {
        if (res.status == 200) {
          self.$message.success('扣款成功');
          self.$parent.getTableData(true);
          self.data.isShow = false;
          self.amount = "";   
          self.merchant_type = "1";
        } else {
          self.$message.error('系统出错了');
        }
      })
    }
  },
};
</script>