<template>
  <div>
    <div class="app">
      <h1>教师: <span class="title">{{ userInfo.name }}</span> </h1>
      <div class="btnBox">

        <el-tabs type="border-card">
          <el-tab-pane label="疫情信息">
            <!-- 插入学生数据 -->
            <div class="childBtnBox">
              <!-- <v-button @click="bpprt" size="large">体温打卡</v-button> -->
              <div>
                <img class="bpprtImg" alt="体温打卡" @click="bpprt" src="../assets/bpprtCheckImg.png">
                <h3>体温打卡</h3>
              </div>
              <div>
                <img class="bpprtImg" @click="classInfo" src="../assets/class.png">
                <h3>班级管理</h3>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="系统管理">
            <div class="childBtnBox">
              <div>
                <img class="bpprtImg" @click="changeFirst" src="../assets/edit.png">
                <h3>修改个人信息</h3>
              </div>
              <div>
                <img class="bpprtImg" @click="exit" src="../assets/退出.png">
                <h3>退出</h3>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- <v-button @click="classInfo" size="large">班级管理</v-button>
        <v-button @click="bpprt" size="large">体温打卡</v-button> -->
        <!-- <v-button @click="vacc" size="large">疫苗登记</v-button> -->
        <!-- <v-button @click="changeFirst" size="large">修改个人信息</v-button>
        <v-button @click="exit">退出</v-button> -->
      </div>

      <el-dialog title="修改个人信息" :visible.sync="dialogVisibleChange" width="50%">
        <el-form :model="changeInfo">
          <el-form-item label="姓名">
            <el-input v-model="changeInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="changeInfo.password" autocomplete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleChange = false">取 消</el-button>
          <el-button type="primary" @click="change">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'TeacherView',
  data() {
    return {
      dialogVisibleChange: false,
      userInfo: '',
      changeInfo: '',
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
    classInfo() {
      this.$router.push('/cl')
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
      axios.put("http://localhost:8080/user/change", this.changeInfo)
        .then(res => {
          this.$message.success("添加成功")
          this.userInfo = this.changeInfo
          this.dialogVisibleChange = false
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
  }
}
</script>

<style scoped>
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
  width: 500px;
  height: 300px;
}
</style>