<template>
  <div>
    <div class="app">
      <h1>疫情管理员: <span class="title">{{ userInfo.name }}</span> </h1>
      <div class="btnBox">

        <el-tabs type="border-card">
          <el-tab-pane label="疫情信息管理">
            <div class="childBtnBox">
              <div>
                <img class="bpprtImg" @click="dialogVisibleMessage = true" src="../assets/send-fill.png">
                <h3>发送疫情信息</h3>
              </div>
              <!-- <v-button @click="changeFirst" size="large">修改个人信息</v-button> -->
              <div>
                <img class="bpprtImg" @click="manageMessage" src="../assets/消息.png">
                <h3>查看疫情信息列表</h3>
              </div>

              <!-- <v-button size="large" @click="exit">退出</v-button> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="隔离信息">
            <div class="childBtnBox">
              <div>
                <img class="bpprtImg" @click="isolation" src="../assets/隔离.png">
                <h3>隔离管理</h3>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="体温管理">
            <div class="childBtnBox">
              <div>
                <img class="bpprtImg" @click="bpprt" src="../assets/bpprtCheckImg.png">
                <h3>体温打卡</h3>
                <!-- <v-button @click="bpprt" size="large">体温打卡</v-button> -->

              </div>
              <div>
                <img class="bpprtImg" @click="allBpprtInfo" src="../assets/体温单.png">
                <h3>查看体温打卡情况</h3>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="系统管理">
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
              <!-- <v-button size="large" @click="exit">退出</v-button> -->
            </div>
          </el-tab-pane>

        </el-tabs>

        <!-- <v-button @click="teacherInfo" size="large">教师管理</v-button> -->
        <!-- <v-button @click="dialogVisibleMessage = true" size="large">发送疫情信息</v-button> -->
        <!-- <v-button @click="manageMessage" size="large">管理疫情信息</v-button> -->
        <!-- <v-button @click="allBpprtInfo" size="large">查看体温打卡情况</v-button> -->

        <!-- <v-button @click="isolation" size="large">隔离管理</v-button> -->
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

      <el-dialog title="消息列表" :visible.sync="dialogVisibleMessageManage" width="70%">
        <el-table :data="messageList" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column prop="info" label="内容" sortable>
          </el-table-column>
          <el-table-column prop="datetime" label="时间" sortable>
          </el-table-column>
          <el-table-column prop="author" label="发起人" sortable>
          </el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog title="疫情信息" :visible.sync="dialogVisibleMessage" width="50%">
        <el-form :model="message">
          <el-form-item label="内容">
            <el-input v-model="message.info" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleMessage = false">取 消</el-button>
          <el-button type="primary" @click="send">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'SeAdmin',
  data() {
    return {
      dialogVisibleChange: false,
      dialogVisibleMessage: false,
      dialogVisibleMessageManage: false,
      userInfo: '',
      changeInfo: '',
      message: {
        info: '',
        author: '',
      },
      messageList: [],
    }
  },
  methods: {

    handleDelete(index, row) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(`http://localhost:8080/message/remove/${row.id}`)
          .then(res => {
            this.$message.success("删除成功")
            this.dialogVisibleMessageManage = false
          })
          .catch(err => {
            console.error(err);
          })
      }).catch(() => {
        console.log("已取消")
      });
    },

    manageMessage() {
      // 获取消息列表
      axios.get(`http://localhost:8080/message/getAll`)
        .then(res => {
          this.messageList = res.data.data
          this.dialogVisibleMessageManage = true
        })
        .catch(err => {
          console.error(err);
        })
    },

    send() {

      this.message.author = this.userInfo.name
      axios.post("http://localhost:8080/message/send", this.message)
        .then(res => {
          console.log(res)
          this.$message.success("发送成功")
          this.dialogVisibleMessage = false
        })
        .catch(err => {
          console.error(err);
        })
    },

    isolation() {
      this.$router.push('/iso')
    },
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

    allBpprtInfo() {
      this.$router.push('/allBpprt')
    },

    teacherInfo() {
      this.$router.push('/ti')
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
  created() {
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