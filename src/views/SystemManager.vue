<template>
  <div class="app">
    <h1>管理员: <span class="title">{{ userInfo.name }}</span>  </h1>
    <div class="btnBox">
      <!-- 插入学生数据 -->

      <el-tabs type="border-card">
        <el-tab-pane label="人员管理">

          <div class="childBtnBox">
            <div>
              <img class="bpprtImg" @click="dialogVisibleAddSe = true" src="../assets/添加疫情.png">
              <h3>添加疫情管理员</h3>
            </div>
            <div>
              <img class="bpprtImg" alt="消息" @click="dialogVisibleAddSlt = true" src="../assets/添加二级.png">
              <h3>添加二级单位管理员</h3>
            </div>
          </div>

          <!-- <v-button  size="large">添加疫情管理员</v-button>
          <v-button  size="large">添加二级单位管理员</v-button> -->
        </el-tab-pane>
        <el-tab-pane label="系统设置">

          <div class="childBtnBox">
            <div>
              <img class="bpprtImg" @click="changeFirst" src="../assets/edit.png">
              <h3>修改个人信息</h3>
            </div>
            <!-- <v-button @click="changeFirst" size="large">修改个人信息</v-button> -->
            <div>
              <img class="bpprtImg" @click="exit" src="../assets/退出.png">
              <h3>退出</h3>
            </div>
          </div>

          <!-- <v-button @click="changeFirst" size="large">修改个人信息</v-button>
          <v-button @click="exit">退出</v-button> -->
        </el-tab-pane>

      </el-tabs>



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

    <el-dialog title="添加疫情管理员" :visible.sync="dialogVisibleAddSe" width="50%">
      <el-form :model="addSe">
        <el-form-item label="管理员姓名">
          <el-input v-model="addSe.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员工号">
          <el-input v-model="addSe.account" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddSe = false">取 消</el-button>
        <el-button type="primary" @click="insertSe">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加二级单位管理员" :visible.sync="dialogVisibleAddSlt" width="50%">
      <el-form :model="addSlt">
        <el-form-item label="管理员姓名">
          <el-input v-model="addSlt.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员工号">
          <el-input v-model="addSlt.account" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddSlt = false">取 消</el-button>
        <el-button type="primary" @click="insertSlt">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>
  
<script>
import axios from "axios"
export default {
  name: 'SystemManager',
  data() {
    return {
      dialogVisibleAddSlt: false,
      dialogVisibleAddSe: false,
      dialogVisibleChange: false,
      addSlt: {
        name: '',
        account: '',
      },
      addSe: {
        name: '',
        account: '',
        birthday: '',
        ic: '',
        classId: '',
      },
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
    insertSlt() {
      axios.post("http://localhost:8080/user/insertSlt", this.addSlt)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.error("添加失败:" + res.data.msg)
          } else {
            this.$message.success("添加成功")
            this.dialogVisibleAddSlt = false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },

    insertSe() {

      if(this.addSe.account==''){
        this.$message.error("工号不能为空")
        return
      }

      axios.post("http://localhost:8080/user/insertSe", this.addSe)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.error("添加失败:" + res.data.msg)
          } else {
            this.$message.success("添加成功")
            this.dialogVisibleAddSe = false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
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
  width: 400px;
  height: 300px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
}
</style>