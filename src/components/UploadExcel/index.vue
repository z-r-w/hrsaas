<template>
  <el-row
    align="middle"
    type="flex"
    style=" width: 600px;
    height: 160px;
    border: 2px dashed #bbb;
    margin: 100px auto;
    "
  >
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <el-col style="text-align: center;  height: 160px;  border-right: 2px dashed #bbb; line-height: 160px; "><el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
      上传
    </el-button></el-col>
    <el-col style=" text-align: center; position: relative;" class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
        <i class="el-icon-upload" style="display: block; position: absolute; top: 0px;left: 120px; font-size: 60px;color: #999;" />
        <span>将文件拖到此处</span>

      </div>
    </el-col>
  </el-row>

</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持上传一个文件!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('只支持上传后缀名为.xlsx .xls .csv的文件 ')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      // debugger
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          // debugger
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
/* *{border: 0.06px solid black;} */
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
      width: 300px;
      height: 160px;
      line-height: 160px;
       color: #999;
}
</style>
