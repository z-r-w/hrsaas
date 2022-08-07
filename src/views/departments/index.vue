<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <TreeTool :tree-node="company" :is-root="false" @addDapa="addDapaFn" />
        <!-- 内容 -->
        <el-tree :data="departs" :props="defaultProps">
          <TreeTool slot-scope="{ data }" :tree-node="data" @delTreeNode="getDepartmentDataFn" @addDapa="addDapaFn" @editDept="editDept" />
        </el-tree>
        <!-- 弹窗 -->
        <addDept ref="getDepartDetail" :dialog-form-visible.sync="showDialog" :tree-node="node" @addDept="getDepartmentDataFn" />
      </el-card>
    </div>
  </div>
</template>

<script>
import addDept from './components/add-dept.vue'
import TreeTool from './components/tree-tool.vue'
import { getDepartmentData } from '@/api/department'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTool,
    addDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: {
        name: '盛丰物流集团有限公司',
        manager: '负责人',
        id: ''
      },
      showDialog: false, // 是否显示弹窗
      node: null // 获取当前的node节点
    }
  },
  created() {
    this.getDepartmentDataFn()
  },
  methods: {
    async getDepartmentDataFn() {
      const { depts } = await getDepartmentData()
      // 获取树形部门数据
      this.departs = tranListToTreeData(depts, '')
      // console.log('depts', this.departs)
    },
    // 添加部门
    addDapaFn(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDept(node) {
      this.showDialog = true
      this.node = node
      // 调用子组件获取部门详情
      this.$refs.getDepartDetail.getDepartmentDetailFn(this.node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
   padding: 30px  140px;
  font-size:14px;
}
</style>
