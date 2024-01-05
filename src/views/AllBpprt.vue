<template>
  <div class="app">
    <h1 class="title">所有人员体温打卡情况</h1>
    <h1>已打卡:{{ checked }} &nbsp; 未打卡:{{ uncheck }}</h1>
    <el-table :data="allBpprtInfo" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="name" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="account" label="学号/工号" sortable>
      </el-table-column>
      <el-table-column prop="bpprt" label="体温值" sortable>
      </el-table-column>
      <el-table-column prop="type" label="职业" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'AllBpprt',
  data() {
    return {
      allBpprtInfo: [],
      checked: 0,
      uncheck: 0,

    }
  },
  methods: {

  },
  created() {
    axios.get("http://localhost:8080/se/getAllBpprtInfo")
      .then(res => {
        this.allBpprtInfo = res.data.data

        for (let index = 0; index < this.allBpprtInfo.length; index++) {
          const element = this.allBpprtInfo[index];
          if (element.bpprt == "0") {
            // 未打卡
            this.uncheck++
            this.allBpprtInfo[index].bpprt = "未打卡"
          } else {
            this.checked++
          }

        }

      })
      .catch(err => {
        console.error(err);
      })
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
</style>