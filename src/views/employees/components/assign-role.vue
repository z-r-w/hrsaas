<template>
  <el-dialog :visible="showRoleDialog" title="分配角色" @close="cancelBtn">
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button @click="cancelBtn">取消</el-button>
        <el-button type="primary" @click="okBtn">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailInfo } from '@/api/user'
import { assignRoles } from '@/api/exployess'
export default {
  name: '',
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleListFn()
  },
  methods: {
    // 获取角色
    async getRoleListFn() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    //  获取所有角色
    // async getRoleList() {
    //   const { rows } = await getRoleList()
    //   this.list = rows
    // }
    // 获取当前拥有的角色
    async getUserDetailInfo(id) {
      const { roleIds } = await getUserDetailInfo(id)
      this.roleIds = roleIds
    },
    // 确定
    async okBtn() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
    },
    // 取消
    cancelBtn() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
