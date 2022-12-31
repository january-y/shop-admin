<template>
  <div class="app">
    <router-view></router-view>
    <loading v-if="publicStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import usePublicStore from './stores/public'
import { defineAsyncComponent } from 'vue'
const loading = defineAsyncComponent(() => import('@/views/loading/loading.vue'))

const publicStore = usePublicStore()
</script>

<style lang="less" scoped></style>
