<template>
  <div class="home-header dfb">
    <!--  -->
    <div class="left dfs">
      <el-icon><UploadFilled /></el-icon>
      <div class="title">后台管理系统</div>
      <div class="menu cp">
        <toolTip color="dark" position="top" title="展开">
          <el-icon :size="18" @click="handleOpen" v-show="isMenuOpen"><Expand /></el-icon>
        </toolTip>
        <toolTip color="dark" position="top" title="收起">
          <el-icon :size="18" @click="handleOpen" v-show="!isMenuOpen"><Fold /></el-icon>
        </toolTip>
      </div>
      <div class="reset cp" @click="reload">
        <toolTip color="dark" position="top" title="刷新">
          <el-icon :size="18"><Refresh /></el-icon>
        </toolTip>
      </div>
    </div>
    <!--  -->
    <div class="right dfs">
      <div class="camera cp">
        <toolTip color="dark" position="top" title="相机">
          <el-icon><VideoCamera /></el-icon>
        </toolTip>
      </div>
      <div class="squear cp">
        <toolTip color="dark" position="top" title="更多">
          <el-icon><FullScreen /></el-icon>
        </toolTip>
      </div>
      <div class="user dfs">
        <img class="cp" src="@/assets/img/鹿.webp" alt="" />
        <el-dropdown>
          <span class="el-dropdown-link dfs">
            january
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item @click="exit">退出登入</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!--  -->
    <!-- 抽屉-修改密码 -->
    <el-drawer v-model="isShowDrawer" title="I am the title" :with-header="false" size="40%">
      <changePwdVue>
        <div class="out cp" @click="isShowDrawer = false">×</div>
      </changePwdVue>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import useHomeStore from '@/stores/home'
const toolTip = defineAsyncComponent(() => import('@/components/tooltip.vue'))
const changePwdVue = defineAsyncComponent(() => import('./home-changePwd.vue'))

const emit = defineEmits(['change-open'])
const router = useRouter()
const homeStore = useHomeStore()
const isShowDrawer = ref<boolean>(false)
let isMenuOpen = ref<boolean>(false)
function exit() {
  ElMessage.success('操作成功!')
  localStorage.clear()
  router.push('/login')
}
function changePwd() {
  isShowDrawer.value = true
}
function reload() {
  location.reload()
  // ElMessage.success('刷新成功!')
}
function handleOpen() {
  isMenuOpen.value = !isMenuOpen.value
  // instance?.proxy?.$mitt.emit('handle-menu')
  homeStore.isOpenMenus = !homeStore.isOpenMenus
}
</script>

<style lang="less" scoped>
.home-header {
  height: 100%;
  padding-left: 60px;
  background-color: #4338ca;
  color: #e0e7ff;
  .left {
    line-height: 1;
    .title {
      margin-left: 5px;
      font-size: 19px;
    }
    .menu {
      margin-left: 60px;
    }
    .reset {
      margin-left: 30px;
    }
  }
  .right {
    padding-right: 40px;
    .camera {
      margin-right: 15px;
    }
    .squear {
      margin-right: 20px;
    }
    .user {
      img {
        border-radius: 50%;
        overflow: hidden;
        width: 30px;
        margin-right: 5px;
      }
      :deep(.el-dropdown-link) {
        color: #f9f9f9 !important;
      }
      :deep(.el-icon--right) {
        margin-left: 5px !important;
      }
    }
  }
  .out {
    font-size: 35px;
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
