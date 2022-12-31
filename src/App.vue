<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useTestStore from './stores/test'

const testStore = useTestStore()
</script>

<style lang="less" scoped></style>
