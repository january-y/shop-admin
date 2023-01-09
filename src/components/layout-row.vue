<template>
  <div class="layout-row dfs">
    <slot> </slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.layout-row {
  box-sizing: border-box;
  flex-wrap: wrap;
  flex-shrink: 0;
  width: 100%;
  // &:nth-child(odd) {
  //   background-color: gray;
  // }
}
</style>
