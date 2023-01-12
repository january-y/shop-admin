<template>
  <div class="role">
    <div class="table bgc-fff">
      <div class="header dfb">
        <drawer-wrapper ref="drawerRef" @confirm="handleConfirmNewEdit" title="新增">
          <el-button type="primary" size="small" class="pd-8" @click="handleNewRole"
            >新增</el-button
          >
          <template #main>
            <input-wrapper title="角色名称" title-width="70px">
              <input
                type="text"
                class="rolename focus-c"
                placeholder="角色名称"
                v-model="currentDrawerForm.title"
              />
            </input-wrapper>
            <input-wrapper title-width="70px" item-align="flex-start">
              <textarea
                name=""
                class="roledesc focus-c"
                cols="30"
                rows="10"
                placeholder="角色描述"
                v-model="currentDrawerForm.desc"
              ></textarea>
            </input-wrapper>
            <inputWrapper title-width="70px" title="状态">
              <el-switch
                :modelValue="currentDrawerForm.status"
                @update:modelValue="handleStatusChange"
              />
            </inputWrapper>
          </template>
        </drawer-wrapper>
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
                  @update:modelValue="handleUpdateStatus($event, item)"
                />
              </layoutCol>
              <layoutCol col-width="25%" aligin="space-around">
                <div class="cp fontc small" @click="handleEditPower(item)">配置权限</div>
                <div class="cp fontc small" @click="handleEditRoleInfo(item)">修改</div>
                <el-popconfirm title="是否要删除?" @confirm="handleConfirmDel">
                  <template #reference>
                    <div class="cp fontc small" @click="handleDelRole(item)">删除</div>
                  </template>
                </el-popconfirm>
              </layoutCol>
            </layoutRow>
          </template>
        </div>
      </div>
      <div class="pagination dfc">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="roleStore?.roleInfos?.totalCount"
          v-model="currentPage"
          :default-current-page="1"
          @next-click="handleNext"
          @prev-click="handlePrev"
          @current-change="handlePageChange"
        />
        <drawerWrapper
          ref="drawerPowerRef"
          @confirm="confirmEditPower"
          @drawer-close="treeDrawerClose"
          title="权限"
        >
          <span></span>
          <template #main>
            <el-tree
              ref="TreeRef"
              :data="currentData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="defaultCheck"
              :default-checked-keys="defaultCheck"
              :props="defaultProps"
            />
          </template>
        </drawerWrapper>
      </div>
    </div>
    <!-- 页脚 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue'
