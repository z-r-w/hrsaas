<template>
  <div class="container">
    <SvgIcon icon-class="fullscreen" style="width:20px; height:20px; color: #fff;" @click="changeScreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    // 放大和缩小
    changeScreen() {
      if (!screenfull.isEnabled) {
        this.$message.warning('当前功能不能使用')
        return
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped>
.container {
    display: inline-block;
}
</style>
