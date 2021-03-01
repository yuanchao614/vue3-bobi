import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { loadIconfontStyle, loadscript } from './utils/utils'

['//at.alicdn.com/t/font_2389391_hlj5l6pn72k.css', 'https://vjs.zencdn.net/7.10.2/video-js.css'].forEach(url => {
    loadIconfontStyle(url)
});
['https://vjs.zencdn.net/7.10.2/video.min.js'].forEach(url => loadscript(url))

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
