<template>
  <div class="mask" v-if="maskShow">
    <div class="video">
      <video
        id="my-video"
        class="video-js"
        controls
        preload="auto"
        width="640"
        height="264"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
      >
        <source :src="src" type="video/mp4" />
        <source src="MY_VIDEO.webm" type="video/webm" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a
            href="https://videojs.com/html5-video-support/"
            target="_blank"
          >supports HTML5 video</a>
        </p>
      </video>
    </div>
  </div>
  <div class="closeIcon">
    <i class="el-icon-close" style="font-size: 60px;color: white;cursor: pointer;" @click="closeVideo"></i>
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
import { useFullscreen } from "../../utils/utils";
import { fileInfo } from "../../views/home/interface";
import { getFileById } from "../../api/files/files";

export default defineComponent({
  name: "VideoPlay",
  props: {
    maskVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    }
  },
  emits: ["close"],

  setup(props, ctx) {
    const maskShow = ref(false);

    function closeVideo() {
        console.log(123);
      maskShow.value = false;
      ctx.emit("close", false);
    }

    const src = computed(() => `http://localhost:3000/api/files/${props.id}`)

    onMounted(() => {
      maskShow.value = props.maskVisible;
      console.log(props, 1);
    });

    return {
      maskShow,
      closeVideo,
      src
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mask {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  top: 60px;
  background: rgba(9, 7, 3, 0.7);
  z-index: 100;
  //  display: none;
}

.video {
  position: fixed;
  left: 0;
  right: 0;
  top: 40%;
  // bottom: 0;
  width: 640px;
  z-index: 102;
  margin: auto;
}

.closeIcon {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 999
  // margin: auto;
}
</style>
