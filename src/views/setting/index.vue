<template>
  <!--  -->
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 新增角色 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="新增角色" name="first">
            <el-button type="primary" size="small" style="margin-bottom: 30px">新增角色</el-button>

            <el-table
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
              />
              <el-table-column
                prop="name"
                label="角色"
                width="180"
                align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              />
              <el-table-column
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)"
                  >分配权限</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页符 -->
            <el-pagination
              layout="prev, pager, next"
              :total="page.total"
              style="float:right; margin-top: 10px"
              @current-change="currentChange"
            />
          </el-tab-pane>

          <!-- 公司信息 -->
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="消息提示的文案"
              type="info"
              show-icon
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="form.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="form.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remarks" disabled type="textarea" :rows="3" style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getComponyInfo, deleteRole } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [], // 角色信息列表
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      }, // 页数
      form: {} // 公司表单数据
    }
  },
  created() {
    this.getRoleList()
    this.getComponyInfo()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 删除角色功能
    async handleDelete(index, row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (err) {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
        // console.log(err)
      }
      console.log(index, row)
    },
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.tableData = rows
      this.page.total = total
      console.log(this.tableData)
    },
    // 获取当前页的角色列表
    currentChange(newPage) {
      this.page.page = newPage
      this.getRoleList()
      console.log(this.page)
    },
    // 读取公司信息数据
    async getComponyInfo() {
      this.form = await getComponyInfo(this.$store.getters.companyId)
      console.log(this.form)
    }
  }
}
</script>

<style scoped>
.line {
 border-bottom: 1px solid #000;
}
</style>
