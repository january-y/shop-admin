<template>
  <div class="role">
    <div class="table bgc-fff">
      <div class="header dfb">
        <el-button type="primary" size="small" class="pd-8" @click="handleNewRole">新增</el-button>
        <el-icon class="cp" @click="handleRefresh"><Refresh /></el-icon>
      </div>
      <div class="tabs">
        <div class="tab-header">
          <!-- 标题 -->
          <layoutRow class="sc fontw">
            <layoutCol col-width="25%" aligin="flex-start">角色名称</layoutCol>
            <layoutCol col-width="25%" aligin="flex-start">角色描述</layoutCol>
            <layoutCol col-width="25%" aligin="flex-start">状态</layoutCol>
            <layoutCol col-width="25%" aligin="center">操作</layoutCol>
          </layoutRow>
        </div>
        <div class="tab">
          <!-- tab -->
          <template v-for="(item, index) in roleStore?.roleInfos?.list" :key="item.id">
            <layoutRow class="tab-row">
              <layoutCol col-width="25%" aligin="flex-start">{{ item.name }}</layoutCol>
              <layoutCol col-width="25%" aligin="flex-start">{{ item.desc }}</layoutCol>
              <layoutCol col-width="25%" aligin="flex-start">
                <el-switch
                  :modelValue="item.status ? true : false"
                  @update:modelValue="handleUpdateStatus"
                />
              </layoutCol>
              <layoutCol col-width="25%" aligin="space-around">
                <div class="cp fontc small" @click="handleEditPower">配置权限</div>
                <div class="cp fontc small" @click="handleEditRoleInfo">修改</div>
                <div class="cp fontc small" @click="handleDelRole">删除</div>
              </layoutCol>
            </layoutRow>
          </template>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue'
import { getRoleList } from '@/services/modules/role'
import useRoleStore from '@/stores/role'
const layoutRow = defineAsyncComponent(() => import('@/components/layout-row.vue'))
const layoutCol = defineAsyncComponent(() => import('@/components/layout-col.vue'))

const roleStore = useRoleStore()
roleStore.getRoleListAction()
// ref

// 变量
interface ICurrentRoleInfo {
  currentItem: any
}
const currentRoleInfo = reactive<ICurrentRoleInfo>({
  currentItem: '',
})
// hooks
const handleNewRole = () => {
  console.log('handleNewRole')
}
const handleRefresh = () => {
  console.log('handleRefresh')
}
const handleEditPower = () => {
  console.log('handleEditPower')
}
const handleEditRoleInfo = () => {
  console.log('handleEditRoleInfo')
}
const handleDelRole = () => {
  console.log('handleDelRole')
}
const handleUpdateStatus = (e: any) => {
  console.log(e)
}
</script>

<style lang="less" scoped>
.role {
  box-sizing: border-box;
  .table {
    padding: 20px;
    padding-right: 30px;
    width: 100%;
    border-radius: 5px;
    .header {
      width: 100%;
      // background-color: gray;
      border-radius: 5px;
    }
    .tabs {
      margin-top: 10px;
      padding: 0 10px;
      .tab-header {
        padding: 10px 0;
        padding-left: 10px;
        border-bottom: 1px solid #eeeeee;
      }
      .tab {
        .tab-row {
          padding: 7px 0px;
          padding-left: 10px;
          font-size: 15px;
          border-bottom: 1px solid #eeeeee;
          background-color: #fafafa;
          border-radius: 5px;
          &:hover {
            background-color: #f5f7fa;
          }
        }
      }
    }
  }
  .footer {
  }
}
</style>
