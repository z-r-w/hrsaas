<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:70%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:70%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:70%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:70%" placeholder="请选择">
          <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:70%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:70%" placeholder="请选择部门" @focus="getDepartmentData" />
        <el-tree v-if="showTree" v-loading="loading" :data="treeData" :props="defaultProps" :default-expand-all="true" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:70%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>

  </el-dialog>
</template>

<script>
import { tranListToTreeData } from '@/utils/index'
import { getDepartmentData } from '@/api/department'
import { addEmployee } from '@/api/exployess'
import EmployeeEnum from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '名字不能为空' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      EmployeeEnum // 聘用形式
    }
  },
  methods: {
    // 获取部门树形结构
    async getDepartmentData() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartmentData()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    // 点击获取对应部门
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    // 点击确定时 校验整个表单
    async btnOK() {
      try {
        await this.$refs.formData.validate()
        console.log(this.formData)
        console.log(addEmployee())
        // 调用新增接口
        await addEmployee(this.formData) // 新增员工
        // 告诉父组件更新数据
        // this.$parent 可以直接调用到父组件的实例 实际上就是父组件this
        // this.$emit
        this.$parent.getExployeesList()
        this.$parent.showDiolog = false
        this.$message.success('新增成功')
      } catch (error) {
        console.log('error', error)
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.formData.resetFields() // 重置校验结果
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
