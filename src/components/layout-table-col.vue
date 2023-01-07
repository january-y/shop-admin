<template>
  <div class="layout-table-col dfc" :style="{ width: width, alignItems: aligin }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    width?: string
    aligin?: string
  }>(),
  {
    width: '20%',
    aligin: 'center',
  },
)
</script>

<style lang="less" scoped>
.layout-table-col {
  box-sizing: border-box;
  width: 20%;
  background-color: gray;
  border: 1px solid skyblue;
}
</style>
