<template>
<el-dialog
  title="图片查看"
  v-model="ViewModelVisible"
  width="30%"
  :before-close="handleClose">
  <div class="demo-image__preview">
  <el-image
    style="width: 100px; height: 100px"
    :src="src"
    :preview-src-list="srcList">
  </el-image>
  <p>点击图片查看大图</p>
</div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </template>
</el-dialog>
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
import { useFullscreen } from "../../utils/utils";
import { fileInfo } from '../../views/home/interface'
import { getFileById } from "../../api/files/files"

export default defineComponent({
  name: "FileList",
  props: {
    viewImageVisible: {
      type: Boolean,
      default: false
    },
    id: {
        type: String,
        default: ''
    }
  },
  emits: ['close'],

  setup(props, ctx) {
      const ViewModelVisible = ref(false)
      const src = ref('')
      const srcList = ref<string[]>([])

    function handleClose() {
        ViewModelVisible.value = false;
        ctx.emit('close', false)
    }
    onMounted(() => {
        ViewModelVisible.value = props.viewImageVisible;
        src.value = `http://localhost:3000/files/${props.id}`
        srcList.value = [src.value];
      console.log(props);
    });

    return {
        handleClose,
        ViewModelVisible,
        src,
        srcList
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#fullScreen {
  width: 200px;
  height: 150px;
  background: #42b983;
}

.fileList {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.cardBox {
  width: 30%;
  margin: 0.5rem 0;
}

.flex-center {
  display: flex;
  align-items: flex-end;
}

.file-info {
  p {
    font-size:20px;
    text-align: left;
    padding-left: 0.5rem;
    margin-top: unset;
  }
  span {
    font-size: 10px;
    padding-left: 0.5rem;
    display: inline-block;
    width: 100%;
    text-align: left;
  }
}
</style>
