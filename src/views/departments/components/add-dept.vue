<template>
  <el-dialog title="新增部门" :visible.sync="dialogFormVisible" top="10vh">
    <el-form :model="form" :rules="rules">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" style="width: 80%;" placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" style="width: 80%;" autocomplete="off" placeholder="1-50字符" />
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth" prop="manager">
        <el-select v-model="form.manager" placeholder="请选择" style="width: 80%;" @focus="getEmployeeSimpleFn">
          <el-option
            v-for="item in people"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" style="width: 80%;" placeholder="1-300字符" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartmentData } from '@/api/department'
import { getEmployeeSimple } from '@/api/department'
export default {
  name: '',
  components: {},
  props: {
    // 是否展示弹窗
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const validateRepeatName = async(rule, value, callback) => {
      const { depts } = await getDepartmentData()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(element => element.name === value)
      isRepeat ? callback(new Error('存在相同名称部门， 请重新输入')) : callback()
    }
    // 检查部门编码是否重复
    const validateRepeatCode = async(rule, value, callback) => {
      const { depts } = await getDepartmentData()
      const isRepeat = depts.some(element => element.code === value)
      isRepeat ? callback(new Error(`存在相同部门编码${value}， 请重新输入`)) : callback()
    }
    return {
    //   dialogFormVisible: true,
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formLabelWidth: '120px', // 表单长度
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: validateRepeatName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: validateRepeatCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
      },
      people: []
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  methods: {
    async getEmployeeSimpleFn() {
      const data = await getEmployeeSimple()
      //   console.log(data)
      this.people = data
    }
  }
}
</script>

<style scoped>

</style>

