<template>
  <div class="app">
    <h1><span class="title">{{ userInfo.name }}</span> 你好</h1>
    <div class="btnBox">
      <!-- 插入学生数据 -->
      <v-button @click="bpprt" size="large">体温打卡</v-button>
      <v-button @click="vacc" size="large">疫苗登记</v-button>
      <v-button @click="changeFirst" size="large">修改个人信息</v-button>
      <v-button @click="exit">退出</v-button>
    </div>

    <el-dialog title="修改个人信息" :visible.sync="dialogVisibleChange" width="50%">
      <el-form :model="changeInfo">
        <el-form-item label="姓名">
          <el-input v-model="changeInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="changeInfo.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="学生生日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="changeInfo.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生身份证号">
          <el-input v-model="changeInfo.ic" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'StudentView',
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      changeInfo: {
        name: '',
        password: '',
      },
      dialogVisibleChange: false
    }
  },
  methods: {
    exit() {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem("userInfo")
        this.$router.push("/")
      }).catch(() => {
        console.log("已取消")
      });
    },
    // 体温打卡
    bpprt() {
      this.$router.push('/bpprt')
    },
    vacc() {
      this.$router.push('/vacc')
    },
    changeFirst() {
      axios.get(`http://localhost:8080/user/get/${this.userInfo.id}`).then(res => {
        this.changeInfo = res.data.data
      })
      this.dialogVisibleChange = true
    },
    change() {
      // 在前端将日期转换为字符串
      axios.put("http://localhost:8080/user/change", this.changeInfo)
        .then(res => {
          this.$message.success("修改成功")
          this.userInfo = this.changeInfo
          this.dialogVisibleChange = false
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
  }
}
</script>

<style>
.app {
  width: 1240px;
  margin: 0 auto;
  height: auto;
  padding-top: 100px;
  text-align: center;
}

.title {
  color: blue;
}

.btnBox {
  padding-top: 40px;
  margin: 0 auto;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>