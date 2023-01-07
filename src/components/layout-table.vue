<template>
  <div class="layout-table dfs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.layout-table {
  flex-wrap: nowrap;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  // background-color: #999999;
}
</style>
