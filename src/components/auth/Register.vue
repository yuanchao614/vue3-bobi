<template>
  <div class="register">
    <span class="title">注册</span>
    <el-form
      :model="registerForm"
      :label-position="'left'"
      hide-required-asterisk="true"
      status-icon
      ref="registerFormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        prop="userName"
        :rules="{
      required: true, message: '用户名不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="registerForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
       <el-form-item
          prop="email"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
      <el-form-item
        prop="passWord"
        :rules="{
      required: true, message: '密码不能为空', trigger: 'blur'
    }"
      >
        <el-input
          type="password"
          v-model="registerForm.passWord"
          autocomplete="off"
          placeholder="密码"
          show-password="true"
        ></el-input>
      </el-form-item>

      <p class="hover" @click="handleConfirm()">Register</p>
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
import { createUserApi } from "../../api/user/user";
import { ElMessage } from "element-plus";
import { CreateUser } from '../../api/user/interface'


export default defineComponent({
  name: "Register",

  emits: ['registerOk'],

  setup(props, ctx) {
    const registerForm = reactive({
      userName: "",
      passWord: "",
      email: ''
    });
    const registerFormRef = ref();



    function register() {
        const param: CreateUser = {
            userName: registerForm.userName,
            passWord: registerForm.passWord,
            email: registerForm.email,
            userType: 'visitor', // 默认注册者为游客
            createdDate: new Date(),
            updatedDate: new Date()
        }
        createUserApi(param).then(res => {
            console.log(res);
            ctx.emit('registerOk', true)
            ElMessage.success("注册账号成功，请输入账号密码登录！!");
        }).catch(error => {
             ElMessage.error("注册账号失败!");
        })
    }
    function handleConfirm() {
      registerFormRef.value.validate((valid: any) => {
        if (valid) {
         console.log('register');
         register()
        } else {
          ElMessage.error("请正确填写表单!");
          return false;
        }
      });
    }


    return {
      registerForm,
      registerFormRef,
      handleConfirm,
      register
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.register {
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
