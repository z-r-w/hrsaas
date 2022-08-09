<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :is-show="true">
        <span slot="before">共16条数据</span>
        <template v-slot:after>
          <el-button type="success">exxel导入</el-button>
          <el-button type="danger">exxel导出</el-button>
          <el-button type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <el-table
        style="width: 100%"
      >
        <el-table-column label="序号" sortable="" />
        <el-table-column label="姓名" sortable="" />
        <el-table-column label="工号" sortable="" />
        <el-table-column label="聘用形式" sortable="" />
        <el-table-column label="部门" sortable="" />
        <el-table-column label="入职时间" sortable="" />
        <el-table-column label="账户状态" sortable="" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">转正</el-button>
          <el-button type="text" size="small">调岗</el-button>
          <el-button type="text" size="small">离职</el-button>
          <el-button type="text" size="small">角色</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-row type="flex" align="middle" justify="end" style="height: 50px">
        <el-pagination
          layout="prev, pager, next"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
