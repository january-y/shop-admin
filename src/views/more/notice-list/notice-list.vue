<template>
  <div class="notice-list">
    <div class="panel">
      <div class="header dfb">
        <el-button type="primary">Primary</el-button>
        <el-button type="primary">Primary</el-button>
      </div>
      <div class="main">table</div>
      <div class="footer">pagination</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
const layoutTable = defineAsyncComponent(() => import('@/components/layout-table.vue'))
const layoutTableCol = defineAsyncComponent(() => import('@/components/layout-table-col.vue'))
</script>

<style lang="less" scoped>
.notice-list {
  box-sizing: border-box;
  padding-right: 20px;
  margin-top: 20px;
  width: 100%;
  // background-color: #ffffff;
  .panel {
    padding: 20px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 3px;
  }
}
</style>
