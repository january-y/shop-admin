<template>
  <div class="notice-list"></div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
const layoutContain = defineAsyncComponent(() => import('@/components/layout-contain.vue'))

const inputRef = ref<HTMLInputElement>()
const bindValue = ref<any>()
function handleChange(e: any) {
  bindValue.value = e.target.value
  console.log(bindValue.value)
}
</script>

<style lang="less" scoped>
.notice-list {
  // color: skyblue;
}
</style>
