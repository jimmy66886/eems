<template>
  <div class="app">
    <h1>高校传染病疫情管控系统</h1>
    <div class="inputBox">
      <v-input placeholder="学号/工号" size="large" v-model="loginUser.account"></v-input>
      <v-input placeholder="密码" type="password" v-model="loginUser.password" size="large"></v-input>
      <v-button type="primary" size="large" @click="login">登录</v-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginUser: {
        account: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      console.log(this.loginUser)
    }
  }
}
</script>

<style>
.app {
  width: 1240px;
  margin: 0 auto;
  height: auto;
  padding-top: 100px;
}

h1 {
  text-align: center;
}

.inputBox {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 150px;
}
</style>