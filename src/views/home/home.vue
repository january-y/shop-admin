<template>
  <div class="home">
    <div class="header">
      <homeHeader />
    </div>
    <!--  -->
    <div class="main dfs">
      <div class="asside" ref="assideRef"><homeAsside :menus="menus" /></div>
      <div class="right">
        <homeMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  defineAsyncComponent,
  computed,
} from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import useHomeStore from '@/stores/home'
import { useRoute, useRouter } from 'vue-router'
const homeHeader = defineAsyncComponent(() => import('./cpns/home-header.vue'))
const homeAsside = defineAsyncComponent(() => import('./cpns/home-asside.vue'))
const homeMain = defineAsyncComponent(() => import('./cpns/home-main.vue'))

const router = useRouter()
const route = useRoute()
const homeStore = useHomeStore()
homeStore.getMenuInfosAction()
const { userMenuInfos } = storeToRefs(homeStore)
const menus = computed(() => userMenuInfos.value?.menus)
const assideRef = ref<HTMLElement>()

function fff(confirmLoading: Ref<boolean>) {
  setTimeout(() => {
    confirmLoading.value = false
  }, 1000)
}

onActivated(() => {
  console.log('home onActivated')
})
onDeactivated(() => {
  console.log('home onDeactivated')
})
onMounted(() => {
  console.log('home onMounted')
})
onUnmounted(() => {
  console.log('home onUnmounted')
})
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  .header {
    height: 70px;
    box-sizing: border-box;
  }
  .main {
    .asside {
      height: calc(100vh - 70px);
      overflow-y: auto;
      // 滚动条
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar {
        display: none;
      }
      // background-color: #666666;
    }
    .right {
      height: calc(100vh - 70px);
      // width: calc(100vw - 270px);
      width: 100%;
      overflow-y: auto;
      // 滚动条
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
