<template>
  <el-dialog title="新增部门" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="部门名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" style="width: 80%;" placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth">
        <el-input v-model="form.name" style="width: 80%;" autocomplete="off" placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择" style="width: 80%;">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" :label-width="formLabelWidth">
        <el-input v-model="form.name" type="textarea" style="width: 80%;" placeholder="1-300字符" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 是否展示弹窗
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    //   dialogFormVisible: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
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

</style>

