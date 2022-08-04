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
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot">删除部门</el-dropdown-item></el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
  methods: {}
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
