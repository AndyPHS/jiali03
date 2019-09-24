<template>
    <div>
        <div class="text-left">
            <span class="md:text-xl" >文件名称</span>
            <input type="text" name="title" id="name" placeholder="请输入文件名称" v-model="title" class="md:text-xl border ml-2 text-base">
        </div>
        <el-upload
                class="upload-demo"
                :action="actionUrl"
                :data="{'title':title}"
                name="imgs"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-exceed="handleExceed"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>

</template>
<script>
  import {apiUrl} from '@/common/js/api.js'
  export default {
    data() {
      return {
        actionUrl : apiUrl.creatCase,
        title:'',
        fileList: []
      };

    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
