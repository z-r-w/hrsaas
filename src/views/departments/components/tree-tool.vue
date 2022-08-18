<template>
  <el-row class="custom-tree-node" style="height: 40px;width: 100%">
    <!-- 左边部门 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右边负责人 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" :disabled="!checkPermission('add')">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item></el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentData } from '@/api/department'
export default {
  name: '',
  components: {},
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true

    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    // 点击下拉菜单操作
    handleCommand(command) {
      if (command === 'add') {
        // 添加部门操作
        this.$emit('addDapa', this.treeNode)
      } else if (command === 'edit') {
        // 编辑部门操作
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除操作
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDepartmentData(this.treeNode.id)
          this.$emit('delTreeNode')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    } }
}
</script>

<style scoped>
 .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
