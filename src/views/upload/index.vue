<template>
  <div class="upload">
      <el-row>
  <el-col :span="12">
      <img src="../../assets/images/upload.png" alt="">
  </el-col>
  <el-col :span="12">
      <div class="upload-box">
      <UploadFile></UploadFile>
      </div>
  </el-col>
</el-row>
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
import UploadFile from '../../components/UploadFile/index.vue'

export default defineComponent({
  components: {
      UploadFile
   },

  setup() {

    return {
    };
  }
});
</script>

<style lang="scss">
.upload {
  padding: 0 115px;
}
.upload-box {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 29%;
    right: 10%;
    border-radius: 4px;
    background: white;
    &:hover {
         transition: all 0.3s ease-in-out;
    }
}
</style>
