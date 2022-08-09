<template>
  <!--  -->
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 新增角色 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="新增角色" name="first">
            <el-button type="primary" size="small" style="margin-bottom: 30px" @click="dialogFormVisible=true">新增角色</el-button>

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
                    @click="handle(scope.$index, scope.row)"
                  >分配权限</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)"
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
    <!-- 弹窗 -->
    <el-dialog title="编辑部门" :visible="dialogFormVisible" @close="cancelBtn">
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="角色名称" label-width="100px" prop="name">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="editForm.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getComponyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
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
      form: {}, // 公司表单数据
      dialogFormVisible: false, // 是否显示弹窗
      editForm: {}, // 弹窗表单内容
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '角色名称不能为空' }
        ] },
      forms: {
        name: 'xiaopan',
        region: 'xiaopan'
      }
    }
  },
  created() {
    this.getRoleList()
    this.getComponyInfo()
  },
  methods: {
    // 编辑角色功能
    async handleEdit(row) {
      this.editForm = await getRoleDetail(row.id)
      this.dialogFormVisible = true
    },
    // 弹窗表单确定按钮
    async confirmBtn() {
      try {
        if (this.editForm.id) {
          await this.$refs.editForm.validate()
          await updateRole(this.editForm)
        } else {
          await this.$refs.editForm.validate()
          await addRole(this.editForm)
          console.log('daolemei')
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } catch (err) {
        console.log('err', err)
      }
    },
    // 弹窗表单取消按钮
    cancelBtn() {
      this.dialogFormVisible = false
      this.$refs.editForm.resetFields()
      this.editForm = {
        name: '',
        description: ''
      }
    },
    // 删除角色功能
    async handleDelete(row) {
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
        this.getRoleList()
      } catch (err) {
        console.log(err)
      }
    },
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.tableData = rows
      this.page.total = total
      // console.log(this.tableData)
    },
    // 获取当前页的角色列表
    currentChange(newPage) {
      this.page.page = newPage
      this.getRoleList()
      // console.log(this.page)
    },
    // 读取公司信息数据
    async getComponyInfo() {
      this.form = await getComponyInfo(this.$store.getters.companyId)
      // console.log(this.form)
    }
  }
}
</script>

<style scoped>
.line {
 border-bottom: 1px solid #000;
}
.dialog-footer{
  margin-top: -40px;
}
</style>
