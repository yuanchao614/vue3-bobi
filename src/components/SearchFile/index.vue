<template>
  <div class="search-file">
    <el-button class="clear-btnstyle" circle @click="toggleViewSearch" v-if="!visibleSearch">
      <i class="iconfont icon-search" style="color: white;"></i>
    </el-button>
    <el-input
      v-if="visibleSearch"
      placeholder="请输入内容"
      v-model="searchParam.searchValue"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="searchParam.searchBy" placeholder="请选择">
          <el-option label="文件名" value="filename"></el-option>
          <el-option label="文件类型" value="contentType"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button
        @click="onSearch()"
          icon="el-icon-search"
        ></el-button>
      </template>
    </el-input>
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
  name: "SearchFile",

  emits: ['onSearchChange'],

  setup(props, ctx) {
    const visibleSearch = ref(false);
    const searchParam = reactive({
      searchBy: "contentType",
      searchValue: ""
    });

    function toggleViewSearch() {
        visibleSearch.value = !visibleSearch.value;
    }

    function onSearch() {
      ctx.emit('onSearchChange', searchParam)
        if (searchParam.searchBy && !searchParam.searchValue) {
            toggleViewSearch()
        }
    }

    return {
      searchParam,
      visibleSearch,
      toggleViewSearch,
      onSearch
    };
  }
});
</script>

<style lang="scss">
.search-file {
  margin: 20px 50px 20px 0px;
  text-align: left;
  & .el-input-group {
    width: 30%;
    border: unset;
  }
  & .select-trigger {
    width: 100px;
  }
  & .el-input-group__prepend {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-color: white;
    background: #2e2d47;
  }
  & .el-input-group__append {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-color: white;
    background: #090723;
  }
  & .el-input-group--prepend .el-input__inner {
    border-top-color: white;
    border-bottom-color: white;
    border-left: unset;
    border-right: unset;
    background: #090723;
  }
  & .clear-btnstyle {
    border-color: unset;
    background: #ff0000;
  }
}
</style>