import {
  getRoleList,
  newRole,
  delRole,
  editRole,
  editRoleStatus,
  editRolePower,
} from '@/services/modules/role'
import useRoleStore from '@/stores/role'
import { useMessage } from '@/utils/useMessage'
import useHomeStore from '@/stores/home'
const layoutRow = defineAsyncComponent(() => import('@/components/layout-row.vue'))
const layoutCol = defineAsyncComponent(() => import('@/components/layout-col.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const inputWrapper = defineAsyncComponent(() => import('@/components/inputWrapper.vue'))

const roleStore = useRoleStore()
const homeStore = useHomeStore()
roleStore.getRoleListAction()
// ref
const drawerRef = ref<any>()
const drawerPowerRef = ref<any>()
const TreeRef = ref<any>()
// 变量
interface ICurrentRoleInfo {
  currentItem: any
  currentHandle: string
}
type TCurrentDrawerForm = {
  title: string | number
  desc: string | number
  status: boolean
}
const currentRoleInfo = reactive<ICurrentRoleInfo>({
  currentItem: '',
  currentHandle: '新增',
})
const currentDrawerForm = reactive<TCurrentDrawerForm>({
  title: '',
  desc: '',
  status: true,
})
const currentPage = ref<number>(1)
const defaultProps = {
  children: 'children',
  label: 'label',
}
const currengCheckNode = ref<any>()
let defaultCheck = ref<any>([])
let currentData = ref<any>([])
// hooks
function useRenderTree() {
  let treeData: any = []
  homeStore?.userMenuInfos?.menus.forEach((item: any, index: number) => {
    treeData.push({ id: item.id, label: item.name, children: [] })
    item.child &&
      item.child.forEach((item2: any, index2: number) => {
        treeData[index].children.push({ id: item2.rule_id, label: item2.name, children: [] })
        item2.child &&
          item2.child.forEach((item3: any, index3: number) => {
            treeData[index].children[index2].children.push({
              id: item3.rule_id,
              label: item3.name,
              children: [],
            })
          })
      })
  })
  currentData.value = treeData
}
const handleNewRole = () => {
  currentDrawerForm.title = ''
  currentDrawerForm.desc = ''
  currentDrawerForm.status = true
  currentRoleInfo.currentHandle = '新增'
  console.log('handleNewRole')
}
const handleRefresh = () => {
  roleStore.getRoleListAction()
  console.log('handleRefresh')
}
const handleEditPower = (e: any) => {
  currentRoleInfo.currentItem = e
  let defaultArr: any = []
  currentRoleInfo.currentItem.rules.forEach((item: any) => {
    const flag = defaultArr.find((val: any) => val == item.id)
    if (!flag) defaultArr.push(item.id)
  })
  defaultCheck.value = defaultArr
  useRenderTree()
  drawerPowerRef.value.open()
}
const handleEditRoleInfo = (e: any) => {
  currentRoleInfo.currentItem = e
  currentDrawerForm.title = e.name
  currentDrawerForm.desc = e.desc
  currentDrawerForm.status = e.status ? true : false
  currentRoleInfo.currentHandle = '修改'
  drawerRef.value.open()
  console.log('handleEditRoleInfo')
}
const handleDelRole = (e: any) => {
  currentRoleInfo.currentItem = e

  console.log('handleDelRole')
}
const handleUpdateStatus = (e: boolean, item: any) => {
  currentRoleInfo.currentItem = item
  editRoleStatus(currentRoleInfo.currentItem.id, e ? 1 : 0).then((res: any) => {
    useMessage('success', '修改成功')
    roleStore.getRoleListAction()
  })
  console.log(e)
}
const handleStatusChange = (e: boolean) => {
  currentDrawerForm.status = e
  console.log(e)
}
const handleConfirmDel = () => {
  delRole(currentRoleInfo.currentItem.id).then((res: any) => {
    useMessage('success', '删除成功')
    roleStore.getRoleListAction()
  })
  console.log('确认删除')
}
const handleConfirmNewEdit = () => {
  if (currentRoleInfo.currentHandle == '新增') {
    newRole(currentDrawerForm.title, currentDrawerForm.status ? 1 : 0, currentDrawerForm.desc).then(
      () => {
        useMessage('success', '新增成功')
        roleStore.getRoleListAction()
        drawerRef.value.close()
      },
    )
  } else {
    editRole(
      currentRoleInfo.currentItem.id,
      currentDrawerForm.title,
      currentDrawerForm.status ? 1 : 0,
      currentDrawerForm.desc,
    ).then(() => {
      useMessage('success', '修改成功')
      roleStore.getRoleListAction()
      drawerRef.value.close()
    })
  }
}
// paginaton
const handleNext = (page: number) => {
  currentPage.value = page
  roleStore.getRoleListAction(currentPage.value)
}
const handlePrev = (page: number) => {
  currentPage.value = page
  roleStore.getRoleListAction(currentPage.value)
}
const handlePageChange = (page: number) => {
  currentPage.value = page
  roleStore.getRoleListAction(currentPage.value)
}
// treeNode
const confirmEditPower = () => {
  let arr: any = []
  TreeRef.value.getCheckedNodes(true).forEach((item: any) => {
    const flag = arr.find((val: number) => val == item.id)
    if (!flag) arr.push(item.id)
  })
  editRolePower(currentRoleInfo.currentItem.id, arr).then(() => {
    useMessage('success', '修改成功')
    roleStore.getRoleListAction()
    drawerPowerRef.value.close()
  })
}
const treeDrawerClose = () => {
  defaultCheck.value = []
  useRenderTree()
}
</script>

<style lang="less" scoped>
.role {
  box-sizing: border-box;
  .table {
    margin-top: 20px;
    padding: 20px;
    padding-right: 30px;
    width: 100%;
    border-radius: 5px;
    .header {
      width: 100%;
      // background-color: gray;
      border-radius: 5px;
      .rolename {
        padding: 5px 5px;
        width: 300px;
        font-size: 14px;
      }
      .roledesc {
        padding: 5px 5px;
        width: 300px;
        font-size: 14px;
      }
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
    .pagination {
      margin-top: 20px;
    }
  }
  .footer {
  }
}
</style>
