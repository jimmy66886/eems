<template>
  <div class="app">
    <h1 class="title">所有人员体温打卡情况</h1>
    <v-button @click="back" type="primary">返回</v-button>
    <el-table :data="pageBpprtInfo" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="name" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="account" label="学号/工号" sortable>
      </el-table-column>
      <el-table-column prop="bpprt" label="体温值" sortable>
      </el-table-column>
      <el-table-column prop="type" label="职业" sortable>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next,total,sizes,jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="page" 
      :page-sizes="[5,10,20]" 
      :page-size="pageSize" 
      :total="allBpprtInfo.length">
    </el-pagination>

    <hr>

    <br>
    <div class="echart" id="mychart" :style="{ float: 'left', width: '50%', height: '400px' }"></div>
    <div class="echart" id="mychart1" :style="{ float: 'right', width: '50%', height: '400px' }"></div>

  </div>
</template>

<script>
import axios from "axios"
import * as echarts from "echarts"

export default {
  name: 'AllBpprt',
  data() {
    return {
      // 体温信息列表
      allBpprtInfo: [],
      pageBpprtInfo: [],
      total: 0,
      // 当前页
      page: 1,
      // 每页显示数
      pageSize: 5,
      checked: 0,
      uncheck: 0,
      health: 0,
      unhealth: 0,
      unkonwn: 0,
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },


    initEcharts() {
      const option = {
        title: {
          text: '班级打卡饼状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.checked, name: '已打卡' },
              { value: this.uncheck, name: '未打卡' },
              // { value: this.studentBpprtInfo.length, name: '总人数' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));// 图标初始化
      myChart.setOption(option);// 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initEcharts1() {
      const option = {
        title: {
          text: '健康状况饼状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.health, name: '正常' },
              { value: this.unhealth, name: '不正常' },
              { value: this.unkonwn, name: '未知' },
              // { value: this.studentBpprtInfo.length, name: '总人数' },
            ],
            // 这里可以改
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart1"));// 图标初始化
      myChart.setOption(option);// 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    handleSizeChange(size){
      this.pageSize = size
      this.page = 1
      this.fetchPageData()
    },

    handleCurrentChange(page){
      this.page = page
      this.fetchPageData()
    },

    fetchPageData() {
      axios.get(`http://localhost:8080/se/getAllBpprtInfoByPage/${this.page}/${this.pageSize}`)
        .then(res => {
          this.pageBpprtInfo = res.data.data.records
          for (let index = 0; index < this.pageBpprtInfo.length; index++) {
            const element = this.pageBpprtInfo[index];
            if (element.bpprt == "0") {
              this.pageBpprtInfo[index].bpprt = "未打卡"
            }
          }
        })
        .catch(err => {
          console.error(err);
        })
    },

    fetchAllData() {
      axios.get(`http://localhost:8080/se/getAllBpprtInfo`)
        .then(res => {
          this.allBpprtInfo = res.data.data
          this.total = res.data.data.length
          for (let index = 0; index < this.allBpprtInfo.length; index++) {
            const element = this.allBpprtInfo[index];
            if (element.bpprt == "0") {
              // 未打卡
              this.uncheck++
              this.allBpprtInfo[index].bpprt = "未打卡"
              this.unkonwn++
            } else {

              // 判断是否健康36.3-37.2
              if (parseFloat(this.allBpprtInfo[index].bpprt) >= 36.3 && parseFloat(this.allBpprtInfo[index].bpprt) <= 37.2) {
                this.health++
              } else {
                this.unhealth++
              }
              this.checked++
            }

          }

          this.initEcharts()
          this.initEcharts1()

        })
        .catch(err => {
          console.error(err);
        })
    }


  },
  created() {
    this.fetchAllData()
    this.fetchPageData()
  }
}
</script>

<style scoped>
.app {
  width: 1000px;
  margin: 0 auto;
  height: auto;
  padding-top: 100px;
  text-align: center;
}

.title {
  color: blue;
}
</style>