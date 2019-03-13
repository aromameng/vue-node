<template>
  <div class="login-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">{{$route.meta.title}}</h4>
      <form class="login-form" v-if="!isLogin">
        <div class="label">
          <span class="l-title">用户名：</span>
          <input type="text" v-model="user">
        </div>
        <div class="label">
          <span class="l-title">密码：</span>
          <input type="password" v-model="password">
        </div>
        <div class="label">
          <button @click="login()">登录</button>
        </div>
        <router-link to="/register">注册</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { user_login } from "api/index";
import sha1 from "sha1";

export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"])
  },
  created() {},
  mounted() {},
  methods: {
    login() {
      var that = this;
      if (!this.user) {
        return this.$toast("用户名不能为空！");
      }
      if (!this.password) {
        return this.$toast("密码不能为空！");
      }
      const user = {
        name: this.user,
        password: sha1(this.password)
      };
      user_login(user).then(
        res => {
          this.$toast("登录成功！");
          var data = {
            status: true,
            userInfo: res.data
          };
          this.$store.commit("SET_LOGIN", data);
          setTimeout(() => {
            that.$router.push({ name: "home" });
          }, 1000);
        },
        msg => {
          this.$toast(msg);
        }
      );
    }
  }
};
</script>

<style lang="scss">
.login-view {
  .login-form {
    .label {
      margin-bottom: 15px;
      input {
        display: inline-block;
        width: 200px;
        line-height: 28px;
      }
      button {
        display: inline-block;
        width: 100px;
        line-height: 30px;
        width: 90px;
        cursor: pointer;
      }
    }
    .l-title {
      display: inline-block;
      width: 80px;
      text-align: right;
    }
  }
}
</style>
