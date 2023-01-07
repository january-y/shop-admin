<template>
  <div class="layout-col" :style="{ width: colWidth }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    colWidth?: string
  }>(),
  {
    colWidth: '25%',
  },
)
</script>

<style lang="less" scoped>
.layout-col {
  box-sizing: border-box;
  width: 25%;
}
</style>
