<template>
  <!-- 员工模块 -->
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :is-show="true">
        <span slot="before">共{{ page.total }}条数据</span>
        <template v-slot:after>
          <el-button type="success" @click="$router.push('/import?type=user')">exxel导入</el-button>
          <el-button type="danger" @click="exportData">exxel导出</el-button>
          <el-button type="primary" @click="showDiolog=true">新增员工</el-button>
        </template>
      </page-tools>
      <el-table
        v-loading="loading"
        style="width: 100%"
        :data="tableData"
        border
      >
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="头像" align="center">
          <template slot-scope="{row}">
            <img
              v-imageError="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              @click="showDialog(row.staffPhoto)"
            >
          </template>
        </el-table-column>
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
          <template v-slot="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="showRoleDialogFn(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
          </template>
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
    <!-- 弹层 -->
    <add-employee :show-dialog.sync="showDiolog" />
    <!-- 导入excel表格 -->
    <!-- <upload-excel /> -->

    <!-- 二维码弹层 -->
    <el-dialog title="二维码" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <!-- 角色权限 -->
    <assign-role ref="getUserDetailInfo" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getExployeesList, delEmployee } from '@/api/exployess'
import AddEmployee from './components/add-employee.vue'
import EmployeesEnum from '@/api/constant/employees'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
// import UploadExcel from './components/UploadExcel.vue'
export default {
  components: {
    AddEmployee,
    AssignRole
    // UploadExcel
  },
  data() {
    return {
      loading: false,
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      showDiolog: false, // 是否展示弹层
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showCodeDialog: false, // 二维码弹层
      showRoleDialog: false,
      userId: null
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
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getExployeesList(this.page)
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 导出excel
    async exportData() {
      const headers = {
        '姓名': 'username',
        '手机': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const { rows } = await getExployeesList({ page: 1, size: this.page.total })
      console.log(rows)
      const data = this.formatJson(headers, rows)
      console.log(this.formatJson(headers, rows))
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data, // 具体数据 必填
          filename: '人力资源表', // 非必填 表格名称
          multiHeader,
          merges

        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          // debugger
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeesEnum.hireType.find(o => o.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    // 生成头像二维码
    showDialog(url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          // 更新好dom后,执行弹窗二维码显示
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    // 生成角色弹窗
    async showRoleDialogFn(id) {
      this.userId = id
      await this.$refs.getUserDetailInfo.getUserDetailInfo(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style>

</style>
