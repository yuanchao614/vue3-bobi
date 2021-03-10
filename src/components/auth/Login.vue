<template>
  <div class="login">
    <span class="title">登录</span>
    <el-form
      :model="loginForm"
      :label-position="'left'"
      hide-required-asterisk="true"
      status-icon
      ref="loginFormRef"
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
        <el-input
          type="password"
          v-model="loginForm.passWord"
          autocomplete="off"
          placeholder="密码"
          show-password="true"
        ></el-input>
      </el-form-item>

      <p class="hover" @click="handleConfirm()">Login In</p>
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
import { setLocalStorageValue } from "../../utils/utils";
// import { fileInfo } from '../../views/home/interface'
import { loginApi } from "../../api/auth/auth";
import { ElMessage } from "element-plus";


export default defineComponent({
  name: "Login",

  setup(props, ctx) {
    const loginForm = reactive({
      userName: "",
      passWord: ""
    });
    const loginFormRef = ref();



   function loginfun() {
      const param = {
        username: loginForm.userName,
        password: loginForm.passWord
      }
      loginApi(param).then(res => {
        console.log(res);
        if (res.data) {
          const token = res.data.access_token;
          setLocalStorageValue('access_token', token)
        }
      }).catch(
        error => {
          ElMessage.error("登陆失败!");
        }
      )
    }


    function handleConfirm() {
      loginFormRef.value.validate((valid: any) => {
        if (valid) {
         console.log('login');
         loginfun();
        } else {
          ElMessage.error("请正确填写表单!");
          return false;
        }
      });
    }


    return {
      loginForm,
      loginFormRef,
      handleConfirm,
      loginfun
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
    font-size: 24px;
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
  transition: 0.2s;
  font-size: 1.5vmin;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  border: 1px solid white;
  padding: 3px 0;
  border-radius: 5px;

  &:hover {
    text-shadow: 0 0 10px #0ebeff, 0 0 20px #0ebeff, 0 0 50px #0ebeff,
      0 0 100px #0ebeff, 0 0 200px #0ebeff;
  }
}
</style>
