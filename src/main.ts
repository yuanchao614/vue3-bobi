import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { loadIconfontStyle } from './utils/utils'

['//at.alicdn.com/t/font_2389391_hlj5l6pn72k.css'].forEach(url => {
    loadIconfontStyle(url)
})

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
