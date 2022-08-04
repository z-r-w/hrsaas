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
export default {
  components: {
    TreeTool
  },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: {
        name: '盛丰物流集团有限公司',
        manager: '负责人'
      }
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
