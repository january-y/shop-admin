<template>
  <div class="app">
    <router-view v-slot="props">
      <transition name="appp">
        <keep-alive :max="10">
          <component :is="props.Component"></component>
        </keep-alive>
      </transition>
    </router-view>
    <loading v-if="publicStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import usePublicStore from './stores/public'
import { defineAsyncComponent } from 'vue'
const loading = defineAsyncComponent(() => import('@/views/loading/loading.vue'))

const publicStore = usePublicStore()
</script>

<style lang="less" scoped>
.app {
  transition: all 0.3s;
}
.appp-enter-active,
.appp-leave-active {
  transition: opacity 0.5s ease;
}

.appp-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
