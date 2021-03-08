<template>
  <div class="common-layout">
  <el-container>
    <el-header>
  <el-menu default-active="/" class="el-menu-demo" mode="horizontal" background-color="#090723" active-text-color="#fff" menu-trigger="hover" router @select="handleSelect" v-if="path !== '/login'">
  
    <li style="float: left;
    height: 68px;
    cursor: pointer;
    line-height: 60px;">
    <img src="./assets/images/rocket.png" style="width: 65px; height: 65px;margin-top: 10px;" alt="Bobi">
  </li>
  <el-menu-item index="/home">首页</el-menu-item>
  <el-submenu index="2">
    <template #title>我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template #title>选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="/uploads">文件上传</el-menu-item>
  <el-menu-item index="/user">用户</el-menu-item>
</el-menu>
<div>
 <a style="background-color: #fff;
    border-color: #fff;
    color: #000;
    line-height: 80px;
    padding: 7px 25px;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    ">
    <img src="./assets/icons/king.png" style="width: 24px; height: 24px;vertical-align: middle" alt="Bobi">
    用户中心
    </a>
</div>
    </el-header>
    <el-main class="b-main">
      <router-view/>
    </el-main>
    <el-footer class="b-footer">
      <div style="">
        <!-- <h4>FS</h4> -->
        <span>A personal file system management, build by vue3 + axios + mongodb + element-plus!</span>
      </div>
    </el-footer>
  </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeMount, watchEffect, ref } from 'vue'
export default defineComponent({
  name: 'App',

  emits: ['login'],

  setup(props, ct) {
    const { ctx } = getCurrentInstance() as any;
    const path = ref('');

    onBeforeMount(() => {
      path.value = ctx.$router.currentRoute.value.path;
      console.log(ctx.$router.currentRoute.value.path);
    })

    return {
      ctx,
      path
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a6a5ad;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
 .el-menu.el-menu--horizontal {
    border: unset !important;
    // & .el-menu-item.is-active {
    //    border-bottom: 2px solid #409EFF;
    //    color: white;
    // }
    & .el-menu-item:not(.is-disabled):hover {
       outline: 0;
       color: white;
    }
    & .el-submenu:hover .el-submenu__title {
      color: white;
    }
    & li:nth-child(2) {
      margin-left: 35px;
    }
  }

  .el-popper.is-light {
    border: none;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: #fff;
  }

  .b-footer {
    height: 60px;
    position: fixed;
    left: 0;
    right: auto;
    bottom: 0;
    margin: auto;
    width: 100%;
  }

  .b-main {
    position: fixed;
    top: 60px;
    bottom: 60px;
    left: 0;
    right: 0;
  }

  .el-header {
    display: flex;
    justify-content: space-between
  }
  ::-webkit-scrollbar{width:10px;height:10px;overflow:auto}
  ::-webkit-scrollbar-thumb{background-color:#e6e6e6;min-height:25px;min-width:25px;border:1px solid #e0e0e0}
</style>
