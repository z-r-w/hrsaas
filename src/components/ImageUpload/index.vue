<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="container">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="upload"
      :limit="limit"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      :percentage="percent"
      style="width: 170px"
    />
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" alt="" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID0qhSzGI5cuwjHaeT3OULxKZgZDcmhNo0',
  SecretKey: '2pNgkZA91h94pOluqY3KOEsJZdU8YlkW'
})
export default {
  data() {
    return {
      dialogVisible: false, // 是否显示弹窗
      dialogImageUrl: '', // 预览图片地址
      fileList: [], // 图片信息
      limit: 1, // 允许上传的图片数量
      percent: 0, // 进度条
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 监听上传图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 监听删除
    handleRemove(file) {
      // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
    //   console.log(this.fileList)
    //   console.log(file)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      console.log(this.fileList)
    },
    // 监听改变
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => item)
    //   console.log(this.fileList)
    },
    // 上传之前进行检查
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },
    // 进行上传操作
    upload(data) {
    //   console.log('data', data)
      this.showPercent = true
      cos.putObject({
        Bucket: 'photo-1313330907', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: (progressData) => {
          this.percent = progressData.percent * 100
        }
      }, (err, datas) => {
        if (!err && datas.statusCode === 200) {
          this.fileList = this.fileList.map(item => {
            // 去找谁的uid等于刚刚记录下来的id
            if (item.uid === data.file.uid) {
              // 将成功的地址赋值给原来的url属性
              return { url: 'http://' + datas.Location, status: 'success' }
            }
            return item
          })
          setTimeout(() => {
            this.showPercent = false
            this.percent = 0
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}

</style>
