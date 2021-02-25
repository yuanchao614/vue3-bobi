<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
  <el-button type="primary" @click="enterFullscreen">Enter windows Full screen</el-button>
  <el-button type="success" @click="toggleFullscreen">Toggle windows Full screen</el-button>
  <el-button type="info" @click="exitFullscreen">Exit windows Full screen</el-button>
  <el-button type="warning">Full screen status {{isFullscreenRef}}</el-button>
</el-row>
    <div id="fullScreen">
      <el-button type="warning" @click="toggleDom">Togelle Full Screen</el-button>
    </div>
    <el-button type="success" @click="getFileList()">test API</el-button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue'
import Axios from '../utils/http/axios/Axios'
import { useFullscreen } from '../utils/utils'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },

  setup(props, ctx) {

    const { 
        enterFullscreen,
        toggleFullscreen,
        isFullscreenRef,
        exitFullscreen,
    } = useFullscreen()

    const testDom = document.getElementById('fullScreen')

    const { toggleFullscreen: toggleDom} = useFullscreen(testDom as HTMLElement)

    onMounted(() => {
      console.log(props);
    })

   function getFileList() {
     console.log(111);
     Axios.request({
       url: '/files/search',
       method: 'post',
         data: {},
     })
   }

    return {
      getFileList,
      enterFullscreen,
      toggleFullscreen,
      isFullscreenRef,
      exitFullscreen,
      toggleDom
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#fullScreen {
  width: 200px;
  height: 150px;
  background: #42b983;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
