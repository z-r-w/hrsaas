<template>
  <!-- 公司设置 -->
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部导航 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="新增角色" name="first">
            <el-button type="primary" size="small" style="margin-bottom: 30px">默认按钮</el-button>

            <el-table
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="date"
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
                prop="address"
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
              :total="1"
              style="float:right; margin-top: 10px"
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
              <el-form-item label="公司名称" style="width: 400px">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="公司地址" style="width: 400px">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="邮箱" style="width: 400px">
                <el-input disabled />
              </el-form-item>
              <el-form-item label="备注" style="width: 400px" type="textarea" :rows="3">
                <el-input disabled />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
.line {

 border-bottom: 1px solid #000;
}
</style>
