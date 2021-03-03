<template>
  <div class="fileList">
    <div class="card-container" v-for="item in fileData" :key="item._id">
      <div class="card-icon">
        <span>
          <img
            src="../../assets/icons/youtube.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-if="item.contentType === 'video/mp4'"
          />
          <img
            src="../../assets/icons/image.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'image/png' || item.contentType === 'image/jpeg'"
          />
          <img
            src="../../assets/icons/xlsx.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
          />
          <img
            src="../../assets/icons/doc.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
          />
          <img
            src="../../assets/icons/PDF.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'application/pdf'"
          />
          <img
            src="../../assets/icons/txt.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'text/plain'"
          />
          <img
            src="../../assets/icons/zip.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else-if="item.contentType === 'application/zip'"
          />
          <img
            src="../../assets/icons/Other.png"
            style="width: 50px; height: 50px;"
            alt="Bobi"
            v-else
          />
        </span>
      </div>
      <div class="card-info">
        <p>
          <span>上传时间：</span>
          {{item.uploadDate}}
        </p>
        <p>
          <span>文件大小：</span>
          {{item.length}}
        </p>
        <p>
          <span>文件名：</span>
          {{item.filename}}
        </p>
        <p>
          <span>文件描述：</span>
          description
        </p>
      </div>
      <div class="card-operator">
        <el-button
          class="clear-btnstyle"
          :disabled="item.contentType.includes('image/') ? false : true"
          circle
          @click="viewFile(item)"
        >
          <i class="iconfont icon-chakan"></i>
        </el-button>
        <el-button
          class="clear-btnstyle"
          :disabled="item.contentType.includes('video/mp4') ? false : true"
          circle
          @click="viewFile(item)"
        >
          <i class="iconfont icon-play"></i>
        </el-button>
        <el-button class="clear-btnstyle" circle @click="downloadFile(item._id)">
          <i class="iconfont icon-download"></i>
        </el-button>
        <el-button class="clear-btnstyle" circle @click="deleteFile(item._id)">
          <i class="iconfont icon-delete"></i>
        </el-button>
      </div>
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
  ></VideoPlay>
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
  emits: ["delete"],

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
      id: ""
    });

    function viewFile(data: fileInfo) {
      console.log(data, "noted:::::::::");
      if (data.contentType.includes("image/")) {
        viewImageProp.viewImageVisible = true;
        viewImageProp.id = data._id;
      } else if (data.contentType === "video/mp4") {
        videoPlayProp.maskVisible = true;
        videoPlayProp.id = data._id;
      }
    }

    function downloadFile(id: string) {
      download(id).then(res => {
        console.log(res, "donwload::::::::::");
        downloadUtl(res);
      });
    }

    function deleteFile(id: string) {
      deleteApi(id)
        .then(res => {
          if (res) {
            ElMessage.success({
              message: "删除数据成功",
              type: "success"
            });
            ctx.emit("delete", "delete");
          }
        })
        .catch(() => {
          ElMessage.error("删除文件失败");
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
  // justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 330px;
  height: 330px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 4px;
  background: white;
  transition: all 0.3s ease-in-out;
  &:hover {
    // box-shadow: 1px 1px 10px 2px #ccc;
    transform: scale(1.05);
  }
}

.card-icon {
  margin-top: 20px;
  text-align: center;
}
.card-info {
  margin-top: 5px;
  text-align: left;
  p {
    margin-left: 30px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 8px 0;
    font-size: 14px;
    word-break: break-all;
    span {
      font-weight: bold;
    }
  }
}

.card-operator {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  & .clear-btnstyle {
    margin: 0;
    padding: 0;
    border: unset;
    background: transparent;
  }
  i {
    font-size: 28px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>
