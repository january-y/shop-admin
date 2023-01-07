<template>
  <div class="layout-row dfs">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.layout-row {
  flex-wrap: wrap;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
