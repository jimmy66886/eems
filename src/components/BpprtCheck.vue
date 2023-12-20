<template>
  <div class="app">
    <h1>体温打卡界面</h1>
    <br>
    <div>
      <el-select v-model="selectedInteger" placeholder="选择整数">
        <el-option v-for="num in integerOptions" :key="num" :label="num" :value="num"></el-option>
      </el-select>

      <span style="margin: 0 5px;">.</span>

      <el-select v-model="selectedDecimal" placeholder="选择整数">
        <el-option v-for="num in decimalOptions" :key="num" :label="num" :value="num"></el-option>
      </el-select>


      <p>选择的体温：{{ selectedTemperature }}</p>
      <br>
      <v-button type="primary" @click="submit">提交</v-button>&nbsp;&nbsp;
      <v-button type="primary" @click="back">返回</v-button>

    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'BpprtCheck',
  data() {
    return {
      selectedInteger: 36, // 用于存储选择的整数部分
      selectedDecimal: 5,    // 用于存储选择的小数部分，默认为0
      integerOptions: Array.from({ length: 8 }, (_, i) => i + 35), // 整数部分的选项，这里假设从35到42
      decimalOptions: Array.from({ length: 10 }, (_, i) => i), // 小数部分的选项，这里假设从0到9
      account: JSON.parse(localStorage.getItem("userInfo")).account
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    submit() {
      console.log(this.selectedTemperature)
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(`http://localhost:8080/bpprt/insert/${this.selectedTemperature}/${this.account}`).then(res => {
          this.$message.success("提交成功")
        }).catch(err => {
          this.$message.info(err.data.msg)
        })
      }).catch(() => {
        console.log("已取消")
      });
    }
  },
  computed: {
    selectedTemperature() {
      // 计算整数和小数的组合，形成体温值
      return `${this.selectedInteger}.${this.selectedDecimal}`;
    },
  },
}
</script>

<style>
.app {
  padding-top: 100px;
  height: 400px;
  text-align: center;
}
</style>