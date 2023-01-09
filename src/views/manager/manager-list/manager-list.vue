<template>
  <div class="manager-list dfb">
    <div class="tab bgc-fff">
      <!-- search -->
      <div class="search dfb">
        <div class="left">
          <span>关键词</span>
          <input type="text" placeholder="管理员昵称" class="focus-c" v-model="searchValue" />
        </div>
        <div class="right">
          <el-button type="primary" size="small" class="pd-8" @click="handleSearch">搜索</el-button>
          <el-button type="primary" plain size="small" class="pd-8" @click="handleRefresh"
            >重置</el-button
          >
        </div>
      </div>
      <!-- header -->
      <div class="header dfb">
        <el-button type="primary" size="small" @click="handleNew" class="pd-8">新增</el-button>
        <el-icon class="cp" @click="handleRefresh"><Refresh /></el-icon>
      </div>
      <!-- 表格 -->
      <div class="rows">
        <!-- 标题 -->
        <layoutRow class="header-row">
          <layoutCol col-width="25%" aligin="flex-start">管理员</layoutCol>
          <layoutCol col-width="25%" aligin="flex-start">所属管理员</layoutCol>
          <layoutCol col-width="30%" aligin="flex-start">状态</layoutCol>
          <layoutCol col-width="20%" aligin="flex-end">操作</layoutCol>
        </layoutRow>
        <!-- 内容 -->
        <template v-for="(item, index) in managerStore?.managerList" :key="item.id">
          <layoutRow class="row-item">
            <layoutCol col-width="25%" aligin="flex-start">
              <img class="avatar" :src="item.avatar" alt="" />
              <div class="user-info sc">
                <div class="text-nowrap">{{ item.username }}</div>
                <div>ID: {{ item.id }}</div>
              </div>
            </layoutCol>
            <layoutCol col-width="25%" aligin="flex-start">{{ item.role.name }}</layoutCol>
            <layoutCol col-width="40%" aligin="flex-start">
              <el-switch
                :modelValue="item.status == 1 ? true : false"
                @update:modelValue="handleupdateStatus($event, item)"
              />
            </layoutCol>
            <layoutCol col-width="10%" aligin="space-around" class="small">
              <div class="fontc cp" @click="handleEdit(item)">修改</div>
              <el-popconfirm title="是否要删除该管理员?" @confirm="confirmDelManager">
                <template #reference>
                  <div class="fontc cp" @click="handleDel(item)">删除</div>
                </template>
              </el-popconfirm>
            </layoutCol>
          </layoutRow>
        </template>
      </div>
    </div>
    <div class="footer"></div>
    <!-- 抽屉 -->
    <drawerWrapper
      :title="draweFormInfo.title"
      @confirm="handleDrawerConfirm"
      ref="drawerWrapperRef"
    >
      <span ref="drawerRef"></span>
      <template #main>
        <div class="form">
          <inputWrappter title-width="70px" title="用户名">
            <input type="text" class="username focus-c" v-model="draweFormInfo.username" />
          </inputWrappter>
          <inputWrappter title-width="70px" title="密码">
            <input type="text" class="password focus-c" v-model="draweFormInfo.password" />
          </inputWrappter>
          <inputWrappter title-width="70px" title="头像" itemAlign="flex-start">
            <div class="dfs">
              <img
                :src="draweFormInfo.avatar"
                alt=""
                class="upload-img"
                v-if="draweFormInfo.avatar"
                ref="formImgRef"
              />
              <div class="addbox dfc tc cp" @click="handleUploadImg">+</div>
              <input
                type="file"
                ref="fileRef"
                :style="{ display: 'none' }"
                @change="handleFileChange"
              />
            </div>
          </inputWrappter>
          <inputWrappter title-width="70px" title="所属管理">
            <select name="manager" class="managerName" v-model="draweFormInfo.managerName">
              <option :value="-1" selected>--请选择--</option>
              <template v-for="(item, index) in managerStore?.managerInfo?.roles" :key="item.id">
                <option :value="item.name">{{ item.name }}</option>
              </template>
            </select>
          </inputWrappter>
          <inputWrappter title-width="70px" title="状态">
            <el-switch :modelValue="draweFormInfo.status" @click="handleStatusChange" />
          </inputWrappter>
        </div>
      </template>
    </drawerWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, reactive, watch } from 'vue'
