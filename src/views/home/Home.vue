<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <SearchFile @onSearchChange="searchChange($event)"></SearchFile>
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
import SearchFile from '@/components/SearchFile/index.vue'
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
  components: { FileList, SearchFile },

  setup(props, ctx) {
    const fileData = ref([]);

    function getFileDta(query = {}, type?: string) {
      getFileListBySearch()
        .then(res => {
          fileData.value = res.data;
          if (type === "delete") {
            console.log(type);
          } else if (type === "search") {
            ElMessage.success("查询文件信息成功。");
          } 
          else {
            ElMessage.success("获取文件列表成功。");
          }
        })
        .catch(() => {
          ElMessage.error("获取文件列表失败！");
        });
    }

    function deleteFile(e: string) {
      console.log(e);
      if (e && e === "delete") {
        getFileDta("delete");
      }
    }

    function searchChange(e: Record<'searchBy' | 'searchValue', string>) {
      console.log(e.searchBy, e.searchValue);
      // const search = {}
      // search[e.searchBy] = e.searchValue;
      // getFileDta(search, 'query')
    }

    onMounted(() => {
      getFileDta();
    });

    return {
      fileData,
      getFileDta,
      deleteFile,
      searchChange
    };
  }
});
</script>

<style lang="scss">
.home {
  padding: 0 165px;
}
</style>
