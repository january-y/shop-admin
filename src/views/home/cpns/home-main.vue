<template>
  <div class="home-main page">
    <!-- tabs -->
    <div class="tabs">
      <homeTabs></homeTabs>
    </div>
    <!--  -->
    <div class="view">
      <router-view v-slot="props">
        <transition name="fade">
          <keep-alive :max="10">
            <component :is="props.Component"></component>
          </keep-alive>
        </transition>
      </router-view>
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
  overflow-y: auto;
  background-color: #f3f4f6;
  .tabs {
    // width: 100%;
  }
  .view {
    margin-top: 10px;
    padding-left: 10px;
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
