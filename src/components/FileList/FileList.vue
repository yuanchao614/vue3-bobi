<template>
  <div class="fileList">
    <div class="cardBox" v-for="item in fileData" :key="item._id">
      <el-card shadow="hover">
        <div style="display: flex;justify-content: space-between;">
          <div class="block">
            <i
              v-if="item.contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
              class="iconfont icon-file_excel"
              style="font-size: 40px;color: rgb(114,220,162)"
            ></i>
            <i
              v-else-if="item.contentType === 'application/zip'"
              class="iconfont icon-file_zip"
              style="font-size: 40px;color: rgb(219,179,117)"
            ></i>
            <i
              v-else-if="item.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
              class="iconfont icon-file_word"
              style="font-size: 40px;color: rgb(108,162,255)"
            ></i>
            <i
              v-else-if="item.contentType === 'application/pdf'"
              class="iconfont icon-file_ppt"
              style="font-size: 40px;color: rgb(255,130,120)"
            ></i>
            <i
              v-else-if="item.contentType === 'text/plain'"
              class="iconfont icon-file_txt"
              style="font-size: 40px;color: rgb(146,168,193)"
            ></i>
            <i
              v-else-if="item.contentType.includes('image/')"
              class="iconfont icon-file_img"
              style="font-size: 40px;color: rgb(113,206,82)"
            ></i>
            <i
              v-else-if="item.contentType === 'video/mp4'"
              class="iconfont icon-file_video"
              style="font-size: 40px;color: rgb(230,87,255)"
            ></i>
          </div>
          <div class="file-info">
            <p>{{ item.filename }}</p>
            <span>{{ item.uploadDate }}</span>
          </div>
          <div class="flex-center">
            <el-row :gutter="12">
              <el-col :span="8">
                <el-button type="primary" @click="viewFile(item)">查看</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="success" @click="downloadFile(item._id)">下载</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="warning" @click="deleteFile(item._id)">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <ImageView
    v-if="viewImageProp.viewImageVisible"
    :id="viewImageProp.id"
    :viewImageVisible="viewImageProp.viewImageVisible"
    @close="closeViewImage($event)"
  ></ImageView>

  <VideoPlay
   v-if="videoPlayProp.maskVisible"
    :id="videoPlayProp.id"
    :maskVisible="videoPlayProp.maskVisible"
    @close="closeVideo($event)"
  >
  </VideoPlay>
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
import { useFullscreen, downloadUtl } from "../../utils/utils";
import { fileInfo } from "../../views/home/interface";
import { download, deleteApi, getFileById } from "../../api/files/files";
import ImageView from "../ImageView/index.vue";
import VideoPlay from "../VideoPlay/index.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FileList",
  components: {
    ImageView,
    VideoPlay
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    fileData: {
      type: Array as PropType<fileInfo[]>,
      default: []
    }
  },
  emits: ['delete'],

  setup(props, ctx) {
    const {
      enterFullscreen,
      toggleFullscreen,
      isFullscreenRef,
      exitFullscreen
    } = useFullscreen();

    const viewImageProp = reactive({
      viewImageVisible: false,
      id: ""
    });

    const videoPlayProp = reactive({
      maskVisible: false,
      id: ''
    })

    function viewFile(data: fileInfo) {
      console.log(data, 'noted:::::::::');
      if (
        data.contentType.includes('image/')
      ) {
        viewImageProp.viewImageVisible = true;
        viewImageProp.id = data._id;
      } else if (data.contentType === 'video/mp4') {
        videoPlayProp.maskVisible = true;
        videoPlayProp.id = data._id
      }
    }

    function downloadFile(id: string) {
      download(id).then(res => {
        console.log(res, 'donwload::::::::::');
        downloadUtl(res)
      })
    }

    function deleteFile(id: string) {
      deleteApi(id).then(res => {
        if (res) {
          ElMessage.success({
            message: '删除数据成功',
            type: 'success'
          });
          ctx.emit('delete', 'delete')
        }
      }).catch(() => {
        ElMessage.error('删除文件失败');
      });
    }

    function closeViewImage(e: boolean) {
      viewImageProp.viewImageVisible = e;
    }

    function closeVideo(e: boolean) {
      console.log(e, 999);
      videoPlayProp.maskVisible = e;
    }

    onMounted(() => {
      console.log(props);
    });

    return {
      enterFullscreen,
      toggleFullscreen,
      isFullscreenRef,
      exitFullscreen,
      viewFile,
      viewImageProp,
      closeViewImage,
      downloadFile,
      deleteFile,
      videoPlayProp,
      closeVideo
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
    font-size: 20px;
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
