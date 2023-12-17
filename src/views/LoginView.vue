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

import axios from "axios"

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
      axios.post("http://localhost:8080/user/login", this.loginUser)
        .then(res => {
          console.log(res.data)
          /**
           * 根据返回的type来判断用户是什么类型的,该跳转到什么页面
           */
          // 学校疫情管理员
          if (res.data.data.type == 3) {
            this.$router.push('/se')
          }

          //学校二级单位管理员
          if (res.data.data.type == 2) {
            localStorage.setItem("userInfo",JSON.stringify(res.data.data))
            this.$router.push('/slt')
          }

          // 教职员工
          if (res.data.data.type == 1) {
            this.$router.push('/te')
          }

          // 学生
          if (res.data.data.type == 0) {
            this.$router.push('/stu')
          }

          this.$message.success("登录成功")

        })
        .catch(err => {
          this.$message.error(("账号或密码错误"))
        })
    }
  }
}
</script>

<style scoped>
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