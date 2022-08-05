<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <TreeTool :tree-node="company" :is-root="false" />
        <!-- 内容 -->
        <el-tree :data="departs" :props="defaultProps">
          <TreeTool slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import { getDepartmentData } from '@/api/department'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTool
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
        manager: '负责人'
      }
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
