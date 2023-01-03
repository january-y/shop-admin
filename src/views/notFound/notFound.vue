<template>
  <div class="not-found" v-if="isNotFound">
    <el-result icon="warning" title="页面错误" sub-title="404 NotFound">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import usePublicStore from '@/stores/public'

const publicStore = usePublicStore()
const router = useRouter()
const route = useRoute()
const isNotFound = ref<boolean>(false)
if (router.hasRoute(route.path)) {
  // console.log(publicStore.currentMenu)
  router.push(route.path)
} else {
  isNotFound.value = true
}

// console.log(route.path)
</script>

<style lang="less" scoped>
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666666;
}
</style>
