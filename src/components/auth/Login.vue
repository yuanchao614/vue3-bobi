<template>
<div class="login">
<span class="title">登录</span>
 <el-form
        :model="loginForm"
        :label-position="'left'"
        hide-required-asterisk="true"
        status-icon
        ref="userFormRef"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="userName"
          :rules="{
      required: true, message: '用户名不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="loginForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item
          prop="passWord"
          :rules="{
      required: true, message: '密码不能为空', trigger: 'blur'
    }"
        >
          <el-input type="password" v-model="loginForm.passWord" autocomplete="off" placeholder="密码" show-password="true"></el-input>
        </el-form-item>

        <p class="hover">Login In</p>
      </el-form>
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
// import { useFullscreen } from "../../utils/utils";
// import { fileInfo } from '../../views/home/interface'
// import { getFileById } from "../../api/files/files"

export default defineComponent({
  name: "Login",

  setup(props, ctx) {
      const loginForm = reactive({
          userName: '',
          passWord: ''
      })


    return {
        loginForm
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login {
    & .title {
        padding: 20px 0px;
        text-align: left;
        font-size: 18px;
        font-weight: 600px;
        display: inline-block;
        width: 100%;
}
    width: 300px;
    & .el-input .el-input__inner {
        background: transparent;
    }
    & .el-form--label-left .el-form-item__label {
        font-size: 16px;
        font-weight: 600;
    }
}

.hover {
    text-shadow: unset;
    transition: .2s;
    font-size: 3vmin;
    cursor: pointer;
    display: inline-block;
    width: 100%;
    border: 1px solid white;
    padding: 3px 0;
    border-radius: 5px;
    
    &:hover {
        text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff, 0 0 100px #0ebeff, 0 0 200px #0ebeff;
    }
}
</style>
