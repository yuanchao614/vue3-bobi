<template>
  <div class="create-eidt-user">
    <el-dialog :title="action === 'create' ? '创建用户' : '修改用户'" v-model="ViewModelVisible" width="30%" :before-close="handleClose">
      <el-form
        :model="formValue"
        status-icon
        ref="userFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="userName"
          :rules="{
      required: true, message: '用户名不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="formValue.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="passWord"
          :rules="{
      required: true, message: '密码不能为空', trigger: 'blur'
    }"
        >
          <el-input type="password" v-model="formValue.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="formValue.email"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose" round>取 消</el-button>
          <el-button type="primary" round @click="handleConfirm()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onBeforeMount,
  PropType,
  reactive,
  ref,
  watch
} from "vue";
import { createUserApi, updateUserApi } from "../../api/user/user";
import { ElMessage } from "element-plus";
import { UpdateUser } from '../../api/user/interface'

export default defineComponent({
  name: "CreateEditUser",
  props: {
    viewUserVisible: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: "create"
    },
    userData: {
      type: Object as PropType<UpdateUser>,
      required: true
    }
  },

  emits: ["handleClose"],

  setup(props, ctx) {
    const ViewModelVisible = ref(false);
    const userFormRef = ref();
    const formValue = reactive({
      userName: "",
      passWord: "",
      email: ""
    });

    function handleClose() {
      ctx.emit("handleClose", false);
      ViewModelVisible.value = false;
    }

    function createUser() {
      const param = {
        userName: formValue.userName,
        email: formValue.email,
        passWord: formValue.passWord,
        userType: "admin",
        createdDate: new Date(),
        updatedDate: new Date()
      };
      createUserApi(param)
        .then(res => {
          if (res) {
            ElMessage.success("创建用户成功!");
            handleClose();
          }
        })
        .catch(error => {
          ElMessage.error("创建用户失败!");
        });
    }

    function updateUser() {
      const {_id, userType, createdDate} = props.userData;
      const param = {
        userName: formValue.userName,
        email: formValue.email,
        passWord: formValue.passWord,
        userType: userType,
        createdDate: new Date(createdDate),
        updatedDate: new Date()
      };
      updateUserApi(_id, param)
        .then(res => {
          if (res) {
            ElMessage.success("更新用户成功!");
            handleClose();
          }
        })
        .catch(error => {
          ElMessage.error("更新用户失败!");
        });
    }

    function setFormValue() {
      const { userName, passWord, email } = props.userData;
      formValue.userName = userName;
      formValue.passWord = passWord;
      formValue.email = email;
      console.log(formValue, 99);
    }

    function handleConfirm() {
      userFormRef.value.validate((valid: any) => {
        if (valid) {
          props.action === 'create' ?
          createUser() : updateUser();
        } else {
          ElMessage.error("请正确填写表单!");
          return false;
        }
      });
    }

    function initForm() {
       formValue.userName = '';
      formValue.passWord = '';
      formValue.email = '';
    }


    onBeforeMount(() => {
      initForm()
    })

    onMounted(() => {
      ViewModelVisible.value = props.viewUserVisible;
      if (props.action === 'update') {
        setFormValue();
      }
    });

    return {
      ViewModelVisible,
      handleClose,
      handleConfirm,
      formValue,
      userFormRef,
      createUser,
      updateUser,
      setFormValue,
      initForm
    };
  }
});
</script>

<style lang="scss">
.create-eidt-user {
  & .el-dialog__body {
    width: 450px;
    margin: 0 auto;
  }
}
</style>
