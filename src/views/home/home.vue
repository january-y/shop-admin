<template>
  <div class="home">
    <div class="header">
      <homeHeader />
    </div>
    <!--  -->
    <div class="main dfs">
      <div class="asside">
        <homeAsside />
      </div>
      <div class="right">
        <homeMain />
      </div>
    </div>
    <!-- test -->
    <drawerWrapper> </drawerWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import useHomeStore from '@/stores/home'
import { useRouter } from 'vue-router'
const homeHeader = defineAsyncComponent(() => import('./cpns/home-header.vue'))
const homeAsside = defineAsyncComponent(() => import('./cpns/home-asside.vue'))
const homeMain = defineAsyncComponent(() => import('./cpns/home-main.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))

const router = useRouter()
const homeStore = useHomeStore()
homeStore.getMenuInfosAction()
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  .header {
  }
  .main {
    .asside {
    }
    .right {
    }
  }
}
</style>
