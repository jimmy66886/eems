<template>
  <div class="app">
    <h1>二级单位管理员: <span class="title">{{ userInfo.name }}</span> </h1>
    <div class="btnBox">


      <el-tabs type="border-card">
        <el-tab-pane label="人员管理">
          <div class="childBtnBox">
            <div>
              <img class="bpprtImg" @click="dialogVisibleAdd = true" src="../assets/添加疫情.png">
              <h3>添加学生</h3>
            </div>
            <div>
              <img class="bpprtImg" alt="消息" @click="dialogVisibleAddTeacher = true" src="../assets/添加二级.png">
              <h3>添加老师</h3>
            </div>
            <div>
              <img class="bpprtImg" alt="消息" @click="batchAddTeacher" src="../assets/excelT.png">
              <h3>批量添加老师</h3>
            </div>
            <div>
              <img class="bpprtImg" alt="消息" @click="batchAdd" src="../assets/excel.png">
              <h3>批量添加学生</h3>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="疫情信息">
          <!-- 插入学生数据 -->
          <div class="childBtnBox">
            <div>
              <img class="bpprtImg" alt="体温打卡" @click="bpprt" src="../assets/bpprtCheckImg.png">
              <h3>体温打卡</h3>
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


      <!-- 插入学生数据 -->
      <!-- <v-button @click="dialogVisibleAdd = true" size="large">添加学生</v-button>
      <v-button @click="dialogVisibleAddTeacher = true" size="large">添加老师</v-button> -->
      <!-- <v-button @click="bpprt" size="large">体温打卡</v-button> -->
      <!-- <v-button @click="vacc" size="large">疫苗登记</v-button> -->
      <!-- <v-button @click="changeFirst" size="large">修改个人信息</v-button> -->
      <!-- excel上传 -->
      <!-- <v-button @click="batchAdd" size="large">批量上传学生信息</v-button> -->
      <!-- <v-button @click="exit">退出</v-button> -->
    </div>

    <el-dialog title="批量上传学生信息" :visible.sync="dialogVisibleUpload" width="50%">
          <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <v-button @click="downloadStudentTemplate">下载模板</v-button>
            <input style="text-align: center;" type="file" @change="handleFileChange" />
            <v-button type="primary" @click="uploadFile">上传excel表格</v-button>
          </div>
    </el-dialog>

    <el-dialog title="批量上传老师信息" :visible.sync="dialogVisibleUploadTeacher" width="50%">
          <div style="display: flex; flex-direction: row; justify-content: space-around;">
            <v-button @click="downloadTeacherTemplate">下载模板</v-button>
            <input type="file" @change="handleFileChange" />
            <v-button type="primary" @click="uploadTeacherFile">上传excel表格</v-button>
          </div>
    </el-dialog>

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

    <el-dialog title="添加学生" :visible.sync="dialogVisibleAdd" width="50%">
      <el-form :model="addStudent">
        <el-form-item label="学生姓名">
          <el-input v-model="addStudent.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生学号">
          <el-input v-model="addStudent.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生身份证号">
          <el-input v-model="addStudent.ic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生生日">
          <!-- <el-date-picker v-model="addStudent.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker> -->
          <el-input v-model="comBirthday" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生班级id">
          <el-input v-model="addStudent.classId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="insert">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加老师" :visible.sync="dialogVisibleAddTeacher" width="50%">
      <el-form :model="addTeacher">
        <el-form-item label="老师姓名">
          <el-input v-model="addTeacher.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="老师工号">
          <el-input v-model="addTeacher.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="老师班级id">
          <el-input v-model="addTeacher.classId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddTeacher = false">取 消</el-button>
        <el-button type="primary" @click="insertTeacher">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import axios from "axios"
import { format } from 'date-fns';
export default {
  name: 'SltAdmin',
  data() {
    return {
      dialogVisibleAdd: false,
      dialogVisibleAddTeacher: false,
      dialogVisibleChange: false,
      dialogVisibleUpload: false,
      dialogVisibleUploadTeacher: false,

      // 学生密码默认000000
      addTeacher: {
        name: '',
        account: '',
        classId: '',
      },
      addStudent: {
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

    downloadStudentTemplate() {
      // 下载模板逻辑
      window.location.href = 'http://localhost:8080/upload/downloadTemplate'; // 假设后端提供了下载模板的接口
    },

    downloadTeacherTemplate() {
      window.location.href = 'http://localhost:8080/upload/downloadTemplateTeacher'; // 假设后端提供了下载模板的接口
    },

    extractBirthday(idCardNumber) {
      const birthdayString = idCardNumber.substring(6, 14);
      const formattedBirthday = `${birthdayString.substring(0, 4)}-${birthdayString.substring(4, 6)}-${birthdayString.substring(6, 8)}`;
      return formattedBirthday;
    },

    batchAdd() {
      this.dialogVisibleUpload = true
    },
    batchAddTeacher() {
      this.dialogVisibleUploadTeacher = true
    },

    handleFileChange(event) {

      console.log("测试")
      this.selectedFile = event.target.files[0];
    },

    uploadTeacherFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // 使用 Axios 发送文件
      axios.post('http://localhost:8080/upload/excel/teacher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$message.error("报错:"+response.data.msg)
            return
          }
          this.dialogVisibleUpload = false
          this.$message.success("上传成功")
          // 处理上传成功的逻辑
        })
        .catch(error => {
          console.error('上传失败', error);
          // 处理上传失败的逻辑
        });
    },

    uploadFile() {
      console.log("测试")
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // 使用 Axios 发送文件
      axios.post('http://localhost:8080/upload/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 0) {
            this.$message.error(response.data.msg)
          }
          this.dialogVisibleUpload = false
          this.$message.success("上传成功")
          // 处理上传成功的逻辑
        })
        .catch(error => {
          console.error('上传失败', error);
          // 处理上传失败的逻辑
        });
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
    insert() {

      this.addStudent.birthday = this.comBirthday

      axios.post("http://localhost:8080/slt/insert", this.addStudent)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.error("添加失败:" + res.data.msg)
          } else {
            this.$message.success("添加成功")
            this.dialogVisibleAdd = false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },

    insertTeacher() {
      axios.post("http://localhost:8080/slt/insertTeacher", this.addTeacher)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.error("添加失败:" + res.data.msg)
          } else {
            this.$message.success("添加成功")
            this.dialogVisibleAddTeacher = false
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
  },
  computed: {
    comBirthday() {
      // 计算整数和小数的组合，形成体温值
      return this.extractBirthday(this.addStudent.ic);
    },
  },
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