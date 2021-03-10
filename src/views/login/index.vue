<template>
  <div class="login-register mx-auto">
    <el-row style="height: 100%;">
  <el-col :span="12">
    <div class="center">
      <img src="../../assets/images/rocket.png" alt="Rockets">
    </div>
  </el-col>
  <el-col :span="12">
    <div class="center">
      <Login v-if="isLogin"></Login>
      <Register v-if="!isLogin" @registerOk="switchToLogin($event)"></Register>
      <p class="switch">
        <span v-if="isLogin" @click="wrap()" style="text-decoration: underline;cursor: pointer;">注册</span>
        <span v-if="!isLogin" @click="wrap()" style="text-decoration: underline;cursor: pointer;">登录</span>
      </p>
    </div>
  </el-col>
</el-row>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue'
import Login from '../../components/auth/Login.vue'
import Register from '../../components/auth/Register.vue'

export default defineComponent({
  components: {
    Login,
    Register
  },
  setup(props, ctx) {
    const isLogin = ref(true)

    onMounted(() => {
      console.log(props);
    })

    function wrap() {
      isLogin.value = !isLogin.value;
    }

    function switchToLogin(e: boolean) {
      if (e) {
        isLogin.value = !isLogin.value;
      }
    }


    return {
      isLogin,
      wrap,
      switchToLogin
    }
  }
})
</script>

<style lang="scss">
.login-register {
  height: 100%;
  & .center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.switch {
  width: 300px;
  text-align: end;
}
}
</style>
