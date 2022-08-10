<template>
  <!-- 员工模块 -->
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :is-show="true">
        <span slot="before">共{{ page.total }}条数据</span>
        <template v-slot:after>
          <el-button type="success">exxel导入</el-button>
          <el-button type="danger">exxel导出</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <el-table
        v-loading="loading"
        style="width: 100%"
        :data="tableData"
        border
      >
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formOfEmploymentFn" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template v-slot=" obj ">{{ obj.row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="inServiceStatus">
          <template v-slot="{ row }">
            <el-switch :value="row.inServiceStatus === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">转正</el-button>
          <el-button type="text" size="small">调岗</el-button>
          <el-button type="text" size="small">离职</el-button>
          <el-button type="text" size="small">角色</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-row type="flex" align="middle" justify="end" style="height: 50px">
        <el-pagination
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.size"
          @current-change="currentChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getExployeesList } from '@/api/exployess'
import EmployeesEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      loading: false,
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      tableData: []
    }
  },
  created() {
    // 调用
    this.getExployeesList(this.page)
  },
  methods: {
    // 获取员工信息列表
    async getExployeesList(data) {
      this.loading = true
      const { rows, total } = await getExployeesList(data)
      this.tableData = rows
      this.page.total = total
      this.loading = false
    },
    // 点击分页符
    currentChange(newPage) {
      // console.log('newPage', newPage)
      this.page.page = newPage
      this.getExployeesList(this.page)
    },
    // 格式化聘用信息
    formOfEmploymentFn(row, column, cellValue, index) {
      const obj = EmployeesEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>
