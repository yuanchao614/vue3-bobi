<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <FileList
      v-if="fileData.length"
      :fileData="fileData"
      @delete="deleteFile($event)"
      name="Welcome to Your Vue.js + TypeScript App"
    />
  </div>
</template>

<script lang="ts">
import FileList from "@/components/FileList/FileList.vue"; // @ is an alias to /src
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
import { getFileListBySearch } from "../../api/files/files";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: { FileList },

  setup(props, ctx) {
    const fileData = ref([]);

    function getFileDta(type?: string) {
      getFileListBySearch()
        .then(res => {
          fileData.value = res.data;
          if (type === "delete") {
            console.log(type);
          } else {
            ElMessage.success("获取文件列表成功");
          }
        })
        .catch(() => {
          ElMessage.error("获取文件列表失败");
        });
    }

    function deleteFile(e: string) {
      console.log(e);
      if (e && e === "delete") {
        getFileDta("delete");
      }
    }

    onMounted(() => {
      getFileDta();
    });

    return {
      fileData,
      getFileDta,
      deleteFile
    };
  }
});
</script>
