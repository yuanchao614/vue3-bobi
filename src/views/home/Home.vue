<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <FileList v-if="fileData.length" :fileData="fileData" name="Welcome to Your Vue.js + TypeScript App" />
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
import { getFileListBySearch } from "../../api/files/files"

export default defineComponent({
  components: { FileList },

  setup(props, ctx) {
    const fileData = ref([]);


    function getFileDta() {
     getFileListBySearch().then(res => {
        fileData.value = res.data;
      })
    }

    onMounted(() => {
      getFileDta()
    });

    return {
      fileData,
      getFileDta
    };
  }
});
</script>
