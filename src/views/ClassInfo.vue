<template>
    <div class="app">
        <h1>班级体温打卡情况</h1>
        <div style="text-align: left;">
            <v-button @click="back" type="primary">返回</v-button>
        </div>
        <el-table :data="studentBpprtInfo" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="name" label="姓名" sortable>
            </el-table-column>
            <el-table-column prop="account" label="学号" sortable>
            </el-table-column>
            <el-table-column prop="bpprt" label="体温打卡情况" sortable>
            </el-table-column>
        </el-table>
        <br>
        <hr>
        <br>
        <div class="echart" id="mychart" :style="{ float: 'left', width: '50%', height: '400px' }"></div>
        <div class="echart" id="mychart1" :style="{ float: 'right', width: '50%', height: '400px' }"></div>
    </div>
</template>

<script>

import axios from 'axios';
import { el } from 'date-fns/locale';
import * as echarts from "echarts"
export default {
    name: 'ClassInfo',
    data() {
        return {
            userInfo: JSON.parse(localStorage.getItem("userInfo")),
            studentBpprtInfo: [],
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

        modifyData() {
            console.log("hahah")
            for (let index = 0; index < this.studentBpprtInfo.length; index++) {
                if (this.studentBpprtInfo[index].bpprt === '0') {
                    this.uncheck++
                    this.unkonwn++
                    this.studentBpprtInfo[index].bpprt = '未打卡'
                } else {
                    // 判断是否健康36.3-37.2
                    if (parseFloat(this.studentBpprtInfo[index].bpprt) >= 36.3 && parseFloat(this.studentBpprtInfo[index].bpprt) <= 37.2) {
                        this.health++
                    } else {
                        this.unhealth++
                    }
                    this.checked++
                }
            }
            this.initEcharts()
            this.initEcharts1()
        }
    },
    created() {
        axios.get(`http://localhost:8080/te/getBpprtInfo/${this.userInfo.classId}`)
            .then(res => {
                this.studentBpprtInfo = res.data.data
                this.modifyData()
            })
            .catch(err => {
                console.error(err);
            })
    }
}
</script>

<style scoped>
.app {
    width: 1000px;
    margin: 0 auto;
}
</style>