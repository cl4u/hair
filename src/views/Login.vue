<template>
  <div class="loginPage">
    <div class="loginBox">
      <a-form :form="form" class="loginForm">
        <a-form-item>
          <a-input
            style="width: 280px"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入用户名!' }] },
            ]"
            size="large"
            autocomplete="off"
            placeholder="请输入用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            style="width: 280px"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] },
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
      </a-form>
      <div style="width: 100%; margin-bottom: 45px">
        <a-checkbox :defaultChecked="true">记住密码</a-checkbox>
      </div>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        block
        @click="handleSubmit"
        >登录</a-button
      >
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      form: this.$form.createForm(this, { name: "normal_login" }),
    };
  },
  created() {
    let vm = this;
    document.onkeydown = function (e) {
      let key;
      if (window.event == undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key == 13 && vm.$route.name == "Login") {
        vm.handleSubmit();
      }
    };
  },
  methods: {
    handleSubmit() {
      let vm = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.username == 'admin' && values.password == '123456') {
            vm.$router.push({ name: "Home" });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.loginPage {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #1890ff;
  background-image: url("../assets/img/Login/p1@2x.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  align-items: center;
  justify-content: flex-end;
  .loginBox {
    width: 402px;
    height: 432px;
    background: #ffffff;
    border-radius: 12px;
    padding: 40px 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 8%;
    .loginForm {
      margin-top: 50px;
    }
    .logoImg {
      width: 180px;
      height: 53px;
      margin-bottom: 42px;
    }
  }
}
</style>

