<template>
  <div class="home-main">
    <!-- tabs -->
    <div class="tabs">
      <homeTabs></homeTabs>
    </div>
    <!--  -->
    <div class="view">
      <router-view></router-view>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
const homeTabs = defineAsyncComponent(() => import('./home-tabs.vue'))

const route = useRoute()
// console.log(route.path)
</script>

<style lang="less" scoped>
.home-main {
  box-sizing: border-box;
  padding: 10px;
  // width: calc(100vw - 250px);
  width: 100%;
  height: calc(100vh - 70px);
  background-color: #f3f4f6;
  .tabs {
    // width: 100%;
  }
  .view {
    margin-top: 10px;
    padding-left: 10px;
  }
}
</style>
