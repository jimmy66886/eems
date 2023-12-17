<template>
  <div class="app">
    <h1>疫苗登记界面</h1>
    <br>
    <el-select v-model="selectedOption" placeholder="请选择疫苗接种情况">
      <el-option label="一针" value="一针"></el-option>
      <el-option label="两针" value="两针"></el-option>
      <el-option label="三针" value="三针"></el-option>
      <el-option label="四针" value="四针"></el-option>
      <el-option label="未接种" value="未接种"></el-option>
    </el-select>
    <br>
    <br>
    <v-button type="primary" @click="submit">提交</v-button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'VaccCheck',
  data() {
    return {
      selectedOption: '',
      account: JSON.parse(localStorage.getItem("userInfo")).account
    }
  },
  methods: {
    submit() {
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(`http://localhost:8080/vacc/insert/${this.selectedOption}/${this.account}`).then(res => {
          this.$message.success("提交成功")
        }).catch(err => {
          this.$message.info(err.data.msg)
        })
      }).catch(() => {
        console.log("已取消")
      });
    }
  },
  mounted(){
    // 获取接种情况
    axios.get(`http://localhost:8080/vacc/get/${this.account}`)
    .then(res => {
      this.selectedOption = res.data.data.value
    })
    .catch(err => {
      console.error(err); 
    })
  }
}
</script>

<style scoped>
.app {
  padding-top: 100px;
  height: 400px;
  text-align: center;
}
</style>