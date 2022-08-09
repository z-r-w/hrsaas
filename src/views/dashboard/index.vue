<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <PageTool>
      <span slot="before">我想你了</span>
      <el-button slot="after">按钮</el-button>
      <PageTool />
    </pagetool></div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTool from '@/components/PageTools/index.vue'
export default {
  name: 'Dashboard',
  components: {
    PageTool
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
