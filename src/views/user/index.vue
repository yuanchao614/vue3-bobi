<template>
  <div class="user">
     <el-button type="text" title="" @click="createUser()">
                       新增用户
                    </el-button>
    <div class="container">
      <div v-for="item in userList" :key="item._id" class="b-avatar">
        <el-tooltip placement="right">
          <template #content>
            <div class="user-box">
                <div class="text-info">
                    <span style="font-size: 14px;font-weight: 600;">{{item.userName}}</span>
                </div>
                 <div class="text-info">
                    <i class="iconfont icon-email"></i>{{item.email}}
                </div>
                 <div class="text-info">
                    <i class="iconfont icon-password"></i>{{item.passWord}}
                </div>
                <div class="text-info">
                    <i class="iconfont icon-jiaoseguanlirole"></i>{{item.userType}}
                </div>
                <div class="text-info">
                    <i class="iconfont icon-Date"></i>{{item.createdDate}}
                </div>
                <div class="operator">
                    <el-button type="text" title="编辑" @click="updateUser(item)">
                        <i class="iconfont icon-edit1"></i>
                    </el-button>
                    <el-button type="text" style="margin-left: 10px;" title="删除" @click="deleteUser(item._id)">
                        <i class="iconfont icon-delete"></i>
                    </el-button>
                </div>
            </div>
          </template>
          <el-avatar size="large">
            <img src="../../assets/images/erth.png" alt="头像" />
          </el-avatar>
        </el-tooltip>
      </div>
    </div>
      <div class="b-pagination" v-if="userList.length">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="prev, pager, next, jumper, sizes, total"
      :total="total">
    </el-pagination>
    </div>
    <CreateEditUser v-if="viewUserVisible" :viewUserVisible="viewUserVisible" :userData="action === 'create' ? {} : updateData" :action="action" @handleClose="closeUserModel($event)"></CreateEditUser>
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
import { getUser, deleteUserApi } from "../../api/user/user";
import { ElMessage } from "element-plus";
import CreateEditUser from '../../components/CreateEditUser/index.vue'

export default defineComponent({
  components: {
    CreateEditUser
  },
  setup() {
    const userList = ref<any>([]);
    const pagination = reactive({
        pageIndex: 1,
        pageSize: 10
    })

    const total = ref(10);
    const viewUserVisible = ref(false)
    const action = ref('');
    const updateData = ref();

    function getUserList(data = {}, type?: string) {
      getUser(data).then(res => {
        console.log(res);
        userList.value = res.data.userList;
        total.value = res.data.total;
        if (type && (type === 'createOrUpdate' || type === 'delete')) {
          return;
        }
        ElMessage.success({
            message: '获取用户列表成功!',
            type: 'success'
          });
      }).catch(error => {
          ElMessage.error('获取用户列表失败!');
      })
    }

    function handleSizeChange(val: number) {
        pagination.pageIndex = 1;
        pagination.pageSize = val;
        getUserList(pagination);
    }

    function handleCurrentChange(val: number) {
        pagination.pageIndex = val;
        getUserList(pagination)
    }

    function createUser() {
      action.value = 'create';
      viewUserVisible.value = true;
    }

    
    function updateUser(item: any) {
      action.value = 'update';
      updateData.value = item;
      viewUserVisible.value = true;
    }

    function closeUserModel(e: any) {
      viewUserVisible.value = e;
      getUserList(pagination, 'createOrUpdate')
      console.log(e);
    }

    function deleteUser(id: string) {
      deleteUserApi(id).then(res => {
        if (res) {
           ElMessage.success({
            message: '删除用户成功!',
            type: 'success'
          });
          getUserList(pagination, 'delete')
        }
      }).catch(error => {
          ElMessage.error('删除用户失败!');
      })
    }

    onMounted(() => {
      getUserList();
    });
    return {
      userList,
      getUserList,
      handleSizeChange,
      handleCurrentChange,
      pagination,
      total,
      viewUserVisible,
      createUser,
      closeUserModel,
      action,
      updateUser,
      updateData,
      deleteUser
    };
  }
});
</script>

<style lang="scss">
.user {
  padding: 0 115px;
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    margin: 0 auto;
    .b-avatar {
      padding: 20px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      :hover {
        transform: scale(1.05);
      }
    }
  }

& .b-pagination {
    width: 50%;
    margin: 0 auto;
    text-align: end;
   & .el-input__inner, .el-pagination button, .el-pager li {
    background: #090723;
    color: white;
  }
  & .el-pagination__total {
    color: white;
  }
  & .el-pagination__jump {
    color: white;
  }
  & .el-pagination {
    text-align: end;
  }
  & .el-pager li {
    min-width: 32px;
    height: 32px;
    &.active {
    background: #ff0000 !important;
    border-radius: 50%;
  }
  }
}
}

.user-box {
      width: 360px;
      height: 180px;
      & .text-info:not(:nth-child(1)) {
          padding: 5px 25px;
          color: #8b949e;
          font-weight: 600;
          font-size: 12px;
          & i {
              margin-right: 10px;
              vertical-align: middle;
          }
      }
       & .text-info:nth-child(1) {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          padding-bottom: 5px;
      }
    & .operator {
        display: flex;
        justify-content: flex-start;
        padding: 0px 25px;
        & i {
            font-size: 24px;
            color: white;
            &:hover {
            color: #ff0000;
        }
        }
    }
  }
</style>