import useMamagerStore from '@/stores/manager'
import { newManager, editManager, delManager, editManagerStatus } from '@/services/modules/manager'
import { useMessage } from '@/utils/useMessage'
const layoutRow = defineAsyncComponent(() => import('@/components/layout-row.vue'))
const layoutCol = defineAsyncComponent(() => import('@/components/layout-col.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const inputWrappter = defineAsyncComponent(() => import('@/components/inputWrapper.vue'))

const managerStore = useMamagerStore()
managerStore.getMagagerListAction()

// 变量
const formImgRef = ref<HTMLImageElement>()
const drawerRef = ref<HTMLElement>()
const fileRef = ref<HTMLInputElement>()
const drawerWrapperRef = ref<any>()
type currentInfo = {
  currentItem: any
}
interface IdrawerFormInfo {
  title: string
  username: string | number
  password: string | number
  avatar: any
  managerName: string
  status: boolean
}
const currentHandleInfo = reactive<currentInfo>({
  currentItem: '',
})
const draweFormInfo = reactive<IdrawerFormInfo>({
  title: '',
  username: '',
  password: '',
  avatar: '',
  managerName: '--请选择--',
  status: false,
})
const searchValue = ref<string | number>()
const nowHandle = ref<string>('新增')
// 方法
// search
const handleSearch = () => {
  managerStore.filterManagerAction(searchValue.value!)
}
const handleRefresh = () => {
  searchValue.value = ''
  managerStore.getMagagerListAction()
}
// 增删改
const handleNew = () => {
  draweFormInfo.title = '新增'
  nowHandle.value = '新增'
  draweFormInfo.avatar = ''
  draweFormInfo.username = ''
  draweFormInfo.password = ''
  draweFormInfo.managerName = ''
  draweFormInfo.status = false
  drawerRef.value?.click()
}
const handleDel = (item: any) => {
  currentHandleInfo.currentItem = item
}
const confirmDelManager = () => {
  delManager(currentHandleInfo.currentItem.id)
    .then(() => {
      useMessage('success', '删除成功')
      managerStore.getMagagerListAction()
    })
    .catch(() => useMessage('error', '删除失败'))
}
const handleEdit = (item: any) => {
  currentHandleInfo.currentItem = item
  draweFormInfo.title = '修改'
  nowHandle.value = '修改'
  draweFormInfo.username = item.username
  draweFormInfo.password = ''
  draweFormInfo.avatar = item.avatar
  draweFormInfo.managerName = item.role.name
  draweFormInfo.status = item.status ? true : false
  drawerRef.value?.click()
}
const handleUploadImg = () => {
  fileRef.value?.click()
}
const handleFileChange = (e: any) => {
  const file = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onloadend = (e: any) => {
    const resUrl = e.target.result
    draweFormInfo.avatar = resUrl
  }
}
const handleStatusChange = () => {
  draweFormInfo.status = !draweFormInfo.status
}
const handleDrawerConfirm = () => {
  // 为空判断
  if (
    !draweFormInfo.username ||
    !draweFormInfo.password ||
    !draweFormInfo.managerName ||
    !draweFormInfo.avatar
  ) {
    useMessage('error', '不能为空!')
    return
  }
  // 业务
  if (nowHandle.value == '新增') {
    const role = managerStore.managerInfo.roles.filter(
      (item: any) => item.name == draweFormInfo.managerName,
    )
    newManager(
      draweFormInfo.username,
      draweFormInfo.password,
      role[0].id,
      draweFormInfo.status ? 1 : 0,
      '	http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/63bbc31b47656.png',
    )
      .then(() => {
        useMessage('success', '新增成功')
        drawerWrapperRef.value.closeDrawer()
        managerStore.getMagagerListAction()
      })
      .catch(() => useMessage('error', '新增失败'))
  } else {
    const role = managerStore.managerInfo.roles.filter(
      (item: any) => item.name == draweFormInfo.managerName,
    )
    editManager(
      currentHandleInfo.currentItem.id,
      draweFormInfo.username,
      draweFormInfo.password,
      role[0].id,
      draweFormInfo.status ? 1 : 0,
      '	http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/63bbc31b47656.png',
    )
      .then(() => {
        useMessage('success', '新增成功')
        drawerWrapperRef.value.closeDrawer()
        managerStore.getMagagerListAction()
      })
      .catch(() => useMessage('error', '新增失败'))
  }
}
// status
const handleupdateStatus = (e: any, item: any) => {
  editManagerStatus(item.id, e ? 1 : 0)
    .then(() => {
      useMessage('success', '修改成功')
      managerStore.getMagagerListAction()
    })
    .catch(() => useMessage('error', '修改失败'))
}

// hooks
watch(
  () => draweFormInfo.managerName,
  () => {
    console.log(draweFormInfo.managerName)
  },
)
</script>

<style lang="less" scoped>
.manager-list {
  box-sizing: border-box;
  margin-top: 20px;
  padding-right: 20px;
  width: 100%;
  .tab {
    padding: 20px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    .search {
      padding: 0 20px;
      width: 100%;
      font-size: 13px;
      // background-color: gray;
      .left {
        input {
          margin-left: 10px;
          padding-left: 10px;
          height: 23px;
          border: 1px solid #d2d1d1;
          border-radius: 5px;
        }
      }
    }
    .header {
      margin-top: 30px;
      padding-right: 20px;
    }
    .rows {
      margin-top: 20px;
      .header-row {
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
        color: var(--second-color);
        font-weight: 700;
      }
      .row-item {
        padding: 5px 0px;
        padding-left: 15px;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        background-color: #fafafa;
        border-radius: 2px;
        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
        }
        .user-info {
          margin-left: 10px;
        }
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .form {
    box-sizing: border-box;
    .username {
      height: 28px;
    }
    .password {
      height: 28px;
    }
    .upload-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      background-color: rgb(164, 164, 164);
      border-radius: 3px;
    }
    .addbox {
      margin-left: 3px;
      width: 100px;
      height: 100px;
      font-size: 30px;
      border: 1px solid #d2d1d1;
      border-radius: 3px;
    }
    .managerName {
      padding: 2px 3px;
      width: 200px;
      border: 1px solid #d2d1d1;
      border-radius: 3px;
    }
  }
}
</style>
