<template>
  <!-- 封装一个全局消息提示框 -->
  <el-card class="box-card">
    <el-row align="middle" justify="space-between" type="flex">
      <!-- 前插槽 -->
      <el-col v-if="isShow">
        <div class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <!-- 后插槽 -->
      <el-col>
        <el-row align="middle" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
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

<style lang="scss" scoped>
.box-card {
  .before {
    line-height: 32px;
    display: inline-block;
    border: 1px solid skyblue;
    background: #E6F7FF;
    border-radius: 3px;
      padding: 0px 10px;
    .el-icon-info {
      margin-right: 5px;
      color: #409eff;
    }
  }
}
</style>
