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
    <div class="b-pagination" v-if="fileData.length">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="prev, pager, next, jumper, sizes, total"
      :total="total">
    </el-pagination>
    </div>
     <div class="empty" v-if="!fileData.length">
    <img src="../../assets/images/nodata.png" alt="无数据">
    <p>暂无数据</p>
    </div>
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
import { getFileListBySearch, queryFileInfo } from "../../api/files/files";
import { ElMessage } from "element-plus";
import { SearchFileInterface, Pagination} from '../../api/files/interface'

export default defineComponent({
  components: { FileList, SearchFile },

  setup(props, ctx) {
    const fileData = ref([]);
    let query: SearchFileInterface = {}
    const pagination = reactive({
      pageIndex: 1,
      pageSize: 10
    })
    const total = ref(10)

    function getFileDta(query = {}, pagination: Pagination, type?: string) {
      queryFileInfo(query, pagination)
        .then(res => {
          fileData.value = res.data.data;
          total.value = res.data.total;
          console.log(total.value);
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
      if (e && e === "delete") {
        getFileDta(query, pagination, "delete");
      }
    }

    function searchChange(e: SearchFileInterface) {
      pagination.pageIndex = 1;
      if (e.searchValue) {
      query[e.searchBy] = e.searchValue;
      } else {
        query = {}
      }
      // if (e['searchBy'] === 'filename') {
      //   query = {filename: e['searchValue']}
      // }
      // if (e['searchBy'] === 'contentType') {
      //   query = {contentType: e['searchValue']}
      // }
      getFileDta(query, pagination, 'query')
    }

    function handleSizeChange(val: number) {
      pagination.pageIndex = 1;
       pagination.pageSize = val;
       getFileDta(query, pagination, 'pagination');
    }

    function handleCurrentChange(val: number) {
      pagination.pageIndex = val;
       getFileDta(query, pagination, 'pagination');
    }

    onMounted(() => {
      getFileDta(query, pagination, 'init');
    });

    return {
      fileData,
      getFileDta,
      deleteFile,
      searchChange,
      pagination,
      handleSizeChange,
      handleCurrentChange,
      query,
      total
    };
  }
});
</script>

<style lang="scss">
.home {
  padding: 0 165px;
  & .el-input__inner, .el-pagination button, .el-pager li {
    background: #090723;
    color: white;
  }
  & .el-pagination__total {
    color: white;
  }
  & .el-pagination__jump {
    color: white;
  }
  & .el-pagination {
    text-align: end;
  }
  & .el-pager li {
    min-width: 32px;
    height: 32px;
    &.active {
    background: #ff0000 !important;
    border-radius: 50%;
  }
  }
   & .empty {
    width: 100%;
    margin-top: 60px;
    p , img {
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>
