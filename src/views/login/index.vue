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
      <Login></Login>
    </div>
  </el-col>
</el-row>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue'
import Login from '../../components/auth/Login.vue'

export default defineComponent({
  components: {
    Login
  },
  setup(props, ctx) {

    onMounted(() => {
      console.log(props);
    })


    return {
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
}
}
</style>
