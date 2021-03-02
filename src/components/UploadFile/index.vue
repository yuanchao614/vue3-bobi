<template>
  <div class="upload-com">
   <!-- <input type="file"> -->
   <el-upload
  class="upload-demo"
  action="http://localhost:3000/files"
  :on-change="handleChange"
  :data="description"
  :multiple="true"
  :file-list="fileList">
  <el-button size="small" type="primary">
      <i class="el-icon-upload" style="font-size: 48px;"></i>
  </el-button>
  <template #tip>
    <div class="el-upload__tip">
      支持单个和多个文件上传，支持.jpg .png .mp4 .txt .doc .xlsx .zip等格式文件上传
    </div>
  </template>
</el-upload>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch
} from "vue";
import { getFileListBySearch, uploadApi } from "../../api/files/files";
import { ElMessage } from "element-plus";

export default defineComponent({
    name: 'Upload',

  setup() {

      const fileList = ref([])
      const description = {
          description: 'test description'
      }


      function handleChange(file: any, fileList: any[]) {
        // this.fileList = fileList.slice(-3);
        console.log(file);
        console.log(fileList);
      }

      function beforeUpload(file: any) {
          console.log(file, 'befor::::::::::::');
      }

    return {
     fileList,
     handleChange,
     description
    };
  }
});
</script>

<style lang="scss">
.upload-com {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload-demo {
    // margin-top: 30px;
}
.el-upload-list__item-name {
    text-align: left;
}
</style>
