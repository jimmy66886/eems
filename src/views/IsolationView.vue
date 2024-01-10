<template>
    <div class="app">

        <el-dialog title="已隔离人员" :visible.sync="dialogVisibleDialog" width="70%">
            <el-table :data="isolationList" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
                <el-table-column prop="name" label="姓名" sortable>
                </el-table-column>
                <el-table-column prop="account" label="学号" sortable>
                </el-table-column>
                <el-table-column prop="startDate" label="开始时间" sortable>
                </el-table-column>
                <el-table-column prop="endDate" label="结束时间" sortable>
                </el-table-column>
                <el-table-column prop="site" label="地点" sortable>
                </el-table-column>
                <el-table-column label="操作" width="160px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <div class="title">
            <v-button @click="back" type="primary">返回</v-button>

            <h1>新增隔离</h1>

            <el-button type="success" icon="el-icon-d-arrow-right
" @click="showIsolation">查看已隔离人员</el-button>

        </div>
        <div class="searchBox">
            <el-input v-model="isolation.account" placeholder="请输入学号"></el-input><el-button type="primary"
                icon="el-icon-search" @click="search">搜索</el-button>
        </div>

        <div class="resultBox" v-show="showResult">
            <el-input disabled v-model="isolation.name"></el-input><el-button type="danger" icon="el-icon-search"
                @click="dialogVisible = true">隔离</el-button>
        </div>




        <el-dialog title="隔离学生" :visible.sync="dialogVisible" width="50%">
            <el-form :model="isolation">
                <el-form-item label="学生姓名">
                    <el-input disabled v-model="isolation.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生学号">
                    <el-input disabled v-model="isolation.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker v-model="isolation.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker v-model="isolation.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="隔离地点">
                    <el-input v-model="isolation.site" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="isolationThis">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'IsolationView',
    data() {
        return {
            account: '',
            dialogVisible: false,
            dialogVisibleDialog: false,
            showResult: false,
            isolation: {
                account: '',
                startDate: '',
                endDate: '',
                name: '',
                site: '',
            },
            isolationList: [],
        }
    },
    methods: {

        back() {
            this.$router.go(-1)
        },

        // 根据id删除隔离记录
        handleDelete(index, row) {

            this.$confirm('是否确定隔离?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`http://localhost:8080/isolation/remove/${row.id}`)
                    .then(res => {
                        this.$message.success("删除成功")
                        this.dialogVisibleDialog = false
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }).catch(() => {
                console.log("已取消")
            });
        },

        showIsolation() {

            axios.get("http://localhost:8080/isolation/list")
                .then(res => {
                    this.isolationList = res.data.data
                    this.dialogVisibleDialog = true
                })
                .catch(err => {
                    console.error(err);
                })



        },

        search() {

            if (this.isolation.account == "") {
                this.$message.error("请输入学号")
                return
            }

            this.showResult = false
            console.log(this.isolation.account)
            axios.get(`http://localhost:8080/isolation/get/${this.isolation.account}`)
                .then(res => {
                    if (res.data.data != null) {
                        // 查询成功
                        this.isolation.name = res.data.data.name
                        this.showResult = true
                    } else {
                        this.$message.error("查询失败,请检查学号")
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },
        isolationThis() {

            // 先进行非空判断
            if (this.isolation.site == '') {
                this.$message.error("请输入隔离地点")
                return
            }

            this.$confirm('是否确定隔离?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post(`http://localhost:8080/isolation/insert`, this.isolation)
                    .then(res => {

                        if (res.data.code == 0) {
                            this.$message.error(res.data.msg)
                            return
                        }

                        console.log(this.isolation)
                        this.$message.success("隔离成功")
                        this.dialogVisible = false
                        this.showResult = false
                    })
                    .catch(err => {
                        console.error(err);
                    })

            }).catch(() => {
                console.log("已取消")
            });

        }
    }
}
</script>

<style scoped>
.title {
    margin: 0 auto;
    width: 600px;
    display: flex;
    justify-content: space-between;
}

.app {
    width: 1240px;
    margin: 0 auto;
    height: auto;
    padding-top: 100px;
    text-align: center;
}

.searchBox,
.resultBox {
    padding-top: 10px;
    margin: 0 auto;
    display: flex;
    width: 600px;
}
</style>