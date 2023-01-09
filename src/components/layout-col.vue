<template>
  <div class="layout-col dfa" :style="{ width: colWidth, justifyContent: aligin }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    colWidth?: string
    aligin?: string
  }>(),
  {
    colWidth: '25%',
    aligin: 'center',
  },
)
</script>

<style lang="less" scoped>
.layout-col {
  box-sizing: border-box;
  width: 25%;
  // border: 1px solid gray;
}
</style>
